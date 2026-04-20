'use client'

import { useEffect, useState, useCallback } from 'react'
import type { Piano, Brand, Media } from '@/payload-types'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const COLORS = {
  black: 'hsl(25, 6%, 9%)',
  charcoal: 'hsl(25, 5%, 14%)',
  charcoalHover: 'hsl(25, 5%, 18%)',
  gold: 'hsl(40, 72%, 52%)',
  goldBorder: 'rgba(184, 134, 57, 0.18)',
  goldFaint: 'rgba(184, 134, 57, 0.07)',
  goldMuted: 'rgba(184, 134, 57, 0.45)',
  cream: 'hsl(36, 18%, 97%)',
  silver: 'hsl(25, 4%, 58%)',
  available: 'hsl(142, 50%, 45%)',
  availableFaint: 'rgba(46, 160, 67, 0.12)',
  sold: 'hsl(25, 4%, 45%)',
}

const STYLES = `
  @keyframes usw-pm-shimmer {
    0% { opacity: 0.4 }
    50% { opacity: 0.7 }
    100% { opacity: 0.4 }
  }
  .usw-pm-skeleton {
    animation: usw-pm-shimmer 1.5s ease-in-out infinite;
  }
  .usw-pm-close-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: hsl(25, 4%, 58%);
    font-size: 22px;
    line-height: 1;
    padding: 4px 8px;
    border-radius: 3px;
    transition: color 0.15s, background 0.15s;
    font-family: inherit;
  }
  .usw-pm-close-btn:hover {
    color: hsl(36, 18%, 97%);
    background: rgba(255,255,255,0.07);
  }
  .usw-pm-filter-btn {
    background: none;
    border: 1px solid transparent;
    border-radius: 3px;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    letter-spacing: 0.07em;
    padding: 6px 14px;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .usw-pm-filter-btn:hover {
    background: rgba(184, 134, 57, 0.1);
  }
  .usw-pm-sort-select {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 3px;
    color: hsl(25, 4%, 58%);
    font-size: 12px;
    padding: 5px 10px;
    outline: none;
    cursor: pointer;
    font-family: inherit;
    transition: border-color 0.15s;
  }
  .usw-pm-sort-select:focus {
    border-color: rgba(184, 134, 57, 0.45);
  }
  .usw-pm-search {
    flex: 1;
    max-width: 200px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 3px;
    color: hsl(36, 18%, 97%);
    font-family: inherit;
    font-size: 13px;
    letter-spacing: 0.04em;
    outline: none;
    padding: 5px 12px;
    transition: border-color 0.15s;
    min-width: 0;
  }
  .usw-pm-search::placeholder {
    color: hsl(25, 4%, 40%);
  }
  .usw-pm-search:focus {
    border-color: rgba(184, 134, 57, 0.45);
  }
  .usw-pm-list {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(184, 134, 57, 0.25) transparent;
  }
  .usw-pm-list::-webkit-scrollbar {
    width: 6px;
  }
  .usw-pm-list::-webkit-scrollbar-track {
    background: transparent;
  }
  .usw-pm-list::-webkit-scrollbar-thumb {
    background: rgba(184, 134, 57, 0.25);
    border-radius: 3px;
  }
  .usw-pm-card {
    background: hsl(25, 5%, 14%);
    padding: 22px 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    transition: background 0.15s;
  }
  .usw-pm-card:hover {
    background: hsl(25, 5%, 17%);
  }
  .usw-pm-star-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    padding: 4px;
    line-height: 1;
    transition: color 0.15s;
    font-family: inherit;
  }
  .usw-pm-avail-btn {
    border-radius: 3px;
    padding: 4px 10px;
    font-size: 12px;
    letter-spacing: 0.08em;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
    border-style: solid;
    border-width: 1px;
  }
  .usw-pm-edit-link {
    color: hsl(25, 4%, 58%);
    font-family: inherit;
    font-size: 12px;
    letter-spacing: 0.1em;
    text-decoration: none;
    transition: color 0.15s;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    text-align: left;
  }
  .usw-pm-edit-link:hover {
    color: hsl(40, 72%, 52%);
  }
  .usw-pm-add-btn {
    background: rgba(184, 134, 57, 0.12);
    border: 1px solid rgba(184, 134, 57, 0.4);
    border-radius: 3px;
    color: hsl(40, 72%, 52%);
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    letter-spacing: 0.1em;
    padding: 10px 22px;
    transition: background 0.15s, border-color 0.15s;
    text-decoration: none;
    display: inline-block;
  }
  .usw-pm-add-btn:hover {
    background: rgba(184, 134, 57, 0.22);
    border-color: rgba(184, 134, 57, 0.65);
  }
`

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isBrandObject(b: Piano['brand']): b is Brand {
  return typeof b === 'object' && b !== null
}

function getFirstImageUrl(piano: Piano): string | null {
  const first = piano.images?.[0]?.image
  if (!first || typeof first === 'string') return null
  return (first as Media).url ?? null
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type FilterType = 'all' | 'available' | 'sold'
type SortType = 'newest' | 'price-asc' | 'price-desc' | 'title'

interface PianoManagerModalProps {
  open: boolean
  onClose: () => void
}

// ---------------------------------------------------------------------------
// Skeleton Card
// ---------------------------------------------------------------------------

function SkeletonCard() {
  const block = (w: string, h: string, mb = '0px') => (
    <div
      className="usw-pm-skeleton"
      style={{
        width: w,
        height: h,
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '3px',
        marginBottom: mb,
      }}
    />
  )

  return (
    <div className="usw-pm-card">
      {/* top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {block('56px', '20px')}
        {block('20px', '20px')}
      </div>
      {/* title */}
      {block('80%', '22px')}
      {/* meta */}
      {block('55%', '16px')}
      {/* bottom row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {block('72px', '24px')}
        {block('64px', '26px')}
      </div>
      {/* edit row */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '10px',
          marginTop: '4px',
        }}
      >
        {block('80px', '14px')}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Condition badge
// ---------------------------------------------------------------------------

function ConditionBadge({ condition }: { condition: string | null | undefined }) {
  if (!condition) return null

  const isNew = condition === 'new'
  const style: React.CSSProperties = isNew
    ? {
        color: COLORS.gold,
        background: COLORS.goldFaint,
        border: `1px solid ${COLORS.goldBorder}`,
      }
    : {
        color: COLORS.silver,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
      }

  return (
    <span
      style={{
        ...style,
        padding: '2px 8px',
        borderRadius: '10px',
        fontSize: '11px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontFamily: 'inherit',
        lineHeight: '1.6',
        display: 'inline-block',
      }}
    >
      {condition}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PianoManagerModal({ open, onClose }: PianoManagerModalProps) {
  const [pianos, setPianos] = useState<Piano[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<FilterType>('all')
  const [sortBy, setSortBy] = useState<SortType>('newest')
  const [search, setSearch] = useState('')

  // Inject styles once
  useEffect(() => {
    if (!document.getElementById('usw-pm-styles')) {
      const el = document.createElement('style')
      el.id = 'usw-pm-styles'
      el.textContent = STYLES
      document.head.appendChild(el)
    }
  }, [])

  // Fetch pianos when modal opens
  useEffect(() => {
    if (!open) return
    setLoading(true)
    fetch('/api/pianos?limit=100&depth=1&sort=-createdAt')
      .then((res) => res.json())
      .then((data) => {
        setPianos(Array.isArray(data?.docs) ? data.docs : [])
      })
      .catch(() => {
        setPianos([])
      })
      .finally(() => setLoading(false))
  }, [open])

  // ESC to close
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Optimistic availability toggle
  const toggleAvailable = useCallback(async (piano: Piano) => {
    const newValue = !piano.isAvailable
    setPianos((prev) =>
      prev.map((p) => (p.id === piano.id ? { ...p, isAvailable: newValue } : p)),
    )
    try {
      await fetch(`/api/pianos/${piano.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAvailable: newValue }),
      })
    } catch {
      setPianos((prev) =>
        prev.map((p) => (p.id === piano.id ? { ...p, isAvailable: piano.isAvailable } : p)),
      )
    }
  }, [])

  // Optimistic featured toggle
  const toggleFeatured = useCallback(async (piano: Piano) => {
    const newValue = !piano.isFeatured
    setPianos((prev) =>
      prev.map((p) => (p.id === piano.id ? { ...p, isFeatured: newValue } : p)),
    )
    try {
      await fetch(`/api/pianos/${piano.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: newValue }),
      })
    } catch {
      setPianos((prev) =>
        prev.map((p) => (p.id === piano.id ? { ...p, isFeatured: piano.isFeatured } : p)),
      )
    }
  }, [])

  if (!open) return null

  // Filtering
  const filtered = pianos.filter((p) => {
    if (filter === 'available' && !p.isAvailable) return false
    if (filter === 'sold' && p.isAvailable) return false
    if (search.trim()) {
      return p.title.toLowerCase().includes(search.trim().toLowerCase())
    }
    return true
  })

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return (a.price ?? 0) - (b.price ?? 0)
    if (sortBy === 'price-desc') return (b.price ?? 0) - (a.price ?? 0)
    if (sortBy === 'title') return a.title.localeCompare(b.title)
    // 'newest' — data comes sorted from API
    return 0
  })

  const availableCount = pianos.filter((p) => p.isAvailable).length

  const filterBtnStyle = (f: FilterType): React.CSSProperties => ({
    color: filter === f ? COLORS.gold : COLORS.silver,
    borderColor: filter === f ? COLORS.goldMuted : 'transparent',
    background: filter === f ? COLORS.goldFaint : 'none',
  })

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(9, 8, 7, 0.82)',
        }}
      />

      {/* Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10000,
          width: 'min(900px, 96vw)',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          background: COLORS.charcoal,
          border: `1px solid ${COLORS.goldBorder}`,
          borderRadius: '4px',
        }}
      >
        {/* Header */}
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '28px 32px 20px',
            borderBottom: `1px solid rgba(184, 134, 57, 0.1)`,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'inherit',
                fontSize: '17px',
                fontWeight: 600,
                color: COLORS.cream,
                margin: '0 0 4px',
                letterSpacing: '0.01em',
              }}
            >
              Piano Manager
            </h2>
            <p
              style={{
                fontFamily: 'inherit',
                fontSize: '13px',
                color: COLORS.silver,
                margin: 0,
                letterSpacing: '0.04em',
              }}
            >
              Manage listings
            </p>
          </div>
          <button type="button" className="usw-pm-close-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {/* Toolbar */}
        <div
          style={{
            flexShrink: 0,
            padding: '14px 32px',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            borderBottom: `1px solid rgba(255,255,255,0.06)`,
          }}
        >
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
            {(['all', 'available', 'sold'] as FilterType[]).map((f) => (
              <button
                key={f}
                type="button"
                className="usw-pm-filter-btn"
                style={filterBtnStyle(f)}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort select */}
          <select
            className="usw-pm-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="title">Title A–Z</option>
          </select>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Search */}
          <input
            className="usw-pm-search"
            type="text"
            placeholder="Search pianos…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Scrollable list */}
        <div className="usw-pm-list">
          {loading ? (
            /* Skeleton grid */
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridAutoRows: '1fr',
                gap: '1px',
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              {[0, 1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : sorted.length === 0 ? (
            <div
              style={{
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: COLORS.silver,
                fontSize: '15px',
                fontStyle: 'italic',
              }}
            >
              No pianos match your filter.
            </div>
          ) : (
            /* Card grid */
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridAutoRows: '1fr',
                gap: '1px',
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              {sorted.map((piano) => {
                const brandName = isBrandObject(piano.brand) ? (piano.brand.name ?? null) : null
                const meta = [
                  brandName,
                  piano.year ? String(piano.year) : null,
                  piano.finish ?? null,
                ]
                  .filter(Boolean)
                  .join(' · ')

                return (
                  <div key={piano.id} className="usw-pm-card">
                    {/* First image — only rendered when present, bleeds to card edges */}
                    {getFirstImageUrl(piano) && (
                      <div
                        style={{
                          height: '130px',
                          marginTop: '-22px',
                          marginLeft: '-24px',
                          marginRight: '-24px',
                          marginBottom: '8px',
                          overflow: 'hidden',
                          borderBottom: '1px solid rgba(255,255,255,0.06)',
                          flexShrink: 0,
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={getFirstImageUrl(piano)!}
                          alt={piano.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                    )}

                    {/* Top row: condition badge + featured star */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <ConditionBadge condition={piano.condition} />
                      <button
                        type="button"
                        className="usw-pm-star-btn"
                        title={piano.isFeatured ? 'Remove from featured' : 'Mark as featured'}
                        onClick={() => toggleFeatured(piano)}
                        style={{ color: piano.isFeatured ? COLORS.gold : COLORS.silver }}
                      >
                        {piano.isFeatured ? '★' : '☆'}
                      </button>
                    </div>

                    {/* Title */}
                    <div
                      style={{
                        fontFamily: 'inherit',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: COLORS.cream,
                        lineHeight: 1.35,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {piano.title}
                    </div>

                    {/* Meta line */}
                    {meta && (
                      <div
                        style={{
                          fontFamily: 'inherit',
                          fontSize: '13px',
                          color: COLORS.silver,
                          letterSpacing: '0.04em',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {meta}
                      </div>
                    )}

                    {/* Bottom row: price + availability toggle */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 'auto',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'inherit',
                          fontSize: '15px',
                          fontWeight: 600,
                          color: COLORS.gold,
                          letterSpacing: '0.01em',
                        }}
                      >
                        {formatPrice(piano.price)}
                      </div>

                      <button
                        type="button"
                        className="usw-pm-avail-btn"
                        title={piano.isAvailable ? 'Mark as Sold' : 'Mark as Available'}
                        onClick={() => toggleAvailable(piano)}
                        style={
                          piano.isAvailable
                            ? {
                                color: COLORS.available,
                                background: 'rgba(46,160,67,0.1)',
                                borderColor: 'rgba(46,160,67,0.25)',
                              }
                            : {
                                color: COLORS.silver,
                                background: 'rgba(255,255,255,0.05)',
                                borderColor: 'rgba(255,255,255,0.1)',
                              }
                        }
                      >
                        {piano.isAvailable ? 'Available' : 'Sold'}
                      </button>
                    </div>

                    {/* Edit link row */}
                    <div
                      style={{
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        paddingTop: '10px',
                        marginTop: '4px',
                      }}
                    >
                      <a
                        className="usw-pm-edit-link"
                        href={`/admin/collections/pianos/${piano.id}`}
                        onClick={onClose}
                      >
                        Edit listing →
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 32px',
            borderTop: `1px solid rgba(184, 134, 57, 0.1)`,
          }}
        >
          <span
            style={{
              fontFamily: 'inherit',
              fontSize: '13px',
              color: COLORS.silver,
              letterSpacing: '0.04em',
            }}
          >
            {pianos.length} {pianos.length === 1 ? 'piano' : 'pianos'} · {availableCount} available
          </span>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a className="usw-pm-add-btn" href="/admin/collections/pianos/create">
            + Add Piano
          </a>
        </div>
      </div>
    </>
  )
}
