import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import {
  adminEmailSubject,
  adminEmailHtml,
  confirmationEmailSubject,
  confirmationEmailHtml,
} from '@/lib/email'
import type { ContactFormData, SellPianoDetails } from '@/lib/email'

const ADMIN_EMAIL = process.env.RESEND_ADMIN_EMAIL ?? 'usedsteinwayadmin@gmail.com'

export async function POST(req: NextRequest) {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const data = body as Partial<ContactFormData>

  if (!data.name?.trim() || !data.email?.trim() || !data.inquiryType) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // For non-sell inquiries the free-form message is required; sell submissions
  // carry their content in pianoDetails instead.
  if (data.inquiryType !== 'sell' && !data.message?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const sanitizePianoDetails = (input?: Partial<SellPianoDetails>): SellPianoDetails | undefined => {
    if (!input) return undefined
    const allowedStyles: SellPianoDetails['style'][] = ['grand', 'upright', 'digital', 'unknown']
    const allowedPlayerSystems: SellPianoDetails['playerSystem'][] = ['yes', 'no']
    const style =
      input.style && allowedStyles.includes(input.style) ? input.style : undefined
    const playerSystem =
      input.playerSystem && allowedPlayerSystems.includes(input.playerSystem)
        ? input.playerSystem
        : undefined
    const cleaned: SellPianoDetails = {
      brand: input.brand?.trim() || undefined,
      model: input.model?.trim() || undefined,
      size: input.size?.trim() || undefined,
      style,
      finish: input.finish?.trim() || undefined,
      age: input.age?.trim() || undefined,
      serialNumber: input.serialNumber?.trim() || undefined,
      playerSystem,
      location: input.location?.trim() || undefined,
      askingPrice: input.askingPrice?.trim() || undefined,
    }
    const hasAny = Object.values(cleaned).some((v) => v !== undefined)
    return hasAny ? cleaned : undefined
  }

  const validated: ContactFormData = {
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone?.trim() || undefined,
    inquiryType: data.inquiryType,
    message: data.message?.trim() ?? '',
    pianoTitle: data.pianoTitle?.trim() || undefined,
    pianoSerialNumber: data.pianoSerialNumber?.trim() || undefined,
    budget: data.budget || undefined,
    timeline: data.timeline || undefined,
    preferredDate: data.preferredDate?.trim() || undefined,
    preferredTime: data.preferredTime?.trim() || undefined,
    source: data.source ?? undefined,
    pianoDetails: data.inquiryType === 'sell' ? sanitizePianoDetails(data.pianoDetails) : undefined,
  }

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
