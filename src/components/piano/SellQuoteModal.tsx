'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'

type FormState = {
  name: string
  email: string
  phone: string
  brand: string
  model: string
  year: string
  condition: string
  message: string
}

type FieldErrors = Partial<Record<keyof FormState, string>>

export function SellQuoteModal() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false) // drives CSS transition
  const [step, setStep] = useState<1 | 2>(1)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [shaking, setShaking] = useState(false)
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '',
    brand: '', model: '', year: '', condition: '', message: '',
  })

  const openModal = useCallback(() => {
    setOpen(true)
    // Double rAF ensures the element is in the DOM before transition fires
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
  }, [])

  const closeModal = useCallback(() => {
    setVisible(false)
    setTimeout(() => {
      setOpen(false)
      // Reset form state after modal is hidden
      setTimeout(() => {
        setStep(1)
        setFieldErrors({})
        setApiError(null)
        setSubmitted(false)
        setForm({ name: '', email: '', phone: '', brand: '', model: '', year: '', condition: '', message: '' })
      }, 100)
    }, 350)
  }, [])

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, closeModal])

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm(f => ({ ...f, [field]: e.target.value }))
      if (fieldErrors[field]) setFieldErrors(fe => ({ ...fe, [field]: undefined }))
    }

  const triggerShake = () => {
    setShaking(true)
    setTimeout(() => setShaking(false), 500)
  }

  const handleNext = () => {
    const errors: FieldErrors = {}
    if (!form.name.trim()) errors.name = 'Required'
    if (!form.email.trim()) errors.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Invalid email'

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      triggerShake()
      return
    }
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setApiError(null)

    const pianoDetails = [
      form.brand && `Brand: ${form.brand}`,
      form.model && `Model: ${form.model}`,
      form.year && `Year: ${form.year}`,
      form.condition && `Condition: ${form.condition}`,
    ].filter(Boolean).join('\n')

    const fullMessage = [pianoDetails, form.message].filter(Boolean).join('\n\n')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, email: form.email,
          phone: form.phone || undefined,
          inquiryType: 'sell',
          message: fullMessage,
        }),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error((json as { error?: string }).error || 'Something went wrong.')
      }
      setSubmitted(true)
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  // Shared input classes
  const inputClass = (field: keyof FormState) =>
    cn(
      'w-full bg-transparent border-b text-white text-lg py-2.5 focus:outline-none transition-colors duration-200 placeholder:text-white/25',
      fieldErrors[field]
        ? 'border-red-400/70 focus:border-red-400'
        : 'border-white/20 focus:border-piano-gold',
    )

  const labelClass = 'block font-display text-sm tracking-[0.4em] uppercase text-white/60 mb-3 group-focus-within:text-piano-gold transition-colors duration-200'

  return (
    <>
      {/* ── Floating trigger ── */}
      <div className="fixed bottom-8 right-8 z-40">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-none animate-ping bg-piano-gold/30 pointer-events-none" style={{ animationDuration: '2.5s' }} />
        <button
          onClick={openModal}
          className="relative bg-piano-gold text-piano-black font-display text-sm tracking-[0.35em] uppercase px-8 py-4 shadow-2xl hover:bg-piano-gold/90 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
        >
          Get a Quote
        </button>
      </div>

      {/* ── Modal ── */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">

          {/* Backdrop */}
          <div
            className="absolute inset-0 backdrop-blur-sm transition-opacity duration-350"
            style={{
              backgroundColor: 'rgba(0,0,0,0.72)',
              opacity: visible ? 1 : 0,
            }}
            onClick={closeModal}
          />

          {/* Panel */}
          <div
            className="relative bg-piano-black w-full sm:max-w-2xl max-h-[92dvh] flex flex-col overflow-hidden transition-all duration-350 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(2rem)',
            }}
          >
            {/* Progress bar */}
            {!submitted && (
              <div className="h-0.5 bg-white/8 shrink-0">
                <div
                  className="h-full bg-piano-gold transition-all duration-500 ease-out"
                  style={{ width: step === 1 ? '50%' : '100%' }}
                />
              </div>
            )}

            {/* Header */}
            <div className="shrink-0 border-b border-white/10 px-8 py-5 flex items-center justify-between">
              <div>
                {!submitted && (
                  <p className="font-display text-xs tracking-[0.5em] uppercase text-white/30 mb-1">
                    Step {step} of 2 — {step === 1 ? 'Your Details' : 'About Your Piano'}
                  </p>
                )}
                <p
                  className="font-cormorant font-light text-white leading-tight"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
                >
                  {submitted ? 'Quote Request Sent' : 'Request a Quote'}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 flex items-center justify-center text-white/35 hover:text-white hover:bg-white/8 rounded-full transition-all duration-200 ml-4 shrink-0 text-lg"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1">
              {submitted ? (
                /* ── Success ── */
                <div className="flex flex-col items-center text-center px-8 py-16">
                  {/* Animated checkmark ring */}
                  <div className="w-16 h-16 rounded-full border-2 border-piano-gold/60 flex items-center justify-center mb-8">
                    <span className="text-piano-gold text-2xl">✓</span>
                  </div>
                  <p className="font-display text-sm tracking-[0.5em] uppercase text-piano-gold mb-4">
                    Quote Request Received
                  </p>
                  <h3
                    className="font-cormorant font-light text-white leading-tight mb-5"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                  >
                    Roger Will Be In Touch
                  </h3>
                  <p className="text-white/65 text-base leading-relaxed max-w-sm mb-10">
                    He reviews every inquiry personally and will respond with a preliminary
                    assessment within 48 hours. No obligation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                    <button
                      onClick={closeModal}
                      className="flex-1 border border-white/20 text-white/70 py-4 font-display text-xs tracking-[0.4em] uppercase hover:border-white/40 hover:text-white transition-all duration-200"
                    >
                      Close
                    </button>
                    <Link
                      href="/contact"
                      onClick={closeModal}
                      className="flex-1 text-center border border-piano-gold/40 text-piano-gold py-4 font-display text-xs tracking-[0.4em] uppercase hover:border-piano-gold hover:bg-piano-gold/5 transition-all duration-200"
                    >
                      Full Contact →
                    </Link>
                  </div>
                </div>
              ) : (
                /* ── Stepped form ── */
                <div className="overflow-hidden">
                  <div
                    className="flex"
                    style={{
                      width: '200%',
                      transform: step === 1 ? 'translateX(0)' : 'translateX(-50%)',
                      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    {/* ── Step 1: Your Details ── */}
                    <div className="px-8 py-8 space-y-8" style={{ width: '50%', minWidth: 0 }}>
                      <p className="text-white/45 text-base leading-relaxed">
                        Let us know how to reach you — Roger responds personally to every inquiry.
                      </p>

                      <div
                        className={cn(
                          'space-y-8 transition-transform duration-200',
                          shaking && '[animation:shake_0.4s_ease-in-out]',
                        )}
                        style={shaking ? { animation: 'shake 0.4s ease-in-out' } : {}}
                      >
                        <div className="grid sm:grid-cols-2 gap-8">
                          <div className="group space-y-1">
                            <label className={labelClass}>
                              Full Name <span className="text-piano-gold">*</span>
                            </label>
                            <input
                              type="text"
                              value={form.name}
                              onChange={set('name')}
                              className={inputClass('name')}
                              placeholder="Your name"
                              autoComplete="name"
                            />
                            {fieldErrors.name && (
                              <p className="text-red-400 text-xs font-display tracking-widest uppercase pt-1">{fieldErrors.name}</p>
                            )}
                          </div>
                          <div className="group space-y-1">
                            <label className={labelClass}>
                              Email <span className="text-piano-gold">*</span>
                            </label>
                            <input
                              type="email"
                              value={form.email}
                              onChange={set('email')}
                              className={inputClass('email')}
                              placeholder="you@email.com"
                              autoComplete="email"
                            />
                            {fieldErrors.email && (
                              <p className="text-red-400 text-xs font-display tracking-widest uppercase pt-1">{fieldErrors.email}</p>
                            )}
                          </div>
                        </div>

                        <div className="group">
                          <label className={labelClass}>
                            Phone{' '}
                            <span className="text-white/30 normal-case font-sans text-base tracking-normal ml-1">optional</span>
                          </label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={set('phone')}
                            className={inputClass('phone')}
                            placeholder="(508) 555-0000"
                            autoComplete="tel"
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="h-px bg-white/10 mb-8" />
                        <button
                          type="button"
                          onClick={handleNext}
                          className="w-full sm:w-auto bg-piano-cream text-piano-burgundy px-12 py-4 font-display text-sm tracking-[0.45em] uppercase hover:opacity-85 active:scale-[0.99] transition-all duration-200"
                        >
                          Continue →
                        </button>
                      </div>
                    </div>

                    {/* ── Step 2: Piano Details ── */}
                    <div className="px-8 py-8" style={{ width: '50%', minWidth: 0 }}>
                      <form onSubmit={handleSubmit} className="space-y-8">
                        <p className="text-white/45 text-base leading-relaxed">
                          Share what you know — approximate details are fine at this stage.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-8">
                          <div className="group">
                            <label className={labelClass}>Brand / Make</label>
                            <input
                              type="text"
                              value={form.brand}
                              onChange={set('brand')}
                              className={inputClass('brand')}
                              placeholder="e.g. Steinway & Sons"
                            />
                          </div>
                          <div className="group">
                            <label className={labelClass}>
                              Year{' '}
                              <span className="text-white/30 normal-case font-sans text-base tracking-normal ml-1">approx.</span>
                            </label>
                            <input
                              type="text"
                              value={form.year}
                              onChange={set('year')}
                              className={inputClass('year')}
                              placeholder="e.g. 1962"
                            />
                          </div>
                        </div>

                        <div className="group">
                          <label className={labelClass}>Model</label>
                          <input
                            type="text"
                            value={form.model}
                            onChange={set('model')}
                            className={inputClass('model')}
                            placeholder="e.g. Model B, Concert Grand"
                          />
                        </div>

                        <div className="group">
                          <label className={labelClass}>Condition</label>
                          <select
                            value={form.condition}
                            onChange={set('condition')}
                            className="w-full bg-piano-black border-b border-white/20 text-white text-lg py-2.5 focus:outline-none focus:border-piano-gold transition-colors duration-200 appearance-none cursor-pointer"
                          >
                            <option value="" className="bg-piano-black">Select condition...</option>
                            <option value="Excellent" className="bg-piano-black">Excellent — showroom ready</option>
                            <option value="Very Good" className="bg-piano-black">Very Good — minor cosmetic wear only</option>
                            <option value="Good" className="bg-piano-black">Good — plays well, some wear</option>
                            <option value="Fair" className="bg-piano-black">Fair — needs work</option>
                            <option value="Unknown" className="bg-piano-black">Unknown / not sure</option>
                          </select>
                        </div>

                        <div className="group">
                          <label className={labelClass}>Additional Details</label>
                          <textarea
                            rows={4}
                            value={form.message}
                            onChange={set('message')}
                            className="w-full bg-transparent border-b border-white/20 text-white text-lg py-2.5 focus:outline-none focus:border-piano-gold transition-colors duration-200 placeholder:text-white/25 resize-none leading-relaxed"
                            placeholder="Restoration history, finish, serial number, storage situation, reason for selling..."
                          />
                        </div>

                        {apiError && (
                          <p className="font-display text-sm tracking-[0.2em] uppercase text-red-400 border border-red-400/25 bg-red-400/5 px-5 py-4">
                            {apiError}
                          </p>
                        )}

                        <div className="pt-2">
                          <div className="h-px bg-white/10 mb-8" />
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <button
                              type="button"
                              onClick={() => setStep(1)}
                              className="text-white/40 font-display text-xs tracking-[0.4em] uppercase hover:text-white/70 transition-colors duration-200 py-2"
                            >
                              ← Back
                            </button>
                            <button
                              type="submit"
                              disabled={loading}
                              className={cn(
                                'flex items-center gap-3 bg-piano-cream text-piano-burgundy px-12 py-4 font-display text-sm tracking-[0.45em] uppercase transition-all duration-200',
                                loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-85 active:scale-[0.99]',
                              )}
                            >
                              {loading ? (
                                <>
                                  <svg className="animate-spin w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                  </svg>
                                  Sending...
                                </>
                              ) : 'Send Quote Request'}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Shake keyframe */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15%       { transform: translateX(-6px); }
          30%       { transform: translateX(6px); }
          45%       { transform: translateX(-4px); }
          60%       { transform: translateX(4px); }
          75%       { transform: translateX(-2px); }
          90%       { transform: translateX(2px); }
        }
      `}</style>
    </>
  )
}
