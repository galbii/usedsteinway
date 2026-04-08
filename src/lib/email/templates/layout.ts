/**
 * Shared email layout primitives.
 *
 * Every template is built from these building blocks so the brand chrome
 * (header, footer, wrapper) is defined once and stays consistent.
 *
 * Usage:
 *   import { emailLayout, ctaButton, escapeHtml } from './layout'
 *
 *   export function myEmailHtml(data: MyData): string {
 *     return emailLayout({
 *       subtitle: 'Your Subtitle',
 *       body: `<tr><td>...</td></tr>`,
 *       footer: 'Footer text here.',
 *     })
 *   }
 */

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

/** Escape user-supplied strings before injecting into HTML. */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// ---------------------------------------------------------------------------
// Primitives — each returns a <tr> block ready to drop inside the 600px table
// ---------------------------------------------------------------------------

/** Dark header row with the UsedSteinways wordmark and a subtitle label. */
function header(subtitle: string): string {
  return `
    <tr>
      <td style="background:#1a1914;padding:32px 40px;">
        <p style="margin:0;font-family:Georgia,serif;font-size:22px;color:#c9a84c;letter-spacing:2px;">
          UsedSteinways.com
        </p>
        <p style="margin:6px 0 0;font-family:sans-serif;font-size:11px;color:#888;letter-spacing:3px;text-transform:uppercase;">
          ${subtitle}
        </p>
      </td>
    </tr>`
}

/** Light footer row with small muted text. */
function footer(text: string): string {
  return `
    <tr>
      <td style="background:#f8f6f1;padding:20px 40px;border-top:1px solid #e8e4dc;">
        <p style="margin:0;font-family:sans-serif;font-size:11px;color:#aaa;line-height:1.6;">
          ${text}
        </p>
      </td>
    </tr>`
}

// ---------------------------------------------------------------------------
// Reusable components
// ---------------------------------------------------------------------------

/**
 * Full-width dark button row.
 * @param href  Link URL (mailto: or https:)
 * @param label Button text (not escaped — caller controls content)
 */
export function ctaButton(href: string, label: string): string {
  return `
    <tr>
      <td style="padding:0 40px 40px;">
        <a href="${href}"
           style="display:inline-block;background:#1a1914;color:#f8f6f1;font-family:sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;padding:14px 28px;">
          ${label}
        </a>
      </td>
    </tr>`
}

/**
 * Horizontal rule row — use between content sections.
 */
export function divider(): string {
  return `
    <tr>
      <td style="padding:0 40px;">
        <div style="height:1px;background:#e8e4dc;"></div>
      </td>
    </tr>`
}

// ---------------------------------------------------------------------------
// Layout shell
// ---------------------------------------------------------------------------

export type EmailLayoutOptions = {
  /** Short label shown below the wordmark, e.g. "New Inquiry" or "Message Received" */
  subtitle: string
  /** One or more <tr> blocks that form the email body */
  body: string
  /** Plain text shown in the footer (safe to include · separators) */
  footer: string
}

/**
 * Wraps body rows in the standard UsedSteinways email chrome:
 * cream background → 600px white card → header → [body] → footer.
 */
export function emailLayout({ subtitle, body, footer: footerText }: EmailLayoutOptions): string {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f8f6f1;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f6f1;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;max-width:600px;">
        ${header(subtitle)}
        ${body}
        ${footer(footerText)}
      </table>
    </td></tr>
  </table>
</body>
</html>`
}
