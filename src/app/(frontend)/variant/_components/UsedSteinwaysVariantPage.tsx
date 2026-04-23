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
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Media as MediaComponent } from '@/components/Media'
import { getFeaturedPianos } from '@/lib/piano-data'
import { FeaturedCarousel } from './FeaturedCarousel'
import { ShowroomGallerySection } from './ShowroomGallerySection'
import { LocationTabs } from '@/components/piano/LocationTabs'
import { NewsCarousel } from '@/components/posts/NewsCarousel'
import type { Piano } from '@/types/piano'
import type { PostCard } from '@/lib/payload/posts'
import type { BrandRow } from '@/lib/payload/brands'
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
  brands?: BrandRow[]
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
  charcoal:    'hsl(25, 5%, 12%)',
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

const HERO_INTERVAL = 3500
const HERO_FADE_MS  = 1000

export function UsedSteinwaysVariantPage({ locations = [], phone, featured: featuredProp, recentPosts = [], galleryImages = [], brands = [] }: Props) {
  useScrollReveal()
  const featured = featuredProp ?? getFeaturedPianos()

  // Hero image cycling — double-buffer crossfade
  const [heroSlot, setHeroSlot] = useState<{ a: number; b: number; front: 'a' | 'b' }>({
    a: 0,
    b: Math.min(1, galleryImages.length - 1),
    front: 'a',
  })

  useEffect(() => {
    if (galleryImages.length <= 1) return
    const timer = setInterval(() => {
      setHeroSlot((prev) => {
        const currentIdx = prev.front === 'a' ? prev.a : prev.b
        const nextIdx    = (currentIdx + 1) % galleryImages.length
        return prev.front === 'a'
          ? { a: prev.a, b: nextIdx, front: 'b' }
          : { a: nextIdx, b: prev.b, front: 'a' }
      })
    }, HERO_INTERVAL)
    return () => clearInterval(timer)
  }, [galleryImages.length])

  return (
    <div style={{ backgroundColor: C.bg }}>

      {/* ═══════════════════════════════════════════════
          HERO — Two-column editorial, white base
          Left: monogram badge, large italic wordmark,
                tagline, CTAs, stats
          Right: Roger's portrait with corner marks
                 and caption overlay
      ═══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: C.ivory, minHeight: '100svh' }}
      >

        {/* Warm radial glow — softens the ivory toward the left */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 80% at 20% 50%, hsl(36, 42%, 90%) 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-10 lg:grid lg:grid-cols-[58%_42%] min-h-[100svh]">

          {/* ── LEFT COLUMN — Brand identity ── */}
          <div
            className="flex flex-col justify-center min-w-0 overflow-hidden px-10 md:px-16 xl:px-24 py-28 lg:py-20"
            style={{ borderRight: `1px solid hsla(40, 72%, 52%, 0.16)` }}
          >

            {/* Overline — slides in from left */}
            <div
              className="flex items-center gap-5 mb-14"
              style={{ animation: 'reveal-left 0.9s cubic-bezier(0.16,1,0.3,1) 0.05s both' }}
            >
              <div
                className="h-px shrink-0"
                style={{
                  width: '2.5rem',
                  backgroundColor: C.accent,
                  animation: 'scale-x-in 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both',
                  transformOrigin: 'left',
                }}
              />
              <span className="font-display text-[11px] tracking-[0.55em] uppercase" style={{ color: C.muted }}>
                Est. 1993 · Massachusetts
              </span>
            </div>

            {/* Monogram + wordmark */}
            <div
              className="mb-8"
              style={{ animation: 'section-reveal 1s cubic-bezier(0.16,1,0.3,1) 0.12s both' }}
            >
              <div className="mb-8 flex justify-center">
                <Image
                  src="/UsedSteinway.png"
                  alt="UsedSteinways monogram"
                  width={110}
                  height={110}
                  priority
                  style={{ animation: 'float-badge 6s ease-in-out 1.2s infinite' }}
                />
              </div>

              <h1
                className="leading-[0.90]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(4rem, 7.8vw, 8.5rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: C.text,
                  letterSpacing: '-0.015em',
                  animation: 'reveal-left 1s cubic-bezier(0.16,1,0.3,1) 0.22s both',
                }}
              >
                UsedSteinways
              </h1>
            </div>

            {/* Gold sub-label */}
            <p
              className="font-display text-[11px] tracking-[0.50em] uppercase mb-12"
              style={{ color: C.accent, animation: 'fade-up 0.8s ease-out 0.36s both' }}
            >
              Rare Instruments · Expert Hands
            </p>

            {/* Tagline */}
            <p
              className="text-xl leading-[1.75] mb-14"
              style={{
                color: C.muted,
                maxWidth: '34ch',
                animation: 'reveal-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.46s both',
              }}
            >
              Every instrument personally evaluated by Roger —
              a Registered Piano Technician with thirty years of experience.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16"
              style={{ animation: 'fade-up 0.8s ease-out 0.58s both' }}
            >
              {/* Primary — fill sweeps to gold on hover */}
              <Link
                href="/pianos"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden font-display text-[11px] tracking-[0.38em] uppercase transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]"
                style={{
                  backgroundColor: C.darkBg,
                  color: C.ivory,
                  padding: '1.1rem 2.8rem',
                  boxShadow: `0 4px 24px hsla(350,62%,14%,0.20)`,
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"
                  style={{ backgroundColor: C.accent }}
                  aria-hidden
                />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[hsl(350,62%,14%)]">
                  Browse Collection
                </span>
                <span className="relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[hsl(350,62%,14%)]">→</span>
              </Link>

              {/* Secondary — outlined, fills dark on hover */}
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 font-display text-[11px] tracking-[0.38em] uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] hover:text-[hsl(36,22%,96%)]"
                style={{
                  border: `1.5px solid ${C.text}`,
                  color: C.text,
                  padding: '1.05rem 2.2rem',
                }}
              >
                Talk to Roger
                <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
              </Link>
            </div>

            {/* Stats — staggered counter-up */}
            <div
              className="flex items-start pt-10"
              style={{ borderTop: `1px solid ${C.border}`, maxWidth: '32rem' }}
            >
              {[
                { n: '30+', l: 'Years',       delay: '0.68s' },
                { n: '25',  l: 'Instruments', delay: '0.80s' },
                { n: '10',  l: 'Brands',      delay: '0.92s' },
              ].map(({ n, l, delay }, i) => (
                <div
                  key={l}
                  className="flex items-stretch"
                  style={{ animation: `counter-up 0.7s cubic-bezier(0.16,1,0.3,1) ${delay} both` }}
                >
                  {i > 0 && (
                    <div className="w-px mx-8 self-stretch" style={{ backgroundColor: C.border }} />
                  )}
                  <div>
                    <p
                      className="font-cormorant font-light leading-none"
                      style={{ fontSize: 'clamp(2.8rem, 3.5vw, 4rem)', color: C.text }}
                    >
                      {n}
                    </p>
                    <p className="font-display text-[10px] tracking-[0.42em] uppercase mt-2" style={{ color: C.muted }}>
                      {l}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ── RIGHT COLUMN — Gallery cycling images ── */}
          <div
            className="relative hidden lg:block overflow-hidden"
            style={{ animation: 'reveal-right 1s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}
          >

            {galleryImages.length > 0 ? (
              <>
                {/* Slot A */}
                {galleryImages[heroSlot.a] && (
                  <div
                    className="absolute inset-0"
                    style={{
                      opacity: heroSlot.front === 'a' ? 1 : 0,
                      transition: `opacity ${HERO_FADE_MS}ms ease-in-out`,
                      animation: heroSlot.front === 'a' ? 'kenburns 18s ease-in-out infinite alternate' : undefined,
                    }}
                  >
                    <MediaComponent
                      resource={galleryImages[heroSlot.a]}
                      fill
                      imgClassName="object-cover object-center"
                      priority
                    />
                  </div>
                )}
                {/* Slot B */}
                {galleryImages[heroSlot.b] && (
                  <div
                    className="absolute inset-0"
                    style={{
                      opacity: heroSlot.front === 'b' ? 1 : 0,
                      transition: `opacity ${HERO_FADE_MS}ms ease-in-out`,
                    }}
                  >
                    <MediaComponent
                      resource={galleryImages[heroSlot.b]}
                      fill
                      imgClassName="object-cover object-center"
                    />
                  </div>
                )}
              </>
            ) : (
              <Image
                src="/Roger-at-work-2-for-web.jpg"
                alt="Roger evaluating a piano in the showroom"
                fill
                priority
                className="object-cover object-[65%_center]"
                sizes="42vw"
              />
            )}

            {/* Corner marks — top left */}
            <div className="absolute top-8 left-8 z-20 pointer-events-none">
              <div className="w-7 h-px" style={{ backgroundColor: C.accent }} />
              <div className="w-px h-7" style={{ backgroundColor: C.accent }} />
            </div>

            {/* Corner marks — top right */}
            <div className="absolute top-8 right-8 z-20 pointer-events-none flex flex-col items-end">
              <div className="w-7 h-px" style={{ backgroundColor: C.accent }} />
              <div className="w-px h-7" style={{ backgroundColor: C.accent }} />
            </div>

            {/* Corner marks — bottom left */}
            <div className="absolute bottom-8 left-8 z-20 pointer-events-none flex flex-col justify-end">
              <div className="w-px h-7" style={{ backgroundColor: C.accent }} />
              <div className="w-7 h-px" style={{ backgroundColor: C.accent }} />
            </div>

            {/* Corner marks — bottom right */}
            <div className="absolute bottom-8 right-8 z-20 pointer-events-none flex flex-col items-end justify-end">
              <div className="w-px h-7" style={{ backgroundColor: C.accent }} />
              <div className="w-7 h-px" style={{ backgroundColor: C.accent }} />
            </div>

            {/* Centered caption overlay */}
            {(() => {
              const activeIdx = heroSlot.front === 'a' ? heroSlot.a : heroSlot.b
              const activeImg = galleryImages.length > 0 ? galleryImages[activeIdx] : null
              const caption   = activeImg?.caption ?? activeImg?.alt ?? null
              if (!caption) return null
              return (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-10 pointer-events-none"
                  style={{ background: `linear-gradient(to bottom, rgba(10,2,3,0.18) 0%, rgba(10,2,3,0.52) 50%, rgba(10,2,3,0.22) 100%)` }}
                >
                  {/* Accent line above */}
                  <div
                    key={`line-${activeIdx}`}
                    className="animate-fade-up mb-5"
                    style={{ animationDuration: '0.6s', animationDelay: '0.05s' }}
                  >
                    <div className="h-px w-10 mx-auto" style={{ backgroundColor: `hsla(40, 72%, 52%, 0.70)` }} />
                  </div>

                  {/* Caption text */}
                  <p
                    key={`caption-${activeIdx}`}
                    className="animate-fade-up"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)',
                      fontWeight: 300,
                      fontStyle: 'italic',
                      color: 'rgba(245, 235, 215, 0.96)',
                      lineHeight: 1.25,
                      maxWidth: '22ch',
                      animationDuration: '0.7s',
                      animationDelay: '0.12s',
                    }}
                  >
                    {caption}
                  </p>

                  {/* Accent line below */}
                  <div
                    key={`line2-${activeIdx}`}
                    className="animate-fade-up mt-5"
                    style={{ animationDuration: '0.6s', animationDelay: '0.22s' }}
                  >
                    <div className="h-px w-10 mx-auto" style={{ backgroundColor: `hsla(40, 72%, 52%, 0.70)` }} />
                  </div>
                </div>
              )
            })()}

          </div>

        </div>

        {/* Mobile — full-bleed photo strip */}
        <div className="relative lg:hidden w-full overflow-hidden" style={{ height: '60vw', minHeight: '280px', maxHeight: '480px' }}>
          {galleryImages.length > 0 ? (
            <>
              {galleryImages[heroSlot.a] && (
                <div
                  className="absolute inset-0"
                  style={{ opacity: heroSlot.front === 'a' ? 1 : 0, transition: `opacity ${HERO_FADE_MS}ms ease-in-out` }}
                >
                  <MediaComponent resource={galleryImages[heroSlot.a]} fill imgClassName="object-cover object-center" priority />
                </div>
              )}
              {galleryImages[heroSlot.b] && (
                <div
                  className="absolute inset-0"
                  style={{ opacity: heroSlot.front === 'b' ? 1 : 0, transition: `opacity ${HERO_FADE_MS}ms ease-in-out` }}
                >
                  <MediaComponent resource={galleryImages[heroSlot.b]} fill imgClassName="object-cover object-center" />
                </div>
              )}
              {/* Centered caption */}
              {(() => {
                const activeIdx = heroSlot.front === 'a' ? heroSlot.a : heroSlot.b
                const activeImg = galleryImages[activeIdx]
                const caption   = activeImg?.caption ?? activeImg?.alt ?? null
                if (!caption) return null
                return (
                  <div
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8 pointer-events-none"
                    style={{ background: `linear-gradient(to bottom, rgba(10,2,3,0.12) 0%, rgba(10,2,3,0.48) 50%, rgba(10,2,3,0.14) 100%)` }}
                  >
                    <div key={`mline-${activeIdx}`} className="animate-fade-up mb-4" style={{ animationDuration: '0.6s', animationDelay: '0.05s' }}>
                      <div className="h-px w-8 mx-auto" style={{ backgroundColor: `hsla(40, 72%, 52%, 0.70)` }} />
                    </div>
                    <p
                      key={`mcaption-${activeIdx}`}
                      className="animate-fade-up"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(1.3rem, 5vw, 2rem)',
                        fontWeight: 300,
                        fontStyle: 'italic',
                        color: 'rgba(245, 235, 215, 0.96)',
                        lineHeight: 1.25,
                        maxWidth: '20ch',
                        animationDuration: '0.7s',
                        animationDelay: '0.12s',
                      }}
                    >
                      {caption}
                    </p>
                    <div key={`mline2-${activeIdx}`} className="animate-fade-up mt-4" style={{ animationDuration: '0.6s', animationDelay: '0.22s' }}>
                      <div className="h-px w-8 mx-auto" style={{ backgroundColor: `hsla(40, 72%, 52%, 0.70)` }} />
                    </div>
                  </div>
                )
              })()}
            </>
          ) : (
            <Image
              src="/Roger-at-work-2-for-web.jpg"
              alt="Roger evaluating a piano in the showroom"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          )}
        </div>

      </section>

      {/* ═══════════════════════════════════════════════
          TICKER — Brand names scroll
          Increased opacity from 0.28 → 0.42 for legibility
      ═══════════════════════════════════════════════ */}
      <div
        className="h-16 flex items-center overflow-hidden"
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
          NEWS — Full-bleed editorial hero carousel
      ═══════════════════════════════════════════════ */}
      <NewsCarousel posts={recentPosts} />

      {/* ═══════════════════════════════════════════════
          OUR PIANOS — Bold editorial header
      ═══════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.charcoal }}>
        <div className="max-w-7xl mx-auto px-8 pt-24 pb-0">

          {/* Eyebrow */}
          <div className="sr flex items-center gap-5 mb-14">
            <div className="h-px w-12 shrink-0" style={{ backgroundColor: C.accent }} />
            <span
              className="font-display text-[10px] tracking-[0.55em] uppercase"
              style={{ color: C.accent }}
            >
              The Collection
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Massive heading + right column */}
          <div
            className="sr flex flex-col xl:flex-row xl:items-end justify-between gap-10 pb-20"
            style={{ borderBottom: `1px solid rgba(255,255,255,0.08)` }}
          >
            <h2
              className="font-cormorant font-light leading-[0.88] shrink-0"
              style={{ fontSize: 'clamp(5.5rem, 13vw, 14rem)', color: C.ivory, letterSpacing: '-0.015em' }}
            >
              Our Pianos
            </h2>

            <div className="xl:text-right space-y-5 shrink-0 pb-2">
              <div>
                <span
                  className="font-cormorant font-light block leading-none"
                  style={{ fontSize: 'clamp(2.8rem, 4.5vw, 5rem)', color: C.accent }}
                >
                  200+
                </span>
                <span
                  className="font-display text-[9px] tracking-[0.4em] uppercase"
                  style={{ color: 'rgba(245,235,220,0.28)' }}
                >
                  Instruments In Stock
                </span>
              </div>
              <p
                className="text-base leading-relaxed xl:max-w-[28ch] xl:ml-auto"
                style={{ color: 'rgba(245,235,220,0.46)' }}
              >
                From the world&apos;s finest makers — selected individually, not by catalogue.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          OUR PIANOS — Three fixed category rows
      ═══════════════════════════════════════════════ */}
      <section>
        {(() => {
          const steinway   = brands.find((b) => b.category === 'steinway')
          const european   = brands.filter((b) => b.category === 'european')
          const shigeru    = brands.find((b) => b.category === 'shigeru-kawai')

          const steinwayModels  = steinway?.models.slice(0, 5) ?? []
          const shigeruModels   = shigeru?.models.slice(0, 5) ?? []

          const steinwayEyebrow = [steinway?.country, steinway?.founded ? `Est. ${steinway.founded}` : null].filter(Boolean).join(' · ')
          const shigeruEyebrow  = [shigeru?.country,  shigeru?.founded  ? `Est. ${shigeru.founded}`  : null].filter(Boolean).join(' · ')

          const tagStyle = (dark: boolean) => dark
            ? { border: `1px solid rgba(245,235,220,0.16)`, color: 'rgba(245,235,220,0.44)' }
            : { backgroundColor: C.accentDim, color: 'hsl(40, 55%, 36%)' }

          const btnStyle = (dark: boolean) => dark
            ? { border: `1px solid ${C.borderDark}`, color: C.accent, backgroundColor: 'transparent' }
            : { backgroundColor: C.text, color: C.ivory }

          const rowCls = (i: number) => `sr sr-d${i + 1} group block transition-colors duration-300`

          return (
            <>
              {/* ── ROW 1: Steinway & Sons ── */}
              <Link
                href="/pianos?category=steinway"
                className={rowCls(0)}
                style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}` }}
              >
                <div className="h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ backgroundColor: C.accent }} />
                <div className="max-w-7xl mx-auto px-8 py-20">
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                    <div className="min-w-0">
                      {steinwayEyebrow && (
                        <p className="font-display text-[11px] tracking-[0.45em] uppercase mb-6" style={{ color: C.muted }}>
                          {steinwayEyebrow}
                        </p>
                      )}
                      <h3 className="font-cormorant font-light leading-[0.92]" style={{ fontSize: 'clamp(4.5rem, 9vw, 11rem)', color: C.text }}>
                        Steinway &amp; Sons
                      </h3>
                      {steinway?.tagline && (
                        <p className="mt-6 text-lg leading-relaxed max-w-[38ch]" style={{ color: C.muted }}>{steinway.tagline}</p>
                      )}
                      {steinwayModels.length > 0 && (
                        <div className="flex gap-3 flex-wrap mt-8">
                          {steinwayModels.map((m) => (
                            <span key={m.slug} className="font-display text-[9px] tracking-[0.20em] uppercase px-4 py-2" style={tagStyle(false)}>{m.name}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="shrink-0 pb-1">
                      <div className="inline-flex items-center gap-3 px-10 py-5 font-display text-[11px] tracking-[0.38em] uppercase transition-all duration-300 group-hover:gap-5" style={btnStyle(false)}>
                        Browse Collection
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* ── ROW 2: Handcrafted European ── */}
              <Link
                href="/pianos?category=european"
                className={rowCls(1)}
                style={{ backgroundColor: C.darkBg, borderTop: `1px solid ${C.borderDark}` }}
              >
                <div className="h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ backgroundColor: C.accent }} />
                <div className="max-w-7xl mx-auto px-8 py-20">
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                    <div className="min-w-0">
                      <p className="font-display text-[11px] tracking-[0.45em] uppercase mb-6" style={{ color: 'rgba(245,235,220,0.32)' }}>
                        Vienna · Berlin · Leipzig · Hradec Králové
                      </p>
                      <h3 className="font-cormorant font-light leading-[0.92]" style={{ fontSize: 'clamp(4.5rem, 9vw, 11rem)', color: C.ivory }}>
                        Handcrafted European
                      </h3>
                      <p className="mt-6 text-lg leading-relaxed max-w-[38ch]" style={{ color: 'rgba(245,235,220,0.48)' }}>
                        The finest European ateliers — each instrument a life&apos;s work.
                      </p>
                      {european.length > 0 && (
                        <div className="flex gap-3 flex-wrap mt-8">
                          {european.map((b) => (
                            <span key={b.id} className="font-display text-[9px] tracking-[0.20em] uppercase px-4 py-2" style={tagStyle(true)}>{b.name}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="shrink-0 pb-1">
                      <div className="inline-flex items-center gap-3 px-10 py-5 font-display text-[11px] tracking-[0.38em] uppercase transition-all duration-300 group-hover:gap-5" style={btnStyle(true)}>
                        Browse Collection
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* ── ROW 3: Shigeru Kawai ── */}
              <Link
                href="/pianos?category=shigeru-kawai"
                className={rowCls(2)}
                style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}` }}
              >
                <div className="h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ backgroundColor: C.accent }} />
                <div className="max-w-7xl mx-auto px-8 py-20">
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                    <div className="min-w-0">
                      {shigeruEyebrow && (
                        <p className="font-display text-[11px] tracking-[0.45em] uppercase mb-6" style={{ color: C.muted }}>
                          {shigeruEyebrow}
                        </p>
                      )}
                      <h3 className="font-cormorant font-light leading-[0.92]" style={{ fontSize: 'clamp(4.5rem, 9vw, 11rem)', color: C.text }}>
                        Shigeru Kawai
                      </h3>
                      {shigeru?.tagline && (
                        <p className="mt-6 text-lg leading-relaxed max-w-[38ch]" style={{ color: C.muted }}>{shigeru.tagline}</p>
                      )}
                      {shigeruModels.length > 0 && (
                        <div className="flex gap-3 flex-wrap mt-8">
                          {shigeruModels.map((m) => (
                            <span key={m.slug} className="font-display text-[9px] tracking-[0.20em] uppercase px-4 py-2" style={tagStyle(false)}>{m.name}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="shrink-0 pb-1">
                      <div className="inline-flex items-center gap-3 px-10 py-5 font-display text-[11px] tracking-[0.38em] uppercase transition-all duration-300 group-hover:gap-5" style={btnStyle(false)}>
                        Browse Collection
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          )
        })()}
        <div style={{ borderTop: `1px solid ${C.border}` }} />
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURED INSTRUMENTS — full-viewport hero
      ═══════════════════════════════════════════════ */}
      <FeaturedCarousel pianos={featured} />

      {/* ═══════════════════════════════════════════════
          SHOWROOM GALLERY — Bento grid preview
      ═══════════════════════════════════════════════ */}
      <ShowroomGallerySection images={galleryImages} />

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
              Get in Touch
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
