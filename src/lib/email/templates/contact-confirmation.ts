import { emailLayout, ctaButton, divider, escapeHtml } from './layout'
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
  const body = `
    <tr>
      <td style="padding:40px 40px 28px;">
        <p style="margin:0 0 20px;font-family:Georgia,serif;font-size:20px;color:#1a1a1a;">
          Thank you, ${escapeHtml(data.name)}.
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

    ${divider()}

    <tr>
      <td style="padding:28px 40px;">
        <p style="margin:0 0 12px;font-family:sans-serif;font-size:11px;color:#aaa;letter-spacing:3px;text-transform:uppercase;">
          Your Message
        </p>
        <div style="background:#f8f6f1;padding:20px;font-family:Georgia,serif;font-size:14px;color:#555;line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
      </td>
    </tr>

    ${ctaButton('https://www.usedsteinways.com/pianos', 'Browse the Collection')}`

  return emailLayout({
    subtitle: 'Message Received',
    body,
    footer: 'UsedSteinways.com &nbsp;·&nbsp; 508-545-0766 &nbsp;·&nbsp; info@usedsteinways.com',
  })
}
