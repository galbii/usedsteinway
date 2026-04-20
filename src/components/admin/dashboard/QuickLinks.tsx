'use client'

import { useEffect, useState } from 'react'
import { PianoManagerModal } from './PianoManagerModal'
import { PostManagerModal } from './PostManagerModal'
import { AllCollectionsModal } from './AllCollectionsModal'

const STYLES = `
  .usw-ql-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 20px;
    background: rgba(184, 134, 57, 0.07);
    border: 1px solid rgba(184, 134, 57, 0.25);
    border-radius: 3px;
    font-size: 13px;
    letter-spacing: 0.08em;
    color: hsl(36, 18%, 97%);
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    font-family: inherit;
    line-height: 1;
  }
  .usw-ql-primary:hover {
    background: rgba(184, 134, 57, 0.13);
    border-color: rgba(184, 134, 57, 0.5);
  }
  .usw-ql-secondary {
    display: inline-flex;
    align-items: center;
    padding: 11px 16px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: hsl(25, 4%, 48%);
    cursor: pointer;
    text-decoration: none;
    transition: color 0.15s, border-color 0.15s;
    font-family: inherit;
    line-height: 1;
  }
  .usw-ql-secondary:hover {
    color: hsl(25, 4%, 72%);
    border-color: rgba(255, 255, 255, 0.15);
  }
`

export function QuickLinks() {
  const [pianoOpen, setPianoOpen] = useState(false)
  const [postOpen, setPostOpen] = useState(false)
  const [collectionsOpen, setCollectionsOpen] = useState(false)

  useEffect(() => {
    if (!document.getElementById('usw-ql-styles')) {
      const el = document.createElement('style')
      el.id = 'usw-ql-styles'
      el.textContent = STYLES
      document.head.appendChild(el)
    }
  }, [])

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button type="button" className="usw-ql-primary" onClick={() => setPianoOpen(true)}>
          ▸ Piano Manager
        </button>
        <button type="button" className="usw-ql-primary" onClick={() => setPostOpen(true)}>
          ▸ Post Manager
        </button>
        <button type="button" className="usw-ql-secondary" onClick={() => setCollectionsOpen(true)}>
          All Collections →
        </button>
      </div>

      <PianoManagerModal open={pianoOpen} onClose={() => setPianoOpen(false)} />
      <PostManagerModal open={postOpen} onClose={() => setPostOpen(false)} />
      <AllCollectionsModal open={collectionsOpen} onClose={() => setCollectionsOpen(false)} />
    </>
  )
}
