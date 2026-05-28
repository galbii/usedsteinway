import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Piano as PianoType } from '@/payload-types'
import { FeaturedProductsCarousel } from '@/components/piano/FeaturedProductsCarousel'
import type { Piano } from '@/types/piano'

type FeaturedPianosBlockProps = {
  heading?: string | null
  limit?: number | null
  pianos?: Array<{ piano: PianoType | string | null; id?: string | null }> | null
  blockType: 'featuredPianos'
  id?: string | null
  blockName?: string | null
  disableInnerContainer?: boolean
}

function isPopulatedPiano(val: PianoType | string | null | undefined): val is PianoType {
  return typeof val === 'object' && val !== null && 'id' in val
}

function adaptPayloadPiano(doc: PianoType): Piano {
  const imageUrls: string[] = []
  if (doc.images && Array.isArray(doc.images)) {
    for (const item of doc.images) {
      const img = item.image
      if (typeof img === 'object' && img !== null && 'url' in img && img.url) {
        imageUrls.push(img.url)
      }
    }
  }

  const brandObj = typeof doc.brand === 'object' && doc.brand !== null ? doc.brand : null

  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    brand: brandObj?.name ?? '',
    brandSlug: brandObj?.slug ?? '',
    model: doc.model ?? '',
    year: doc.year ?? 0,
    price: typeof doc.price === 'number' ? doc.price : null,
    priceDisplay: doc.price ? `$${doc.price.toLocaleString()}` : 'Call for Price',
    condition: (doc.condition as Piano['condition']) ?? 'used',
    finish: doc.finish ?? '',
    location: doc.location ?? null,
    isAvailable: doc.isAvailable ?? true,
    isFeatured: doc.isFeatured ?? false,
    priority: doc.priority ?? 0,
    imageUrls,
    tags: [],
    description: '',
    specs: {},
  }
}

export const FeaturedPianosBlock: React.FC<FeaturedPianosBlockProps> = async ({
  limit,
  pianos: pinnedPianos,
}) => {
  const safeLimit = limit ?? 6

  let displayPianos: Piano[] = []

  // If specific pianos are pinned, use those
  if (pinnedPianos && pinnedPianos.length > 0) {
    const populated = pinnedPianos
      .map((item) => item.piano)
      .filter(isPopulatedPiano)
    displayPianos = populated.map(adaptPayloadPiano)
  } else {
    // Otherwise fetch featured pianos automatically
    try {
      const payload = await getPayload({ config: configPromise })
      const result = await payload.find({
        collection: 'pianos',
        limit: safeLimit,
        overrideAccess: false,
        depth: 1,
        where: {
          and: [
            { _status: { equals: 'published' } },
            { isFeatured: { equals: true } },
          ],
        },
        sort: 'priority',
      })
      displayPianos = result.docs.map(adaptPayloadPiano)
    } catch {
      return null
    }
  }

  if (displayPianos.length === 0) return null

  return <FeaturedProductsCarousel pianos={displayPianos} />
}
