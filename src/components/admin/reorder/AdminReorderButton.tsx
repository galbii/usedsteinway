'use client'

import { useEffect, useState } from 'react'
import { ArrowUpDown, Check } from 'lucide-react'

interface AdminReorderButtonProps {
  value: boolean
  onChange: (next: boolean) => void
  label?: string
  doneLabel?: string
  className?: string
}

export function AdminReorderButton({
  value,
  onChange,
  label = 'Reorder',
  doneLabel = 'Done',
  className,
}: AdminReorderButtonProps) {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/api/users/me', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled) setIsAdmin(Boolean(data?.user))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  if (!isAdmin) return null

  return (
    <button
      onClick={() => onChange(!value)}
      className={
        className ??
        'fixed bottom-6 left-6 z-[60] flex items-center gap-2 bg-piano-black text-piano-cream px-4 py-2.5 font-display text-[10px] tracking-[0.35em] uppercase shadow-lg hover:bg-piano-burgundy transition-colors duration-200'
      }
      aria-label={value ? `Exit ${label.toLowerCase()} mode` : `Enter ${label.toLowerCase()} mode`}
      aria-pressed={value}
    >
      {value ? <Check size={13} /> : <ArrowUpDown size={13} />}
      {value ? doneLabel : label}
    </button>
  )
}
