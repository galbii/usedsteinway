/**
 * Admin Root Provider
 *
 * Wraps the entire Payload admin UI with necessary providers.
 * Renders three global FABs (bottom-right) when authenticated:
 *
 *   bottom: 160px  →  Dashboard   (DashboardModal)
 *   bottom:  92px  →  Collections (AllCollectionsModal)
 *   bottom:  24px  →  Media       (MediaManagerModal)
 */
'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@payloadcms/ui'
import { MediaManagerProvider } from './media-manager/MediaManagerProvider'
import { MediaManagerModal } from './media-manager/MediaManagerModal'
import { MediaManagerButton } from './media-manager/MediaManagerButton'
import { AllCollectionsModal } from './dashboard/AllCollectionsModal'
import { DashboardModal } from './dashboard/DashboardModal'

interface AdminRootProviderProps {
  children: React.ReactNode
}

// ---------------------------------------------------------------------------
// Inline FAB styles
// ---------------------------------------------------------------------------

const FAB_BASE: React.CSSProperties = {
  position: 'fixed',
  right: '24px',
  zIndex: 99999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '56px',
  height: '56px',
  backgroundColor: '#0f172a',
  border: 'none',
  borderRadius: '14px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
}

function FabHover(e: React.MouseEvent<HTMLButtonElement>, enter: boolean) {
  e.currentTarget.style.transform = enter ? 'scale(1.05)' : 'scale(1)'
  e.currentTarget.style.boxShadow = enter
    ? '0 6px 25px rgba(0, 0, 0, 0.4)'
    : '0 4px 20px rgba(0, 0, 0, 0.3)'
}

// ---------------------------------------------------------------------------
// SVG icons
// ---------------------------------------------------------------------------

// Grid / collections icon
function IconCollections() {
  return (
    <svg width="22" height="22" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Gauge / dashboard icon
function IconDashboard() {
  return (
    <svg width="22" height="22" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 13.5a9 9 0 1 1 18 0"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 13.5 8.5 9"
      />
      <circle cx="12" cy="13.5" r="1.25" fill="#ffffff" stroke="none" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export const AdminRootProvider: React.FC<AdminRootProviderProps> = ({ children }) => {
  useEffect(() => {
    console.log('[AdminRootProvider] Provider mounted - Media Manager initialized')
  }, [])

  const { user } = useAuth()

  const [collectionsOpen, setCollectionsOpen] = useState(false)
  const [dashboardOpen, setDashboardOpen] = useState(false)

  return (
    <MediaManagerProvider>
      {children}

      {user && (
        <>
          {/* ── Modals ── */}
          <MediaManagerModal />
          <AllCollectionsModal open={collectionsOpen} onClose={() => setCollectionsOpen(false)} />
          <DashboardModal open={dashboardOpen} onClose={() => setDashboardOpen(false)} />

          {/* ── Dashboard FAB — top of stack ── */}
          <button
            type="button"
            title="Quick Dashboard"
            style={{ ...FAB_BASE, bottom: '160px' }}
            onClick={() => setDashboardOpen((o) => !o)}
            onMouseEnter={(e) => FabHover(e, true)}
            onMouseLeave={(e) => FabHover(e, false)}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)' }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.05)' }}
          >
            <IconDashboard />
          </button>

          {/* ── Collections FAB — middle ── */}
          <button
            type="button"
            title="All Collections"
            style={{ ...FAB_BASE, bottom: '92px' }}
            onClick={() => setCollectionsOpen((o) => !o)}
            onMouseEnter={(e) => FabHover(e, true)}
            onMouseLeave={(e) => FabHover(e, false)}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)' }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.05)' }}
          >
            <IconCollections />
          </button>

          {/* ── Media FAB — bottom ── */}
          <MediaManagerButton />
        </>
      )}
    </MediaManagerProvider>
  )
}
