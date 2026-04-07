import type { ContactFormData } from './contact-admin'

const inquiryLabels: Record<ContactFormData['inquiryType'], string> = {
  buy: 'Buy a Piano',
  sell: 'Sell a Piano',
  general: 'General Contact',
}

const nextSteps: Record<ContactFormData['inquiryType'], string> = {
  buy: 'Roger will review your preferences and reach out with instruments that match what you are looking for.',
  sell: 'Roger will review your piano details and contact you with an appraisal or next steps.',
  general: 'Roger reviews every message personally and will be in touch shortly.',
}

export function confirmationEmailSubject(): string {
  return 'Your message to Roger — UsedSteinways.com'
}

export function confirmationEmailHtml(data: ContactFormData): string {
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
              Message Received
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 28px;">
            <p style="margin:0 0 20px;font-family:Georgia,serif;font-size:20px;color:#1a1a1a;">
              Thank you, ${data.name}.
            </p>
            <p style="margin:0 0 16px;font-family:sans-serif;font-size:14px;color:#555;line-height:1.7;">
              We received your inquiry regarding <strong>${inquiryLabels[data.inquiryType]}</strong>.
              ${nextSteps[data.inquiryType]}
            </p>
            <p style="margin:0;font-family:sans-serif;font-size:14px;color:#555;line-height:1.7;">
              If you need to reach us sooner, call <strong>508-545-0766</strong> or reply directly to this email.
            </p>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 40px;">
            <div style="height:1px;background:#e8e4dc;"></div>
          </td>
        </tr>

        <!-- Message recap -->
        <tr>
          <td style="padding:28px 40px;">
            <p style="margin:0 0 12px;font-family:sans-serif;font-size:11px;color:#aaa;letter-spacing:3px;text-transform:uppercase;">
              Your Message
            </p>
            <div style="background:#f8f6f1;padding:20px;font-family:Georgia,serif;font-size:14px;color:#555;line-height:1.7;white-space:pre-wrap;">${data.message}</div>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:0 40px 40px;">
            <a href="https://www.usedsteinways.com/pianos"
               style="display:inline-block;background:#1a1914;color:#f8f6f1;font-family:sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;padding:14px 28px;">
              Browse the Collection
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8f6f1;padding:20px 40px;border-top:1px solid #e8e4dc;">
            <p style="margin:0;font-family:sans-serif;font-size:11px;color:#aaa;line-height:1.6;">
              UsedSteinways.com &nbsp;·&nbsp; 508-545-0766 &nbsp;·&nbsp; info@usedsteinways.com
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}
