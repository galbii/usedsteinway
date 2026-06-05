'use client'
import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { useAntiSpam, HoneypotField } from '@/lib/contact/useAntiSpam'
import { ContactModal } from '@/components/contact/ContactModal'

type InquiryFormLocation = { id?: string | null; name: string }

interface PianoInquiryFormProps {
  pianoTitle: string
  pianoSlug: string
  pianoSerial?: string | null
  phone?: string | null
  locations?: InquiryFormLocation[]
}

export function PianoInquiryForm({ pianoTitle, pianoSlug: _pianoSlug, pianoSerial, phone, locations = [] }: PianoInquiryFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' })
  const { honeypotRef, getSpamSignals } = useAntiSpam()

  const telHref = phone ? `tel:+1${phone.replace(/\D/g, '')}` : undefined

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
          ...getSpamSignals(),
        }),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error((json as { error?: string }).error || 'Something went wrong. Please try again.')
      }

      setSubmitted(true)
      setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-px bg-piano-gold/30" />
          <span className="text-piano-gold/50 text-lg">✦</span>
          <div className="w-12 h-px bg-piano-gold/30" />
        </div>

        <p className="font-display text-sm tracking-[0.55em] uppercase text-piano-gold mb-5">
          Message Received
        </p>

        <h3
          className="font-cormorant font-light text-piano-cream leading-tight mb-6"
          style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
        >
          We&apos;ll Be In Touch
        </h3>

        <p className="text-piano-silver text-lg leading-relaxed max-w-sm mb-12">
          You&apos;ll receive a confirmation shortly. Every inquiry is reviewed personally.
        </p>

        <Link
          href="/pianos"
          className="inline-block border border-piano-gold/40 text-piano-gold px-10 py-5 font-display text-sm tracking-[0.4em] uppercase hover:border-piano-gold hover:bg-piano-gold/5 transition-all duration-300"
        >
          Back to Inventory
        </Link>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-16 xl:gap-24">

      {/* ── Left: Form ── */}
      <form onSubmit={handleSubmit} className="space-y-10">
        <HoneypotField inputRef={honeypotRef} />

        {/* Piano context accent */}
        <div className="flex items-start gap-5">
          <div className="w-0.5 self-stretch bg-piano-gold/50 shrink-0 mt-1" />
          <div>
            <p className="font-display text-sm tracking-[0.5em] uppercase text-piano-silver mb-2">
              Regarding
            </p>
            <p
              className="font-cormorant font-light text-piano-cream leading-snug"
              style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)' }}
            >
              {pianoTitle}
            </p>
          </div>
        </div>

        {/* First + Last Name row */}
        <div className="grid sm:grid-cols-2 gap-10">
          <div className="group">
            <label
              htmlFor="inquiry-first-name"
              className="block font-display text-[10px] tracking-[0.4em] uppercase text-piano-silver mb-3 group-focus-within:text-piano-gold transition-colors duration-200"
            >
              First Name <span className="text-piano-gold">*</span>
            </label>
            <input
              id="inquiry-first-name"
              type="text"
              required
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full bg-transparent border-b border-piano-cream/20 text-piano-cream text-xl py-3 focus:outline-none focus:border-piano-gold transition-colors duration-200 placeholder:text-piano-cream/30"
              placeholder="First name"
            />
          </div>
          <div className="group">
            <label
              htmlFor="inquiry-last-name"
              className="block font-display text-[10px] tracking-[0.4em] uppercase text-piano-silver mb-3 group-focus-within:text-piano-gold transition-colors duration-200"
            >
              Last Name <span className="text-piano-gold">*</span>
            </label>
            <input
              id="inquiry-last-name"
              type="text"
              required
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full bg-transparent border-b border-piano-cream/20 text-piano-cream text-xl py-3 focus:outline-none focus:border-piano-gold transition-colors duration-200 placeholder:text-piano-cream/30"
              placeholder="Last name"
            />
          </div>
        </div>

        {/* Email */}
        <div className="group">
          <label
            htmlFor="inquiry-email"
            className="block font-display text-[10px] tracking-[0.4em] uppercase text-piano-silver mb-3 group-focus-within:text-piano-gold transition-colors duration-200"
          >
            Email <span className="text-piano-gold">*</span>
          </label>
          <input
            id="inquiry-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-transparent border-b border-piano-cream/20 text-piano-cream text-xl py-3 focus:outline-none focus:border-piano-gold transition-colors duration-200 placeholder:text-piano-cream/30"
            placeholder="you@email.com"
          />
        </div>

        {/* Phone */}
        <div className="group">
          <label
            htmlFor="inquiry-phone"
            className="block font-display text-[10px] tracking-[0.4em] uppercase text-piano-silver mb-3 group-focus-within:text-piano-gold transition-colors duration-200"
          >
            Phone <span className="text-piano-gold">*</span>
          </label>
          <input
            id="inquiry-phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-transparent border-b border-piano-cream/20 text-piano-cream text-xl py-3 focus:outline-none focus:border-piano-gold transition-colors duration-200 placeholder:text-piano-cream/30"
            placeholder="(508) 555-0000"
          />
        </div>

        {/* Message */}
        <div className="group">
          <label
            htmlFor="inquiry-message"
            className="block font-display text-[10px] tracking-[0.4em] uppercase text-piano-silver mb-3 group-focus-within:text-piano-gold transition-colors duration-200"
          >
            Message <span className="text-piano-cream/30 normal-case font-sans text-base tracking-normal ml-1">optional</span>
          </label>
          <textarea
            id="inquiry-message"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-transparent border-b border-piano-cream/20 text-piano-cream text-xl py-3 focus:outline-none focus:border-piano-gold transition-colors duration-200 placeholder:text-piano-cream/30 resize-none leading-loose"
            placeholder="What would you like to know? Schedule a viewing, request additional information..."
          />
        </div>

        {/* Error */}
        {error && (
          <p className="font-display text-sm tracking-[0.25em] uppercase text-piano-gold/80 border border-piano-gold/20 bg-piano-gold/5 px-5 py-4">
            {error}
          </p>
        )}

        {/* Submit */}
        <div className="pt-2">
          <div className="h-px bg-piano-gold/10 mb-8" />
          <button
            type="submit"
            disabled={loading}
            className={cn(
              'bg-piano-cream text-piano-burgundy px-14 py-5 font-display text-sm tracking-[0.45em] uppercase transition-opacity duration-300',
              loading ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-85',
            )}
          >
            {loading ? 'Sending...' : 'Send Inquiry'}
          </button>
        </div>
      </form>

      {/* ── Right: Sidebar ── */}
      <div className="lg:border-l lg:border-piano-gold/10 lg:pl-16 space-y-8 pt-2">

        {/* Phone */}
        {(phone ?? telHref) && (
          <div>
            <p className="font-cormorant font-light text-piano-cream mb-3" style={{ fontSize: 'clamp(1.4rem, 2vw, 1.8rem)' }}>
              Not sure this is the right piano for you?
            </p>
            <p className="font-display text-[10px] tracking-[0.4em] uppercase text-piano-silver mb-4">
              Call or Text
            </p>
            <a
              href={telHref ?? '#'}
              className="font-cormorant font-light text-piano-cream hover:text-piano-gold transition-colors duration-200"
              style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)' }}
            >
              {phone}
            </a>
            <p className="text-piano-silver/70 text-base leading-relaxed mt-3">
              to have a personal conversation about your piano search.
            </p>
          </div>
        )}

        {/* Book Appointment */}
        <div className="border-t border-piano-gold/10 pt-8">
          <ContactModal
            variant="schedule"
            locations={locations}
            pianoTitle={pianoTitle}
            triggerLabel="Book an Appointment"
            triggerClassName="block w-full text-center border border-piano-gold text-piano-gold py-3.5 font-display text-[11px] tracking-[0.4em] uppercase hover:bg-piano-gold hover:text-piano-burgundy transition-colors"
          />
        </div>
      </div>
    </div>
  )
}
