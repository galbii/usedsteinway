import { emailLayout, ctaButton, escapeHtml } from './layout'

export type SellPianoDetails = {
  brand?: string
  model?: string
  size?: string
  style?: 'grand' | 'upright' | 'digital' | 'unknown'
  finish?: string
  age?: string
  serialNumber?: string
  playerSystem?: 'yes' | 'no'
  location?: string
  askingPrice?: string
}

export type ContactFormData = {
  name: string
  email: string
  phone?: string
  inquiryType: 'buy' | 'sell' | 'general'
  message: string
  pianoTitle?: string
  /** Serial number of the inventory piano being inquired about — surfaced in the
      admin email so Roger can pull the file without looking it up. */
  pianoSerialNumber?: string
  budget?: string
  timeline?: string
  preferredDate?: string
  preferredTime?: string
  source?: 'schedule' | 'inquiry'
  pianoDetails?: SellPianoDetails
}

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
    details.brand ? ['Brand', escapeHtml(details.brand)] : null,
    details.model ? ['Model', escapeHtml(details.model)] : null,
    details.size ? ['Size', escapeHtml(details.size)] : null,
    details.style ? ['Style', styleLabels[details.style]] : null,
    details.finish ? ['Finish', escapeHtml(details.finish)] : null,
    details.age ? ['Age', escapeHtml(details.age)] : null,
    details.serialNumber ? ['Serial Number', escapeHtml(details.serialNumber)] : null,
    details.playerSystem ? ['Player System', playerSystemLabels[details.playerSystem]] : null,
    details.location ? ['Piano Location', escapeHtml(details.location)] : null,
    details.askingPrice ? ['Asking Price', escapeHtml(details.askingPrice)] : null,
  ]
  return rows.filter((r): r is [string, string] => r !== null)
}

const inquiryLabels: Record<ContactFormData['inquiryType'], string> = {
  buy: 'Buy a Piano',
  sell: 'Sell a Piano',
  general: 'General Contact',
}

const budgetLabels: Record<string, string> = {
  'under-30k': 'Under $30,000',
  '30-50k': '$30,000 – $50,000',
  '50-80k': '$50,000 – $80,000',
  '80-120k': '$80,000 – $120,000',
  'over-120k': 'Over $120,000',
  flexible: 'Flexible / Not sure',
}

const timelineLabels: Record<string, string> = {
  asap: 'As soon as possible',
  '1-3months': '1–3 months',
  '3-6months': '3–6 months',
  exploring: 'Just exploring',
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

export function adminEmailSubject(data: ContactFormData): string {
  if (data.source === 'schedule') {
    return `Viewing Request — ${data.pianoTitle ?? 'Piano'} — ${data.name}`
  }
  const detail = data.pianoTitle ?? inquiryLabels[data.inquiryType]
  return `${data.name} — ${detail}`
}

function renderRowsTable(rows: Array<[string, string]>): string {
  return rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px;font-family:sans-serif;font-size:13px;color:#888;white-space:nowrap;vertical-align:top;border-bottom:1px solid #f0ede8;">${label}</td>
          <td style="padding:10px 16px;font-family:sans-serif;font-size:14px;color:#1a1a1a;border-bottom:1px solid #f0ede8;">${value}</td>
        </tr>`,
    )
    .join('')
}

export function adminEmailHtml(data: ContactFormData): string {
  const preferredDateTime = formatPreferredDateTime(data.preferredDate, data.preferredTime)
  const isSchedule = data.source === 'schedule'
  const isSell = data.inquiryType === 'sell'

  const scheduleRows: Array<[string, string] | null> = [
    preferredDateTime ? ['Preferred Viewing', `<strong>${escapeHtml(preferredDateTime)}</strong>`] : null,
    data.pianoTitle ? ['Piano', escapeHtml(data.pianoTitle)] : null,
    data.pianoSerialNumber ? ['Serial Number', escapeHtml(data.pianoSerialNumber)] : null,
    ['Name', escapeHtml(data.name)],
    ['Email', `<a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>`],
    data.phone ? ['Phone', escapeHtml(data.phone)] : null,
  ]

  const inquiryRows: Array<[string, string] | null> = [
    ['Inquiry Type', inquiryLabels[data.inquiryType]],
    data.pianoTitle ? ['Piano', escapeHtml(data.pianoTitle)] : null,
    data.pianoSerialNumber ? ['Serial Number', escapeHtml(data.pianoSerialNumber)] : null,
    ['Name', escapeHtml(data.name)],
    ['Email', `<a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>`],
    data.phone ? ['Phone', escapeHtml(data.phone)] : null,
    data.budget ? ['Budget', budgetLabels[data.budget] ?? escapeHtml(data.budget)] : null,
    data.timeline ? ['Timeline', timelineLabels[data.timeline] ?? escapeHtml(data.timeline)] : null,
  ]

  const contactTable = renderRowsTable(
    (isSchedule ? scheduleRows : inquiryRows).filter((r): r is [string, string] => r !== null),
  )

  const pianoDetailsSection =
    isSell && data.pianoDetails && pianoDetailRows(data.pianoDetails).length > 0
      ? `
    <tr>
      <td style="padding:24px 40px 8px;">
        <p style="margin:0 0 12px;font-family:sans-serif;font-size:11px;color:#888;letter-spacing:3px;text-transform:uppercase;">
          Piano Details
        </p>
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0ede8;">
          ${renderRowsTable(pianoDetailRows(data.pianoDetails))}
        </table>
      </td>
    </tr>`
      : ''

  const replySubject = encodeURIComponent(
    isSchedule
      ? `Re: Viewing Request — ${data.pianoTitle ?? 'Piano'}`
      : `Re: ${inquiryLabels[data.inquiryType]}`,
  )

  const messageLabel = isSchedule ? 'Notes' : isSell ? 'Anything else' : 'Message'
  const messageSection = data.message.trim()
    ? `
    <tr>
      <td style="padding:24px 40px 8px;">
        <p style="margin:0 0 8px;font-family:sans-serif;font-size:11px;color:#888;letter-spacing:3px;text-transform:uppercase;">
          ${messageLabel}
        </p>
        <div style="background:#f8f6f1;padding:20px;font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
      </td>
    </tr>`
    : ''

  const body = `
    <tr>
      <td style="padding:32px 40px 8px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0ede8;">
          ${contactTable}
        </table>
      </td>
    </tr>

    ${pianoDetailsSection}

    ${messageSection}

    ${ctaButton(
      `mailto:${escapeHtml(data.email)}?subject=${replySubject}`,
      `Reply to ${escapeHtml(data.name)}`,
    )}`

  return emailLayout({
    subtitle: isSchedule ? 'Viewing Request' : isSell ? 'Piano Submission' : 'New Inquiry',
    body,
    footer: 'Sent from the contact form at usedsteinways.com',
  })
}
