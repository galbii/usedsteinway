import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Piano } from '../../../payload-types'

// Statically-rendered pages that list/group pianos and must be flushed whenever
// any piano changes (sort order, availability, price, add/remove, etc.).
// Detail pages (/pianos/[slug]) are handled separately by slug.
const revalidateListingPages = () => {
  revalidatePath('/pianos')
  revalidatePath('/steinway')
  revalidatePath('/steinway/[modelSlug]', 'page')
  revalidatePath('/shigeru')
  revalidatePath('/european-pianos')
  revalidatePath('/pianos/[slug]/[modelSlug]', 'page')
  revalidatePath('/')
}

export const revalidatePiano: CollectionAfterChangeHook<Piano> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/pianos/${doc.slug}`

      payload.logger.info(`Revalidating piano at path: ${path}`)

      revalidatePath(path)
      revalidateListingPages()
      revalidateTag('pianos-sitemap')
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/pianos/${previousDoc.slug}`

      payload.logger.info(`Revalidating old piano at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateListingPages()
      revalidateTag('pianos-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Piano> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/pianos/${doc?.slug}`

    revalidatePath(path)
    revalidateListingPages()
    revalidateTag('pianos-sitemap')
  }

  return doc
}
