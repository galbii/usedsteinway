import Link from 'next/link'
import { cn } from '@/utilities/ui'

interface PianoLogoProps {
  /** 'light' = cream/ivory background, 'dark' = dark background */
  theme?: 'light' | 'dark'
  /** Visual size of the wordmark */
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * UsedSteinway wordmark
 *
 * Stacked two-line treatment:
 *   USED      ← Syne, small caps, wide tracking, muted
 *   Steinway  ← Cormorant Garamond, light weight, commanding
 *
 * Size reference:
 *   sm  → header tight contexts
 *   md  → standard header (default)
 *   lg  → footer, hero, large placements
 */
export function PianoLogo({ theme = 'light', size = 'md', className }: PianoLogoProps) {
  const topSize = {
    sm: 'text-[8px] tracking-[0.6em]',
    md: 'text-[9px] tracking-[0.65em]',
    lg: 'text-[10px] tracking-[0.65em]',
  }[size]

  const bottomSize = {
    sm: 'text-[1.35rem]',
    md: 'text-[1.75rem]',
    lg: 'text-[2.5rem]',
  }[size]

  return (
    <Link href="/" className={cn('group flex flex-col leading-none', className)}>
      <span
        className={cn(
          'font-display uppercase leading-none mb-1 transition-colors',
          topSize,
          theme === 'dark'
            ? 'text-piano-gold/45 group-hover:text-piano-gold/70'
            : 'text-piano-gold group-hover:text-piano-gold/75',
        )}
      >
        Used
      </span>
      <span
        className={cn(
          'font-cormorant font-light leading-none transition-colors',
          bottomSize,
          theme === 'dark'
            ? 'text-piano-cream group-hover:text-white'
            : 'text-piano-black group-hover:text-piano-charcoal',
        )}
        style={{ letterSpacing: '0.04em' }}
      >
        Steinway
      </span>
    </Link>
  )
}
