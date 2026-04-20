import React from 'react'

import { Card, CardPostData } from '@/components/Card'

const C = {
  border: 'hsl(36, 18%, 89%)',
}

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = ({ posts }) => {
  if (!posts?.length) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-24 text-center">
        <p
          className="font-cormorant font-light italic"
          style={{ fontSize: '2rem', color: 'hsl(350, 5%, 70%)' }}
        >
          No articles published yet.
        </p>
      </div>
    )
  }

  const [featured, ...rest] = posts

  return (
    <div className="max-w-7xl mx-auto px-8">

      {/* ── Featured post ─────────────────────────────────────── */}
      {featured && (
        <div className="mb-16">
          <Card doc={featured} relationTo="posts" showCategories featured />
        </div>
      )}

      {/* ── Grid of remaining posts ───────────────────────────── */}
      {rest.length > 0 && (
        <>
          <div style={{ height: '1px', backgroundColor: C.border, marginBottom: '3.5rem' }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-0">
            {rest.map((post, i) => (
              <Card key={i} doc={post} relationTo="posts" showCategories />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
