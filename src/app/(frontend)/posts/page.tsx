import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

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
      heroImage: true,
      meta: true,
    },
  })

  return (
    <div className="min-h-screen bg-white">
      <PageClient />

      {/* ── Section header ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-8 pt-28 pb-16">
        <div className="flex items-start justify-between gap-8">
          <div>
            {/* Overline */}
            <div className="flex items-center gap-4 mb-7">
              <div className="h-px w-10 shrink-0 bg-piano-gold" />
              <span className="font-display text-[9px] tracking-[0.5em] uppercase text-piano-gold">
                From the Showroom
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-cormorant font-light leading-[1.02] text-piano-black"
              style={{ fontSize: 'clamp(3.2rem, 6vw, 6.5rem)' }}
            >
              News &amp; Insights
            </h1>
          </div>

          {/* Article count */}
          {posts.totalDocs > 0 && (
            <div className="shrink-0 text-right hidden md:block pt-14">
              <p className="font-cormorant font-light text-[3.5rem] leading-none text-piano-linen">
                {posts.totalDocs}
              </p>
              <p className="mt-1 font-display text-[9px] tracking-[0.38em] uppercase text-piano-stone">
                {posts.totalDocs === 1 ? 'Article' : 'Articles'}
              </p>
            </div>
          )}
        </div>

        {/* Full-width rule */}
        <div className="mt-12 h-px bg-piano-linen" />
      </div>

      {/* ── Archive grid ──────────────────────────────────────── */}
      <div className="pb-24">
        <CollectionArchive posts={posts.docs} />
      </div>

      {/* ── Pagination ────────────────────────────────────────── */}
      {posts.totalPages > 1 && posts.page && (
        <div className="max-w-7xl mx-auto px-8 pb-24 border-t border-piano-linen">
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
    alternates: { canonical: '/posts' },
  }
}
