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
import { getFeaturedPianos } from '@/lib/piano-data'
import { HeroCarousel } from '@/components/piano/HeroCarousel'
import { ShowroomGallerySection } from './ShowroomGallerySection'
import { PianoLogo } from '@/components/layout'
import { LocationTabs } from '@/components/piano/LocationTabs'
import { NewsCarousel } from '@/components/posts/NewsCarousel'
import type { Piano } from '@/types/piano'
import type { PostCard } from '@/lib/payload/posts'
import type { Media } from '@/payload-types'

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
  featured?: Piano[]
  recentPosts?: PostCard[]
  galleryImages?: Media[]
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

export function UsedSteinwaysVariantPage({ locations = [], phone, featured: featuredProp, recentPosts = [], galleryImages = [] }: Props) {
  useScrollReveal()
  const featured = featuredProp ?? getFeaturedPianos()

  return (
    <div style={{ backgroundColor: C.bg }}>

      {/* ═══════════════════════════════════════════════
          HERO — Cinematic dark continuation
          Deep burgundy gradient flows from the header
          into the hero. Photo reveals on the right.
          PianoLogo uses dark theme (gold wordmark)
          to match the header exactly.
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

        {/* Desktop: burgundy gradient left → transparent right
            Mirrors the header's hsl(350, 62–68%, 14–26%) palette */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background: `linear-gradient(
              to right,
              hsl(350, 65%, 12%) 0%,
              hsl(350, 63%, 14%) 28%,
              hsla(350, 62%, 16%, 0.90) 48%,
              hsla(350, 62%, 16%, 0.42) 68%,
              hsla(350, 62%, 14%, 0.06) 100%
            )`,
          }}
        />

        {/* Desktop: subtle top vignette for nav legibility */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background: `linear-gradient(to bottom, rgba(28, 5, 8, 0.38) 0%, transparent 36%)`,
          }}
        />

        {/* Mobile: top-down dark overlay */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background: `linear-gradient(
              to bottom,
              hsl(350, 65%, 12%) 0%,
              hsl(350, 65%, 12%) 48%,
              hsla(350, 62%, 14%, 0.70) 72%,
              transparent 100%
            )`,
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
                style={{ color: 'rgba(245, 235, 220, 0.38)' }}
              >
                New Hampshire · Est. 1993
              </span>
            </div>

            {/* Wordmark — gold, matching the header */}
            <div
              className="mb-12 animate-fade-up"
              style={{ animationDelay: '0.14s', opacity: 0 }}
            >
              <PianoLogo size="xl" theme="dark" noLink />
            </div>

            {/* Tagline */}
            <p
              className="text-lg leading-[1.75] mb-14 animate-fade-up"
              style={{
                animationDelay: '0.24s',
                opacity: 0,
                color: 'rgba(245, 235, 220, 0.50)',
                maxWidth: '30ch',
              }}
            >
              Every instrument personally evaluated by Roger —
              a Registered Piano Technician with thirty years of experience.
            </p>

            {/* CTAs */}
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
                style={{ color: 'rgba(245, 235, 220, 0.48)' }}
              >
                Talk to Roger
                <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
              </Link>
            </div>

            {/* Stats */}
            <div
              className="flex items-start mt-16 pt-10 animate-fade-up"
              style={{ animationDelay: '0.42s', opacity: 0, borderTop: `1px solid rgba(200, 160, 75, 0.15)` }}
            >
              {[
                { n: '30+', l: 'Years' },
                { n: '25',  l: 'Instruments' },
                { n: '10',  l: 'Brands' },
              ].map(({ n, l }, i) => (
                <div key={l} className="flex items-stretch">
                  {i > 0 && (
                    <div
                      className="w-px mx-10 self-stretch"
                      style={{ backgroundColor: 'rgba(200, 160, 75, 0.14)' }}
                    />
                  )}
                  <div>
                    <p
                      className="font-cormorant font-light leading-none"
                      style={{ fontSize: 'clamp(2.4rem, 3.2vw, 3.6rem)', color: C.ivory }}
                    >
                      {n}
                    </p>
                    <p
                      className="font-display text-[9px] tracking-[0.42em] uppercase mt-2"
                      style={{ color: 'rgba(245, 235, 220, 0.30)' }}
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
          FEATURED INSTRUMENTS — cinematic hero carousel
      ═══════════════════════════════════════════════ */}
      <HeroCarousel pianos={featured} />

      {/* ═══════════════════════════════════════════════
          SHOWROOM GALLERY — Bento grid preview
      ═══════════════════════════════════════════════ */}
      <ShowroomGallerySection images={galleryImages} />

      {/* ═══════════════════════════════════════════════
          NEWS — Latest articles from the showroom
      ═══════════════════════════════════════════════ */}
      <section className="py-36 px-8" style={{ backgroundColor: C.bg }}>
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-4">
            <div className="sr">
              <span
                className="font-display text-[10px] tracking-[0.48em] uppercase block mb-5"
                style={{ color: C.accent }}
              >
                From the Showroom
              </span>
              <h2
                className="font-cormorant font-light leading-[1.05]"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)', color: C.text }}
              >
                News &amp; Insights
              </h2>
            </div>
            <Link
              href="/posts"
              className="sr sr-d1 group flex items-center gap-2 font-display text-[10px] tracking-[0.32em] uppercase transition-opacity hover:opacity-50"
              style={{ color: C.muted }}
            >
              All articles
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>

          <div className="sr sr-d2">
            <NewsCarousel posts={recentPosts} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PHILOSOPHY
      ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-36 px-8" style={{ backgroundColor: C.darkBg }}>

        {/* Background image — subtle */}
        <div className="absolute inset-0">
          <Image
            src="/Roger-at-work-2-for-web.jpg"
            alt=""
            fill
            className="object-cover object-[center_30%]"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'hsla(350, 62%, 14%, 0.94)' }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">

          {/* Eyebrow */}
          <div className="sr flex items-center justify-center gap-5 mb-12">
            <div className="h-px w-10 shrink-0" style={{ backgroundColor: 'hsla(40,72%,52%,0.40)' }} />
            <span
              className="font-display text-[10px] tracking-[0.5em] uppercase"
              style={{ color: C.accent }}
            >
              Our Philosophy
            </span>
            <div className="h-px w-10 shrink-0" style={{ backgroundColor: 'hsla(40,72%,52%,0.40)' }} />
          </div>

          {/* Heading */}
          <h2
            className="sr sr-d1 font-cormorant font-light leading-[1.05] mb-8"
            style={{ fontSize: 'clamp(3rem, 6vw, 6.5rem)', color: C.ivory }}
          >
            People, Policies<br />and Pianos.
          </h2>

          {/* Supporting line */}
          <p
            className="sr sr-d2 leading-relaxed mx-auto mb-14"
            style={{ fontSize: '1.125rem', color: 'rgba(245,235,220,0.50)', maxWidth: '42ch' }}
          >
            Thirty years of expertise. A trade-up policy that lets you grow.
            Over two hundred instruments — selected individually, not by catalogue.
          </p>

          {/* CTAs */}
          <div className="sr sr-d3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-10 py-4 font-display text-[11px] tracking-[0.35em] uppercase transition-opacity duration-200 hover:opacity-80"
              style={{ backgroundColor: C.accent, color: 'hsl(350, 62%, 14%)' }}
            >
              Our Story
            </Link>
            <Link
              href="/pianos"
              className="inline-flex items-center justify-center px-10 py-4 font-display text-[11px] tracking-[0.35em] uppercase transition-opacity duration-200 hover:opacity-60"
              style={{ border: `1px solid ${C.borderDark}`, color: 'rgba(245,235,220,0.70)' }}
            >
              Browse Pianos
            </Link>
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
