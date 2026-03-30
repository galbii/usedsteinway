/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'

type InquiryType = 'buy' | 'sell' | 'general' | 'visit'

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState<InquiryType>('buy')
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: '',
    budget: '',
    timeline: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, send to API route
    setSubmitted(true)
  }

  const inquiryTypes: { id: InquiryType; label: string; description: string }[] = [
    { id: 'buy', label: 'I want to buy', description: 'Browse inventory or find a specific instrument' },
    { id: 'sell', label: 'I want to sell', description: 'Get an appraisal for your piano' },
    { id: 'visit', label: 'Schedule a visit', description: 'Come see the showroom and play the pianos' },
    { id: 'general', label: 'General question', description: 'Advice, appraisals, or anything else' },
  ]

  return (
    <main className="min-h-screen bg-piano-cream">
      {/* Page Header */}
      <section className="bg-piano-burgundy py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">
            Get in Touch
          </p>
          <h1
            className="font-cormorant font-light text-white mb-4"
            style={{ fontSize: 'clamp(3.6rem, 7vw, 8.5rem)' }}
          >
            Contact Roger
          </h1>
          <p className="text-piano-cream/70 text-lg max-w-xl leading-relaxed">
            Every conversation starts with listening. Tell us what you're looking for.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16">

          {/* Left: Form */}
          <div>
            {submitted ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 border border-piano-gold/40 flex items-center justify-center mx-auto mb-6">
                  <span className="text-piano-gold text-2xl">✓</span>
                </div>
                <h2 className="font-cormorant font-light text-piano-black text-3xl mb-4">
                  Message Received
                </h2>
                <p className="text-piano-stone text-lg leading-relaxed max-w-md mx-auto mb-8">
                  Thank you for reaching out. Roger reviews every message personally and will
                  respond within one business day.
                </p>
                <Link
                  href="/pianos"
                  className="inline-block border border-piano-black text-piano-black px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-black hover:text-white transition-colors"
                >
                  Browse the Collection
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Inquiry Type Selector */}
                <div>
                  <label className="block font-display text-[11px] tracking-[0.45em] uppercase text-piano-stone mb-4">
                    What brings you here?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {inquiryTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setInquiryType(type.id)}
                        className={cn(
                          'p-4 text-left border transition-all duration-150',
                          inquiryType === type.id
                            ? 'border-piano-gold bg-piano-gold/5'
                            : 'border-piano-linen hover:border-piano-stone/30 bg-piano-cream',
                        )}
                      >
                        <p className={cn(
                          'font-display text-[11px] tracking-[0.3em] uppercase mb-1',
                          inquiryType === type.id ? 'text-piano-gold' : 'text-piano-stone',
                        )}>
                          {type.label}
                        </p>
                        <p className="text-piano-stone text-xs leading-relaxed">{type.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-display text-[11px] tracking-[0.3em] uppercase text-piano-stone mb-2">
                      Full Name <span className="text-piano-gold">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-piano-linen px-4 py-3 text-piano-black text-base focus:outline-none focus:border-piano-gold transition-colors bg-piano-warm-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block font-display text-[11px] tracking-[0.3em] uppercase text-piano-stone mb-2">
                      Email Address <span className="text-piano-gold">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-piano-linen px-4 py-3 text-piano-black text-base focus:outline-none focus:border-piano-gold transition-colors bg-piano-warm-white"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="block font-display text-[11px] tracking-[0.3em] uppercase text-piano-stone mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-piano-linen px-4 py-3 text-piano-black text-base focus:outline-none focus:border-piano-gold transition-colors bg-piano-warm-white"
                      placeholder="(603) 555-0000"
                    />
                  </div>

                  {inquiryType === 'buy' && (
                    <>
                      <div>
                        <label className="block font-display text-[11px] tracking-[0.3em] uppercase text-piano-stone mb-2">
                          Budget Range
                        </label>
                        <select
                          value={form.budget}
                          onChange={(e) => setForm({ ...form, budget: e.target.value })}
                          className="w-full border border-piano-linen px-4 py-3 text-piano-black text-base focus:outline-none focus:border-piano-gold transition-colors bg-piano-warm-white"
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
                      <div>
                        <label className="block font-display text-[11px] tracking-[0.3em] uppercase text-piano-stone mb-2">
                          Timeline
                        </label>
                        <select
                          value={form.timeline}
                          onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                          className="w-full border border-piano-linen px-4 py-3 text-piano-black text-base focus:outline-none focus:border-piano-gold transition-colors bg-piano-warm-white"
                        >
                          <option value="">Select timeline...</option>
                          <option value="asap">As soon as possible</option>
                          <option value="1-3months">1–3 months</option>
                          <option value="3-6months">3–6 months</option>
                          <option value="exploring">Just exploring</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <label className="block font-display text-[11px] tracking-[0.3em] uppercase text-piano-stone mb-2">
                    Message <span className="text-piano-gold">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-piano-linen px-4 py-3 text-piano-black text-base focus:outline-none focus:border-piano-gold transition-colors bg-piano-warm-white resize-none"
                    placeholder={
                      inquiryType === 'buy'
                        ? "Tell us what you're looking for. Brand preferences, room size, musical style, any specific models you've been considering..."
                        : inquiryType === 'sell'
                          ? "Tell us about your piano — make, model, approximate year, condition, and what you know about its history."
                          : "What can we help you with?"
                    }
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-piano-black text-piano-cream px-12 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-charcoal transition-colors"
                  >
                    Send Message
                  </button>
                  <p className="text-piano-stone/70 text-xs mt-3">
                    Roger responds personally to every message, typically within one business day.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right: Contact Info + Map */}
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="bg-piano-black p-8">
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-6">
                Showroom Details
              </p>
              <div className="space-y-5">
                <div>
                  <p className="font-display text-xs tracking-widest uppercase text-piano-silver/50 mb-1">Address</p>
                  <p className="text-piano-cream text-sm leading-relaxed">
                    123 Concert Hall Drive<br />
                    Concord, New Hampshire 03301
                  </p>
                </div>
                <div>
                  <p className="font-display text-xs tracking-widest uppercase text-piano-silver/50 mb-1">Phone</p>
                  <a href="tel:+16035550123" className="text-piano-gold text-sm hover:text-piano-gold/80 transition-colors">
                    (603) 555-0123
                  </a>
                </div>
                <div>
                  <p className="font-display text-xs tracking-widest uppercase text-piano-silver/50 mb-1">Email</p>
                  <a href="mailto:info@usedsteinways.com" className="text-piano-cream/80 text-sm hover:text-piano-cream transition-colors">
                    info@usedsteinways.com
                  </a>
                </div>
                <div>
                  <p className="font-display text-xs tracking-widest uppercase text-piano-silver/50 mb-2">Hours</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-piano-silver">Monday – Friday</span>
                      <span className="text-piano-cream">10am – 6pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-piano-silver">Saturday</span>
                      <span className="text-piano-cream">10am – 4pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-piano-silver">Sunday</span>
                      <span className="text-piano-cream">By appointment</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-piano-gold/10">
                  <p className="text-piano-silver/60 text-xs leading-relaxed">
                    Evening and weekend appointments available. We recommend calling ahead to ensure
                    the piano you want to try is available.
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="overflow-hidden border border-piano-linen">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46404.94754887869!2d-71.5599!3d43.2081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e2f1aba25b5125%3A0x7af3f5e9a6c9c7f6!2sConcord%2C%20NH!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="260"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="UsedSteinways Showroom Location — Concord, NH"
              />
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/visit"
                className="block text-center border border-piano-black/20 py-3 text-piano-black font-display text-[11px] tracking-[0.3em] uppercase hover:border-piano-gold hover:text-piano-gold transition-colors"
              >
                Plan Your Visit
              </Link>
              <Link
                href="/sell-your-piano"
                className="block text-center border border-piano-black/20 py-3 text-piano-black font-display text-[11px] tracking-[0.3em] uppercase hover:border-piano-gold hover:text-piano-gold transition-colors"
              >
                Sell Your Piano
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
