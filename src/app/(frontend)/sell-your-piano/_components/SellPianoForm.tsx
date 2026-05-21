'use client'
import { useState } from 'react'
import { cn } from '@/utilities/ui'
import Link from 'next/link'

type StyleOption = 'grand' | 'upright' | 'digital' | 'unknown'
type PlayerSystemOption = 'yes' | 'no'

type FormState = {
  name: string
  email: string
  phone: string
  brand: string
  model: string
  size: string
  style: StyleOption | ''
  finish: string
  age: string
  serialNumber: string
  playerSystem: PlayerSystemOption | ''
  location: string
  askingPrice: string
  message: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  brand: '',
  model: '',
  size: '',
  style: '',
  finish: '',
  age: '',
  serialNumber: '',
  playerSystem: '',
  location: '',
  askingPrice: '',
  message: '',
}

const styleOptions: { value: StyleOption; label: string }[] = [
  { value: 'grand', label: 'Grand' },
  { value: 'upright', label: 'Upright' },
  { value: 'digital', label: 'Digital' },
  { value: 'unknown', label: "Don't Know" },
]

const playerSystemOptions: { value: PlayerSystemOption; label: string }[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

export function SellPianoForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(initialForm)

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

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
          phone: form.phone,
          message: form.message,
          inquiryType: 'sell',
          pianoDetails: {
            brand: form.brand,
            model: form.model,
            size: form.size,
            style: form.style || undefined,
            finish: form.finish,
            age: form.age,
            serialNumber: form.serialNumber,
            playerSystem: form.playerSystem || undefined,
            location: form.location,
            askingPrice: form.askingPrice,
          },
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

  const inputClass =
    'w-full bg-transparent border-b-2 border-piano-linen text-piano-black text-lg py-3 focus:outline-none focus:border-piano-burgundy transition-colors duration-200 placeholder:text-piano-stone/40'
  const labelClass =
    'block font-display text-xs tracking-[0.4em] uppercase text-piano-stone mb-3 group-focus-within:text-piano-gold transition-colors duration-200'

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div className="group">
          <label className={labelClass}>
            Full Name <span className="text-piano-gold">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div className="group">
          <label className={labelClass}>
            Email Address <span className="text-piano-gold">*</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className={inputClass}
            placeholder="you@email.com"
          />
        </div>
      </div>

      <div className="group">
        <label className={labelClass}>Phone Number</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          className={inputClass}
          placeholder="(508) 555-0000"
        />
      </div>

      <div className="pt-4">
        <div className="flex items-center gap-5 mb-8">
          <p className="font-display text-[11px] tracking-[0.4em] uppercase text-piano-gold shrink-0">
            Piano Details
          </p>
          <div className="flex-1 h-px bg-piano-linen" />
        </div>

        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="group">
              <label className={labelClass}>Brand</label>
              <input
                type="text"
                value={form.brand}
                onChange={(e) => update('brand', e.target.value)}
                className={inputClass}
                placeholder="Steinway, Kawai, ..."
              />
            </div>
            <div className="group">
              <label className={labelClass}>Model</label>
              <input
                type="text"
                value={form.model}
                onChange={(e) => update('model', e.target.value)}
                className={inputClass}
                placeholder="Model B, K-300, ..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="group">
              <label className={labelClass}>Size</label>
              <input
                type="text"
                value={form.size}
                onChange={(e) => update('size', e.target.value)}
                className={inputClass}
                placeholder="6'2&quot;, 48&quot;, ..."
              />
            </div>
            <div className="group">
              <label className={labelClass}>Finish</label>
              <input
                type="text"
                value={form.finish}
                onChange={(e) => update('finish', e.target.value)}
                className={inputClass}
                placeholder="Ebony polish, walnut, ..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="group">
              <label className={labelClass}>Age</label>
              <input
                type="text"
                value={form.age}
                onChange={(e) => update('age', e.target.value)}
                className={inputClass}
                placeholder="Year built or approx. age"
              />
            </div>
            <div className="group">
              <label className={labelClass}>Serial Number</label>
              <input
                type="text"
                value={form.serialNumber}
                onChange={(e) => update('serialNumber', e.target.value)}
                className={inputClass}
                placeholder="Found on the plate or soundboard"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="group">
              <label className={labelClass}>Piano Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => update('location', e.target.value)}
                className={inputClass}
                placeholder="City, State"
              />
            </div>
            <div className="group">
              <label className={labelClass}>Asking Price</label>
              <input
                type="text"
                value={form.askingPrice}
                onChange={(e) => update('askingPrice', e.target.value)}
                className={inputClass}
                placeholder="$ Amount or open to offers"
              />
            </div>
          </div>

          <div>
            <p className={cn(labelClass, 'mb-4')}>Style</p>
            <div className="flex flex-wrap gap-3">
              {styleOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => update('style', form.style === opt.value ? '' : opt.value)}
                  className={cn(
                    'font-display text-[11px] tracking-[0.3em] uppercase px-5 py-3 border transition-all duration-200',
                    form.style === opt.value
                      ? 'border-piano-burgundy bg-piano-burgundy text-piano-cream'
                      : 'border-piano-linen text-piano-stone hover:border-piano-burgundy/40 hover:text-piano-black',
                  )}
                  aria-pressed={form.style === opt.value}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className={cn(labelClass, 'mb-4')}>Player System</p>
            <div className="flex flex-wrap gap-3">
              {playerSystemOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() =>
                    update('playerSystem', form.playerSystem === opt.value ? '' : opt.value)
                  }
                  className={cn(
                    'font-display text-[11px] tracking-[0.3em] uppercase px-5 py-3 border transition-all duration-200',
                    form.playerSystem === opt.value
                      ? 'border-piano-burgundy bg-piano-burgundy text-piano-cream'
                      : 'border-piano-linen text-piano-stone hover:border-piano-burgundy/40 hover:text-piano-black',
                  )}
                  aria-pressed={form.playerSystem === opt.value}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="group">
        <label className={labelClass}>
          Is there anything else we should know about your piano?
        </label>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          className={cn(inputClass, 'resize-none')}
          placeholder="Condition, history, recent service, anything else relevant..."
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
