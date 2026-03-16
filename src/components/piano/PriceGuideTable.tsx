import { cn } from '@/utilities/ui'
import type { PianoModel } from '@/types/piano'

interface PriceGuideTableProps {
  entries: PianoModel['priceGuide']
  className?: string
}

export function PriceGuideTable({ entries, className }: PriceGuideTableProps) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-piano-gold/30">
            <th className="text-left py-3 pr-6 font-display text-xs tracking-[0.15em] uppercase text-piano-silver">
              Era
            </th>
            <th className="text-left py-3 pr-6 font-display text-xs tracking-[0.15em] uppercase text-piano-silver">
              Condition
            </th>
            <th className="text-right py-3 font-display text-xs tracking-[0.15em] uppercase text-piano-silver">
              Price Range
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr
              key={i}
              className="border-b border-piano-gold/10 hover:bg-piano-gold/5 transition-colors"
            >
              <td className="py-3.5 pr-6 text-piano-cream font-medium">{entry.era}</td>
              <td className="py-3.5 pr-6 text-piano-silver">{entry.condition}</td>
              <td className="py-3.5 text-right font-medium text-piano-gold">{entry.priceRange}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
