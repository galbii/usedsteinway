import React from 'react'
import type { Post } from '@/payload-types'
import { Card } from '../../components/Card'

const C = {
  accent:  'hsl(40, 72%, 52%)',
  text:    'hsl(350, 12%, 11%)',
  muted:   'hsl(350, 5%, 46%)',
  border:  'hsl(36, 18%, 89%)',
  ivory:   'hsl(36, 22%, 96%)',
}

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ docs }) => {
  if (!docs?.length) return null

  return (
    <section style={{ backgroundColor: C.ivory, borderTop: `1px solid ${C.border}` }}>
      <div className="max-w-7xl mx-auto px-8 py-20">

        {/* Header */}
        <div className="flex items-center gap-5 mb-14">
          <div style={{ height: '1px', width: '2.5rem', backgroundColor: C.accent, flexShrink: 0 }} />
          <span
            className="font-display text-[9px] tracking-[0.48em] uppercase"
            style={{ color: C.accent }}
          >
            Continue Reading
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: C.border }} />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
          {docs.map((doc, i) => {
            if (typeof doc === 'string') return null
            return (
              <Card
                key={i}
                doc={doc}
                relationTo="posts"
                showCategories
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
