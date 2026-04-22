'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import type { Media as MediaType } from '@/payload-types'

// 6-cell bento, 12-column grid, 2 rows
const BENTO: Array<{ cols: string; rows: string }> = [
  { cols: 'col-span-12 md:col-span-8', rows: 'row-span-1 md:row-span-2' }, // large hero
  { cols: 'col-span-6  md:col-span-4', rows: 'row-span-1' },               // top-right A
  { cols: 'col-span-6  md:col-span-4', rows: 'row-span-1' },               // top-right B
  { cols: 'col-span-6  md:col-span-4', rows: 'row-span-1' },               // bottom-right A
  { cols: 'col-span-6  md:col-span-4', rows: 'row-span-1' },               // bottom-right B
  { cols: 'col-span-12 md:col-span-4', rows: 'row-span-1' },               // bottom-right C
]

const CELL_COUNT = BENTO.length
const ROTATE_INTERVAL = 2800   // ms between each cell swap
const CROSSFADE_MS    = 1000   // opacity transition duration

const C = {
  bg:      'hsl(36, 22%, 96%)',
  accent:  'hsl(40, 72%, 52%)',
  text:    'hsl(350, 12%, 11%)',
  muted:   'hsl(350, 5%, 46%)',
  border:  'hsl(36, 18%, 89%)',
  dark:    'hsl(350, 62%, 14%)',
  darkCard:'hsl(350, 56%, 32%)',
}

// Per-cell double-buffer: slot A and slot B are stacked.
// Only the "front" slot is visible (opacity 1); the back is preloaded (opacity 0).
// On each rotation we load the next image into the back slot, then flip `front`.
type CellSlots = {
  a: number
  b: number
  front: 'a' | 'b'
}

interface Props {
  images: MediaType[]
}

export function ShowroomGallerySection({ images }: Props) {
  const [cells, setCells] = useState<CellSlots[]>(() =>
    BENTO.map((_, i) => ({
      a:     i % Math.max(images.length, 1),
      b:     (i + CELL_COUNT) % Math.max(images.length, 1),
      front: 'a',
    }))
  )

  const cursorRef = useRef(0)

  useEffect(() => {
    if (images.length <= CELL_COUNT) return

    const timer = setInterval(() => {
      const cellIdx = cursorRef.current % CELL_COUNT
      cursorRef.current += 1

      setCells((prev) => {
        const next = [...prev] as CellSlots[]
        const cell = { ...next[cellIdx]! }

        const shownIndices = new Set(prev.map((c) => (c.front === 'a' ? c.a : c.b)))
        const currentShown = cell.front === 'a' ? cell.a : cell.b
        let nextIdx = (currentShown + 1) % images.length
        let tries = 0
        while (shownIndices.has(nextIdx) && tries < images.length) {
          nextIdx = (nextIdx + 1) % images.length
          tries++
        }

        if (cell.front === 'a') {
          cell.b     = nextIdx
          cell.front = 'b'
        } else {
          cell.a     = nextIdx
          cell.front = 'a'
        }

        next[cellIdx] = cell
        return next
      })
    }, ROTATE_INTERVAL)

    return () => clearInterval(timer)
  }, [images.length])

  if (images.length === 0) return null

  return (
    <section style={{ backgroundColor: C.bg }}>

      {/* ── Section header ─────────────────────────────────────────────── */}
      <div className="pt-36 pb-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="sr flex flex-col md:flex-row md:items-end justify-between gap-6">

            <div>
              {/* Overline */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-8 shrink-0" style={{ backgroundColor: C.accent }} />
                <span
                  className="font-display text-[10px] tracking-[0.55em] uppercase"
                  style={{ color: C.accent }}
                >
                  The Showroom
                </span>
              </div>

              <h2
                className="font-cormorant font-light leading-[1.02]"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)', color: C.text }}
              >
                Inside Our<br />Collection
              </h2>
            </div>

            {/* Desktop "View all" ghost link */}
            <Link
              href="/gallery"
              className="sr sr-d1 hidden md:flex group items-center gap-3 self-end pb-2 font-display text-[10px] tracking-[0.38em] uppercase transition-opacity duration-200 hover:opacity-50"
              style={{ color: C.muted }}
            >
              View all photos
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bento grid (full-bleed to max-width) ───────────────────────── */}
      <div className="px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="sr sr-d1 grid grid-cols-12 auto-rows-[200px] md:auto-rows-[260px] gap-1.5 md:gap-2">
            {BENTO.map((b, i) => {
              const cell  = cells[i]!
              const imgA  = images[cell.a]
              const imgB  = images[cell.b]

              return (
                <div
                  key={i}
                  className={cn(b.cols, b.rows, 'group relative overflow-hidden')}
                  style={{ backgroundColor: 'hsl(36, 18%, 82%)' }}
                >
                  {/* Slot A */}
                  {imgA && (
                    <div
                      className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
                      style={{
                        opacity:    cell.front === 'a' ? 1 : 0,
                        transition: `opacity ${CROSSFADE_MS}ms ease-in-out, transform 700ms cubic-bezier(0.25,0.46,0.45,0.94)`,
                      }}
                    >
                      <Media
                        resource={imgA}
                        fill
                        className="absolute inset-0"
                        imgClassName="object-cover"
                        priority={i === 0}
                      />
                    </div>
                  )}

                  {/* Slot B */}
                  {imgB && (
                    <div
                      className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
                      style={{
                        opacity:    cell.front === 'b' ? 1 : 0,
                        transition: `opacity ${CROSSFADE_MS}ms ease-in-out, transform 700ms cubic-bezier(0.25,0.46,0.45,0.94)`,
                      }}
                    >
                      <Media
                        resource={imgB}
                        fill
                        className="absolute inset-0"
                        imgClassName="object-cover"
                      />
                    </div>
                  )}

                  {/* Permanent bottom vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none z-10" />

                  {/* Gold sweep on hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 pointer-events-none z-20"
                    style={{ backgroundColor: C.accent }}
                  />

                  {/* Caption reveal on hover */}
                  {(() => {
                    const activeImg = cell.front === 'a' ? imgA : imgB
                    const caption   = activeImg?.caption ?? activeImg?.alt
                    return caption ? (
                      <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-20 bg-gradient-to-t from-black/85 via-black/45 to-transparent pt-12 pb-5 px-5">
                        <p
                          className="font-cormorant font-light text-white leading-snug"
                          style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)' }}
                        >
                          {caption}
                        </p>
                      </div>
                    ) : null
                  })()}

                  {/* Cell index number */}
                  <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pointer-events-none">
                    <span className="font-display text-[9px] tracking-[0.35em]" style={{ color: C.accent }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── CTA bar ─────────────────────────────────────────────────────── */}
      <div className="pb-36 px-8 pt-12">
        <div className="max-w-7xl mx-auto">
          <div className="sr sr-d2 flex flex-col sm:flex-row items-center justify-between gap-6">

            {/* Left: image count hint */}
            <p
              className="font-display text-[10px] tracking-[0.42em] uppercase hidden sm:block"
              style={{ color: 'hsla(350, 5%, 46%, 0.50)' }}
            >
              {images.length} curated photographs
            </p>

            {/* Right: CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-3 px-10 py-3.5 font-display text-[11px] tracking-[0.38em] uppercase transition-opacity duration-200 hover:opacity-80"
                style={{ backgroundColor: C.text, color: C.bg }}
              >
                View Full Gallery
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-3.5 font-display text-[11px] tracking-[0.38em] uppercase transition-opacity duration-200 hover:opacity-70"
                style={{ border: `1px solid ${C.border}`, color: C.text }}
              >
                Visit Our Showroom
              </Link>
            </div>

          </div>

          {/* Mobile: image count */}
          <p
            className="font-display text-[10px] tracking-[0.42em] uppercase text-center mt-8 sm:hidden"
            style={{ color: 'hsla(350, 5%, 46%, 0.50)' }}
          >
            {images.length} curated photographs
          </p>
        </div>
      </div>

    </section>
  )
}
