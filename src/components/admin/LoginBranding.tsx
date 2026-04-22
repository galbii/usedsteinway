'use client'

import { useEffect, useState } from 'react'

const GOLD = 'hsl(40, 72%, 52%)'
const CREAM = 'hsl(36, 18%, 97%)'
const MUTED = 'hsl(25, 5%, 46%)'

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap');

  @keyframes usw-fade-up {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes usw-expand {
    from { transform: scaleX(0); opacity: 0; }
    to   { transform: scaleX(1); opacity: 1; }
  }

  @keyframes usw-key-rise {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`

// 14 white keys = 2 full octaves (C–B, C–B)
// Black key after white key indices: 0,1,3,4,5 + 7,8,10,11,12
const WHITE_COUNT = 14
const BLACK_AFTER = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12]
const WW = 28   // white key width
const WH = 112  // white key height
const BW = 17   // black key width
const BH = 68   // black key height
const GAP = 2   // gap between white keys

const TOTAL_WIDTH = WHITE_COUNT * WW + (WHITE_COUNT - 1) * GAP

function whiteKeyX(i: number) {
  return i * (WW + GAP)
}

function blackKeyX(whiteIdx: number) {
  // Center black key in the gap between whiteIdx and whiteIdx+1
  return whiteIdx * (WW + GAP) + WW + GAP / 2 - BW / 2
}

function PianoKeyboard({ mounted }: { mounted: boolean }) {
  return (
    <div
      style={{
        position: 'relative',
        width: TOTAL_WIDTH,
        height: WH,
      }}
    >
      {/* White keys */}
      {Array.from({ length: WHITE_COUNT }).map((_, i) => (
        <div
          key={`w-${i}`}
          style={{
            position: 'absolute',
            left: whiteKeyX(i),
            top: 0,
            width: WW,
            height: WH,
            background:
              'linear-gradient(180deg, hsl(38, 22%, 18%) 0%, hsl(36, 18%, 14%) 100%)',
            border: '1px solid rgba(184,134,57,0.28)',
            borderTop: 'none',
            borderRadius: '0 0 3px 3px',
            boxShadow: 'inset 0 -6px 10px rgba(0,0,0,0.3)',
            ...(mounted
              ? {
                  animation: `usw-key-rise 0.5s ${(i * 0.03).toFixed(2)}s cubic-bezier(0.16, 1, 0.3, 1) both`,
                }
              : { opacity: 0 }),
          }}
        />
      ))}

      {/* Black keys */}
      {BLACK_AFTER.map((whiteIdx, bIdx) => (
        <div
          key={`b-${whiteIdx}`}
          style={{
            position: 'absolute',
            left: blackKeyX(whiteIdx),
            top: 0,
            width: BW,
            height: BH,
            background:
              'linear-gradient(180deg, hsl(40, 55%, 38%) 0%, hsl(38, 50%, 26%) 100%)',
            border: '1px solid rgba(184,134,57,0.5)',
            borderTop: '2px solid rgba(184,134,57,0.7)',
            borderRadius: '0 0 2px 2px',
            zIndex: 1,
            boxShadow:
              '2px 2px 8px rgba(0,0,0,0.5), inset 0 -4px 6px rgba(0,0,0,0.3)',
            ...(mounted
              ? {
                  animation: `usw-key-rise 0.45s ${(0.12 + bIdx * 0.025).toFixed(2)}s cubic-bezier(0.16, 1, 0.3, 1) both`,
                }
              : { opacity: 0 }),
          }}
        />
      ))}

      {/* Keyboard body — top rail */}
      <div
        style={{
          position: 'absolute',
          left: -4,
          top: -14,
          width: TOTAL_WIDTH + 8,
          height: 14,
          background:
            'linear-gradient(180deg, hsl(38, 22%, 16%) 0%, hsl(36, 18%, 13%) 100%)',
          border: '1px solid rgba(184,134,57,0.22)',
          borderBottom: 'none',
          borderRadius: '3px 3px 0 0',
          ...(mounted
            ? {
                animation: `usw-key-rise 0.5s 0s cubic-bezier(0.16, 1, 0.3, 1) both`,
              }
            : { opacity: 0 }),
        }}
      />
    </div>
  )
}

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

  const anim = (delay: string, duration = '0.8s') =>
    mounted
      ? `usw-fade-up ${duration} ${delay} cubic-bezier(0.16, 1, 0.3, 1) both`
      : undefined

  return (
    <div
      style={{
        textAlign: 'center',
        paddingBottom: '68px',
        paddingTop: '8px',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.05s',
      }}
    >
      {/* Piano keyboard */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '52px',
          paddingTop: '16px',
        }}
      >
        <PianoKeyboard mounted={mounted} />
      </div>

      {/* Brand wordmark */}
      <div
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '10.5px',
          fontWeight: 400,
          letterSpacing: '0.55em',
          textTransform: 'uppercase',
          color: GOLD,
          marginBottom: '20px',
          animation: anim('0.5s', '0.7s'),
          opacity: 0.9,
        }}
      >
        Used Steinways
      </div>

      {/* Main heading */}
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(42px, 7vw, 68px)',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.0,
          color: CREAM,
          margin: '0 0 14px',
          letterSpacing: '-0.02em',
          animation: anim('0.56s'),
        }}
      >
        Welcome back
        <span style={{ color: GOLD, fontStyle: 'normal' }}>.</span>
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '14px',
          fontWeight: 400,
          fontStyle: 'italic',
          color: MUTED,
          margin: '0 0 40px',
          letterSpacing: '0.03em',
          animation: anim('0.62s'),
        }}
      >
        Sign in to manage your collection
      </p>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(184,134,57,0.55), transparent)',
          margin: '0 auto',
          width: '110px',
          transformOrigin: 'center',
          animation: mounted
            ? 'usw-expand 1.1s 0.7s cubic-bezier(0.16, 1, 0.3, 1) both'
            : undefined,
          transform: mounted ? undefined : 'scaleX(0)',
          opacity: mounted ? undefined : 0,
        }}
      />
    </div>
  )
}
