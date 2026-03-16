import { cn } from '@/utilities/ui'
import type { PianoModel } from '@/types/piano'

interface PriceGuideTableProps {
  entries: PianoModel['priceGuide']
  className?: string
}

export function PriceGuideTable({ entries, className }: PriceGuideTableProps) {
  return (
    <div className={cn('overflow-x-auto bg-piano-cream', className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-piano-linen">
            <th className="text-left py-3 pr-6 font-display text-[10px] tracking-[0.35em] uppercase text-piano-gold">
              Era
            </th>
            <th className="text-left py-3 pr-6 font-display text-[10px] tracking-[0.35em] uppercase text-piano-gold">
              Condition
            </th>
            <th className="text-right py-3 font-display text-[10px] tracking-[0.35em] uppercase text-piano-gold">
              Price Range
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr
              key={i}
              className="border-b border-piano-linen hover:bg-piano-gold/5 transition-colors"
            >
              <td className="py-3.5 pr-6 text-piano-stone text-base">{entry.era}</td>
              <td className="py-3.5 pr-6 text-piano-stone text-base">{entry.condition}</td>
              <td className="py-3.5 text-right font-cormorant text-xl font-light text-piano-black">
                {entry.priceRange}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
