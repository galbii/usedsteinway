import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Brand } from '../../../payload-types'

// Brands that render on their own dedicated routes instead of /pianos/[slug].
// `steinway` additionally has per-model detail pages at /steinway/[modelSlug];
// `shigeru-kawai` has a landing page only (no per-model route).
const DEDICATED_BRAND_LANDING: Record<string, string> = {
  steinway: '/steinway',
  'shigeru-kawai': '/shigeru',
}

// Flush every page that reads its content from a brand doc (model specs,
// descriptions, highlights, add/remove/reorder model, etc.).
//
// We revalidate concrete URLs — one per model — rather than dynamic-segment
// patterns like '/pianos/[slug]/[modelSlug]'. Literal paths are unambiguous and
// route-group-safe (these pages live under the (frontend) group), so the flush
// applies on the next visit immediately instead of waiting for the ISR window.
// Editing a brand is rare, so the per-model loop is cheap.
const revalidateBrandPages = (brand: Pick<Brand, 'slug' | 'models'>) => {
  const brandSlug = brand.slug
  if (!brandSlug) return

  const landing = DEDICATED_BRAND_LANDING[brandSlug]

  // Brand listing page
  revalidatePath(landing ?? `/pianos/${brandSlug}`)

  // Per-model detail pages
  for (const model of brand.models ?? []) {
    if (!model?.slug) continue

    if (brandSlug === 'steinway') {
      // Dedicated model route: /steinway/[modelSlug]
      revalidatePath(`/steinway/${model.slug}`)
    } else if (!landing) {
      // Dynamic brands render model pages under /pianos/[slug]/[modelSlug]
      revalidatePath(`/pianos/${brandSlug}/${model.slug}`)
    }
    // shigeru-kawai: landing page only, no per-model route to flush
  }
}

export const revalidateBrand: CollectionAfterChangeHook<Brand> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating brand pages for: ${doc.slug}`)
    revalidateBrandPages(doc)
    // Flush the prior state too so a renamed brand/model slug or a removed
    // model doesn't leave its old URL serving stale (or 404-able) content.
    if (previousDoc) revalidateBrandPages(previousDoc)
  }
  return doc
}

export const revalidateBrandDelete: CollectionAfterDeleteHook<Brand> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate && doc) {
    revalidateBrandPages(doc)
  }
}
