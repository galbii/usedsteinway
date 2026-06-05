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

export function parseSizeFt(size: string): number | null {
  // Matches: 6'10  6'1  8'11.75  7'4"  — feet + decimal inches
  const m = size.match(/^(\d+)'(\d+(?:\.\d+)?)/)
  if (!m) return null
  return parseInt(m[1]!, 10) + parseFloat(m[2]!) / 12
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

// ── Search normalisation + fuzzy matching ─────────────────────
// Strips diacritics so "bo" matches "Bösendorfer" and "blutner" matches "Blüthner".
// Falls back to a token-level Damerau-Levenshtein search for misspellings
// like "bosendorefer" → "Bosendorfer".

export function normalizeForSearch(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}

function damerauLevenshtein(a: string, b: string): number {
  const m = a.length, n = b.length
  if (m === 0) return n
  if (n === 0) return m
  const d: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) d[i]![0] = i
  for (let j = 0; j <= n; j++) d[0]![j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      d[i]![j] = Math.min(
        d[i - 1]![j]! + 1,
        d[i]![j - 1]! + 1,
        d[i - 1]![j - 1]! + cost,
      )
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i]![j] = Math.min(d[i]![j]!, d[i - 2]![j - 2]! + 1)
      }
    }
  }
  return d[m]![n]!
}

// Looser as the query grows: 3-5 chars → 1 edit, 6-11 → 2, 12+ → 3+
function fuzzyThreshold(qLen: number): number {
  return Math.max(1, Math.floor(qLen / 6))
}

function fuzzyTokenMatch(query: string, text: string): boolean {
  const qLen = query.length
  if (qLen < 3) return false
  const threshold = fuzzyThreshold(qLen)
  const tokens = text.split(/[\s\-/]+/).filter(t => t.length >= 3)
  return tokens.some(t => {
    if (Math.abs(t.length - qLen) > threshold) return false
    return damerauLevenshtein(query, t) <= threshold
  })
}

// ── Core filter + sort functions ──────────────────────────────

export function filterPianos(pianos: Piano[], filters: PianoFilters): Piano[] {
  // Pre-normalise the query once; cheap but adds up across many items.
  const q = filters.query ? normalizeForSearch(filters.query) : ''

  return pianos.filter(p => {
    // Text search — diacritic-insensitive substring, fuzzy fallback on key fields.
    if (q.length > 0) {
      const fullText = normalizeForSearch(
        [p.title, p.brand, p.model, p.finish, p.description, p.tags.join(' '), String(p.year)].join(' '),
      )
      if (!fullText.includes(q)) {
        // Fuzzy match only on high-signal fields (brand/model/title) to avoid
        // accidental matches against long description prose.
        const keyFields = normalizeForSearch([p.brand, p.model, p.title].join(' '))
        if (!fuzzyTokenMatch(q, keyFields)) return false
      }
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
    if (filters.size !== 'all' && getSizeBucket(p.specs['Length'] ?? '') !== filters.size) return false

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
