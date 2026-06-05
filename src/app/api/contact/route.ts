import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import {
  adminEmailSubject,
  adminEmailHtml,
  confirmationEmailSubject,
  confirmationEmailHtml,
} from '@/lib/email'
import { isHoneypotTripped, isTooFast, validateContactSubmission } from '@/lib/contact/antiSpam'
import { isRateLimited } from '@/lib/contact/rateLimit'

const ADMIN_EMAIL = process.env.RESEND_ADMIN_EMAIL ?? 'usedsteinwayadmin@gmail.com'

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return (fwd.split(',')[0] ?? '').trim()
  return req.headers.get('x-real-ip')?.trim() ?? ''
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>

  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  // Bot traps. Respond with a fake success so bots can't tell they were caught
  // and don't retry with a different strategy.
  if (isHoneypotTripped(body) || isTooFast(body)) {
    return NextResponse.json({ success: true })
  }

  // Per-IP rate limiting (best-effort, in-memory).
  if (isRateLimited(getClientIp(req))) {
    return NextResponse.json(
      { error: 'Please wait a moment before sending another message.' },
      { status: 429 },
    )
  }

  // Field validation + sanitization. Real errors surface to the user.
  const result = validateContactSubmission(body)
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }
  const validated = result.data

  const payload = await getPayload({ config: configPromise })

  // Admin notification — required. If this fails, surface the error to the user.
  try {
    await payload.sendEmail({
      to: ADMIN_EMAIL,
      replyTo: validated.email,
      subject: adminEmailSubject(validated),
      html: adminEmailHtml(validated),
    })
  } catch (err) {
    console.error('[contact] Admin email failed:', err)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }

  // User confirmation — best effort. Admin email already went out, so don't fail the request.
  payload
    .sendEmail({
      to: validated.email,
      subject: confirmationEmailSubject(validated),
      html: confirmationEmailHtml(validated),
    })
    .catch((err) => console.error('[contact] Confirmation email failed:', err))

  return NextResponse.json({ success: true })
}
