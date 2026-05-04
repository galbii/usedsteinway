'use client'

import { useState, useRef, useCallback } from 'react'
import {
  Plus,
  Music,
  FileText,
  Tag,
  MessageSquare,
  Image,
  ExternalLink,
} from 'lucide-react'

const COLORS = {
  charcoal: 'hsl(25, 6%, 9%)',
  surface: 'hsl(25, 5%, 14%)',
  gold: 'hsl(40, 72%, 52%)',
  goldDark: 'hsl(40, 60%, 38%)',
  goldBorder: 'rgba(184, 134, 57, 0.25)',
  cream: 'hsl(36, 18%, 97%)',
  silver: 'hsl(25, 4%, 58%)',
}

const STYLES = `
  @keyframes usw-fab-item-in {
    from { opacity: 0; transform: translateY(12px) scale(0.88); }
    to   { opacity: 1; transform: translateY(0)   scale(1);    }
  }
  .usw-fab-item {
    animation: usw-fab-item-in 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }
  .usw-fab-item-link {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    cursor: pointer;
  }
  .usw-fab-item-label {
    white-space: nowrap;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: ${COLORS.cream};
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.goldBorder};
    padding: 6px 12px;
    border-radius: 3px;
    opacity: 0;
    transform: translateX(6px);
    transition: opacity 0.15s ease, transform 0.15s ease;
    pointer-events: none;
  }
  .usw-fab-item-link:hover .usw-fab-item-label {
    opacity: 1;
    transform: translateX(0);
  }
  .usw-fab-icon-btn {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.goldBorder};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.15s, border-color 0.15s, transform 0.15s;
    color: ${COLORS.silver};
  }
  .usw-fab-item-link:hover .usw-fab-icon-btn {
    background: rgba(184, 134, 57, 0.12);
    border-color: rgba(184, 134, 57, 0.5);
    color: ${COLORS.gold};
    transform: scale(1.08);
  }
  .usw-fab-main {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background: ${COLORS.gold};
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 24px rgba(184, 134, 57, 0.35), 0 1px 4px rgba(0,0,0,0.4);
    transition: background 0.15s, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }
  .usw-fab-main:hover {
    background: hsl(40, 72%, 58%);
    box-shadow: 0 6px 32px rgba(184, 134, 57, 0.5), 0 2px 8px rgba(0,0,0,0.4);
  }
  .usw-fab-main-icon {
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    color: hsl(25, 6%, 9%);
  }
  .usw-fab-main-icon.open {
    transform: rotate(45deg);
  }
`

export interface QuickAction {
  label: string
  href: string
  primary?: boolean
  icon?: React.ReactNode
}

const DEFAULT_ACTIONS: QuickAction[] = [
  { label: 'Add Piano',       href: '/admin/collections/pianos/create',       primary: true, icon: <Music size={16} /> },
  { label: 'New Post',        href: '/admin/collections/posts/create',         primary: true, icon: <FileText size={16} /> },
  { label: 'Add Brand',       href: '/admin/collections/brands/create',        icon: <Tag size={16} /> },
  { label: 'New Testimonial', href: '/admin/collections/testimonials/create',  icon: <MessageSquare size={16} /> },
  { label: 'Media Library',   href: '/admin/collections/media',                icon: <Image size={16} /> },
  { label: 'View Live Site',  href: '/',                                       icon: <ExternalLink size={16} /> },
]

interface QuickActionsProps {
  actions?: QuickAction[]
}

export function QuickActions({ actions = DEFAULT_ACTIONS }: QuickActionsProps) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Inject styles once
  const styleInjected = useRef(false)
  if (!styleInjected.current && typeof document !== 'undefined') {
    if (!document.getElementById('usw-fab-styles')) {
      const el = document.createElement('style')
      el.id = 'usw-fab-styles'
      el.textContent = STYLES
      document.head.appendChild(el)
    }
    styleInjected.current = true
  }

  const handleEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }, [])

  const handleLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 180)
  }, [])

  // Reversed so the bottom-most item animates first
  const reversed = [...actions].reverse()

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px',
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Action items — visible when open */}
      {open && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '8px',
          }}
        >
          {reversed.map((action, i) => (
            <div
              key={action.href}
              className="usw-fab-item"
              style={{ animationDelay: `${i * 35}ms` }}
            >
              <a href={action.href} className="usw-fab-item-link">
                <span className="usw-fab-item-label">{action.label}</span>
                <span
                  className="usw-fab-icon-btn"
                  style={
                    action.primary
                      ? { borderColor: 'rgba(184, 134, 57, 0.4)' }
                      : {}
                  }
                >
                  {action.icon}
                </span>
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        className="usw-fab-main"
        aria-label="Quick actions"
        aria-expanded={open}
      >
        <Plus
          size={22}
          strokeWidth={2}
          className={`usw-fab-main-icon${open ? ' open' : ''}`}
        />
      </button>
    </div>
  )
}
