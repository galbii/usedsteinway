'use client'

import { useState } from 'react'
import { PianoBrowser } from '@/components/piano/PianoBrowser'
import { PianoReorderCard } from '@/components/piano/PianoReorderCard'
import { AdminReorderButton } from '@/components/admin/reorder/AdminReorderButton'
import { AdminReorderGrid } from '@/components/admin/reorder/AdminReorderGrid'
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
    tags:    ['Model M', 'Model A', 'Model B', 'Model C', 'Model D'],
  },
  {
    brand:   'european',
    label:   'European Handcrafted',
    eyebrow: 'Vienna · Berlin · Leipzig · Prague',
    dark:    true,
    tags:    ['Bechstein', 'Blüthner', 'Bösendorfer', 'Petrof', 'Schimmel'],
  },
  {
    brand:   'shigeru-kawai',
    label:   'Shigeru Kawai',
    eyebrow: 'Hamamatsu, Japan',
    dark:    false,
    tags:    ['SK-2', 'SK-3', 'SK-5', 'SK-6', 'SK-EX'],
  },
]

export function PianosPageClient({ pianos: initialPianos }: Props) {
  const [activeBrand, setActiveBrand] = useState<BrandFilter>('all')
  const [pianos, setPianos] = useState<Piano[]>(initialPianos)
  const [reorderMode, setReorderMode] = useState(false)

  const counts: Record<string, number> = {
    steinway:      pianos.filter(p => getBrandCategory(p.brandSlug) === 'steinway').length,
    european:      pianos.filter(p => getBrandCategory(p.brandSlug) === 'european').length,
    'shigeru-kawai': pianos.filter(p => getBrandCategory(p.brandSlug) === 'shigeru-kawai').length,
  }

  if (reorderMode) {
    return (
      <>
        <AdminReorderGrid<Piano>
          items={pianos}
          collection="pianos"
          renderCardBody={(piano) => <PianoReorderCard piano={piano} />}
          onSaved={(updated) => {
            setPianos(updated)
            setReorderMode(false)
          }}
          onCancel={() => setReorderMode(false)}
        />
        <AdminReorderButton value={reorderMode} onChange={setReorderMode} />
      </>
    )
  }

  function handleBlockClick(brand: BrandFilter) {
    const next = activeBrand === brand ? 'all' : brand
    setActiveBrand(next)
    // Always scroll to the top of the inventory so the user sees results from the beginning
    setTimeout(() => {
      document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  return (
    <>
      {/* ── Category blocks ── */}
      <section aria-label="Browse by category">
        {/* Entry animation shimmer line */}
        <div
          style={{
            height: '1px',
            background: `linear-gradient(to right, transparent, ${C.accent}, transparent)`,
            animation: 'piano-block-in 1s cubic-bezier(0.16, 1, 0.3, 1) both',
            animationDelay: '0ms',
            opacity: 0.4,
          }}
        />

        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}
          className="max-sm:grid-cols-1"
        >
          {BLOCKS.map((block, index) => {
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
                className="group text-left w-full focus-visible:outline-none"
                style={{
                  backgroundColor: bgColor,
                  borderTop:       `1px solid ${borderColor}`,
                  position:        'relative',
                  cursor:          'pointer',
                  overflow:        'hidden',
                  transform:       'translateZ(0)', // promote to its own layer for smooth animations
                  animation:       `piano-block-in 0.75s cubic-bezier(0.16, 1, 0.3, 1) both`,
                  animationDelay:  `${index * 110}ms`,
                }}
                aria-pressed={isActive}
              >
                {/* Gold top bar — sweeps in on active */}
                <div
                  style={{
                    height:          '3px',
                    backgroundColor: C.accent,
                    width:           isActive ? '100%' : '0',
                    position:        'absolute',
                    top:             0,
                    left:            0,
                    transition:      'width 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex:          2,
                  }}
                />

                {/* Hover bar (only when not active) */}
                {!isActive && (
                  <div
                    className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full"
                    style={{
                      backgroundColor: C.accent,
                      opacity:         0.4,
                      transition:      'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                )}

                {/* Active overlay — subtle gold wash */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundColor: block.dark
                      ? 'rgba(180, 130, 60, 0.07)'
                      : 'rgba(180, 130, 60, 0.05)',
                    opacity:    isActive ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                    zIndex:     1,
                  }}
                />

                {/* Shimmer sweep on activation */}
                {isActive && (
                  <div
                    className="absolute inset-y-0 pointer-events-none"
                    style={{
                      width:           '60%',
                      background:      block.dark
                        ? 'linear-gradient(90deg, transparent, rgba(255,200,100,0.06), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(255,200,100,0.1), transparent)',
                      animation:       'piano-shimmer 0.9s cubic-bezier(0.4, 0, 0.6, 1) both',
                      zIndex:          2,
                    }}
                  />
                )}

                <div
                  style={{
                    padding:  'clamp(2.5rem, 4vw, 4rem) clamp(2rem, 3.5vw, 3.5rem)',
                    position: 'relative',
                    zIndex:   3,
                  }}
                >
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
                      fontSize:     'clamp(2.2rem, 4vw, 4.5rem)',
                      color:        textColor,
                      marginBottom: '1.25rem',
                      transition:   'color 0.3s ease',
                    }}
                  >
                    {block.label}
                  </h3>

                  {/* Model tags */}
                  {block.tags && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {block.tags.map((t, ti) => (
                        <span
                          key={t}
                          className="font-display uppercase"
                          style={{
                            fontSize:       '9px',
                            letterSpacing:  '0.18em',
                            padding:        '0.35rem 0.75rem',
                            transition:     'all 0.3s ease',
                            transitionDelay: `${ti * 25}ms`,
                            ...(isActive
                              ? block.dark
                                ? { border: '1px solid rgba(245,235,220,0.28)', color: 'rgba(245,235,220,0.7)' }
                                : { backgroundColor: 'hsla(40, 72%, 52%, 0.2)', color: 'hsl(40, 55%, 32%)' }
                              : tagStyle
                            ),
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer row: active indicator */}
                  <div
                    className="flex items-center justify-end"
                    style={{
                      paddingTop:  '1.25rem',
                      borderTop:   `1px solid ${isActive ? (block.dark ? 'rgba(180,130,60,0.3)' : 'rgba(180,130,60,0.25)') : borderColor}`,
                      marginTop:   '0.5rem',
                      transition:  'border-color 0.4s ease',
                    }}
                  >
                    <span
                      className="font-display uppercase flex items-center gap-2 group-hover:gap-3"
                      style={{
                        fontSize:      '10px',
                        letterSpacing: '0.32em',
                        color:         isActive ? C.accent : muteColor,
                        transition:    'color 0.35s ease, gap 0.25s ease',
                      }}
                    >
                      {isActive ? 'See less ✓' : 'See more'}
                      {!isActive && (
                        <span
                          className="group-hover:translate-x-1 transition-transform duration-300"
                          style={{ display: 'inline-block' }}
                        >
                          →
                        </span>
                      )}
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

      <AdminReorderButton value={reorderMode} onChange={setReorderMode} />
    </>
  )
}
