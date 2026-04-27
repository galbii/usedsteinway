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

const DURATION   = 7000
const TRANS      = 760
const TRANS_HALF = TRANS / 2

interface PianoHeroCarouselProps {
  pianos: Piano[]
  eyebrow?: string
  headingLine1?: string
  headingLine2?: string
  showLogo?: boolean
  minimal?: boolean
}

export function PianoHeroCarousel({
  pianos,
  eyebrow = 'The Collection',
  headingLine1 = 'Featured',
  headingLine2 = 'Pianos',
  showLogo = false,
  minimal = false,
}: PianoHeroCarouselProps) {
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
  const imageUrl = piano.stockImageUrl ?? piano.imageUrls[0] ?? null

  const fade = (delay: number): React.CSSProperties =>
    isTransitioning
      ? { opacity: 0, transition: 'none' }
      : { opacity: 1, transition: `opacity 0.55s ease ${delay}s` }

  return (
    <>
      <style>{`
        @keyframes phc-curtain-next {
          0%   { transform: translateX(-101%); }
          42%  { transform: translateX(0%);    }
          58%  { transform: translateX(0%);    }
          100% { transform: translateX(101%);  }
        }
        @keyframes phc-curtain-prev {
          0%   { transform: translateX(101%);  }
          42%  { transform: translateX(0%);    }
          58%  { transform: translateX(0%);    }
          100% { transform: translateX(-101%); }
        }
        @keyframes phc-kb {
          from { transform: scale(1);    }
          to   { transform: scale(1.05); }
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

        {/* Background image */}
        <div
          key={`phc-kb-${activeIndex}`}
          className="absolute inset-0"
          style={{
            animation: isTransitioning || prefersReducedMotion
              ? undefined
              : `phc-kb ${DURATION + TRANS}ms linear forwards`,
          }}
        >
          {imageUrl && (
            <Image src={imageUrl} alt={piano.title} fill className="object-cover" sizes="100vw" priority={activeIndex === 0} />
          )}
        </div>

        {/* Subtle overlay — darker at top and bottom, clear in middle */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(4,1,1,0.55) 0%, rgba(4,1,1,0.10) 35%, rgba(4,1,1,0.10) 65%, rgba(4,1,1,0.72) 100%)' }}
        />

        {/* Gold curtain */}
        {isTransitioning && (
          <div
            key={`phc-curtain-${transitionKey}`}
            className="absolute inset-0 z-20 pointer-events-none"
            style={{ backgroundColor: C.accent, animation: `phc-curtain-${direction} ${TRANS}ms cubic-bezier(0.4,0,0.2,1) forwards` }}
          />
        )}

        {/* Top-left heading */}
        <div
          className="absolute top-0 left-0 z-30"
          style={{ padding: 'clamp(5rem, 8vh, 7rem) clamp(2.5rem, 5vw, 5rem) 0' }}
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

        {/* Bottom bar — slim strip */}
        {!minimal && <div
          className="absolute bottom-0 left-0 right-0 z-30"
          style={{
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
          <div className="flex items-baseline gap-4 min-w-0" style={fade(0.06)}>
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
          <div className="flex items-center gap-4" style={fade(0.10)}>
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
        </div>}

      </div>
    </>
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
