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

      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        {/* ── Outer card shell ───────────────────────────────────── */}
        <div
          className="relative overflow-hidden"
          style={{
            boxShadow:
              '0 16px 72px hsl(350 62% 26% / 0.16),' +
              '0 4px 16px hsl(350 62% 26% / 0.08)',
            backgroundColor: '#fff',
          }}
        >

          {/* Animated gold top border */}
          <div
            style={{
              height: '3px',
              backgroundColor: C.accent,
              transformOrigin: direction === 'next' ? 'left' : 'right',
              ...lineReveal(0.08),
            }}
          />

          <div className="flex flex-col lg:flex-row lg:min-h-[600px]">

            {/* ══════════════════════════════════════
                IMAGE PANEL
            ══════════════════════════════════════ */}
            <div
              className="relative lg:w-[57%] aspect-[4/3] lg:aspect-auto flex-shrink-0 overflow-hidden"
              style={{ backgroundColor: C.darkBg }}
            >
              {/* Ken Burns: idle image slowly zooms */}
              <div
                key={`kb-${activeIndex}`}
                className="absolute inset-0"
                style={{
                  animation: isTransitioning || prefersReducedMotion
                    ? undefined
                    : `kb-zoom ${DURATION + TRANS}ms linear forwards`,
                }}
              >
                {piano.imageUrls[0] && (
                  <Image
                    src={piano.imageUrls[0]}
                    alt={piano.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 57vw"
                    priority={activeIndex === 0}
                  />
                )}
              </div>

              {/* Gradient vignette */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top,  rgba(0,0,0,0.50) 0%,  rgba(0,0,0,0.12) 40%,  transparent 65%),' +
                    'linear-gradient(to right, rgba(0,0,0,0.10) 0%, transparent 30%)',
                }}
              />

              {/* ── Gold curtain ── */}
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

              {/* Featured badge */}
              {piano.isFeatured && (
                <div className="absolute top-6 left-6 z-30">
                  <span
                    className="font-display text-[9px] tracking-[0.4em] uppercase px-3.5 py-2 block"
                    style={{ backgroundColor: C.accent, color: C.darkBg }}
                  >
                    Featured
                  </span>
                </div>
              )}

              {/* Slide counter */}
              <div className="absolute bottom-6 right-6 z-30">
                <span
                  className="font-display text-[10px] tracking-[0.3em] tabular-nums"
                  style={{ color: 'rgba(255,255,255,0.42)' }}
                >
                  {String(activeIndex + 1).padStart(2, '0')}
                  <span style={{ opacity: 0.5 }}> / </span>
                  {String(pianos.length).padStart(2, '0')}
                </span>
              </div>

              {/* Mobile tap zones */}
              <button
                onClick={goPrev}
                aria-label="Previous instrument"
                className="absolute left-0 top-0 bottom-0 w-2/5 z-40 lg:hidden"
              />
              <button
                onClick={goNext}
                aria-label="Next instrument"
                className="absolute right-0 top-0 bottom-0 w-2/5 z-40 lg:hidden"
              />
            </div>

            {/* ══════════════════════════════════════
                DETAILS PANEL — staggered reveal
            ══════════════════════════════════════ */}
            <div
              className="flex flex-col justify-between flex-1"
              style={{ padding: 'clamp(2.2rem, 4.5vw, 5.5rem)' }}
            >
              <div>
                {/* Overline */}
                <p
                  className="font-display text-[10px] tracking-[0.48em] uppercase mb-5"
                  style={{ color: C.accent, ...reveal(0) }}
                >
                  {piano.brand} · {piano.year}
                </p>

                {/* Model name */}
                <h3
                  className="font-cormorant font-light leading-[1.03]"
                  style={{
                    fontSize: 'clamp(2.8rem, 4.5vw, 5.4rem)',
                    color: C.text,
                    marginBottom: '0.5rem',
                    ...reveal(0.06),
                  }}
                >
                  {piano.model}
                </h3>

                {/* Finish · size · condition */}
                <p
                  className="text-sm leading-relaxed mb-8"
                  style={{ color: C.muted, ...reveal(0.12) }}
                >
                  {piano.finish} · {piano.size}
                  <span
                    className="inline-flex items-center gap-1.5 ml-3"
                    style={{ color: C.accent }}
                  >
                    <span
                      className="w-1 h-1 rounded-full inline-block"
                      style={{ backgroundColor: C.accent }}
                    />
                    {piano.condition}
                  </span>
                </p>

                {/* Horizontal rule — extends like a line being drawn */}
                <div
                  style={{
                    height: '1px',
                    backgroundColor: C.border,
                    transformOrigin: 'left',
                    marginBottom: '2rem',
                    ...lineReveal(0.18),
                  }}
                />

                {/* Description */}
                <p
                  className="text-sm leading-[1.85] max-w-[36ch]"
                  style={{ color: C.muted, ...reveal(0.22) }}
                >
                  {piano.description
                    ? piano.description.slice(0, 200) +
                      (piano.description.length > 200 ? '…' : '')
                    : 'A hand-selected instrument, personally evaluated by Roger — a Registered Piano Technician with thirty years of experience.'}
                </p>
              </div>

              {/* Price + CTA */}
              <div
                className="mt-12 pt-7 flex items-end justify-between"
                style={{
                  borderTop: `1px solid ${C.border}`,
                  ...reveal(0.30),
                }}
              >
                <div>
                  <p
                    className="font-display text-[9px] tracking-[0.3em] uppercase mb-2"
                    style={{ color: C.muted }}
                  >
                    Asking price
                  </p>
                  <span
                    className="font-cormorant font-light"
                    style={{
                      fontSize: 'clamp(1.8rem, 2.6vw, 2.6rem)',
                      color: C.text,
                      lineHeight: 1,
                    }}
                  >
                    {piano.priceDisplay}
                  </span>
                </div>

                <Link
                  href={`/pianos/${piano.slug}`}
                  className="group inline-flex items-center gap-3.5"
                  tabIndex={0}
                >
                  <span
                    className="font-display text-[10px] tracking-[0.35em] uppercase transition-opacity duration-200 group-hover:opacity-50"
                    style={{ color: C.muted }}
                  >
                    View instrument
                  </span>
                  {/* Arrow icon in bordered square */}
                  <span
                    className="inline-flex items-center justify-center w-9 h-9 transition-all duration-300 group-hover:border-[hsl(40,72%,52%)] group-hover:bg-[hsl(40,72%,52%)]"
                    style={{ border: `1px solid ${C.border}` }}
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:[&_path]:stroke-white"
                    >
                      <path
                        d="M2.5 5.5h6M6 3l2.5 2.5L6 8"
                        stroke={C.text}
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Navigation row ─────────────────────────────────────── */}
        <div className="flex items-center justify-between mt-8">

          {/* Segment progress bars */}
          <div className="flex items-center gap-3">
            {pianos.map((_, i) => (
              <button
                key={i}
                onClick={() => navigate(i, i > activeIndex ? 'next' : 'prev')}
                aria-label={`Go to slide ${i + 1}`}
                className="relative overflow-hidden hover:opacity-75 transition-opacity duration-150"
                style={{ width: '40px', height: '1px', backgroundColor: C.border }}
              >
                {/* Active: live fill */}
                {i === activeIndex && (
                  <span
                    style={{
                      position: 'absolute',
                      inset: 0,
                      transform: `scaleX(${progress / 100})`,
                      transformOrigin: 'left',
                      backgroundColor: C.accent,
                      transition: 'transform 80ms linear',
                    }}
                  />
                )}
                {/* Past: already viewed */}
                {i < activeIndex && (
                  <span
                    className="absolute inset-0"
                    style={{ backgroundColor: C.accentFaint }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Chevron buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={goPrev}
              aria-label="Previous"
              className="group flex items-center justify-center w-10 h-10 transition-all duration-300 hover:border-[hsl(40,72%,52%)] hover:bg-[hsl(40,72%,52%)]"
              style={{ border: `1px solid ${C.border}` }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:[&_path]:stroke-white"
              >
                <path
                  d="M8 6H4M5.5 3.5L3 6l2.5 2.5"
                  stroke={C.muted}
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={goNext}
              aria-label="Next"
              className="group flex items-center justify-center w-10 h-10 transition-all duration-300 hover:border-[hsl(40,72%,52%)] hover:bg-[hsl(40,72%,52%)]"
              style={{ border: `1px solid ${C.border}` }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:[&_path]:stroke-white"
              >
                <path
                  d="M4 6h4M6.5 3.5L9 6l-2.5 2.5"
                  stroke={C.muted}
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
