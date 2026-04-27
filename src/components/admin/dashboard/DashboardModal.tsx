'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const COLORS = {
  black: 'hsl(25, 6%, 9%)',
  charcoal: 'hsl(25, 5%, 14%)',
  charcoalHover: 'hsl(25, 5%, 18%)',
  gold: 'hsl(40, 72%, 52%)',
  goldBorder: 'rgba(184, 134, 57, 0.18)',
  goldFaint: 'rgba(184, 134, 57, 0.07)',
  goldMuted: 'rgba(184, 134, 57, 0.45)',
  cream: 'hsl(36, 18%, 97%)',
  silver: 'hsl(25, 4%, 58%)',
  available: 'hsl(142, 50%, 45%)',
}

const STYLES = `
  @keyframes usw-dm-backdrop-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes usw-dm-panel-in {
    from { opacity: 0; transform: scale(0.97) translateY(12px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes usw-dm-shimmer {
    0%   { opacity: 0.35; }
    50%  { opacity: 0.65; }
    100% { opacity: 0.35; }
  }
  .usw-dm-backdrop {
    animation: usw-dm-backdrop-in 0.2s ease both;
  }
  .usw-dm-panel {
    animation: usw-dm-panel-in 0.28s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .usw-dm-skeleton {
    animation: usw-dm-shimmer 1.4s ease-in-out infinite;
    background: rgba(255,255,255,0.06);
    border-radius: 3px;
  }
  .usw-dm-stat-card {
    display: block;
    padding: 20px 20px 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(184, 134, 57, 0.12);
    border-radius: 3px;
    text-decoration: none;
    transition: background 0.15s, border-color 0.2s;
    cursor: pointer;
  }
  .usw-dm-stat-card:hover {
    background: ${COLORS.goldFaint};
    border-color: rgba(184, 134, 57, 0.35);
  }
  .usw-dm-piano-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 0;
    text-decoration: none;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: opacity 0.15s;
  }
  .usw-dm-piano-row:last-child {
    border-bottom: none;
  }
  .usw-dm-piano-row:hover {
    opacity: 0.75;
  }
  .usw-dm-action-primary {
    display: block;
    padding: 11px 14px;
    background: rgba(184, 134, 57, 0.08);
    border: 1px solid rgba(184, 134, 57, 0.25);
    border-radius: 3px;
    font-size: 13px;
    letter-spacing: 0.06em;
    color: ${COLORS.gold};
    text-decoration: none;
    transition: background 0.15s, border-color 0.15s;
    text-align: center;
    font-family: inherit;
    cursor: pointer;
  }
  .usw-dm-action-primary:hover {
    background: rgba(184, 134, 57, 0.16);
    border-color: rgba(184, 134, 57, 0.5);
  }
  .usw-dm-action-secondary {
    display: block;
    padding: 10px 14px;
    font-size: 13px;
    letter-spacing: 0.04em;
    color: ${COLORS.silver};
    text-decoration: none;
    border-radius: 3px;
    transition: background 0.15s, color 0.15s;
    font-family: inherit;
  }
  .usw-dm-action-secondary:hover {
    background: rgba(255,255,255,0.05);
    color: ${COLORS.cream};
  }
  .usw-dm-close-btn {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 3px;
    color: ${COLORS.silver};
    cursor: pointer;
    font-size: 18px;
    line-height: 1;
    padding: 5px 9px;
    transition: color 0.15s, border-color 0.15s, transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
    font-family: inherit;
  }
  .usw-dm-close-btn:hover {
    color: ${COLORS.cream};
    border-color: rgba(255,255,255,0.2);
    transform: rotate(90deg);
  }
  .usw-dm-avail-badge {
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
`

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface StatData {
  label: string
  value: number | null
  href: string
}

interface PianoRow {
  id: string
  title: string
  price: number | null | undefined
  isAvailable: boolean
}

interface DashboardModalProps {
  open: boolean
  onClose: () => void
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatPrice(price: number | null | undefined): string {
  if (!price) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DashboardModal({ open, onClose }: DashboardModalProps) {
  const [stats, setStats] = useState<StatData[]>([
    { label: 'Pianos', value: null, href: '/admin/collections/pianos' },
    { label: 'Brands', value: null, href: '/admin/collections/brands' },
    { label: 'Posts', value: null, href: '/admin/collections/posts' },
    { label: 'Testimonials', value: null, href: '/admin/collections/testimonials' },
  ])
  const [pianos, setPianos] = useState<PianoRow[]>([])
  const [loading, setLoading] = useState(false)

  // Inject styles once
  useEffect(() => {
    if (!document.getElementById('usw-dm-styles')) {
      const el = document.createElement('style')
      el.id = 'usw-dm-styles'
      el.textContent = STYLES
      document.head.appendChild(el)
    }
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [pianoCount, brandCount, postCount, testimonialCount, recentPianos] = await Promise.all([
        fetch('/api/pianos?limit=0').then((r) => r.json()),
        fetch('/api/brands?limit=0').then((r) => r.json()),
        fetch('/api/posts?limit=0').then((r) => r.json()),
        fetch('/api/testimonials?limit=0').then((r) => r.json()),
        fetch('/api/pianos?limit=5&sort=-createdAt').then((r) => r.json()),
      ])
      setStats([
        { label: 'Pianos', value: pianoCount.totalDocs ?? 0, href: '/admin/collections/pianos' },
        { label: 'Brands', value: brandCount.totalDocs ?? 0, href: '/admin/collections/brands' },
        { label: 'Posts', value: postCount.totalDocs ?? 0, href: '/admin/collections/posts' },
        { label: 'Testimonials', value: testimonialCount.totalDocs ?? 0, href: '/admin/collections/testimonials' },
      ])
      setPianos(
        (recentPianos.docs ?? []).map((p: { id: string; title: string; price?: number; isAvailable?: boolean }) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          isAvailable: p.isAvailable ?? false,
        })),
      )
    } catch {
      // Silently fail — dashboard is non-critical
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (open) void fetchData()
  }, [open, fetchData])

  // ESC to close
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  const availableCount = pianos.filter((p) => p.isAvailable).length

  return (
    <>
      {/* Backdrop */}
      <div
        className="usw-dm-backdrop"
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(9, 8, 7, 0.82)',
        }}
      />

      {/* Panel */}
      <div
        className="usw-dm-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '50vh',
          left: '50vw',
          transform: 'translate(-50%, -50%)',
          width: 'min(920px, 96vw)',
          maxHeight: '88vh',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          background: COLORS.charcoal,
          border: `1px solid ${COLORS.goldBorder}`,
          borderRadius: '6px',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 32px 20px',
            borderBottom: '1px solid rgba(184, 134, 57, 0.1)',
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontFamily: 'inherit',
                fontSize: '17px',
                fontWeight: 600,
                color: COLORS.cream,
                letterSpacing: '0.01em',
              }}
            >
              Dashboard
            </p>
            <p style={{ margin: '3px 0 0', fontSize: '13px', color: COLORS.silver, letterSpacing: '0.03em' }}>
              Quick overview
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              href="/admin"
              onClick={onClose}
              style={{
                fontFamily: 'inherit',
                fontSize: '12px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: COLORS.goldMuted,
                textDecoration: 'none',
              }}
            >
              Full dashboard →
            </Link>
            <button type="button" className="usw-dm-close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: `${COLORS.goldMuted} transparent`,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 240px',
              gap: '0',
              minHeight: 0,
            }}
          >
            {/* Left column — stats + recent pianos */}
            <div style={{ padding: '28px 32px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              {/* Stats */}
              <p
                style={{
                  margin: '0 0 14px',
                  fontSize: '11px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(148, 140, 133, 0.5)',
                  fontFamily: 'inherit',
                }}
              >
                Counts
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '10px',
                  marginBottom: '32px',
                }}
              >
                {stats.map((stat) => (
                  <Link key={stat.label} href={stat.href} className="usw-dm-stat-card" onClick={onClose}>
                    <div
                      style={{
                        fontSize: 'clamp(26px, 2.5vw, 36px)',
                        fontWeight: 200,
                        lineHeight: 1,
                        color: COLORS.gold,
                        marginBottom: '8px',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {loading || stat.value === null ? (
                        <div className="usw-dm-skeleton" style={{ width: '40px', height: '34px' }} />
                      ) : (
                        stat.value.toLocaleString()
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 400,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: COLORS.silver,
                      }}
                    >
                      {stat.label}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Recent pianos */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '14px',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: '11px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'rgba(148, 140, 133, 0.5)',
                    fontFamily: 'inherit',
                  }}
                >
                  Recent Listings
                </p>
                {availableCount > 0 && (
                  <span style={{ fontSize: '12px', color: COLORS.available, letterSpacing: '0.04em' }}>
                    {availableCount} available
                  </span>
                )}
              </div>

              {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="usw-dm-skeleton"
                      style={{ height: '52px', borderRadius: '2px' }}
                    />
                  ))}
                </div>
              ) : pianos.length === 0 ? (
                <p style={{ color: COLORS.silver, fontSize: '14px', fontStyle: 'italic', margin: 0 }}>
                  No pianos yet.
                </p>
              ) : (
                <div>
                  {pianos.map((piano) => (
                    <Link
                      key={piano.id}
                      href={`/admin/collections/pianos/${piano.id}`}
                      className="usw-dm-piano-row"
                      onClick={onClose}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontFamily: 'inherit',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: COLORS.cream,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {piano.title}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0, marginLeft: '12px' }}>
                        <span
                          style={{
                            fontFamily: 'inherit',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: COLORS.gold,
                          }}
                        >
                          {formatPrice(piano.price)}
                        </span>
                        <span
                          className="usw-dm-avail-badge"
                          style={{ color: piano.isAvailable ? COLORS.available : COLORS.silver, minWidth: '52px', textAlign: 'right' }}
                        >
                          {piano.isAvailable ? 'Avail.' : 'Sold'}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* View all link */}
              <Link
                href="/admin/collections/pianos"
                onClick={onClose}
                style={{
                  display: 'inline-block',
                  marginTop: '16px',
                  fontFamily: 'inherit',
                  fontSize: '12px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: COLORS.goldMuted,
                  textDecoration: 'none',
                }}
              >
                View all pianos →
              </Link>
            </div>

            {/* Right column — quick actions */}
            <div style={{ padding: '28px 24px' }}>
              <p
                style={{
                  margin: '0 0 14px',
                  fontSize: '11px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(148, 140, 133, 0.5)',
                  fontFamily: 'inherit',
                }}
              >
                Quick Actions
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                <Link href="/admin/collections/pianos/create" className="usw-dm-action-primary" onClick={onClose}>
                  + Add Piano
                </Link>
                <Link href="/admin/collections/posts/create" className="usw-dm-action-primary" onClick={onClose}>
                  + New Post
                </Link>
              </div>

              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0 0 16px' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <Link href="/admin/collections/brands/create" className="usw-dm-action-secondary" onClick={onClose}>
                  Add Brand
                </Link>
                <Link href="/admin/collections/testimonials/create" className="usw-dm-action-secondary" onClick={onClose}>
                  New Testimonial
                </Link>
                <Link href="/admin/collections/media" className="usw-dm-action-secondary" onClick={onClose}>
                  Media Library
                </Link>
                <Link href="/admin/globals/site-settings" className="usw-dm-action-secondary" onClick={onClose}>
                  Site Settings
                </Link>
                <a href="/" target="_blank" rel="noopener noreferrer" className="usw-dm-action-secondary">
                  View Live Site ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 32px',
            borderTop: '1px solid rgba(184, 134, 57, 0.08)',
          }}
        >
          <span style={{ fontSize: '12px', color: COLORS.silver, letterSpacing: '0.08em' }}>
            Used Steinways
          </span>
          <Link
            href="/admin"
            onClick={onClose}
            style={{
              fontFamily: 'inherit',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: COLORS.goldMuted,
              textDecoration: 'none',
            }}
          >
            Open Dashboard
          </Link>
        </div>
      </div>
    </>
  )
}
