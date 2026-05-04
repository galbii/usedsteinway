import { cn } from '@/utilities/ui'

type Condition = 'new' | 'used' | 'reconditioned' | 'rebuilt' | 'rebuilt-partial' | 'work-in-progress' | 'display' | 'Excellent' | 'Very Good' | 'Good' | 'Fair'

interface ConditionBadgeProps {
  condition: Condition
  className?: string
}

const variants: Record<Condition, string> = {
  new: 'bg-piano-cream border border-piano-gold/50 text-piano-black',
  used: 'bg-piano-cream border border-piano-stone/40 text-piano-black',
  reconditioned: 'bg-piano-cream border border-piano-stone/60 text-piano-black',
  rebuilt: 'bg-piano-cream border border-piano-stone/30 text-piano-stone',
  'rebuilt-partial': 'bg-piano-cream border border-piano-stone/30 text-piano-stone',
  'work-in-progress': 'bg-piano-cream border border-piano-gold/40 text-piano-stone',
  display: 'bg-piano-cream border border-piano-burgundy/30 text-piano-burgundy',
  Excellent: 'bg-piano-cream border border-piano-gold/50 text-piano-black',
  'Very Good': 'bg-piano-cream border border-piano-stone/40 text-piano-black',
  Good: 'bg-piano-cream border border-piano-stone/30 text-piano-stone',
  Fair: 'bg-piano-cream border border-piano-stone/20 text-piano-stone',
}

const labels: Record<Condition, string> = {
  new: 'New',
  used: 'Pre-Owned',
  reconditioned: 'Reconditioned',
  rebuilt: 'Rebuilt',
  'rebuilt-partial': 'Partial Rebuild',
  'work-in-progress': 'Work in Progress',
  display: 'Display Model',
  Excellent: 'Excellent',
  'Very Good': 'Very Good',
  Good: 'Good',
  Fair: 'Fair',
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
      {labels[condition]}
    </span>
  )
}
