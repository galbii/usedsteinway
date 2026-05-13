import React from 'react'

type TickerBlockProps = {
  items?: Array<{ text: string; id?: string | null }> | null
  style?: 'dark' | 'light' | null
  blockType: 'ticker'
  id?: string | null
  blockName?: string | null
  disableInnerContainer?: boolean
}

const C = {
  darkBg:     'hsl(350, 62%, 26%)',
  darkBorder: 'hsl(350, 45%, 38%)',
  bg:         'hsl(36, 22%, 96%)',
  border:     'hsl(36, 18%, 89%)',
  text:       'hsl(350, 12%, 11%)',
}

export const TickerBlock: React.FC<TickerBlockProps> = ({ items, style }) => {
  const variant = style ?? 'dark'
  const safeItems = items ?? []

  if (safeItems.length === 0) return null

  const isDark = variant === 'dark'

  return (
    <div
      className="h-16 flex items-center overflow-hidden"
      style={{
        backgroundColor: isDark ? C.darkBg : C.bg,
        borderTop:    `1px solid ${isDark ? C.darkBorder : C.border}`,
        borderBottom: `1px solid ${isDark ? C.darkBorder : C.border}`,
      }}
    >
      <div className="flex items-center animate-ticker whitespace-nowrap">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center shrink-0">
            {safeItems.map((item, idx) => (
              <span
                key={`${i}-${idx}`}
                className="font-display text-[13px] font-semibold tracking-[0.25em] uppercase px-8"
                style={{ color: isDark ? 'rgba(255,255,255,0.96)' : C.text }}
              >
                {item.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
