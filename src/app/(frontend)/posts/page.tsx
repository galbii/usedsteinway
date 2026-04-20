import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

const C = {
  accent:     'hsl(40, 72%, 52%)',
  text:       'hsl(350, 12%, 11%)',
  muted:      'hsl(350, 5%, 46%)',
  border:     'hsl(36, 18%, 89%)',
}

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <PageClient />

      {/* ── Section header ─────────────────────────────────────── */}
      <div
        className="max-w-7xl mx-auto px-8"
        style={{ paddingTop: '7rem', paddingBottom: '4rem' }}
      >
        <div className="flex items-start justify-between gap-8">
          <div>
            {/* Overline */}
            <div className="flex items-center gap-4 mb-7">
              <div style={{ height: '1px', width: '2.5rem', backgroundColor: C.accent, flexShrink: 0 }} />
              <span
                className="font-display text-[9px] tracking-[0.5em] uppercase"
                style={{ color: C.accent }}
              >
                From the Showroom
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-cormorant font-light leading-[1.02]"
              style={{ fontSize: 'clamp(3.2rem, 6vw, 6.5rem)', color: C.text }}
            >
              News &amp; Insights
            </h1>
          </div>

          {/* Article count */}
          {posts.totalDocs > 0 && (
            <div
              className="shrink-0 text-right hidden md:block"
              style={{ paddingTop: '3.5rem' }}
            >
              <p
                className="font-cormorant font-light"
                style={{ fontSize: '3.5rem', color: 'hsl(36, 18%, 86%)', lineHeight: 1 }}
              >
                {posts.totalDocs}
              </p>
              <p
                className="font-display text-[9px] tracking-[0.38em] uppercase mt-1"
                style={{ color: 'hsl(36, 18%, 74%)' }}
              >
                {posts.totalDocs === 1 ? 'Article' : 'Articles'}
              </p>
            </div>
          )}
        </div>

        {/* Full-width rule */}
        <div style={{ height: '1px', backgroundColor: C.border, marginTop: '3rem' }} />
      </div>

      {/* ── Archive grid ──────────────────────────────────────── */}
      <div style={{ paddingBottom: '6rem' }}>
        <CollectionArchive posts={posts.docs} />
      </div>

      {/* ── Pagination ────────────────────────────────────────── */}
      {posts.totalPages > 1 && posts.page && (
        <div
          className="max-w-7xl mx-auto px-8 pb-24"
          style={{ borderTop: `1px solid ${C.border}` }}
        >
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        </div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'News & Insights — UsedSteinways.com',
    description:
      "Expert guidance, market insights, and stories from Roger's Piano — New Hampshire's most discerning piano collection.",
  }
}
