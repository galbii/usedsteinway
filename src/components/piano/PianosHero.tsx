'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { PianoLogo } from '@/components/layout/PianoLogo'
import type { Piano } from '@/types/piano'

const SLIDE_DURATION = 5000  // ms each image is shown
const FADE_DURATION  = 1500  // ms crossfade

interface PianosHeroProps {
  pianos: Piano[]
}

export function PianosHero({ pianos }: PianosHeroProps) {
  // Use up to 12 pianos for the slideshow
  const slides = pianos.slice(0, 12)
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

  return (
    <section
      className="relative w-full overflow-hidden bg-piano-black"
      style={{ height: 'clamp(520px, 85vh, 900px)' }}
    >

      {/* ── Background images ──────────────────────────────────── */}
      {slides.map((piano, i) => {
        const src      = piano.stockImageUrl || piano.imageUrls[0]
        const isActive   = i === current
        const isPrevious = i === previous

        if (!src) return null

        return (
          <div
            key={piano.id}
            className="absolute inset-0 will-change-[opacity,transform]"
            style={{
              display:  isActive || isPrevious ? 'block' : 'none',
              opacity:  isActive ? 1 : 0,
              transition: `opacity ${FADE_DURATION}ms ease-in-out`,
              transform: isActive ? 'scale(1.06)' : 'scale(1)',
              transitionProperty:       isActive ? 'opacity, transform' : 'opacity',
              transitionDuration:       isActive ? `${FADE_DURATION}ms, 8000ms` : `${FADE_DURATION}ms`,
              transitionTimingFunction: isActive ? 'ease-in-out, ease-out' : 'ease-in-out',
            }}
          >
            <Image
              src={src}
              alt={piano.title}
              fill
              className="absolute inset-0 object-cover"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        )
      })}

      {/* ── Layered overlays — mirrors GalleryHero exactly ─────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-piano-black/70 via-piano-black/15 to-piano-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-piano-black/30 via-transparent to-piano-black/30 pointer-events-none" />

      {/* ── Centered content ───────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 pointer-events-none select-none">
        <PianoLogo theme="dark" size="xl" noLink />

        <div className="flex items-center gap-4 mt-2">
          <div className="h-px w-12 bg-piano-gold/40" />
          <p className="font-display text-[9px] tracking-[0.65em] uppercase text-piano-cream/50">
            Complete Inventory
          </p>
          <div className="h-px w-12 bg-piano-gold/40" />
        </div>

        <p className="font-cormorant font-light text-piano-cream/35 text-base tracking-widest">
          {pianos.length}&nbsp;{pianos.length === 1 ? 'instrument' : 'instruments'}
        </p>
      </div>

      {/* ── Slide indicator dots ────────────────────────────────── */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none">
          {slides.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width:           i === current ? '20px' : '4px',
                height:          '4px',
                backgroundColor: i === current
                  ? 'hsl(40 72% 52%)'
                  : 'rgba(255,248,235,0.25)',
              }}
            />
          ))}
        </div>
      )}

      {/* ── Scroll nudge ───────────────────────────────────────── */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 pointer-events-none select-none">
        <p className="font-display text-[8px] tracking-[0.5em] uppercase text-piano-cream/30 [writing-mode:vertical-rl]">
          Scroll
        </p>
        <div className="w-px h-8 bg-piano-gold/30" />
      </div>

    </section>
  )
}
