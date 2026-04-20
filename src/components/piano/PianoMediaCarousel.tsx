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
    Autoplay({ delay: 5000, stopOnInteraction: true }),
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
    <section className="bg-piano-black py-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <p className="font-display text-[11px] tracking-[0.55em] uppercase text-piano-gold mb-10">
          Gallery
        </p>

        <div className="relative group">
          {/* Embla viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {images.map((url, i) => (
                <div
                  key={i}
                  className="relative shrink-0 w-full"
                  style={{ aspectRatio: '16/9' }}
                >
                  <Image
                    src={url}
                    alt={`${title} — photo ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    priority={i === 0}
                  />
                  {/* subtle dark vignette on edges */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to right, rgba(0,0,0,0.18) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.18) 100%)',
                    }}
                  />
                  {i === stockImageIndex && (
                    <div className="absolute top-4 left-4 bg-piano-black/70 px-3 py-1.5 font-display text-[10px] tracking-[0.35em] uppercase text-piano-silver/70 pointer-events-none">
                      Reference image
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next — appear on hover */}
          {images.length > 1 && (
            <>
              <button
                onClick={scrollPrev}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center border border-piano-cream/20 text-piano-cream/60 bg-piano-black/40 backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 hover:border-piano-gold/60 hover:text-piano-gold"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="11 4 6 9 11 14" />
                </svg>
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center border border-piano-cream/20 text-piano-cream/60 bg-piano-black/40 backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 hover:border-piano-gold/60 hover:text-piano-gold"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="7 4 12 9 7 14" />
                </svg>
              </button>
            </>
          )}

          {/* Counter — top right */}
          <div className="absolute top-4 right-4 z-10 bg-piano-black/60 backdrop-blur-sm px-3 py-1.5 font-display text-[10px] tracking-[0.45em] text-piano-cream/60">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>

        {/* Dot navigation */}
        {scrollSnaps.length > 1 && (
          <div className="flex items-center justify-center gap-2.5 mt-6">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to image ${i + 1}`}
                className={cn(
                  'transition-all duration-300',
                  i === selectedIndex
                    ? 'w-6 h-px bg-piano-gold'
                    : 'w-2 h-px bg-piano-cream/25 hover:bg-piano-cream/50',
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
