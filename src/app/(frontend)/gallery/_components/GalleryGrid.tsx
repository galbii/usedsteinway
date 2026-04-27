'use client'

import { useState, useMemo } from 'react'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import type { Media as MediaType } from '@/payload-types'

// Bento pattern repeats every 5 items in a 12-column grid:
//   Block A: [large 8×2] + [small 4×1 / small 4×1]
//   Block B: [medium 6×1] + [medium 6×1]
const BENTO: Array<{ cols: string; rows: string }> = [
  { cols: 'col-span-12 md:col-span-8', rows: 'row-span-1 md:row-span-2' },
  { cols: 'col-span-6 md:col-span-4',  rows: 'row-span-1' },
  { cols: 'col-span-6 md:col-span-4',  rows: 'row-span-1' },
  { cols: 'col-span-12 md:col-span-6', rows: 'row-span-1' },
  { cols: 'col-span-12 md:col-span-6', rows: 'row-span-1' },
]

interface Props {
  images: MediaType[]
}

function stripTrailingCounter(text: string): string {
  return text.replace(/\s+\d+$/, '')
}

export function GalleryGrid({ images }: Props) {
  const [query, setQuery]       = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const seen = new Set<string>()
    for (const img of images) {
      for (const tag of img.tags ?? []) {
        // Skip the 'gallery' tag — it's the collection filter, not meaningful to users
        if (tag !== 'gallery') seen.add(tag)
      }
    }
    return [...seen].sort()
  }, [images])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return images.filter((img) => {
      const matchesTag = activeTag ? (img.tags ?? []).includes(activeTag) : true
      const matchesQuery = q
        ? (img.alt ?? '').toLowerCase().includes(q) ||
          (img.caption ?? '').toLowerCase().includes(q) ||
          (img.tags ?? []).some((t) => t.toLowerCase().includes(q))
        : true
      return matchesTag && matchesQuery
    })
  }, [images, query, activeTag])

  const isFiltered = query.trim() !== '' || activeTag !== null

  function clearAll() {
    setQuery('')
    setActiveTag(null)
  }

  return (
    <>
      {/* ── Archive header + live count ──────────────────────────── */}
      <div className="py-10 px-6 md:px-10 border-b border-piano-linen">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-6">
          <p className="font-display text-xs tracking-[0.45em] uppercase text-piano-gold">
            Visual Archive
          </p>
          <p className="font-display text-xs tracking-[0.35em] uppercase text-piano-stone transition-all duration-300">
            {isFiltered ? (
              <>
                {filtered.length}&nbsp;of&nbsp;{images.length}&nbsp;
                {images.length === 1 ? 'Image' : 'Images'}
              </>
            ) : (
              <>
                {images.length}&nbsp;{images.length === 1 ? 'Image' : 'Images'}
              </>
            )}
          </p>
        </div>
      </div>

      {/* ── Search + tag filter bar ──────────────────────────────── */}
      <div className="px-6 md:px-10 pt-10 pb-9 border-b border-piano-linen">
        <div className="max-w-[1400px] mx-auto space-y-7">

          {/* Search input — underline only, no box */}
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, caption or tag…"
              className={cn(
                'w-full bg-transparent border-b pb-4 pt-1 pr-10',
                'font-cormorant text-piano-black text-2xl placeholder:text-piano-stone/40',
                'focus:outline-none transition-colors duration-300',
                query ? 'border-piano-gold' : 'border-piano-linen focus:border-piano-gold',
              )}
            />

            {/* Search icon — fades out when typing */}
            <div
              className={cn(
                'absolute right-1 top-2 pointer-events-none transition-opacity duration-200 text-piano-stone/40',
                query && 'opacity-0',
              )}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
              </svg>
            </div>

            {/* Clear query × */}
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-0 top-1 font-display text-xl text-piano-stone/40 hover:text-piano-gold transition-colors duration-150 leading-none"
              >
                ×
              </button>
            )}
          </div>

          {/* Tag chips + clear-all */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2.5">
              {allTags.map((tag) => {
                const isActive = activeTag === tag
                return (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(isActive ? null : tag)}
                    className={cn(
                      'font-display text-[11px] tracking-[0.35em] uppercase px-4 py-2.5 border',
                      'transition-all duration-200',
                      isActive
                        ? 'bg-piano-gold border-piano-gold text-piano-black'
                        : 'bg-transparent border-piano-linen text-piano-stone hover:border-piano-gold/60 hover:text-piano-gold',
                    )}
                  >
                    {tag}
                  </button>
                )
              })}

              {/* Clear all — appears only when something is active */}
              {isFiltered && (
                <button
                  onClick={clearAll}
                  className={cn(
                    'font-display text-[11px] tracking-[0.35em] uppercase px-4 py-2.5 border',
                    'border-piano-stone/25 text-piano-stone/50',
                    'hover:border-piano-stone/60 hover:text-piano-stone transition-all duration-200',
                  )}
                >
                  Clear&nbsp;all
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Bento grid ────────────────────────────────────────────── */}
      <section className="py-3 px-3 md:px-4">
        <div className="max-w-[1400px] mx-auto">

          {filtered.length === 0 ? (
            /* No results */
            <div className="flex flex-col items-center justify-center py-48 gap-5">
              <div className="h-px w-20 bg-piano-linen" />
              <p className="font-cormorant text-piano-stone text-2xl font-light italic">
                No images match your search.
              </p>
              <button
                onClick={clearAll}
                className="font-display text-[9px] tracking-[0.45em] uppercase text-piano-gold/60 hover:text-piano-gold transition-colors duration-200 mt-1"
              >
                Clear filters
              </button>
              <div className="h-px w-20 bg-piano-linen" />
            </div>
          ) : (
            <div className="grid grid-cols-12 auto-rows-[220px] md:auto-rows-[300px] gap-2 md:gap-2.5 grid-flow-dense">
              {filtered.map((image, index) => {
                const bento = BENTO[index % BENTO.length]
                const label = String(index + 1).padStart(2, '0')
                // Tags visible in the hover overlay — skip 'gallery' since it's internal
                const displayTags = (image.tags ?? []).filter((t) => t !== 'gallery')

                return (
                  <div
                    key={image.id}
                    className={cn(
                      bento.cols,
                      bento.rows,
                      'group relative overflow-hidden bg-piano-charcoal',
                    )}
                  >
                    {/* Image — scales on hover */}
                    <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05]">
                      <Media
                        resource={image}
                        fill
                        className="absolute inset-0"
                        imgClassName="object-cover"
                        priority={index < 3}
                      />
                    </div>

                    {/* Permanent vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-piano-black/30 via-transparent to-transparent pointer-events-none" />

                    {/* Caption + tag overlay — slides up on hover */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-10 bg-gradient-to-t from-piano-black/92 via-piano-black/60 to-transparent pt-16 pb-5 px-5">
                      {(image.caption || image.alt) && (
                        <p
                          className="font-cormorant font-light text-piano-cream leading-snug"
                          style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)' }}
                        >
                          {stripTrailingCounter(image.caption ?? image.alt ?? '')}
                        </p>
                      )}
                      {displayTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2.5">
                          {displayTags.map((tag) => (
                            <span
                              key={tag}
                              className="font-display text-[8px] tracking-[0.35em] uppercase text-piano-gold/65"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Gold accent line — sweeps in on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-piano-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-75 z-20 pointer-events-none" />

                    {/* Index number */}
                    <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pointer-events-none">
                      <span className="font-display text-[9px] tracking-[0.35em] text-piano-gold">
                        {label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
