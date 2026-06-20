import React from 'react'
import { queryRecentPosts } from '@/lib/payload/posts'
import { NewsCarousel } from '@/components/posts/NewsCarousel'

type NewsSectionBlockProps = {
  heading?: string | null
  limit?: number | null
  blockType: 'newsSection'
  id?: string | null
  blockName?: string | null
  disableInnerContainer?: boolean
}

// Static homepage default — page.tsx fetches queryRecentPosts(6) and renders
// <NewsCarousel> unconditionally (it has its own empty state).
const DEFAULT_LIMIT = 6

export const NewsSectionBlock: React.FC<NewsSectionBlockProps> = async ({ limit }) => {
  // Same live source as the static homepage; when the field is empty fall back
  // to the static default count so the output matches exactly.
  const posts = await queryRecentPosts(limit ?? DEFAULT_LIMIT)

  return <NewsCarousel posts={posts} />
}
