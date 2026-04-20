'use client'
import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'

interface PianoInquiryFormProps {
  pianoTitle: string
  pianoSlug: string
}

export function PianoInquiryForm({ pianoTitle, pianoSlug: _pianoSlug }: PianoInquiryFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          inquiryType: 'buy',
          message: `Inquiry about: ${pianoTitle}\n\n${form.message}`,
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
          Roger Will Be In Touch
        </h3>

        <p className="text-piano-silver text-lg leading-relaxed max-w-sm mb-12">
          You&apos;ll receive a confirmation shortly. Roger reviews every inquiry personally and
          responds within one business day.
        </p>

        <Link
          href="/contact"
          className="inline-block border border-piano-gold/40 text-piano-gold px-10 py-5 font-display text-sm tracking-[0.4em] uppercase hover:border-piano-gold hover:bg-piano-gold/5 transition-all duration-300"
        >
          Visit the Full Contact Page
        </Link>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-16 xl:gap-24">

      {/* ── Left: Form ── */}
      <form onSubmit={handleSubmit} className="space-y-10">

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

        {/* Name + Email row */}
        <div className="grid sm:grid-cols-2 gap-10">
          <div className="group">
            <label className="block font-display text-sm font-bold tracking-[0.45em] uppercase text-piano-silver mb-3 group-focus-within:text-piano-gold transition-colors duration-200">
              Full Name <span className="text-piano-gold">*</span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-transparent border-b border-piano-cream/20 text-piano-cream text-xl py-3 focus:outline-none focus:border-piano-gold transition-colors duration-200 placeholder:text-piano-cream/30"
              placeholder="Your name"
            />
          </div>
          <div className="group">
            <label className="block font-display text-sm font-bold tracking-[0.45em] uppercase text-piano-silver mb-3 group-focus-within:text-piano-gold transition-colors duration-200">
              Email <span className="text-piano-gold">*</span>
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-transparent border-b border-piano-cream/20 text-piano-cream text-xl py-3 focus:outline-none focus:border-piano-gold transition-colors duration-200 placeholder:text-piano-cream/30"
              placeholder="you@email.com"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="group">
          <label className="block font-display text-sm font-bold tracking-[0.45em] uppercase text-piano-silver mb-3 group-focus-within:text-piano-gold transition-colors duration-200">
            Phone{' '}
            <span className="text-piano-cream/30 normal-case font-sans text-base tracking-normal ml-1">
              optional
            </span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-transparent border-b border-piano-cream/20 text-piano-cream text-xl py-3 focus:outline-none focus:border-piano-gold transition-colors duration-200 placeholder:text-piano-cream/30"
            placeholder="(508) 555-0000"
          />
        </div>

        {/* Message */}
        <div className="group">
          <label className="block font-display text-sm font-bold tracking-[0.45em] uppercase text-piano-silver mb-3 group-focus-within:text-piano-gold transition-colors duration-200">
            Message <span className="text-piano-gold">*</span>
          </label>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-transparent border-b border-piano-cream/20 text-piano-cream text-xl py-3 focus:outline-none focus:border-piano-gold transition-colors duration-200 placeholder:text-piano-cream/30 resize-none leading-loose"
            placeholder="What would you like to know? Schedule a viewing, request additional photos, discuss pricing..."
          />
        </div>

        {/* Error */}
        {error && (
          <p className="font-display text-sm tracking-[0.25em] uppercase text-red-400 border border-red-400/25 bg-red-400/5 px-5 py-4">
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
      <div className="lg:border-l lg:border-piano-gold/10 lg:pl-16 space-y-12 pt-2">

        {/* Full contact page funnel */}
        <div>
          <p className="font-display text-sm tracking-[0.5em] uppercase text-piano-gold mb-4">
            Prefer a Full Conversation?
          </p>
          <p className="text-piano-silver text-lg leading-relaxed mb-7">
            Visit the contact page to schedule a showroom visit, discuss trade-ins, explore
            financing, or simply have a more detailed conversation with Roger about this instrument.
          </p>
          <Link
            href={`/contact?piano=${encodeURIComponent(pianoTitle)}`}
            className="inline-flex items-center gap-3 border border-piano-gold/40 text-piano-gold px-8 py-4 font-display text-sm tracking-[0.4em] uppercase hover:border-piano-gold hover:bg-piano-gold/5 transition-all duration-300 group"
          >
            Full Contact Page
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-piano-gold/10" />
          <span className="text-piano-cream/25 text-base">or</span>
          <div className="flex-1 h-px bg-piano-gold/10" />
        </div>

        {/* Phone */}
        <div>
          <p className="font-display text-sm tracking-[0.5em] uppercase text-piano-silver mb-3">
            Call Directly
          </p>
          <a
            href="tel:+15085450766"
            className="font-cormorant font-light text-piano-cream hover:text-piano-gold transition-colors duration-200"
            style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)' }}
          >
            (508) 545-0766
          </a>
          <p className="text-piano-silver/70 text-sm font-display tracking-[0.35em] uppercase mt-2">
            Mon–Sat, 10am–6pm EST
          </p>
        </div>

        {/* Reassurance */}
        <p className="text-piano-silver/70 text-base leading-relaxed border-t border-piano-gold/10 pt-8">
          Every inquiry is read by Roger personally. No sales teams, no automated responses.
        </p>
      </div>
    </div>
  )
}
