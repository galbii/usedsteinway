'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { PianoLogo } from '@/components/layout/PianoLogo'
import type { Media as MediaType } from '@/payload-types'

interface GalleryHeroProps {
  images: MediaType[]
  totalCount: number
}

const SLIDE_DURATION = 5000  // ms each image is shown
const FADE_DURATION  = 1500  // ms crossfade

export function GalleryHero({ images, totalCount }: GalleryHeroProps) {
  // Limit slideshow to first 12 images so we don't blow the DOM
  const slides = images.slice(0, 12)
  const [current, setCurrent] = useState(0)
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
    <section className="relative w-full overflow-hidden bg-piano-black" style={{ height: 'clamp(520px, 85vh, 900px)' }}>

      {/* ── Background images ─────────────────────────────────── */}
      {slides.map((image, i) => {
        const isActive   = i === current
        const isPrevious = i === previous

        return (
          <div
            key={image.id}
            className={cn(
              'absolute inset-0 will-change-[opacity,transform]',
              isActive || isPrevious ? 'block' : 'hidden',
            )}
            style={{
              opacity: isActive ? 1 : 0,
              transition: `opacity ${FADE_DURATION}ms ease-in-out`,
              // Ken Burns: active image slowly expands; outgoing snaps back
              transform: isActive ? 'scale(1.06)' : 'scale(1)',
              transitionProperty: isActive ? 'opacity, transform' : 'opacity',
              transitionDuration: isActive
                ? `${FADE_DURATION}ms, 8000ms`
                : `${FADE_DURATION}ms`,
              transitionTimingFunction: isActive
                ? 'ease-in-out, ease-out'
                : 'ease-in-out',
            }}
          >
            <Media
              resource={image}
              fill
              className="absolute inset-0"
              imgClassName="object-cover"
              priority={i === 0}
            />
          </div>
        )
      })}

      {/* ── Layered overlays ──────────────────────────────────── */}
      {/* Deep vignette at top and bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-piano-black/70 via-piano-black/15 to-piano-black/80 pointer-events-none" />
      {/* Subtle left-right darkening */}
      <div className="absolute inset-0 bg-gradient-to-r from-piano-black/30 via-transparent to-piano-black/30 pointer-events-none" />

      {/* ── Centered logo + label ─────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 pointer-events-none select-none">
        <PianoLogo theme="dark" size="xl" noLink />

        <div className="flex items-center gap-4 mt-2">
          <div className="h-px w-12 bg-piano-gold/40" />
          <p className="font-display text-[9px] tracking-[0.65em] uppercase text-piano-cream/50">
            Visual Archive
          </p>
          <div className="h-px w-12 bg-piano-gold/40" />
        </div>

        <p className="font-cormorant font-light text-piano-cream/35 text-base tracking-widest">
          {totalCount}&nbsp;{totalCount === 1 ? 'image' : 'images'}
        </p>
      </div>

      {/* ── Slide indicator dots ──────────────────────────────── */}
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
                  ? 'hsl(40 72% 52%)'         // piano-gold
                  : 'rgba(255,248,235,0.25)',
              }}
            />
          ))}
        </div>
      )}

      {/* ── Scroll nudge ──────────────────────────────────────── */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 pointer-events-none select-none">
        <p className="font-display text-[8px] tracking-[0.5em] uppercase text-piano-cream/30 [writing-mode:vertical-rl]">
          Scroll
        </p>
        <div className="w-px h-8 bg-piano-gold/30" />
      </div>
    </section>
  )
}
