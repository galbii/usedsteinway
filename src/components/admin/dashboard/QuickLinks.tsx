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
    padding: 12px 22px;
    background: hsl(0, 0%, 100%);
    border: 1.5px solid rgba(184, 134, 57, 0.55);
    border-radius: 3px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: hsl(25, 6%, 9%);
    cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s;
    font-family: inherit;
    line-height: 1;
  }
  .usw-ql-primary:hover {
    border-color: rgba(184, 134, 57, 0.85);
    box-shadow: 0 2px 8px rgba(184, 134, 57, 0.12);
  }
  .usw-ql-secondary {
    display: inline-flex;
    align-items: center;
    padding: 12px 18px;
    background: transparent;
    border: 1.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: hsl(25, 5%, 25%);
    cursor: pointer;
    text-decoration: none;
    transition: color 0.15s, border-color 0.15s;
    font-family: inherit;
    line-height: 1;
  }
  .usw-ql-secondary:hover {
    color: hsl(25, 5%, 9%);
    border-color: rgba(0, 0, 0, 0.35);
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
