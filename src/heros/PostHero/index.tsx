import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'
import Link from 'next/link'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

const C = {
  accent:     'hsl(40, 72%, 52%)',
  text:       'hsl(350, 12%, 11%)',
  muted:      'hsl(350, 5%, 46%)',
  border:     'hsl(36, 18%, 89%)',
  borderThin: 'hsl(36, 15%, 92%)',
}

export const PostHero: React.FC<{ post: Post }> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title, meta } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const firstCategory =
    categories &&
    categories.length > 0 &&
    typeof categories[0] === 'object' &&
    categories[0] !== null
      ? (categories[0] as { title?: string | null }).title
      : null

  const excerpt = meta?.description ?? null

  return (
    <div style={{ backgroundColor: '#fff' }}>

      {/* ── Text block ─────────────────────────────────────────── */}
      <div
        className="mx-auto px-8"
        style={{ maxWidth: '900px', paddingTop: '5rem', paddingBottom: '3.5rem' }}
      >
        {/* Breadcrumb */}
        <nav className="flex items-center gap-3 mb-10">
          <Link
            href="/posts"
            className="font-display text-[9px] tracking-[0.42em] uppercase transition-opacity hover:opacity-50"
            style={{ color: C.muted }}
          >
            News &amp; Insights
          </Link>
          {firstCategory && (
            <>
              <span style={{ color: C.border, fontSize: '10px' }}>—</span>
              <span
                className="font-display text-[9px] tracking-[0.42em] uppercase"
                style={{ color: C.accent }}
              >
                {firstCategory}
              </span>
            </>
          )}
        </nav>

        {/* Gold hairline + category marker */}
        <div className="flex items-center gap-5 mb-8">
          <div style={{ height: '1px', width: '2.5rem', backgroundColor: C.accent, flexShrink: 0 }} />
          {firstCategory && (
            <span
              className="font-display text-[9px] tracking-[0.45em] uppercase"
              style={{ color: C.accent }}
            >
              {firstCategory}
            </span>
          )}
        </div>

        {/* Title */}
        <h1
          className="font-cormorant font-light leading-[1.04]"
          style={{
            fontSize: 'clamp(3rem, 6.5vw, 7rem)',
            color: C.text,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h1>

        {/* Excerpt */}
        {excerpt && (
          <p
            className="text-lg leading-[1.85] mt-7"
            style={{ color: C.muted, maxWidth: '52ch', fontWeight: 300 }}
          >
            {excerpt}
          </p>
        )}

        {/* Meta row */}
        <div
          className="flex flex-wrap items-center gap-x-10 gap-y-3 mt-10 pt-8"
          style={{ borderTop: `1px solid ${C.borderThin}` }}
        >
          {hasAuthors && (
            <div>
              <p
                className="font-display text-[9px] tracking-[0.38em] uppercase mb-1.5"
                style={{ color: 'hsl(36, 15%, 72%)' }}
              >
                Author
              </p>
              <p className="font-cormorant text-lg font-light" style={{ color: C.text }}>
                {formatAuthors(populatedAuthors)}
              </p>
            </div>
          )}

          {publishedAt && (
            <div>
              <p
                className="font-display text-[9px] tracking-[0.38em] uppercase mb-1.5"
                style={{ color: 'hsl(36, 15%, 72%)' }}
              >
                Published
              </p>
              <time
                dateTime={publishedAt}
                className="font-cormorant text-lg font-light"
                style={{ color: C.text }}
              >
                {formatDateTime(publishedAt)}
              </time>
            </div>
          )}

          {/* All categories */}
          {categories && categories.length > 0 && (
            <div className="ml-auto">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, i) => {
                  if (typeof cat !== 'object' || cat === null) return null
                  const c = cat as { title?: string | null }
                  return (
                    <span
                      key={i}
                      className="font-display text-[8px] tracking-[0.3em] uppercase px-3 py-1.5"
                      style={{
                        backgroundColor: 'hsla(40, 72%, 52%, 0.10)',
                        color: 'hsl(40, 55%, 38%)',
                      }}
                    >
                      {c.title}
                    </span>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Hero image — cinematic strip ───────────────────────── */}
      {heroImage && typeof heroImage !== 'string' && (
        <div className="mx-auto px-8 pb-16" style={{ maxWidth: '1200px' }}>
          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: '16 / 6.5',
              boxShadow: '0 2px 40px hsl(350 12% 11% / 0.08)',
            }}
          >
            <Media fill priority imgClassName="object-cover" resource={heroImage} />
            {/* Subtle inner shadow at bottom */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.08) 0%, transparent 30%)',
              }}
            />
          </div>
        </div>
      )}

      {/* Full-width divider before content */}
      <div style={{ height: '1px', backgroundColor: C.borderThin }} />
    </div>
  )
}
