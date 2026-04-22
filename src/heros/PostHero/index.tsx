import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'
import Link from 'next/link'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

const gold       = 'hsl(40, 72%, 52%)'
const black      = '#111'
const charcoal   = '#444'
const muted      = '#777'
const borderLine = 'hsl(36, 20%, 88%)'

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
    <div style={{ borderBottom: `1px solid ${borderLine}` }}>

      {/* ── Title + meta ───────────────────────────────────────── */}
      <div style={{ padding: '3.5rem 4rem 3rem' }}>

        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2.5rem' }}>
          <Link
            href="/posts"
            style={{
              fontFamily: '"Syne", sans-serif',
              fontSize: '10px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: muted,
              textDecoration: 'none',
            }}
          >
            News &amp; Insights
          </Link>
          {firstCategory && (
            <>
              <span style={{ color: borderLine }}>—</span>
              <span
                style={{
                  fontFamily: '"Syne", sans-serif',
                  fontSize: '10px',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: gold,
                }}
              >
                {firstCategory}
              </span>
            </>
          )}
        </nav>

        {/* Gold rule */}
        <div style={{ width: '2.5rem', height: '2px', backgroundColor: gold, marginBottom: '2rem' }} />

        {/* Title */}
        <h1
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 400,
            fontSize: 'clamp(2.5rem, 4.5vw, 5rem)',
            lineHeight: 1.08,
            color: black,
            letterSpacing: '-0.01em',
            marginBottom: excerpt ? '1.5rem' : '0',
            maxWidth: '20ch',
          }}
        >
          {title}
        </h1>

        {/* Excerpt */}
        {excerpt && (
          <p
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '1.3rem',
              lineHeight: 1.7,
              color: charcoal,
              fontWeight: 300,
              maxWidth: '48ch',
              marginBottom: 0,
            }}
          >
            {excerpt}
          </p>
        )}

        {/* Meta row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '2rem 3rem',
            marginTop: '2rem',
            paddingTop: '1.75rem',
            borderTop: `1px solid ${borderLine}`,
          }}
        >
          {hasAuthors && (
            <div>
              <p
                style={{
                  fontFamily: '"Syne", sans-serif',
                  fontSize: '9px',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: muted,
                  marginBottom: '5px',
                }}
              >
                Author
              </p>
              <p
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.1rem',
                  color: black,
                  fontWeight: 400,
                }}
              >
                {formatAuthors(populatedAuthors)}
              </p>
            </div>
          )}

          {publishedAt && (
            <div>
              <p
                style={{
                  fontFamily: '"Syne", sans-serif',
                  fontSize: '9px',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: muted,
                  marginBottom: '5px',
                }}
              >
                Published
              </p>
              <time
                dateTime={publishedAt}
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.1rem',
                  color: black,
                  fontWeight: 400,
                }}
              >
                {formatDateTime(publishedAt)}
              </time>
            </div>
          )}

          {/* Category pills */}
          {categories && categories.length > 0 && (
            <div style={{ marginLeft: 'auto' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {categories.map((cat, i) => {
                  if (typeof cat !== 'object' || cat === null) return null
                  const c = cat as { title?: string | null }
                  return (
                    <span
                      key={i}
                      style={{
                        fontFamily: '"Syne", sans-serif',
                        fontSize: '9px',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        padding: '5px 12px',
                        backgroundColor: 'hsla(40, 72%, 52%, 0.12)',
                        color: 'hsl(40, 55%, 36%)',
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

      {/* ── Hero image ─────────────────────────────────────────── */}
      {heroImage && typeof heroImage !== 'string' && (
        <div style={{ position: 'relative', aspectRatio: '16 / 7', overflow: 'hidden' }}>
          <Media fill priority imgClassName="object-cover" resource={heroImage} />
        </div>
      )}
    </div>
  )
}
