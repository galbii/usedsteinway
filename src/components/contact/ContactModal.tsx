'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/utilities/ui'
import { useAntiSpam, HoneypotField } from '@/lib/contact/useAntiSpam'

type Location = { id?: string | null; name: string }

type Variant = 'schedule' | 'inquiry'

type Props = {
  variant?: Variant
  locations?: Location[]
  brand?: string
  pianoTitle?: string
  triggerLabel?: string
  triggerClassName?: string
  defaultInquiryType?: 'buy' | 'sell' | 'general'
}

const EXIT_MS = 220

export function ContactModal({
  variant = 'schedule',
  locations = [],
  brand,
  pianoTitle,
  triggerLabel,
  triggerClassName,
  defaultInquiryType,
}: Props) {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isSchedule = variant === 'schedule'
  const initialInquiryType: '' | 'buy' | 'sell' | 'general' =
    defaultInquiryType ?? (isSchedule ? 'general' : '')

  const initialMessage = pianoTitle
    ? `I'm interested in the ${pianoTitle}.\n\n`
    : brand && !isSchedule
      ? `I'd like to learn more about your ${brand} pianos.\n\n`
      : ''

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredLocation: locations[0]?.name ?? '',
    preferredDate: '',
    preferredTime: '',
    message: initialMessage,
    inquiryType: initialInquiryType,
  })
  const { honeypotRef, getSpamSignals } = useAntiSpam()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const close = () => {
    if (loading || closing) return
    setClosing(true)
    setTimeout(() => {
      setOpen(false)
      setClosing(false)
      setSubmitted(false)
      setError(null)
    }, EXIT_MS)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const scheduleDetails: string[] = []
    if (isSchedule) {
      if (form.preferredLocation) scheduleDetails.push(`Preferred location: ${form.preferredLocation}`)
      if (form.preferredDate) scheduleDetails.push(`Preferred date: ${form.preferredDate}`)
      if (form.preferredTime) scheduleDetails.push(`Preferred time: ${form.preferredTime}`)
    }

    const baseMessage = form.message.trim()
    const message = [
      ...scheduleDetails,
      ...(scheduleDetails.length && baseMessage ? [''] : []),
      baseMessage,
    ]
      .filter(Boolean)
      .join('\n') ||
      (isSchedule
        ? 'Requesting an appointment to visit the showroom.'
        : `Inquiry about ${pianoTitle ?? brand ?? 'your pianos'}.`)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          inquiryType: form.inquiryType,
          source: isSchedule ? 'schedule' : 'inquiry',
          preferredDate: isSchedule && form.preferredDate ? form.preferredDate : undefined,
          preferredTime: isSchedule && form.preferredTime ? form.preferredTime : undefined,
          pianoTitle: pianoTitle || undefined,
          message,
          ...getSpamSignals(),
        }),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error((json as { error?: string }).error || 'Something went wrong. Please try again.')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const eyebrow = isSchedule ? 'Schedule a Visit' : 'Get in Touch'
  const heading = isSchedule
    ? 'Send us a message'
    : pianoTitle
      ? `Inquire about this piano`
      : brand
        ? `Inquire about ${brand}`
        : 'Tell us what you’re looking for'
  const subhead = isSchedule
    ? "Tell us when you'd like to come by. We'll confirm the location, date, and time."
    : "Share a few details and we'll be in touch. Thank you."

  const label = triggerLabel ?? (isSchedule ? 'Send a Message' : 'Get in Touch')
  const fallbackTriggerClass =
    'block w-full text-center border border-piano-black text-piano-black py-3.5 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-black hover:text-white transition-colors'

  // Stagger field reveals after the panel finishes its entrance.
  const fieldAnim = (i: number): React.CSSProperties => ({
    animation: `contact-modal-field-in 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${0.18 + i * 0.04}s both`,
  })

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClassName ?? fallbackTriggerClass}
      >
        {label}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={close}
            aria-hidden="true"
            className="absolute inset-0 bg-piano-black/60"
            style={{
              animation: closing
                ? 'contact-modal-backdrop-out 0.2s ease-out forwards'
                : 'contact-modal-backdrop-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              backdropFilter: 'blur(6px)',
            }}
          />

          <div
            className="relative bg-piano-cream w-full max-w-lg max-h-[90vh] overflow-y-auto border border-piano-gold/30 shadow-2xl"
            style={{
              animation: closing
                ? `contact-modal-panel-out ${EXIT_MS}ms cubic-bezier(0.4, 0, 1, 1) forwards`
                : 'contact-modal-panel-in 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              transformOrigin: 'center bottom',
            }}
          >
            <button
              type="button"
              onClick={close}
              disabled={loading}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-piano-stone hover:text-piano-black hover:rotate-90 transition-all duration-300 disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 3l10 10M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="px-8 pt-10 pb-8 sm:px-10">
              {submitted ? (
                <div
                  className="py-6 text-center"
                  style={{ animation: 'contact-modal-panel-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both' }}
                >
                  <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">
                    Message Received
                  </p>
                  <h3
                    className="font-cormorant font-light text-piano-black mb-4"
                    style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)' }}
                  >
                    Thank you
                  </h3>
                  <p className="text-piano-stone text-base leading-relaxed mb-8">
                    {isSchedule
                      ? "We'll be in touch shortly to confirm the location, date, and time of your visit. A confirmation has been sent to your email."
                      : "We'll be in touch. A confirmation has been sent to your email."}
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="inline-block border border-piano-black text-piano-black px-10 py-3 font-display text-[11px] tracking-[0.4em] uppercase hover:bg-piano-black hover:text-piano-cream transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div style={fieldAnim(0)}>
                    <p
                      id="contact-modal-title"
                      className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-3"
                    >
                      {eyebrow}
                    </p>
                    <h3 className="font-cormorant font-light text-piano-black text-3xl mb-3">
                      {heading}
                    </h3>
                    <p className="text-piano-stone text-sm leading-relaxed mb-7">{subhead}</p>
                  </div>

                  {pianoTitle && (
                    <div
                      className="flex items-start gap-3 border border-piano-linen bg-piano-linen/40 px-4 py-3 mb-6"
                      style={fieldAnim(1)}
                    >
                      <div className="w-0.5 self-stretch bg-piano-gold/50 shrink-0" />
                      <div>
                        <p className="font-display text-[9px] tracking-[0.45em] uppercase text-piano-stone/60 mb-0.5">
                          Regarding
                        </p>
                        <p className="font-display text-xs text-piano-black tracking-wide">
                          {pianoTitle}
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <HoneypotField inputRef={honeypotRef} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" style={fieldAnim(2)}>
                      <div>
                        <label className="block font-display text-[10px] tracking-[0.35em] uppercase text-piano-stone mb-2">
                          Full Name <span className="text-piano-gold">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-transparent border-b border-piano-stone/30 text-piano-black text-base py-2 focus:outline-none focus:border-piano-burgundy transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-display text-[10px] tracking-[0.35em] uppercase text-piano-stone mb-2">
                          Email <span className="text-piano-gold">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-transparent border-b border-piano-stone/30 text-piano-black text-base py-2 focus:outline-none focus:border-piano-burgundy transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" style={fieldAnim(3)}>
                      <div>
                        <label className="block font-display text-[10px] tracking-[0.35em] uppercase text-piano-stone mb-2">
                          Phone <span className="text-piano-gold">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full bg-transparent border-b border-piano-stone/30 text-piano-black text-base py-2 focus:outline-none focus:border-piano-burgundy transition-colors"
                        />
                      </div>
                      {isSchedule && locations.length > 1 ? (
                        <div>
                          <label className="block font-display text-[10px] tracking-[0.35em] uppercase text-piano-stone mb-2">
                            Preferred Location
                          </label>
                          <select
                            value={form.preferredLocation}
                            onChange={(e) => setForm({ ...form, preferredLocation: e.target.value })}
                            className="w-full bg-transparent border-b border-piano-stone/30 text-piano-black text-base py-2 focus:outline-none focus:border-piano-burgundy transition-colors appearance-none cursor-pointer"
                          >
                            <option value="">No preference</option>
                            {locations.map((loc) => (
                              <option key={loc.id ?? loc.name} value={loc.name}>
                                {loc.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : !isSchedule ? (
                        <div>
                          <label className="block font-display text-[10px] tracking-[0.35em] uppercase text-piano-stone mb-2">
                            I&apos;m interested in
                          </label>
                          <select
                            required
                            value={form.inquiryType}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                inquiryType: e.target.value as '' | 'buy' | 'sell' | 'general',
                              })
                            }
                            className="w-full bg-transparent border-b border-piano-stone/30 text-piano-black text-base py-2 focus:outline-none focus:border-piano-burgundy transition-colors appearance-none cursor-pointer"
                          >
                            <option value="" disabled>
                              Please select…
                            </option>
                            <option value="buy">Buying a piano</option>
                            <option value="sell">Selling a piano</option>
                            <option value="general">General inquiry</option>
                          </select>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>

                    {isSchedule && (
                      <div style={fieldAnim(4)}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block font-display text-[10px] tracking-[0.35em] uppercase text-piano-stone mb-2">
                              Preferred Date
                            </label>
                            <input
                              type="date"
                              value={form.preferredDate}
                              onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                              className="w-full bg-transparent border-b border-piano-stone/30 text-piano-black text-base py-2 focus:outline-none focus:border-piano-burgundy transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block font-display text-[10px] tracking-[0.35em] uppercase text-piano-stone mb-2">
                              Preferred Time
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 2:00 PM"
                              value={form.preferredTime}
                              onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                              className="w-full bg-transparent border-b border-piano-stone/30 text-piano-black text-base py-2 focus:outline-none focus:border-piano-burgundy transition-colors placeholder:text-piano-stone/40"
                            />
                          </div>
                        </div>
                        <p className="text-piano-stone/70 text-sm leading-relaxed mt-3">
                          We will do our best to accommodate your preferred date and time. Please watch for our confirmation.
                        </p>
                      </div>
                    )}

                    <div style={fieldAnim(isSchedule ? 5 : 4)}>
                      <label className="block font-display text-[10px] tracking-[0.35em] uppercase text-piano-stone mb-2">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={
                          isSchedule
                            ? 'Anything we should know? (Optional)'
                            : 'What can we help you with?'
                        }
                        className="w-full bg-transparent border border-piano-stone/30 text-piano-black text-base p-3 focus:outline-none focus:border-piano-burgundy transition-colors placeholder:text-piano-stone/40 resize-none"
                      />
                    </div>

                    {error && (
                      <p className="font-display text-[10px] tracking-[0.2em] uppercase text-piano-burgundy border border-piano-burgundy/30 bg-piano-burgundy/5 px-4 py-3">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      style={fieldAnim(isSchedule ? 6 : 5)}
                      className={cn(
                        'w-full bg-piano-black text-piano-cream py-3.5 font-display text-[11px] tracking-[0.4em] uppercase transition-opacity',
                        loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-85',
                      )}
                    >
                      {loading ? 'Sending…' : 'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
