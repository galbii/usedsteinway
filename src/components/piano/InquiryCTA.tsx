/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { cn } from '@/utilities/ui'

interface InquiryCTAProps {
  brand?: string
  pianoTitle?: string
  variant?: 'dark' | 'light'
  className?: string
}

export function InquiryCTA({ brand, pianoTitle, variant = 'dark', className }: InquiryCTAProps) {
  const isDark = variant === 'dark'
  const subject = pianoTitle
    ? `Inquiry: ${pianoTitle}`
    : brand
      ? `Inquiry About ${brand} Pianos`
      : 'Piano Inquiry'

  return (
    <section
      className={cn(
        'py-28 px-8',
        isDark ? 'bg-piano-burgundy text-piano-cream' : 'bg-piano-cream text-piano-black',
        className,
      )}
    >
      <div className="max-w-3xl mx-auto text-center">
        <span className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold block mb-5">
          Ready to move forward?
        </span>
        <h2
          className="font-cormorant font-light leading-tight mb-8"
          style={{ fontSize: 'clamp(3rem, 5vw, 5rem)' }}
        >
          {pianoTitle
            ? `Inquire About This Piano`
            : brand
              ? `Inquire About ${brand} Pianos`
              : 'Begin Your Piano Search'}
        </h2>
        <p
          className={cn(
            'text-lg mb-12 max-w-xl mx-auto leading-relaxed',
            isDark ? 'text-piano-stone' : 'text-piano-stone',
          )}
        >
          Every conversation starts with listening. Tell us what you're looking for — or
          come see us at the showroom — and we'll find the right instrument for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/contact?subject=${encodeURIComponent(subject)}`}
            className={cn(
              'inline-flex items-center justify-center px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase transition-opacity duration-200 hover:opacity-80',
              isDark ? 'bg-piano-cream text-piano-burgundy' : 'bg-piano-black text-piano-cream',
            )}
          >
            Contact Roger
          </Link>
          <Link
            href="/visit"
            className={cn(
              'inline-flex items-center justify-center px-10 py-4 border font-display text-[11px] tracking-[0.3em] uppercase transition-colors',
              isDark
                ? 'border-piano-gold/40 text-piano-gold hover:border-piano-gold hover:bg-piano-gold/5'
                : 'border-piano-black/25 text-piano-black hover:border-piano-black hover:bg-piano-black hover:text-piano-cream',
            )}
          >
            Visit the Showroom
          </Link>
        </div>
        <p className={cn('mt-10 text-base font-display tracking-wide', isDark ? 'text-piano-stone' : 'text-piano-stone')}>
          Or call us directly:{' '}
          <a
            href="tel:+16035550123"
            className={cn(
              'transition-colors hover:underline',
              isDark ? 'text-piano-gold' : 'text-piano-black hover:text-piano-gold',
            )}
          >
            (603) 555-0123
          </a>
        </p>
      </div>
    </section>
  )
}
