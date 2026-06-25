import React from 'react'

type Card = {
  title?: string | null
  body?: string | null
  id?: string | null
}

type CardGridBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  intro?: string | null
  columns?: ('2' | '3' | '4') | null
  showNumbers?: boolean | null
  cards?: Array<Card> | null
  closingText?: string | null
  bgStyle?: ('burgundy' | 'charcoal' | 'cream' | 'black') | null
  blockType: 'cardGrid'
  id?: string | null
  blockName?: string | null
  disableInnerContainer?: boolean
}

// Generic fallbacks so an empty block still renders something sensible
const DEFAULT_COLUMNS: '2' | '3' | '4' = '3'
const DEFAULT_BG: 'burgundy' | 'charcoal' | 'cream' | 'black' = 'charcoal'
const DEFAULT_CARDS: Card[] = [
  { title: 'First\nFeature', body: 'A short supporting line describing this feature.' },
  { title: 'Second\nFeature', body: 'A short supporting line describing this feature.' },
  { title: 'Third\nFeature', body: 'A short supporting line describing this feature.' },
]

// Section background — Tailwind needs full literal class names
const BG_MAP: Record<'burgundy' | 'charcoal' | 'cream' | 'black', string> = {
  burgundy: 'bg-piano-burgundy',
  charcoal: 'bg-piano-charcoal',
  cream: 'bg-piano-cream',
  black: 'bg-piano-black',
}

// Column counts — static literals so Tailwind can see them
const COL_MAP: Record<'2' | '3' | '4', string> = {
  '2': 'lg:grid-cols-2',
  '3': 'lg:grid-cols-3',
  '4': 'lg:grid-cols-4',
}

type Theme = {
  heading: string
  eyebrowRule: string
  eyebrow: string
  intro: string
  cardBg: string
  cardTitle: string
  cardBody: string
  closing: string
}

const DARK_THEME: Theme = {
  heading: 'text-piano-cream',
  eyebrowRule: 'bg-piano-gold/50',
  eyebrow: 'text-piano-gold/70',
  intro: 'text-piano-silver/85',
  cardBg: 'bg-piano-black',
  cardTitle: 'text-piano-cream',
  cardBody: 'text-piano-silver/85',
  closing: 'text-piano-silver/75',
}

const CREAM_THEME: Theme = {
  heading: 'text-piano-black',
  eyebrowRule: 'bg-piano-gold/50',
  eyebrow: 'text-piano-gold',
  intro: 'text-piano-stone',
  cardBg: 'bg-white',
  cardTitle: 'text-piano-black',
  cardBody: 'text-piano-stone',
  closing: 'text-piano-stone',
}

export const CardGridBlock: React.FC<CardGridBlockProps> = ({
  eyebrow,
  heading,
  intro,
  columns,
  showNumbers,
  cards,
  closingText,
  bgStyle,
}) => {
  const bg = bgStyle || DEFAULT_BG
  const cols = columns || DEFAULT_COLUMNS
  const theme: Theme = bg === 'cream' ? CREAM_THEME : DARK_THEME

  const sectionBg = BG_MAP[bg]
  const colClass = COL_MAP[cols]

  const items = cards && cards.length > 0 ? cards : DEFAULT_CARDS
  const hasCards = items.length > 0

  return (
    <section className={`${sectionBg} py-28 md:py-36 px-8 overflow-hidden`}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        {(eyebrow || heading || intro) && (
          <div className="mb-20 max-w-2xl">
            {eyebrow && (
              <div className="sr flex items-center gap-5 mb-6">
                <div className={`h-px w-8 shrink-0 ${theme.eyebrowRule}`} />
                <p
                  className={`font-display text-[11px] tracking-[0.5em] uppercase ${theme.eyebrow}`}
                >
                  {eyebrow}
                </p>
              </div>
            )}
            {heading && (
              <h2
                className={`sr sr-d1 font-cormorant font-light leading-[0.95] ${theme.heading}`}
                style={{ fontSize: 'clamp(2.8rem, 5vw, 6rem)', whiteSpace: 'pre-line' }}
              >
                {heading}
              </h2>
            )}
            {intro && (
              <p
                className={`sr sr-d2 mt-6 text-[1.0625rem] leading-[1.85] ${theme.intro}`}
              >
                {intro}
              </p>
            )}
          </div>
        )}

        {/* Grid */}
        {hasCards && showNumbers && (
          <div
            className={`grid grid-cols-1 ${colClass} divide-y lg:divide-y-0 lg:divide-x divide-piano-gold/15`}
          >
            {items.map((card, i) => {
              const num = String(i + 1).padStart(2, '0')
              const padding =
                i === 0 ? 'lg:pr-14' : i === items.length - 1 ? 'lg:pl-14' : 'lg:px-14'
              return (
                <div
                  key={card.id || i}
                  className={`sr sr-d${(i % 4) + 1} py-10 lg:py-0 ${padding}`}
                >
                  <p className="font-display text-[10px] tracking-[0.5em] uppercase text-piano-gold/50 mb-6">
                    {num}
                  </p>
                  <div className="h-px w-10 bg-piano-gold/30 mb-6" />
                  {card.title && (
                    <h3
                      className={`font-cormorant font-light mb-6 leading-[1.1] ${theme.cardTitle}`}
                      style={{ fontSize: 'clamp(1.9rem, 2.4vw, 2.5rem)', whiteSpace: 'pre-line' }}
                    >
                      {card.title}
                    </h3>
                  )}
                  {card.body && (
                    <p className={`text-[1rem] leading-[1.85] ${theme.cardBody}`}>{card.body}</p>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {hasCards && !showNumbers && (
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${colClass} gap-px bg-piano-gold/10`}>
            {items.map((card, i) => (
              <div
                key={card.id || i}
                className={`sr sr-d${(i % 4) + 1} ${theme.cardBg} px-8 py-10 border-t-2 border-t-piano-gold/0 hover:border-t-piano-gold/40 transition-colors duration-500`}
              >
                {card.title && (
                  <h3
                    className={`font-cormorant font-light mb-5 leading-[1.1] ${theme.cardTitle}`}
                    style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)', whiteSpace: 'pre-line' }}
                  >
                    {card.title}
                  </h3>
                )}
                <div className="h-px w-8 bg-piano-gold/30 mb-5" />
                {card.body && (
                  <p className={`text-[0.9375rem] leading-[1.85] ${theme.cardBody}`}>{card.body}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Closing */}
        {closingText && (
          <p
            className={`sr mt-14 text-[1rem] leading-[1.85] ${theme.closing}`}
            style={{ maxWidth: '60ch' }}
          >
            {closingText}
          </p>
        )}

      </div>
    </section>
  )
}
