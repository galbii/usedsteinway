import React from 'react'
import Link from 'next/link'
import type { Post } from '@/payload-types'
import { PostHero } from '@/heros/PostHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PostSidebar } from './PostSidebar'

type Props = {
  post: Post
  backHref?: string
  backLabel?: string
}

export const PostPageLayout: React.FC<Props> = ({
  post,
  backHref = '/posts',
  backLabel = 'All Posts',
}) => {
  const hasBlocks  = post.layout && post.layout.length > 0
  const hasRelated = post.relatedPosts && post.relatedPosts.length > 0

  return (
    <>
      {/*
        Single flex row: sidebar on the left, article column on the right.
        The sidebar starts at the top of this layout (alongside the hero),
        making it always visible — no split appearance.
      */}
      <div className="flex items-stretch" style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

        {/* ── Left: sticky sidebar panel ─────────────────────────── */}
        <div
          className="hidden lg:block shrink-0"
          style={{
            width: '280px',
            borderRight: '1px solid hsl(36, 20%, 88%)',
            backgroundColor: 'hsl(36, 18%, 97%)',
          }}
        >
          <PostSidebar title={post.title} backHref={backHref} backLabel={backLabel} />
        </div>

        {/* ── Right: hero + content blocks ───────────────────────── */}
        <div className="flex-1 min-w-0" style={{ backgroundColor: '#fff' }}>

          {/* Hero lives here so the sidebar accompanies it from the top */}
          <PostHero post={post} />

          {/* Content blocks */}
          {hasBlocks && (
            <div style={{ padding: '3.5rem 4rem 8rem', maxWidth: '780px' }}>
              <RenderBlocks blocks={post.layout!} />
            </div>
          )}

          {!hasBlocks && (
            <div
              style={{
                padding: '5rem 4rem',
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '1.25rem',
                color: '#888',
                fontStyle: 'italic',
              }}
            >
              Content coming soon.
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav — shown only on small screens */}
      <div
        className="lg:hidden flex items-center justify-between px-6 py-5"
        style={{
          borderTop: '1px solid hsl(36, 20%, 88%)',
          backgroundColor: 'hsl(36, 18%, 97%)',
        }}
      >
        <Link
          href={backHref}
          style={{
            fontFamily: '"Syne", sans-serif',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#555',
            textDecoration: 'none',
          }}
        >
          ← {backLabel}
        </Link>
        <Link
          href="/pianos"
          style={{
            fontFamily: '"Syne", sans-serif',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#555',
            textDecoration: 'none',
          }}
        >
          Browse Pianos →
        </Link>
      </div>

      {hasRelated && (
        <RelatedPosts
          docs={post.relatedPosts!.filter((p) => typeof p === 'object')}
        />
      )}
    </>
  )
}
