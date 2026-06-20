import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Brand } from '../../../payload-types'

// Pages that read brand/model content from the Brands collection and must be
// flushed whenever a brand changes (model specs, descriptions, highlights,
// add/remove model, reorder, etc.). Brands are not draft-versioned, so any
// save flushes the full set. Editing a brand is rare, so broad invalidation
// is cheap and safe.
const revalidateBrandPages = () => {
  // Dedicated brand listing pages (models grid is CMS-driven)
  revalidatePath('/steinway')
  revalidatePath('/shigeru')
  // Model detail pages
  revalidatePath('/steinway/[modelSlug]', 'page')
  revalidatePath('/pianos/[slug]/[modelSlug]', 'page')
}

export const revalidateBrand: CollectionAfterChangeHook<Brand> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating brand pages for: ${doc.slug}`)
    revalidateBrandPages()
  }
  return doc
}

export const revalidateBrandDelete: CollectionAfterDeleteHook<Brand> = ({
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateBrandPages()
  }
}
