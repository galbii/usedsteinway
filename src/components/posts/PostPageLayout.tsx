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
      <div className="flex items-stretch min-h-screen bg-white">

        {/* ── Left: hero + content blocks ────────────────────────── */}
        <div className="flex-1 min-w-0 bg-white">
          <PostHero post={post} />

          {hasBlocks && (
            <div className="px-10 pt-14 pb-32 md:px-14 lg:px-16 max-w-[820px]">
              <RenderBlocks blocks={post.layout!} />
            </div>
          )}

          {!hasBlocks && (
            <div className="px-10 py-20 md:px-14 lg:px-16 font-cormorant text-xl italic text-piano-stone">
              Content coming soon.
            </div>
          )}
        </div>

        {/* ── Right: collapse-on-hover sidebar rail ──────────────
            64px by default; expands to 280px on hover or when any
            child receives focus (keyboard accessible). The article
            column reclaims the width when collapsed. */}
        <div
          className="
            group hidden lg:block shrink-0
            w-16 hover:w-[280px] focus-within:w-[280px]
            transition-[width] duration-300 ease-out
            overflow-hidden
            border-l border-piano-linen bg-piano-cream
          "
        >
          <PostSidebar title={post.title} backHref={backHref} backLabel={backLabel} />
        </div>
      </div>

      {/* Mobile nav — shown only on small screens */}
      <div className="lg:hidden flex items-center justify-between px-6 py-5 border-t border-piano-linen bg-piano-cream">
        <Link
          href={backHref}
          className="font-display text-[11px] tracking-[0.2em] uppercase text-piano-stone no-underline"
        >
          ← {backLabel}
        </Link>
        <Link
          href="/pianos"
          className="font-display text-[11px] tracking-[0.2em] uppercase text-piano-stone no-underline"
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
