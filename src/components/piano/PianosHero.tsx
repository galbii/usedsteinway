'use client'

import { useState, useEffect } from 'react'
import { Media } from '@/components/Media'
import { PianoLogo } from '@/components/layout/PianoLogo'
import type { Piano } from '@/types/piano'
import type { Media as MediaType } from '@/payload-types'

const SLIDE_DURATION = 5000
const FADE_DURATION  = 1500

interface PianosHeroProps {
  pianos: Piano[]
  galleryImages: MediaType[]
  backgroundOnly?: boolean
}

export function PianosHero({ pianos, galleryImages, backgroundOnly = false }: PianosHeroProps) {
  const slides = galleryImages.slice(0, 16)
  const [current,  setCurrent]  = useState(0)
  const [previous, setPrevious] = useState<number | null>(null)

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => {
        setPrevious(prev)
        return (prev + 1) % slides.length
      })
    }, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [slides.length])

  const currentCaption = slides[current]?.caption
  const slideNum = String(current + 1).padStart(2, '0')
  const totalNum = String(slides.length).padStart(2, '0')

  return (
    <section
      className="relative w-full overflow-hidden bg-piano-black"
      style={{ height: 'clamp(520px, 85vh, 900px)' }}
    >

      {/* ── Background images ──────────────────────────────────── */}
      {slides.map((slide, i) => {
        const isActive   = i === current
        const isPrevious = i === previous
        // Alternate Ken Burns: even slides zoom in, odd slides zoom out
        const zoomIn     = i % 2 === 0

        return (
          <div
            key={slide.id}
            className="absolute inset-0 will-change-[opacity,transform]"
            style={{
              display:    isActive || isPrevious ? 'block' : 'none',
              opacity:    isActive ? 1 : 0,
              transform:  isActive
                ? (zoomIn ? 'scale(1.06)' : 'scale(1)')
                : (zoomIn ? 'scale(1)'    : 'scale(1.06)'),
              transitionProperty:       isActive ? 'opacity, transform' : 'opacity',
              transitionDuration:       isActive ? `${FADE_DURATION}ms, 8000ms` : `${FADE_DURATION}ms`,
              transitionTimingFunction: isActive ? 'ease-in-out, ease-out' : 'ease-in-out',
            }}
          >
            <Media
              resource={slide}
              fill
              htmlElement={null}
              imgClassName="object-cover"
              size="100vw"
              priority={i === 0}
            />
          </div>
        )
      })}

      {/* ── Layered overlays ───────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-piano-black/70 via-piano-black/15 to-piano-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-piano-black/30 via-transparent to-piano-black/30 pointer-events-none" />

      {/* ── UI elements — hidden when used as background-only ─── */}
      {!backgroundOnly && (
        <>
          {/* Centered content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 pointer-events-none select-none">
            <PianoLogo theme="dark" size="xl" noLink />
            <h1
              className="font-cormorant font-light text-white text-center"
              style={{
                fontSize: 'clamp(3.2rem, 6.5vw, 6.5rem)',
                lineHeight: 1,
                textShadow: '0 4px 32px rgba(0,0,0,0.55), 0 1px 8px rgba(0,0,0,0.4)',
                letterSpacing: '0.04em',
              }}
            >
              Our Piano Collection
            </h1>
            <p
              className="font-display text-piano-cream/50 tracking-[0.5em] uppercase"
              style={{ fontSize: '10px', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
            >
              {pianos.length}&nbsp;{pianos.length === 1 ? 'instrument' : 'instruments'}
            </p>
          </div>

          {/* Caption (bottom-left) */}
          {currentCaption && (
            <div
              key={`caption-${current}`}
              className="absolute bottom-8 left-8 max-w-[240px] pointer-events-none select-none animate-in fade-in slide-in-from-left-2 duration-700"
            >
              <div className="w-6 h-px bg-piano-gold/40 mb-2" />
              <p className="font-display text-piano-cream/40 uppercase leading-relaxed" style={{ fontSize: '9px', letterSpacing: '0.3em' }}>
                {currentCaption}
              </p>
            </div>
          )}

          {/* Slide dots + counter (bottom-center) */}
          {slides.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setPrevious(current); setCurrent(i) }}
                    aria-label={`Go to slide ${i + 1}`}
                    className="rounded-full transition-all duration-500 focus:outline-none cursor-pointer"
                    style={{
                      width: i === current ? '20px' : '4px',
                      height: '4px',
                      backgroundColor: i === current ? 'hsl(40 72% 52%)' : 'rgba(255,248,235,0.25)',
                    }}
                  />
                ))}
              </div>
              <p className="font-display text-piano-cream/25 tabular-nums" style={{ fontSize: '9px', letterSpacing: '0.4em' }}>
                {slideNum}&nbsp;/&nbsp;{totalNum}
              </p>
            </div>
          )}

          {/* Scroll nudge (bottom-right) */}
          <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 pointer-events-none select-none">
            <p className="font-display text-[8px] tracking-[0.5em] uppercase text-piano-cream/30 [writing-mode:vertical-rl]">Scroll</p>
            <div className="w-px h-8 bg-piano-gold/30" />
          </div>
        </>
      )}

    </section>
  )
}
