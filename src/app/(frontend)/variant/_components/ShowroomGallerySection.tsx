import Link from 'next/link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import type { Media as MediaType } from '@/payload-types'

// Bento pattern: 6 cells, 12-column grid, 2 rows
// [large 8col 2row] [medium 4col 1row] [medium 4col 1row]
// [small 4col 1row] [small 4col 1row]  [small 4col 1row]
const BENTO: Array<{ cols: string; rows: string }> = [
  { cols: 'col-span-12 md:col-span-8', rows: 'row-span-1 md:row-span-2' }, // large hero
  { cols: 'col-span-6  md:col-span-4', rows: 'row-span-1' },               // top-right A
  { cols: 'col-span-6  md:col-span-4', rows: 'row-span-1' },               // top-right B (fills under A)
  { cols: 'col-span-6  md:col-span-4', rows: 'row-span-1' },               // bottom row A
  { cols: 'col-span-6  md:col-span-4', rows: 'row-span-1' },               // bottom row B
  { cols: 'col-span-12 md:col-span-4', rows: 'row-span-1' },               // bottom row C
]

const C = {
  bg:     'hsl(36, 22%, 96%)',
  accent: 'hsl(40, 72%, 52%)',
  text:   'hsl(350, 12%, 11%)',
  muted:  'hsl(350, 5%, 46%)',
  border: 'hsl(36, 18%, 89%)',
}

interface Props {
  images: MediaType[]
}

export function ShowroomGallerySection({ images }: Props) {
  const visible = images.slice(0, BENTO.length)

  if (visible.length === 0) return null

  return (
    <section className="py-36 px-8" style={{ backgroundColor: C.bg }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="sr flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span
              className="font-display text-[10px] tracking-[0.48em] uppercase block mb-5"
              style={{ color: C.accent }}
            >
              The Showroom
            </span>
            <h2
              className="font-cormorant font-light leading-[1.05]"
              style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)', color: C.text }}
            >
              Inside Our Collection
            </h2>
          </div>
          <Link
            href="/gallery"
            className="sr sr-d1 group flex items-center gap-2 font-display text-[10px] tracking-[0.32em] uppercase transition-opacity hover:opacity-50 shrink-0"
            style={{ color: C.muted }}
          >
            View all photos
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </Link>
        </div>

        {/* Bento grid */}
        <div className="sr sr-d1 grid grid-cols-12 auto-rows-[200px] md:auto-rows-[260px] gap-2 md:gap-2.5 mb-12">
          {visible.map((image, i) => {
            const b = BENTO[i]!
            return (
              <div
                key={image.id}
                className={cn(
                  b.cols,
                  b.rows,
                  'group relative overflow-hidden',
                )}
                style={{ backgroundColor: 'hsl(36, 18%, 85%)' }}
              >
                <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]">
                  <Media
                    resource={image}
                    fill
                    className="absolute inset-0"
                    imgClassName="object-cover"
                    priority={i === 0}
                  />
                </div>

                {/* Bottom vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

                {/* Gold sweep on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 pointer-events-none"
                  style={{ backgroundColor: C.accent }}
                />

                {/* Caption on hover */}
                {(image.caption ?? image.alt) && (
                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-10 pb-4 px-4">
                    <p
                      className="font-cormorant font-light text-white leading-snug"
                      style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)' }}
                    >
                      {image.caption ?? image.alt}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="sr sr-d2 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-12 py-4 font-display text-[11px] tracking-[0.38em] uppercase transition-opacity duration-200 hover:opacity-80"
            style={{ backgroundColor: C.accent, color: 'hsl(350, 62%, 14%)' }}
          >
            Visit Our Showroom
          </Link>
        </div>

      </div>
    </section>
  )
}
