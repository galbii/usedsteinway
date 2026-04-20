'use client'

/**
 * NewsCarousel
 * ─────────────────────────────────────────────────────────────
 * Displays recent posts on the homepage beneath the hero.
 * Transition: same "Gold Curtain Reveal" pattern as FeaturedCarousel —
 * a burnished-gold bar sweeps across to hide the outgoing slide and
 * reveal the new one. Text staggered-fades in with each advance.
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { PostCard } from '@/lib/payload/posts'

const C = {
  bg:          'hsl(36, 22%, 96%)',
  darkBg:      'hsl(350, 62%, 26%)',
  darkCard:    'hsl(350, 56%, 32%)',
  accent:      'hsl(40, 72%, 52%)',
  accentFaint: 'hsla(40, 72%, 52%, 0.18)',
  text:        'hsl(350, 12%, 11%)',
  muted:       'hsl(350, 5%, 46%)',
  mutedOnDark: 'rgba(245, 235, 220, 0.42)',
  ivory:       'hsl(36, 22%, 96%)',
  border:      'hsl(36, 18%, 89%)',
  borderDark:  'hsl(350, 45%, 38%)',
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
        style={{
          minHeight: '340px',
          backgroundColor: C.darkBg,
          border: `1px solid ${C.borderDark}`,
        }}
      >
        <div className="text-center">
          <p
            className="font-cormorant font-light italic mb-3"
            style={{ fontSize: '2rem', color: 'rgba(245,235,220,0.22)' }}
          >
            No articles yet
          </p>
          <p
            className="font-display text-[10px] tracking-[0.35em] uppercase"
            style={{ color: 'rgba(245,235,220,0.18)' }}
          >
            Publish posts in the admin to populate this carousel
          </p>
        </div>
      </div>
    )
  }
  const post = posts[activeIndex]!

  const reveal = (delay: number) =>
    isTransitioning
      ? { opacity: 0, transform: 'translateY(10px)', transition: 'none' }
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
        @keyframes news-curtain-next {
          0%   { transform: translateX(-101%); }
          42%  { transform: translateX(0%);    }
          58%  { transform: translateX(0%);    }
          100% { transform: translateX(101%);  }
        }
        @keyframes news-curtain-prev {
          0%   { transform: translateX(101%);  }
          42%  { transform: translateX(0%);    }
          58%  { transform: translateX(0%);    }
          100% { transform: translateX(-101%); }
        }
        @keyframes news-kb-zoom {
          from { transform: scale(1);    }
          to   { transform: scale(1.05); }
        }
      `}</style>

      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Card shell — dark burgundy */}
        <div
          className="relative overflow-hidden"
          style={{
            backgroundColor: C.darkBg,
            boxShadow: '0 20px 80px hsl(350 62% 14% / 0.28), 0 4px 20px hsl(350 62% 14% / 0.14)',
          }}
        >
          {/* Animated gold top border */}
          <div
            style={{
              height: '3px',
              backgroundColor: C.accent,
              transformOrigin: direction === 'next' ? 'left' : 'right',
              ...lineReveal(0.06),
            }}
          />

          <div className="flex flex-col lg:flex-row lg:min-h-[560px]">

            {/* ── IMAGE PANEL ────────────────────────────────────── */}
            <div
              className="relative lg:w-[52%] aspect-[16/10] lg:aspect-auto flex-shrink-0 overflow-hidden"
              style={{ backgroundColor: C.darkCard }}
            >
              {/* Ken Burns zoom on active image */}
              <div
                key={`news-kb-${activeIndex}`}
                className="absolute inset-0"
                style={{
                  animation: isTransitioning || prefersReducedMotion
                    ? undefined
                    : `news-kb-zoom ${DURATION + TRANS}ms linear forwards`,
                }}
              >
                {post.imageUrl ? (
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    priority={activeIndex === 0}
                  />
                ) : (
                  /* Placeholder when no image */
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: C.darkCard }}
                  >
                    <span
                      className="font-cormorant font-light italic"
                      style={{ fontSize: '5rem', color: 'hsla(40, 72%, 52%, 0.12)' }}
                    >
                      News
                    </span>
                  </div>
                )}
              </div>

              {/* Gradient — stronger on right side to blend into text panel */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top,  rgba(58,15,20,0.65) 0%,  rgba(58,15,20,0.10) 50%, transparent 75%),' +
                    'linear-gradient(to right, transparent 60%, hsl(350,62%,26%) 100%)',
                }}
              />

              {/* Gold curtain */}
              {isTransitioning && (
                <div
                  key={`news-curtain-${transitionKey}`}
                  className="absolute inset-0 z-20 pointer-events-none"
                  style={{
                    backgroundColor: C.accent,
                    animation: `news-curtain-${direction} ${TRANS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                  }}
                />
              )}

              {/* Category badge */}
              {post.category && (
                <div className="absolute top-6 left-6 z-30" style={{ ...reveal(0) }}>
                  <span
                    className="font-display text-[9px] tracking-[0.4em] uppercase px-3.5 py-2 block"
                    style={{ backgroundColor: C.accent, color: C.darkBg }}
                  >
                    {post.category}
                  </span>
                </div>
              )}

              {/* Slide counter */}
              <div className="absolute bottom-6 right-6 z-30">
                <span
                  className="font-display text-[10px] tracking-[0.3em] tabular-nums"
                  style={{ color: 'rgba(245,235,220,0.35)' }}
                >
                  {String(activeIndex + 1).padStart(2, '0')}
                  <span style={{ opacity: 0.5 }}> / </span>
                  {String(posts.length).padStart(2, '0')}
                </span>
              </div>

              {/* Mobile tap zones */}
              <button onClick={goPrev} aria-label="Previous article" className="absolute left-0 top-0 bottom-0 w-2/5 z-40 lg:hidden" />
              <button onClick={goNext} aria-label="Next article"     className="absolute right-0 top-0 bottom-0 w-2/5 z-40 lg:hidden" />
            </div>

            {/* ── TEXT PANEL ─────────────────────────────────────── */}
            <div
              className="flex flex-col justify-between flex-1"
              style={{
                padding: 'clamp(2.2rem, 4.5vw, 5rem)',
                backgroundColor: C.darkBg,
              }}
            >
              <div>
                {/* Date + overline */}
                <p
                  className="font-display text-[10px] tracking-[0.48em] uppercase mb-5"
                  style={{ color: C.accent, ...reveal(0) }}
                >
                  {post.category ? `${post.category} · ` : ''}
                  {formatDate(post.publishedAt)}
                </p>

                {/* Title */}
                <h3
                  className="font-cormorant font-light leading-[1.08]"
                  style={{
                    fontSize: 'clamp(2.4rem, 3.8vw, 4.8rem)',
                    color: C.ivory,
                    marginBottom: '1.25rem',
                    ...reveal(0.07),
                  }}
                >
                  {post.title}
                </h3>

                {/* Divider line */}
                <div
                  style={{
                    height: '1px',
                    backgroundColor: C.borderDark,
                    transformOrigin: 'left',
                    marginBottom: '1.75rem',
                    ...lineReveal(0.16),
                  }}
                />

                {/* Excerpt / subheading */}
                {post.excerpt && (
                  <p
                    className="text-base leading-[1.85] max-w-[42ch]"
                    style={{ color: C.mutedOnDark, ...reveal(0.20) }}
                  >
                    {post.excerpt.length > 220
                      ? post.excerpt.slice(0, 220) + '…'
                      : post.excerpt}
                  </p>
                )}
              </div>

              {/* Read link */}
              <div
                className="mt-10 pt-7 flex items-center justify-between"
                style={{ borderTop: `1px solid ${C.borderDark}`, ...reveal(0.28) }}
              >
                <span
                  className="font-display text-[9px] tracking-[0.38em] uppercase"
                  style={{ color: 'rgba(245,235,220,0.22)' }}
                >
                  From the showroom
                </span>

                <Link
                  href={`/posts/${post.slug}`}
                  className="group inline-flex items-center gap-3.5"
                >
                  <span
                    className="font-display text-[10px] tracking-[0.35em] uppercase transition-opacity duration-200 group-hover:opacity-50"
                    style={{ color: 'rgba(245,235,220,0.55)' }}
                  >
                    Read article
                  </span>
                  <span
                    className="inline-flex items-center justify-center w-9 h-9 transition-all duration-300 group-hover:bg-[hsl(40,72%,52%)] group-hover:border-[hsl(40,72%,52%)]"
                    style={{ border: `1px solid ${C.borderDark}` }}
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:[&_path]:stroke-[hsl(350,62%,14%)]"
                    >
                      <path
                        d="M2.5 5.5h6M6 3l2.5 2.5L6 8"
                        stroke="rgba(245,235,220,0.55)"
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
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => navigate(i, i > activeIndex ? 'next' : 'prev')}
                aria-label={`Go to slide ${i + 1}`}
                className="relative overflow-hidden hover:opacity-75 transition-opacity duration-150"
                style={{ width: '40px', height: '1px', backgroundColor: C.borderDark }}
              >
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
                {i < activeIndex && (
                  <span className="absolute inset-0" style={{ backgroundColor: C.accentFaint }} />
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
              style={{ border: `1px solid ${C.borderDark}` }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                className="transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:[&_path]:stroke-[hsl(350,62%,14%)]">
                <path d="M8 6H4M5.5 3.5L3 6l2.5 2.5" stroke={C.mutedOnDark}
                  strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              onClick={goNext}
              aria-label="Next"
              className="group flex items-center justify-center w-10 h-10 transition-all duration-300 hover:border-[hsl(40,72%,52%)] hover:bg-[hsl(40,72%,52%)]"
              style={{ border: `1px solid ${C.borderDark}` }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:[&_path]:stroke-[hsl(350,62%,14%)]">
                <path d="M4 6h4M6.5 3.5L9 6l-2.5 2.5" stroke={C.mutedOnDark}
                  strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
