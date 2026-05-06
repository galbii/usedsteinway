'use client'

import { useEffect } from 'react'
import type { Piano, Brand } from '@/payload-types'

const COLORS = {
  bg: 'hsl(0, 0%, 100%)',
  gold: 'hsl(40, 72%, 34%)',
  border: 'rgba(0, 0, 0, 0.13)',
  divider: 'rgba(0, 0, 0, 0.09)',
  text: 'hsl(25, 6%, 9%)',
  body: 'hsl(25, 5%, 18%)',
  muted: 'hsl(25, 4%, 32%)',
  available: 'hsl(142, 55%, 26%)',
  sold: 'hsl(25, 4%, 35%)',
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
    background: hsl(36, 14%, 96%);
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
        background: COLORS.bg,
        border: `1px solid ${COLORS.border}`,
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
          borderBottom: `1px solid ${COLORS.divider}`,
        }}
      >
        <h2
          style={{
            fontFamily: 'inherit',
            fontSize: '17px',
            fontWeight: 700,
            color: COLORS.text,
            margin: 0,
            letterSpacing: '0.01em',
          }}
        >
          Recent Listings
        </h2>
        <a
          href={`${adminBaseURL}/collections/pianos`}
          style={{
            fontFamily: 'inherit',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: COLORS.gold,
            textDecoration: 'none',
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
            color: COLORS.muted,
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
                  borderBottom: isLast ? 'none' : `1px solid ${COLORS.divider}`,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: 'inherit',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: COLORS.text,
                      marginBottom: '5px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {piano.title}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: COLORS.muted, letterSpacing: '0.03em' }}>
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
                      fontFamily: 'inherit',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: COLORS.gold,
                    }}
                  >
                    {formatPrice(piano.price)}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: piano.isAvailable ? COLORS.available : COLORS.sold,
                      minWidth: '68px',
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
