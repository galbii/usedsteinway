'use client'
/* eslint-disable react/no-unescaped-entities */
/**
 * UsedSteinways — Variant Design (Optimized)
 * ─────────────────────────────────────────────────────────────
 * Palette: Deep Midnight Burgundy + Warm Ivory + Burnished Gold
 *
 * Conceptual direction: A concert hall at night. Warm ivory base
 * sections (like candlelit programme notes) against deep burgundy
 * darks (like velvet seats and stage shadow). Burnished gold accent.
 *
 * Hero redesign: True geometric diagonal slash — a clip-path
 * polygon cuts the ivory panel into the photo, no soft gradient.
 * The CTA button is gold (not dark) to tie the accent into the
 * primary action and soften the ivory panel. Tagline scales up.
 *
 * Cleaned up throughout:
 *   Hero        → diagonal clip-path slash (implemented from original intent)
 *   Primary CTA → gold fill (warmer, more on-brand)
 *   Tagline     → text-lg, more generous leading
 *   Stats       → larger Cormorant numbers, full stat labels
 *   Ticker      → increased text visibility (0.28 → 0.42 opacity)
 *   Categories  → unified border system, richer tag styling
 *   Guides      → minor card refinements
 *   Testimonial → tighter attribution block
 * ─────────────────────────────────────────────────────────────
 */
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedPianos, GUIDES, TESTIMONIALS } from '@/lib/piano-data'
import { FeaturedCarousel } from './FeaturedCarousel'
import { PianoLogo } from '@/components/layout'
import { LocationTabs } from '@/components/piano/LocationTabs'

type Location = {
  name: string
  streetAddress: string
  city: string
  state: string
  zip: string
  googleMapsUrl?: string | null
  id?: string | null
}

type Props = {
  locations?: Location[]
  phone?: string
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.sr, .sr-fade')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const C = {
  bg:          'hsl(36, 22%, 96%)',
  darkBg:      'hsl(350, 62%, 26%)',
  darkCard:    'hsl(350, 56%, 32%)',
  accent:      'hsl(40, 72%, 52%)',
  accentLight: 'hsl(40, 65%, 88%)',
  accentMid:   'hsl(40, 58%, 68%)',
  accentFaded: 'hsla(40, 72%, 52%, 0.22)',
  accentDim:   'hsla(40, 72%, 52%, 0.12)',
  text:        'hsl(350, 12%, 11%)',
  muted:       'hsl(350, 5%, 46%)',
  border:      'hsl(36, 18%, 89%)',
  borderDark:  'hsl(350, 45%, 38%)',
  ivory:       'hsl(36, 22%, 96%)',
}

export function UsedSteinwaysVariantPage({ locations = [], phone }: Props) {
  useScrollReveal()
  const featured = getFeaturedPianos()
  const featuredGuides = GUIDES.slice(0, 3)
  const testimonial = TESTIMONIALS[0]

  return (
    <div style={{ backgroundColor: C.bg }}>

      {/* ═══════════════════════════════════════════════
          HERO — True diagonal clip-path slash
          The ivory panel cuts diagonally into the photo
          using clip-path polygon, replacing the old
          soft gradient fade.
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Photo — full bleed */}
        <div className="absolute inset-0">
          <Image
            src="/Roger-at-work-2-for-web.jpg"
            alt="Roger evaluating a piano in the showroom"
            fill
            priority
            className="object-cover object-[65%_center]"
            sizes="100vw"
          />
        </div>

        {/* Desktop: ivory panel with geometric diagonal cut
            Width 60% — clip-path narrows it to ~50% at bottom,
            creating a ~10% diagonal slice into the photo.         */}
        <div
          className="absolute inset-y-0 left-0 hidden lg:block"
          style={{
            width: '60%',
            backgroundColor: C.bg,
            clipPath: 'polygon(0 0, 100% 0, 84% 100%, 0 100%)',
          }}
        />

        {/* Mobile: ivory gradient — clean top-to-bottom fade */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background: `linear-gradient(to bottom, ${C.bg} 0%, ${C.bg} 56%, transparent 82%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-14 xl:px-20 py-28 lg:py-0">
          <div className="max-w-[540px] lg:max-w-[480px]">

            {/* Overline */}
            <div
              className="flex items-center gap-4 mb-12 animate-fade-up"
              style={{ animationDelay: '0.05s', opacity: 0 }}
            >
              <div className="h-px w-10" style={{ backgroundColor: C.accent }} />
              <span
                className="font-display text-[10px] tracking-[0.5em] uppercase"
                style={{ color: C.muted }}
              >
                New Hampshire · Est. 1993
              </span>
            </div>

            {/* Wordmark — primary identity mark */}
            <div
              className="mb-12 animate-fade-up"
              style={{ animationDelay: '0.14s', opacity: 0 }}
            >
              <PianoLogo size="xl" theme="light" noLink />
            </div>

            {/* Tagline — scaled up from text-base for better impact */}
            <p
              className="text-lg leading-[1.75] mb-14 animate-fade-up"
              style={{
                animationDelay: '0.24s',
                opacity: 0,
                color: C.muted,
                maxWidth: '30ch',
              }}
            >
              Every instrument personally evaluated by Roger —
              a Registered Piano Technician with thirty years of experience.
            </p>

            {/* CTAs — primary in gold (accent), secondary ghost */}
            <div
              className="flex items-center gap-8 animate-fade-up"
              style={{ animationDelay: '0.32s', opacity: 0 }}
            >
              <Link
                href="/pianos"
                className="inline-flex items-center justify-center px-10 py-4 font-display text-[11px] tracking-[0.35em] uppercase transition-opacity duration-200 hover:opacity-80"
                style={{ backgroundColor: C.accent, color: 'hsl(350, 62%, 14%)' }}
              >
                Browse Collection
              </Link>
              <Link
                href="/contact"
                className="group font-display text-[11px] tracking-[0.35em] uppercase inline-flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-50"
                style={{ color: C.muted }}
              >
                Talk to Roger
                <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
              </Link>
            </div>

            {/* Stats — larger Cormorant numbers, full labels */}
            <div
              className="flex items-start mt-16 pt-10 animate-fade-up"
              style={{ animationDelay: '0.42s', opacity: 0, borderTop: `1px solid ${C.border}` }}
            >
              {[
                { n: '30+', l: 'Years',       delay: '0.45s' },
                { n: '25',  l: 'Instruments', delay: '0.55s' },
                { n: '10',  l: 'Brands',      delay: '0.65s' },
              ].map(({ n, l, delay }, i) => (
                <div key={l} className="flex items-stretch" style={{ animationDelay: delay }}>
                  {i > 0 && (
                    <div
                      className="w-px mx-10 self-stretch"
                      style={{ backgroundColor: C.border }}
                    />
                  )}
                  <div>
                    <p
                      className="font-cormorant font-light leading-none"
                      style={{ fontSize: 'clamp(2.4rem, 3.2vw, 3.6rem)', color: C.text }}
                    >
                      {n}
                    </p>
                    <p
                      className="font-display text-[9px] tracking-[0.42em] uppercase mt-2"
                      style={{ color: C.muted }}
                    >
                      {l}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TICKER — Brand names scroll
          Increased opacity from 0.28 → 0.42 for legibility
      ═══════════════════════════════════════════════ */}
      <div
        className="h-16 flex items-center overflow-hidden sr-fade"
        style={{
          backgroundColor: C.darkBg,
          borderTop:    `1px solid ${C.borderDark}`,
          borderBottom: `1px solid ${C.borderDark}`,
        }}
      >
        <div className="flex items-center animate-ticker whitespace-nowrap">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center shrink-0">
              {[
                'Steinway & Sons', '·', 'Handcrafted European Pianos', '·',
                'Bösendorfer', '·', 'C. Bechstein', '·', 'Blüthner', '·',
                'Petrof', '·', 'Schimmel', '·', 'Shigeru Kawai',
              ].map((item, idx) => (
                <span
                  key={idx}
                  className="font-display text-[10px] tracking-[0.45em] uppercase px-8"
                  style={{ color: 'rgba(245, 235, 220, 0.65)' }}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          FEATURED INSTRUMENTS
      ═══════════════════════════════════════════════ */}
      <section className="py-36 px-8" style={{ backgroundColor: C.bg }}>
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-4">
            <div className="sr">
              <span
                className="font-display text-[10px] tracking-[0.48em] uppercase block mb-5"
                style={{ color: C.accent }}
              >
                Hand-Selected
              </span>
              <h2
                className="font-cormorant font-light leading-[1.05]"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)', color: C.text }}
              >
                Featured Instruments
              </h2>
            </div>
            <Link
              href="/pianos"
              className="sr sr-d1 group flex items-center gap-2 font-display text-[10px] tracking-[0.32em] uppercase transition-opacity hover:opacity-50"
              style={{ color: C.muted }}
            >
              View all 25 pianos
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>

          <div className="sr sr-d2">
            <FeaturedCarousel pianos={featured} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PHILOSOPHY — The Three P's
          Roger's actual philosophy: People, Policies, Pianos
      ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: C.darkBg }}>

        {/* Background: Roger working */}
        <div className="absolute inset-0">
          <Image
            src="/Roger-at-work-2-for-web.jpg"
            alt="Roger evaluating a piano in the showroom"
            fill
            className="object-cover object-[center_30%]"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'hsla(350, 62%, 14%, 0.93)' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 pt-36 pb-0">

          {/* Section label + title */}
          <div className="sr mb-20">
            <div className="flex items-center gap-5 mb-10">
              <div className="h-px w-10 shrink-0" style={{ backgroundColor: C.accent }} />
              <span
                className="font-display text-[10px] tracking-[0.5em] uppercase"
                style={{ color: C.accent }}
              >
                Our Philosophy
              </span>
            </div>
            <h2
              className="font-cormorant font-light leading-[1.02]"
              style={{ fontSize: 'clamp(3.2rem, 5.5vw, 6rem)', color: C.ivory }}
            >
              People, Policies<br />and Pianos.
            </h2>
          </div>

          {/* Three P columns */}
          <div
            className="grid grid-cols-1 lg:grid-cols-3"
            style={{ borderTop: `1px solid ${C.borderDark}` }}
          >

            {/* PEOPLE */}
            <div
              className="sr sr-d1 py-14 lg:pr-14"
              style={{ borderRight: `1px solid ${C.borderDark}` }}
            >
              <div className="flex items-baseline gap-5 mb-8">
                <span
                  className="font-cormorant font-light italic leading-none select-none"
                  style={{ fontSize: '5rem', color: 'hsla(40, 72%, 52%, 0.20)' }}
                >
                  P
                </span>
                <h3
                  className="font-cormorant font-light"
                  style={{ fontSize: 'clamp(2rem, 2.8vw, 2.8rem)', color: C.ivory, lineHeight: 1.1 }}
                >
                  People
                </h3>
              </div>
              <p
                className="text-lg leading-[1.85]"
                style={{ color: 'rgba(245, 235, 220, 0.52)' }}
              >
                We are passionate and educated in and about all things piano. Whether you are
                selecting your first piano for your home or the dream-come-true instrument,
                we spend as much time as needed to help you select the right piano — covering
                country of origin, scale design, materials, and how a piano compares to
                another. No detail is too small, and nothing makes us happier than knowing
                that together we have found the perfect piano for your needs.
              </p>
            </div>

            {/* POLICIES */}
            <div
              className="sr sr-d2 py-14 lg:px-14"
              style={{ borderRight: `1px solid ${C.borderDark}` }}
            >
              <div className="flex items-baseline gap-5 mb-8">
                <span
                  className="font-cormorant font-light italic leading-none select-none"
                  style={{ fontSize: '5rem', color: 'hsla(40, 72%, 52%, 0.20)' }}
                >
                  P
                </span>
                <h3
                  className="font-cormorant font-light"
                  style={{ fontSize: 'clamp(2rem, 2.8vw, 2.8rem)', color: C.ivory, lineHeight: 1.1 }}
                >
                  Policies
                </h3>
              </div>
              <p
                className="text-lg leading-[1.85]"
                style={{ color: 'rgba(245, 235, 220, 0.52)' }}
              >
                Since the journey of music is lifelong, we have created policies to help you
                navigate your way down this path as you feel best. Our full trade-up policies
                give you the opportunity to select a piano fitting your current situation.
                When you are ready to move to a different and better piano, you can trade in
                your existing piano based on the original price paid. Your piano purchase is
                an investment — and we want to help you protect it.
              </p>
            </div>

            {/* PIANOS */}
            <div className="sr sr-d3 py-14 lg:pl-14">
              <div className="flex items-baseline gap-5 mb-8">
                <span
                  className="font-cormorant font-light italic leading-none select-none"
                  style={{ fontSize: '5rem', color: 'hsla(40, 72%, 52%, 0.20)' }}
                >
                  P
                </span>
                <h3
                  className="font-cormorant font-light"
                  style={{ fontSize: 'clamp(2rem, 2.8vw, 2.8rem)', color: C.ivory, lineHeight: 1.1 }}
                >
                  Pianos
                </h3>
              </div>
              <p
                className="text-lg leading-[1.85]"
                style={{ color: 'rgba(245, 235, 220, 0.52)' }}
              >
                We believe no single manufacturer can provide the perfect piano for everyone
                at every level. We carefully select over two hundred pianos from makers around
                the world — from Asia to the oldest and newest ateliers of Europe — to match
                as many pianists as possible with the most appropriate instrument for their
                needs. We have traveled the world to visit these factories and find the best
                products with value.
              </p>
            </div>

          </div>
        </div>

        {/* Fazioli quote — full bleed callout */}
        <div
          className="relative z-10 mt-0"
          style={{ borderTop: `1px solid ${C.borderDark}` }}
        >
          <div className="max-w-7xl mx-auto px-8 py-16">
            <div className="sr grid lg:grid-cols-[auto_1fr] gap-12 items-start">
              <div
                className="shrink-0 w-14 h-14 flex items-center justify-center"
                style={{ border: `1px solid ${C.borderDark}` }}
              >
                <span
                  className="font-display text-[9px] tracking-[0.3em] uppercase"
                  style={{ color: C.accent }}
                >
                  F
                </span>
              </div>
              <div>
                <p
                  className="font-display text-[9px] tracking-[0.42em] uppercase mb-6"
                  style={{ color: 'rgba(245,235,220,0.28)' }}
                >
                  Fazioli — on artistic freedom
                </p>
                <blockquote
                  className="font-cormorant font-light italic leading-[1.4] mb-8"
                  style={{
                    fontSize: 'clamp(1.7rem, 2.4vw, 2.4rem)',
                    color: 'rgba(245, 235, 220, 0.72)',
                    maxWidth: '72ch',
                  }}
                >
                  "Fazioli refuses to impose limitations on musical artists, convinced that
                  they should have the freedom to choose which instrument to play, based purely
                  on the belief that it is the best vehicle to express their talent."
                </blockquote>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: 'rgba(245, 235, 220, 0.36)', maxWidth: '64ch' }}
                >
                  This is why at Roger's Piano, you will find the widest range of pianos
                  than any other showroom in New England.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ═══════════════════════════════════════════════
          OUR PIANOS — Three full-width category rows
          Stacked horizontal panels, each with distinct
          visual identity and richer editorial copy.
      ═══════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.bg }}>

        {/* Section header */}
        <div className="px-8 pt-36 pb-20 max-w-7xl mx-auto">
          <div className="sr flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span
                className="font-display text-[10px] tracking-[0.48em] uppercase block mb-5"
                style={{ color: C.accent }}
              >
                The Collection
              </span>
              <h2
                className="font-cormorant font-light leading-[1.02]"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)', color: C.text }}
              >
                Our Pianos
              </h2>
            </div>
            <p
              className="text-lg leading-relaxed max-w-[32ch]"
              style={{ color: C.muted }}
            >
              We carry over two hundred instruments from the world's finest makers — selected
              individually, not by catalogue.
            </p>
          </div>
        </div>

        {/* ── ROW 1: Steinway & Sons ─────────────────── */}
        <Link
          href="/pianos/steinway"
          className="sr sr-d1 group block transition-colors duration-300 hover:bg-[hsl(36,22%,93%)]"
          style={{ borderTop: `1px solid ${C.border}` }}
        >
          <div className="h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ backgroundColor: C.accent }} />
          <div className="max-w-7xl mx-auto px-8 py-14">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <p className="font-display text-[9px] tracking-[0.42em] uppercase mb-5" style={{ color: C.muted }}>
                  Hamburg &amp; New York · Est. 1853
                </p>
                <h3
                  className="font-cormorant font-light leading-[0.95]"
                  style={{ fontSize: 'clamp(4rem, 8vw, 9rem)', color: C.text }}
                >
                  Steinway &amp; Sons
                </h3>
              </div>
              <div className="flex items-end gap-8 shrink-0">
                <div className="flex gap-2 flex-wrap justify-end">
                  {['Model S', 'Model M', 'Model B', 'Model D'].map((m) => (
                    <span key={m} className="font-display text-[8px] tracking-[0.22em] uppercase px-2.5 py-1.5"
                      style={{ backgroundColor: C.accentDim, color: 'hsl(40, 55%, 38%)' }}>
                      {m}
                    </span>
                  ))}
                </div>
                <span className="font-display text-[9px] tracking-[0.35em] uppercase transition-all duration-200 opacity-0 group-hover:opacity-100 shrink-0"
                  style={{ color: C.accent }}>
                  Browse →
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* ── ROW 2: Handcrafted European ───────────── */}
        <Link
          href="/pianos/european"
          className="sr sr-d2 group block transition-colors duration-300"
          style={{ backgroundColor: C.darkBg, borderTop: `1px solid ${C.borderDark}` }}
        >
          <div className="h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ backgroundColor: C.accent }} />
          <div className="max-w-7xl mx-auto px-8 py-14">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <p className="font-display text-[9px] tracking-[0.42em] uppercase mb-5" style={{ color: 'rgba(245,235,220,0.28)' }}>
                  Vienna · Berlin · Leipzig · Hradec Králové
                </p>
                <h3
                  className="font-cormorant font-light leading-[0.95]"
                  style={{ fontSize: 'clamp(4rem, 8vw, 9rem)', color: C.ivory }}
                >
                  Handcrafted European
                </h3>
              </div>
              <div className="flex items-end gap-8 shrink-0">
                <div className="flex gap-2 flex-wrap justify-end">
                  {['Bösendorfer', 'C. Bechstein', 'Blüthner', 'Petrof'].map((b) => (
                    <span key={b} className="font-display text-[8px] tracking-[0.15em] uppercase px-2.5 py-1.5"
                      style={{ border: `1px solid rgba(245,235,220,0.14)`, color: 'rgba(245,235,220,0.40)' }}>
                      {b}
                    </span>
                  ))}
                </div>
                <span className="font-display text-[9px] tracking-[0.35em] uppercase transition-all duration-200 opacity-0 group-hover:opacity-100 shrink-0"
                  style={{ color: C.accent }}>
                  Browse →
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* ── ROW 3: Shigeru Kawai ──────────────────── */}
        <Link
          href="/pianos/shigeru-kawai"
          className="sr sr-d3 group block transition-colors duration-300 hover:bg-[hsl(36,22%,93%)]"
          style={{ borderTop: `1px solid ${C.border}` }}
        >
          <div className="h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ backgroundColor: C.accent }} />
          <div className="max-w-7xl mx-auto px-8 py-14">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <p className="font-display text-[9px] tracking-[0.42em] uppercase mb-5" style={{ color: C.muted }}>
                  Hamamatsu, Japan · Est. 1927
                </p>
                <h3
                  className="font-cormorant font-light leading-[0.95]"
                  style={{ fontSize: 'clamp(4rem, 8vw, 9rem)', color: C.text }}
                >
                  Shigeru Kawai
                </h3>
              </div>
              <div className="flex items-end gap-8 shrink-0">
                <div className="flex gap-2 flex-wrap justify-end">
                  {['SK-2', 'SK-3', 'SK-5', 'SK-6', 'SK-7'].map((m) => (
                    <span key={m} className="font-display text-[8px] tracking-[0.22em] uppercase px-2.5 py-1.5"
                      style={{ backgroundColor: C.accentDim, color: 'hsl(40, 55%, 38%)' }}>
                      {m}
                    </span>
                  ))}
                </div>
                <span className="font-display text-[9px] tracking-[0.35em] uppercase transition-all duration-200 opacity-0 group-hover:opacity-100 shrink-0"
                  style={{ color: C.accent }}>
                  Browse →
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Bottom border */}
        <div style={{ borderTop: `1px solid ${C.border}` }} />

      </section>

      {/* ═══════════════════════════════════════════════
          GUIDES — Ivory cards on deep burgundy
      ═══════════════════════════════════════════════ */}
      <section className="py-36 px-8" style={{ backgroundColor: C.darkBg }}>
        <div className="max-w-7xl mx-auto">

          <div className="w-16 h-px mb-16 sr" style={{ backgroundColor: C.accent }} />

          <div className="sr flex flex-col md:flex-row md:items-end justify-between mb-20 gap-4">
            <div>
              <span
                className="font-display text-[10px] tracking-[0.48em] uppercase block mb-5"
                style={{ color: C.accent }}
              >
                Expert Knowledge
              </span>
              <h2
                className="font-cormorant font-light leading-[1.05]"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)', color: C.ivory }}
              >
                Buy With Confidence
              </h2>
            </div>
            <Link
              href="/guides"
              className="group flex items-center gap-2 font-display text-[10px] tracking-[0.32em] uppercase transition-opacity hover:opacity-50"
              style={{ color: 'rgba(245,235,220,0.42)' }}
            >
              All guides
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGuides.map((guide, gi) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className={`sr sr-d${gi + 1} group flex flex-col p-10 transition-all duration-300 hover:-translate-y-1`}
                style={{
                  backgroundColor: C.bg,
                  border: `1px solid ${C.border}`,
                  boxShadow: '0 4px 28px hsla(350, 62%, 16%, 0.40)',
                }}
              >
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="font-display text-[9px] tracking-[0.38em] uppercase"
                    style={{ color: C.accentMid }}
                  >
                    {guide.category}
                  </span>
                  <span
                    className="font-display text-[9px] tracking-wide"
                    style={{ color: C.muted }}
                  >
                    {guide.readTime}
                  </span>
                </div>
                <h3
                  className="font-cormorant text-[1.9rem] font-light leading-[1.1] mb-5 flex-1"
                  style={{ color: C.text }}
                >
                  {guide.title}
                </h3>
                <p
                  className="text-sm leading-relaxed line-clamp-3 mb-8"
                  style={{ color: C.muted }}
                >
                  {guide.description}
                </p>
                <div
                  className="pt-6"
                  style={{ borderTop: `1px solid ${C.border}` }}
                >
                  <span
                    className="font-display text-[9px] tracking-[0.32em] uppercase inline-flex items-center gap-2 transition-opacity group-hover:opacity-60"
                    style={{ color: C.accentMid }}
                  >
                    Read guide
                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TESTIMONIAL — Burnished gold inversion
          Deep burgundy text on warm gold: maximum
          contrast, most striking moment on the page.
      ═══════════════════════════════════════════════ */}
      {testimonial && (
        <section
          className="relative py-32 px-8 overflow-hidden"
          style={{ backgroundColor: C.accent }}
        >
          {/* Decorative oversized opening quote mark */}
          <div
            className="sr-fade absolute select-none pointer-events-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(18rem, 30vw, 28rem)',
              lineHeight: 1,
              color: 'hsla(350, 62%, 26%, 0.06)',
              top: '-2rem',
              left: '-1rem',
              fontStyle: 'italic',
              fontWeight: 300,
            }}
          >
            &ldquo;
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Label */}
            <div className="flex items-center gap-5 mb-16">
              <div className="h-px max-w-[3rem] flex-1" style={{ backgroundColor: 'hsla(350, 62%, 26%, 0.28)' }} />
              <span
                className="font-display text-[11px] tracking-[0.45em] uppercase"
                style={{ color: 'hsla(350, 62%, 26%, 0.65)' }}
              >
                Client Story
              </span>
            </div>

            {/* Quote */}
            <blockquote
              className="sr font-cormorant font-light italic leading-[1.22] mb-16"
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 3.4rem)',
                color: 'hsl(350, 62%, 14%)',
                maxWidth: '52rem',
              }}
            >
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {/* Attribution + CTA */}
            <div className="sr sr-d2 flex flex-col sm:flex-row sm:items-end justify-between gap-10">
              <div className="flex items-center gap-5">
                <div
                  className="w-10 h-10 flex items-center justify-center shrink-0"
                  style={{ border: '1px solid hsla(350, 62%, 26%, 0.28)' }}
                >
                  <span
                    className="font-cormorant text-xl font-light"
                    style={{ color: 'hsla(350, 62%, 26%, 0.65)' }}
                  >
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p
                    className="font-display text-[12px] tracking-[0.38em] uppercase mb-1.5"
                    style={{ color: 'hsla(350, 12%, 11%, 0.82)' }}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    className="font-display text-[11px] tracking-[0.24em] uppercase"
                    style={{ color: 'hsla(350, 12%, 11%, 0.50)' }}
                  >
                    {testimonial.piano} · {testimonial.location}
                  </p>
                </div>
              </div>

              <div className="sr sr-d3 shrink-0">
                <Link
                  href="/testimonials"
                  className="inline-flex items-center gap-3 px-9 py-4 font-display text-[11px] tracking-[0.35em] uppercase transition-opacity duration-200 hover:opacity-80"
                  style={{
                    backgroundColor: 'hsl(350, 12%, 11%)',
                    color: '#fff',
                  }}
                >
                  More Stories
                  <span className="text-xs">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
          LOCATIONS
      ═══════════════════════════════════════════════ */}
      {locations.length > 0 && (
        <section className="px-8 py-24" style={{ backgroundColor: C.bg }}>
          <div className="max-w-7xl mx-auto">
            <div className="sr flex items-center gap-5 mb-14">
              <div className="h-px w-10 shrink-0" style={{ backgroundColor: C.accent }} />
              <span
                className="font-display text-[10px] tracking-[0.5em] uppercase shrink-0"
                style={{ color: C.muted }}
              >
                Our Locations
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: C.border }} />
            </div>
            <div className="sr sr-d1">
              <LocationTabs locations={locations} phone={phone} />
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════ */}
      <section className="py-36 px-8" style={{ backgroundColor: C.bg }}>
        <div className="max-w-3xl mx-auto text-center">

          <div className="sr flex items-center justify-center gap-5 mb-12">
            <div className="h-px w-10" style={{ backgroundColor: 'hsla(40, 72%, 52%, 0.38)' }} />
            <span
              className="font-display text-[10px] tracking-[0.48em] uppercase"
              style={{ color: C.muted }}
            >
              New Hampshire Showroom
            </span>
            <div className="h-px w-10" style={{ backgroundColor: 'hsla(40, 72%, 52%, 0.38)' }} />
          </div>

          <h2
            className="sr sr-d1 font-cormorant font-light leading-[1.0] mb-8"
            style={{ fontSize: 'clamp(3.5rem, 7vw, 7.5rem)', color: C.text }}
          >
            Begin Your<br />Search
          </h2>

          <p
            className="sr sr-d2 text-lg leading-relaxed max-w-[36ch] mx-auto mb-14"
            style={{ color: C.muted }}
          >
            Tell us what you're looking for — or come hear the pianos yourself.
            Every conversation starts with listening.
          </p>

          <div className="sr sr-d3 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-12 py-4 font-display text-[11px] tracking-[0.3em] uppercase transition-opacity duration-200 hover:opacity-80"
              style={{ backgroundColor: C.text, color: C.bg }}
            >
              Contact Roger
            </Link>
            <Link
              href="/pianos"
              className="inline-flex items-center justify-center px-12 py-4 font-display text-[11px] tracking-[0.3em] uppercase transition-opacity duration-200 hover:opacity-70"
              style={{ border: `1px solid ${C.border}`, color: C.text }}
            >
              Browse Inventory
            </Link>
          </div>

          <p
            className="mt-10 font-display text-sm tracking-wide"
            style={{ color: C.muted }}
          >
            or call{' '}
            <a
              href="tel:+16035550123"
              className="transition-opacity hover:opacity-70"
              style={{ color: C.text }}
            >
              (603) 555-0123
            </a>
          </p>
        </div>
      </section>

    </div>
  )
}
