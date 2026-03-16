import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import type { Piano } from '@/types/piano'
import { ConditionBadge } from './ConditionBadge'

interface PianoCardProps {
  piano: Piano
  className?: string
}

export function PianoCard({ piano, className }: PianoCardProps) {
  return (
    <Link
      href={`/pianos/${piano.slug}`}
      className={cn(
        'group block bg-white border border-gray-200 hover:border-piano-gold/40 transition-all duration-200 hover:shadow-md',
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {piano.imageUrls[0] && (
          <Image
            src={piano.imageUrls[0]}
            alt={piano.title}
            fill
            className="object-cover group-hover:scale-102 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute top-3 left-3">
          <ConditionBadge condition={piano.condition} />
        </div>
      </div>
      <div className="p-5">
        <p className="font-display text-xs tracking-[0.15em] uppercase text-gray-500 mb-1">
          {piano.brand}
        </p>
        <h3 className="font-medium text-gray-900 text-base leading-snug mb-3">{piano.title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">{piano.size}</p>
          <p className="font-semibold text-gray-900">{piano.priceDisplay}</p>
        </div>
      </div>
    </Link>
  )
}
