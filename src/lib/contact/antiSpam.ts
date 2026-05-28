import type { ContactFormData, SellPianoDetails } from '@/lib/email'

// Minimum time (ms) a human plausibly takes to fill out and submit a form.
// Submissions faster than this — or with no timing signal at all — are treated
// as automated. Forms send `elapsedMs` (Date.now() - mount time) via useAntiSpam.
const MIN_FILL_MS = 3000

// More than this many links across name + message is a strong spam signal:
// genuine piano inquiries almost never contain URLs.
const MAX_LINKS = 3

const MAX_NAME = 100
const MAX_EMAIL = 254
const MAX_MESSAGE = 5000
const MAX_SHORT = 200 // generic cap for short free-text fields

const LINK_RE = /(https?:\/\/|www\.)/gi
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[0-9+\-().\s]{7,30}$/

const ALLOWED_INQUIRY = ['buy', 'sell', 'general']
const ALLOWED_BUDGET = ['under-30k', '30-50k', '50-80k', '80-120k', 'over-120k', 'flexible']
const ALLOWED_TIMELINE = ['asap', '1-3months', '3-6months', 'exploring']
const ALLOWED_STYLE = ['grand', 'upright', 'digital', 'unknown']
const ALLOWED_PLAYER = ['yes', 'no']

function asString(v: unknown): string {
  return typeof v === 'string' ? v : ''
}

function countLinks(s: string): number {
  return s.match(LINK_RE)?.length ?? 0
}

/** True when the hidden honeypot field was filled — only bots do that. */
export function isHoneypotTripped(body: Record<string, unknown>): boolean {
  return asString(body.website).trim().length > 0
}

/**
 * True when the submission is implausibly fast OR carries no timing signal.
 * Every real form sends `elapsedMs`; a missing value means the request never
 * loaded one of our forms (a direct POST), which we treat as a bot.
 * IMPORTANT: any new contact form must send `elapsedMs` (see useAntiSpam),
 * otherwise its submissions will be silently dropped here.
 */
export function isTooFast(body: Record<string, unknown>): boolean {
  const elapsed = body.elapsedMs
  if (typeof elapsed !== 'number' || Number.isNaN(elapsed)) return true
  return elapsed < MIN_FILL_MS
}

export type ValidationResult =
  | { ok: true; data: ContactFormData }
  | { ok: false; error: string }

function sanitizePianoDetails(input: unknown): SellPianoDetails | undefined {
  if (!input || typeof input !== 'object') return undefined
  const i = input as Record<string, unknown>
  const clip = (v: unknown): string | undefined => {
    const s = asString(v).trim()
    return s ? s.slice(0, MAX_SHORT) : undefined
  }
  const styleStr = asString(i.style)
  const playerStr = asString(i.playerSystem)
  const cleaned: SellPianoDetails = {
    brand: clip(i.brand),
    model: clip(i.model),
    size: clip(i.size),
    style: ALLOWED_STYLE.includes(styleStr) ? (styleStr as SellPianoDetails['style']) : undefined,
    finish: clip(i.finish),
    age: clip(i.age),
    serialNumber: clip(i.serialNumber),
    playerSystem: ALLOWED_PLAYER.includes(playerStr)
      ? (playerStr as SellPianoDetails['playerSystem'])
      : undefined,
    location: clip(i.location),
    askingPrice: clip(i.askingPrice),
  }
  return Object.values(cleaned).some((v) => v !== undefined) ? cleaned : undefined
}

/**
 * Validate and sanitize a raw contact submission. Returns a clean
 * ContactFormData on success, or a human-readable error to show the user.
 * This is the single source of truth for field rules — both the spam
 * heuristics and the shape the email templates receive.
 */
export function validateContactSubmission(body: Record<string, unknown>): ValidationResult {
  const name = asString(body.name).trim()
  const email = asString(body.email).trim()
  const phone = asString(body.phone).trim()
  const message = asString(body.message).trim()
  const inquiryType = asString(body.inquiryType)

  if (!name || !email || !inquiryType) {
    return { ok: false, error: 'Please fill in your name, email, and inquiry type.' }
  }
  if (!ALLOWED_INQUIRY.includes(inquiryType)) {
    return { ok: false, error: 'Invalid inquiry type.' }
  }
  if (name.length < 2 || name.length > MAX_NAME || countLinks(name) > 0) {
    return { ok: false, error: 'Please enter a valid name.' }
  }
  if (email.length > MAX_EMAIL || !EMAIL_RE.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }
  if (phone && !PHONE_RE.test(phone)) {
    return { ok: false, error: 'Please enter a valid phone number.' }
  }

  const isSell = inquiryType === 'sell'
  // Non-sell inquiries require a message; sell submissions carry their content
  // in pianoDetails instead.
  if (!isSell && !message) {
    return { ok: false, error: 'Please include a message.' }
  }
  if (message.length > MAX_MESSAGE) {
    return { ok: false, error: 'Your message is too long. Please shorten it and try again.' }
  }
  if (countLinks(`${name} ${message}`) > MAX_LINKS) {
    return { ok: false, error: 'Your message looks like spam. Please remove links and try again.' }
  }

  const budget = asString(body.budget)
  const timeline = asString(body.timeline)
  const source = asString(body.source)

  const data: ContactFormData = {
    name,
    email,
    phone: phone || undefined,
    inquiryType: inquiryType as ContactFormData['inquiryType'],
    message,
    pianoTitle: asString(body.pianoTitle).trim().slice(0, MAX_SHORT) || undefined,
    budget: ALLOWED_BUDGET.includes(budget) ? budget : undefined,
    timeline: ALLOWED_TIMELINE.includes(timeline) ? timeline : undefined,
    preferredDate: asString(body.preferredDate).trim().slice(0, MAX_SHORT) || undefined,
    preferredTime: asString(body.preferredTime).trim().slice(0, MAX_SHORT) || undefined,
    source: source === 'schedule' || source === 'inquiry' ? source : undefined,
    pianoDetails: isSell ? sanitizePianoDetails(body.pianoDetails) : undefined,
  }

  return { ok: true, data }
}
