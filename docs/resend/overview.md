# Email — Resend

All transactional email for UsedSteinways runs through **Resend** via the Payload CMS email adapter. This doc covers the architecture, template system, how to add new emails, and local testing.

---

## Architecture

```
payload.sendEmail(message)
        │
        ▼
resendAdapter  ← configured once in payload.config.ts
        │
        ▼
  Resend API  →  inbox
```

The Payload adapter handles the `from` address, API key, and transport. **No code outside `payload.config.ts` should import the `resend` package directly.** All sends go through `payload.sendEmail()`.

---

## File Structure

```
src/lib/email/
├── index.ts                          # Barrel — re-exports types + template functions
└── templates/
    ├── layout.ts                     # Shared brand chrome: emailLayout, ctaButton, divider, escapeHtml
    ├── contact-admin.ts              # Admin notification on form submit
    └── contact-confirmation.ts       # User confirmation on form submit
```

---

## Environment Variables

Defined once in `payload.config.ts`. All four vars must be set in production.

| Variable | Purpose | Default (dev only) |
|---|---|---|
| `RESEND_API_KEY` | Resend account API key | — (required) |
| `RESEND_DEFAULT_FROM_ADDRESS` | Sender address on all emails | `noreply@usedsteinways.com` |
| `RESEND_DEFAULT_FROM_NAME` | Sender display name | `Used Steinways` |
| `RESEND_ADMIN_EMAIL` | Roger's inbox for form notifications | `usedsteinwayadmin@gmail.com` |

---

## Sending an Email

Use `payload.sendEmail()` anywhere you have the Payload instance. The adapter fills in `from` automatically.

```ts
// In an API route
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const payload = await getPayload({ config: configPromise })

await payload.sendEmail({
  to: 'recipient@example.com',
  subject: 'Subject line',
  html: myEmailHtml(data),
})
```

```ts
// In a Payload hook (req.payload is already available)
async ({ doc, req }) => {
  await req.payload.sendEmail({
    to: doc.email,
    subject: 'Subject line',
    html: myEmailHtml(doc),
  })
}
```

**Supported fields** (passed through to Resend):
- `to` — string or string[]
- `subject`
- `html` / `text`
- `replyTo` — useful for admin notifications where you want to reply directly to the user

---

## Template System

### How it works

Templates are pure TypeScript functions that return an HTML string. Each one:

1. Imports layout primitives from `./layout`
2. Builds a `body` string of `<tr>` blocks
3. Calls `emailLayout({ subtitle, body, footer })` to wrap it in the brand chrome

The brand chrome (header with wordmark, footer, outer wrapper) is defined **once** in `layout.ts`.

### layout.ts primitives

| Export | Returns | Use for |
|---|---|---|
| `emailLayout(opts)` | Full HTML document | Wrapping any template body |
| `ctaButton(href, label)` | `<tr>` block | Action buttons (reply, browse, etc.) |
| `divider()` | `<tr>` block | Visual separator between sections |
| `escapeHtml(str)` | Escaped string | **All** user-supplied content before injecting into HTML |

### emailLayout options

```ts
emailLayout({
  subtitle: string  // Label below the wordmark, e.g. "New Inquiry"
  body: string      // One or more <tr> blocks
  footer: string    // Plain text for the footer row (· separators are fine)
})
```

---

## Adding a New Template

### 1. Create the template file

```ts
// src/lib/email/templates/my-template.ts
import { emailLayout, ctaButton, escapeHtml } from './layout'

export type MyEmailData = {
  name: string
  // ... your fields
}

export function myEmailSubject(data: MyEmailData): string {
  return `Subject — ${data.name}`
}

export function myEmailHtml(data: MyEmailData): string {
  const body = `
    <tr>
      <td style="padding:40px 40px 28px;">
        <p style="margin:0 0 16px;font-family:sans-serif;font-size:14px;color:#555;line-height:1.7;">
          Hello, ${escapeHtml(data.name)}.
        </p>
      </td>
    </tr>

    ${ctaButton('https://www.usedsteinways.com/pianos', 'Browse the Collection')}`

  return emailLayout({
    subtitle: 'Your Subtitle',
    body,
    footer: 'UsedSteinways.com &nbsp;·&nbsp; 508-545-0766 &nbsp;·&nbsp; info@usedsteinways.com',
  })
}
```

### 2. Export from the barrel

```ts
// src/lib/email/index.ts — add these two lines
export type { MyEmailData } from './templates/my-template'
export { myEmailSubject, myEmailHtml } from './templates/my-template'
```

### 3. Send it

```ts
import { myEmailSubject, myEmailHtml } from '@/lib/email'
import type { MyEmailData } from '@/lib/email'

await payload.sendEmail({
  to: recipient,
  subject: myEmailSubject(data),
  html: myEmailHtml(data),
})
```

---

## Existing Templates

### `contact-admin` — Admin notification

Triggered by: `POST /api/contact`  
Sent to: `RESEND_ADMIN_EMAIL`  
Notable: includes `replyTo: user's email` so Roger can reply directly from his inbox.

**Data shape:**
```ts
type ContactFormData = {
  name: string
  email: string
  phone?: string
  inquiryType: 'buy' | 'sell' | 'general'
  message: string
  budget?: string    // 'buy' inquiries only
  timeline?: string  // 'buy' inquiries only
}
```

**Adding a new inquiry type:**  
Update `inquiryLabels`, `budgetLabels` / `timelineLabels` as needed in `contact-admin.ts`. The detail table is built dynamically from those maps — no HTML changes required.

---

### `contact-confirmation` — User confirmation

Triggered by: same `POST /api/contact` request, after admin email succeeds  
Sent to: the submitting user  
Notable: best-effort — if it fails the request still returns success (admin notification is the critical path).

**Adding a new inquiry type:**  
Update `inquiryLabels` and `nextSteps` maps in `contact-confirmation.ts`.

---

## Contact Form API Route

```
src/app/api/contact/route.ts
```

Flow:
1. Parse + validate request body
2. `getPayload()` to get the Payload instance
3. Send admin email — if this fails, return 500
4. Send confirmation email — fire and forget (`.catch()` logs but doesn't block)
5. Return `{ success: true }`

---

## Local Testing

Resend has a test mode — replace your API key with `re_` prefixed test keys from the dashboard. Emails are logged in the Resend dashboard under the "Testing" tab and never actually delivered.

For a quick sanity check without Resend credentials, log the HTML output:

```ts
import { adminEmailHtml } from '@/lib/email'

const html = adminEmailHtml({
  name: 'Test User',
  email: 'test@example.com',
  inquiryType: 'buy',
  message: 'I am interested in a Model D.',
  budget: '80-120k',
  timeline: '1-3months',
})

console.log(html) // paste into any HTML file and open in browser
```

---

## Security Notes

- `escapeHtml()` must be called on **all** user-supplied strings before injecting into HTML. It is exported from `layout.ts` — always import from there.
- `encodeURIComponent()` must wrap any user content placed in a URL (e.g. mailto subject lines).
- `RESEND_API_KEY` must never be logged, committed, or exposed client-side.
