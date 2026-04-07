export type ContactFormData = {
  name: string
  email: string
  phone?: string
  inquiryType: 'buy' | 'sell' | 'general'
  message: string
  budget?: string
  timeline?: string
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

export function adminEmailSubject(data: ContactFormData): string {
  return `[Used Steinways] ${inquiryLabels[data.inquiryType]} — ${data.name}`
}

export function adminEmailHtml(data: ContactFormData): string {
  const rows = [
    ['Inquiry Type', inquiryLabels[data.inquiryType]],
    ['Name', data.name],
    ['Email', `<a href="mailto:${data.email}">${data.email}</a>`],
    data.phone ? ['Phone', data.phone] : null,
    data.budget ? ['Budget', budgetLabels[data.budget] ?? data.budget] : null,
    data.timeline ? ['Timeline', timelineLabels[data.timeline] ?? data.timeline] : null,
  ]
    .filter(Boolean)
    .map(
      (row) =>
        `<tr>
          <td style="padding:10px 16px;font-family:sans-serif;font-size:13px;color:#888;white-space:nowrap;vertical-align:top;border-bottom:1px solid #f0ede8;">${row![0]}</td>
          <td style="padding:10px 16px;font-family:sans-serif;font-size:14px;color:#1a1a1a;border-bottom:1px solid #f0ede8;">${row![1]}</td>
        </tr>`,
    )
    .join('')

  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f8f6f1;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f6f1;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;max-width:600px;">

        <!-- Header -->
        <tr>
          <td style="background:#1a1914;padding:32px 40px;">
            <p style="margin:0;font-family:Georgia,serif;font-size:22px;color:#c9a84c;letter-spacing:2px;">
              UsedSteinways.com
            </p>
            <p style="margin:6px 0 0;font-family:sans-serif;font-size:11px;color:#888;letter-spacing:3px;text-transform:uppercase;">
              New Inquiry
            </p>
          </td>
        </tr>

        <!-- Detail table -->
        <tr>
          <td style="padding:32px 40px 8px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0ede8;">
              ${rows}
            </table>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="padding:8px 40px 32px;">
            <p style="margin:0 0 8px;font-family:sans-serif;font-size:11px;color:#888;letter-spacing:3px;text-transform:uppercase;">
              Message
            </p>
            <div style="background:#f8f6f1;padding:20px;font-family:Georgia,serif;font-size:15px;color:#1a1a1a;line-height:1.7;white-space:pre-wrap;">${data.message}</div>
          </td>
        </tr>

        <!-- Reply CTA -->
        <tr>
          <td style="padding:0 40px 40px;">
            <a href="mailto:${data.email}?subject=Re: ${inquiryLabels[data.inquiryType]}"
               style="display:inline-block;background:#1a1914;color:#f8f6f1;font-family:sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;padding:14px 28px;">
              Reply to ${data.name}
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8f6f1;padding:20px 40px;border-top:1px solid #e8e4dc;">
            <p style="margin:0;font-family:sans-serif;font-size:11px;color:#aaa;">
              Sent from the contact form at usedsteinways.com
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}
