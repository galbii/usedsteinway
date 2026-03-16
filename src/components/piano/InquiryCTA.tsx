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
        'py-20 px-6',
        isDark ? 'bg-piano-black text-piano-cream' : 'bg-piano-cream text-piano-black',
        className,
      )}
    >
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-display text-xs tracking-[0.2em] uppercase mb-4 text-piano-gold">
          Ready to move forward?
        </p>
        <h2
          className="text-3xl md:text-4xl font-medium mb-6 leading-snug"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {pianoTitle
            ? `Inquire About This Piano`
            : brand
              ? `Inquire About ${brand} Pianos`
              : 'Begin Your Piano Search'}
        </h2>
        <p
          className={cn(
            'text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed',
            isDark ? 'text-piano-silver' : 'text-gray-600',
          )}
        >
          Every conversation starts with listening. Tell us what you're looking for — or
          come see us at the showroom — and we'll find the right instrument for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/contact?subject=${encodeURIComponent(subject)}`}
            className="inline-flex items-center justify-center px-8 py-4 bg-piano-burgundy text-white font-display text-sm tracking-widest uppercase hover:bg-piano-burgundy/90 transition-colors"
          >
            Contact Roger
          </Link>
          <Link
            href="/visit"
            className={cn(
              'inline-flex items-center justify-center px-8 py-4 border font-display text-sm tracking-widest uppercase transition-colors',
              isDark
                ? 'border-piano-gold text-piano-gold hover:bg-piano-gold/10'
                : 'border-piano-black text-piano-black hover:bg-piano-black/5',
            )}
          >
            Visit the Showroom
          </Link>
        </div>
        <p className={cn('mt-8 text-sm', isDark ? 'text-piano-silver' : 'text-gray-500')}>
          Or call us directly:{' '}
          <a
            href="tel:+16035550123"
            className={cn(
              'hover:underline',
              isDark ? 'text-piano-gold' : 'text-piano-burgundy',
            )}
          >
            (603) 555-0123
          </a>
        </p>
      </div>
    </section>
  )
}
