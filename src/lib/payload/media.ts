import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Media } from '@/payload-types'

function isMediaObject(val: unknown): val is Media {
  return typeof val === 'object' && val !== null && 'url' in (val as object)
}

export const queryHeroImages = cache(async (limit = 18): Promise<Media[]> => {
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'media',
      overrideAccess: false,
      limit,
      pagination: false,
      where: { tags: { contains: 'piano' } },
    })
    return docs.filter(isMediaObject)
  } catch {
    return []
  }
})

export const queryGalleryImages = cache(async (limit = 6): Promise<Media[]> => {
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'media',
      overrideAccess: false,
      limit,
      pagination: false,
      where: { tags: { contains: 'piano' } },
    })
    return docs.filter(isMediaObject)
  } catch {
    return []
  }
})

export const querySteinwayPhotos = cache(async (limit = 18): Promise<Media[]> => {
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'media',
      overrideAccess: false,
      limit,
      pagination: false,
      where: { tags: { contains: 'steinway' } },
    })
    return docs.filter(isMediaObject)
  } catch {
    return []
  }
})

export const queryShowroomPhotos = cache(async (limit = 18): Promise<Media[]> => {
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'media',
      overrideAccess: false,
      limit,
      pagination: false,
      where: {
        or: [
          { tags: { contains: 'burlington' } },
          { tags: { contains: 'natick' } },
          { tags: { contains: 'showroom' } },
        ],
      },
    })
    return docs.filter(isMediaObject)
  } catch {
    return []
  }
})
