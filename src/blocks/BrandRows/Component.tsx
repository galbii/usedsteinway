import React from 'react'
import Link from 'next/link'

type BrandRow = {
  heading: string
  eyebrow?: string | null
  tagline?: string | null
  href: string
  ctaLabel?: string | null
  tags?: Array<{ name: string; id?: string | null }> | null
  style?: 'light' | 'dark' | null
  id?: string | null
}

type BrandRowsBlockProps = {
  rows?: BrandRow[] | null
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
}

export const BrandRowsBlock: React.FC<BrandRowsBlockProps> = ({ rows }) => {
  const safeRows = rows ?? []
  if (safeRows.length === 0) return null

  return (
    <section>
      {safeRows.map((row, i) => {
        const isDark = row.style === 'dark'
        const tagStyle = isDark
          ? { border: `1px solid rgba(245,235,220,0.16)`, color: 'rgba(245,235,220,0.44)' }
          : { backgroundColor: 'hsla(40,72%,52%,0.12)', color: 'hsl(40,55%,36%)' }
        const btnStyle = isDark
          ? { border: `1px solid ${C.borderDark}`, color: C.accent, backgroundColor: 'transparent' }
          : { backgroundColor: C.text, color: C.ivory }

        return (
          <Link
            key={row.id ?? i}
            href={row.href}
            className="group block transition-colors duration-300"
            style={{
              backgroundColor: isDark ? C.darkBg : C.bg,
              borderTop: `1px solid ${isDark ? C.borderDark : C.border}`,
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
                      style={{ color: isDark ? 'rgba(245,235,220,0.32)' : C.muted }}
                    >
                      {row.eyebrow}
                    </p>
                  )}

                  <h3
                    className="font-light leading-[0.92]"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 'clamp(4.5rem, 9vw, 11rem)',
                      color: isDark ? C.ivory : C.text,
                    }}
                  >
                    {row.heading}
                  </h3>

                  {row.tagline && (
                    <p
                      className="mt-6 text-lg leading-relaxed max-w-[38ch]"
                      style={{ color: isDark ? 'rgba(245,235,220,0.48)' : C.muted }}
                    >
                      {row.tagline}
                    </p>
                  )}

                  {row.tags && row.tags.length > 0 && (
                    <div className="flex gap-3 flex-wrap mt-8">
                      {row.tags.map((tag, ti) => (
                        <span
                          key={tag.id ?? ti}
                          className="font-display text-[9px] tracking-[0.20em] uppercase px-4 py-2"
                          style={tagStyle}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right — CTA */}
                <div className="shrink-0 pb-1">
                  <div
                    className="inline-flex items-center gap-3 px-10 py-5 font-display text-[11px] tracking-[0.38em] uppercase transition-all duration-300 group-hover:gap-5"
                    style={btnStyle}
                  >
                    {row.ctaLabel ?? 'Browse Collection'}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>

              </div>
            </div>
          </Link>
        )
      })}
      <div style={{ borderTop: `1px solid ${C.border}` }} />
    </section>
  )
}
