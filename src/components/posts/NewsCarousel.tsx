'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { PostCard } from '@/lib/payload/posts'

const C = {
  darkBg:       'hsl(350, 62%, 26%)',
  accent:       'hsl(40, 72%, 52%)',
  accentBorder: 'hsla(40, 72%, 52%, 0.30)',
  accentFaint:  'hsla(40, 72%, 52%, 0.08)',
  ivory:        'hsl(36, 22%, 96%)',
  ivoryFaded:   'rgba(245, 235, 215, 0.50)',
  borderLight:  'hsl(36, 18%, 88%)',
  text:         'hsl(350, 12%, 11%)',
  muted:        'hsl(350, 5%, 44%)',
  imageBg:      'hsl(36, 22%, 96%)',
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
    month: 'long', day: 'numeric', year: 'numeric',
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

  const reveal = (delay: number): React.CSSProperties =>
    isTransitioning
      ? { opacity: 0, transform: 'translateY(10px)', transition: 'none' }
      : { opacity: 1, transform: 'translateY(0)', transition: `opacity 0.60s ease ${delay}s, transform 0.60s cubic-bezier(0.2,0,0,1) ${delay}s` }

  const lineReveal = (delay: number): React.CSSProperties =>
    isTransitioning
      ? { transform: 'scaleX(0)', transition: 'none' }
      : { transform: 'scaleX(1)', transition: `transform 0.75s cubic-bezier(0.4,0,0.2,1) ${delay}s` }

  if (!posts.length) {
    return (
      <section style={{ backgroundColor: C.ivory, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontStyle: 'italic', color: C.muted }}>
          No articles yet
        </p>
      </section>
    )
  }

  const post = posts[activeIndex]!

  return (
    <>
      <style>{`
        @keyframes nc2-curtain-next {
          0%   { transform: translateX(-101%); }
          42%  { transform: translateX(0%);    }
          58%  { transform: translateX(0%);    }
          100% { transform: translateX(101%);  }
        }
        @keyframes nc2-curtain-prev {
          0%   { transform: translateX(101%);  }
          42%  { transform: translateX(0%);    }
          58%  { transform: translateX(0%);    }
          100% { transform: translateX(-101%); }
        }
        @keyframes nc2-kb-zoom {
          from { transform: scale(1);    }
          to   { transform: scale(1.06); }
        }
      `}</style>

      <section
        className="relative w-full overflow-hidden"
        style={{ minHeight: 'clamp(640px, 88vh, 980px)' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Full-bleed two-column grid */}
        <div
          className="relative lg:grid lg:grid-cols-[55%_45%]"
          style={{ minHeight: 'clamp(640px, 88vh, 980px)' }}
        >

          {/* ── IMAGE PANEL ──────────────────────────────── */}
          <div
            className="relative overflow-hidden"
            style={{ backgroundColor: C.imageBg, minHeight: 'clamp(360px, 50vw, 640px)' }}
          >
            {/* Ken Burns image */}
            <div
              key={`nc2-kb-${activeIndex}`}
              className="absolute inset-0"
              style={{
                animation: isTransitioning || prefersReducedMotion
                  ? undefined
                  : `nc2-kb-zoom ${DURATION + TRANS}ms linear forwards`,
              }}
            >
              {post.imageUrl ? (
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority={activeIndex === 0}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: C.imageBg }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '5rem', fontStyle: 'italic', color: 'hsla(40, 72%, 52%, 0.18)' }}>
                    UsedSteinways
                  </span>
                </div>
              )}
            </div>

            {/* Dark gradient base for heading overlay */}
            <div
              className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
              style={{ height: '60%', background: 'linear-gradient(to top, rgba(4,1,1,0.88) 0%, rgba(4,1,1,0.50) 40%, transparent 100%)' }}
            />

            {/* Heading overlay — anchored bottom-left of image panel */}
            <div
              className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
              style={{ padding: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-7 shrink-0" style={{ backgroundColor: C.accent }} />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '9px', letterSpacing: '0.55em', textTransform: 'uppercase', color: C.ivoryFaded }}>
                  From the Showroom
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
                }}
              >
                News &amp; Insights
              </h2>
            </div>

            {/* Gold curtain transition */}
            {isTransitioning && (
              <div
                key={`nc2-curtain-${transitionKey}`}
                className="absolute inset-0 z-30 pointer-events-none"
                style={{
                  backgroundColor: C.accent,
                  animation: `nc2-curtain-${direction} ${TRANS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                }}
              />
            )}

            {/* Corner mark — top left */}
            <div className="absolute top-8 left-8 z-20 pointer-events-none">
              <div className="w-6 h-px" style={{ backgroundColor: C.accent }} />
              <div className="w-px h-6" style={{ backgroundColor: C.accent }} />
            </div>

            {/* Mobile tap zones */}
            <button onClick={goPrev} aria-label="Previous" className="absolute left-0 top-0 bottom-0 w-2/5 z-40 lg:hidden" />
            <button onClick={goNext} aria-label="Next"     className="absolute right-0 top-0 bottom-0 w-2/5 z-40 lg:hidden" />
          </div>

          {/* ── CONTENT PANEL — white/ivory base ─────────── */}
          <div
            className="relative flex flex-col justify-between"
            style={{
              backgroundColor: C.ivory,
              padding: 'clamp(2.5rem, 5vw, 5rem)',
              borderLeft: `1px solid ${C.borderLight}`,
            }}
          >
            {/* Ghost numeral — decorative */}
            <span
              className="absolute pointer-events-none select-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(10rem, 18vw, 18rem)',
                color: 'hsla(350, 12%, 11%, 0.04)',
                bottom: '-0.10em',
                right: '-0.02em',
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </span>

            {/* ── ARTICLE CONTENT ── */}
            <div className="relative z-10 flex-1 flex flex-col justify-center">

              {/* Counter + category */}
              <div className="flex items-center gap-4 mb-8" style={{ ...reveal(0.06) }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontStyle: 'italic', color: C.accent }}>
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <div className="h-px w-5 shrink-0" style={{ backgroundColor: C.borderLight }} />
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontStyle: 'italic', color: C.muted }}>
                  {String(posts.length).padStart(2, '0')}
                </span>
                {post.category && (
                  <>
                    <div className="h-px flex-1" style={{ backgroundColor: C.borderLight }} />
                    <span
                      className="font-display text-[11px] tracking-[0.42em] uppercase px-3 py-1.5"
                      style={{ border: `1px solid ${C.accentBorder}`, color: C.accent }}
                    >
                      {post.category}
                    </span>
                  </>
                )}
              </div>

              {/* Gold rule */}
              <div style={{ height: '1px', backgroundColor: C.accentBorder, transformOrigin: 'left', marginBottom: '1.75rem', ...lineReveal(0.10) }} />

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2.6rem, 4vw, 4.8rem)',
                  fontWeight: 400,
                  lineHeight: 1.05,
                  color: C.text,
                  maxWidth: '22ch',
                  marginBottom: '1.5rem',
                  ...reveal(0.16),
                }}
              >
                {post.title}
              </h3>

              {/* Excerpt */}
              {post.excerpt && (
                <p
                  style={{
                    fontSize: '17px',
                    lineHeight: 1.85,
                    color: C.muted,
                    maxWidth: '34ch',
                    marginBottom: '1.25rem',
                    ...reveal(0.24),
                  }}
                >
                  {post.excerpt.length > 180 ? post.excerpt.slice(0, 180) + '…' : post.excerpt}
                </p>
              )}

              {/* Date */}
              <p
                className="font-display text-[11px] tracking-[0.40em] uppercase mb-10"
                style={{ color: C.muted, ...reveal(0.28) }}
              >
                {formatDate(post.publishedAt)}
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', ...reveal(0.32) }}>
                <Link
                  href={`/posts/${post.slug}`}
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
                  Read Article
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <path d="M3 6h6M7 3.5L9.5 6 7 8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  href="/posts"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.875rem',
                    padding: '1.25rem 2.5rem',
                    backgroundColor: 'transparent',
                    color: C.text,
                    fontFamily: 'var(--font-display)',
                    fontSize: '13px',
                    letterSpacing: '0.38em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    border: `1px solid ${C.borderLight}`,
                    transition: 'border-color 200ms, color 200ms',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.borderLight; e.currentTarget.style.color = C.text }}
                >
                  All Articles
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <path d="M3 6h6M7 3.5L9.5 6 7 8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* ── NAVIGATION FOOTER ── */}
            <div
              className="relative z-10 flex items-center justify-between pt-8"
              style={{ borderTop: `1px solid ${C.borderLight}`, ...reveal(0.38) }}
            >
              {/* Progress bar */}
              <div className="flex-1 h-px mr-6 relative" style={{ backgroundColor: C.borderLight }}>
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

              {/* Slide counter */}
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', letterSpacing: '0.32em', color: C.muted, marginRight: '1.25rem' }}>
                {String(activeIndex + 1).padStart(2, '0')}
                <span style={{ opacity: 0.4 }}> / </span>
                {String(posts.length).padStart(2, '0')}
              </span>

              {/* Arrow buttons */}
              <div className="flex items-center gap-1.5">
                <NavBtn onClick={goPrev} aria-label="Previous article" direction="prev" />
                <NavBtn onClick={goNext} aria-label="Next article"     direction="next" />
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
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
        width: '48px', height: '48px', cursor: 'pointer',
        backgroundColor: hov ? 'hsl(350, 62%, 14%)' : 'transparent',
        border: `1px solid ${hov ? 'hsl(350, 62%, 14%)' : 'hsl(36, 18%, 88%)'}`,
        transition: 'background-color 200ms, border-color 200ms',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {direction === 'prev'
        ? <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M8 6H4M5.5 3.5L3 6l2.5 2.5" stroke={hov ? 'hsl(36,22%,96%)' : 'hsl(350,12%,11%)'} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
        : <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M4 6h4M6.5 3.5L9 6l-2.5 2.5" stroke={hov ? 'hsl(36,22%,96%)' : 'hsl(350,12%,11%)'} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
      }
    </button>
  )
}
