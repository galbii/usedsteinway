import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Testimonial } from '../../../payload-types'

export const revalidateTestimonial: CollectionAfterChangeHook<Testimonial> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/testimonials/${doc.slug}`
      payload.logger.info(`Revalidating testimonial at path: ${path}`)
      revalidatePath(path)
      revalidatePath('/testimonials')
      revalidateTag('testimonials-sitemap')
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/testimonials/${previousDoc.slug}`
      payload.logger.info(`Revalidating old testimonial at path: ${oldPath}`)
      revalidatePath(oldPath)
      revalidatePath('/testimonials')
      revalidateTag('testimonials-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Testimonial> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/testimonials/${doc?.slug}`
    revalidatePath(path)
    revalidatePath('/testimonials')
    revalidateTag('testimonials-sitemap')
  }
  return doc
}
