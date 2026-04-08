'use client'

import React, { useState } from 'react'
import { toast } from '@payloadcms/ui'

type Status = 'idle' | 'loading' | 'done' | 'error'

export function SeedButton() {
  const [status, setStatus] = useState<Status>('idle')

  const handleSeed = async () => {
    if (status === 'loading') return
    setStatus('loading')

    try {
      const res = await fetch('/api/seed/pianos', { method: 'POST' })
      const data: { message?: string; error?: string } = await res.json()

      if (res.ok) {
        setStatus('done')
        toast.success(data.message ?? 'Seeded successfully.')
      } else {
        setStatus('error')
        toast.error(data.error ?? 'Seed failed.')
      }
    } catch {
      setStatus('error')
      toast.error('Request failed.')
    }
  }

  return (
    <div style={{ padding: '0 0 16px' }}>
      <button
        type="button"
        onClick={handleSeed}
        disabled={status === 'loading' || status === 'done'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          fontSize: '13px',
          fontWeight: 500,
          borderRadius: '4px',
          border: '1px solid var(--theme-elevation-200)',
          background: status === 'done' ? 'var(--theme-success-500)' : 'var(--theme-elevation-0)',
          color: status === 'done' ? '#fff' : 'var(--theme-text)',
          cursor: status === 'loading' || status === 'done' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.65 : 1,
          transition: 'all 0.15s ease',
        }}
      >
        {status === 'loading' && (
          <span
            style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              border: '2px solid currentColor',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.6s linear infinite',
            }}
          />
        )}
        {status === 'idle' && '🌱 Seed Sample Pianos'}
        {status === 'loading' && 'Seeding…'}
        {status === 'done' && '✓ Seeded'}
        {status === 'error' && '⚠ Retry Seed'}
      </button>

      {status === 'idle' && (
        <p style={{ margin: '6px 0 0', fontSize: '11px', color: 'var(--theme-elevation-500)' }}>
          Creates 4 sample pianos as drafts. Safe to run — skips slugs that already exist. Add images and publish when ready.
        </p>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
