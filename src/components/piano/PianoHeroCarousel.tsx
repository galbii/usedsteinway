'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Piano } from '@/types/piano'

const C = {
  accent:     'hsl(40, 72%, 52%)',
  darkBg:     'hsl(350, 62%, 14%)',
  ivory:      'hsl(36, 22%, 96%)',
  ivoryFaded: 'rgba(245, 235, 215, 0.50)',
  goldBorder: 'rgba(200, 160, 75, 0.18)',
}

const DURATION = 9000
const TRANS    = 2000

// Smooth, symmetric dissolve curve (easeInOutCubic) shared by the crossfade + text.
const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)'

// Ken Burns end scale + a small rotation of drift origins so each slide's slow
// zoom pans a slightly different direction — keeps a long autoplay feeling alive.
const KB_SCALE = 1.08
const KB_ORIGINS = ['50% 36%', '36% 58%', '64% 42%', '50% 64%']
const kbOrigin = (i: number) => KB_ORIGINS[i % KB_ORIGINS.length]

interface PianoHeroCarouselProps {
  pianos: Piano[]
  eyebrow?: string
  headingLine1?: string
  headingLine2?: string
  showLogo?: boolean
  minimal?: boolean
  /**
   * 'corner' (default) — large heading anchored top-left, used on the /pianos listing.
   * 'center' — centered brand announcement (eyebrow · brand name · rule · tagline),
   *   used on brand landing pages.
   */
  variant?: 'corner' | 'center'
  /** Tagline shown beneath the rule in the centered variant. */
  tagline?: string
  /**
   * When set, the rotating carousel is replaced by a single static hero image
   * (the brand's CMS hero image) keeping the same centered overlay. Empty/null
   * falls back to the piano carousel.
   */
  staticImageUrl?: string | null
}

export function PianoHeroCarousel({
  pianos,
  eyebrow = 'The Collection',
  headingLine1 = 'Featured',
  headingLine2 = 'Pianos',
  showLogo = false,
  minimal = false,
  variant = 'corner',
  tagline,
  staticImageUrl,
}: PianoHeroCarouselProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const [activeIndex,     setActiveIndex]     = useState(0)
  const [prevIndex,       setPrevIndex]       = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused,        setIsPaused]        = useState(false)
  const [progress,        setProgress]        = useState(0)
  const [touchStartX,     setTouchStartX]     = useState(0)
  const [touchStartY,     setTouchStartY]     = useState(0)

  const progressStart = useRef<number>(Date.now())
  const rafRef        = useRef<number | null>(null)
  const timerRef      = useRef<ReturnType<typeof setTimeout> | null>(null)
  const doneRef       = useRef<ReturnType<typeof setTimeout> | null>(null)

  const navigate = useCallback(
    (toIndex: number) => {
      if (isTransitioning || toIndex === activeIndex) return
      setIsTransitioning(true)
      setPrevIndex(activeIndex)
      setActiveIndex(toIndex)
      setProgress(0)
      doneRef.current = setTimeout(() => {
        setIsTransitioning(false)
        setPrevIndex(null)
        progressStart.current = Date.now()
      }, TRANS)
    },
    [isTransitioning, activeIndex],
  )

  const goNext = useCallback(
    () => navigate((activeIndex + 1) % pianos.length),
    [activeIndex, pianos.length, navigate],
  )
  const goPrev = useCallback(
    () => navigate((activeIndex - 1 + pianos.length) % pianos.length),
    [activeIndex, pianos.length, navigate],
  )

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0]!.clientX)
    setTouchStartY(e.targetTouches[0]!.clientY)
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX - e.changedTouches[0]!.clientX
    const dy = Math.abs(touchStartY - e.changedTouches[0]!.clientY)
    if (Math.abs(dx) > 48 && dy < 80) {
      if (dx > 0) goNext(); else goPrev()
    }
  }

  useEffect(() => {
    if (staticImageUrl || isTransitioning || isPaused) {
      if (rafRef.current)   cancelAnimationFrame(rafRef.current)
      if (timerRef.current) clearTimeout(timerRef.current)
      return
    }
    progressStart.current = Date.now()
    const tick = () => {
      const pct = Math.min(((Date.now() - progressStart.current) / DURATION) * 100, 100)
      setProgress(pct)
      if (pct < 100) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    timerRef.current = setTimeout(
      () => navigate((activeIndex + 1) % pianos.length),
      DURATION,
    )
    return () => {
      if (rafRef.current)   cancelAnimationFrame(rafRef.current)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [activeIndex, isPaused, isTransitioning, pianos.length, navigate, staticImageUrl])

  useEffect(() => () => {
    ;[rafRef, timerRef, doneRef].forEach(r => {
      if (r.current) {
        if (typeof r.current === 'number') cancelAnimationFrame(r.current)
        else clearTimeout(r.current)
      }
    })
  }, [])

  // Static hero — a brand-set hero image replaces the rotating carousel,
  // keeping the same centered overlay (eyebrow · name · rule · tagline).
  // Renders independently of pianos, so a brand with no inventory still shows it.
  if (staticImageUrl) {
    return (
      <div
        className="relative overflow-hidden"
        style={{ height: '100vh', minHeight: '680px', backgroundColor: C.darkBg }}
      >
        <Image
          src={staticImageUrl}
          alt={headingLine1 ?? ''}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay — darker at top and bottom, clear in middle (matches carousel) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 3, background: 'linear-gradient(to bottom, rgba(4,1,1,0.55) 0%, rgba(4,1,1,0.10) 35%, rgba(4,1,1,0.10) 65%, rgba(4,1,1,0.72) 100%)' }}
        />
        <CenterOverlay
          showLogo={showLogo}
          eyebrow={eyebrow}
          headingLine1={headingLine1}
          headingLine2={headingLine2}
          tagline={tagline}
        />
      </div>
    )
  }

  if (!pianos.length) return null

  const piano    = pianos[activeIndex]!
  const prevPiano = prevIndex !== null ? pianos[prevIndex] : null

  const textStyle: React.CSSProperties = {
    opacity:    isTransitioning ? 0.5 : 1,
    transition: `opacity ${TRANS}ms ${EASE}`,
  }

  return (
    <>
      <style>{`
        @keyframes phc-kb {
          from { transform: scale(1);          }
          to   { transform: scale(${KB_SCALE}); }
        }
      `}</style>

      <div
        className="relative overflow-hidden"
        style={{ height: '100vh', minHeight: '680px', backgroundColor: C.darkBg }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        {/* Outgoing image — held at the scale/origin its Ken Burns reached, so the
            incoming layer dissolves over it without any scale "snap". */}
        {prevPiano && (
          <div
            className="absolute inset-0"
            style={{ zIndex: 1, transform: `scale(${KB_SCALE})`, transformOrigin: kbOrigin(prevIndex ?? 0) }}
          >
            {(() => {
              const url = prevPiano.stockImageUrl ?? prevPiano.imageUrls[0] ?? null
              return url ? (
                <Image src={url} alt={prevPiano.title} fill className="object-cover" sizes="100vw" />
              ) : null
            })()}
          </div>
        )}

        {/* Incoming image — fades in, runs Ken Burns */}
        <div
          key={`phc-kb-${activeIndex}`}
          className="absolute inset-0"
          style={{
            zIndex: 2,
            opacity: isTransitioning ? 0 : 1,
            transition: `opacity ${TRANS}ms ${EASE}`,
            transformOrigin: kbOrigin(activeIndex),
            animation: prefersReducedMotion ? undefined : `phc-kb ${DURATION + TRANS}ms linear forwards`,
            willChange: 'transform, opacity',
          }}
        >
          {(() => {
            const url = piano.stockImageUrl ?? piano.imageUrls[0] ?? null
            return url ? (
              <Image src={url} alt={piano.title} fill className="object-cover" sizes="100vw" priority={activeIndex === 0} />
            ) : null
          })()}
        </div>

        {/* Overlay — darker at top and bottom, clear in middle */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 3, background: 'linear-gradient(to bottom, rgba(4,1,1,0.55) 0%, rgba(4,1,1,0.10) 35%, rgba(4,1,1,0.10) 65%, rgba(4,1,1,0.72) 100%)' }}
        />

        {/* ── Centered brand announcement (brand landing pages) ── */}
        {variant === 'center' ? (
          <>
            <CenterOverlay
              showLogo={showLogo}
              eyebrow={eyebrow}
              headingLine1={headingLine1}
              headingLine2={headingLine2}
              tagline={tagline}
            />

            {/* Minimal centered dots */}
            {pianos.length > 1 && (
              <div
                className="absolute left-0 right-0 flex items-center justify-center"
                style={{ zIndex: 5, bottom: 'clamp(2rem, 5vh, 3.5rem)', gap: '0.85rem' }}
              >
                {pianos.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => navigate(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    style={{
                      width: i === activeIndex ? '26px' : '7px',
                      height: '2px',
                      padding: 0,
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: i === activeIndex ? C.accent : 'rgba(245,235,215,0.30)',
                      transition: 'width 400ms ease, background-color 400ms ease',
                    }}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          /* ── Top-left heading (default /pianos layout) ── */
          <div
            className="absolute top-0 left-0"
            style={{ zIndex: 4, padding: 'clamp(5rem, 8vh, 7rem) clamp(2.5rem, 5vw, 5rem) 0' }}
          >
            {showLogo && (
              <Image
                src="/UsedSteinway.png"
                alt="UsedSteinways"
                width={72}
                height={72}
                priority
                style={{ marginBottom: '1.5rem' }}
              />
            )}
            <p
              className="font-display"
              style={{ fontSize: '10px', letterSpacing: '0.55em', textTransform: 'uppercase', color: C.ivoryFaded, marginBottom: '1.5rem' }}
            >
              {eyebrow}
            </p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(7rem, 16vw, 20rem)',
                fontWeight: 300,
                lineHeight: 0.85,
                color: C.ivory,
                letterSpacing: '-0.025em',
              }}
            >
              {headingLine1}
              <br />
              <span style={{ fontStyle: 'italic', color: C.accent }}>{headingLine2}</span>
            </h1>
          </div>
        )}

        {/* Bottom bar */}
        {!minimal && (
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              zIndex: 4,
              borderTop: `1px solid ${C.goldBorder}`,
              background: 'rgba(4, 1, 1, 0.50)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              padding: 'clamp(1.6rem, 2.5vh, 2.2rem) clamp(2.5rem, 5vw, 5rem)',
              height: '240px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '1.2rem',
            } as React.CSSProperties}
          >
            {/* Row 1 — Title */}
            <div className="flex items-baseline gap-4 min-w-0" style={textStyle}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.4rem, 4vw, 5rem)', fontWeight: 300, color: C.ivory, lineHeight: 1, letterSpacing: '-0.01em' }}>
                {piano.brand} {piano.model}
              </span>
              {piano.year && (
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', letterSpacing: '0.3em', color: C.ivoryFaded, flexShrink: 0 }}>
                  · {piano.year}
                </span>
              )}
              <span
                className="hidden md:inline"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 2.4vw, 2.8rem)', fontWeight: 300, color: C.accent, flexShrink: 0, marginLeft: '0.5rem' }}
              >
                {piano.priceDisplay}
              </span>
            </div>

            {/* Row 2 — Controls */}
            <div className="flex items-center gap-4" style={textStyle}>
              {/* Progress bar */}
              <div className="hidden lg:block relative shrink-0" style={{ width: '160px', height: '2px', backgroundColor: 'rgba(255,255,255,0.10)' }}>
                <span style={{ position: 'absolute', inset: 0, transform: `scaleX(${progress / 100})`, transformOrigin: 'left', backgroundColor: C.accent, transition: 'transform 80ms linear' }} />
              </div>

              {/* Counter */}
              <span className="hidden sm:inline shrink-0" style={{ fontFamily: 'var(--font-display)', fontSize: '13px', letterSpacing: '0.38em', color: C.ivoryFaded }}>
                {String(activeIndex + 1).padStart(2, '0')} / {String(pianos.length).padStart(2, '0')}
              </span>

              <div className="flex-1" />

              {/* Arrows */}
              <div className="flex items-center gap-2 shrink-0">
                <ArrowBtn onClick={goPrev} direction="prev" aria-label="Previous piano" />
                <ArrowBtn onClick={goNext} direction="next" aria-label="Next piano" />
              </div>

              {/* CTA */}
              <Link
                href={`/pianos/${piano.slug}`}
                className="shrink-0 hidden sm:inline-flex"
                style={{
                  fontFamily: 'var(--font-display)', fontSize: '12px',
                  letterSpacing: '0.38em', textTransform: 'uppercase',
                  color: C.darkBg, backgroundColor: C.accent,
                  padding: '1rem 2.5rem',
                  textDecoration: 'none',
                  transition: 'opacity 200ms',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.80')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                View Piano
              </Link>
            </div>
          </div>
        )}

      </div>
    </>
  )
}

// Centered brand announcement (eyebrow · name · hairline rule · tagline).
// Shared by the rotating carousel's `center` variant and the static hero so
// both render identical overlay treatment.
function CenterOverlay({
  showLogo,
  eyebrow,
  headingLine1,
  headingLine2,
  tagline,
}: {
  showLogo?: boolean
  eyebrow?: string
  headingLine1?: string
  headingLine2?: string
  tagline?: string
}) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
      style={{ zIndex: 4, padding: '0 clamp(1.5rem, 5vw, 4rem)' }}
    >
      {showLogo && (
        <Image
          src="/UsedSteinway.png"
          alt="UsedSteinways"
          width={64}
          height={64}
          priority
          style={{ marginBottom: 'clamp(1.5rem, 3vh, 2.25rem)', opacity: 0.92 }}
        />
      )}
      <p
        className="font-display"
        style={{ fontSize: 'clamp(10px, 1vw, 12px)', letterSpacing: '0.5em', textTransform: 'uppercase', color: C.accent, marginBottom: 'clamp(1.25rem, 2.5vh, 2rem)', paddingLeft: '0.5em' }}
      >
        {eyebrow}
      </p>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(3.4rem, 9vw, 9rem)',
          fontWeight: 300,
          lineHeight: 0.92,
          color: C.ivory,
          letterSpacing: '-0.02em',
          maxWidth: '16ch',
        }}
      >
        {headingLine1}
        {headingLine2 && (
          <>
            {' '}
            <span style={{ fontStyle: 'italic', color: C.accent }}>{headingLine2}</span>
          </>
        )}
      </h1>
      {/* Hairline rule with center diamond */}
      <div
        className="flex items-center justify-center"
        style={{ gap: '0.85rem', margin: 'clamp(1.75rem, 3.5vh, 2.75rem) 0 clamp(1.25rem, 2.5vh, 1.75rem)' }}
      >
        <span style={{ width: 'clamp(2.5rem, 6vw, 5rem)', height: '1px', backgroundColor: C.goldBorder }} />
        <span style={{ width: '5px', height: '5px', transform: 'rotate(45deg)', backgroundColor: C.accent }} />
        <span style={{ width: 'clamp(2.5rem, 6vw, 5rem)', height: '1px', backgroundColor: C.goldBorder }} />
      </div>
      {tagline && (
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.25rem, 2.2vw, 1.85rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: C.ivoryFaded,
            maxWidth: '34ch',
            lineHeight: 1.4,
          }}
        >
          {tagline}
        </p>
      )}
    </div>
  )
}

function ArrowBtn({
  onClick, direction,
  'aria-label': ariaLabel,
}: {
  onClick: () => void
  direction: 'prev' | 'next'
  'aria-label': string
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '60px', height: '60px', cursor: 'pointer',
        backgroundColor: hov ? 'hsl(40,72%,52%)' : 'transparent',
        border: '1px solid rgba(200,160,75,0.20)',
        transition: 'background-color 180ms',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {direction === 'prev'
        ? <svg width="16" height="16" viewBox="0 0 12 12" fill="none"><path d="M8 6H4M5.5 3.5L3 6l2.5 2.5" stroke={hov ? 'hsl(350,62%,14%)' : 'hsl(36,22%,96%)'} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
        : <svg width="16" height="16" viewBox="0 0 12 12" fill="none"><path d="M4 6h4M6.5 3.5L9 6l-2.5 2.5" stroke={hov ? 'hsl(350,62%,14%)' : 'hsl(36,22%,96%)'} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
      }
    </button>
  )
}
