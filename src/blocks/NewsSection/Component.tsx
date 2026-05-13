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

export const NewsSectionBlock: React.FC<NewsSectionBlockProps> = async ({ limit }) => {
  const posts = await queryRecentPosts(limit ?? 4)

  if (!posts.length) return null

  return <NewsCarousel posts={posts} />
}
