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
  .usw-qa-primary {
    display: block;
    padding: 14px 20px;
    background: rgba(184, 134, 57, 0.08);
    border: 1px solid rgba(184, 134, 57, 0.3);
    border-radius: 3px;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.06em;
    color: hsl(40, 72%, 52%);
    text-decoration: none;
    transition: background 0.15s, border-color 0.15s;
    text-align: center;
  }
  .usw-qa-primary:hover {
    background: rgba(184, 134, 57, 0.16);
    border-color: rgba(184, 134, 57, 0.55);
  }
  .usw-qa-secondary {
    display: block;
    padding: 12px 16px;
    font-size: 14px;
    letter-spacing: 0.04em;
    color: hsl(25, 4%, 58%);
    text-decoration: none;
    border-radius: 3px;
    transition: background 0.15s, color 0.15s;
  }
  .usw-qa-secondary:hover {
    background: hsl(25, 5%, 18%);
    color: hsl(36, 18%, 97%);
  }
`

export interface QuickAction {
  label: string
  href: string
  primary?: boolean
}

const DEFAULT_ACTIONS: QuickAction[] = [
  { label: 'Add Piano', href: '/admin/collections/pianos/create', primary: true },
  { label: 'New Post', href: '/admin/collections/posts/create', primary: true },
  { label: 'Add Brand', href: '/admin/collections/brands/create' },
  { label: 'New Testimonial', href: '/admin/collections/testimonials/create' },
  { label: 'Media Library', href: '/admin/collections/media' },
  { label: 'View Live Site', href: '/' },
]

interface QuickActionsProps {
  actions?: QuickAction[]
}

export function QuickActions({ actions = DEFAULT_ACTIONS }: QuickActionsProps) {
  useEffect(() => {
    if (!document.getElementById('usw-qa-styles')) {
      const el = document.createElement('style')
      el.id = 'usw-qa-styles'
      el.textContent = STYLES
      document.head.appendChild(el)
    }
  }, [])

  const primary = actions.filter((a) => a.primary)
  const secondary = actions.filter((a) => !a.primary)

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
          padding: '28px 32px 20px',
          borderBottom: `1px solid rgba(184, 134, 57, 0.1)`,
        }}
      >
        <h2
          style={{
            fontFamily: 'inherit',
            fontSize: '14px',
            fontWeight: 600,
            color: COLORS.cream,
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          Quick Actions
        </h2>
      </div>

      <div style={{ padding: '24px 32px 28px' }}>
        {primary.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {primary.map((action) => (
              <a key={action.href} href={action.href} className="usw-qa-primary">
                + {action.label}
              </a>
            ))}
          </div>
        )}

        {primary.length > 0 && secondary.length > 0 && (
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '20px' }} />
        )}

        {secondary.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {secondary.map((action) => (
              <a key={action.href} href={action.href} className="usw-qa-secondary">
                {action.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
