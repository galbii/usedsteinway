'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { PostCard } from '@/lib/payload/posts'

const C = {
  bg:          'hsl(36, 22%, 96%)',
  accent:      'hsl(40, 72%, 52%)',
  accentFaint: 'hsla(40, 72%, 52%, 0.07)',
  accentMid:   'hsla(40, 72%, 52%, 0.28)',
  accentTag:   'hsla(40, 72%, 52%, 0.10)',
  accentTagFg: 'hsl(40, 55%, 36%)',
  text:        'hsl(350, 12%, 11%)',
  muted:       'hsl(350, 5%, 46%)',
  border:      'hsl(36, 18%, 89%)',
  imageBg:     'hsl(36, 14%, 90%)',
}

const DURATION   = 7000
const TRANS      = 760
const TRANS_HALF = TRANS / 2

interface Props {
  posts: PostCard[]
}

function formatDate(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function NewsCarousel({ posts }: Props) {
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
    () => navigate((activeIndex + 1) % posts.length, 'next'),
    [activeIndex, posts.length, navigate],
  )
  const goPrev = useCallback(
    () => navigate((activeIndex - 1 + posts.length) % posts.length, 'prev'),
    [activeIndex, posts.length, navigate],
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
      () => navigate((activeIndex + 1) % posts.length, 'next'),
      DURATION,
    )
    return () => {
      if (rafRef.current)   cancelAnimationFrame(rafRef.current)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [activeIndex, isPaused, isTransitioning, posts.length, navigate])

  useEffect(() => () => {
    ;[rafRef, timerRef, swapRef, doneRef].forEach(r => {
      if (r.current) {
        if (typeof r.current === 'number') cancelAnimationFrame(r.current)
        else clearTimeout(r.current)
      }
    })
  }, [])

  if (!posts.length) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ minHeight: '520px', backgroundColor: C.bg, border: `1px solid ${C.border}` }}
      >
        <div className="text-center">
          <p className="font-cormorant font-light italic mb-3"
            style={{ fontSize: '2.2rem', color: 'hsla(40, 72%, 52%, 0.28)' }}>
            No articles yet
          </p>
          <p className="font-display text-[10px] tracking-[0.35em] uppercase" style={{ color: C.muted }}>
            Publish posts in the admin to populate this section
          </p>
        </div>
      </div>
    )
  }

  const post = posts[activeIndex]!

  const reveal = (delay: number) =>
    isTransitioning
      ? { opacity: 0, transform: 'translateY(8px)', transition: 'none' }
      : {
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
      <style>{`
        @keyframes nc-curtain-next {
          0%   { transform: translateX(-101%); }
          42%  { transform: translateX(0%);    }
          58%  { transform: translateX(0%);    }
          100% { transform: translateX(101%);  }
        }
        @keyframes nc-curtain-prev {
          0%   { transform: translateX(101%);  }
          42%  { transform: translateX(0%);    }
          58%  { transform: translateX(0%);    }
          100% { transform: translateX(-101%); }
        }
        @keyframes nc-kb-zoom {
          from { transform: scale(1);    }
          to   { transform: scale(1.05); }
        }
      `}</style>

      {/* Single self-contained card — no orphaned nav below */}
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Progress line — top edge of card */}
        <div className="relative" style={{ height: '2px', backgroundColor: C.border }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0,
            width: `${progress}%`,
            backgroundColor: C.accent,
            transition: 'width 80ms linear',
          }} />
        </div>

        {/* Body: text left + image right */}
        <div className="flex flex-col lg:flex-row" style={{ minHeight: 'clamp(480px, 56vw, 620px)' }}>

          {/* ── TEXT PANEL ─────────────────────────────────────────── */}
          <div
            className="relative flex flex-col justify-between flex-1 overflow-hidden"
            style={{ padding: 'clamp(2.5rem, 5vw, 5.5rem)' }}
          >
            {/* Decorative faded index numeral */}
            <span
              className="absolute pointer-events-none select-none font-cormorant font-light"
              style={{
                fontSize: 'clamp(9rem, 15vw, 14rem)',
                color: C.accentFaint,
                bottom: '-0.14em',
                right: '-0.04em',
                lineHeight: 1,
              }}
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </span>

            {/* Top content */}
            <div className="relative z-10">
              <div className="flex items-center gap-3.5 mb-7" style={{ ...reveal(0) }}>
                {post.category && (
                  <span
                    className="font-display text-[9px] tracking-[0.42em] uppercase px-3 py-1.5"
                    style={{ backgroundColor: C.accentTag, color: C.accentTagFg }}
                  >
                    {post.category}
                  </span>
                )}
                <span
                  className="font-display text-[9px] tracking-[0.38em] uppercase"
                  style={{ color: C.muted }}
                >
                  {formatDate(post.publishedAt)}
                </span>
              </div>

              <div style={{
                height: '1px', backgroundColor: C.border,
                transformOrigin: 'left', marginBottom: '1.75rem',
                ...lineReveal(0.08),
              }} />

              <h3
                className="font-cormorant font-light leading-[1.06]"
                style={{
                  fontSize: 'clamp(2.2rem, 3.2vw, 4rem)',
                  color: C.text,
                  marginBottom: '1.5rem',
                  maxWidth: '22ch',
                  ...reveal(0.12),
                }}
              >
                {post.title}
              </h3>

              {post.excerpt && (
                <p
                  className="text-base leading-[1.85] max-w-[40ch]"
                  style={{ color: C.muted, ...reveal(0.20) }}
                >
                  {post.excerpt.length > 200
                    ? post.excerpt.slice(0, 200) + '…'
                    : post.excerpt}
                </p>
              )}
            </div>

            {/* Card footer — read link + progress segments + arrows, all in one row */}
            <div
              className="relative z-10 mt-10 pt-6 flex items-center justify-between gap-6"
              style={{ borderTop: `1px solid ${C.border}`, ...reveal(0.28) }}
            >
              {/* Read article */}
              <Link href={`/posts/${post.slug}`} className="group inline-flex items-center gap-3 shrink-0">
                <span
                  className="font-display text-[10px] tracking-[0.35em] uppercase transition-opacity duration-200 group-hover:opacity-50"
                  style={{ color: C.text }}
                >
                  Read article
                </span>
                <span
                  className="inline-flex items-center justify-center w-8 h-8 transition-all duration-300 group-hover:bg-[hsl(40,72%,52%)] group-hover:border-[hsl(40,72%,52%)]"
                  style={{ border: `1px solid ${C.border}` }}
                >
                  <svg width="10" height="10" viewBox="0 0 11 11" fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:[&_path]:stroke-[hsl(350,62%,14%)]">
                    <path d="M2.5 5.5h6M6 3l2.5 2.5L6 8" stroke={C.text}
                      strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>

              {/* Progress segments + arrows grouped right */}
              <div className="flex items-center gap-5">
                {/* Segment bars */}
                <div className="flex items-center gap-2.5">
                  {posts.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(i, i > activeIndex ? 'next' : 'prev')}
                      aria-label={`Go to article ${i + 1}`}
                      className="relative overflow-hidden hover:opacity-75 transition-opacity duration-150"
                      style={{ width: '32px', height: '1px', backgroundColor: C.border }}
                    >
                      {i === activeIndex && (
                        <span style={{
                          position: 'absolute', inset: 0,
                          transform: `scaleX(${progress / 100})`,
                          transformOrigin: 'left',
                          backgroundColor: C.accent,
                          transition: 'transform 80ms linear',
                        }} />
                      )}
                      {i < activeIndex && (
                        <span className="absolute inset-0" style={{ backgroundColor: C.accentMid }} />
                      )}
                    </button>
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={goPrev}
                    aria-label="Previous"
                    className="group flex items-center justify-center w-8 h-8 transition-all duration-300 hover:border-[hsl(40,72%,52%)] hover:bg-[hsl(40,72%,52%)]"
                    style={{ border: `1px solid ${C.border}` }}
                  >
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
                      className="transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:[&_path]:stroke-[hsl(350,62%,14%)]">
                      <path d="M8 6H4M5.5 3.5L3 6l2.5 2.5" stroke={C.muted}
                        strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    onClick={goNext}
                    aria-label="Next"
                    className="group flex items-center justify-center w-8 h-8 transition-all duration-300 hover:border-[hsl(40,72%,52%)] hover:bg-[hsl(40,72%,52%)]"
                    style={{ border: `1px solid ${C.border}` }}
                  >
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:[&_path]:stroke-[hsl(350,62%,14%)]">
                      <path d="M4 6h4M6.5 3.5L9 6l-2.5 2.5" stroke={C.muted}
                        strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Column separator — desktop */}
          <div className="hidden lg:block w-px shrink-0" style={{ backgroundColor: C.border }} />
          {/* Row separator — mobile */}
          <div className="block lg:hidden" style={{ height: '1px', backgroundColor: C.border }} />

          {/* ── IMAGE PANEL ──────────────────────────────────────────── */}
          <div
            className="relative lg:w-[50%] aspect-[4/3] lg:aspect-auto flex-shrink-0 overflow-hidden"
            style={{ backgroundColor: C.imageBg }}
          >
            <div
              key={`nc-kb-${activeIndex}`}
              className="absolute inset-0"
              style={{
                animation: isTransitioning || prefersReducedMotion
                  ? undefined
                  : `nc-kb-zoom ${DURATION + TRANS}ms linear forwards`,
              }}
            >
              {post.imageUrl ? (
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={activeIndex === 0}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: C.imageBg }}>
                  <span className="font-cormorant font-light italic"
                    style={{ fontSize: '4rem', color: 'hsla(40, 72%, 52%, 0.22)' }}>
                    News
                  </span>
                </div>
              )}
            </div>

            {/* Subtle bottom depth gradient */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(18, 4, 6, 0.22) 0%, transparent 32%)' }}
            />

            {/* Gold curtain */}
            {isTransitioning && (
              <div
                key={`nc-curtain-${transitionKey}`}
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  backgroundColor: C.accent,
                  animation: `nc-curtain-${direction} ${TRANS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                }}
              />
            )}

            {/* Mobile tap zones */}
            <button onClick={goPrev} aria-label="Previous article" className="absolute left-0 top-0 bottom-0 w-2/5 z-40 lg:hidden" />
            <button onClick={goNext} aria-label="Next article"     className="absolute right-0 top-0 bottom-0 w-2/5 z-40 lg:hidden" />
          </div>
        </div>
      </div>
    </>
  )
}
