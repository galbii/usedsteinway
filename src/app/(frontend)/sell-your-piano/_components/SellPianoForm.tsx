'use client'
import { useState } from 'react'
import { cn } from '@/utilities/ui'
import Link from 'next/link'

export function SellPianoForm() {
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
        body: JSON.stringify({ ...form, inquiryType: 'sell' }),
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
      <div className="py-20 flex flex-col items-center text-center">
        <div className="flex gap-px mb-10">
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
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.8rem, 6vw, 4.5rem)' }}
        >
          Message Received
        </h2>
        <div className="flex items-center gap-4 my-7 w-full max-w-xs">
          <div className="flex-1 h-px bg-piano-gold/40" />
          <span className="text-piano-gold text-sm">✦</span>
          <div className="flex-1 h-px bg-piano-gold/40" />
        </div>
        <p className="text-piano-stone text-base leading-relaxed max-w-sm mb-10 font-light">
          We&apos;ll be in touch soon. Due to the high volume of inquiries, we endeavor to respond as quickly as time allows.
        </p>
        <Link
          href="/pianos"
          className="inline-block border border-piano-burgundy text-piano-burgundy px-12 py-4 font-display text-xs tracking-[0.4em] uppercase hover:bg-piano-burgundy hover:text-piano-cream transition-all duration-300"
        >
          Browse the Collection
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div className="group">
          <label className="block font-display text-xs tracking-[0.4em] uppercase text-piano-stone mb-3 group-focus-within:text-piano-gold transition-colors duration-200">
            Full Name <span className="text-piano-gold">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-transparent border-b-2 border-piano-linen text-piano-black text-lg py-3 focus:outline-none focus:border-piano-burgundy transition-colors duration-200 placeholder:text-piano-stone/40"
            placeholder="Your name"
          />
        </div>
        <div className="group">
          <label className="block font-display text-xs tracking-[0.4em] uppercase text-piano-stone mb-3 group-focus-within:text-piano-gold transition-colors duration-200">
            Email Address <span className="text-piano-gold">*</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-transparent border-b-2 border-piano-linen text-piano-black text-lg py-3 focus:outline-none focus:border-piano-burgundy transition-colors duration-200 placeholder:text-piano-stone/40"
            placeholder="you@email.com"
          />
        </div>
      </div>

      <div className="group">
        <label className="block font-display text-xs tracking-[0.4em] uppercase text-piano-stone mb-3 group-focus-within:text-piano-gold transition-colors duration-200">
          Phone Number
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full bg-transparent border-b-2 border-piano-linen text-piano-black text-lg py-3 focus:outline-none focus:border-piano-burgundy transition-colors duration-200 placeholder:text-piano-stone/40"
          placeholder="(508) 555-0000"
        />
      </div>

      <div className="group">
        <label className="block font-display text-xs tracking-[0.4em] uppercase text-piano-stone mb-3 group-focus-within:text-piano-gold transition-colors duration-200">
          About Your Piano <span className="text-piano-gold">*</span>
        </label>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-transparent border-b-2 border-piano-linen text-piano-black text-lg py-3 focus:outline-none focus:border-piano-burgundy transition-colors duration-200 placeholder:text-piano-stone/40 resize-none"
          placeholder="Make, model, approximate year, condition, location..."
        />
      </div>

      {error && (
        <p className="font-display text-[10px] tracking-[0.2em] uppercase text-piano-stone border border-piano-linen bg-piano-linen/50 px-5 py-4">
          {error}
        </p>
      )}

      <div className="pt-2">
        <div className="h-px bg-piano-gold/20 mb-8" />
        <button
          type="submit"
          disabled={loading}
          className={cn(
            'bg-piano-burgundy text-piano-cream px-14 py-5 font-display text-xs tracking-[0.45em] uppercase transition-all duration-300',
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-85',
          )}
        >
          {loading ? 'Sending...' : 'Submit Inquiry'}
        </button>
      </div>
    </form>
  )
}
