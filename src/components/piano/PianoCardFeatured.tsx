import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import type { Piano } from '@/types/piano'
import { ConditionBadge } from './ConditionBadge'

interface PianoCardFeaturedProps {
  piano: Piano
  className?: string
}

export function PianoCardFeatured({ piano, className }: PianoCardFeaturedProps) {
  return (
    <Link
      href={`/pianos/${piano.slug}`}
      className={cn(
        'group block bg-piano-charcoal border border-piano-gold/20 hover:border-piano-gold/60 transition-all duration-300 overflow-hidden',
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-piano-black">
        {piano.imageUrls[0] && (
          <Image
            src={piano.imageUrls[0]}
            alt={piano.title}
            fill
            className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-piano-black/70 via-transparent to-transparent" />
        {piano.isFeatured && (
          <div className="absolute top-4 right-4">
            <span className="bg-piano-gold/90 text-piano-black text-xs font-display tracking-widest uppercase px-3 py-1">
              Featured
            </span>
          </div>
        )}
        <div className="absolute bottom-4 left-4">
          <ConditionBadge condition={piano.condition} />
        </div>
      </div>

      <div className="p-6">
        <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-gold mb-1.5">
          {piano.brand} · {piano.year}
        </p>
        <h3
          className="text-piano-cream text-lg font-medium leading-snug mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {piano.model}
        </h3>
        <p className="text-piano-silver text-xs mb-4 line-clamp-2 leading-relaxed">
          {piano.finish} · {piano.size}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-piano-gold/10">
          <p className="text-piano-silver text-xs font-display tracking-wide">{piano.size}</p>
          <p className="text-piano-gold font-semibold text-base">{piano.priceDisplay}</p>
        </div>

        <div className="mt-4 flex items-center gap-2 text-piano-gold/70 group-hover:text-piano-gold transition-colors">
          <span className="font-display text-xs tracking-[0.15em] uppercase">View Details</span>
          <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  )
}
