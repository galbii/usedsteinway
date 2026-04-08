'use client'

/**
 * SearchPageClient
 * ─────────────────────────────────────────────────────────────
 * Piano search UI — clean white/beige editorial design.
 *
 * Visual design: "Antiquarian Catalogue"
 * A generous white expanse with a single, outsized search field
 * as the primary hero element. The input is deliberately enormous —
 * Cormorant Garamond, borderless except for a thin bottom rule —
 * so the act of searching feels like writing in a journal rather
 * than filling a form. Below it, a compact linen filter bar carries
 * all spec filters and sort. The results grid lives on warm cream.
 *
 * States:
 *   - Landing (no query, no filters): search prompt + full grid
 *   - Filtering: real-time useMemo, no spinners
 *   - No results: polished empty message + reset CTA
 *
 * URL: query text synced to ?q= via debounced router.push (300ms)
 * so links are shareable and browser back/forward works.
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Piano } from '@/types/piano'
import { PianoCard } from './PianoCard'
import {
  type BrandFilter,
  type ConditionFilter,
  type PriceFilter,
  type SizeFilter,
  type FinishFilter,
  type SortOrder,
  BRAND_TABS,
  CONDITION_OPTS,
  PRICE_OPTS,
  SIZE_OPTS,
  FINISH_OPTS,
  SORT_OPTS,
  filterPianos,
  sortPianos,
} from '@/lib/pianoFilters'

// ── Design tokens (light palette) ────────────────────────────
const C = {
  gold:       'hsl(40, 72%, 52%)',
  goldLight:  'hsla(40, 72%, 52%, 0.15)',
  black:      'hsl(25, 6%, 9%)',
  stone:      'hsl(25, 4%, 44%)',
  silver:     'hsl(25, 4%, 58%)',
  linen:      'hsl(36, 20%, 91%)',
  border:     'hsl(36, 18%, 86%)',
}

interface SearchPageClientProps {
  pianos:       Piano[]
  initialQuery: string
}

export function SearchPageClient({ pianos, initialQuery }: SearchPageClientProps) {
  const router = useRouter()

  // ── State ─────────────────────────────────────────────────
  const [query,           setQuery]           = useState(initialQuery)
  const [brandFilter,     setBrandFilter]     = useState<BrandFilter>('all')
  const [conditionFilter, setConditionFilter] = useState<ConditionFilter>('all')
  const [priceFilter,     setPriceFilter]     = useState<PriceFilter>('all')
  const [sizeFilter,      setSizeFilter]      = useState<SizeFilter>('all')
  const [finishFilter,    setFinishFilter]    = useState<FinishFilter>('all')
  const [sortOrder,       setSortOrder]       = useState<SortOrder>('default')

  // ── Debounced URL sync ────────────────────────────────────
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams()
      if (value.trim()) params.set('q', value.trim())
      router.push(`/search${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false })
    }, 300)
  }, [router])

  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
  }, [])

  // ── Filtering + sorting ───────────────────────────────────
  const filtered = useMemo(() => {
    const results = filterPianos(pianos, {
      query:     query.trim() || undefined,
      brand:     brandFilter,
      condition: conditionFilter,
      price:     priceFilter,
      size:      sizeFilter,
      finish:    finishFilter,
    })
    return sortPianos(results, sortOrder)
  }, [pianos, query, brandFilter, conditionFilter, priceFilter, sizeFilter, finishFilter, sortOrder])

  const hasFilters =
    query.trim()           !== '' ||
    brandFilter            !== 'all' ||
    conditionFilter        !== 'all' ||
    priceFilter            !== 'all' ||
    sizeFilter             !== 'all' ||
    finishFilter           !== 'all'

  const clearAll = () => {
    handleQueryChange('')
    setBrandFilter('all')
    setConditionFilter('all')
    setPriceFilter('all')
    setSizeFilter('all')
    setFinishFilter('all')
    setSortOrder('default')
  }

  const isSearching = query.trim().length > 0

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'hsl(36 22% 97%)' }}>

      {/* ════════════════════════════════════════
          HERO SEARCH BAR
          White/cream, very generous, type-scale heading
      ════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'hsl(36 22% 99%)',
          borderBottom:    `1px solid ${C.border}`,
          padding:         'clamp(4rem, 8vw, 7rem) 2.5rem clamp(3rem, 6vw, 5rem)',
        }}
      >
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>

          {/* Overline */}
          <p
            className="font-display uppercase"
            style={{
              fontSize:      '10px',
              letterSpacing: '0.55em',
              color:         C.gold,
              marginBottom:  '1.5rem',
            }}
          >
            Piano Search · {pianos.length} Instruments Available
          </p>

          {/* Heading */}
          <h1
            className="font-cormorant font-light"
            style={{
              fontSize:      'clamp(2.8rem, 5vw, 4.8rem)',
              color:         C.black,
              lineHeight:    1.05,
              marginBottom:  'clamp(2rem, 4vw, 3.5rem)',
              letterSpacing: '-0.01em',
            }}
          >
            Find Your Instrument
          </h1>

          {/* ── The search input ── */}
          <div className="relative group" style={{ marginBottom: '1.2rem' }}>
            {/* Search icon */}
            <svg
              width="20" height="20" viewBox="0 0 20 20" fill="none"
              className="absolute"
              style={{
                left:      0,
                top:       '50%',
                transform: 'translateY(-65%)',
                color:     C.silver,
                flexShrink: 0,
              }}
            >
              <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>

            {/* The input itself */}
            <input
              type="search"
              value={query}
              onChange={e => handleQueryChange(e.target.value)}
              placeholder="Steinway Model B, satin ebony, 1985…"
              autoComplete="off"
              spellCheck={false}
              style={{
                width:           '100%',
                paddingLeft:     '2.2rem',
                paddingRight:    query ? '2.8rem' : '0',
                paddingBottom:   '1.1rem',
                paddingTop:      '0.4rem',
                background:      'transparent',
                border:          'none',
                borderBottom:    `2px solid ${query ? C.black : C.linen}`,
                outline:         'none',
                fontFamily:      "'Cormorant Garamond', Georgia, serif",
                fontSize:        'clamp(1.8rem, 3.5vw, 3.2rem)',
                fontWeight:      300,
                color:           C.black,
                letterSpacing:   '-0.01em',
                lineHeight:      1.2,
                transition:      'border-color 0.25s ease',
                WebkitAppearance: 'none',
              }}
            />

            {/* Clear button */}
            {query && (
              <button
                onClick={() => handleQueryChange('')}
                aria-label="Clear search"
                className="absolute transition-colors duration-150 hover:opacity-60"
                style={{
                  right:     0,
                  top:       '50%',
                  transform: 'translateY(-65%)',
                  color:     C.stone,
                  fontSize:  '1.5rem',
                  lineHeight: 1,
                  padding:   '0.25rem',
                  background: 'none',
                  border:    'none',
                  cursor:    'pointer',
                }}
              >
                ×
              </button>
            )}
          </div>

          {/* Hint */}
          <p
            className="font-display uppercase"
            style={{ fontSize: '9px', letterSpacing: '0.35em', color: C.silver }}
          >
            {isSearching
              ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${query}"`
              : 'Search by brand, model, size, year, finish, or condition'}
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FILTER BAR — sticky, linen, compact
      ════════════════════════════════════════ */}
      <div
        className="sticky z-30"
        style={{
          top:             0,
          backgroundColor: C.linen,
          borderBottom:    `1px solid ${C.border}`,
        }}
      >
        <div
          className="max-w-7xl mx-auto overflow-x-auto"
          style={{ padding: '0 2.5rem' }}
        >
          <div
            className="flex items-stretch"
            style={{ gap: 0, minWidth: 'max-content' }}
          >

            {/* Brand tabs */}
            {BRAND_TABS.map(({ key, label }) => {
              const active = brandFilter === key
              return (
                <button
                  key={key}
                  onClick={() => setBrandFilter(key)}
                  className="font-display uppercase transition-all duration-150 whitespace-nowrap"
                  style={{
                    fontSize:      '9px',
                    letterSpacing: '0.32em',
                    padding:       '0.9rem 1.1rem',
                    color:         active ? C.black : C.stone,
                    borderBottom:  active ? `2px solid ${C.black}` : '2px solid transparent',
                    borderTop:     '2px solid transparent',
                    background:    'transparent',
                    fontWeight:    active ? 600 : 400,
                  }}
                >
                  {label}
                </button>
              )
            })}

            {/* Divider */}
            <div style={{ width: '1px', backgroundColor: C.border, margin: '0.5rem 0.75rem' }} />

            {/* Spec filters */}
            <FilterSelect
              label="Condition"
              options={CONDITION_OPTS}
              value={conditionFilter}
              onChange={v => setConditionFilter(v as ConditionFilter)}
            />
            <FilterSelect
              label="Price"
              options={PRICE_OPTS}
              value={priceFilter}
              onChange={v => setPriceFilter(v as PriceFilter)}
            />
            <FilterSelect
              label="Size"
              options={SIZE_OPTS}
              value={sizeFilter}
              onChange={v => setSizeFilter(v as SizeFilter)}
            />
            <FilterSelect
              label="Finish"
              options={FINISH_OPTS}
              value={finishFilter}
              onChange={v => setFinishFilter(v as FinishFilter)}
            />

            {/* Divider */}
            <div style={{ width: '1px', backgroundColor: C.border, margin: '0.5rem 0.75rem' }} />

            {/* Sort */}
            <FilterSelect
              label="Sort"
              options={SORT_OPTS}
              value={sortOrder}
              onChange={v => setSortOrder(v as SortOrder)}
            />

            {/* Spacer + result count + clear */}
            <div
              className="flex items-center ml-auto pl-4"
              style={{ gap: '1.25rem', paddingRight: '0.25rem' }}
            >
              <span
                className="font-display uppercase tabular-nums whitespace-nowrap"
                style={{ fontSize: '9px', letterSpacing: '0.3em', color: C.stone }}
              >
                <span style={{ color: C.black, fontWeight: 600 }}>{filtered.length}</span>
                {' '}of {pianos.length}
              </span>
              {hasFilters && (
                <button
                  onClick={clearAll}
                  className="font-display uppercase whitespace-nowrap transition-colors duration-150"
                  style={{ fontSize: '9px', letterSpacing: '0.3em', color: C.silver, textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          RESULTS AREA
      ════════════════════════════════════════ */}
      <div style={{ backgroundColor: 'hsl(36 18% 97%)', minHeight: '40vh' }}>
        <div
          className="max-w-7xl mx-auto"
          style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 2.5rem clamp(4rem, 8vw, 6rem)' }}
        >

          {/* ── No results ── */}
          {filtered.length === 0 && (
            <div
              className="text-center"
              style={{ paddingTop: '5rem', paddingBottom: '5rem' }}
            >
              {/* Ornamental line */}
              <div
                style={{
                  width:  '3rem',
                  height: '1px',
                  backgroundColor: C.linen,
                  margin: '0 auto 2.5rem',
                }}
              />
              <p
                className="font-cormorant font-light"
                style={{
                  fontSize:     'clamp(1.6rem, 3vw, 2.4rem)',
                  color:        C.stone,
                  marginBottom: '1rem',
                  lineHeight:   1.3,
                }}
              >
                {isSearching
                  ? `No instruments found for "${query}".`
                  : 'No instruments match your filters.'}
              </p>
              <p
                className="font-display uppercase"
                style={{ fontSize: '9px', letterSpacing: '0.4em', color: C.silver, marginBottom: '2.5rem' }}
              >
                {isSearching ? 'Try a different search term' : 'Try adjusting or clearing your filters'}
              </p>

              <div className="flex items-center justify-center gap-6 flex-wrap">
                <button
                  onClick={clearAll}
                  className="font-display uppercase transition-colors duration-200"
                  style={{ fontSize: '10px', letterSpacing: '0.4em', color: C.gold }}
                >
                  Clear all filters
                </button>
                <span style={{ color: C.linen, fontSize: '0.875rem' }}>—</span>
                <Link
                  href="/contact"
                  className="font-display uppercase transition-colors duration-200"
                  style={{ fontSize: '10px', letterSpacing: '0.4em', color: C.stone }}
                >
                  Contact Roger →
                </Link>
              </div>
            </div>
          )}

          {/* ── Results grid ── */}
          {filtered.length > 0 && (
            <>
              {/* Active filter summary */}
              {hasFilters && (
                <div
                  className="flex items-center justify-between flex-wrap gap-3"
                  style={{ marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: `1px solid ${C.border}` }}
                >
                  <p
                    className="font-display uppercase"
                    style={{ fontSize: '9px', letterSpacing: '0.38em', color: C.stone }}
                  >
                    Showing{' '}
                    <span style={{ color: C.black }}>{filtered.length}</span>
                    {' '}of {pianos.length} instruments
                    {isSearching && (
                      <span style={{ color: C.silver }}>
                        {' '}— <span style={{ fontStyle: 'normal' }}>&ldquo;{query}&rdquo;</span>
                      </span>
                    )}
                  </p>
                  <button
                    onClick={clearAll}
                    className="font-display uppercase transition-colors duration-150 hover:opacity-70"
                    style={{ fontSize: '9px', letterSpacing: '0.35em', color: C.silver, textDecoration: 'underline', textUnderlineOffset: '3px' }}
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Piano card grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {filtered.map(piano => (
                  <PianoCard key={piano.id} piano={piano} />
                ))}
              </div>

              {/* Footer hint */}
              {!hasFilters && pianos.length > 0 && (
                <p
                  className="font-display uppercase text-center"
                  style={{ fontSize: '9px', letterSpacing: '0.4em', color: C.silver, marginTop: '4rem' }}
                >
                  {pianos.length} instruments available · Use the search or filters above to narrow results
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── FilterSelect — lightweight styled wrapper around <select> ──
interface FilterSelectProps {
  label:    string
  options:  { key: string; label: string }[]
  value:    string
  onChange: (v: string) => void
}

function FilterSelect({ label, options, value, onChange }: FilterSelectProps) {
  const isActive = value !== 'all' && value !== 'default'
  return (
    <div
      className="relative flex items-center"
      style={{ padding: '0.6rem 0.9rem', borderBottom: isActive ? `2px solid ${C.gold}` : '2px solid transparent', borderTop: '2px solid transparent' }}
    >
      <label
        className="font-display uppercase pointer-events-none"
        style={{
          fontSize:      '8px',
          letterSpacing: '0.35em',
          color:         C.silver,
          marginRight:   '0.4rem',
          whiteSpace:    'nowrap',
        }}
      >
        {label}:
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="font-display uppercase cursor-pointer appearance-none"
        style={{
          fontSize:       '9px',
          letterSpacing:  '0.3em',
          color:          isActive ? C.black : C.stone,
          background:     'transparent',
          border:         'none',
          outline:        'none',
          paddingRight:   '1rem',
          fontWeight:     isActive ? 600 : 400,
          cursor:         'pointer',
        }}
      >
        {options.map(({ key, label: optLabel }) => (
          <option key={key} value={key} style={{ fontFamily: 'sans-serif', letterSpacing: 'normal', textTransform: 'none' }}>
            {optLabel}
          </option>
        ))}
      </select>
      {/* Chevron */}
      <svg
        width="8" height="5" viewBox="0 0 8 5" fill="none"
        className="absolute pointer-events-none"
        style={{ right: '0.5rem', color: C.silver }}
      >
        <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
