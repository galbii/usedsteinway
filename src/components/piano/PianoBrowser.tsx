'use client'

import { useState, useMemo, useEffect, useLayoutEffect, useRef } from 'react'
import { PianoCard } from './PianoCard'
import type { Piano } from '@/types/piano'
import {
  type BrandFilter,
  type ConditionFilter,
  type PriceFilter,
  type SizeFilter,
  type FinishFilter,
  BRAND_TABS,
  CONDITION_OPTS,
  PRICE_OPTS,
  SIZE_OPTS,
  FINISH_OPTS,
  filterPianos,
} from '@/lib/pianoFilters'

const HEADER_H_DEFAULT = 72

const C = {
  gold:       'hsl(40, 72%, 52%)',
  goldFaint:  'hsla(40, 72%, 52%, 0.14)',
  goldBorder: 'hsla(40, 72%, 52%, 0.2)',
  charcoal:   'hsl(25, 5%, 12%)',
  divider:    'rgba(255,255,255,0.06)',
  cream:      'hsl(36, 22%, 96%)',
  muted:      'rgba(255,255,255,0.35)',
  faint:      'rgba(255,255,255,0.15)',
  creamLine:  'hsl(36 18% 88%)',
  creamMuted: 'hsl(25 4% 55%)',
}

interface PianoBrowserProps {
  pianos: Piano[]
  initialBrandFilter?: BrandFilter
}

export function PianoBrowser({ pianos, initialBrandFilter }: PianoBrowserProps) {
  const [headerH, setHeaderH] = useState(HEADER_H_DEFAULT)

  useLayoutEffect(() => {
    let rafId: number | null = null
    const measure = () => {
      const header = document.querySelector('header')
      if (header) setHeaderH(header.getBoundingClientRect().height)
    }
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => { measure(); rafId = null })
    }
    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const [sidebarOpen,     setSidebarOpen]     = useState(false)
  const [brandFilter,     setBrandFilter]     = useState<BrandFilter>(initialBrandFilter ?? 'all')
  const [mounted,         setMounted]         = useState(false)
  const [elevated,        setElevated]        = useState(false)
  const [searchFocused,   setSearchFocused]   = useState(false)

  // Shared sliding pill behind the active brand tab — measured from label refs.
  const tabRowRef = useRef<HTMLDivElement>(null)
  const labelRefs = useRef<Map<string, HTMLSpanElement>>(new Map())
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 })

  useEffect(() => {
    if (initialBrandFilter !== undefined) setBrandFilter(initialBrandFilter)
  }, [initialBrandFilter])
  const [conditionFilter, setConditionFilter] = useState<ConditionFilter>('all')
  const [priceFilter,     setPriceFilter]     = useState<PriceFilter>('all')
  const [sizeFilter,      setSizeFilter]      = useState<SizeFilter>('all')
  const [finishFilter,    setFinishFilter]    = useState<FinishFilter>('all')
  const [query,           setQuery]           = useState('')

  // Mark mounted after first render so subsequent filter changes use a lighter
  // crossfade instead of the heavier initial slide-in stagger.
  useEffect(() => { setMounted(true) }, [])

  // Reposition sliding pill whenever the active brand changes or the layout reflows.
  useLayoutEffect(() => {
    const measure = () => {
      const el = labelRefs.current.get(brandFilter)
      const row = tabRowRef.current
      if (!el || !row) return
      const rRect = row.getBoundingClientRect()
      const eRect = el.getBoundingClientRect()
      setPillStyle({ left: eRect.left - rRect.left + row.scrollLeft, width: eRect.width })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [brandFilter])

  // Subtle elevation cue on the sticky bar once content has scrolled beneath it.
  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > headerH + 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [headerH])

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSidebarOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const filtered = useMemo(
    () => filterPianos(pianos, {
      query,
      brand: brandFilter, condition: conditionFilter,
      price: priceFilter, size: sizeFilter, finish: finishFilter,
    }),
    [pianos, query, brandFilter, conditionFilter, priceFilter, sizeFilter, finishFilter],
  )

  // Smoothly tween the visible count from old value → new value.
  const animatedCount = useCountUp(filtered.length)

  const hasFilters =
    query.length > 0 ||
    brandFilter !== 'all' || conditionFilter !== 'all' ||
    priceFilter !== 'all' || sizeFilter !== 'all' || finishFilter !== 'all'

  // Only count sidebar filters (not inline brand tab or search) in the badge
  const sidebarFilterCount = [conditionFilter, priceFilter, sizeFilter, finishFilter]
    .filter(v => v !== 'all').length

  const clearAll = () => {
    setBrandFilter('all'); setConditionFilter('all')
    setPriceFilter('all'); setSizeFilter('all'); setFinishFilter('all')
    setQuery('')
  }

  const featuredPianos = filtered.filter(p => p.isFeatured)
  const regularPianos  = filtered.filter(p => !p.isFeatured)

  // Delay offset for cards on initial load (so they sequence after the header reveals).
  // After the first mount, new cards fade in immediately so filter changes feel snappy.
  const cardBaseDelay = mounted ? 0 : 520

  function handleBrandTabClick(key: BrandFilter) {
    if (key === brandFilter) return
    setBrandFilter(key)
    setTimeout(() => {
      document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          STICKY BAR — two rows, locks below the main header
      ═══════════════════════════════════════════════════════════ */}
      <div
        className="sticky z-30 w-full"
        style={{
          top:             `${headerH}px`,
          backgroundColor: C.charcoal,
          boxShadow:       elevated
            ? '0 14px 36px -18px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.02)'
            : '0 0 0 rgba(0,0,0,0)',
          transition:      'box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* ── Row 1: label + active chips + count + filters button ── */}
        <div
          className="max-w-7xl mx-auto flex items-center justify-between"
          style={{ padding: '2rem 2.5rem' }}
        >
          {/* Left: section label + active chips */}
          <div className="flex items-center gap-6 min-w-0">
            <div className="flex-shrink-0">
              <p
                className="font-display uppercase leading-none"
                style={{
                  fontSize:  '11px',
                  letterSpacing: '0.45em',
                  color:     C.gold,
                  marginBottom: '0.55rem',
                  animation: 'piano-card-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
                  animationDelay: '40ms',
                }}
              >
                Complete Inventory
              </p>
              <h2
                className="font-cormorant font-light leading-none text-white"
                style={{
                  fontSize:  'clamp(2.6rem, 4vw, 3.6rem)',
                  animation: 'reveal-up 0.85s cubic-bezier(0.16, 1, 0.3, 1) both',
                  animationDelay: '120ms',
                }}
              >
                Browse Instruments
              </h2>
            </div>

            {/* Active filter chips — sidebar filters only */}
            {(sidebarFilterCount > 0 || query) && (
              <div className="hidden md:flex items-center gap-1.5 flex-wrap min-w-0">
                {[
                  { val: conditionFilter, opts: CONDITION_OPTS, clear: () => setConditionFilter('all') },
                  { val: priceFilter,     opts: PRICE_OPTS,     clear: () => setPriceFilter('all')     },
                  { val: sizeFilter,      opts: SIZE_OPTS,      clear: () => setSizeFilter('all')      },
                  { val: finishFilter,    opts: FINISH_OPTS,    clear: () => setFinishFilter('all')    },
                ].filter(({ val }) => val !== 'all').map(({ val, opts, clear }) => {
                  const label = opts.find((o: { key: string }) => o.key === val)?.label ?? val
                  return (
                    <button
                      key={val}
                      onClick={clear}
                      className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:bg-[hsla(40,72%,52%,0.18)]"
                      style={{
                        padding:       '0.4rem 0.9rem',
                        border:        `1px solid ${C.goldBorder}`,
                        color:         C.gold,
                        fontSize:      '11px',
                        letterSpacing: '0.3em',
                        fontFamily:    'var(--font-display, sans-serif)',
                        textTransform: 'uppercase',
                        animation:     'piano-chip-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
                        transformOrigin: 'left center',
                      }}
                    >
                      {label}
                      <span
                        className="transition-transform duration-200 group-hover:rotate-90"
                        style={{ opacity: 0.5, fontSize: '13px', display: 'inline-block', lineHeight: 1 }}
                      >
                        ×
                      </span>
                    </button>
                  )
                })}
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:bg-[hsla(40,72%,52%,0.18)]"
                    style={{
                      padding:       '0.4rem 0.9rem',
                      border:        `1px solid ${C.goldBorder}`,
                      color:         C.gold,
                      fontSize:      '11px',
                      letterSpacing: '0.3em',
                      fontFamily:    'var(--font-display, sans-serif)',
                      textTransform: 'uppercase',
                      maxWidth:      '160px',
                      animation:     'piano-chip-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
                      transformOrigin: 'left center',
                    }}
                  >
                    <span className="truncate">&ldquo;{query}&rdquo;</span>
                    <span
                      className="transition-transform duration-200 group-hover:rotate-90"
                      style={{ opacity: 0.5, fontSize: '13px', flexShrink: 0, display: 'inline-block', lineHeight: 1 }}
                    >
                      ×
                    </span>
                  </button>
                )}
                {hasFilters && (
                  <button
                    onClick={clearAll}
                    className="font-display uppercase transition-opacity hover:opacity-60 flex-shrink-0"
                    style={{ fontSize: '11px', letterSpacing: '0.3em', color: C.muted }}
                  >
                    Clear all
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right: result count + filter toggle */}
          <div
            className="flex items-center gap-5 flex-shrink-0"
            style={{
              animation:      'reveal-right 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: '260ms',
            }}
          >
            <p
              className="font-display uppercase tabular-nums hidden sm:block"
              style={{ fontSize: '15px', letterSpacing: '0.28em', color: C.muted }}
            >
              <span style={{ color: C.gold, display: 'inline-block', minWidth: '1.5ch', textAlign: 'right' }}>
                {animatedCount}
              </span>
              {' '}/ {pianos.length}
            </p>

            <button
              onClick={() => setSidebarOpen(true)}
              className="group flex items-center gap-3 transition-all duration-200"
              style={{
                padding:         '0.9rem 1.8rem',
                border:          `1px solid ${sidebarFilterCount > 0 ? C.gold : C.goldBorder}`,
                backgroundColor: sidebarFilterCount > 0 ? C.goldFaint : 'transparent',
              }}
            >
              <svg width="17" height="13" viewBox="0 0 13 10" fill="none">
                <line x1="0" y1="2"  x2="13" y2="2"  stroke={sidebarFilterCount > 0 ? C.gold : C.muted} strokeWidth="1.1" />
                <line x1="0" y1="8"  x2="13" y2="8"  stroke={sidebarFilterCount > 0 ? C.gold : C.muted} strokeWidth="1.1" />
                <circle cx="4"  cy="2" r="1.8" fill={C.charcoal} stroke={sidebarFilterCount > 0 ? C.gold : C.muted} strokeWidth="1.1" />
                <circle cx="9"  cy="8" r="1.8" fill={C.charcoal} stroke={sidebarFilterCount > 0 ? C.gold : C.muted} strokeWidth="1.1" />
              </svg>
              <span
                className="font-display uppercase"
                style={{ fontSize: '14px', letterSpacing: '0.38em', color: sidebarFilterCount > 0 ? C.gold : C.muted }}
              >
                Filters
              </span>
              {sidebarFilterCount > 0 && (
                <span
                  className="font-display tabular-nums flex items-center justify-center"
                  style={{
                    width:           '22px',
                    height:          '22px',
                    borderRadius:    '50%',
                    backgroundColor: C.gold,
                    color:           'hsl(25 6% 9%)',
                    fontSize:        '10px',
                    fontWeight:      700,
                    lineHeight:      1,
                  }}
                >
                  {sidebarFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── Row 2: Brand tabs + search ── */}
        <div style={{ borderTop: `1px solid ${C.divider}` }}>
          <div
            className="max-w-7xl mx-auto flex items-center justify-between"
            style={{ padding: '0 2.5rem' }}
          >
            {/* Brand tabs — scrollable on mobile, with shared sliding pill */}
            <div
              ref={tabRowRef}
              className="flex items-center overflow-x-auto relative"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
            >
              {BRAND_TABS.map(({ key, label }, tabIndex) => {
                const active = brandFilter === key
                return (
                  <button
                    key={key}
                    onClick={() => handleBrandTabClick(key)}
                    className="font-display uppercase flex-shrink-0 relative"
                    style={{
                      padding:        '1.3rem 1.6rem',
                      fontSize:       '12px',
                      letterSpacing:  '0.38em',
                      color:          active ? C.gold : C.muted,
                      transition:     'color 0.3s cubic-bezier(0.2, 0, 0, 1)',
                      marginBottom:   '-1px',
                      whiteSpace:     'nowrap',
                      animation:      'piano-card-in 0.55s cubic-bezier(0.16, 1, 0.3, 1) both',
                      animationDelay: `${360 + tabIndex * 55}ms`,
                    }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.color = C.muted }}
                  >
                    <span
                      ref={el => {
                        if (el) labelRefs.current.set(key, el)
                        else labelRefs.current.delete(key)
                      }}
                      style={{ display: 'inline-block' }}
                    >
                      {label}
                    </span>
                  </button>
                )
              })}

              {/* Shared sliding pill */}
              <span
                aria-hidden="true"
                style={{
                  position:        'absolute',
                  bottom:          0,
                  height:          '2px',
                  backgroundColor: C.gold,
                  borderRadius:    '1px',
                  left:            `${pillStyle.left}px`,
                  width:           `${pillStyle.width}px`,
                  opacity:         pillStyle.width > 0 ? 1 : 0,
                  transition:      'left 0.5s cubic-bezier(0.16, 1, 0.3, 1), width 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
                  pointerEvents:   'none',
                  boxShadow:       '0 0 12px hsla(40, 72%, 52%, 0.35)',
                }}
              />
            </div>

            {/* Search input — light, prominent, with focus glow */}
            <div
              className="hidden sm:flex items-center flex-shrink-0"
              style={{
                paddingLeft:    '2rem',
                animation:      'reveal-fade 0.6s ease both',
                animationDelay: '590ms',
              }}
            >
              <label
                className="flex items-center gap-2.5 relative"
                style={{
                  width:           '260px',
                  padding:         '0.55rem 1rem',
                  backgroundColor: searchFocused || query ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.88)',
                  border:          `1px solid ${searchFocused ? C.gold : 'rgba(255,255,255,0.5)'}`,
                  boxShadow:       searchFocused
                    ? '0 0 0 3px hsla(40, 72%, 52%, 0.18), 0 6px 20px -6px rgba(0,0,0,0.4)'
                    : '0 2px 10px -4px rgba(0,0,0,0.35)',
                  transition:      'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor:          'text',
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 12 12"
                  fill="none"
                  style={{
                    color:      searchFocused ? C.gold : 'hsl(25, 5%, 38%)',
                    transition: 'color 0.3s ease',
                    flexShrink: 0,
                  }}
                >
                  <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.4" />
                  <line x1="8.2" y1="8.2" x2="11" y2="11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Search instruments…"
                  className="font-display bg-transparent outline-none uppercase flex-1 min-w-0"
                  style={{
                    fontSize:      '11px',
                    letterSpacing: '0.28em',
                    color:         'hsl(25, 6%, 12%)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  style={{
                    color:         'hsl(25, 5%, 38%)',
                    fontSize:      '16px',
                    lineHeight:    1,
                    width:         query ? '16px' : '0',
                    overflow:      'hidden',
                    opacity:       query ? 1 : 0,
                    transition:    'opacity 0.25s ease, width 0.25s ease',
                    pointerEvents: query ? 'auto' : 'none',
                    flexShrink:    0,
                  }}
                >
                  ×
                </button>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          CARD GRID — cream section
      ═══════════════════════════════════════════════════════════ */}
      <div style={{ backgroundColor: C.cream }}>
        <div className="max-w-7xl mx-auto" style={{ padding: '3.5rem 2.5rem 6rem' }}>
          {filtered.length === 0 ? (
            <div style={{ animation: 'piano-card-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
              <EmptyState onClear={clearAll} hasFilters={hasFilters} />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>

              {/* Featured instruments — full-width horizontal cards */}
              {featuredPianos.length > 0 && (
                <section>
                  <SectionDivider label="Featured Instruments" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {featuredPianos.map((piano, i) => {
                      // Cards that stay across filter changes keep their DOM node (no re-animation).
                      // New cards entering fade in with a light stagger.
                      const anim = mounted
                        ? `piano-fade-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) both`
                        : `piano-card-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both`
                      const stagger = mounted ? Math.min(i * 45, 240) : i * 100
                      return (
                        <div
                          key={`feat-${piano.id}`}
                          style={{
                            animation:      anim,
                            animationDelay: `${cardBaseDelay + stagger}ms`,
                          }}
                        >
                          <PianoCard piano={piano} variant="featured" />
                        </div>
                      )
                    })}
                  </div>
                </section>
              )}

              {/* Regular inventory — responsive grid */}
              {regularPianos.length > 0 && (
                <section>
                  {featuredPianos.length > 0 && (
                    <SectionDivider label="All Instruments" muted />
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
                    {regularPianos.map((piano, i) => {
                      const anim = mounted
                        ? `piano-fade-rise 0.5s cubic-bezier(0.16, 1, 0.3, 1) both`
                        : `piano-card-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both`
                      const stagger = mounted ? Math.min(i * 24, 280) : i * 52
                      return (
                        <div
                          key={`${piano.id}`}
                          style={{
                            animation:      anim,
                            animationDelay: `${cardBaseDelay + stagger}ms`,
                          }}
                        >
                          <PianoCard piano={piano} />
                        </div>
                      )
                    })}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          BACKDROP
      ═══════════════════════════════════════════════════════════ */}
      <div
        className="fixed inset-0 z-40"
        style={{
          backgroundColor: 'rgba(0,0,0,0.45)',
          opacity:          sidebarOpen ? 1 : 0,
          pointerEvents:    sidebarOpen ? 'auto' : 'none',
          transition:       'opacity 0.3s ease',
          backdropFilter:   sidebarOpen ? 'blur(2px)' : 'none',
        }}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* ═══════════════════════════════════════════════════════════
          FILTER SIDEBAR
      ═══════════════════════════════════════════════════════════ */}
      <aside
        className="fixed right-0 top-0 bottom-0 z-50 flex flex-col overflow-hidden"
        style={{
          width:           'clamp(320px, 35vw, 440px)',
          backgroundColor: C.charcoal,
          transform:       sidebarOpen ? 'translateX(0)' : 'translateX(100%)',
          transition:      'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow:       sidebarOpen ? '-24px 0 80px rgba(0,0,0,0.35)' : 'none',
        }}
        aria-label="Filter instruments"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between flex-shrink-0"
          style={{ padding: '1.75rem 2rem', borderBottom: `1px solid ${C.divider}` }}
        >
          <div>
            <p className="font-display uppercase" style={{ fontSize: '8px', letterSpacing: '0.45em', color: C.gold, marginBottom: '0.3rem' }}>
              Refine Results
            </p>
            <h3 className="font-cormorant font-light text-white leading-none" style={{ fontSize: '1.6rem' }}>
              Filters
            </h3>
          </div>
          <div className="flex items-center gap-4">
            {hasFilters && (
              <button
                onClick={clearAll}
                className="font-display uppercase transition-opacity hover:opacity-60"
                style={{ fontSize: '8px', letterSpacing: '0.35em', color: C.muted }}
              >
                Clear all
              </button>
            )}
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close filters"
              className="flex items-center justify-center transition-opacity hover:opacity-60"
              style={{ width: '2rem', height: '2rem', border: `1px solid ${C.divider}`, color: C.muted, fontSize: '1.1rem', lineHeight: 1 }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Search inside sidebar */}
        <div style={{ padding: '1.1rem 2rem', borderBottom: `1px solid ${C.divider}` }}>
          <div className="flex items-center gap-2.5">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <circle cx="5" cy="5" r="4" stroke="rgba(255,255,255,0.28)" strokeWidth="1.2" />
              <line x1="8.2" y1="8.2" x2="11" y2="11" stroke="rgba(255,255,255,0.28)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by model, year, finish..."
              className="font-display uppercase bg-transparent outline-none flex-1"
              style={{
                fontSize:      '8.5px',
                letterSpacing: '0.28em',
                color:         'rgba(255,255,255,0.65)',
                borderBottom:  '1px solid rgba(255,255,255,0.12)',
                padding:       '0.38rem 0',
              }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{ color: C.muted, fontSize: '14px', lineHeight: 1 }}>×</button>
            )}
          </div>
        </div>

        {/* Scrollable filter body */}
        <div className="flex-1 overflow-y-auto" style={{ padding: '0 2rem 2rem' }}>
          <p
            className="font-display uppercase"
            style={{ fontSize: '9px', letterSpacing: '0.35em', color: C.muted, padding: '1.1rem 0 1.4rem', borderBottom: `1px solid ${C.divider}` }}
          >
            Showing{' '}
            <span
              style={{
                color:    C.gold,
                display:  'inline-block',
                minWidth: '1.5ch',
                textAlign:'right',
              }}
            >
              {animatedCount}
            </span>{' '}
            of {pianos.length} instruments
          </p>

          {/* Brand */}
          <SidebarSection label="Brand" subtitle="Filter by maker">
            <div className="flex flex-col gap-1.5 pt-1">
              {BRAND_TABS.map(({ key, label, sub }) => {
                const active = brandFilter === key
                return (
                  <button
                    key={key}
                    onClick={() => setBrandFilter(key)}
                    className="flex items-center justify-between w-full text-left transition-all duration-150"
                    style={{
                      padding:         '0.75rem 1rem',
                      backgroundColor: active ? C.goldFaint : 'transparent',
                      border:          `1px solid ${active ? C.goldBorder : 'transparent'}`,
                    }}
                  >
                    <div>
                      <span
                        className="font-display uppercase block"
                        style={{ fontSize: '10px', letterSpacing: '0.35em', color: active ? C.gold : C.muted }}
                      >
                        {label}
                      </span>
                      {sub && (
                        <span
                          className="font-display uppercase block"
                          style={{ fontSize: '8px', letterSpacing: '0.2em', color: active ? C.gold : C.faint, marginTop: '0.15rem' }}
                        >
                          {sub}
                        </span>
                      )}
                    </div>
                    {active && <span style={{ color: C.gold, fontSize: '0.85rem' }}>✓</span>}
                  </button>
                )
              })}
            </div>
          </SidebarSection>

          <SidebarSection label="Condition">
            <PillGroup options={CONDITION_OPTS} active={conditionFilter} onChange={v => setConditionFilter(v as ConditionFilter)} />
          </SidebarSection>

          <SidebarSection label="Price">
            <PillGroup options={PRICE_OPTS} active={priceFilter} onChange={v => setPriceFilter(v as PriceFilter)} />
          </SidebarSection>

          <SidebarSection label="Size">
            <PillGroup options={SIZE_OPTS} active={sizeFilter} onChange={v => setSizeFilter(v as SizeFilter)} />
          </SidebarSection>

          <SidebarSection label="Finish">
            <PillGroup options={FINISH_OPTS} active={finishFilter} onChange={v => setFinishFilter(v as FinishFilter)} />
          </SidebarSection>
        </div>

        {/* Footer CTA */}
        <div className="flex-shrink-0" style={{ padding: '1.25rem 2rem', borderTop: `1px solid ${C.divider}` }}>
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-full font-display uppercase transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            style={{
              padding:         '0.85rem',
              backgroundColor: C.gold,
              color:           'hsl(25 6% 9%)',
              fontSize:        '10px',
              letterSpacing:   '0.45em',
              transform:       'translateZ(0)',
            }}
          >
            View{' '}
            <span style={{ display: 'inline-block', minWidth: '1.5ch', textAlign: 'center' }}>
              {animatedCount}
            </span>{' '}
            Instrument{filtered.length !== 1 ? 's' : ''}
          </button>
        </div>
      </aside>
    </>
  )
}

// ── useCountUp ───────────────────────────────────────────────────────────────
// Smoothly tween a numeric value between renders (e.g. the visible result
// count). Falls through instantly under prefers-reduced-motion.

function useCountUp(value: number, duration = 380): number {
  const [display, setDisplay] = useState(value)
  const prev = useRef(value)

  useEffect(() => {
    const from = prev.current
    const to   = value
    if (from === to) return

    const reduce = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setDisplay(to)
      prev.current = to
      return
    }

    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic — weighted, no overshoot
      setDisplay(Math.round(from + (to - from) * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
      else prev.current = to
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return display
}

// ── EmptyState ───────────────────────────────────────────────────────────────

function EmptyState({ onClear, hasFilters }: { onClear: () => void; hasFilters: boolean }) {
  return (
    <div className="py-28 flex flex-col items-center text-center">
      {/* Decorative piano keys mark */}
      <div className="flex gap-px mb-8" aria-hidden="true">
        {[1,1,0,1,1,1,0].map((isWhite, i) => (
          <div
            key={i}
            style={{
              width:           isWhite ? '20px' : '14px',
              height:          isWhite ? '56px' : '36px',
              backgroundColor: isWhite ? 'hsl(36 18% 86%)' : 'hsl(25 5% 30%)',
              borderRadius:    '0 0 2px 2px',
              marginTop:       isWhite ? 0 : 0,
              zIndex:          isWhite ? 1 : 2,
              position:        'relative' as const,
            }}
          />
        ))}
      </div>

      <p
        className="font-cormorant font-light text-piano-stone"
        style={{ fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)', marginBottom: '0.75rem' }}
      >
        No instruments match your filters.
      </p>
      <p
        className="font-display uppercase"
        style={{ fontSize: '9px', letterSpacing: '0.4em', color: 'hsl(25 4% 62%)', marginBottom: '2.5rem' }}
      >
        Try adjusting your selection
      </p>
      {hasFilters && (
        <button
          onClick={onClear}
          className="font-display uppercase transition-colors duration-200 hover:text-piano-black"
          style={{ fontSize: '9px', letterSpacing: '0.45em', color: 'hsl(40 72% 52%)' }}
        >
          Clear all filters →
        </button>
      )}
    </div>
  )
}

// ── SectionDivider ───────────────────────────────────────────────────────────

function SectionDivider({ label, muted }: { label: string; muted?: boolean }) {
  return (
    <div className="flex items-center gap-4" style={{ marginBottom: '1.75rem', overflow: 'hidden' }}>
      <p
        className="font-display uppercase flex-shrink-0"
        style={{
          fontSize:      '8px',
          letterSpacing: '0.5em',
          color:         muted ? C.creamMuted : 'hsl(40 72% 52%)',
          animation:     'reveal-fade 0.6s ease both',
        }}
      >
        {label}
      </p>
      <div
        style={{
          flex:            1,
          height:          '1px',
          backgroundColor: C.creamLine,
          animation:       'scale-x-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
          animationDelay:  '80ms',
          transformOrigin: 'left',
        }}
      />
    </div>
  )
}

// ── SidebarSection ───────────────────────────────────────────────────────────

function SidebarSection({
  label,
  subtitle,
  children,
}: {
  label: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem', borderBottom: `1px solid ${C.divider}` }}>
      <p
        className="font-display uppercase"
        style={{ fontSize: '9px', letterSpacing: '0.42em', color: 'rgba(255,255,255,0.38)', marginBottom: subtitle ? '0.15rem' : '1rem' }}
      >
        {label}
      </p>
      {subtitle && (
        <p
          className="font-display uppercase"
          style={{ fontSize: '8px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.18)', marginBottom: '1rem' }}
        >
          {subtitle}
        </p>
      )}
      {children}
    </div>
  )
}

// ── PillGroup ────────────────────────────────────────────────────────────────

function PillGroup({
  options,
  active,
  onChange,
}: {
  options:  { key: string; label: string }[]
  active:   string
  onChange: (key: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map(({ key, label }) => {
        const isActive = active === key
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="font-display uppercase transition-all duration-150"
            style={{
              padding:         '0.4rem 0.85rem',
              fontSize:        '9px',
              letterSpacing:   '0.3em',
              backgroundColor: isActive ? C.goldFaint : 'transparent',
              border:          `1px solid ${isActive ? C.goldBorder : 'rgba(255,255,255,0.1)'}`,
              color:           isActive ? C.gold : 'rgba(255,255,255,0.35)',
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
