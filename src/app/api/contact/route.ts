import { NextRequest, NextResponse } from 'next/server'
import {
  resend,
  FROM_ADDRESS,
  FROM_NAME,
  ADMIN_EMAIL,
  adminEmailSubject,
  adminEmailHtml,
  confirmationEmailSubject,
  confirmationEmailHtml,
} from '@/lib/email'
import type { ContactFormData } from '@/lib/email'

export async function POST(req: NextRequest) {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const data = body as Partial<ContactFormData>

  // Validate required fields
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

  // Send both emails concurrently — Resend returns { data, error } rather than throwing
  const [adminResult, confirmResult] = await Promise.all([
    resend.emails.send({
      from: `${FROM_NAME} <${FROM_ADDRESS}>`,
      to: ADMIN_EMAIL,
      replyTo: validated.email,
      subject: adminEmailSubject(validated),
      html: adminEmailHtml(validated),
    }),
    resend.emails.send({
      from: `${FROM_NAME} <${FROM_ADDRESS}>`,
      to: validated.email,
      subject: confirmationEmailSubject(),
      html: confirmationEmailHtml(validated),
    }),
  ])

  if (adminResult.error) {
    console.error('[contact] Admin email failed:', adminResult.error)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }

  if (confirmResult.error) {
    // Admin email went out — don't fail the whole request, just log it
    console.error('[contact] Confirmation email failed:', confirmResult.error)
  }

  console.log('[contact] Emails sent — admin:', adminResult.data?.id, 'confirm:', confirmResult.data?.id)

  return NextResponse.json({ success: true })
}
