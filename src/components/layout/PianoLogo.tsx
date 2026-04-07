import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/utilities/ui'

// ─── Brand tokens ────────────────────────────────────────────────────────────
// Update these to change the logo across the entire site.

/** SW monogram image — place in /public and update path here */
const MONOGRAM_SRC = '/UsedSteinway.png'

/** Wordmark text displayed next to the monogram */
const WORDMARK_TEXT = 'UsedSteinway'

/** Wordmark color on dark backgrounds (header, dark sections) */
const WORDMARK_COLOR_DARK = 'hsl(42, 82%, 62%)'

/** Wordmark color on light backgrounds (hero, footer) */
const WORDMARK_COLOR_LIGHT = 'hsl(350, 12%, 11%)'

/** Serif font for the wordmark */
const WORDMARK_FONT = "'Cormorant Garamond', serif"

/** Letter spacing for the wordmark */
const WORDMARK_TRACKING = '0.06em'

// ─── Size scale ───────────────────────────────────────────────────────────────
const MONOGRAM_PX  = { sm: 50, md: 64, lg: 90, xl: 130 } as const
const WORDMARK_REM = { sm: '1.5rem', md: '2rem', lg: '2.8rem', xl: '4.5rem' } as const
const GAP          = { sm: 'gap-1', md: 'gap-1.5', lg: 'gap-2', xl: 'gap-3' } as const

// ─────────────────────────────────────────────────────────────────────────────

export interface PianoLogoProps {
  /**
   * Color context — controls how the wordmark reads against its background.
   * 'dark' = on dark/colored backgrounds (header, dark sections)
   * 'light' = on light/cream backgrounds (footer, page body)
   */
  theme?: 'light' | 'dark'
  /**
   * Size preset.
   * sm  → mobile sidebar, tight contexts
   * md  → standard header (default)
   * lg  → footer, large placements
   * xl  → hero / display use
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Shift the monogram downward by this many pixels, creating an overhang
   * below its container. Parent must have overflow-visible.
   */
  monogramOffset?: number
  /**
   * Render without a link wrapper — use in hero/display contexts where
   * linking back to the homepage would be redundant (e.g. you're already on it).
   */
  noLink?: boolean
  className?: string
}

/**
 * UsedSteinway brand logo lockup.
 *
 * Horizontal layout: [SW monogram] + [wordmark]
 *
 * Usage:
 *   import { PianoLogo } from '@/components/layout'
 *
 *   <PianoLogo />                              // defaults: theme=light, size=md
 *   <PianoLogo theme="dark" size="sm" />       // mobile sidebar
 *   <PianoLogo theme="dark" size="md" monogramOffset={8} />  // header
 *   <PianoLogo theme="light" size="lg" />      // footer
 *   <PianoLogo theme="light" size="xl" noLink />  // hero / homepage display
 *
 * To update branding, edit the tokens at the top of this file.
 */
export function PianoLogo({
  theme = 'light',
  size = 'md',
  monogramOffset = 0,
  noLink = false,
  className,
}: PianoLogoProps) {
  const inner = (
    <>
      {/* Monogram mark — mix-blend-mode:screen dissolves the dark vignette
          background so only the gold shows against any colored surface */}
      <Image
        src={MONOGRAM_SRC}
        alt={`${WORDMARK_TEXT} monogram`}
        width={MONOGRAM_PX[size]}
        height={MONOGRAM_PX[size]}
        className="shrink-0"
        style={{
          mixBlendMode: 'screen',
          ...(monogramOffset ? { transform: `translateY(${monogramOffset}px)` } : {}),
        }}
        priority
      />

      {/* Wordmark */}
      <span
        className="whitespace-nowrap translate-y-2 transition-opacity duration-200 group-hover:opacity-75"
        style={{
          fontFamily: WORDMARK_FONT,
          fontSize: WORDMARK_REM[size],
          fontWeight: 400,
          letterSpacing: WORDMARK_TRACKING,
          color: theme === 'dark' ? WORDMARK_COLOR_DARK : WORDMARK_COLOR_LIGHT,
        }}
      >
        {WORDMARK_TEXT}
      </span>
    </>
  )

  if (noLink) {
    return (
      <div className={cn('flex items-center leading-none', GAP[size], className)}>
        {inner}
      </div>
    )
  }

  return (
    <Link href="/" className={cn('group flex items-center leading-none', GAP[size], className)}>
      {inner}
    </Link>
  )
}
