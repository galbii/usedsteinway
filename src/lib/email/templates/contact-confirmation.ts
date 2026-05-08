import { emailLayout, ctaButton, divider, escapeHtml } from './layout'
import type { ContactFormData } from './contact-admin'

function formatPreferredDateTime(date?: string, time?: string): string | null {
  if (!date) return null
  const parts: string[] = []
  try {
    const [year, month, day] = date.split('-').map(Number)
    const d = new Date(year, month - 1, day)
    parts.push(
      d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
    )
  } catch {
    parts.push(date)
  }
  if (time) {
    try {
      const [h, m] = time.split(':').map(Number)
      const d = new Date(2000, 0, 1, h, m)
      parts.push(d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }))
    } catch {
      parts.push(time)
    }
  }
  return parts.join(' at ')
}

const inquiryLabels: Record<ContactFormData['inquiryType'], string> = {
  buy: 'Buy a Piano',
  sell: 'Sell a Piano',
  general: 'General Contact',
}

const nextSteps: Record<ContactFormData['inquiryType'], string> = {
  buy: 'We\'ll review your inquiry and get back to you with any questions or next steps.',
  sell: 'We\'ll review your piano details and be in touch with an appraisal or next steps.',
  general: 'Every message is reviewed personally and we\'ll be in touch shortly.',
}

export function confirmationEmailSubject(data: ContactFormData): string {
  return data.source === 'schedule'
    ? '[Used Steinways] Viewing Request Received'
    : '[Used Steinways] Message Received'
}

export function confirmationEmailHtml(data: ContactFormData): string {
  const isSchedule = data.source === 'schedule'
  const regarding = data.pianoTitle ?? inquiryLabels[data.inquiryType]
  const preferredDateTime = formatPreferredDateTime(data.preferredDate, data.preferredTime)

  const scheduleBody = `
    <tr>
      <td style="padding:40px 40px 28px;">
        <p style="margin:0 0 20px;font-family:Georgia,serif;font-size:20px;color:#1a1a1a;">
          Thank you, ${escapeHtml(data.name)}.
        </p>
        <p style="margin:0 0 24px;font-family:sans-serif;font-size:14px;color:#555;line-height:1.7;">
          Your viewing request for <strong>${escapeHtml(regarding)}</strong> has been received. We&rsquo;ll be in touch shortly to confirm your appointment.
        </p>
        ${preferredDateTime ? `
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f6f1;border-left:3px solid #c9a84c;margin-bottom:24px;">
          <tr>
            <td style="padding:16px 20px;">
              <p style="margin:0 0 4px;font-family:sans-serif;font-size:11px;color:#aaa;letter-spacing:3px;text-transform:uppercase;">
                Requested Viewing
              </p>
              <p style="margin:0;font-family:Georgia,serif;font-size:16px;color:#1a1a1a;font-weight:bold;">
                ${escapeHtml(preferredDateTime)}
              </p>
            </td>
          </tr>
        </table>` : ''}
        <p style="margin:0;font-family:sans-serif;font-size:14px;color:#555;line-height:1.7;">
          If you need to reach us sooner, call <strong>508-545-0766</strong> or reply directly to this email.
        </p>
      </td>
    </tr>`

  const inquiryBody = `
    <tr>
      <td style="padding:40px 40px 28px;">
        <p style="margin:0 0 20px;font-family:Georgia,serif;font-size:20px;color:#1a1a1a;">
          Thank you, ${escapeHtml(data.name)}.
        </p>
        <p style="margin:0 0 16px;font-family:sans-serif;font-size:14px;color:#555;line-height:1.7;">
          We received your inquiry regarding <strong>${escapeHtml(regarding)}</strong>.
          ${nextSteps[data.inquiryType]}
        </p>
        <p style="margin:0;font-family:sans-serif;font-size:14px;color:#555;line-height:1.7;">
          If you need to reach us sooner, call <strong>508-545-0766</strong> or reply directly to this email.
        </p>
      </td>
    </tr>

    ${divider()}

    <tr>
      <td style="padding:28px 40px;">
        <p style="margin:0 0 12px;font-family:sans-serif;font-size:11px;color:#aaa;letter-spacing:3px;text-transform:uppercase;">
          Your Message
        </p>
        <div style="background:#f8f6f1;padding:20px;font-family:Georgia,serif;font-size:14px;color:#555;line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
      </td>
    </tr>`

  const body = `
    ${isSchedule ? scheduleBody : inquiryBody}
    ${ctaButton('https://www.usedsteinways.com/pianos', 'Browse the Collection')}`

  return emailLayout({
    subtitle: isSchedule ? 'Viewing Request Received' : 'Message Received',
    body,
    footer: 'UsedSteinways.com &nbsp;·&nbsp; 508-545-0766 &nbsp;·&nbsp; info@usedsteinways.com',
  })
}
