'use client'

/**
 * FeaturedCarousel — single-slide carousel, alternating glass card
 *
 * One piano shown at a time (full viewport). The glassmorphism info card
 * alternates left ↔ right based on activeIndex — even slides place it on
 * the left, odd slides on the right. The gold curtain sweeps across on
 * every transition; the gradient overlay flips sides to match the card.
 * Ken Burns zoom runs on the background image between advances.
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Piano } from '@/types/piano'

const C = {
  accent:     'hsl(40, 72%, 52%)',
  darkBg:     'hsl(350, 62%, 14%)',
  ivory:      'hsl(36, 22%, 96%)',
  ivoryFaded: 'rgba(245, 235, 215, 0.44)',
  ivoryGhost: 'rgba(245, 235, 215, 0.24)',
  goldBorder: 'rgba(200, 160, 75, 0.14)',
  goldDim:    'rgba(200, 160, 75, 0.08)',
}

const DURATION   = 6000
const TRANS      = 760
const TRANS_HALF = TRANS / 2

interface FeaturedCarouselProps {
  pianos: Piano[]
}

export function FeaturedCarousel({ pianos }: FeaturedCarouselProps) {
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
    if (isTransitioning || isPaused) {
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

  if (!pianos.length) return null

  const piano    = pianos[activeIndex]!
  const infoLeft = activeIndex % 2 === 0
  const imageUrl = piano.stockImageUrl ?? piano.imageUrls[0] ?? null

  // Inline stagger helpers — reset instantly while curtain covers, reveal after
  const reveal = (delay: number): React.CSSProperties =>
    isTransitioning
      ? { opacity: 0, transform: 'translateY(10px)', transition: 'none' }
      : { opacity: 1, transform: 'translateY(0)', transition: `opacity 0.55s ease ${delay}s, transform 0.55s cubic-bezier(0.2,0,0,1) ${delay}s` }

  const lineReveal = (delay: number): React.CSSProperties =>
    isTransitioning
      ? { transform: 'scaleX(0)', transition: 'none' }
      : { transform: 'scaleX(1)', transition: `transform 0.72s cubic-bezier(0.4,0,0.2,1) ${delay}s` }

  // Card slides in from its side after curtain lifts
  const cardReveal = (): React.CSSProperties =>
    isTransitioning
      ? { opacity: 0, transform: `translateX(${infoLeft ? '-20px' : '20px'})`, transition: 'none' }
      : { opacity: 1, transform: 'translateX(0)', transition: 'opacity 0.65s ease 0.06s, transform 0.65s cubic-bezier(0.16,1,0.3,1) 0.06s' }

  return (
    <>
      <style>{`
        @keyframes fc-curtain-next {
          0%   { transform: translateX(-101%); }
          42%  { transform: translateX(0%);    }
          58%  { transform: translateX(0%);    }
          100% { transform: translateX(101%);  }
        }
        @keyframes fc-curtain-prev {
          0%   { transform: translateX(101%);  }
          42%  { transform: translateX(0%);    }
          58%  { transform: translateX(0%);    }
          100% { transform: translateX(-101%); }
        }
        @keyframes fc-kb-zoom {
          from { transform: scale(1);    }
          to   { transform: scale(1.06); }
        }
        @media (max-width: 1023px) {
          .fc-card-outer {
            justify-content: center !important;
            align-items: flex-end !important;
          }
          .fc-glass-card {
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 0 !important;
            border-left: none !important;
            border-right: none !important;
            border-top: 1px solid rgba(200,160,75,0.14) !important;
          }
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

        {/* ── Background image — Ken Burns zoom ── */}
        <div
          key={`fc-kb-${activeIndex}`}
          className="absolute inset-0"
          style={{
            animation: isTransitioning || prefersReducedMotion
              ? undefined
              : `fc-kb-zoom ${DURATION + TRANS}ms linear forwards`,
          }}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={piano.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={activeIndex === 0}
            />
          )}
        </div>

        {/* ── Atmospheric gradient — denser on card side ── */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: infoLeft
              ? 'linear-gradient(to right, rgba(4,1,1,0.90) 0%, rgba(4,1,1,0.68) 34%, rgba(4,1,1,0.24) 58%, rgba(4,1,1,0.06) 100%), linear-gradient(to top, rgba(4,1,1,0.50) 0%, transparent 28%)'
              : 'linear-gradient(to left,  rgba(4,1,1,0.90) 0%, rgba(4,1,1,0.68) 34%, rgba(4,1,1,0.24) 58%, rgba(4,1,1,0.06) 100%), linear-gradient(to top, rgba(4,1,1,0.50) 0%, transparent 28%)',
          }}
        />

        {/* ── Gold curtain transition ── */}
        {isTransitioning && (
          <div
            key={`fc-curtain-${transitionKey}`}
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              backgroundColor: C.accent,
              animation: `fc-curtain-${direction} ${TRANS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
            }}
          />
        )}

        {/* ── Ghost index numeral — opposite corner from card ── */}
        <div
          className="absolute z-10 pointer-events-none select-none"
          style={{
            bottom: '-0.06em',
            [infoLeft ? 'right' : 'left']: '-0.02em',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(14rem, 26vw, 28rem)',
            fontWeight: 300,
            lineHeight: 1,
            color: 'rgba(200,160,75,0.038)',
            letterSpacing: '-0.04em',
            ...reveal(0),
          }}
        >
          {String(activeIndex + 1).padStart(2, '0')}
        </div>

        {/* ── Slide counter — opposite corner from card ── */}
        <div
          className="absolute bottom-8 z-30"
          style={{
            [infoLeft ? 'right' : 'left']: 'clamp(2.5rem, 7vw, 9rem)',
            ...reveal(0.04),
          }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '0.32em', color: 'rgba(255,255,255,0.28)' }}>
            {String(activeIndex + 1).padStart(2, '0')}
            <span style={{ opacity: 0.5 }}> / </span>
            {String(pianos.length).padStart(2, '0')}
          </span>
        </div>

        {/* ── Card position wrapper ── */}
        <div
          className="fc-card-outer absolute inset-0 z-30 flex items-stretch"
          style={{
            justifyContent: infoLeft ? 'flex-start' : 'flex-end',
          }}
        >

          {/* ── Glassmorphism info card ── */}
          <div
            className="fc-glass-card flex flex-col justify-between"
            style={{
              position: 'relative',
              width: 'clamp(440px, 48vw, 700px)',
              borderRadius: 0,
              background: 'rgba(20, 6, 8, 0.38)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: 'none',
              borderRight: infoLeft ? `1px solid ${C.goldBorder}` : 'none',
              borderLeft: infoLeft ? 'none' : `1px solid ${C.goldBorder}`,
              boxShadow: infoLeft
                ? '8px 0 60px rgba(0,0,0,0.28)'
                : '-8px 0 60px rgba(0,0,0,0.28)',
              padding: 'clamp(3.5rem, 6vh, 6rem) clamp(2.5rem, 5vw, 4.5rem)',
              overflow: 'hidden',
              ...cardReveal(),
            } as React.CSSProperties}
          >

            {/* Inner radial glow — corner toward the photo */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: '15px',
                background: `radial-gradient(ellipse 90% 55% at ${infoLeft ? '100%' : '0%'} 0%, rgba(200,160,75,0.055) 0%, transparent 60%)`,
              }}
            />

            {/* Top content block */}
            <div>

            {/* Featured chip */}
            {piano.isFeatured && (
              <div style={{ marginBottom: '1.6rem', ...reveal(0) }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '0.45em', textTransform: 'uppercase', backgroundColor: C.accent, color: C.darkBg, padding: '6px 16px', display: 'inline-block' }}>
                  Featured
                </span>
              </div>
            )}

            {/* Brand + year */}
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '15px', letterSpacing: '0.50em', textTransform: 'uppercase', color: C.accent, marginBottom: '1.4rem', ...reveal(0.04) }}>
              {piano.brand}{piano.year ? ` · ${piano.year}` : ''}
            </p>

            {/* Gold rule */}
            <div style={{ height: '1px', backgroundColor: C.goldBorder, transformOrigin: 'left', marginBottom: '2rem', ...lineReveal(0.10) }} />

            {/* Model name */}
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(4.8rem, 6.8vw, 9.5rem)', fontWeight: 300, lineHeight: 0.90, color: C.ivory, marginBottom: '1.5rem', ...reveal(0.10) }}>
              {piano.model}
            </h3>

            {/* Finish · size · condition */}
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '13px', letterSpacing: '0.34em', textTransform: 'uppercase', color: C.ivoryGhost, marginBottom: '2.25rem', ...reveal(0.16) }}>
              {piano.finish}{piano.size ? ` · ${piano.size}` : ''}
              {piano.condition && <span style={{ color: C.accent }}>{` · ${piano.condition}`}</span>}
            </p>

            {/* Thin rule */}
            <div style={{ height: '1px', backgroundColor: C.goldDim, marginBottom: '2rem' }} />

            {/* Description */}
            <p style={{ fontSize: '18px', lineHeight: 1.85, color: C.ivoryFaded, marginBottom: '2.5rem', ...reveal(0.20) }}>
              {piano.description.length > 260
                ? piano.description.slice(0, 260) + '…'
                : piano.description}
            </p>

            {/* Price */}
            <div style={{ paddingTop: '2rem', marginBottom: '2.25rem', borderTop: `1px solid ${C.goldDim}`, ...reveal(0.26) }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '12px', letterSpacing: '0.40em', textTransform: 'uppercase', color: C.ivoryGhost, marginBottom: '0.7rem' }}>
                Asking Price
              </p>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3.4rem, 4.8vw, 5.5rem)', fontWeight: 300, lineHeight: 1, color: C.ivory }}>
                {piano.priceDisplay}
              </span>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '0.875rem', marginBottom: '0', ...reveal(0.30) }}>
              <GlassButton href={`/pianos/${piano.slug}`} label="View Instrument" variant="ghost" />
              <GlassButton href="/pianos" label="Browse All" variant="gold" accent={C.accent} darkBg={C.darkBg} />
            </div>

            </div>{/* end top content block */}

            {/* Progress segments + arrows — pinned to bottom */}
            <div
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                paddingTop: '1.4rem',
                borderTop: `1px solid ${C.goldDim}`,
                ...reveal(0.34),
              }}
            >
              {/* Segment bars */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {pianos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(i, i > activeIndex ? 'next' : 'prev')}
                    aria-label={`Go to slide ${i + 1}`}
                    style={{
                      position: 'relative', overflow: 'hidden', cursor: 'pointer', padding: 0,
                      width: i === activeIndex ? '28px' : '6px', height: '4px', borderRadius: '2px',
                      backgroundColor: i === activeIndex ? 'transparent' : 'rgba(255,255,255,0.16)',
                      border: i === activeIndex ? `1px solid ${C.goldBorder}` : 'none',
                      transition: 'width 300ms ease, background-color 300ms ease',
                    }}
                  >
                    {i === activeIndex && (
                      <span style={{
                        position: 'absolute', inset: 0, borderRadius: '2px',
                        transform: `scaleX(${progress / 100})`, transformOrigin: 'left',
                        backgroundColor: C.accent, transition: 'transform 80ms linear',
                      }} />
                    )}
                    {i < activeIndex && (
                      <span style={{ position: 'absolute', inset: 0, borderRadius: '2px', backgroundColor: 'rgba(200,160,75,0.38)' }} />
                    )}
                  </button>
                ))}
              </div>

              {/* Arrow buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <NavButton onClick={goPrev} aria-label="Previous" direction="prev" accent={C.accent} goldBorder={C.goldBorder} ivory={C.ivory} />
                <NavButton onClick={goNext} aria-label="Next"     direction="next" accent={C.accent} goldBorder={C.goldBorder} ivory={C.ivory} />
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

function GlassButton({
  href, label, variant, accent, darkBg,
}: {
  href: string; label: string; variant: 'ghost' | 'gold'; accent?: string; darkBg?: string
}) {
  const [hov, setHov] = useState(false)
  const base: React.CSSProperties = {
    flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '1.1rem 1.75rem', textDecoration: 'none',
    fontFamily: 'var(--font-display)', fontSize: '13px', letterSpacing: '0.36em', textTransform: 'uppercase',
    transition: 'background-color 200ms, border-color 200ms, opacity 200ms',
  }
  const style: React.CSSProperties = variant === 'ghost'
    ? { ...base, backgroundColor: hov ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.05)', border: `1px solid ${hov ? 'rgba(200,160,75,0.28)' : 'rgba(200,160,75,0.14)'}`, color: 'hsl(36, 22%, 96%)' }
    : { ...base, backgroundColor: accent ?? 'hsl(40, 72%, 52%)', color: darkBg ?? 'hsl(350, 62%, 14%)', opacity: hov ? 0.84 : 1 }

  return (
    <Link href={href} style={style} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <span>{label}</span>
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ marginLeft: '0.5rem', flexShrink: 0 }}>
        <path d="M3 6h6M7 3.5L9.5 6 7 8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  )
}

function NavButton({
  onClick, direction, accent, goldBorder, ivory,
  'aria-label': ariaLabel,
}: {
  onClick: () => void; direction: 'prev' | 'next'
  accent: string; goldBorder: string; ivory: string
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
        background: hov ? accent : 'rgba(255,255,255,0.06)',
        border: `1px solid ${goldBorder}`,
        transition: 'background 200ms',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {direction === 'prev'
        ? <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M8 6H4M5.5 3.5L3 6l2.5 2.5" stroke={hov ? 'hsl(350,62%,14%)' : ivory} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
        : <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M4 6h4M6.5 3.5L9 6l-2.5 2.5" stroke={hov ? 'hsl(350,62%,14%)' : ivory} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
      }
    </button>
  )
}
