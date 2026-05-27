import React from 'react'

type SectionHeaderBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  tagline?: string | null
  style?: 'dark' | 'light' | null
  blockType: 'sectionHeader'
  id?: string | null
  blockName?: string | null
  disableInnerContainer?: boolean
}

const C = {
  bg:       'hsl(36, 22%, 96%)',
  charcoal: 'hsl(25, 5%, 12%)',
  accent:   'hsl(40, 72%, 52%)',
  text:     'hsl(350, 12%, 11%)',
  muted:    'hsl(350, 5%, 46%)',
  border:   'hsl(36, 18%, 89%)',
  ivory:    'hsl(36, 22%, 96%)',
}

export const SectionHeaderBlock: React.FC<SectionHeaderBlockProps> = ({
  eyebrow,
  heading,
  tagline,
  style,
}) => {
  if (!heading) return null

  const isDark = (style ?? 'dark') === 'dark'
  const bgColor = isDark ? C.charcoal : C.bg
  const headingColor = isDark ? C.ivory : C.text
  const dividerColor = isDark ? 'rgba(255,255,255,0.08)' : C.border
  const taglineColor = isDark ? C.accent : C.muted

  return (
    <section style={{ backgroundColor: bgColor }}>
      <div className="max-w-7xl mx-auto px-8 pt-24 pb-0">

        {eyebrow && (
          <div className="sr flex items-center gap-5 mb-14">
            <div className="h-px w-12 shrink-0" style={{ backgroundColor: C.accent }} />
            <span
              className="font-display text-[10px] tracking-[0.55em] uppercase"
              style={{ color: C.accent }}
            >
              {eyebrow}
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: dividerColor }} />
          </div>
        )}

        <div
          className="sr flex flex-col xl:flex-row xl:items-end justify-between gap-10 pb-20"
          style={{ borderBottom: `1px solid ${dividerColor}` }}
        >
          <h2
            className="font-light leading-[0.88] shrink-0"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(5.5rem, 13vw, 14rem)',
              color: headingColor,
              letterSpacing: '-0.015em',
            }}
          >
            {heading}
          </h2>

          {tagline && (
            <div className="xl:text-right space-y-5 shrink-0 pb-2">
              <p
                className="text-base leading-relaxed xl:max-w-[28ch] xl:ml-auto"
                style={{ color: taglineColor }}
              >
                {tagline}
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
