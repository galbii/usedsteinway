'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { SearchIcon, X as CloseIcon } from 'lucide-react'

import type { Media as MediaType, Piano, Post, Search } from '@/payload-types'
import { Media } from '@/components/Media'
import { useDebounce } from '@/hooks/useDebounce'
import { cn } from '@/utilities/ui'
import { getSearchResultHref } from '@/lib/search/urls'

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

function isMediaObject(val: unknown): val is MediaType {
  return typeof val === 'object' && val !== null && 'url' in (val as object)
}

// Pull the first uploaded thumbnail from the source doc using the same convention
// the admin UI documents on the Pianos collection: "First image is used as the
// listing thumbnail." Posts use a single heroImage field.
function extractThumbnail(doc: Piano | Post): MediaType | null {
  if ('images' in doc) {
    const first = doc.images?.[0]?.image
    return isMediaObject(first) ? first : null
  }
  if ('heroImage' in doc) {
    return isMediaObject(doc.heroImage) ? doc.heroImage : null
  }
  return null
}

type SourceDoc = Piano | Post

async function fetchSourceDocs(
  collection: 'pianos' | 'posts',
  ids: string[],
  signal: AbortSignal,
): Promise<SourceDoc[]> {
  if (ids.length === 0) return []
  // `where[id][in]=<csv>` is the canonical batched lookup; depth=1 populates
  // `images[].image` / `heroImage` to full Media objects so <Media> can render them.
  const params = new URLSearchParams({
    depth: '1',
    limit: String(ids.length),
    'where[id][in]': ids.join(','),
  })
  const res = await fetch(`/api/${collection}?${params.toString()}`, { signal })
  if (!res.ok) return []
  const data: { docs?: SourceDoc[] } = await res.json()
  return data.docs ?? []
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ open, onClose }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Search[]>([])
  const [thumbnails, setThumbnails] = useState<Map<string, MediaType>>(new Map())
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedQuery = useDebounce(query, 200)

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  useEffect(() => {
    if (open) return
    setQuery('')
    setResults([])
    setThumbnails(new Map())
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    const trimmed = debouncedQuery.trim()
    if (!trimmed) {
      setResults([])
      setThumbnails(new Map())
      setLoading(false)
      return
    }

    const controller = new AbortController()
    setLoading(true)

    const run = async () => {
      try {
        const searchParams = new URLSearchParams({
          depth: '0',
          limit: '8',
          'where[title][like]': trimmed,
        })
        const searchRes = await fetch(`/api/search?${searchParams.toString()}`, {
          signal: controller.signal,
        })
        if (!searchRes.ok) throw new Error(`Search failed: ${searchRes.status}`)
        const searchData: { docs?: Search[] } = await searchRes.json()
        const hits = searchData.docs ?? []
        setResults(hits)

        // Group IDs by source collection so we can batch one fetch per collection.
        const pianoIds: string[] = []
        const postIds: string[] = []
        for (const hit of hits) {
          const id = typeof hit.doc.value === 'string' ? hit.doc.value : hit.doc.value?.id
          if (!id) continue
          if (hit.doc.relationTo === 'pianos') pianoIds.push(id)
          else if (hit.doc.relationTo === 'posts') postIds.push(id)
        }

        const [pianos, posts] = await Promise.all([
          fetchSourceDocs('pianos', pianoIds, controller.signal),
          fetchSourceDocs('posts', postIds, controller.signal),
        ])

        const nextThumbnails = new Map<string, MediaType>()
        for (const doc of [...pianos, ...posts]) {
          const thumb = extractThumbnail(doc)
          if (thumb) nextThumbnails.set(String(doc.id), thumb)
        }
        setThumbnails(nextThumbnails)
      } catch (err) {
        if ((err as { name?: string }).name !== 'AbortError') {
          setResults([])
          setThumbnails(new Map())
        }
      } finally {
        setLoading(false)
      }
    }

    run()
    return () => controller.abort()
  }, [debouncedQuery])

  return (
    <div
      className={cn(
        'fixed inset-0 z-[60] transition-opacity duration-200',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      )}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(4, 2, 1, 0.78)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      />

      <div
        className={cn(
          'relative mx-auto mt-24 max-w-2xl px-4',
          'transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          open ? 'translate-y-0' : '-translate-y-4',
        )}
      >
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{
            backgroundColor: 'hsl(350, 56%, 15%)',
            border: '1px solid rgba(200, 160, 75, 0.18)',
            boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.7)',
          }}
        >
          <SearchIcon className="w-4 h-4 shrink-0 text-piano-cream/40" aria-hidden />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pianos, posts…"
            className={cn(
              'flex-1 bg-transparent border-0 outline-hidden',
              'font-display text-[15px] tracking-wide',
              'text-piano-cream placeholder:text-piano-cream/30',
            )}
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={onClose}
            className="text-piano-cream/30 hover:text-piano-cream/70 transition-colors duration-150 p-1 -mr-1"
            aria-label="Close search"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        {(debouncedQuery.trim() || loading) && (
          <div
            className="mt-2 max-h-[60vh] overflow-y-auto"
            style={{
              backgroundColor: 'hsl(350, 56%, 15%)',
              border: '1px solid rgba(200, 160, 75, 0.12)',
              boxShadow: '0 20px 60px -20px rgba(0, 0, 0, 0.6)',
            }}
          >
            {loading && results.length === 0 ? (
              <div className="px-5 py-6 text-[12px] tracking-[0.18em] uppercase text-piano-cream/40 font-display">
                Searching…
              </div>
            ) : results.length === 0 ? (
              <div className="px-5 py-6 text-[12px] tracking-[0.18em] uppercase text-piano-cream/40 font-display">
                No results
              </div>
            ) : (
              <ul className="divide-y" style={{ borderColor: 'rgba(200, 160, 75, 0.06)' }}>
                {results.map((result) => {
                  const href = getSearchResultHref(result)
                  const title = result.meta?.title || result.title || 'Untitled'
                  const description = result.meta?.description
                  const sourceId =
                    typeof result.doc.value === 'string' ? result.doc.value : result.doc.value?.id
                  const thumb = sourceId ? thumbnails.get(sourceId) : undefined
                  return (
                    <li key={result.id} style={{ borderColor: 'rgba(200, 160, 75, 0.06)' }}>
                      <Link
                        href={href}
                        onClick={onClose}
                        className="flex items-center gap-4 px-5 py-4 hover:bg-piano-cream/[0.03] transition-colors duration-150 group"
                      >
                        {thumb ? (
                          <div className="relative w-12 h-12 shrink-0 overflow-hidden bg-piano-cream/5">
                            <Media resource={thumb} fill imgClassName="object-cover" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 shrink-0 bg-piano-cream/5" aria-hidden />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-display text-[13px] text-piano-cream/90 group-hover:text-piano-cream truncate">
                            {title}
                          </div>
                          {description && (
                            <div className="text-[11px] text-piano-cream/40 mt-0.5 truncate">
                              {description}
                            </div>
                          )}
                        </div>
                        <span className="font-display text-[9px] tracking-[0.22em] uppercase text-piano-cream/30">
                          {result.doc.relationTo}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between px-1">
          <span className="font-display text-[10px] tracking-[0.22em] uppercase text-piano-cream/30">
            Press <kbd className="px-1.5 py-0.5 border border-piano-cream/15 text-piano-cream/50">esc</kbd> to close
          </span>
          <span className="font-display text-[10px] tracking-[0.22em] uppercase text-piano-cream/30">
            <kbd className="px-1.5 py-0.5 border border-piano-cream/15 text-piano-cream/50">l</kbd> to open
          </span>
        </div>
      </div>
    </div>
  )
}
