'use client'
import useClickableCard from '@/hooks/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

const C = {
  accent:      'hsl(40, 72%, 52%)',
  accentFaint: 'hsla(40, 72%, 52%, 0.10)',
  accentText:  'hsl(40, 55%, 38%)',
  text:        'hsl(350, 12%, 11%)',
  muted:       'hsl(350, 5%, 46%)',
  border:      'hsl(36, 18%, 89%)',
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
  featured?: boolean
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps, featured } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const href = `/${relationTo}/${slug}`

  if (featured) {
    // ── Featured card: horizontal layout ─────────────────────
    return (
      <article
        ref={card.ref}
        className="group flex flex-col lg:flex-row cursor-pointer"
        style={{ borderTop: `2px solid ${C.accent}` }}
      >
        {/* Image */}
        <div
          className="relative overflow-hidden lg:w-[55%] aspect-[16/10] lg:aspect-auto shrink-0"
          style={{ backgroundColor: 'hsl(36, 22%, 94%)' }}
        >
          {metaImage && typeof metaImage !== 'string' ? (
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
              <Media resource={metaImage} fill imgClassName="object-cover" size="(max-width: 1024px) 100vw, 55vw" />
            </div>
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: 'hsl(36, 22%, 94%)' }}
            >
              <span className="font-cormorant font-light italic" style={{ fontSize: '3rem', color: 'hsl(36, 18%, 82%)' }}>
                Roger&rsquo;s Piano
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className="flex flex-col justify-between lg:flex-1 p-8 lg:p-12"
          style={{ backgroundColor: '#fff' }}
        >
          <div>
            {/* Category */}
            {showCategories && hasCategories && (
              <div className="flex flex-wrap gap-2 mb-6">
                {categories?.map((cat, i) => {
                  if (typeof cat !== 'object') return null
                  const c = cat as { title?: string | null }
                  return (
                    <span
                      key={i}
                      className="font-display text-[8px] tracking-[0.35em] uppercase px-3 py-1.5"
                      style={{ backgroundColor: C.accentFaint, color: C.accentText }}
                    >
                      {c.title}
                    </span>
                  )
                })}
              </div>
            )}

            {/* Title */}
            {titleToUse && (
              <h2
                className="font-cormorant font-light leading-[1.06] mb-6"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3.8rem)', color: C.text }}
              >
                <Link
                  href={href}
                  ref={link.ref}
                  className="transition-opacity hover:opacity-70"
                >
                  {titleToUse}
                </Link>
              </h2>
            )}

            {description && (
              <p
                className="text-base leading-[1.8]"
                style={{ color: C.muted, maxWidth: '44ch' }}
              >
                {description.replace(/\s/g, ' ')}
              </p>
            )}
          </div>

          {/* Read link */}
          <div
            className="flex items-center gap-3 mt-8 pt-7"
            style={{ borderTop: `1px solid hsl(36, 15%, 92%)` }}
          >
            <span
              className="font-display text-[9px] tracking-[0.38em] uppercase transition-opacity duration-200 group-hover:opacity-50"
              style={{ color: C.muted }}
            >
              Read article
            </span>
            <span
              className="inline-flex items-center justify-center w-8 h-8 transition-all duration-300 group-hover:border-[hsl(40,72%,52%)] group-hover:bg-[hsl(40,72%,52%)]"
              style={{ border: `1px solid ${C.border}` }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                className="group-hover:[&_path]:stroke-white transition-none">
                <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke={C.muted} strokeWidth="1"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    )
  }

  // ── Standard card ─────────────────────────────────────────────
  return (
    <article
      ref={card.ref}
      className={`group cursor-pointer flex flex-col ${className ?? ''}`}
      style={{ borderTop: `1px solid ${C.border}` }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden aspect-[16/10] mb-0"
        style={{ backgroundColor: 'hsl(36, 22%, 94%)' }}
      >
        {metaImage && typeof metaImage !== 'string' ? (
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
            <Media resource={metaImage} fill imgClassName="object-cover" size="33vw" />
          </div>
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'hsl(36, 22%, 94%)' }}
          >
            <span
              className="font-display text-[9px] tracking-[0.35em] uppercase"
              style={{ color: 'hsl(36, 18%, 76%)' }}
            >
              Roger&rsquo;s Piano
            </span>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="pt-5 pb-7 flex-1 flex flex-col">
        {/* Category */}
        {showCategories && hasCategories && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {categories?.map((cat, i) => {
              if (typeof cat !== 'object') return null
              const c = cat as { title?: string | null }
              if (!c.title) return null
              return (
                <span
                  key={i}
                  className="font-display text-[8px] tracking-[0.3em] uppercase px-2.5 py-1"
                  style={{ backgroundColor: C.accentFaint, color: C.accentText }}
                >
                  {c.title}
                </span>
              )
            })}
          </div>
        )}

        {/* Title */}
        {titleToUse && (
          <h3
            className="font-cormorant font-light leading-[1.1] flex-1"
            style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2.1rem)', color: C.text }}
          >
            <Link
              href={href}
              ref={link.ref}
              className="transition-opacity hover:opacity-70"
            >
              {titleToUse}
            </Link>
          </h3>
        )}

        {description && (
          <p
            className="text-sm leading-[1.8] mt-3"
            style={{ color: C.muted }}
          >
            {description.replace(/\s/g, ' ').slice(0, 120)}
            {description.length > 120 ? '…' : ''}
          </p>
        )}

        {/* Read link */}
        <div className="mt-5">
          <span
            className="font-display text-[8px] tracking-[0.35em] uppercase inline-flex items-center gap-2 transition-opacity duration-200 group-hover:opacity-50"
            style={{ color: C.accent }}
          >
            Read article
            <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
          </span>
        </div>
      </div>
    </article>
  )
}
