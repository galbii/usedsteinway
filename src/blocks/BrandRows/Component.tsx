import React from 'react'
import Link from 'next/link'
import { queryBrands, type BrandRow as Brand } from '@/lib/payload/brands'

type RowSource = 'steinway' | 'european' | 'shigeru-kawai' | 'custom'

type RowConfig = {
  source?: RowSource | null
  heading?: string | null
  eyebrow?: string | null
  tagline?: string | null
  href?: string | null
  ctaLabel?: string | null
  tags?: Array<{ name: string; id?: string | null }> | null
  style?: 'light' | 'dark' | null
  id?: string | null
}

type BrandRowsBlockProps = {
  rows?: RowConfig[] | null
  blockType: 'brandRows'
  id?: string | null
  blockName?: string | null
  disableInnerContainer?: boolean
}

const C = {
  bg:          'hsl(36, 22%, 96%)',
  darkBg:      'hsl(350, 62%, 26%)',
  accent:      'hsl(40, 72%, 52%)',
  text:        'hsl(350, 12%, 11%)',
  muted:       'hsl(350, 5%, 46%)',
  border:      'hsl(36, 18%, 89%)',
  borderDark:  'hsl(350, 45%, 38%)',
  ivory:       'hsl(36, 22%, 96%)',
  accentDim:   'hsla(40, 72%, 52%, 0.12)',
}

// Canonical Steinway model ordering — mirrors the static homepage.
const STEINWAY_ORDER = ['model-s', 'model-m', 'model-o', 'model-a', 'model-b', 'model-c', 'model-d']

const tagStyle = (dark: boolean): React.CSSProperties =>
  dark
    ? { border: `1px solid rgba(245,235,220,0.16)`, color: 'rgba(245,235,220,0.44)' }
    : { backgroundColor: C.accentDim, color: 'hsl(40, 55%, 36%)' }

const btnStyle = (dark: boolean): React.CSSProperties =>
  dark
    ? { border: `1px solid ${C.borderDark}`, color: C.accent, backgroundColor: 'transparent' }
    : { backgroundColor: C.text, color: C.ivory }

type ResolvedRow = {
  eyebrow: string
  heading: string
  tagline: string
  href: string
  ctaLabel: string
  tags: string[]
  isDark: boolean
}

function brandEyebrow(brand?: Brand): string {
  if (!brand) return ''
  return [brand.country, brand.founded ? `Est. ${brand.founded}` : null]
    .filter(Boolean)
    .join(' · ')
}

// Derive a row's content from the live Brands collection, exactly as the
// static "Our Pianos" section does. Returns null for the custom source.
function deriveRow(source: RowSource, brands: Brand[]): ResolvedRow | null {
  if (source === 'steinway') {
    const steinway = brands.find((b) => b.category === 'steinway')
    const models = (steinway?.models ?? [])
      .filter((m) => STEINWAY_ORDER.includes(m.slug))
      .sort((a, b) => STEINWAY_ORDER.indexOf(a.slug) - STEINWAY_ORDER.indexOf(b.slug))
    return {
      eyebrow: brandEyebrow(steinway),
      heading: 'Steinway & Sons',
      tagline: steinway?.tagline ?? '',
      href: '/steinway',
      ctaLabel: 'Browse Collection',
      tags: models.map((m) => m.name),
      isDark: false,
    }
  }

  if (source === 'european') {
    const european = brands.filter((b) => b.category === 'european')
    return {
      eyebrow: 'Vienna · Berlin · Leipzig · Hradec Králové',
      heading: 'Handcrafted European',
      tagline: "The finest European ateliers — each instrument a life's work.",
      href: '/european-pianos',
      ctaLabel: 'Browse Collection',
      tags: european.map((b) => b.name),
      isDark: true,
    }
  }

  if (source === 'shigeru-kawai') {
    const shigeru = brands.find((b) => b.category === 'shigeru-kawai')
    const models = shigeru?.models.slice(0, 5) ?? []
    return {
      eyebrow: brandEyebrow(shigeru),
      heading: 'Shigeru Kawai',
      tagline: shigeru?.tagline ?? '',
      href: '/shigeru',
      ctaLabel: 'Browse Collection',
      tags: models.map((m) => m.name),
      isDark: false,
    }
  }

  return null
}

// Merge a configured row over its auto-derived base. Any override that's set
// wins; everything else falls back to the live brand data.
function resolveRow(row: RowConfig, brands: Brand[]): ResolvedRow | null {
  const source = (row.source ?? 'custom') as RowSource
  const base = deriveRow(source, brands)

  const overrideTags = (row.tags ?? []).map((t) => t.name).filter(Boolean)
  const heading = row.heading?.trim() || base?.heading || ''
  const href = row.href?.trim() || base?.href || ''

  // A custom row with nothing to show is skipped.
  if (!heading || !href) return null

  return {
    eyebrow: row.eyebrow?.trim() || base?.eyebrow || '',
    heading,
    tagline: row.tagline?.trim() || base?.tagline || '',
    href,
    ctaLabel: row.ctaLabel?.trim() || base?.ctaLabel || 'Browse Collection',
    tags: overrideTags.length > 0 ? overrideTags : (base?.tags ?? []),
    isDark: row.style ? row.style === 'dark' : (base?.isDark ?? false),
  }
}

// Default to the three canonical rows when nothing is configured.
const DEFAULT_ROWS: RowConfig[] = [
  { source: 'steinway' },
  { source: 'european' },
  { source: 'shigeru-kawai' },
]

export const BrandRowsBlock: React.FC<BrandRowsBlockProps> = async ({ rows }) => {
  const configuredRows = rows && rows.length > 0 ? rows : DEFAULT_ROWS

  let brands: Brand[] = []
  try {
    brands = await queryBrands()
  } catch {
    brands = []
  }

  const resolved = configuredRows
    .map((row) => resolveRow(row, brands))
    .filter((r): r is ResolvedRow => r !== null)

  if (resolved.length === 0) return null

  return (
    <section>
      {resolved.map((row, i) => (
        <Link
          key={i}
          href={row.href}
          className={`sr sr-d${i + 1} group block transition-colors duration-300`}
          style={{
            backgroundColor: row.isDark ? C.darkBg : C.bg,
            borderTop: `1px solid ${row.isDark ? C.borderDark : C.border}`,
          }}
        >
          {/* Gold sweep bar */}
          <div
            className="h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out"
            style={{ backgroundColor: C.accent }}
          />

          <div className="max-w-7xl mx-auto px-8 py-20">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">

              {/* Left — brand info */}
              <div className="min-w-0">
                {row.eyebrow && (
                  <p
                    className="font-display text-[11px] tracking-[0.45em] uppercase mb-6"
                    style={{ color: row.isDark ? 'rgba(245,235,220,0.32)' : C.muted }}
                  >
                    {row.eyebrow}
                  </p>
                )}

                <h3
                  className="font-light leading-[0.92]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(4.5rem, 9vw, 11rem)',
                    color: row.isDark ? C.ivory : C.text,
                  }}
                >
                  {row.heading}
                </h3>

                {row.tagline && (
                  <p
                    className="mt-6 text-lg leading-relaxed max-w-[38ch]"
                    style={{ color: row.isDark ? 'rgba(245,235,220,0.48)' : C.muted }}
                  >
                    {row.tagline}
                  </p>
                )}

                {row.tags.length > 0 && (
                  <div className="flex gap-3 flex-wrap mt-8">
                    {row.tags.map((tag, ti) => (
                      <span
                        key={ti}
                        className="font-display text-[9px] tracking-[0.20em] uppercase px-4 py-2"
                        style={tagStyle(row.isDark)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right — CTA */}
              <div className="shrink-0 pb-1">
                <div
                  className="inline-flex items-center gap-3 px-10 py-5 font-display text-[11px] tracking-[0.38em] uppercase transition-all duration-300 group-hover:gap-5"
                  style={btnStyle(row.isDark)}
                >
                  {row.ctaLabel}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>

            </div>
          </div>
        </Link>
      ))}
      <div style={{ borderTop: `1px solid ${C.border}` }} />
    </section>
  )
}
