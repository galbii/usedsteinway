import { cn } from '@/utilities/ui'

interface ConditionBadgeProps {
  condition: 'Excellent' | 'Very Good' | 'Good' | 'Fair'
  className?: string
}

const variants = {
  Excellent: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
  'Very Good': 'bg-blue-50 text-blue-800 border border-blue-200',
  Good: 'bg-amber-50 text-amber-800 border border-amber-200',
  Fair: 'bg-gray-50 text-gray-700 border border-gray-200',
}

export function ConditionBadge({ condition, className }: ConditionBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide font-display',
        variants[condition],
        className,
      )}
    >
      {condition}
    </span>
  )
}
