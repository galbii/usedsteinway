'use client'

import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'

type FeaturedTestimonial = {
  id: string
  title: string
  customerName: string
  location?: string | null
  slug: string
}

type Props = {
  testimonials: FeaturedTestimonial[]
}

const DURATION = 6000
const TRANS = 500

export function FeaturedTestimonialsCarousel({ testimonials }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const pausedRef = useRef(false)
  const transitioningRef = useRef(false)
  const activeIndexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const count = testimonials.length

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (transitioningRef.current || count <= 1) return
      transitioningRef.current = true
      setVisible(false)
      setTimeout(() => {
        const next = (activeIndexRef.current + dir + count) % count
        activeIndexRef.current = next
        setActiveIndex(next)
        setVisible(true)
        transitioningRef.current = false
      }, TRANS)
    },
    [count],
  )

  const goTo = useCallback((idx: number) => {
    if (idx === activeIndexRef.current || transitioningRef.current) return
    transitioningRef.current = true
    setVisible(false)
    setTimeout(() => {
      activeIndexRef.current = idx
      setActiveIndex(idx)
      setVisible(true)
      transitioningRef.current = false
    }, TRANS)
  }, [])

  useEffect(() => {
    if (count <= 1) return
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) navigate(1)
    }, DURATION)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [count, navigate])

  if (count === 0) return null

  const active = testimonials[activeIndex]!

  return (
    <>
      <style>{`
        @keyframes progress-fill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>

      <section
        className="py-24 px-8 relative overflow-hidden bg-piano-charcoal"
        onMouseEnter={() => {
          pausedRef.current = true
        }}
        onMouseLeave={() => {
          pausedRef.current = false
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-16">
            Featured Voices
          </p>

          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -top-8 -left-4 font-cormorant text-piano-gold/20 leading-none select-none pointer-events-none"
              style={{ fontSize: '10rem' }}
            >
              &ldquo;
            </span>

            <div
              style={{
                opacity: visible ? 1 : 0,
                transition: `opacity ${TRANS}ms ease`,
              }}
            >
              <h2
                className="font-cormorant font-light text-white leading-snug mx-auto mb-10"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', maxWidth: '56rem' }}
              >
                {active.title}
              </h2>

              <hr className="border-piano-gold/20 max-w-xs mx-auto mb-8" />

              <div className="mb-10">
                <p className="font-medium text-piano-cream text-base">{active.customerName}</p>
                {active.location && (
                  <p className="text-piano-cream/50 text-sm mt-1">{active.location}</p>
                )}
              </div>

              <Link
                href={`/testimonials/${active.slug}`}
                className="inline-block border border-piano-gold/40 text-piano-gold px-8 py-3 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-gold hover:text-piano-charcoal transition-colors duration-300"
              >
                Read Full Story →
              </Link>
            </div>
          </div>

          {count > 1 && (
            <div className="mt-10 flex items-center justify-center gap-6">
              <button
                onClick={() => navigate(-1)}
                className="text-piano-cream/30 hover:text-piano-gold transition-colors"
                aria-label="Previous testimonial"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M10 3L5 8L10 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === activeIndex ? '1.25rem' : '0.375rem',
                      backgroundColor:
                        i === activeIndex
                          ? 'hsl(40 72% 52%)'
                          : 'hsl(36 18% 97% / 0.25)',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => navigate(1)}
                className="text-piano-cream/30 hover:text-piano-gold transition-colors"
                aria-label="Next testimonial"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 3L11 8L6 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {count > 1 && (
          <div className="absolute bottom-0 left-0 w-full h-px bg-piano-gold/10">
            <div
              key={activeIndex}
              className="origin-left bg-piano-gold h-px w-full"
              style={{ animation: `progress-fill ${DURATION}ms linear forwards` }}
            />
          </div>
        )}
      </section>
    </>
  )
}
