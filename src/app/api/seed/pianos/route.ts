import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { seedPianos } from '@/collections/Pianos/seed'
import { NextResponse } from 'next/server'

// GET /api/seed/pianos?secret=<SEED_SECRET>  — secret-protected, for CLI/CI use
export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const { created, skipped } = await seedPianos(payload)
    return NextResponse.json({ success: true, message: `Created ${created} piano(s), skipped ${skipped}.` })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// POST /api/seed/pianos  — authenticated admin session, used by the admin UI button
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const payload = await getPayload({ config: configPromise })
    const { user } = await payload.auth({ headers: request.headers as Headers })

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { created, skipped } = await seedPianos(payload)
    return NextResponse.json({
      success: true,
      message: `Created ${created} piano(s) as drafts, skipped ${skipped} existing. Add photos and publish each one when ready.`,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
