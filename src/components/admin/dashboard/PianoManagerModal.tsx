'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import type { Piano, Brand, Media } from '@/payload-types'
import { useMediaManager } from '@/components/admin/media-manager/MediaManagerProvider'
import type { MediaItem } from '@/components/admin/media-manager/types'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const COLORS = {
  panel: 'hsl(0, 0%, 100%)',
  surface: 'hsl(36, 12%, 96%)',
  gold: 'hsl(40, 72%, 34%)',
  goldBorder: 'rgba(184, 134, 57, 0.45)',
  goldFaint: 'rgba(184, 134, 57, 0.07)',
  goldMuted: 'rgba(184, 134, 57, 0.55)',
  border: 'rgba(0, 0, 0, 0.12)',
  divider: 'rgba(0, 0, 0, 0.08)',
  text: 'hsl(25, 6%, 9%)',
  body: 'hsl(25, 5%, 18%)',
  muted: 'hsl(25, 4%, 40%)',
  available: 'hsl(142, 55%, 26%)',
  availableFaint: 'rgba(46, 160, 67, 0.09)',
  sold: 'hsl(25, 4%, 38%)',
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
    color: hsl(25, 4%, 40%);
    font-size: 22px;
    line-height: 1;
    padding: 4px 8px;
    border-radius: 3px;
    transition: color 0.15s, background 0.15s;
    font-family: inherit;
  }
  .usw-pm-close-btn:hover {
    color: hsl(25, 6%, 9%);
    background: rgba(0,0,0,0.06);
  }
  .usw-pm-filter-btn {
    background: none;
    border: 1px solid transparent;
    border-radius: 3px;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.07em;
    padding: 6px 14px;
    color: hsl(25, 4%, 38%);
    transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .usw-pm-filter-btn:hover {
    background: rgba(184, 134, 57, 0.08);
    color: hsl(25, 6%, 9%);
  }
  .usw-pm-sort-select {
    background: hsl(36, 12%, 96%);
    border: 1px solid rgba(0,0,0,0.13);
    border-radius: 3px;
    color: hsl(25, 5%, 20%);
    font-size: 13px;
    padding: 5px 10px;
    outline: none;
    cursor: pointer;
    font-family: inherit;
    transition: border-color 0.15s;
  }
  .usw-pm-sort-select:focus {
    border-color: rgba(184, 134, 57, 0.5);
  }
  .usw-pm-search {
    flex: 1;
    max-width: 320px;
    background: hsl(36, 12%, 96%);
    border: 1px solid rgba(0,0,0,0.13);
    border-radius: 3px;
    color: hsl(25, 6%, 9%);
    font-family: inherit;
    font-size: 13px;
    letter-spacing: 0.04em;
    outline: none;
    padding: 7px 14px;
    transition: border-color 0.15s;
    min-width: 0;
    height: 36px;
  }
  .usw-pm-search::placeholder {
    color: hsl(25, 4%, 52%);
  }
  .usw-pm-search:focus {
    border-color: rgba(184, 134, 57, 0.5);
    background: hsl(0, 0%, 100%);
  }
  .usw-pm-list {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(0,0,0,0.15) transparent;
  }
  .usw-pm-list::-webkit-scrollbar {
    width: 6px;
  }
  .usw-pm-list::-webkit-scrollbar-track {
    background: transparent;
  }
  .usw-pm-list::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.15);
    border-radius: 3px;
  }
  .usw-pm-card {
    background: hsl(0, 0%, 100%);
    padding: 22px 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    transition: background 0.15s;
  }
  .usw-pm-card:hover {
    background: hsl(36, 12%, 97%);
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
    padding: 5px 11px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
    border-style: solid;
    border-width: 1px;
  }
  .usw-pm-edit-link {
    color: hsl(25, 4%, 38%);
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-decoration: none;
    transition: color 0.15s;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    text-align: left;
  }
  .usw-pm-edit-link:hover {
    color: hsl(40, 72%, 34%);
  }
  .usw-pm-add-btn {
    background: hsl(40, 72%, 34%);
    border: none;
    border-radius: 3px;
    color: hsl(36, 18%, 97%);
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.1em;
    padding: 11px 24px;
    transition: background 0.15s;
    text-decoration: none;
    display: inline-block;
  }
  .usw-pm-add-btn:hover {
    background: hsl(40, 72%, 40%);
  }
  .usw-pm-media-btn {
    background: none;
    border: 1px solid rgba(184, 134, 57, 0.35);
    border-radius: 3px;
    cursor: pointer;
    font-family: inherit;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    padding: 4px 10px;
    color: hsl(40, 72%, 34%);
    transition: background 0.15s, border-color 0.15s, transform 0.1s ease;
  }
  .usw-pm-media-btn:hover {
    background: rgba(184, 134, 57, 0.08);
    border-color: rgba(184, 134, 57, 0.7);
  }
  .usw-pm-media-btn:active {
    transform: scale(0.92);
  }
  .usw-pm-media-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* ── Entrance animations ─────────────────────────────────── */
  @keyframes usw-pm-backdrop-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes usw-pm-panel-in {
    from { opacity: 0; transform: scale(0.96) translateY(18px); }
    to   { opacity: 1; transform: scale(1)    translateY(0); }
  }
  @keyframes usw-pm-card-in {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .usw-pm-backdrop {
    animation: usw-pm-backdrop-in 0.22s ease both;
  }
  .usw-pm-panel {
    animation: usw-pm-panel-in 0.32s cubic-bezier(0.16, 1, 0.3, 1) both;
    transform-origin: center center;
  }

  /* ── Button micro-interactions ───────────────────────────── */
  .usw-pm-close-btn {
    transition: color 0.15s, background 0.15s, transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .usw-pm-close-btn:hover {
    transform: rotate(90deg);
  }
  .usw-pm-close-btn:active {
    transform: rotate(90deg) scale(0.85);
  }
  .usw-pm-filter-btn {
    transition: background 0.15s, border-color 0.15s, color 0.15s, transform 0.1s ease;
  }
  .usw-pm-filter-btn:active {
    transform: scale(0.92);
  }
  .usw-pm-star-btn {
    transition: color 0.18s, transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .usw-pm-star-btn:hover {
    transform: scale(1.28);
  }
  .usw-pm-star-btn:active {
    transform: scale(0.78);
  }
  .usw-pm-avail-btn {
    transition: background 0.15s, border-color 0.15s, color 0.15s, transform 0.1s ease;
  }
  .usw-pm-avail-btn:active {
    transform: scale(0.94);
  }
  .usw-pm-add-btn {
    transition: background 0.15s, border-color 0.15s, transform 0.12s ease;
  }
  .usw-pm-add-btn:active {
    transform: scale(0.96);
  }
  .usw-pm-edit-link {
    transition: color 0.15s, transform 0.18s ease;
    display: inline-block;
  }
  .usw-pm-edit-link:hover {
    transform: translateX(3px);
  }
  .usw-pm-card {
    transition: background 0.18s, box-shadow 0.22s ease;
  }
  .usw-pm-card:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08) inset;
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

function formatPrice(price: number | null | undefined): string {
  if (!price) return 'Call'
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
type ActiveTab = 'manage' | 'sort-order'
type SaveState = 'idle' | 'saving' | 'saved' | 'error'

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
        background: 'rgba(0,0,0,0.06)',
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
          borderTop: `1px solid ${COLORS.divider}`,
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
        border: `1px solid ${COLORS.border}`,
      }
    : {
        color: COLORS.muted,
        background: 'rgba(0,0,0,0.06)',
        border: `1px solid ${COLORS.border}`,
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
  const searchRef = useRef<HTMLInputElement>(null)
  const [addingMediaTo, setAddingMediaTo] = useState<string | null>(null)
  const { openModal } = useMediaManager()
  const [activeTab, setActiveTab] = useState<ActiveTab>('manage')
  const [sortItems, setSortItems] = useState<Piano[]>([])
  const [saveState, setSaveState] = useState<SaveState>('idle')

  // Inject styles once
  useEffect(() => {
    if (!document.getElementById('usw-pm-styles')) {
      const el = document.createElement('style')
      el.id = 'usw-pm-styles'
      el.textContent = STYLES
      document.head.appendChild(el)
    }
  }, [])

  // Auto-focus search when modal opens (delay lets panel animation settle)
  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => searchRef.current?.focus(), 280)
    return () => clearTimeout(timer)
  }, [open])

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

  // Open media manager in multi-select mode and append chosen images to the piano
  const handleAddMedia = useCallback(
    (piano: Piano) => {
      openModal({
        mode: 'select',
        allowMultiple: true,
        onSelectMultiple: (items: MediaItem[]) => {
          if (items.length === 0) return
          setAddingMediaTo(piano.id)

          // IDs of images already on this piano
          const existingIds = (piano.images ?? []).map((item) =>
            typeof item.image === 'string' ? item.image : (item.image as Media).id,
          )
          const newIds = items.map((m) => m.id)

          // Optimistic: append new image stubs (IDs only — thumbnail stays unchanged)
          setPianos((prev) =>
            prev.map((p) =>
              p.id !== piano.id
                ? p
                : {
                    ...p,
                    images: [
                      ...(p.images ?? []),
                      ...newIds.map((id) => ({ image: id as unknown as string | Media, id: null })),
                    ],
                  },
            ),
          )

          fetch(`/api/pianos/${piano.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              images: [...existingIds, ...newIds].map((id) => ({ image: id })),
            }),
          })
            .catch(() => {
              // Revert on failure
              setPianos((prev) => prev.map((p) => (p.id === piano.id ? piano : p)))
            })
            .finally(() => setAddingMediaTo(null))
        },
      })
    },
    [openModal],
  )

  // Sync sort list when tab opens or pianos refresh
  useEffect(() => {
    if (activeTab === 'sort-order') {
      setSortItems([...pianos].sort((a, b) => (a.priority ?? 20) - (b.priority ?? 20)))
      setSaveState('idle')
    }
  }, [activeTab, pianos])

  // Reset tab when modal closes
  useEffect(() => {
    if (!open) {
      setActiveTab('manage')
      setSaveState('idle')
    }
  }, [open])

  const handleSaveOrder = useCallback(async () => {
    setSaveState('saving')
    try {
      const updates = sortItems
        .map((piano, idx) => ({ piano, newPriority: idx + 1 }))
        .filter(({ piano, newPriority }) => piano.priority !== newPriority)

      await Promise.all(
        updates.map(({ piano, newPriority }) =>
          fetch(`/api/pianos/${piano.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ priority: newPriority }),
          }),
        ),
      )

      // Reflect new priority values in the main pianos list
      setPianos((prev) =>
        prev.map((p) => {
          const updated = updates.find((u) => u.piano.id === p.id)
          return updated ? { ...p, priority: updated.newPriority } : p
        }),
      )

      setSaveState('saved')
      setTimeout(() => setSaveState('idle'), 3000)
    } catch {
      setSaveState('error')
    }
  }, [sortItems])

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
    color: filter === f ? COLORS.gold : COLORS.muted,
    borderColor: filter === f ? COLORS.goldMuted : 'transparent',
    background: filter === f ? COLORS.goldFaint : 'none',
  })

  return (
    <>
      {/* Overlay */}
      <div
        className="usw-pm-backdrop"
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(9, 8, 7, 0.85)',
        }}
      />

      {/* Panel */}
      <div
        className="usw-pm-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          inset: '20px',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          background: COLORS.panel,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '6px',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '32px 40px 24px',
            borderBottom: `1px solid ${COLORS.divider}`,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'inherit',
                fontSize: '20px',
                fontWeight: 600,
                color: COLORS.text,
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
                color: COLORS.muted,
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

        {/* Tab strip */}
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            borderBottom: `1px solid ${COLORS.divider}`,
            padding: '0 40px',
          }}
        >
          {(['manage', 'sort-order'] as ActiveTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom:
                  activeTab === tab
                    ? `2px solid ${COLORS.gold}`
                    : '2px solid transparent',
                padding: '12px 20px 11px',
                fontSize: '13px',
                fontWeight: 500,
                color: activeTab === tab ? COLORS.gold : COLORS.muted,
                cursor: 'pointer',
                marginBottom: '-1px',
                transition: 'color 0.15s, border-color 0.15s',
                fontFamily: 'inherit',
                letterSpacing: '0.04em',
              }}
            >
              {tab === 'manage' ? 'Manage' : 'Sort Order'}
            </button>
          ))}
        </div>

        {/* Toolbar — only on Manage tab */}
        {activeTab === 'manage' && (
          <div
            style={{
              flexShrink: 0,
              padding: '16px 40px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              borderBottom: `1px solid ${COLORS.divider}`,
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
              ref={searchRef}
              className="usw-pm-search"
              type="text"
              placeholder="Search pianos…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        {/* Sort Order tab panel */}
        {activeTab === 'sort-order' && (
          <SortOrderPanel
            items={sortItems}
            onReorder={setSortItems}
            saveState={saveState}
            onSave={handleSaveOrder}
          />
        )}

        {/* Scrollable list — Manage tab only */}
        {activeTab === 'manage' && (
        <div className="usw-pm-list">
          {loading ? (
            /* Skeleton grid */
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1px',
                background: 'rgba(0,0,0,0.06)',
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
                color: COLORS.muted,
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
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1px',
                background: 'rgba(0,0,0,0.06)',
              }}
            >
              {sorted.map((piano, pianoIdx) => {
                const brandName = isBrandObject(piano.brand) ? (piano.brand.name ?? null) : null
                const meta = [
                  brandName,
                  piano.year ? String(piano.year) : null,
                  piano.finish ?? null,
                ]
                  .filter(Boolean)
                  .join(' · ')

                return (
                  <div
                    key={piano.id}
                    className="usw-pm-card"
                    style={{ animation: `usw-pm-card-in 0.4s ${(0.06 + Math.min(pianoIdx, 7) * 0.05).toFixed(2)}s cubic-bezier(0.16, 1, 0.3, 1) both` }}
                  >
                    {/* First image — only rendered when present, bleeds to card edges */}
                    {getFirstImageUrl(piano) && (
                      <div
                        style={{
                          height: '170px',
                          marginTop: '-22px',
                          marginLeft: '-24px',
                          marginRight: '-24px',
                          marginBottom: '8px',
                          overflow: 'hidden',
                          borderBottom: `1px solid ${COLORS.divider}`,
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
                        style={{ color: piano.isFeatured ? COLORS.gold : COLORS.muted }}
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
                        color: COLORS.text,
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
                          color: COLORS.muted,
                          letterSpacing: '0.04em',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {meta}
                      </div>
                    )}

                    {/* Serial number */}
                    {piano.serialNumber && (
                      <div
                        style={{
                          fontFamily: 'inherit',
                          fontSize: '11px',
                          color: COLORS.muted,
                          letterSpacing: '0.08em',
                          opacity: 0.7,
                        }}
                      >
                        S/N #{piano.serialNumber}
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
                                color: COLORS.muted,
                                background: 'rgba(0,0,0,0.06)',
                                borderColor: 'rgba(0,0,0,0.13)',
                              }
                        }
                      >
                        {piano.isAvailable ? 'Available' : 'Sold'}
                      </button>
                    </div>

                    {/* Edit link row */}
                    <div
                      style={{
                        borderTop: `1px solid ${COLORS.divider}`,
                        paddingTop: '10px',
                        marginTop: '4px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <a
                        className="usw-pm-edit-link"
                        href={`/admin/collections/pianos/${piano.id}`}
                        onClick={onClose}
                      >
                        Edit listing →
                      </a>
                      <button
                        type="button"
                        className="usw-pm-media-btn"
                        title="Add photos from media library"
                        disabled={addingMediaTo === piano.id}
                        onClick={() => handleAddMedia(piano)}
                      >
                        {addingMediaTo === piano.id ? '…' : '+ Photos'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
        )}

        {/* Footer */}
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px 40px',
            borderTop: `1px solid rgba(184, 134, 57, 0.1)`,
          }}
        >
          <span
            style={{
              fontFamily: 'inherit',
              fontSize: '13px',
              color: COLORS.muted,
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

// ---------------------------------------------------------------------------
// Sort Order Panel
// ---------------------------------------------------------------------------

interface SortOrderPanelProps {
  items: Piano[]
  onReorder: (items: Piano[]) => void
  saveState: SaveState
  onSave: () => void
}

function SortOrderPanel({ items, onReorder, saveState, onSave }: SortOrderPanelProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIdx = items.findIndex((p) => p.id === active.id)
    const newIdx = items.findIndex((p) => p.id === over.id)
    onReorder(arrayMove(items, oldIdx, newIdx))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {/* Instruction */}
      <p
        style={{
          flexShrink: 0,
          padding: '16px 40px 8px',
          margin: 0,
          fontSize: '13px',
          color: COLORS.muted,
          letterSpacing: '0.04em',
          fontFamily: 'inherit',
        }}
      >
        Drag rows to set display order on the <strong style={{ color: COLORS.body, fontWeight: 600 }}>/pianos</strong> page. Click <em>Save Order</em> to apply.
      </p>

      {/* Scrollable drag list */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 40px 8px',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(0,0,0,0.15) transparent',
        }}
      >
        {items.length === 0 ? (
          <div
            style={{
              minHeight: '160px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: COLORS.muted,
              fontSize: '14px',
              fontStyle: 'italic',
              fontFamily: 'inherit',
            }}
          >
            No pianos found.
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((p) => p.id)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((piano, idx) => (
                <SortableRow key={piano.id} piano={piano} position={idx + 1} />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Save bar */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '16px 40px',
          borderTop: `1px solid ${COLORS.divider}`,
        }}
      >
        <button
          type="button"
          onClick={onSave}
          disabled={saveState === 'saving'}
          style={{
            background: saveState === 'saving' ? COLORS.goldMuted : COLORS.gold,
            border: 'none',
            borderRadius: '3px',
            color: 'hsl(36, 18%, 97%)',
            cursor: saveState === 'saving' ? 'default' : 'pointer',
            fontFamily: 'inherit',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            padding: '10px 22px',
            transition: 'background 0.15s',
          }}
        >
          {saveState === 'saving' ? 'Saving…' : 'Save Order'}
        </button>

        {saveState === 'saved' && (
          <span style={{ fontSize: '13px', color: COLORS.available, fontFamily: 'inherit' }}>
            ✓ Order saved
          </span>
        )}
        {saveState === 'error' && (
          <span style={{ fontSize: '13px', color: 'hsl(0, 70%, 45%)', fontFamily: 'inherit' }}>
            Save failed — try again
          </span>
        )}

        <span
          style={{
            marginLeft: 'auto',
            fontSize: '12px',
            color: COLORS.muted,
            fontFamily: 'inherit',
            letterSpacing: '0.04em',
          }}
        >
          {items.length} {items.length === 1 ? 'piano' : 'pianos'}
        </span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sortable Row
// ---------------------------------------------------------------------------

function SortableRow({ piano, position }: { piano: Piano; position: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: piano.id,
  })

  const brandName = isBrandObject(piano.brand) ? (piano.brand.name ?? '') : ''
  const thumb = getFirstImageUrl(piano)

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.45 : 1,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '9px 12px',
        marginBottom: '3px',
        background: isDragging ? COLORS.goldFaint : COLORS.surface,
        border: `1px solid ${isDragging ? COLORS.goldBorder : COLORS.divider}`,
        borderRadius: '4px',
        userSelect: 'none',
        boxShadow: isDragging ? '0 4px 16px rgba(0,0,0,0.12)' : 'none',
        zIndex: isDragging ? 1 : 'auto',
        position: 'relative',
      }}
      {...attributes}
    >
      {/* Drag handle */}
      <span
        {...listeners}
        style={{
          color: COLORS.muted,
          fontSize: '17px',
          lineHeight: 1,
          cursor: isDragging ? 'grabbing' : 'grab',
          flexShrink: 0,
          padding: '2px 4px',
        }}
        title="Drag to reorder"
      >
        ⠿
      </span>

      {/* Position badge */}
      <span
        style={{
          width: '22px',
          fontSize: '11px',
          color: COLORS.muted,
          flexShrink: 0,
          textAlign: 'right',
          fontFamily: 'inherit',
          letterSpacing: '0.05em',
        }}
      >
        {position}
      </span>

      {/* Thumbnail */}
      {thumb ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumb}
          alt=""
          style={{
            width: '52px',
            height: '38px',
            objectFit: 'cover',
            borderRadius: '2px',
            flexShrink: 0,
            border: `1px solid ${COLORS.divider}`,
          }}
        />
      ) : (
        <div
          style={{
            width: '52px',
            height: '38px',
            borderRadius: '2px',
            flexShrink: 0,
            background: 'rgba(0,0,0,0.06)',
            border: `1px solid ${COLORS.divider}`,
          }}
        />
      )}

      {/* Title + brand */}
      <div style={{ minWidth: 0, flex: 1 }}>
        <p
          style={{
            margin: 0,
            fontSize: '13px',
            fontWeight: 500,
            color: COLORS.text,
            fontFamily: 'inherit',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {piano.title}
        </p>
        {brandName && (
          <p
            style={{
              margin: 0,
              fontSize: '11px',
              color: COLORS.muted,
              fontFamily: 'inherit',
              letterSpacing: '0.04em',
            }}
          >
            {brandName}
          </p>
        )}
      </div>

      {/* Current DB priority */}
      <span
        style={{
          flexShrink: 0,
          fontSize: '11px',
          color: COLORS.muted,
          fontFamily: 'inherit',
          letterSpacing: '0.06em',
          opacity: 0.7,
        }}
        title="Current saved priority value"
      >
        #{piano.priority}
      </span>
    </div>
  )
}
