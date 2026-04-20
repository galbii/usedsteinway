import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Media } from '@/payload-types'

function isMediaObject(val: unknown): val is Media {
  return typeof val === 'object' && val !== null && 'url' in (val as object)
}

export const queryGalleryImages = cache(async (limit = 6): Promise<Media[]> => {
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'media',
      overrideAccess: false,
      limit,
      pagination: false,
      where: { tags: { contains: 'gallery' } },
    })
    return docs.filter(isMediaObject)
  } catch {
    return []
  }
})
