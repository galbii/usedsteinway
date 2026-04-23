'use client'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { cn } from '@/utilities/ui'

interface PianoMediaCarouselProps {
  images: string[]
  title: string
  stockImageIndex?: number
}

export function PianoMediaCarousel({ images, title, stockImageIndex = -1 }: PianoMediaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false }, [
    Autoplay({ delay: 6000, stopOnInteraction: true }),
  ])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  if (!images.length) return null

  return (
    <section
      className="relative bg-piano-black overflow-hidden"
      style={{ height: '100vh', minHeight: '600px' }}
      aria-label="Piano photo gallery"
    >
      {/* Embla — full height */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex touch-pan-y h-full">
          {images.map((url, i) => (
            <div key={i} className="relative shrink-0 w-full h-full">
              <Image
                src={url}
                alt={`${title} — photo ${i + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
              {/* Edge vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.15) 100%)',
                }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Gallery label — top left, glass pill */}
      <div
        className="absolute top-6 left-7 z-20 flex items-center gap-3 bg-white/15 backdrop-blur-xl border border-white/20 px-4 py-2"
        aria-hidden="true"
      >
        <div className="h-px w-5 bg-piano-burgundy/80" />
        <p className="font-display text-[10px] tracking-[0.5em] uppercase text-white/75">Gallery</p>
      </div>

      {/* Reference image badge — top right */}
      {selectedIndex === stockImageIndex && stockImageIndex !== -1 && (
        <div className="absolute top-6 right-7 z-20 bg-white/15 backdrop-blur-xl border border-white/20 px-3 py-2 font-display text-[9px] tracking-[0.35em] uppercase text-white/65">
          Reference image
        </div>
      )}

      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)' }}
        aria-hidden="true"
      />

      {/* Control bar — light glass */}
      {images.length > 1 && (
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between px-7 pb-7 pt-4">

          {/* Left: counter */}
          <span
            className="bg-white/15 backdrop-blur-xl border border-white/20 px-4 py-2 text-white/70 font-display text-[10px] tracking-[0.45em]"
            aria-live="polite"
            aria-atomic="true"
          >
            {selectedIndex + 1} / {images.length}
          </span>

          {/* Right: dots + arrows */}
          <div className="flex items-center gap-5">

            {/* Dot indicators */}
            <div className="flex items-center gap-2.5" role="tablist" aria-label="Image navigation">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === selectedIndex}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={cn(
                    'transition-all duration-300',
                    i === selectedIndex
                      ? 'w-6 h-px bg-white'
                      : 'w-2 h-px bg-white/35 hover:bg-white/65',
                  )}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={scrollPrev}
                aria-label="Previous image"
                className="w-10 h-10 flex items-center justify-center bg-white/15 backdrop-blur-xl border border-white/20 text-white/70 hover:bg-white/25 hover:text-white transition-all duration-200"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <polyline points="9 3 4 7.5 9 12" />
                </svg>
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next image"
                className="w-10 h-10 flex items-center justify-center bg-white/15 backdrop-blur-xl border border-white/20 text-white/70 hover:bg-white/25 hover:text-white transition-all duration-200"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <polyline points="6 3 11 7.5 6 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
