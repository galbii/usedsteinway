/**
 * Admin Root Provider
 *
 * Wraps the entire Payload admin UI with necessary providers.
 * Renders a single speed-dial FAB (bottom-right, fixed) that expands on hover.
 */
'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useAuth } from '@payloadcms/ui'
import { MediaManagerProvider, useMediaManager } from './media-manager/MediaManagerProvider'
import { MediaManagerModal } from './media-manager/MediaManagerModal'
import { AllCollectionsModal } from './dashboard/AllCollectionsModal'
import { DashboardModal } from './dashboard/DashboardModal'
import { PianoManagerModal } from './dashboard/PianoManagerModal'
import { PostManagerModal } from './dashboard/PostManagerModal'

interface AdminRootProviderProps {
  children: React.ReactNode
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const STYLES = `
  @keyframes usw-sd-in {
    from { opacity: 0; transform: translateY(14px) scale(0.85); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }

  .usw-sd-item {
    animation: usw-sd-in 0.24s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: flex-end;
  }

  .usw-sd-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: hsl(36, 18%, 90%);
    background: hsl(25, 6%, 11%);
    border: 1px solid rgba(184, 134, 57, 0.22);
    padding: 7px 14px;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    transform: translateX(8px);
    transition: opacity 0.14s ease, transform 0.14s ease;
    pointer-events: none;
    box-shadow: 0 2px 12px rgba(0,0,0,0.35);
  }

  .usw-sd-item:hover .usw-sd-label {
    opacity: 1;
    transform: translateX(0);
  }

  .usw-sd-btn {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: hsl(25, 5%, 13%);
    border: 1.5px solid rgba(184, 134, 57, 0.22);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;
    color: hsl(25, 4%, 58%);
    transition: background 0.15s, border-color 0.15s, color 0.15s, transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 3px 14px rgba(0,0,0,0.35);
  }

  .usw-sd-btn:hover {
    background: rgba(184, 134, 57, 0.14);
    border-color: rgba(184, 134, 57, 0.55);
    color: hsl(40, 72%, 60%);
    transform: scale(1.1);
  }

  .usw-sd-main {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: hsl(40, 72%, 52%);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    color: hsl(25, 6%, 9%);
    box-shadow: 0 4px 28px rgba(184, 134, 57, 0.4), 0 2px 8px rgba(0,0,0,0.45);
    transition: background 0.15s, box-shadow 0.15s, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
    z-index: 1;
  }

  .usw-sd-main:hover {
    background: hsl(40, 72%, 60%);
    box-shadow: 0 6px 36px rgba(184, 134, 57, 0.55), 0 2px 10px rgba(0,0,0,0.5);
    transform: scale(1.06);
  }

  .usw-sd-main-icon {
    transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .usw-sd-main-icon.open {
    transform: rotate(45deg);
  }
`

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function IconPlus() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function IconPiano() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="1.5" />
      <line x1="7" y1="5" x2="7" y2="14" />
      <line x1="12" y1="5" x2="12" y2="14" />
      <line x1="17" y1="5" x2="17" y2="14" />
      <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="currentColor" stroke="none" />
      <rect x="9.5" y="5" width="3" height="7" rx="0.5" fill="currentColor" stroke="none" />
      <rect x="14.5" y="5" width="3" height="7" rx="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconPost() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  )
}

function IconDashboard() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 13.5a9 9 0 1 1 18 0" />
      <path d="M12 13.5 8.5 9" />
      <circle cx="12" cy="13.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconCollections() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function IconMedia() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Speed-dial component
// ---------------------------------------------------------------------------

interface SpeedDialItem {
  label: string
  icon: React.ReactNode
  onClick: () => void
}

function SpeedDial({ items }: { items: SpeedDialItem[] }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const styleInjected = useRef(false)

  useEffect(() => {
    if (!styleInjected.current && !document.getElementById('usw-sd-styles')) {
      const el = document.createElement('style')
      el.id = 'usw-sd-styles'
      el.textContent = STYLES
      document.head.appendChild(el)
      styleInjected.current = true
    }
  }, [])

  const handleEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }, [])

  const handleLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 200)
  }, [])

  // Items in display order — top of stack to bottom (reversed for stagger)
  const reversed = [...items].reverse()

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '12px',
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
          {reversed.map((item, i) => (
            <div
              key={item.label}
              className="usw-sd-item"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span className="usw-sd-label">{item.label}</span>
              <button
                type="button"
                className="usw-sd-btn"
                onClick={() => { item.onClick(); setOpen(false) }}
                title={item.label}
              >
                {item.icon}
              </button>
            </div>
          ))}
        </div>
      )}

      <button type="button" className="usw-sd-main" title="Quick Actions" aria-expanded={open}>
        <span className={`usw-sd-main-icon${open ? ' open' : ''}`}>
          <IconPlus />
        </span>
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

// Inner component lives inside MediaManagerProvider so it can call useMediaManager
function AdminUI({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const { openModal } = useMediaManager()

  const [collectionsOpen, setCollectionsOpen] = useState(false)
  const [dashboardOpen, setDashboardOpen] = useState(false)
  const [pianoManagerOpen, setPianoManagerOpen] = useState(false)
  const [postManagerOpen, setPostManagerOpen] = useState(false)

  // Bridge for the Lexical "Media Library" toolbar button. The toolbar item
  // is configured via a plain callback (no hooks allowed), so we expose
  // openModal as a window-level function while the provider is mounted.
  // See src/fields/lexical/MediaLibraryFeature.client.tsx
  useEffect(() => {
    window.__orcaOpenMediaLibrary = (options) => {
      openModal({
        mode: options?.mode ?? 'select',
        filterMimeType: options?.filterMimeType,
        onSelect: options?.onSelect,
      })
    }
    return () => {
      delete window.__orcaOpenMediaLibrary
    }
  }, [openModal])

  // Global 'L' shortcut — open Piano Manager when idle (no modal open, not in a text field)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'l' && e.key !== 'L') return
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return
      const tag = (e.target as HTMLElement).tagName
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return
      if ((e.target as HTMLElement).isContentEditable) return
      if (collectionsOpen || dashboardOpen || postManagerOpen) return
      e.preventDefault()
      setPianoManagerOpen(true)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [collectionsOpen, dashboardOpen, postManagerOpen])

  const dialItems: SpeedDialItem[] = [
    { label: 'Dashboard',     icon: <IconDashboard />,   onClick: () => setDashboardOpen(true) },
    { label: 'Piano Manager', icon: <IconPiano />,       onClick: () => setPianoManagerOpen(true) },
    { label: 'Post Manager',  icon: <IconPost />,        onClick: () => setPostManagerOpen(true) },
    { label: 'Collections',   icon: <IconCollections />, onClick: () => setCollectionsOpen(true) },
    { label: 'Media Library', icon: <IconMedia />,       onClick: () => openModal() },
  ]

  return (
    <>
      {children}

      {user && (
        <>
          <MediaManagerModal />
          <AllCollectionsModal open={collectionsOpen} onClose={() => setCollectionsOpen(false)} />
          <DashboardModal open={dashboardOpen} onClose={() => setDashboardOpen(false)} />
          <PianoManagerModal open={pianoManagerOpen} onClose={() => setPianoManagerOpen(false)} />
          <PostManagerModal open={postManagerOpen} onClose={() => setPostManagerOpen(false)} />
          <SpeedDial items={dialItems} />
        </>
      )}
    </>
  )
}

export const AdminRootProvider: React.FC<AdminRootProviderProps> = ({ children }) => {
  return (
    <MediaManagerProvider>
      <AdminUI>{children}</AdminUI>
    </MediaManagerProvider>
  )
}
