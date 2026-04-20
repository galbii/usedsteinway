'use client'

/**
 * FeaturedCarousel
 * ─────────────────────────────────────────────────────────────
 * Transition design: "Gold Curtain Reveal"
 *
 * A burnished-gold bar sweeps across the image from one edge to the
 * other — like a stage curtain being drawn — hiding the departing
 * image and unveiling the new one underneath. While the curtain
 * moves, the text panel cross-dissolves with a staggered fade-up
 * for each content element, creating a layered, editorial reveal.
 *
 * Idle state: subtle Ken Burns zoom on the active image.
 * Progress:   32px segment bars fill with gold over the auto-advance
 *             interval, giving a clear sense of rhythm.
 * Navigation: minimal square-bordered chevron buttons.
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Piano } from '@/types/piano'

// ── Design tokens (mirrors UsedSteinwaysVariantPage C object) ──
const C = {
  bg:          'hsl(36, 22%, 96%)',
  darkBg:      'hsl(350, 62%, 26%)',
  accent:      'hsl(40, 72%, 52%)',
  accentFaint: 'hsla(40, 72%, 52%, 0.18)',
  text:        'hsl(350, 12%, 11%)',
  muted:       'hsl(350, 5%, 46%)',
  border:      'hsl(36, 18%, 89%)',
}

const DURATION   = 6000   // ms between auto-advances
const TRANS      = 760    // total ms for the curtain transition
const TRANS_HALF = TRANS / 2   // when we swap activeIndex (curtain fully covered)

interface FeaturedCarouselProps {
  pianos: Piano[]
}

export function FeaturedCarousel({ pianos }: FeaturedCarouselProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const [activeIndex,    setActiveIndex]    = useState(0)
  const [transitionKey,  setTransitionKey]  = useState(0)   // bump → restart curtain CSS anim
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction,      setDirection]      = useState<'next' | 'prev'>('next')
  const [isPaused,       setIsPaused]       = useState(false)
  const [progress,       setProgress]       = useState(0)   // 0–100 for active dot fill
  const [touchStartX,    setTouchStartX]    = useState(0)
  const [touchStartY,    setTouchStartY]    = useState(0)

  const progressStart = useRef<number>(Date.now())
  const rafRef        = useRef<number | null>(null)
  const timerRef      = useRef<ReturnType<typeof setTimeout> | null>(null)
  const swapRef       = useRef<ReturnType<typeof setTimeout> | null>(null)
  const doneRef       = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Core navigate function ────────────────────────────────────
  const navigate = useCallback(
    (toIndex: number, dir: 'next' | 'prev') => {
      if (isTransitioning || toIndex === activeIndex) return
      setDirection(dir)
      setIsTransitioning(true)
      setTransitionKey(k => k + 1)
      setProgress(0)

      // Swap content at the midpoint (curtain fully covers image)
      swapRef.current = setTimeout(() => {
        setActiveIndex(toIndex)
      }, TRANS_HALF)

      // Mark idle after full transition
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
      if (dx > 0) goNext()
      else goPrev()
    }
  }

  // ── Auto-advance + rAF progress bar ──────────────────────────
  useEffect(() => {
    if (isTransitioning) {
      if (rafRef.current)  cancelAnimationFrame(rafRef.current)
      if (timerRef.current) clearTimeout(timerRef.current)
      return
    }
    if (isPaused) {
      if (rafRef.current)  cancelAnimationFrame(rafRef.current)
      if (timerRef.current) clearTimeout(timerRef.current)
      return
    }

    progressStart.current = Date.now()

    const tick = () => {
      const elapsed = Date.now() - progressStart.current
      const pct = Math.min((elapsed / DURATION) * 100, 100)
      setProgress(pct)
      if (pct < 100) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    timerRef.current = setTimeout(() => {
      navigate((activeIndex + 1) % pianos.length, 'next')
    }, DURATION)

    return () => {
      if (rafRef.current)   cancelAnimationFrame(rafRef.current)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [activeIndex, isPaused, isTransitioning, pianos.length, navigate])

  // Cleanup on unmount
  useEffect(() => () => {
    [rafRef, timerRef, swapRef, doneRef].forEach(r => {
      if (r.current) {
        if (typeof r.current === 'number') cancelAnimationFrame(r.current)
        else clearTimeout(r.current)
      }
    })
  }, [])

  if (!pianos.length) return null
  const piano = pianos[activeIndex]!

  // Stagger delays (seconds) for each content element
  // These kick in after activeIndex swaps at TRANS_HALF
  const stagger = isTransitioning
    ? { opacity: 0, transform: 'translateY(12px)', transition: 'none' }
    : null

  const reveal = (delay: number) =>
    stagger ?? {
      opacity: 1,
      transform: 'translateY(0)',
      transition: `opacity 0.55s ease ${delay}s, transform 0.55s cubic-bezier(0.2,0,0,1) ${delay}s`,
    }

  const lineReveal = (delay: number) =>
    isTransitioning
      ? { transform: 'scaleX(0)', transition: 'none' }
      : {
          transform: 'scaleX(1)',
          transition: `transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
        }

  return (
    <>
      {/* ── Keyframes (injected once) ──────────────────────────── */}
      <style>{`
        @keyframes curtain-sweep-next {
          0%   { transform: translateX(-101%); }
          42%  { transform: translateX(0%);    }
          58%  { transform: translateX(0%);    }
          100% { transform: translateX(101%);  }
        }
        @keyframes curtain-sweep-prev {
          0%   { transform: translateX(101%);  }
          42%  { transform: translateX(0%);    }
          58%  { transform: translateX(0%);    }
          100% { transform: translateX(-101%); }
        }
        @keyframes kb-zoom {
          from { transform: scale(1); }
          to   { transform: scale(1.06); }
        }
        @keyframes fade-in-img {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .carousel-img-enter {
          animation: fade-in-img 0.2s ease forwards;
        }
      `}</style>

      {/* Full-bleed hero card */}
      <div
        className="relative overflow-hidden"
        style={{
          height: '100vh',
          minHeight: '680px',
          backgroundColor: C.darkBg,
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ── Full-bleed image with Ken Burns ── */}
        <div
          key={`kb-${activeIndex}`}
          className="absolute inset-0"
          style={{
            animation: isTransitioning || prefersReducedMotion
              ? undefined
              : `kb-zoom ${DURATION + TRANS}ms linear forwards`,
          }}
        >
          {(piano.stockImageUrl || piano.imageUrls[0]) && (
            <Image
              src={piano.stockImageUrl || piano.imageUrls[0]!}
              alt={piano.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={activeIndex === 0}
            />
          )}
        </div>

        {/* ── Gradient overlays ── */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.08) 0%, transparent 45%, rgba(0,0,0,0.72) 100%),' +
              'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)',
          }}
        />

        {/* ── Gold curtain transition ── */}
        {isTransitioning && (
          <div
            key={`curtain-${transitionKey}`}
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              backgroundColor: C.accent,
              animation: `curtain-sweep-${direction} ${TRANS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
            }}
          />
        )}

        {/* ── Gold top border ── */}
        <div
          className="absolute top-0 left-0 right-0 z-30"
          style={{
            height: '3px',
            backgroundColor: C.accent,
            transformOrigin: direction === 'next' ? 'left' : 'right',
            ...lineReveal(0.08),
          }}
        />

        {/* ── Featured badge ── */}
        {piano.isFeatured && (
          <div className="absolute top-8 left-8 z-30">
            <span
              className="font-display text-[9px] tracking-[0.4em] uppercase px-3.5 py-2 block"
              style={{ backgroundColor: C.accent, color: C.darkBg }}
            >
              Featured
            </span>
          </div>
        )}

        {/* ── Slide counter (bottom-left) ── */}
        <div className="absolute bottom-8 left-8 z-30">
          <span
            className="font-display text-[10px] tracking-[0.3em] tabular-nums"
            style={{ color: 'rgba(255,255,255,0.38)' }}
          >
            {String(activeIndex + 1).padStart(2, '0')}
            <span style={{ opacity: 0.5 }}> / </span>
            {String(pianos.length).padStart(2, '0')}
          </span>
        </div>

        {/* ── Details panel — right side overlay ── */}
        <div
          className="absolute top-0 right-0 bottom-0 z-30 flex flex-col justify-between"
          style={{
            width: 'clamp(380px, 42%, 600px)',
            padding: 'clamp(3rem, 5vw, 6rem)',
          }}
        >
          <div>
            {/* Overline */}
            <p
              className="font-display tracking-[0.48em] uppercase mb-6"
              style={{ fontSize: '12px', color: C.accent, ...reveal(0) }}
            >
              {piano.brand}{piano.year ? ` · ${piano.year}` : ''}
            </p>

            {/* Model name */}
            <h3
              className="font-cormorant font-light leading-[1.0] text-white"
              style={{
                fontSize: 'clamp(3.8rem, 5.5vw, 7rem)',
                marginBottom: '1rem',
                textShadow: '0 2px 32px rgba(0,0,0,0.45)',
                ...reveal(0.06),
              }}
            >
              {piano.model}
            </h3>

            {/* Finish · size · condition */}
            <p
              className="leading-relaxed mb-10"
              style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', ...reveal(0.12) }}
            >
              {piano.finish}{piano.size ? ` · ${piano.size}` : ''}
              {piano.condition && (
                <span
                  className="inline-flex items-center gap-1.5 ml-3"
                  style={{ color: C.accent }}
                >
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: C.accent }} />
                  {piano.condition}
                </span>
              )}
            </p>

            {/* Divider */}
            <div
              style={{
                height: '1px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                transformOrigin: 'left',
                marginBottom: '2.2rem',
                ...lineReveal(0.18),
              }}
            />

            {/* Description */}
            <p
              className="leading-[1.9] max-w-[34ch]"
              style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', ...reveal(0.22) }}
            >
              {piano.description
                ? piano.description.slice(0, 200) + (piano.description.length > 200 ? '…' : '')
                : 'A hand-selected instrument, personally evaluated by Roger — a Registered Piano Technician with thirty years of experience.'}
            </p>
          </div>

          {/* Footer: price + CTAs + dots */}
          <div style={{ ...reveal(0.28) }}>
            {/* Price row */}
            <div
              className="pt-6 mb-5 flex items-end justify-between"
              style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}
            >
              <div>
                <p
                  className="font-display tracking-[0.3em] uppercase mb-1.5"
                  style={{ fontSize: '9px', color: 'rgba(255,255,255,0.38)' }}
                >
                  Asking price
                </p>
                <span
                  className="font-cormorant font-light text-white"
                  style={{ fontSize: 'clamp(2rem, 2.8vw, 3rem)', lineHeight: 1 }}
                >
                  {piano.priceDisplay}
                </span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-2 mb-6">
              <Link
                href={`/pianos/${piano.slug}`}
                className="group inline-flex items-center gap-3"
                style={{
                  backgroundColor: 'hsl(25, 6%, 9%)',
                  color: '#fff',
                  padding: '0.75rem 1.25rem',
                  transition: 'background-color 200ms ease',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'hsl(25,6%,18%)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'hsl(25,6%,9%)')}
              >
                <span className="font-display tracking-[0.36em] uppercase" style={{ fontSize: '9px' }}>View Instrument</span>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5 shrink-0">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/pianos"
                className="group inline-flex items-center gap-3"
                style={{
                  backgroundColor: C.accent,
                  color: C.darkBg,
                  padding: '0.75rem 1.25rem',
                  transition: 'opacity 200ms ease',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                <span className="font-display tracking-[0.36em] uppercase" style={{ fontSize: '9px' }}>Browse All Pianos</span>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5 shrink-0">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke={C.darkBg} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-2">
              {pianos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigate(i, i > activeIndex ? 'next' : 'prev')}
                  aria-label={`Go to slide ${i + 1}`}
                  className="relative overflow-hidden hover:opacity-75 transition-opacity duration-150"
                  style={{ width: i === activeIndex ? '28px' : '6px', height: '6px', borderRadius: '3px', backgroundColor: i === activeIndex ? C.accent : 'rgba(255,255,255,0.25)', transition: 'width 300ms ease, background-color 300ms ease' }}
                >
                  {i === activeIndex && (
                    <span style={{
                      position: 'absolute', inset: 0, borderRadius: '3px',
                      transform: `scaleX(${progress / 100})`,
                      transformOrigin: 'left',
                      backgroundColor: 'rgba(255,255,255,0.4)',
                      transition: 'transform 80ms linear',
                    }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Large side nav arrows ── */}
        <button
          onClick={goPrev}
          aria-label="Previous instrument"
          className="absolute left-6 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center transition-all duration-300 group"
          style={{
            width: '56px', height: '56px',
            backgroundColor: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.accent; e.currentTarget.style.borderColor = C.accent }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.35)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9l5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={goNext}
          aria-label="Next instrument"
          className="absolute right-6 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center transition-all duration-300 group"
          style={{
            width: '56px', height: '56px',
            backgroundColor: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.accent; e.currentTarget.style.borderColor = C.accent }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.35)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 4l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </>
  )
}
