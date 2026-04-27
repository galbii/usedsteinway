import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Post, Media, Category } from '@/payload-types'

export type PostCard = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  imageUrl: string | null
  publishedAt: string | null
  category: string | null
  isGuide: boolean
  isNews: boolean
}

function getMediaUrl(media: string | Media | null | undefined): string | null {
  if (!media || typeof media === 'string') return null
  return media.url ?? media.thumbnailURL ?? null
}

function getCategoryLabel(categories: (string | Category)[] | null | undefined): string | null {
  if (!categories?.length) return null
  const first = categories[0]
  if (typeof first === 'string') return null
  return first.title ?? null
}

function adaptPost(doc: Post): PostCard {
  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.meta?.description ?? null,
    imageUrl: getMediaUrl(doc.heroImage as string | Media | null | undefined),
    publishedAt: doc.publishedAt ?? null,
    category: getCategoryLabel(doc.categories as (string | Category)[] | null | undefined),
    isGuide: doc.isGuide ?? false,
    isNews: doc.isNews ?? false,
  }
}

export const queryGuidePosts = cache(async (limit = 100): Promise<PostCard[]> => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft: false,
    limit,
    overrideAccess: false,
    pagination: false,
    depth: 1,
    where: {
      and: [
        { _status: { equals: 'published' } },
        { isGuide: { equals: true } },
      ],
    },
    sort: '-publishedAt',
  })

  return result.docs.map(adaptPost)
})

export const queryAllPosts = cache(async (limit = 100): Promise<PostCard[]> => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft: false,
    limit,
    overrideAccess: false,
    pagination: false,
    depth: 1,
    where: {
      _status: { equals: 'published' },
    },
    sort: '-publishedAt',
  })

  return result.docs.map(adaptPost)
})

export const queryRecentPosts = cache(async (limit = 6): Promise<PostCard[]> => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft: false,
    limit,
    overrideAccess: false,
    pagination: false,
    depth: 1,
    where: {
      _status: { equals: 'published' },
    },
    sort: '-publishedAt',
  })

  return result.docs.map(adaptPost)
})
