'use client'

/**
 * HeroCarousel
 * ─────────────────────────────────────────────────────────────
 * Full-viewport featured piano slideshow.
 *
 * Visual design: "Cinematic Stage Reveal"
 * Piano photos fill the entire viewport as a full-bleed background.
 * A deep, multi-layer gradient grounds the image into darkness at
 * the bottom and left edge, creating a dramatic stage-like quality.
 * Text content — brand overline, model name, price — lives in the
 * lower-left corner and enters with a staggered fade-up reveal
 * timed to the incoming image crossfade.
 *
 * Transitions: opacity crossfade (1s) with Ken Burns zoom on active.
 * Controls: segment progress bars bottom-left, chevron buttons bottom-right.
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Piano } from '@/types/piano'

const DURATION  = 7000   // ms between auto-advances
const TRANS     = 1000   // ms for crossfade
const SWAP_AT   = 620    // ms into transition: swap activeIndex → text re-animates

const C = {
  gold:        'hsl(40 72% 52%)',
  goldFaint:   'hsla(40, 72%, 52%, 0.25)',
  cream:       'hsl(36 22% 96%)',
  darkBg:      'hsl(350 62% 9%)',
}

interface HeroCarouselProps {
  pianos: Piano[]
}

// Static fallback when no featured pianos exist
function StaticHero() {
  return (
    <section className="bg-piano-burgundy flex items-end" style={{ minHeight: '60vh', padding: '5rem 2.5rem 4rem' }}>
      <div className="max-w-7xl mx-auto w-full">
        <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-5">
          New Hampshire · Est. 2005
        </p>
        <h1
          className="font-cormorant font-light text-white leading-none max-w-4xl"
          style={{ fontSize: 'clamp(3.6rem, 7vw, 8.5rem)' }}
        >
          A Curated Collection
        </h1>
        <p className="text-piano-cream/60 text-lg mt-4 max-w-xl leading-relaxed">
          Every piano personally selected. Every detail inspected.
        </p>
      </div>
    </section>
  )
}

export function HeroCarousel({ pianos }: HeroCarouselProps) {
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const [activeIndex,    setActiveIndex]    = useState(0)
  const [contentKey,     setContentKey]     = useState(0)   // bump → remount text → restart anims
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused,       setIsPaused]       = useState(false)
  const [progress,       setProgress]       = useState(0)
  const [touchStartX,    setTouchStartX]    = useState(0)
  const [touchStartY,    setTouchStartY]    = useState(0)

  const progressStart = useRef<number>(Date.now())
  const rafRef        = useRef<number | null>(null)
  const timerRef      = useRef<ReturnType<typeof setTimeout> | null>(null)
  const swapRef       = useRef<ReturnType<typeof setTimeout> | null>(null)
  const doneRef       = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Core navigate ──────────────────────────────────────────
  const navigate = useCallback(
    (toIndex: number) => {
      if (isTransitioning || toIndex === activeIndex) return
      setIsTransitioning(true)
      setProgress(0)

      // Swap content mid-crossfade so text enters as new image appears
      swapRef.current = setTimeout(() => {
        setActiveIndex(toIndex)
        setContentKey(k => k + 1)
      }, SWAP_AT)

      // Mark done after full crossfade
      doneRef.current = setTimeout(() => {
        setIsTransitioning(false)
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
      if (dx > 0) goNext()
      else goPrev()
    }
  }

  // ── Auto-advance + rAF progress bar ──────────────────────
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

    timerRef.current = setTimeout(() => {
      navigate((activeIndex + 1) % pianos.length)
    }, DURATION)

    return () => {
      if (rafRef.current)   cancelAnimationFrame(rafRef.current)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [activeIndex, isPaused, isTransitioning, pianos.length, navigate])

  // Cleanup
  useEffect(() => () => {
    [rafRef, timerRef, swapRef, doneRef].forEach(r => {
      if (r.current) {
        if (typeof r.current === 'number') cancelAnimationFrame(r.current)
        else clearTimeout(r.current)
      }
    })
  }, [])

  if (!pianos.length) return <StaticHero />

  const piano = pianos[activeIndex]!

  return (
    <>
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes hc-kb {
          from { transform: scale(1);    }
          to   { transform: scale(1.07); }
        }
        @keyframes hc-text-rise {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes hc-line-grow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .hc-t1 { animation: hc-text-rise 0.75s cubic-bezier(0.2,0,0,1) 0.05s both; }
        .hc-t2 { animation: hc-text-rise 0.75s cubic-bezier(0.2,0,0,1) 0.18s both; }
        .hc-t3 { animation: hc-text-rise 0.75s cubic-bezier(0.2,0,0,1) 0.32s both; }
        .hc-t4 { animation: hc-text-rise 0.75s cubic-bezier(0.2,0,0,1) 0.46s both; }
        .hc-line { animation: hc-line-grow 0.9s cubic-bezier(0.4,0,0.2,1) 0.24s both; }
      `}</style>

      <section
        className="relative w-full overflow-hidden bg-piano-black"
        style={{ height: '100svh', minHeight: '620px' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        {/* ════════════════════════════════════════
            BACKGROUND IMAGES — all rendered, opacity-switched
        ════════════════════════════════════════ */}
        {pianos.map((p, i) => {
          const isActive = i === activeIndex
          return (
            <div
              key={p.id}
              className="absolute inset-0"
              style={{
                opacity:    isActive ? 1 : 0,
                transition: `opacity ${TRANS}ms ease`,
                zIndex:     isActive ? 2 : 1,
              }}
            >
              {/* Ken Burns on active only */}
              <div
                className="absolute inset-0"
                style={{
                  animation:
                    isActive && !isTransitioning && !prefersReduced
                      ? `hc-kb ${DURATION + TRANS}ms linear forwards`
                      : undefined,
                }}
              >
                {p.imageUrls[0] && (
                  <Image
                    src={p.imageUrls[0]}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={i === 0}
                  />
                )}
              </div>
            </div>
          )
        })}

        {/* ════════════════════════════════════════
            GRADIENT OVERLAY — cinematic, multi-layer
        ════════════════════════════════════════ */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 10,
            background: [
              /* Heavy dark bottom — grounds the text */
              'linear-gradient(to top, hsl(350 55% 8% / 0.96) 0%, hsl(350 55% 8% / 0.7) 28%, hsl(350 55% 8% / 0.2) 55%, transparent 72%)',
              /* Left-edge vignette */
              'linear-gradient(to right, hsl(350 55% 8% / 0.55) 0%, transparent 45%)',
              /* Very subtle top darkening for readability of counter */
              'linear-gradient(to bottom, hsl(350 55% 8% / 0.35) 0%, transparent 18%)',
            ].join(', '),
          }}
        />

        {/* ════════════════════════════════════════
            TOP BAR — est. label + slide counter
        ════════════════════════════════════════ */}
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-between"
          style={{ zIndex: 20, padding: '2rem 2.5rem' }}
        >
          <p className="font-display text-[10px] tracking-[0.55em] uppercase text-piano-cream/40">
            New Hampshire · Est. 2005
          </p>
          <p
            className="font-display tabular-nums"
            style={{ fontSize: '10px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.28)' }}
          >
            {String(activeIndex + 1).padStart(2, '0')}
            <span style={{ opacity: 0.4 }}> / </span>
            {String(pianos.length).padStart(2, '0')}
          </p>
        </div>

        {/* ════════════════════════════════════════
            CONTENT — anchored bottom-left, staggered reveal
        ════════════════════════════════════════ */}
        <div
          className="absolute left-0 right-0 bottom-0"
          style={{ zIndex: 20, padding: '0 2.5rem 5.5rem' }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Animated content re-mounts on each slide via key */}
            <div key={contentKey} className="max-w-3xl">

              {/* Overline: Brand · Year · Finish */}
              <p className="hc-t1 font-display uppercase text-piano-gold"
                 style={{ fontSize: '10px', letterSpacing: '0.5em', marginBottom: '1.1rem' }}>
                {piano.brand}
                {piano.year ? <span> · {piano.year}</span> : null}
                {piano.finish
                  ? <span style={{ color: C.goldFaint }}> · {piano.finish}</span>
                  : null}
              </p>

              {/* Model name — the hero headline */}
              <h1
                className="hc-t2 font-cormorant font-light text-white leading-none"
                style={{
                  fontSize:    'clamp(3.8rem, 7.5vw, 9.5rem)',
                  marginBottom: '0.65rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {piano.model || piano.title}
              </h1>

              {/* Size · Condition */}
              {(piano.size || piano.condition) && (
                <p className="hc-t3 font-display uppercase"
                   style={{ fontSize: '10px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.38)', marginBottom: '2.2rem' }}>
                  {piano.size && <span>{piano.size}</span>}
                  {piano.size && piano.condition && (
                    <span style={{ margin: '0 0.75rem', color: C.goldFaint }}>·</span>
                  )}
                  {piano.condition && <span style={{ textTransform: 'capitalize' }}>{piano.condition}</span>}
                </p>
              )}

              {/* Divider line */}
              <div
                className="hc-line"
                style={{
                  height:          '1px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transformOrigin: 'left',
                  marginBottom:    '1.8rem',
                  maxWidth:        '28rem',
                }}
              />

              {/* Price + CTA */}
              <div className="hc-t4 flex items-end gap-10 flex-wrap">
                {/* Price */}
                <div>
                  <p className="font-display uppercase"
                     style={{ fontSize: '9px', letterSpacing: '0.38em', color: 'rgba(255,255,255,0.32)', marginBottom: '0.4rem' }}>
                    Asking Price
                  </p>
                  <span
                    className="font-cormorant font-light text-white"
                    style={{ fontSize: 'clamp(2.1rem, 3vw, 3rem)', lineHeight: 1 }}
                  >
                    {piano.priceDisplay}
                  </span>
                </div>

                {/* CTA */}
                <Link
                  href={`/pianos/${piano.slug}`}
                  className="group inline-flex items-center gap-4 pb-0.5"
                  tabIndex={0}
                >
                  <span
                    className="font-display uppercase transition-colors duration-300"
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.42em',
                      color: 'rgba(255,255,255,0.55)',
                    }}
                  >
                    View Instrument
                  </span>
                  {/* Arrow in bordered square — matches existing nav style */}
                  <span
                    className="inline-flex items-center justify-center transition-all duration-300 group-hover:bg-piano-gold"
                    style={{
                      width:  '2.4rem',
                      height: '2.4rem',
                      border: `1px solid ${C.goldFaint}`,
                      flexShrink: 0,
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6h7M7 3.5 9.5 6 7 8.5"
                        stroke={C.gold}
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:stroke-piano-black transition-colors duration-300"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            BOTTOM CONTROLS — progress bars + chevrons
        ════════════════════════════════════════ */}
        <div
          className="absolute left-0 right-0 bottom-0 flex items-center justify-between"
          style={{ zIndex: 20, padding: '0 2.5rem 1.8rem' }}
        >
          {/* Segment progress bars */}
          <div className="flex items-center gap-2.5">
            {pianos.map((_, i) => (
              <button
                key={i}
                onClick={() => navigate(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="relative overflow-hidden transition-opacity hover:opacity-70"
                style={{
                  width:           '38px',
                  height:          '1px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                }}
              >
                {/* Active: live progress fill */}
                {i === activeIndex && (
                  <span
                    style={{
                      position:        'absolute',
                      inset:           0,
                      transform:       `scaleX(${progress / 100})`,
                      transformOrigin: 'left',
                      backgroundColor: C.gold,
                      transition:      'transform 80ms linear',
                    }}
                  />
                )}
                {/* Past: dim gold */}
                {i < activeIndex && (
                  <span
                    className="absolute inset-0"
                    style={{ backgroundColor: C.goldFaint }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Chevron nav */}
          <div className="flex items-center gap-2">
            {[
              { label: 'Previous', action: goPrev, path: 'M7.5 6H4.5M6 3.5 3.5 6 6 8.5' },
              { label: 'Next',     action: goNext, path: 'M4.5 6h3M6 3.5 8.5 6 6 8.5'  },
            ].map(({ label, action, path }) => (
              <button
                key={label}
                onClick={action}
                aria-label={label}
                className="group inline-flex items-center justify-center transition-all duration-300 hover:bg-piano-gold/10"
                style={{
                  width:  '2.2rem',
                  height: '2.2rem',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path
                    d={path}
                    stroke="rgba(255,255,255,0.45)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-piano-gold transition-colors duration-300"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile tap zones */}
        <button
          onClick={goPrev}
          aria-label="Previous instrument"
          className="absolute left-0 top-0 bottom-0 w-1/3 lg:hidden"
          style={{ zIndex: 15 }}
        />
        <button
          onClick={goNext}
          aria-label="Next instrument"
          className="absolute right-0 top-0 bottom-0 w-1/3 lg:hidden"
          style={{ zIndex: 15 }}
        />
      </section>
    </>
  )
}
