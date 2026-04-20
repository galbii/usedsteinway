'use client'

import { useEffect, useState, useCallback } from 'react'

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
  silverFaint: 'rgba(255,255,255,0.05)',
}

const STYLES = `
  .usw-acm-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(9, 8, 7, 0.82);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .usw-acm-panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(960px, 96vw);
    max-height: 92vh;
    display: flex;
    flex-direction: column;
    background: ${COLORS.charcoal};
    border: 1px solid ${COLORS.goldBorder};
    border-radius: 4px;
    overflow: hidden;
  }
  .usw-acm-header {
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 28px 32px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .usw-acm-title {
    font-family: inherit;
    font-size: 17px;
    font-weight: 600;
    color: ${COLORS.cream};
    margin: 0 0 4px;
    line-height: 1.1;
  }
  .usw-acm-subtitle {
    font-size: 13px;
    color: ${COLORS.silver};
    margin: 0;
    line-height: 1;
  }
  .usw-acm-close {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 3px;
    color: ${COLORS.silver};
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    padding: 6px 10px;
    transition: color 0.15s, border-color 0.15s;
    font-family: inherit;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .usw-acm-close:hover {
    color: ${COLORS.cream};
    border-color: rgba(255,255,255,0.2);
  }
  .usw-acm-body {
    flex: 1;
    overflow-y: auto;
  }
  .usw-acm-collections-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    padding: 24px 32px 20px;
  }
  .usw-acm-globals-label {
    padding: 0 32px;
    margin-bottom: 12px;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(148, 140, 133, 0.5);
    font-family: inherit;
  }
  .usw-acm-divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin: 0 32px 20px;
  }
  .usw-acm-globals-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    padding: 0 32px 28px;
  }
  .usw-acm-card {
    display: flex;
    flex-direction: column;
    padding: 20px 18px 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 3px;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    gap: 8px;
  }
  .usw-acm-card:hover {
    background: ${COLORS.goldFaint};
    border-color: rgba(184, 134, 57, 0.3);
  }
  .usw-acm-global-card {
    display: flex;
    flex-direction: column;
    padding: 14px 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 3px;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    gap: 6px;
  }
  .usw-acm-global-card:hover {
    background: ${COLORS.goldFaint};
    border-color: rgba(184, 134, 57, 0.3);
  }
  .usw-acm-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .usw-acm-icon {
    font-size: 20px;
    color: ${COLORS.silver};
    line-height: 1;
  }
  .usw-acm-count {
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    color: ${COLORS.gold};
    line-height: 1;
  }
  .usw-acm-label {
    font-size: 14px;
    color: ${COLORS.cream};
    letter-spacing: 0.05em;
    line-height: 1.2;
  }
  .usw-acm-desc {
    font-size: 12px;
    color: ${COLORS.silver};
    letter-spacing: 0.03em;
    line-height: 1.3;
  }
  @media (max-width: 599px) {
    .usw-acm-collections-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .usw-acm-globals-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`

const COLLECTIONS = [
  {
    slug: 'pianos',
    label: 'Pianos',
    description: 'Piano listings for sale',
    icon: '♪',
    color: COLORS.gold,
  },
  {
    slug: 'posts',
    label: 'Posts',
    description: 'Blog posts and articles',
    icon: '✦',
    color: COLORS.silver,
  },
  {
    slug: 'brands',
    label: 'Brands',
    description: 'Piano brands and models',
    icon: '◈',
    color: COLORS.silver,
  },
  {
    slug: 'testimonials',
    label: 'Testimonials',
    description: 'Customer stories',
    icon: '◇',
    color: COLORS.silver,
  },
  {
    slug: 'pages',
    label: 'Pages',
    description: 'Website pages',
    icon: '▣',
    color: COLORS.silver,
  },
  {
    slug: 'categories',
    label: 'Categories',
    description: 'Post categories',
    icon: '⊞',
    color: COLORS.silver,
  },
  {
    slug: 'media',
    label: 'Media',
    description: 'Images and files',
    icon: '◫',
    color: COLORS.silver,
  },
  {
    slug: 'users',
    label: 'Users',
    description: 'Admin accounts',
    icon: '◉',
    color: COLORS.silver,
  },
]

const GLOBALS = [
  { slug: 'header', label: 'Header', description: 'Navigation & top bar' },
  { slug: 'footer', label: 'Footer', description: 'Footer links & content' },
  { slug: 'site-settings', label: 'Site Settings', description: 'Global site config' },
]

interface AllCollectionsModalProps {
  open: boolean
  onClose: () => void
}

export function AllCollectionsModal({ open, onClose }: AllCollectionsModalProps) {
  const [counts, setCounts] = useState<Record<string, number | null>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!document.getElementById('usw-acm-styles')) {
      const el = document.createElement('style')
      el.id = 'usw-acm-styles'
      el.textContent = STYLES
      document.head.appendChild(el)
    }
  }, [])

  const fetchCounts = useCallback(async () => {
    setLoading(true)
    try {
      const results = await Promise.all(
        COLLECTIONS.map(async (col) => {
          try {
            const res = await fetch(`/api/${col.slug}?limit=0`)
            const data = await res.json()
            return { slug: col.slug, count: (data.totalDocs as number) ?? 0 }
          } catch {
            return { slug: col.slug, count: null }
          }
        }),
      )
      const map: Record<string, number | null> = {}
      for (const r of results) {
        map[r.slug] = r.count
      }
      setCounts(map)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (open) {
      void fetchCounts()
    }
  }, [open, fetchCounts])

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="usw-acm-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="usw-acm-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="usw-acm-header">
          <div>
            <p className="usw-acm-title">
              Collections
            </p>
            <p className="usw-acm-subtitle">Navigate your content</p>
          </div>
          <button type="button" className="usw-acm-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="usw-acm-body">
          {/* Collections grid */}
          <div className="usw-acm-collections-grid">
            {COLLECTIONS.map((col) => {
              const count = counts[col.slug]
              const countDisplay = loading ? '·' : count === null ? '—' : String(count)
              return (
                <a
                  key={col.slug}
                  href={`/admin/collections/${col.slug}`}
                  className="usw-acm-card"
                  onClick={onClose}
                >
                  <div className="usw-acm-card-top">
                    <span className="usw-acm-icon">{col.icon}</span>
                    <span className="usw-acm-count">{countDisplay}</span>
                  </div>
                  <span className="usw-acm-label">{col.label}</span>
                  <span className="usw-acm-desc">{col.description}</span>
                </a>
              )
            })}
          </div>

          {/* Globals section */}
          <div className="usw-acm-globals-label">Globals</div>
          <div className="usw-acm-divider" />
          <div className="usw-acm-globals-grid">
            {GLOBALS.map((global) => (
              <a
                key={global.slug}
                href={`/admin/globals/${global.slug}`}
                className="usw-acm-global-card"
                onClick={onClose}
              >
                <span className="usw-acm-label">{global.label}</span>
                <span className="usw-acm-desc">{global.description}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
