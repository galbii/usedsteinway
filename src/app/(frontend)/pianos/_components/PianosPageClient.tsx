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
      {/* ── Category block styles ──
          Desktop: brand name at rest; eyebrow + tags reveal on hover/focus/active.
          The "Press to view" CTA is ALWAYS visible — the persistent tap affordance.
          Mobile (≤640px): single column, compact, everything legible (no hover needed). */}
      <style>{`
        .pcat-grid { display: grid; grid-template-columns: repeat(3, 1fr); }

        /* Cards stretch to equal height; content is a flex column so the
           CTA can pin to the bottom edge regardless of card height. */
        .pblock-inner {
          display: flex;
          flex-direction: column;
          width: 100%;
          min-height: 24rem;
          padding: clamp(2.5rem, 4vw, 4rem) clamp(2rem, 3.5vw, 3.5rem);
        }

        /* Press-to-view affordance — pinned to the bottom of every card */
        .pblock-cta { margin-top: auto; }
        .pblock-cta-arrow {
          display: inline-block;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (hover: hover) {
          .pblock-reveal {
            opacity: 0;
            transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
          }
          .pblock-eyebrow { transform: translateY(-6px); }
          .pblock-tags    { transform: translateY(8px); }

          .pblock-tag-item {
            opacity: 0;
            transform: translateY(6px);
            transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .pblock-brand {
            transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: transform;
          }

          /* The hover/active reveal */
          .pblock:hover .pblock-reveal,
          .pblock:focus-visible .pblock-reveal,
          .pblock[data-active="true"] .pblock-reveal,
          .pblock:hover .pblock-tag-item,
          .pblock:focus-visible .pblock-tag-item,
          .pblock[data-active="true"] .pblock-tag-item {
            opacity: 1;
            transform: translateY(0);
          }

          /* Brand name lifts subtly */
          .pblock:hover .pblock-brand,
          .pblock:focus-visible .pblock-brand,
          .pblock[data-active="true"] .pblock-brand {
            transform: translateY(-3px);
          }

          /* Timing: eyebrow → tags (staggered) */
          .pblock:hover .pblock-eyebrow,
          .pblock:focus-visible .pblock-eyebrow,
          .pblock[data-active="true"] .pblock-eyebrow { transition-delay: 40ms; }

          .pblock:hover .pblock-tag-item:nth-child(1),
          .pblock:focus-visible .pblock-tag-item:nth-child(1),
          .pblock[data-active="true"] .pblock-tag-item:nth-child(1) { transition-delay: 120ms; }
          .pblock:hover .pblock-tag-item:nth-child(2),
          .pblock:focus-visible .pblock-tag-item:nth-child(2),
          .pblock[data-active="true"] .pblock-tag-item:nth-child(2) { transition-delay: 160ms; }
          .pblock:hover .pblock-tag-item:nth-child(3),
          .pblock:focus-visible .pblock-tag-item:nth-child(3),
          .pblock[data-active="true"] .pblock-tag-item:nth-child(3) { transition-delay: 200ms; }
          .pblock:hover .pblock-tag-item:nth-child(4),
          .pblock:focus-visible .pblock-tag-item:nth-child(4),
          .pblock[data-active="true"] .pblock-tag-item:nth-child(4) { transition-delay: 240ms; }
          .pblock:hover .pblock-tag-item:nth-child(5),
          .pblock:focus-visible .pblock-tag-item:nth-child(5),
          .pblock[data-active="true"] .pblock-tag-item:nth-child(5) { transition-delay: 280ms; }

          /* Arrow on the CTA nudges forward on hover */
          .pblock:hover .pblock-cta-arrow,
          .pblock:focus-visible .pblock-cta-arrow { transform: translateX(6px); }
        }

        /* ── Mobile: single column, compact, fully legible (no hover dependency) ── */
        @media (max-width: 640px) {
          .pcat-grid { grid-template-columns: 1fr; }
          .pblock-inner {
            min-height: 0;
            padding: 1.6rem 1.5rem;
          }
          /* Reveal the eyebrow that desktop tucks behind hover */
          .pblock-reveal   { opacity: 1 !important; transform: none !important; }
          .pblock-tag-item { opacity: 1 !important; transform: none !important; }
          /* Model tags stay a desktop-only delight — keep mobile cards uncluttered */
          .pblock-tags { display: none; }
        }
      `}</style>

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

        <div className="pcat-grid">
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
                className="pblock group text-left w-full focus-visible:outline-none"
                data-active={isActive ? 'true' : 'false'}
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
                aria-label={`${block.label} — ${count} instrument${count === 1 ? '' : 's'}`}
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
                  className="pblock-inner"
                  style={{ position: 'relative', zIndex: 3 }}
                >
                  {/* Eyebrow — location. Tucked behind hover on desktop, always shown on mobile. */}
                  <p
                    className="pblock-reveal pblock-eyebrow font-display uppercase mb-5"
                    style={{ fontSize: '10px', letterSpacing: '0.42em', color: muteColor }}
                  >
                    {block.eyebrow}
                  </p>

                  {/* Brand name — the anchor, always visible */}
                  <h3
                    className="pblock-brand font-cormorant font-light leading-[0.9]"
                    style={{
                      fontSize:     'clamp(2.2rem, 4vw, 4.5rem)',
                      color:        textColor,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {block.label}
                  </h3>

                  {/* Model tags — desktop hover delight, hidden on mobile */}
                  {block.tags && (
                    <div className="pblock-reveal pblock-tags flex flex-wrap gap-2">
                      {block.tags.map(t => (
                        <span
                          key={t}
                          className="pblock-tag-item font-display uppercase"
                          style={{
                            fontSize:       '9px',
                            letterSpacing:  '0.18em',
                            padding:        '0.35rem 0.75rem',
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

                  {/* ── Press-to-view overlay — always visible, the primary tap affordance ── */}
                  <div
                    className="pblock-cta flex items-end justify-between gap-4"
                    style={{
                      paddingTop:  '1.25rem',
                      borderTop:   `1px solid ${isActive ? (block.dark ? 'rgba(180,130,60,0.3)' : 'rgba(180,130,60,0.25)') : borderColor}`,
                      transition:  'border-color 0.4s ease',
                    }}
                  >
                    <span
                      className="font-display uppercase leading-[1.6]"
                      style={{
                        fontSize:      '10px',
                        letterSpacing: '0.22em',
                        color:         isActive
                          ? C.accent
                          : (block.dark ? 'rgba(245,235,220,0.66)' : muteColor),
                        transition:    'color 0.35s ease',
                      }}
                    >
                      {isActive ? (
                        <>Now viewing<span aria-hidden="true"> ✓</span></>
                      ) : (
                        <>
                          Press to view {block.label}{' '}
                          <span className="pblock-cta-arrow" aria-hidden="true">→</span>
                        </>
                      )}
                    </span>

                    {count > 0 && (
                      <span
                        className="font-display uppercase tabular-nums shrink-0 whitespace-nowrap"
                        style={{
                          fontSize:      '10px',
                          letterSpacing: '0.28em',
                          color:         muteColor,
                        }}
                      >
                        {count} available
                      </span>
                    )}
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
