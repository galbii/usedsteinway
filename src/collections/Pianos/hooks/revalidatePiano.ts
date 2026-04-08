import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Piano } from '../../../payload-types'

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
      revalidateTag('pianos-sitemap')
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/pianos/${previousDoc.slug}`

      payload.logger.info(`Revalidating old piano at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('pianos-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Piano> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/pianos/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('pianos-sitemap')
  }

  return doc
}
