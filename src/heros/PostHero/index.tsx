import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'
import Link from 'next/link'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

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
  const hasImage = heroImage && typeof heroImage !== 'string'

  return (
    <div className="relative isolate flex min-h-[62vh] flex-col overflow-hidden bg-piano-burgundy md:min-h-[68vh]">
      {/* Layer 1 — featured image (or solid burgundy when missing) */}
      {hasImage && (
        <Media
          fill
          priority
          resource={heroImage}
          imgClassName="object-cover"
        />
      )}

      {/* Layer 2 — gradient overlay for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-t from-black/85 via-black/35 to-transparent"
      />

      {/* Layer 3 — content */}
      <div className="relative z-10 flex flex-1 flex-col px-10 py-12 md:px-14 lg:px-16">
        {/* Breadcrumb pinned to top */}
        <nav className="flex items-center gap-2.5">
          <Link
            href="/posts"
            className="font-display text-[10px] tracking-[0.35em] uppercase text-piano-cream/70 no-underline transition-colors hover:text-piano-cream"
          >
            News &amp; Insights
          </Link>
          {firstCategory && (
            <>
              <span className="text-piano-cream/40">—</span>
              <span className="font-display text-[10px] tracking-[0.35em] uppercase text-piano-gold">
                {firstCategory}
              </span>
            </>
          )}
        </nav>

        {/* Spacer — pushes title block to the bottom */}
        <div className="flex-1 min-h-[6rem]" />

        {/* Bottom block: gold rule + title + excerpt + meta */}
        <div>
          <div className="mb-5 h-[2px] w-10 bg-piano-gold" />

          <h1 className="font-cormorant font-light leading-[1.08] tracking-[-0.005em] text-piano-cream text-[clamp(1.75rem,3.2vw,2.875rem)]">
            {title}
          </h1>

          {excerpt && (
            <p className="mt-4 max-w-[60ch] font-cormorant text-lg font-light leading-[1.65] text-piano-cream/85">
              {excerpt}
            </p>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-x-12 gap-y-5 border-t border-piano-cream/15 pt-5">
            {hasAuthors && (
              <div>
                <p className="mb-1 font-display text-[9px] tracking-[0.35em] uppercase text-piano-cream/55">
                  Author
                </p>
                <p className="font-cormorant text-base font-normal text-piano-cream">
                  {formatAuthors(populatedAuthors)}
                </p>
              </div>
            )}

            {publishedAt && (
              <div>
                <p className="mb-1 font-display text-[9px] tracking-[0.35em] uppercase text-piano-cream/55">
                  Published
                </p>
                <time
                  dateTime={publishedAt}
                  className="font-cormorant text-base font-normal text-piano-cream"
                >
                  {formatDateTime(publishedAt)}
                </time>
              </div>
            )}

            {categories && categories.length > 0 && (
              <div className="ml-auto">
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat, i) => {
                    if (typeof cat !== 'object' || cat === null) return null
                    const c = cat as { title?: string | null }
                    return (
                      <span
                        key={i}
                        className="border border-piano-gold/30 bg-piano-gold/20 px-3 py-1 font-display text-[9px] tracking-[0.25em] uppercase text-piano-cream"
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
      </div>
    </div>
  )
}
