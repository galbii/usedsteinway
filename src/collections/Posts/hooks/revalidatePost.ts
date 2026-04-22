import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const paths = [
        `/posts/${doc.slug}`,
        `/blog/${doc.slug}`,
        ...(doc.isGuide ? [`/guide/${doc.slug}`] : []),
      ]

      for (const path of paths) {
        payload.logger.info(`Revalidating post at path: ${path}`)
        revalidatePath(path)
      }
      revalidateTag('posts-sitemap')
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPaths = [
        `/posts/${previousDoc.slug}`,
        `/blog/${previousDoc.slug}`,
        ...(previousDoc.isGuide ? [`/guide/${previousDoc.slug}`] : []),
      ]

      for (const path of oldPaths) {
        payload.logger.info(`Revalidating old post at path: ${path}`)
        revalidatePath(path)
      }
      revalidateTag('posts-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const paths = [
      `/posts/${doc?.slug}`,
      `/blog/${doc?.slug}`,
      ...(doc?.isGuide ? [`/guide/${doc?.slug}`] : []),
    ]

    for (const path of paths) {
      revalidatePath(path)
    }
    revalidateTag('posts-sitemap')
  }

  return doc
}
