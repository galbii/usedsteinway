'use client'
import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'

type InquiryType = 'buy' | 'sell' | 'general'

const inquiryTypes: { id: InquiryType; label: string; description: string }[] = [
  { id: 'buy', label: 'Buy a Piano', description: 'Browse inventory or find a specific instrument' },
  { id: 'sell', label: 'Sell a Piano', description: 'Request an appraisal for your piano' },
  { id: 'general', label: 'Contact', description: 'Advice, appraisals, or anything else' },
]

export function ContactForm() {
  const [inquiryType, setInquiryType] = useState<InquiryType>('general')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    budget: '',
    timeline: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          inquiryType,
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
      <div className="py-24 flex flex-col items-center text-center">
        {/* Piano key motif */}
        <div className="flex gap-px mb-12">
          {[true, false, true, false, true, true, false, true, false, true, false, true, true, false, true].map((isWhite, i) => (
            <div
              key={i}
              className={cn(
                isWhite ? 'w-5 h-14 bg-piano-linen border border-piano-stone/10' : 'w-3 h-8 bg-piano-black self-start',
              )}
            />
          ))}
        </div>

        <h2
          className="font-light text-piano-black leading-none mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem, 6vw, 5rem)' }}
        >
          Message Received
        </h2>

        <div className="flex items-center gap-4 my-7 w-full max-w-xs">
          <div className="flex-1 h-px bg-piano-gold/40" />
          <span className="text-piano-gold text-sm">✦</span>
          <div className="flex-1 h-px bg-piano-gold/40" />
        </div>

        <p className="text-piano-stone text-base leading-relaxed max-w-sm mb-12 font-light">
          Roger reviews every message personally and will respond within one business day. A confirmation has been sent to your email.
        </p>

        <Link
          href="/pianos"
          className="inline-block border border-piano-black text-piano-black px-12 py-4 font-display text-xs tracking-[0.4em] uppercase hover:bg-piano-black hover:text-piano-cream transition-all duration-300"
        >
          Browse the Collection
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">

      {/* Inquiry Type Tabs */}
      <div>
        <p className="font-display text-sm tracking-[0.5em] uppercase text-piano-black mb-6">
          Nature of Enquiry
        </p>
        <div className="flex border-b-2 border-piano-linen">
          {inquiryTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setInquiryType(type.id)}
              className={cn(
                'flex-1 pb-4 pt-1 font-display text-xs tracking-[0.25em] uppercase transition-all duration-200 relative text-center',
                inquiryType === type.id
                  ? 'text-piano-gold'
                  : 'text-piano-black/60 hover:text-piano-black',
              )}
            >
              {type.label}
              {inquiryType === type.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-piano-gold" />
              )}
            </button>
          ))}
        </div>
        <p className="text-piano-black text-sm mt-4 leading-relaxed">
          {inquiryTypes.find((t) => t.id === inquiryType)?.description}
        </p>
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div className="group">
          <label className="block font-display text-xs tracking-[0.4em] uppercase text-piano-black mb-3 group-focus-within:text-piano-gold transition-colors duration-200">
            Full Name <span className="text-piano-gold">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-transparent border-b-2 border-piano-linen text-piano-black text-base py-3 focus:outline-none focus:border-piano-gold transition-colors duration-200 placeholder:text-piano-stone/50"
            placeholder="Your name"
          />
        </div>
        <div className="group">
          <label className="block font-display text-xs tracking-[0.4em] uppercase text-piano-black mb-3 group-focus-within:text-piano-gold transition-colors duration-200">
            Email Address <span className="text-piano-gold">*</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-transparent border-b-2 border-piano-linen text-piano-black text-base py-3 focus:outline-none focus:border-piano-gold transition-colors duration-200 placeholder:text-piano-stone/50"
            placeholder="you@email.com"
          />
        </div>
      </div>

      {/* Phone + Conditional budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div className="group">
          <label className="block font-display text-xs tracking-[0.4em] uppercase text-piano-black mb-3 group-focus-within:text-piano-gold transition-colors duration-200">
            Phone Number
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-transparent border-b-2 border-piano-linen text-piano-black text-base py-3 focus:outline-none focus:border-piano-gold transition-colors duration-200 placeholder:text-piano-stone/50"
            placeholder="(508) 555-0000"
          />
        </div>

        {inquiryType === 'buy' && (
          <div className="group">
            <label className="block font-display text-xs tracking-[0.4em] uppercase text-piano-black mb-3 group-focus-within:text-piano-gold transition-colors duration-200">
              Budget Range
            </label>
            <select
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              className="w-full bg-piano-warm-white border-b-2 border-piano-linen text-piano-black text-base py-3 focus:outline-none focus:border-piano-gold transition-colors duration-200 appearance-none cursor-pointer"
            >
              <option value="">Select range...</option>
              <option value="under-30k">Under $30,000</option>
              <option value="30-50k">$30,000 – $50,000</option>
              <option value="50-80k">$50,000 – $80,000</option>
              <option value="80-120k">$80,000 – $120,000</option>
              <option value="over-120k">Over $120,000</option>
              <option value="flexible">Flexible / Not sure</option>
            </select>
          </div>
        )}
      </div>

      {/* Timeline (buy only) */}
      {inquiryType === 'buy' && (
        <div className="group">
          <label className="block font-display text-xs tracking-[0.4em] uppercase text-piano-black mb-3 group-focus-within:text-piano-gold transition-colors duration-200">
            Purchase Timeline
          </label>
          <select
            value={form.timeline}
            onChange={(e) => setForm({ ...form, timeline: e.target.value })}
            className="w-full bg-piano-warm-white border-b-2 border-piano-linen text-piano-black text-base py-3 focus:outline-none focus:border-piano-gold transition-colors duration-200 appearance-none cursor-pointer"
          >
            <option value="">Select timeline...</option>
            <option value="asap">As soon as possible</option>
            <option value="1-3months">1–3 months</option>
            <option value="3-6months">3–6 months</option>
            <option value="exploring">Just exploring</option>
          </select>
        </div>
      )}

      {/* Message */}
      <div className="group">
        <label className="block font-display text-xs tracking-[0.4em] uppercase text-piano-black mb-3 group-focus-within:text-piano-gold transition-colors duration-200">
          Message <span className="text-piano-gold">*</span>
        </label>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-transparent border-b-2 border-piano-linen text-piano-black text-base py-3 focus:outline-none focus:border-piano-gold transition-colors duration-200 placeholder:text-piano-stone/50 resize-none"
          placeholder={
            inquiryType === 'buy'
              ? "Tell us what you're looking for — brand preferences, room size, musical style, specific models you've been considering..."
              : inquiryType === 'sell'
                ? "Tell us about your piano — make, model, approximate year, condition, and what you know about its history."
                : "What can we help you with?"
          }
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="font-display text-xs tracking-[0.2em] uppercase text-red-600 border border-red-200 bg-red-50 px-5 py-4">
          {error}
        </p>
      )}

      {/* Submit */}
      <div className="pt-4">
        <div className="h-px bg-piano-gold/20 mb-10" />
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <button
            type="submit"
            disabled={loading}
            className={cn(
              'bg-piano-black text-piano-cream px-14 py-5 font-display text-xs tracking-[0.45em] uppercase transition-all duration-300 whitespace-nowrap',
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-piano-charcoal',
            )}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
          <p className="text-piano-stone text-sm leading-relaxed">
            Roger responds personally to every message,<br className="hidden sm:block" /> typically within one business day.
          </p>
        </div>
      </div>
    </form>
  )
}
