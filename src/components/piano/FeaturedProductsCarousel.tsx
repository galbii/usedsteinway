'use client'

/**
 * FeaturedProductsCarousel — two-column editorial carousel for instruments.
 *
 * Inspired by the homepage NewsCarousel: an image panel (instrument identity)
 * and an ivory content panel (specs + asking price) that swap sides per slide,
 * with a gold curtain wipe on transition and a persistent bottom nav strip.
 * One piano shown at a time; the content panel leads with the asking price.
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Piano } from '@/types/piano'

const C = {
  darkBg:       'hsl(350, 62%, 26%)',
  darkBgDeep:   'hsl(350, 62%, 14%)',
  accent:       'hsl(40, 72%, 52%)',
  accentBorder: 'hsla(40, 72%, 52%, 0.30)',
  ivory:        'hsl(36, 22%, 96%)',
  ivoryFaded:   'rgba(245, 235, 215, 0.50)',
  ivoryDim:     'rgba(245, 235, 215, 0.40)',
  ivoryGhost:   'rgba(245, 235, 215, 0.18)',
  borderLight:  'hsl(36, 18%, 88%)',
  text:         'hsl(350, 12%, 11%)',
  muted:        'hsl(350, 5%, 44%)',
  imageBg:      'hsl(36, 22%, 96%)',
}

const DURATION   = 4000
const TRANS      = 620
const TRANS_HALF = TRANS / 2

const CONDITION_LABEL: Record<string, string> = {
  'new':               'New',
  'used':              'Pre-Owned',
  'reconditioned':     'Reconditioned',
  'rebuilt':           'Rebuilt',
  'rebuilt-partial':   'Partially Rebuilt',
  'work-in-progress':  'In Progress',
  'display':           'Display Model',
}

function conditionLabel(condition: string): string {
  return CONDITION_LABEL[condition] ?? condition
}

interface Props {
  pianos: Piano[]
}

export function FeaturedProductsCarousel({ pianos }: Props) {
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const [activeIndex,     setActiveIndex]     = useState(0)
  const [transitionKey,   setTransitionKey]   = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction,       setDirection]       = useState<'next' | 'prev'>('next')
  const [isPaused,        setIsPaused]        = useState(false)
  const [progress,        setProgress]        = useState(0)
  const [touchStartX,     setTouchStartX]     = useState(0)
  const [touchStartY,     setTouchStartY]     = useState(0)

  const progressStart = useRef<number>(Date.now())
  const rafRef        = useRef<number | null>(null)
  const timerRef      = useRef<ReturnType<typeof setTimeout> | null>(null)
  const swapRef       = useRef<ReturnType<typeof setTimeout> | null>(null)
  const doneRef       = useRef<ReturnType<typeof setTimeout> | null>(null)

  const navigate = useCallback(
    (toIndex: number, dir: 'next' | 'prev') => {
      if (isTransitioning || toIndex === activeIndex) return
      setDirection(dir)
      setIsTransitioning(true)
      setTransitionKey(k => k + 1)
      setProgress(0)
      swapRef.current = setTimeout(() => setActiveIndex(toIndex), TRANS_HALF)
      doneRef.current = setTimeout(() => {
        setIsTransitioning(false)
        progressStart.current = Date.now()
      }, TRANS)
    },
    [isTransitioning, activeIndex],
  )

  const goNext = useCallback(
    () => navigate((activeIndex + 1) % pianos.length, 'next'),
    [activeIndex, pianos.length, navigate],
  )
  const goPrev = useCallback(
    () => navigate((activeIndex - 1 + pianos.length) % pianos.length, 'prev'),
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
    if (isTransitioning || isPaused || pianos.length < 2) {
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
      () => navigate((activeIndex + 1) % pianos.length, 'next'),
      DURATION,
    )
    return () => {
      if (rafRef.current)   cancelAnimationFrame(rafRef.current)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [activeIndex, isPaused, isTransitioning, pianos.length, navigate])

  useEffect(() => () => {
    ;[rafRef, timerRef, swapRef, doneRef].forEach(r => {
      if (r.current) {
        if (typeof r.current === 'number') cancelAnimationFrame(r.current)
        else clearTimeout(r.current)
      }
    })
  }, [])

  const reveal = (delay: number): React.CSSProperties =>
    isTransitioning
      ? { opacity: 0, transform: 'translateY(10px)', transition: 'none' }
      : { opacity: 1, transform: 'translateY(0)', transition: `opacity 0.60s ease ${delay}s, transform 0.60s cubic-bezier(0.2,0,0,1) ${delay}s` }

  const lineReveal = (delay: number): React.CSSProperties =>
    isTransitioning
      ? { transform: 'scaleX(0)', transition: 'none' }
      : { transform: 'scaleX(1)', transition: `transform 0.75s cubic-bezier(0.4,0,0.2,1) ${delay}s` }

  if (!pianos.length) return null

  const piano      = pianos[activeIndex]!
  const isReversed = activeIndex % 2 === 1
  const imageUrl   = piano.stockImageUrl ?? piano.imageUrls[0] ?? null

  const metaParts = [
    piano.finish,
    piano.specs['Length'],
    piano.year ? String(piano.year) : '',
    piano.location ?? '',
  ].filter(Boolean) as string[]

  return (
    <>
      <style>{`
        @keyframes fp-curtain-next {
          0%   { transform: translateX(-101%); }
          42%  { transform: translateX(0%);    }
          58%  { transform: translateX(0%);    }
          100% { transform: translateX(101%);  }
        }
        @keyframes fp-curtain-prev {
          0%   { transform: translateX(101%);  }
          42%  { transform: translateX(0%);    }
          58%  { transform: translateX(0%);    }
          100% { transform: translateX(-101%); }
        }
        @keyframes fp-kb-zoom {
          from { transform: scale(1);    }
          to   { transform: scale(1.06); }
        }
      `}</style>

      <section
        className="relative w-full overflow-hidden flex flex-col"
        style={{ minHeight: 'clamp(640px, 88vh, 980px)' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top loading bar — fills left→right over each slide's duration */}
        <div
          className="absolute top-0 left-0 right-0 z-50 pointer-events-none"
          style={{ height: '4px', backgroundColor: 'hsla(350, 12%, 11%, 0.10)' }}
        >
          <span
            style={{
              position: 'absolute', inset: 0,
              transform: `scaleX(${progress / 100})`,
              transformOrigin: 'left',
              backgroundColor: C.accent,
              transition: isTransitioning ? 'none' : 'transform 80ms linear',
            }}
          />
        </div>

        {/* Two-column grid — panels alternate sides per slide */}
        <div className="relative lg:grid lg:grid-cols-[55%_45%] flex-1">

          {/* ── IMAGE PANEL — instrument identity ───────────── */}
          <div
            className="relative overflow-hidden"
            style={{
              backgroundColor: C.imageBg,
              minHeight: 'clamp(360px, 50vw, 640px)',
              order: isReversed ? 2 : 1,
            }}
          >
            {/* Ken Burns image — or "Photos Coming Soon" placeholder */}
            {imageUrl ? (
              <div
                key={`fp-kb-${activeIndex}`}
                className="absolute inset-0"
                style={{
                  animation: isTransitioning || prefersReducedMotion
                    ? undefined
                    : `fp-kb-zoom ${DURATION + TRANS}ms linear forwards`,
                }}
              >
                <Image
                  src={imageUrl}
                  alt={piano.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority={activeIndex === 0}
                />
              </div>
            ) : (
              <div className="absolute inset-0" style={{ backgroundColor: 'hsl(25, 6%, 9%)' }}>
                {/* Faint brand monogram watermark */}
                <Image
                  src="/UsedSteinway.png"
                  alt=""
                  fill
                  className="object-contain p-12 sm:p-20 opacity-20"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                {/* Camera icon + caption */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="2" y="5" width="20" height="15" rx="2" stroke="rgba(255,255,255,0.30)" strokeWidth="1.4" />
                    <circle cx="12" cy="12.5" r="3.5" stroke="rgba(255,255,255,0.30)" strokeWidth="1.4" />
                    <path d="M8 5l1.5-2h5L16 5" stroke="rgba(255,255,255,0.30)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span
                    className="font-display uppercase"
                    style={{ fontSize: '11px', letterSpacing: '0.42em', color: 'rgba(255,255,255,0.40)' }}
                  >
                    Photos Coming Soon
                  </span>
                </div>
              </div>
            )}

            {/* Dark gradient base for heading overlay */}
            <div
              className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
              style={{ height: '60%', background: 'linear-gradient(to top, rgba(4,1,1,0.88) 0%, rgba(4,1,1,0.50) 40%, transparent 100%)' }}
            />

            {/* Identity overlay — brand eyebrow + model headline, flips to outer corner */}
            <div
              className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none flex flex-col"
              style={{
                padding: 'clamp(2rem, 4vw, 3.5rem)',
                alignItems: isReversed ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                className="flex items-center gap-4 mb-4"
                style={{ flexDirection: isReversed ? 'row-reverse' : 'row' }}
              >
                <div className="h-px w-7 shrink-0" style={{ backgroundColor: C.accent }} />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '0.42em', textTransform: 'uppercase', color: C.accent }}>
                  {piano.brand || 'Available Now'}
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2.8rem, 4.8vw, 6rem)',
                  fontWeight: 300,
                  lineHeight: 0.92,
                  color: C.ivory,
                  letterSpacing: '-0.01em',
                  textAlign: isReversed ? 'right' : 'left',
                }}
              >
                {piano.model || piano.title}
              </h2>
            </div>

            {/* Corner mark — outer corner of image panel */}
            <div className={`absolute top-8 z-20 pointer-events-none ${isReversed ? 'right-8' : 'left-8'}`}>
              <div className="w-6 h-px" style={{ backgroundColor: C.accent }} />
              <div className="w-px h-6" style={{ backgroundColor: C.accent }} />
            </div>

            {/* Mobile tap zones */}
            <button onClick={goPrev} aria-label="Previous" className="absolute left-0 top-0 bottom-0 w-2/5 z-40 lg:hidden" />
            <button onClick={goNext} aria-label="Next"     className="absolute right-0 top-0 bottom-0 w-2/5 z-40 lg:hidden" />
          </div>

          {/* ── CONTENT PANEL — ivory base ──────────────────── */}
          <div
            className="relative flex flex-col"
            style={{
              backgroundColor: C.ivory,
              padding: 'clamp(2.5rem, 5vw, 5rem)',
              order: isReversed ? 1 : 2,
              borderLeft:  !isReversed ? `1px solid ${C.borderLight}` : 'none',
              borderRight: isReversed  ? `1px solid ${C.borderLight}` : 'none',
            }}
          >
            {/* Ghost numeral — decorative, flips to the outer corner */}
            <span
              className="absolute pointer-events-none select-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(10rem, 18vw, 18rem)',
                color: 'hsla(350, 12%, 11%, 0.04)',
                bottom: '-0.10em',
                [isReversed ? 'left' : 'right']: '-0.02em',
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </span>

            <div className="relative z-10 flex-1 flex flex-col justify-center">

              {/* Slide indicators + condition tag */}
              <div className="flex items-center gap-2 mb-8" style={{ ...reveal(0.06) }}>
                {pianos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => !isTransitioning && i !== activeIndex && navigate(i, i > activeIndex ? 'next' : 'prev')}
                    aria-label={`Instrument ${i + 1}`}
                    style={{
                      height: '2px',
                      width: i === activeIndex ? '2rem' : '0.75rem',
                      backgroundColor: i === activeIndex ? C.accent : C.borderLight,
                      border: 'none',
                      padding: 0,
                      cursor: i === activeIndex ? 'default' : 'pointer',
                      flexShrink: 0,
                      transition: 'width 400ms cubic-bezier(0.4,0,0.2,1), background-color 300ms ease',
                    }}
                  />
                ))}
                {piano.condition && (
                  <>
                    <div style={{ flex: 1 }} />
                    <span
                      className="font-display text-[9px] tracking-[0.42em] uppercase px-3 py-1.5"
                      style={{ border: `1px solid ${C.accentBorder}`, color: C.accent }}
                    >
                      {conditionLabel(piano.condition)}
                    </span>
                  </>
                )}
              </div>

              {/* Gold rule */}
              <div style={{ height: '1px', backgroundColor: C.accentBorder, transformOrigin: 'left', marginBottom: '1.75rem', ...lineReveal(0.10) }} />

              {/* Spec meta line */}
              {metaParts.length > 0 && (
                <p
                  className="font-display text-[11px] tracking-[0.34em] uppercase mb-6"
                  style={{ color: C.muted, ...reveal(0.16) }}
                >
                  {metaParts.join('  ·  ')}
                </p>
              )}

              {/* Description */}
              {piano.description && (
                <p
                  style={{
                    fontSize: '17px',
                    lineHeight: 1.85,
                    color: C.muted,
                    maxWidth: '38ch',
                    marginBottom: '2rem',
                    ...reveal(0.22),
                  }}
                >
                  {piano.description.length > 180 ? piano.description.slice(0, 180) + '…' : piano.description}
                </p>
              )}

              {/* Asking price — the focal point */}
              <div style={{ marginBottom: '2.5rem', ...reveal(0.28) }}>
                <p
                  className="font-display text-[10px] tracking-[0.40em] uppercase mb-2"
                  style={{ color: C.muted }}
                >
                  Asking Price
                </p>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(3rem, 4.4vw, 4.8rem)',
                    fontWeight: 300,
                    lineHeight: 1,
                    color: C.text,
                  }}
                >
                  {piano.priceDisplay}
                </span>
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', ...reveal(0.34) }}>
                <CtaLink href={`/pianos/${piano.slug}`} label="View Instrument" />
                <CtaLink href="/pianos" label="Browse All" />
              </div>
            </div>
          </div>

          {/* Gold curtain — sweeps across both panels and masks the side swap */}
          {isTransitioning && (
            <div
              key={`fp-curtain-${transitionKey}`}
              className="absolute inset-0 z-30 pointer-events-none"
              style={{
                backgroundColor: C.accent,
                animation: `fp-curtain-${direction} ${TRANS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
              }}
            />
          )}
        </div>

        {/* ── PERSISTENT BOTTOM NAV STRIP ─────────────────── */}
        <div
          className="relative z-40 flex items-center shrink-0"
          style={{
            backgroundColor: C.darkBgDeep,
            padding: 'clamp(0.875rem, 1.5vw, 1.25rem) clamp(1.25rem, 3vw, 2.5rem)',
            gap: 'clamp(1rem, 2.5vw, 1.75rem)',
            borderTop: `1px solid hsla(40, 72%, 52%, 0.22)`,
          }}
        >
          {/* Slide counter */}
          <div
            className="shrink-0 hidden sm:flex items-baseline gap-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span style={{ fontSize: '14px', letterSpacing: '0.30em', color: C.accent }}>
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span style={{ fontSize: '10px', letterSpacing: '0.40em', color: C.ivoryDim }}>
              / {String(pianos.length).padStart(2, '0')}
            </span>
          </div>

          {/* Progress bar */}
          <div className="flex-1 h-px relative" style={{ backgroundColor: C.ivoryGhost }}>
            <span
              style={{
                position: 'absolute', inset: 0,
                transform: `scaleX(${progress / 100})`,
                transformOrigin: 'left',
                backgroundColor: C.accent,
                transition: 'transform 80ms linear',
              }}
            />
          </div>

          {/* Arrow buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <NavBtn onClick={goPrev} aria-label="Previous instrument" direction="prev" />
            <NavBtn onClick={goNext} aria-label="Next instrument"     direction="next" />
          </div>
        </div>
      </section>
    </>
  )
}

function CtaLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.875rem',
        padding: '1.25rem 2.5rem',
        backgroundColor: C.darkBg,
        color: C.ivory,
        fontFamily: 'var(--font-display)',
        fontSize: '13px',
        letterSpacing: '0.38em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        transition: 'opacity 200ms',
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
    >
      {label}
      <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
        <path d="M3 6h6M7 3.5L9.5 6 7 8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  )
}

function NavBtn({
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
        width: '44px', height: '44px', cursor: 'pointer',
        backgroundColor: hov ? 'hsl(40, 72%, 52%)' : 'transparent',
        border: `1px solid ${hov ? 'hsl(40, 72%, 52%)' : 'rgba(245, 235, 215, 0.30)'}`,
        transition: 'background-color 200ms, border-color 200ms',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {direction === 'prev'
        ? <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M8 6H4M5.5 3.5L3 6l2.5 2.5" stroke={hov ? 'hsl(350, 62%, 14%)' : 'hsl(36,22%,96%)'} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
        : <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M4 6h4M6.5 3.5L9 6l-2.5 2.5" stroke={hov ? 'hsl(350, 62%, 14%)' : 'hsl(36,22%,96%)'} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
      }
    </button>
  )
}
