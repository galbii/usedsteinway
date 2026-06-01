import { emailLayout, ctaButton, divider, escapeHtml } from './layout'
import type { ContactFormData, SellPianoDetails } from './contact-admin'
import { getServerSideURL } from '@/utilities/getURL'

const styleLabels: Record<NonNullable<SellPianoDetails['style']>, string> = {
  grand: 'Grand',
  upright: 'Upright',
  digital: 'Digital',
  unknown: "Don't know",
}

const playerSystemLabels: Record<NonNullable<SellPianoDetails['playerSystem']>, string> = {
  yes: 'Yes',
  no: 'No',
}

function pianoDetailRows(details: SellPianoDetails): Array<[string, string]> {
  const rows: Array<[string, string] | null> = [
    ['Brand', details.brand ? escapeHtml(details.brand) : '—'],
    ['Model', details.model ? escapeHtml(details.model) : '—'],
    ['Style', details.style ? styleLabels[details.style] : '—'],
    ['Serial Number', details.serialNumber ? escapeHtml(details.serialNumber) : '—'],
    details.size ? ['Size', escapeHtml(details.size)] : null,
    details.finish ? ['Finish', escapeHtml(details.finish)] : null,
    details.age ? ['Age', escapeHtml(details.age)] : null,
    details.playerSystem ? ['Player System', playerSystemLabels[details.playerSystem]] : null,
    details.location ? ['Piano Location', escapeHtml(details.location)] : null,
    details.askingPrice ? ['Asking Price', escapeHtml(details.askingPrice)] : null,
  ]
  return rows.filter((r): r is [string, string] => r !== null)
}

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
  sell: 'We will review your piano details and be in touch with the next steps.',
  general: 'Every message is reviewed personally and we\'ll be in touch shortly.',
}

export function confirmationEmailSubject(data: ContactFormData): string {
  return data.source === 'schedule'
    ? '[Used Steinways] Viewing Request Received'
    : '[Used Steinways] Message Received'
}

export function confirmationEmailHtml(data: ContactFormData): string {
  const isSchedule = data.source === 'schedule'
  const isSell = data.inquiryType === 'sell'
  const regarding = data.pianoTitle ?? inquiryLabels[data.inquiryType]
  const preferredDateTime = formatPreferredDateTime(data.preferredDate, data.preferredTime)

  const sellDetailsRows =
    isSell && data.pianoDetails ? pianoDetailRows(data.pianoDetails) : []

  const sellBody = `
    <tr>
      <td style="padding:40px 40px 28px;">
        <p style="margin:0 0 20px;font-family:Georgia,serif;font-size:20px;color:#1a1a1a;">
          Thank you, ${escapeHtml(data.firstName)}.
        </p>
        <p style="margin:0 0 16px;font-family:sans-serif;font-size:14px;color:#555;line-height:1.7;">
          We received the details on your piano. ${nextSteps.sell}
        </p>
        <p style="margin:0;font-family:sans-serif;font-size:14px;color:#555;line-height:1.7;">
          If you need to reach us sooner, call/text <strong>508-545-0766</strong> or reply directly to this email.
        </p>
      </td>
    </tr>

    ${sellDetailsRows.length > 0 ? `
    ${divider()}

    <tr>
      <td style="padding:28px 40px 8px;">
        <p style="margin:0 0 12px;font-family:sans-serif;font-size:11px;color:#aaa;letter-spacing:3px;text-transform:uppercase;">
          Piano Details You Submitted
        </p>
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0ede8;">
          ${sellDetailsRows
            .map(
              ([label, value]) => `
            <tr>
              <td style="padding:10px 16px;font-family:sans-serif;font-size:13px;color:#888;white-space:nowrap;vertical-align:top;border-bottom:1px solid #f0ede8;">${label}</td>
              <td style="padding:10px 16px;font-family:sans-serif;font-size:14px;color:#1a1a1a;border-bottom:1px solid #f0ede8;">${value}</td>
            </tr>`,
            )
            .join('')}
        </table>
      </td>
    </tr>` : ''}

    ${data.message.trim() ? `
    <tr>
      <td style="padding:28px 40px;">
        <p style="margin:0 0 12px;font-family:sans-serif;font-size:11px;color:#aaa;letter-spacing:3px;text-transform:uppercase;">
          Additional Notes
        </p>
        <div style="background:#f8f6f1;padding:20px;font-family:Georgia,serif;font-size:14px;color:#555;line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
      </td>
    </tr>` : ''}`

  const scheduleBody = `
    <tr>
      <td style="padding:40px 40px 28px;">
        <p style="margin:0 0 20px;font-family:Georgia,serif;font-size:20px;color:#1a1a1a;">
          Thank you, ${escapeHtml(data.firstName)}.
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
          If you need to reach us sooner, call/text <strong>508-545-0766</strong> or reply directly to this email.
        </p>
      </td>
    </tr>`

  const inquiryBody = `
    <tr>
      <td style="padding:40px 40px 28px;">
        <p style="margin:0 0 20px;font-family:Georgia,serif;font-size:20px;color:#1a1a1a;">
          Thank you, ${escapeHtml(data.firstName)}.
        </p>
        <p style="margin:0 0 16px;font-family:sans-serif;font-size:14px;color:#555;line-height:1.7;">
          We received your inquiry regarding <strong>${escapeHtml(regarding)}</strong>.
          ${nextSteps[data.inquiryType]}
        </p>
        <p style="margin:0;font-family:sans-serif;font-size:14px;color:#555;line-height:1.7;">
          If you need to reach us sooner, call/text <strong>508-545-0766</strong> or reply directly to this email.
        </p>
      </td>
    </tr>

    ${data.message.trim() ? `
    ${divider()}

    <tr>
      <td style="padding:28px 40px;">
        <p style="margin:0 0 12px;font-family:sans-serif;font-size:11px;color:#aaa;letter-spacing:3px;text-transform:uppercase;">
          Your Message
        </p>
        <div style="background:#f8f6f1;padding:20px;font-family:Georgia,serif;font-size:14px;color:#555;line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
      </td>
    </tr>` : ''}`

  const body = `
    ${isSchedule ? scheduleBody : isSell ? sellBody : inquiryBody}
    ${ctaButton(`${getServerSideURL()}/pianos`, 'Browse the Collection')}`

  return emailLayout({
    subtitle: isSchedule ? 'Viewing Request Received' : 'Message Received',
    body,
    footer: 'UsedSteinways.com &nbsp;·&nbsp; 508-545-0766 &nbsp;·&nbsp; info@usedsteinways.com',
  })
}
