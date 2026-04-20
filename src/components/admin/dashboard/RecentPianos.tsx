'use client'

import { useEffect } from 'react'
import type { Piano, Brand } from '@/payload-types'

const COLORS = {
  charcoal: 'hsl(25, 5%, 14%)',
  gold: 'hsl(40, 72%, 52%)',
  goldBorder: 'rgba(184, 134, 57, 0.15)',
  cream: 'hsl(36, 18%, 97%)',
  silver: 'hsl(25, 4%, 58%)',
  available: 'hsl(142, 50%, 45%)',
  sold: 'hsl(25, 4%, 45%)',
}

const STYLES = `
  .usw-piano-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    transition: background 0.15s;
  }
  .usw-piano-row:hover {
    background: hsl(25, 5%, 18%);
  }
`

function isBrandObject(brand: Piano['brand']): brand is Brand {
  return typeof brand === 'object' && brand !== null && 'id' in brand
}

function formatPrice(price: number | null | undefined): string {
  if (!price) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

interface RecentPianosProps {
  pianos: Piano[]
  adminBaseURL?: string
}

export function RecentPianos({ pianos, adminBaseURL = '/admin' }: RecentPianosProps) {
  useEffect(() => {
    if (!document.getElementById('usw-pianos-styles')) {
      const el = document.createElement('style')
      el.id = 'usw-pianos-styles'
      el.textContent = STYLES
      document.head.appendChild(el)
    }
  }, [])

  return (
    <div
      style={{
        background: COLORS.charcoal,
        border: `1px solid ${COLORS.goldBorder}`,
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          padding: '28px 32px 20px',
          borderBottom: `1px solid rgba(184, 134, 57, 0.1)`,
        }}
      >
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '22px',
            fontWeight: 400,
            color: COLORS.cream,
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          Recent Listings
        </h2>
        <a
          href={`${adminBaseURL}/collections/pianos`}
          style={{
            fontFamily: 'inherit',
            fontSize: '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: COLORS.gold,
            textDecoration: 'none',
            opacity: 0.8,
          }}
        >
          View all →
        </a>
      </div>

      {pianos.length === 0 ? (
        <div
          style={{
            padding: '40px 32px',
            textAlign: 'center',
            color: COLORS.silver,
            fontSize: '15px',
            fontStyle: 'italic',
          }}
        >
          No pianos listed yet.
        </div>
      ) : (
        <div>
          {pianos.map((piano, i) => {
            const brandName = isBrandObject(piano.brand) ? (piano.brand.name ?? null) : null
            const isLast = i === pianos.length - 1

            return (
              <a
                key={piano.id}
                href={`${adminBaseURL}/collections/pianos/${piano.id}`}
                className="usw-piano-row"
                style={{
                  padding: '20px 32px',
                  borderBottom: isLast ? 'none' : `1px solid rgba(255,255,255,0.05)`,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: '19px',
                      fontWeight: 400,
                      color: COLORS.cream,
                      marginBottom: '4px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {piano.title}
                  </div>
                  <div style={{ fontSize: '13px', color: COLORS.silver, letterSpacing: '0.04em' }}>
                    {[brandName, piano.condition].filter(Boolean).join(' · ')}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    flexShrink: 0,
                    marginLeft: '16px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: '19px',
                      fontWeight: 400,
                      color: COLORS.gold,
                    }}
                  >
                    {formatPrice(piano.price)}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: piano.isAvailable ? COLORS.available : COLORS.sold,
                      minWidth: '60px',
                      textAlign: 'right',
                    }}
                  >
                    {piano.isAvailable ? 'Available' : 'Sold'}
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}
