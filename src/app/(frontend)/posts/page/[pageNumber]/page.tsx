import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const revalidate = 600

const C = {
  accent:  'hsl(40, 72%, 52%)',
  text:    'hsl(350, 12%, 11%)',
  muted:   'hsl(350, 5%, 46%)',
  border:  'hsl(36, 18%, 89%)',
}

type Args = {
  params: Promise<{ pageNumber: string }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)
  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
  })

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <PageClient />

      {/* ── Section header ─────────────────────────────────────── */}
      <div
        className="max-w-7xl mx-auto px-8"
        style={{ paddingTop: '7rem', paddingBottom: '4rem' }}
      >
        <div className="flex items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-7">
              <div style={{ height: '1px', width: '2.5rem', backgroundColor: C.accent, flexShrink: 0 }} />
              <span
                className="font-display text-[9px] tracking-[0.5em] uppercase"
                style={{ color: C.accent }}
              >
                From the Showroom
              </span>
            </div>
            <h1
              className="font-cormorant font-light leading-[1.02]"
              style={{ fontSize: 'clamp(3.2rem, 6vw, 6.5rem)', color: C.text }}
            >
              News &amp; Insights
            </h1>
          </div>

          <p
            className="font-display text-[9px] tracking-[0.38em] uppercase shrink-0 mb-2"
            style={{ color: C.muted }}
          >
            Page {sanitizedPageNumber} of {posts.totalPages}
          </p>
        </div>

        <div style={{ height: '1px', backgroundColor: C.border, marginTop: '3rem' }} />
      </div>

      {/* ── Archive ────────────────────────────────────────────── */}
      <div style={{ paddingBottom: '6rem' }}>
        <CollectionArchive posts={posts.docs} />
      </div>

      {/* ── Pagination ─────────────────────────────────────────── */}
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

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `News & Insights — Page ${pageNumber} — UsedSteinways.com`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 12)
  const pages: { pageNumber: string }[] = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }
  return pages
}
