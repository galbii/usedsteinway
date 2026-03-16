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
        'group block bg-piano-cream border border-piano-linen hover:border-piano-gold/40 transition-all duration-200',
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-piano-black">
        {piano.imageUrls[0] && (
          <Image
            src={piano.imageUrls[0]}
            alt={piano.title}
            fill
            className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute top-4 left-4">
          <ConditionBadge condition={piano.condition} />
        </div>
      </div>
      <div className="p-8">
        <p className="font-display text-[10px] tracking-[0.4em] uppercase text-piano-gold mb-3">
          {piano.brand}
        </p>
        <h3 className="font-cormorant text-3xl font-light text-piano-black leading-snug mb-4">
          {piano.title}
        </h3>
        <div className="flex items-center justify-between border-t border-piano-linen pt-5">
          <p className="text-piano-stone text-sm">{piano.size}</p>
          <p className="font-cormorant text-2xl font-light text-piano-black">{piano.priceDisplay}</p>
        </div>
      </div>
    </Link>
  )
}
