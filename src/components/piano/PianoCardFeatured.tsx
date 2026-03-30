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
        'group block bg-white overflow-hidden transition-all duration-500 hover:-translate-y-1.5',
        className,
      )}
      style={{
        borderTop: '4px solid hsl(40 72% 52%)',
        boxShadow: '0 4px 28px hsl(350 62% 26% / 0.14), 0 1px 4px hsl(350 62% 26% / 0.09)',
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-piano-burgundy">
        {piano.imageUrls[0] && (
          <Image
            src={piano.imageUrls[0]}
            alt={piano.title}
            fill
            className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-piano-black/50 via-transparent to-transparent" />
        {piano.isFeatured && (
          <div className="absolute top-4 left-4">
            <span className="bg-piano-gold text-piano-black font-display text-[9px] tracking-[0.35em] uppercase px-3 py-1.5">
              Featured
            </span>
          </div>
        )}
        <div className="absolute bottom-4 left-4">
          <ConditionBadge condition={piano.condition} />
        </div>
      </div>

      <div className="p-8">
        <p className="font-display text-[10px] tracking-[0.4em] uppercase text-piano-gold mb-3">
          {piano.brand} · {piano.year}
        </p>
        <h3 className="font-cormorant text-4xl font-light text-piano-black leading-snug mb-2">
          {piano.model}
        </h3>
        <p className="text-piano-stone text-sm mb-6">
          {piano.finish} · {piano.size}
        </p>

        <div className="flex items-center justify-between pt-5 border-t border-piano-linen">
          <span className="font-cormorant text-2xl font-light text-piano-black">
            {piano.priceDisplay}
          </span>
          <span className="font-display text-[10px] tracking-[0.3em] uppercase text-piano-stone group-hover:text-piano-black transition-colors inline-flex items-center gap-1.5">
            View
            <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
