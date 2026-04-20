'use client'

import { useAuth } from '@payloadcms/ui'
import { useEffect, useState } from 'react'

const COLORS = {
  black: 'hsl(25, 6%, 9%)',
  charcoal: 'hsl(25, 5%, 14%)',
  gold: 'hsl(40, 72%, 52%)',
  goldFaint: 'rgba(184, 134, 57, 0.07)',
  goldBorder: 'rgba(184, 134, 57, 0.18)',
  goldMuted: 'rgba(184, 134, 57, 0.45)',
  cream: 'hsl(36, 18%, 97%)',
  silver: 'hsl(25, 4%, 58%)',
}

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

  @keyframes usw-rule {
    from { transform: scaleX(0); opacity: 0; }
    to   { transform: scaleX(1); opacity: 1; }
  }
  @keyframes usw-rise {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`

function getGreeting(hour: number): string {
  if (hour >= 5 && hour < 12) return 'Good morning'
  if (hour >= 12 && hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function Greeting() {
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!document.getElementById('usw-greeting-styles')) {
      const style = document.createElement('style')
      style.id = 'usw-greeting-styles'
      style.textContent = STYLES
      document.head.appendChild(style)
    }
    setMounted(true)
  }, [])

  const now = new Date()
  const greeting = getGreeting(now.getHours())
  const firstName = user?.name?.split(' ')[0] ?? user?.email?.split('@')[0] ?? 'there'
  const dateStr = formatDate(now)

  return (
    <div
      style={{
        background: `linear-gradient(155deg, hsl(25, 5%, 15%) 0%, hsl(25, 6%, 9%) 65%)`,
        border: `1px solid ${COLORS.goldBorder}`,
        borderRadius: '4px',
        padding: '64px 64px 56px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 65% 50% at 80% 50%, ${COLORS.goldFaint} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Top rule */}
      <div
        style={{
          height: '1px',
          background: `linear-gradient(90deg, ${COLORS.gold} 0%, transparent 100%)`,
          marginBottom: '36px',
          transformOrigin: 'left center',
          animation: mounted ? 'usw-rule 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards' : undefined,
          transform: mounted ? undefined : 'scaleX(0)',
          opacity: mounted ? undefined : 0,
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '40px',
          flexWrap: 'wrap',
        }}
      >
        {/* Left — greeting */}
        <div
          style={{
            animation: mounted ? 'usw-rise 0.7s 0.18s both' : undefined,
            opacity: mounted ? undefined : 0,
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '13px',
              fontWeight: 400,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: COLORS.gold,
              margin: '0 0 14px',
            }}
          >
            {greeting}
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(52px, 5vw, 80px)',
              fontWeight: 300,
              lineHeight: 1.0,
              color: COLORS.cream,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            {firstName}
            <span style={{ color: COLORS.gold, fontStyle: 'italic' }}>.</span>
          </h1>
        </div>

        {/* Right — date + brand */}
        <div
          style={{
            textAlign: 'right',
            flexShrink: 0,
            animation: mounted ? 'usw-rise 0.7s 0.32s both' : undefined,
            opacity: mounted ? undefined : 0,
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '15px',
              fontWeight: 400,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: COLORS.silver,
              margin: '0 0 10px',
            }}
          >
            {dateStr}
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '12px',
            }}
          >
            <div style={{ width: '24px', height: '1px', background: COLORS.gold, opacity: 0.35 }} />
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '12px',
                fontWeight: 400,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: COLORS.goldMuted,
                margin: 0,
              }}
            >
              Used Steinways
            </p>
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div
        style={{
          height: '1px',
          background: `linear-gradient(90deg, ${COLORS.gold} 0%, transparent 70%)`,
          marginTop: '36px',
          transformOrigin: 'left center',
          opacity: 0.3,
          animation: mounted ? 'usw-rule 0.9s 0.22s cubic-bezier(0.16, 1, 0.3, 1) both' : undefined,
          transform: mounted ? undefined : 'scaleX(0)',
        }}
      />
    </div>
  )
}
