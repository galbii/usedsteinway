'use client'

import { useEffect } from 'react'

const COLORS = {
  gold: 'hsl(40, 72%, 36%)',
  label: 'hsl(25, 5%, 18%)',
}

const STYLES = `
  .usw-stat-card {
    display: block;
    background: hsl(0, 0%, 100%);
    border: 1px solid rgba(0, 0, 0, 0.14);
    border-radius: 4px;
    padding: 32px 32px 28px;
    text-decoration: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    cursor: pointer;
  }
  .usw-stat-card:hover {
    border-color: rgba(184, 134, 57, 0.55);
    box-shadow: 0 2px 12px rgba(184, 134, 57, 0.1);
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
              fontFamily: 'inherit',
              fontSize: 'clamp(34px, 3vw, 46px)',
              fontWeight: 300,
              lineHeight: 1,
              color: COLORS.gold,
              marginBottom: '12px',
              letterSpacing: '-0.02em',
            }}
          >
            {stat.value.toLocaleString()}
          </div>
          <div
            style={{
              fontFamily: 'inherit',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: COLORS.label,
            }}
          >
            {stat.label}
          </div>
        </a>
      ))}
    </div>
  )
}
