'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Piano } from '@/types/piano'

const DURATION     = 7000   // ms between auto-advances
const FADE_MS      = 900    // image crossfade duration
const SWAP_AT      = 440    // ms into fade: swap text so it enters with new image

const C = {
  cream:      'hsl(36 22% 96%)',
  border:     'hsl(36 18% 88%)',
  gold:       'hsl(40 72% 52%)',
  goldFaint:  'hsla(40, 72%, 52%, 0.15)',
  charcoal:   'hsl(25 5% 12%)',
  stone:      'hsl(25 4% 48%)',
  text:       'hsl(25 6% 9%)',
}

interface Props {
  pianos: Piano[]
}

export function PianoGalleryHero({ pianos }: Props) {
  const [active,        setActive]        = useState(0)
  const [displayIndex,  setDisplayIndex]  = useState(0)  // text lags behind image swap
  const [fading,        setFading]        = useState(false)
  const [isPaused,      setIsPaused]      = useState(false)
  const [progress,      setProgress]      = useState(0)
  const [touchStartX,   setTouchStartX]   = useState(0)
  const [touchStartY,   setTouchStartY]   = useState(0)
  const [textVisible,   setTextVisible]   = useState(true)

  const progressStart = useRef(Date.now())
  const rafRef        = useRef<number | null>(null)
  const timerRef      = useRef<ReturnType<typeof setTimeout> | null>(null)
  const swapRef       = useRef<ReturnType<typeof setTimeout> | null>(null)
  const doneRef       = useRef<ReturnType<typeof setTimeout> | null>(null)

  const navigate = useCallback((toIndex: number) => {
    if (fading || toIndex === active) return
    setFading(true)
    setTextVisible(false)
    setProgress(0)

    // Swap displayed content partway through the fade
    swapRef.current = setTimeout(() => {
      setActive(toIndex)
      setDisplayIndex(toIndex)
      setTextVisible(true)
    }, SWAP_AT)

    doneRef.current = setTimeout(() => {
      setFading(false)
      progressStart.current = Date.now()
    }, FADE_MS)
  }, [fading, active])

  const goNext = useCallback(
    () => navigate((active + 1) % pianos.length),
    [active, pianos.length, navigate],
  )
  const goPrev = useCallback(
    () => navigate((active - 1 + pianos.length) % pianos.length),
    [active, pianos.length, navigate],
  )

  // Auto-advance + progress bar
  useEffect(() => {
    if (fading || isPaused) {
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
    timerRef.current = setTimeout(() => navigate((active + 1) % pianos.length), DURATION)

    return () => {
      if (rafRef.current)   cancelAnimationFrame(rafRef.current)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [active, isPaused, fading, pianos.length, navigate])

  // Cleanup on unmount
  useEffect(() => () => {
    [rafRef, timerRef, swapRef, doneRef].forEach(r => {
      if (r.current) {
        if (typeof r.current === 'number') cancelAnimationFrame(r.current)
        else clearTimeout(r.current)
      }
    })
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0]!.clientX)
    setTouchStartY(e.targetTouches[0]!.clientY)
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX - e.changedTouches[0]!.clientX
    const dy = Math.abs(touchStartY - e.changedTouches[0]!.clientY)
    if (Math.abs(dx) > 48 && dy < 80) dx > 0 ? goNext() : goPrev()
  }

  if (!pianos.length) return null

  const piano = pianos[displayIndex]!

  return (
    <>
      <style>{`
        @keyframes pgh-kb {
          from { transform: scale(1);    }
          to   { transform: scale(1.06); }
        }
        @keyframes pgh-rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes pgh-line {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .pgh-t1 { animation: pgh-rise 0.65s cubic-bezier(0.2,0,0,1) 0.04s both; }
        .pgh-t2 { animation: pgh-rise 0.65s cubic-bezier(0.2,0,0,1) 0.14s both; }
        .pgh-t3 { animation: pgh-rise 0.65s cubic-bezier(0.2,0,0,1) 0.26s both; }
        .pgh-t4 { animation: pgh-rise 0.65s cubic-bezier(0.2,0,0,1) 0.38s both; }
        .pgh-t5 { animation: pgh-rise 0.65s cubic-bezier(0.2,0,0,1) 0.50s both; }
        .pgh-line { animation: pgh-line 0.8s cubic-bezier(0.4,0,0.2,1) 0.20s both; }
      `}</style>

      <section
        className="relative flex overflow-hidden"
        style={{ height: 'clamp(620px, 88vh, 1020px)' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        {/* ══════════════════════════════════════════════════
            IMAGE PANEL — left 62%
        ══════════════════════════════════════════════════ */}
        <div className="relative overflow-hidden bg-piano-black" style={{ width: '62%', flexShrink: 0 }}>

          {/* All piano images stacked, crossfaded by opacity */}
          {pianos.map((p, i) => {
            const src = p.stockImageUrl || p.imageUrls[0]
            const isActive = i === active
            return (
              <div
                key={p.id}
                className="absolute inset-0"
                style={{
                  opacity:    isActive ? 1 : 0,
                  transition: `opacity ${FADE_MS}ms ease-in-out`,
                  zIndex:     isActive ? 2 : 1,
                }}
              >
                <div
                  key={`kb-${i}-${active}`}
                  className="absolute inset-0"
                  style={{
                    animation: isActive && !fading
                      ? `pgh-kb ${DURATION + FADE_MS}ms ease-out forwards`
                      : undefined,
                  }}
                >
                  {src ? (
                    <Image
                      src={src}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="62vw"
                      priority={i === 0}
                    />
                  ) : (
                    <div className="absolute inset-0" style={{ background: 'hsl(25 6% 11%)' }} />
                  )}
                </div>
              </div>
            )
          })}

          {/* Bottom gradient for depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 10,
              background:
                'linear-gradient(to top, rgba(0,0,0,0.38) 0%, transparent 40%),' +
                'linear-gradient(to right, transparent 70%, rgba(0,0,0,0.12) 100%)',
            }}
          />

          {/* Catalog number — decorative, top-left */}
          <div
            className="absolute top-0 left-0 pointer-events-none select-none"
            style={{ zIndex: 20, padding: '2rem 2.5rem' }}
          >
            <span
              className="font-cormorant tabular-nums"
              style={{
                fontSize:  'clamp(5rem, 9vw, 11rem)',
                fontWeight: 300,
                lineHeight: 1,
                color:      'rgba(255,255,255,0.06)',
                letterSpacing: '-0.03em',
              }}
            >
              {String(active + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Slide counter — bottom-right */}
          <div
            className="absolute pointer-events-none"
            style={{ zIndex: 20, bottom: '2rem', right: '2rem' }}
          >
            <span
              className="font-display tabular-nums"
              style={{ fontSize: '11px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)' }}
            >
              {String(active + 1).padStart(2, '0')}
              <span style={{ opacity: 0.45 }}> / </span>
              {String(pianos.length).padStart(2, '0')}
            </span>
          </div>

          {/* Mobile tap zones */}
          <button onClick={goPrev} aria-label="Previous" className="absolute left-0 top-0 bottom-0 w-1/3 z-30 lg:hidden" />
          <button onClick={goNext} aria-label="Next"     className="absolute right-0 top-0 bottom-0 w-1/3 z-30 lg:hidden" />
        </div>

        {/* ══════════════════════════════════════════════════
            DETAILS PANEL — right 38%, cream background
        ══════════════════════════════════════════════════ */}
        <div
          className="flex flex-col justify-between flex-1"
          style={{ backgroundColor: C.cream, padding: 'clamp(2.5rem, 4vw, 5rem) clamp(2.5rem, 4.5vw, 5.5rem)' }}
        >

          {/* Top: brand + location */}
          <div
            className="flex items-center justify-between"
            style={{ paddingBottom: '1.5rem', borderBottom: `1px solid ${C.border}` }}
          >
            <p
              className="font-display uppercase"
              style={{ fontSize: '10px', letterSpacing: '0.5em', color: C.gold }}
            >
              UsedSteinways.com
            </p>
            <p
              className="font-display uppercase"
              style={{ fontSize: '10px', letterSpacing: '0.4em', color: 'hsl(25 4% 65%)' }}
            >
              Est. 2005
            </p>
          </div>

          {/* Middle: piano details — re-mounts on each slide via key */}
          {textVisible && (
            <div key={displayIndex} className="flex-1 flex flex-col justify-center py-8">

              {/* Brand · year */}
              <p
                className="pgh-t1 font-display uppercase"
                style={{
                  fontSize:      '11px',
                  letterSpacing: '0.5em',
                  color:         C.gold,
                  marginBottom:  '1rem',
                }}
              >
                {piano.brand}
                {piano.year > 0 && (
                  <span style={{ color: 'hsl(25 4% 65%)', fontWeight: 400 }}> · {piano.year}</span>
                )}
              </p>

              {/* Model — the headline */}
              <h2
                className="pgh-t2 font-cormorant font-light"
                style={{
                  fontSize:      'clamp(2.8rem, 4vw, 5rem)',
                  lineHeight:    1.04,
                  letterSpacing: '-0.015em',
                  color:         C.text,
                  marginBottom:  '1.1rem',
                }}
              >
                {piano.model || piano.title}
              </h2>

              {/* Spec row */}
              <div
                className="pgh-t3 flex items-center flex-wrap gap-x-3 gap-y-1"
                style={{ marginBottom: '2rem' }}
              >
                {[piano.finish, piano.size, piano.condition]
                  .filter(Boolean)
                  .map((val, i, arr) => (
                    <span key={val} className="flex items-center gap-3">
                      <span
                        className="font-display uppercase"
                        style={{ fontSize: '11px', letterSpacing: '0.28em', color: C.stone }}
                      >
                        {val}
                      </span>
                      {i < arr.length - 1 && (
                        <span style={{ color: C.border, fontSize: '14px' }}>·</span>
                      )}
                    </span>
                  ))}
              </div>

              {/* Animated rule */}
              <div
                className="pgh-line"
                style={{
                  height:          '1px',
                  backgroundColor: C.border,
                  transformOrigin: 'left',
                  marginBottom:    '2rem',
                }}
              />

              {/* Description */}
              {piano.description && (
                <p
                  className="pgh-t4 line-clamp-4"
                  style={{
                    fontSize:   '0.95rem',
                    lineHeight: 1.8,
                    color:      'hsl(25 4% 44%)',
                  }}
                >
                  {piano.description}
                </p>
              )}
            </div>
          )}

          {/* Bottom: price + CTA + nav */}
          <div>
            {/* Price + view link */}
            <div
              className="flex items-end justify-between"
              style={{ paddingBottom: '1.75rem', borderBottom: `1px solid ${C.border}` }}
            >
              {textVisible && (
                <>
                  <div key={`price-${displayIndex}`} className="pgh-t5">
                    <p
                      className="font-display uppercase"
                      style={{ fontSize: '10px', letterSpacing: '0.38em', color: C.stone, marginBottom: '0.5rem' }}
                    >
                      Asking Price
                    </p>
                    <span
                      className="font-cormorant font-light"
                      style={{ fontSize: 'clamp(2rem, 2.8vw, 2.8rem)', color: C.text, lineHeight: 1 }}
                    >
                      {piano.priceDisplay}
                    </span>
                  </div>

                  <Link
                    href={`/pianos/${piano.slug}`}
                    className="group inline-flex items-center gap-3 pb-0.5"
                  >
                    <span
                      className="font-display uppercase transition-opacity duration-200 group-hover:opacity-50"
                      style={{ fontSize: '11px', letterSpacing: '0.38em', color: C.stone }}
                    >
                      View Instrument
                    </span>
                    <span
                      className="inline-flex items-center justify-center transition-all duration-300 group-hover:bg-piano-gold group-hover:border-piano-gold"
                      style={{ width: '2.4rem', height: '2.4rem', border: `1px solid ${C.border}`, flexShrink: 0 }}
                    >
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2.5 6h7M7 3.5 9.5 6 7 8.5"
                          stroke={C.gold}
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="group-hover:stroke-white transition-colors duration-300"
                        />
                      </svg>
                    </span>
                  </Link>
                </>
              )}
            </div>

            {/* Progress segments + prev/next */}
            <div className="flex items-center justify-between" style={{ paddingTop: '1.5rem' }}>
              <div className="flex items-center gap-2.5">
                {pianos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(i)}
                    aria-label={`Slide ${i + 1}`}
                    className="relative overflow-hidden transition-opacity hover:opacity-70"
                    style={{ width: '36px', height: '1px', backgroundColor: C.border }}
                  >
                    {i === active && (
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
                    {i < active && (
                      <span className="absolute inset-0" style={{ backgroundColor: C.goldFaint }} />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                {[
                  { label: 'Previous', action: goPrev, d: 'M8 6H4M5.5 3.5 3 6l2.5 2.5' },
                  { label: 'Next',     action: goNext, d: 'M4 6h4M6.5 3.5 9 6 6.5 8.5'  },
                ].map(({ label, action, d }) => (
                  <button
                    key={label}
                    onClick={action}
                    aria-label={label}
                    className="group flex items-center justify-center transition-all duration-300 hover:bg-piano-gold hover:border-piano-gold"
                    style={{ width: '2.4rem', height: '2.4rem', border: `1px solid ${C.border}` }}
                  >
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path
                        d={d}
                        stroke={C.stone}
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:stroke-white transition-colors duration-300"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
