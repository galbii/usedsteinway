import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'

// Pages that list posts and must be flushed whenever the post index changes.
const revalidateListingPages = () => {
  revalidatePath('/posts')
  revalidatePath('/posts/page/[pageNumber]', 'page')
  revalidatePath('/guides')
  revalidatePath('/')
}

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const paths = [
        `/posts/${doc.slug}`,
        ...(doc.isGuide ? [`/guide/${doc.slug}`] : []),
      ]

      for (const path of paths) {
        payload.logger.info(`Revalidating post at path: ${path}`)
        revalidatePath(path)
      }

      revalidateListingPages()
      revalidateTag('posts-sitemap')
    }

    // Post was unpublished — remove it from all listing pages too
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPaths = [
        `/posts/${previousDoc.slug}`,
        ...(previousDoc.isGuide ? [`/guide/${previousDoc.slug}`] : []),
      ]

      for (const path of oldPaths) {
        payload.logger.info(`Revalidating old post at path: ${path}`)
        revalidatePath(path)
      }

      revalidateListingPages()
      revalidateTag('posts-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const paths = [
      `/posts/${doc?.slug}`,
      ...(doc?.isGuide ? [`/guide/${doc?.slug}`] : []),
    ]

    for (const path of paths) {
      revalidatePath(path)
    }

    revalidateListingPages()
    revalidateTag('posts-sitemap')
  }

  return doc
}
