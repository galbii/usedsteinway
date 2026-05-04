'use client'

import { useState } from 'react'
import { PianoBrowser } from '@/components/piano/PianoBrowser'
import { type BrandFilter, getBrandCategory } from '@/lib/pianoFilters'
import type { Piano } from '@/types/piano'

interface Props {
  pianos: Piano[]
}

const C = {
  bg:         'hsl(36, 22%, 96%)',
  darkBg:     'hsl(350, 62%, 26%)',
  charcoal:   'hsl(25, 5%, 12%)',
  accent:     'hsl(40, 72%, 52%)',
  muted:      'hsl(350, 5%, 46%)',
  mutedDark:  'rgba(245,235,220,0.38)',
  border:     'hsl(36, 18%, 89%)',
  borderDark: 'hsl(350, 45%, 38%)',
  ivory:      'hsl(36, 22%, 96%)',
  tagLight:   { backgroundColor: 'hsla(40, 72%, 52%, 0.12)', color: 'hsl(40, 55%, 36%)' } as const,
  tagDark:    { border: '1px solid rgba(245,235,220,0.16)', color: 'rgba(245,235,220,0.44)' } as const,
}

type BlockDef = {
  brand: BrandFilter
  label: string
  eyebrow: string
  dark: boolean
  tags?: string[]
}

const BLOCKS: BlockDef[] = [
  {
    brand:   'steinway',
    label:   'Steinway & Sons',
    eyebrow: 'Hamburg · New York',
    dark:    false,
    tags:    ['Model B', 'Model C', 'Model D', 'Model A', 'Model M'],
  },
  {
    brand:   'european',
    label:   'European Handcrafted',
    eyebrow: 'Vienna · Berlin · Leipzig · Prague',
    dark:    true,
    tags:    ['Bösendorfer', 'Bechstein', 'Blüthner', 'Schimmel', 'Petrof'],
  },
  {
    brand:   'shigeru-kawai',
    label:   'Shigeru Kawai',
    eyebrow: 'Hamamatsu, Japan',
    dark:    false,
    tags:    ['SK-2', 'SK-3', 'SK-6'],
  },
]

export function PianosPageClient({ pianos }: Props) {
  const [activeBrand, setActiveBrand] = useState<BrandFilter>('all')

  const counts: Record<string, number> = {
    steinway:      pianos.filter(p => getBrandCategory(p.brandSlug) === 'steinway').length,
    european:      pianos.filter(p => getBrandCategory(p.brandSlug) === 'european').length,
    'shigeru-kawai': pianos.filter(p => getBrandCategory(p.brandSlug) === 'shigeru-kawai').length,
  }

  function handleBlockClick(brand: BrandFilter) {
    const next = activeBrand === brand ? 'all' : brand
    setActiveBrand(next)
    if (next !== 'all') {
      document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      {/* ── Category blocks ── */}
      <section aria-label="Browse by category">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} className="max-sm:grid-cols-1">
          {BLOCKS.map((block) => {
            const isActive = activeBrand === block.brand
            const count    = counts[block.brand as string] ?? 0
            const bgColor  = block.dark ? C.darkBg : C.bg
            const textColor = block.dark ? C.ivory : C.charcoal
            const muteColor = block.dark ? C.mutedDark : C.muted
            const borderColor = block.dark ? C.borderDark : C.border
            const tagStyle  = block.dark ? C.tagDark : C.tagLight

            return (
              <button
                key={block.brand}
                type="button"
                onClick={() => handleBlockClick(block.brand)}
                className="group text-left w-full transition-all duration-300 focus-visible:outline-none"
                style={{
                  backgroundColor: bgColor,
                  borderTop:       `1px solid ${borderColor}`,
                  position:        'relative',
                  cursor:          'pointer',
                }}
                aria-pressed={isActive}
              >
                {/* Accent top bar */}
                <div
                  className="transition-all duration-500 ease-out"
                  style={{
                    height:          '3px',
                    backgroundColor: C.accent,
                    width:           isActive ? '100%' : '0',
                    position:        'absolute',
                    top:             0,
                    left:            0,
                  }}
                />
                {/* Hover bar (only when not active) */}
                {!isActive && (
                  <div
                    className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                    style={{ backgroundColor: C.accent, opacity: 0.5 }}
                  />
                )}

                <div style={{ padding: 'clamp(2.5rem, 4vw, 4rem) clamp(2rem, 3.5vw, 3.5rem)' }}>
                  {/* Eyebrow */}
                  <p
                    className="font-display uppercase mb-5"
                    style={{ fontSize: '10px', letterSpacing: '0.42em', color: muteColor }}
                  >
                    {block.eyebrow}
                  </p>

                  {/* Brand name */}
                  <h3
                    className="font-cormorant font-light leading-[0.9]"
                    style={{
                      fontSize:  'clamp(2.2rem, 4vw, 4.5rem)',
                      color:     textColor,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {block.label}
                  </h3>

                  {/* Model tags */}
                  {block.tags && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {block.tags.map((t) => (
                        <span
                          key={t}
                          className="font-display uppercase"
                          style={{ fontSize: '9px', letterSpacing: '0.18em', padding: '0.35rem 0.75rem', ...tagStyle }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer row: count + active indicator */}
                  <div
                    className="flex items-center justify-between"
                    style={{ paddingTop: '1.25rem', borderTop: `1px solid ${borderColor}`, marginTop: '0.5rem' }}
                  >
                    <span
                      className="font-display uppercase"
                      style={{ fontSize: '10px', letterSpacing: '0.32em', color: muteColor }}
                    >
                      {count} {count === 1 ? 'instrument' : 'instruments'}
                    </span>

                    <span
                      className="font-display uppercase flex items-center gap-2 transition-all duration-300 group-hover:gap-3"
                      style={{
                        fontSize:     '10px',
                        letterSpacing:'0.32em',
                        color:        isActive ? C.accent : muteColor,
                      }}
                    >
                      {isActive ? 'Filtered ✓' : 'Filter'}
                      {!isActive && <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Bottom border */}
        <div style={{ height: '1px', backgroundColor: C.border }} />
      </section>

      {/* ── Inventory grid ── */}
      <div id="inventory">
        <PianoBrowser pianos={pianos} initialBrandFilter={activeBrand} />
      </div>
    </>
  )
}
