'use client'

/**
 * PianoBrowser
 * ─────────────────────────────────────────────────────────────
 * Filterable piano inventory.
 *
 * Layout:
 * - Compact sticky bar ("Browse Instruments") locks under the main
 *   site header (h-20 + 30px gold border = 110px) so it's always
 *   visible when scrolling through the grid.
 * - All filter controls live in a slide-in sidebar that opens when
 *   the user clicks the "Filters" button in the sticky bar.
 * - The grid fills the rest of the page on warm cream.
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useMemo, useEffect, useLayoutEffect } from 'react'
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

// Fallback header height used on SSR and before measurement fires
const HEADER_H_DEFAULT = 110

const C = {
  gold:       'hsl(40, 72%, 52%)',
  goldFaint:  'hsla(40, 72%, 52%, 0.14)',
  goldBorder: 'hsla(40, 72%, 52%, 0.2)',
  charcoal:   'hsl(25, 5%, 12%)',
  surface:    'hsl(25, 5%, 16%)',
  divider:    'rgba(255,255,255,0.06)',
  cream:      'hsl(36, 22%, 96%)',
  muted:      'rgba(255,255,255,0.35)',
  faint:      'rgba(255,255,255,0.15)',
}

interface PianoBrowserProps {
  pianos: Piano[]
}

export function PianoBrowser({ pianos }: PianoBrowserProps) {
  // Dynamically measure the actual header height so the sticky bar
  // always snaps flush against it, regardless of browser rendering.
  const [headerH, setHeaderH] = useState(HEADER_H_DEFAULT)

  useLayoutEffect(() => {
    const measure = () => {
      const header = document.querySelector('header')
      if (header) setHeaderH(header.getBoundingClientRect().height)
    }
    measure()
    // Re-measure on resize (e.g. mobile menu expands header)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const [sidebarOpen,     setSidebarOpen]     = useState(false)
  const [brandFilter,     setBrandFilter]     = useState<BrandFilter>('all')
  const [conditionFilter, setConditionFilter] = useState<ConditionFilter>('all')
  const [priceFilter,     setPriceFilter]     = useState<PriceFilter>('all')
  const [sizeFilter,      setSizeFilter]      = useState<SizeFilter>('all')
  const [finishFilter,    setFinishFilter]    = useState<FinishFilter>('all')

  // Lock body scroll while sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSidebarOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const filtered = useMemo(() =>
    filterPianos(pianos, {
      brand: brandFilter, condition: conditionFilter,
      price: priceFilter, size: sizeFilter, finish: finishFilter,
    }),
    [pianos, brandFilter, conditionFilter, priceFilter, sizeFilter, finishFilter],
  )

  const hasFilters =
    brandFilter !== 'all' || conditionFilter !== 'all' ||
    priceFilter !== 'all' || sizeFilter !== 'all' || finishFilter !== 'all'

  const activeFilterCount = [brandFilter, conditionFilter, priceFilter, sizeFilter, finishFilter]
    .filter(v => v !== 'all').length

  const clearAll = () => {
    setBrandFilter('all'); setConditionFilter('all')
    setPriceFilter('all'); setSizeFilter('all'); setFinishFilter('all')
  }

  return (
    <>
      {/* ════════════════════════════════════════
          STICKY BAR — locks below the main header
      ════════════════════════════════════════ */}
      <div
        className="sticky z-30 w-full"
        style={{ top: `${headerH - 1}px`, backgroundColor: C.charcoal }}
      >
        <div
          className="max-w-7xl mx-auto flex items-center justify-between"
          style={{ padding: '1.5rem 2.5rem' }}
        >
          {/* Left: section label */}
          <div className="flex items-center gap-6">
            <div>
              <p
                className="font-display uppercase leading-none"
                style={{ fontSize: '9px', letterSpacing: '0.45em', color: C.gold, marginBottom: '0.4rem' }}
              >
                Complete Inventory
              </p>
              <h2
                className="font-cormorant font-light leading-none text-white"
                style={{
                  fontSize:   'clamp(2rem, 3.5vw, 2.8rem)',
                  textShadow: '0 2px 12px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.4)',
                }}
              >
                Browse Instruments
              </h2>
            </div>

            {/* Active filter chips (inline, compact) */}
            {hasFilters && (
              <div className="hidden md:flex items-center gap-1.5 flex-wrap">
                {[
                  { val: brandFilter,     opts: BRAND_TABS,      clear: () => setBrandFilter('all')     },
                  { val: conditionFilter, opts: CONDITION_OPTS,   clear: () => setConditionFilter('all') },
                  { val: priceFilter,     opts: PRICE_OPTS,       clear: () => setPriceFilter('all')     },
                  { val: sizeFilter,      opts: SIZE_OPTS,        clear: () => setSizeFilter('all')      },
                  { val: finishFilter,    opts: FINISH_OPTS,      clear: () => setFinishFilter('all')    },
                ].filter(({ val }) => val !== 'all').map(({ val, opts, clear }) => {
                  const label = opts.find((o: { key: string }) => o.key === val)?.label ?? val
                  return (
                    <button
                      key={val}
                      onClick={clear}
                      className="inline-flex items-center gap-1 transition-opacity duration-150 hover:opacity-70"
                      style={{
                        padding:       '0.28rem 0.65rem',
                        border:        `1px solid ${C.goldBorder}`,
                        color:         C.gold,
                        fontSize:      '9px',
                        letterSpacing: '0.3em',
                        fontFamily:    'var(--font-display, sans-serif)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {label}
                      <span style={{ opacity: 0.55, fontSize: '10px' }}>×</span>
                    </button>
                  )
                })}
                <button
                  onClick={clearAll}
                  className="font-display uppercase transition-opacity hover:opacity-60"
                  style={{ fontSize: '9px', letterSpacing: '0.3em', color: C.muted, marginLeft: '0.25rem' }}
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Right: result count + filter toggle */}
          <div className="flex items-center gap-5">
            <p
              className="font-display uppercase tabular-nums hidden sm:block"
              style={{ fontSize: '11px', letterSpacing: '0.28em', color: C.muted }}
            >
              <span style={{ color: C.gold }}>{filtered.length}</span>
              {' '}/ {pianos.length}
            </p>

            {/* Filter button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="group flex items-center gap-2.5 transition-all duration-200"
              style={{
                padding:         '0.65rem 1.2rem',
                border:          `1px solid ${activeFilterCount > 0 ? C.gold : C.goldBorder}`,
                backgroundColor: activeFilterCount > 0 ? C.goldFaint : 'transparent',
              }}
            >
              {/* Sliders icon */}
              <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                <line x1="0" y1="2"  x2="13" y2="2"  stroke={activeFilterCount > 0 ? C.gold : C.muted} strokeWidth="1.1" />
                <line x1="0" y1="8"  x2="13" y2="8"  stroke={activeFilterCount > 0 ? C.gold : C.muted} strokeWidth="1.1" />
                <circle cx="4"  cy="2" r="1.8" fill={C.charcoal} stroke={activeFilterCount > 0 ? C.gold : C.muted} strokeWidth="1.1" />
                <circle cx="9"  cy="8" r="1.8" fill={C.charcoal} stroke={activeFilterCount > 0 ? C.gold : C.muted} strokeWidth="1.1" />
              </svg>

              <span
                className="font-display uppercase"
                style={{
                  fontSize:      '11px',
                  letterSpacing: '0.38em',
                  color:         activeFilterCount > 0 ? C.gold : C.muted,
                }}
              >
                Filters
              </span>

              {/* Active count badge */}
              {activeFilterCount > 0 && (
                <span
                  className="font-display tabular-nums flex items-center justify-center"
                  style={{
                    width:           '18px',
                    height:          '18px',
                    borderRadius:    '50%',
                    backgroundColor: C.gold,
                    color:           'hsl(25 6% 9%)',
                    fontSize:        '8px',
                    fontWeight:      700,
                    lineHeight:      1,
                  }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          CARD GRID
      ════════════════════════════════════════ */}
      <div style={{ backgroundColor: C.cream }}>
        <div className="max-w-7xl mx-auto" style={{ padding: '3.5rem 2.5rem 5rem' }}>
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p
                className="font-cormorant font-light text-piano-stone"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', marginBottom: '1rem' }}
              >
                No instruments match your filters.
              </p>
              <p
                className="font-display uppercase text-piano-silver/60"
                style={{ fontSize: '10px', letterSpacing: '0.35em', marginBottom: '2rem' }}
              >
                Try adjusting your selection
              </p>
              <button
                onClick={clearAll}
                className="font-display uppercase transition-colors duration-200 hover:text-piano-black"
                style={{ fontSize: '10px', letterSpacing: '0.4em', color: C.gold }}
              >
                Clear all filters →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {filtered.map(piano => (
                <PianoCard key={piano.id} piano={piano} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════
          BACKDROP
      ════════════════════════════════════════ */}
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

      {/* ════════════════════════════════════════
          FILTER SIDEBAR
      ════════════════════════════════════════ */}
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
        {/* ── Sidebar header ── */}
        <div
          className="flex items-center justify-between flex-shrink-0"
          style={{
            padding:      '1.75rem 2rem',
            borderBottom: `1px solid ${C.divider}`,
          }}
        >
          <div>
            <p
              className="font-display uppercase"
              style={{ fontSize: '8px', letterSpacing: '0.45em', color: C.gold, marginBottom: '0.3rem' }}
            >
              Refine Results
            </p>
            <h3
              className="font-cormorant font-light text-white leading-none"
              style={{ fontSize: '1.6rem' }}
            >
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
              style={{
                width:  '2rem',
                height: '2rem',
                border: `1px solid ${C.divider}`,
                color:  C.muted,
                fontSize: '1.1rem',
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* ── Scrollable filter body ── */}
        <div className="flex-1 overflow-y-auto" style={{ padding: '0 2rem 2rem' }}>

          {/* Result preview */}
          <p
            className="font-display uppercase"
            style={{ fontSize: '9px', letterSpacing: '0.35em', color: C.muted, padding: '1.2rem 0 1.5rem', borderBottom: `1px solid ${C.divider}` }}
          >
            Showing <span style={{ color: C.gold }}>{filtered.length}</span> of {pianos.length} instruments
          </p>

          {/* Brand */}
          <SidebarFilterSection label="Brand" subtitle="Filter by maker">
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
                    {active && (
                      <span style={{ color: C.gold, fontSize: '0.85rem' }}>✓</span>
                    )}
                  </button>
                )
              })}
            </div>
          </SidebarFilterSection>

          {/* Condition */}
          <SidebarFilterSection label="Condition">
            <PillGroup
              options={CONDITION_OPTS}
              active={conditionFilter}
              onChange={v => setConditionFilter(v as ConditionFilter)}
            />
          </SidebarFilterSection>

          {/* Price */}
          <SidebarFilterSection label="Price">
            <PillGroup
              options={PRICE_OPTS}
              active={priceFilter}
              onChange={v => setPriceFilter(v as PriceFilter)}
            />
          </SidebarFilterSection>

          {/* Size */}
          <SidebarFilterSection label="Size">
            <PillGroup
              options={SIZE_OPTS}
              active={sizeFilter}
              onChange={v => setSizeFilter(v as SizeFilter)}
            />
          </SidebarFilterSection>

          {/* Finish */}
          <SidebarFilterSection label="Finish">
            <PillGroup
              options={FINISH_OPTS}
              active={finishFilter}
              onChange={v => setFinishFilter(v as FinishFilter)}
            />
          </SidebarFilterSection>
        </div>

        {/* ── Sidebar footer ── */}
        <div
          className="flex-shrink-0"
          style={{ padding: '1.25rem 2rem', borderTop: `1px solid ${C.divider}` }}
        >
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-full font-display uppercase transition-all duration-200"
            style={{
              padding:         '0.85rem',
              backgroundColor: C.gold,
              color:           'hsl(25 6% 9%)',
              fontSize:        '10px',
              letterSpacing:   '0.45em',
            }}
          >
            View {filtered.length} Instrument{filtered.length !== 1 ? 's' : ''}
          </button>
        </div>
      </aside>
    </>
  )
}

// ── SidebarFilterSection ──────────────────────────────────────
function SidebarFilterSection({
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

// ── PillGroup — horizontal wrapping option buttons ────────────
function PillGroup({
  options,
  active,
  onChange,
}: {
  options: { key: string; label: string }[]
  active:  string
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
