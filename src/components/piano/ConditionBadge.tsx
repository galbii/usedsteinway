import { cn } from '@/utilities/ui'

interface ConditionBadgeProps {
  condition: 'Excellent' | 'Very Good' | 'Good' | 'Fair'
  className?: string
}

const variants = {
  Excellent: 'bg-piano-cream border border-piano-gold/50 text-piano-black',
  'Very Good': 'bg-piano-cream border border-piano-stone/40 text-piano-black',
  Good: 'bg-piano-warm-white border border-piano-stone/30 text-piano-stone',
  Fair: 'bg-piano-warm-white border border-piano-stone/20 text-piano-stone',
}

export function ConditionBadge({ condition, className }: ConditionBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 font-display text-[9px] tracking-[0.3em] uppercase',
        variants[condition],
        className,
      )}
    >
      {condition}
    </span>
  )
}
