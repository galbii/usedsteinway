'use client'

import { useEffect } from 'react'

const COLORS = {
  charcoal: 'hsl(25, 5%, 14%)',
  gold: 'hsl(40, 72%, 52%)',
  goldBorder: 'rgba(184, 134, 57, 0.15)',
  cream: 'hsl(36, 18%, 97%)',
  silver: 'hsl(25, 4%, 58%)',
}

const STYLES = `
  .usw-stat-card {
    display: block;
    background: hsl(25, 5%, 14%);
    border: 1px solid rgba(184, 134, 57, 0.15);
    border-radius: 4px;
    padding: 32px 32px 28px;
    text-decoration: none;
    transition: border-color 0.2s, background 0.2s;
    cursor: pointer;
  }
  .usw-stat-card:hover {
    background: hsl(25, 5%, 17%);
    border-color: rgba(184, 134, 57, 0.45);
  }
`

export interface StatItem {
  label: string
  value: number
  href: string
}

interface StatsRowProps {
  stats: StatItem[]
}

export function StatsRow({ stats }: StatsRowProps) {
  useEffect(() => {
    if (!document.getElementById('usw-stats-styles')) {
      const el = document.createElement('style')
      el.id = 'usw-stats-styles'
      el.textContent = STYLES
      document.head.appendChild(el)
    }
  }, [])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        gap: '16px',
      }}
    >
      {stats.map((stat) => (
        <a key={stat.label} href={stat.href} className="usw-stat-card">
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(40px, 3.5vw, 56px)',
              fontWeight: 300,
              lineHeight: 1,
              color: COLORS.gold,
              marginBottom: '10px',
              letterSpacing: '-0.02em',
            }}
          >
            {stat.value.toLocaleString()}
          </div>
          <div
            style={{
              fontFamily: 'inherit',
              fontSize: '12px',
              fontWeight: 400,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: COLORS.silver,
            }}
          >
            {stat.label}
          </div>
        </a>
      ))}
    </div>
  )
}
