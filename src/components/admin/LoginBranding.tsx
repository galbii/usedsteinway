'use client'

import { useEffect, useState } from 'react'

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

  @keyframes usw-fade-up {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes usw-expand {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
`

export default function LoginBranding() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!document.getElementById('usw-login-styles')) {
      const style = document.createElement('style')
      style.id = 'usw-login-styles'
      style.textContent = STYLES
      document.head.appendChild(style)
    }
    setMounted(true)
  }, [])

  const anim = (delay: string, duration = '0.7s') =>
    mounted
      ? `usw-fade-up ${duration} ${delay} cubic-bezier(0.16, 1, 0.3, 1) both`
      : undefined

  return (
    <div
      style={{
        textAlign: 'center',
        paddingBottom: '52px',
        opacity: mounted ? 1 : 0,
      }}
    >
      {/* Piano key ornament */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3px',
          marginBottom: '28px',
          animation: anim('0s', '0.5s'),
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            style={{
              width: '7px',
              height: '24px',
              borderRadius: '0 0 2px 2px',
              backgroundColor:
                [1, 2, 4, 5, 6].includes(i)
                  ? 'rgba(184,134,57,0.18)'
                  : 'rgba(184,134,57,0.35)',
              border: '1px solid rgba(184,134,57,0.2)',
              borderTop: 'none',
            }}
          />
        ))}
      </div>

      {/* Wordmark */}
      <div
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '11px',
          fontWeight: 400,
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: 'hsl(40, 55%, 46%)',
          marginBottom: '18px',
          animation: anim('0.08s'),
        }}
      >
        Used Steinways
      </div>

      {/* Heading */}
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(34px, 5vw, 50px)',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.05,
          color: 'hsl(36, 18%, 97%)',
          margin: '0 0 32px',
          letterSpacing: '-0.01em',
          animation: anim('0.14s'),
        }}
      >
        Welcome back
        <span
          style={{
            color: 'hsl(40, 72%, 52%)',
            fontStyle: 'normal',
          }}
        >
          .
        </span>
      </h1>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(184,134,57,0.45), transparent)',
          margin: '0 auto',
          width: '72px',
          transformOrigin: 'center',
          animation: mounted
            ? 'usw-expand 0.9s 0.22s cubic-bezier(0.16, 1, 0.3, 1) both'
            : undefined,
          transform: mounted ? undefined : 'scaleX(0)',
        }}
      />
    </div>
  )
}
