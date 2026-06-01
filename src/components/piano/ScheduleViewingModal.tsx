'use client'
import { useState, useEffect, useRef } from 'react'
import { useAntiSpam, HoneypotField } from '@/lib/contact/useAntiSpam'
import { cn } from '@/utilities/ui'

const TIME_SLOTS = [
  { value: '11:00', label: '11:00 AM' },
  { value: '11:30', label: '11:30 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '12:30', label: '12:30 PM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '13:30', label: '1:30 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '14:30', label: '2:30 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '15:30', label: '3:30 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '16:30', label: '4:30 PM' },
  { value: '17:00', label: '5:00 PM' },
  { value: '17:30', label: '5:30 PM' },
  { value: '18:00', label: '6:00 PM' },
]

interface ScheduleViewingModalProps {
  open: boolean
  onClose: () => void
  pianoTitle: string
  pianoSlug: string
  pianoSerial?: string | null
}

const EMPTY_FORM = { firstName: '', lastName: '', email: '', phone: '', preferredDate: '', preferredTime: '', message: '' }

export function ScheduleViewingModal({ open, onClose, pianoTitle, pianoSerial }: ScheduleViewingModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const firstInputRef = useRef<HTMLInputElement>(null)
  const { honeypotRef, getSpamSignals } = useAntiSpam()

  // ESC to close
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Focus first field on open
  useEffect(() => {
    if (open) {
      setTimeout(() => firstInputRef.current?.focus(), 50)
    } else {
      // Reset form when modal is dismissed after success
      if (submitted) {
        setSubmitted(false)
        setForm(EMPTY_FORM)
      }
    }
  }, [open, submitted])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone || undefined,
          inquiryType: 'buy',
          pianoTitle,
          pianoSerial: pianoSerial || undefined,
          message: form.message,
          preferredDate: form.preferredDate || undefined,
          preferredTime: form.preferredTime || undefined,
          source: 'schedule',
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

  const handleClose = () => {
    onClose()
    // Short delay so the closing animation completes before resetting
    setTimeout(() => {
      setSubmitted(false)
      setForm(EMPTY_FORM)
      setError(null)
    }, 300)
  }

  const today = new Date().toISOString().split('T')[0]

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ animation: 'sv-backdrop-in 0.2s ease-out both' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Schedule a Viewing"
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-piano-cream shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
        style={{ animation: 'sv-panel-in 0.28s cubic-bezier(0.16,1,0.3,1) both' }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes sv-backdrop-in { from { opacity: 0 } to { opacity: 1 } }
          @keyframes sv-panel-in { from { opacity: 0; transform: scale(0.96) translateY(8px) } to { opacity: 1; transform: scale(1) translateY(0) } }
        `}</style>

        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-8 pb-6 border-b border-piano-linen">
          <div>
            <p className="font-display text-[10px] tracking-[0.5em] uppercase text-piano-stone/50 mb-2">
              Schedule a Viewing
            </p>
            <p
              className="font-cormorant font-light text-piano-black leading-tight"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
            >
              {pianoTitle}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="ml-4 mt-1 shrink-0 text-piano-stone/40 hover:text-piano-black transition-colors duration-150 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-8">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-8">
              {/* Gold divider ornament */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-px bg-piano-gold/40" />
                <span className="text-piano-gold text-base">✦</span>
                <div className="w-10 h-px bg-piano-gold/40" />
              </div>

              <p className="font-display text-[10px] tracking-[0.55em] uppercase text-piano-burgundy mb-4">
                Request Received
              </p>
              <h3
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)' }}
              >
                We&apos;ll Be In Touch
              </h3>
              <p className="text-piano-stone text-base leading-relaxed max-w-xs mb-8">
                A confirmation has been sent to your email. We&rsquo;ll reach out shortly to confirm your appointment.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="border border-piano-burgundy text-piano-burgundy px-10 py-4 font-display text-xs tracking-[0.4em] uppercase hover:bg-piano-burgundy hover:text-piano-cream transition-all duration-200"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              <HoneypotField inputRef={honeypotRef} />

              {/* First + Last Name */}
              <div className="grid sm:grid-cols-2 gap-7">
                <div className="group">
                  <label
                    htmlFor="sv-first-name"
                    className="block font-display text-[10px] tracking-[0.4em] uppercase text-piano-stone mb-2.5 group-focus-within:text-piano-burgundy transition-colors duration-200"
                  >
                    First Name <span className="text-piano-burgundy">*</span>
                  </label>
                  <input
                    id="sv-first-name"
                    ref={firstInputRef}
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-piano-linen text-piano-black text-lg py-2.5 focus:outline-none focus:border-piano-burgundy transition-colors duration-200 placeholder:text-piano-stone/35"
                    placeholder="First name"
                  />
                </div>
                <div className="group">
                  <label
                    htmlFor="sv-last-name"
                    className="block font-display text-[10px] tracking-[0.4em] uppercase text-piano-stone mb-2.5 group-focus-within:text-piano-burgundy transition-colors duration-200"
                  >
                    Last Name <span className="text-piano-burgundy">*</span>
                  </label>
                  <input
                    id="sv-last-name"
                    type="text"
                    required
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-piano-linen text-piano-black text-lg py-2.5 focus:outline-none focus:border-piano-burgundy transition-colors duration-200 placeholder:text-piano-stone/35"
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <label
                  htmlFor="sv-email"
                  className="block font-display text-[10px] tracking-[0.4em] uppercase text-piano-stone mb-2.5 group-focus-within:text-piano-burgundy transition-colors duration-200"
                >
                  Email <span className="text-piano-burgundy">*</span>
                </label>
                <input
                  id="sv-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-piano-linen text-piano-black text-lg py-2.5 focus:outline-none focus:border-piano-burgundy transition-colors duration-200 placeholder:text-piano-stone/35"
                  placeholder="you@email.com"
                />
              </div>

              {/* Phone */}
              <div className="group">
                <label
                  htmlFor="sv-phone"
                  className="block font-display text-[10px] tracking-[0.4em] uppercase text-piano-stone mb-2.5 group-focus-within:text-piano-burgundy transition-colors duration-200"
                >
                  Phone <span className="text-piano-burgundy">*</span>
                </label>
                <input
                  id="sv-phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-piano-linen text-piano-black text-lg py-2.5 focus:outline-none focus:border-piano-burgundy transition-colors duration-200 placeholder:text-piano-stone/35"
                  placeholder="(508) 555-0000"
                />
              </div>

              {/* Date + Time */}
              <div>
                <p className="font-display text-[10px] tracking-[0.4em] uppercase text-piano-stone mb-4">
                  Preferred Date &amp; Time
                </p>
                <div className="grid sm:grid-cols-2 gap-7">
                  <div className="group">
                    <label
                      htmlFor="sv-date"
                      className="block font-display text-[10px] tracking-[0.4em] uppercase text-piano-stone mb-2.5 group-focus-within:text-piano-burgundy transition-colors duration-200"
                    >
                      Date
                    </label>
                    <input
                      id="sv-date"
                      type="date"
                      value={form.preferredDate}
                      onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                      min={today}
                      className="w-full bg-transparent border-b-2 border-piano-linen text-piano-black text-lg py-2.5 focus:outline-none focus:border-piano-burgundy transition-colors duration-200"
                    />
                  </div>
                  <div className="group">
                    <label
                      htmlFor="sv-time"
                      className="block font-display text-[10px] tracking-[0.4em] uppercase text-piano-stone mb-2.5 group-focus-within:text-piano-burgundy transition-colors duration-200"
                    >
                      Time
                    </label>
                    <select
                      id="sv-time"
                      value={form.preferredTime}
                      onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                      className="w-full bg-piano-warm-white border-b-2 border-piano-linen text-piano-black text-lg py-2.5 focus:outline-none focus:border-piano-burgundy transition-colors duration-200 appearance-none cursor-pointer"
                    >
                      <option value="">Select time...</option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot.value} value={slot.value}>{slot.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <p className="text-piano-stone/70 text-sm leading-relaxed mt-4">
                  We will do our best to accommodate your preferred date and time. Please watch for our confirmation.
                </p>
              </div>

              {/* Notes */}
              <div className="group">
                <label
                  htmlFor="sv-message"
                  className="block font-display text-[10px] tracking-[0.4em] uppercase text-piano-stone mb-2.5 group-focus-within:text-piano-burgundy transition-colors duration-200"
                >
                  Notes <span className="text-piano-stone/35 normal-case font-sans text-sm tracking-normal ml-1">optional</span>
                </label>
                <textarea
                  id="sv-message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-piano-linen text-piano-black text-lg py-2.5 focus:outline-none focus:border-piano-burgundy transition-colors duration-200 placeholder:text-piano-stone/35 resize-none"
                  placeholder="Any questions or special requests..."
                />
              </div>

              {/* Error */}
              {error && (
                <p className="font-display text-[10px] tracking-[0.2em] uppercase text-piano-stone border border-piano-linen bg-piano-linen/50 px-4 py-3">
                  {error}
                </p>
              )}

              {/* Submit */}
              <div className="pt-2 border-t border-piano-linen">
                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    'w-full bg-piano-black text-piano-cream py-4 font-display text-xs tracking-[0.4em] uppercase transition-colors duration-200',
                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-piano-burgundy',
                  )}
                >
                  {loading ? 'Sending...' : 'Request Viewing'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
