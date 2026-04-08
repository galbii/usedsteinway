/**
 * pianoFilters.ts
 * ─────────────────────────────────────────────────────────────
 * Shared filter types, constants, and pure-function helpers used
 * by both PianoBrowser and the Search page. No 'use client'
 * directive — safe to import in server or client contexts.
 * ─────────────────────────────────────────────────────────────
 */

import type { Piano, CategorySlug } from '@/types/piano'

// ── Filter types ──────────────────────────────────────────────

export type BrandFilter     = 'all' | CategorySlug
export type ConditionFilter = 'all' | 'new' | 'used' | 'reconditioned' | 'rebuilt'
export type PriceFilter     = 'all' | 'under-25' | '25-50' | '50-100' | 'over-100'
export type SizeFilter      = 'all' | 'baby' | 'medium' | 'semi' | 'concert'
export type FinishFilter    = 'all' | 'ebony' | 'walnut' | 'mahogany' | 'white' | 'other'
export type SortOrder       = 'default' | 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc'

export interface PianoFilters {
  query?:    string
  brand:     BrandFilter
  condition: ConditionFilter
  price:     PriceFilter
  size:      SizeFilter
  finish:    FinishFilter
}

// ── Brand slug → category mapping ────────────────────────────

export const BRAND_CATEGORY: Record<string, CategorySlug> = {
  'steinway':        'steinway',
  'shigeru-kawai':   'shigeru-kawai',
  'bosendorfer':     'european',
  'bechstein':       'european',
  'bluthner':        'european',
  'schimmel':        'european',
  'petrof':          'european',
  'fazioli':         'european',
  'steingraeber':    'european',
  'grotrian':        'european',
  'ibach':           'european',
  'august-forster':  'european',
}

export function getBrandCategory(brandSlug: string): CategorySlug {
  return BRAND_CATEGORY[brandSlug] ?? 'other'
}

// ── Size / finish bucketing ───────────────────────────────────

function parseSizeFt(size: string): number | null {
  const m = size.match(/^(\d+)'(\d*)/)
  if (!m) return null
  return parseInt(m[1]!, 10) + (m[2] ? parseInt(m[2], 10) / 12 : 0)
}

export function getSizeBucket(size: string): SizeFilter {
  const ft = parseSizeFt(size)
  if (ft === null) return 'other' as SizeFilter
  if (ft < 5.34) return 'baby'
  if (ft < 6.17) return 'medium'
  if (ft < 7.34) return 'semi'
  return 'concert'
}

export function getFinishBucket(finish: string): FinishFilter {
  const f = finish.toLowerCase()
  if (f.includes('ebony') || f.includes('black')) return 'ebony'
  if (f.includes('walnut'))                        return 'walnut'
  if (f.includes('mahogany'))                      return 'mahogany'
  if (f.includes('white') || f.includes('ivory'))  return 'white'
  return 'other'
}

// ── Filter option label arrays ────────────────────────────────

export const BRAND_TABS: { key: BrandFilter; label: string; sub?: string }[] = [
  { key: 'all',           label: 'All Instruments' },
  { key: 'steinway',      label: 'Steinway & Sons',  sub: 'Hamburg · New York'                  },
  { key: 'shigeru-kawai', label: 'Shigeru Kawai',    sub: 'Hamamatsu, Japan'                    },
  { key: 'european',      label: 'European',          sub: 'Bösendorfer · Bechstein · Blüthner' },
  { key: 'other',         label: 'Other',             sub: 'Yamaha · Kawai · More'               },
]

export const CONDITION_OPTS: { key: ConditionFilter; label: string }[] = [
  { key: 'all',           label: 'Any'          },
  { key: 'new',           label: 'New'          },
  { key: 'used',          label: 'Used'         },
  { key: 'reconditioned', label: 'Reconditioned'},
  { key: 'rebuilt',       label: 'Rebuilt'      },
]

export const PRICE_OPTS: { key: PriceFilter; label: string }[] = [
  { key: 'all',      label: 'Any'          },
  { key: 'under-25', label: 'Under $25k'   },
  { key: '25-50',    label: '$25k – $50k'  },
  { key: '50-100',   label: '$50k – $100k' },
  { key: 'over-100', label: '$100k+'       },
]

export const SIZE_OPTS: { key: SizeFilter; label: string }[] = [
  { key: 'all',     label: 'Any'          },
  { key: 'baby',    label: 'Baby Grand'   },
  { key: 'medium',  label: 'Medium'       },
  { key: 'semi',    label: 'Semi-Concert' },
  { key: 'concert', label: 'Concert'      },
]

export const FINISH_OPTS: { key: FinishFilter; label: string }[] = [
  { key: 'all',      label: 'Any'      },
  { key: 'ebony',    label: 'Ebony'    },
  { key: 'walnut',   label: 'Walnut'   },
  { key: 'mahogany', label: 'Mahogany' },
  { key: 'white',    label: 'White'    },
  { key: 'other',    label: 'Other'    },
]

export const SORT_OPTS: { key: SortOrder; label: string }[] = [
  { key: 'default',    label: 'Default'           },
  { key: 'price-asc',  label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
  { key: 'year-desc',  label: 'Year: Newest First' },
  { key: 'year-asc',   label: 'Year: Oldest First' },
]

// ── Core filter + sort functions ──────────────────────────────

export function filterPianos(pianos: Piano[], filters: PianoFilters): Piano[] {
  return pianos.filter(p => {
    // Text search across title, brand, model, finish, description, tags
    if (filters.query) {
      const q = filters.query.toLowerCase()
      const searchable = [
        p.title, p.brand, p.model, p.finish,
        p.description, p.tags.join(' '),
        p.size, String(p.year),
      ].join(' ').toLowerCase()
      if (!searchable.includes(q)) return false
    }

    // Brand category
    if (filters.brand !== 'all' && getBrandCategory(p.brandSlug) !== filters.brand) return false

    // Condition — normalise to lowercase
    if (filters.condition !== 'all') {
      const norm = p.condition.toLowerCase() as ConditionFilter
      if (norm !== filters.condition) return false
    }

    // Price
    if (filters.price !== 'all') {
      const price = p.price ?? Infinity
      if (filters.price === 'under-25' && price >= 25_000)                  return false
      if (filters.price === '25-50'    && (price < 25_000 || price > 50_000))  return false
      if (filters.price === '50-100'   && (price < 50_000 || price > 100_000)) return false
      if (filters.price === 'over-100' && price < 100_000)                  return false
    }

    // Size
    if (filters.size !== 'all' && getSizeBucket(p.size) !== filters.size) return false

    // Finish
    if (filters.finish !== 'all' && getFinishBucket(p.finish) !== filters.finish) return false

    return true
  })
}

export function sortPianos(pianos: Piano[], order: SortOrder): Piano[] {
  if (order === 'default') return pianos
  return [...pianos].sort((a, b) => {
    switch (order) {
      case 'price-asc':  return (a.price ?? Infinity) - (b.price ?? Infinity)
      case 'price-desc': return (b.price ?? Infinity) - (a.price ?? Infinity)
      case 'year-desc':  return b.year - a.year
      case 'year-asc':   return a.year - b.year
      default:           return 0
    }
  })
}
