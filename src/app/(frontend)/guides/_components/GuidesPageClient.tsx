'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { PostCard } from '@/lib/payload/posts'

type Tab = 'guides' | 'all'

interface Props {
  guides: PostCard[]
  allPosts: PostCard[]
}

function formatDate(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function PostCard({ post }: { post: PostCard; tab?: Tab }) {
  const href = post.isGuide ? `/guide/${post.slug}` : `/posts/${post.slug}`
  const ctaLabel = post.isGuide ? 'Read Guide' : 'Read Article'

  return (
    <Link
      href={href}
      className="group block bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        border: '1px solid hsl(36 18% 89%)',
        boxShadow: '0 2px 20px hsl(350 62% 26% / 0.10)',
      }}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-piano-warm-white">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-piano-burgundy/10 flex items-center justify-center">
            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-piano-burgundy/30">
              UsedSteinways
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-piano-black/20 group-hover:bg-piano-black/10 transition-colors" />
        {post.isGuide && (
          <div
            className="absolute top-4 left-4 px-3 py-1"
            style={{ backgroundColor: 'hsl(350 62% 26% / 0.85)' }}
          >
            <span className="font-display text-[9px] tracking-[0.35em] uppercase text-piano-gold">
              Guide
            </span>
          </div>
        )}
      </div>

      <div className="p-7">
        <div className="flex items-center justify-between mb-3">
          <span className="font-display text-[11px] tracking-[0.3em] uppercase text-piano-gold">
            {post.category ?? (post.isGuide ? 'Buying Guide' : 'News')}
          </span>
          {post.publishedAt && (
            <span className="text-piano-stone/70 text-xs">{formatDate(post.publishedAt)}</span>
          )}
        </div>
        <h2 className="font-cormorant font-light text-piano-black text-3xl mb-3 leading-snug group-hover:text-piano-gold transition-colors">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-piano-stone text-base leading-relaxed line-clamp-3">{post.excerpt}</p>
        )}
        <div className="mt-5 flex items-center gap-2 text-piano-gold/60 group-hover:text-piano-gold transition-colors">
          <span className="font-display text-[11px] tracking-[0.3em] uppercase">{ctaLabel}</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  )
}

function EmptyState({ tab }: { tab: Tab }) {
  return (
    <div className="col-span-full py-24 text-center">
      <p className="font-display text-[11px] tracking-[0.4em] uppercase text-piano-stone/50 mb-4">
        Coming Soon
      </p>
      <p className="font-cormorant font-light text-piano-black/40 text-2xl">
        {tab === 'guides'
          ? 'Buying guides are being prepared.'
          : 'Articles are being prepared.'}
      </p>
    </div>
  )
}

export function GuidesPageClient({ guides, allPosts }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('guides')
  const posts = activeTab === 'guides' ? guides : allPosts

  return (
    <section className="py-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Tab switcher */}
        <div className="flex items-center gap-0 mb-16 border-b border-piano-cream/60" style={{ borderColor: 'hsl(36 18% 87%)' }}>
          {([
            { id: 'guides' as Tab, label: 'Buying Guides', count: guides.length },
            { id: 'all' as Tab, label: 'All News & Articles', count: allPosts.length },
          ] as const).map(({ id, label, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="relative pb-4 mr-10 transition-colors duration-200"
              style={{
                color: activeTab === id ? 'hsl(350 62% 26%)' : 'hsl(350 5% 44%)',
              }}
            >
              <span className="font-display text-[11px] tracking-[0.3em] uppercase">
                {label}
              </span>
              {count > 0 && (
                <span
                  className="ml-2 font-display text-[9px] tracking-[0.2em]"
                  style={{ color: 'hsl(40 72% 52%)' }}
                >
                  {count}
                </span>
              )}
              {/* Active underline */}
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-200"
                style={{
                  backgroundColor: activeTab === id ? 'hsl(40 72% 52%)' : 'transparent',
                }}
              />
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length === 0 ? (
            <EmptyState tab={activeTab} />
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} tab={activeTab} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
