import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import {
  adminEmailSubject,
  adminEmailHtml,
  confirmationEmailSubject,
  confirmationEmailHtml,
} from '@/lib/email'
import type { ContactFormData } from '@/lib/email'

const ADMIN_EMAIL = process.env.RESEND_ADMIN_EMAIL ?? 'usedsteinwayadmin@gmail.com'

export async function POST(req: NextRequest) {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const data = body as Partial<ContactFormData>

  if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim() || !data.inquiryType) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const validated: ContactFormData = {
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone?.trim() || undefined,
    inquiryType: data.inquiryType,
    message: data.message.trim(),
    budget: data.budget || undefined,
    timeline: data.timeline || undefined,
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
      subject: confirmationEmailSubject(),
      html: confirmationEmailHtml(validated),
    })
    .catch((err) => console.error('[contact] Confirmation email failed:', err))

  return NextResponse.json({ success: true })
}
