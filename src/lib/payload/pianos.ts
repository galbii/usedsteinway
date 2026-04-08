import { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Piano as PayloadPiano, Brand, Media } from '@/payload-types'
import type { Piano } from '@/types/piano'
import { lexicalToPlainText } from '@/utilities/lexicalToPlainText'

// ─── Adapter ─────────────────────────────────────────────────────────────────

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

function getImageUrl(image: string | Media): string {
  if (typeof image === 'string') return ''
  return image.url ?? image.thumbnailURL ?? ''
}

function getBrandField(brand: string | Brand | null | undefined): { name: string; slug: string } {
  if (!brand) return { name: '', slug: '' }
  if (typeof brand === 'string') return { name: '', slug: '' }
  return { name: brand.name, slug: brand.slug }
}

function buildSpecs(doc: PayloadPiano): Record<string, string> {
  const specs: Record<string, string> = {}
  const s = doc.specifications

  if (s?.size) specs['Size'] = s.size
  if (s?.length) specs['Length'] = s.length
  if (s?.width) specs['Width'] = s.width
  if (s?.stringLength) specs['String Length'] = s.stringLength
  if (s?.keys) specs['Keys'] = String(s.keys)
  if (doc.finish) specs['Finish'] = doc.finish
  if (doc.year) specs['Year'] = String(doc.year)
  if (doc.serialNumber) specs['Serial'] = doc.serialNumber

  return specs
}

export function adaptPayloadPiano(doc: PayloadPiano): Piano {
  const brand = getBrandField(doc.brand as string | Brand | null | undefined)

  const imageUrls = (doc.images ?? [])
    .map((item) => getImageUrl(item.image))
    .filter(Boolean)

  const descriptionPlainText = lexicalToPlainText(doc.description)

  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    brand: brand.name,
    brandSlug: brand.slug,
    model: doc.model ?? '',
    year: doc.year ?? 0,
    serialNumber: doc.serialNumber ?? undefined,
    price: doc.price,
    priceDisplay: formatPrice(doc.price),
    retailPrice: doc.retailPrice ?? undefined,
    condition: doc.condition as Piano['condition'],
    finish: doc.finish ?? '',
    size: doc.specifications?.size ?? '',
    isAvailable: doc.isAvailable ?? false,
    isFeatured: doc.isFeatured ?? false,
    imageUrls,
    videoUrl: doc.videoUrl ?? undefined,
    description: descriptionPlainText,
    richTextDescription: doc.description ?? undefined,
    restorationHistory: doc.restorationHistory ?? undefined,
    conditionReport: doc.conditionReport ?? undefined,
    specs: buildSpecs(doc),
    tags: (doc.tags ?? []).map((t) => t.tag),
  }
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export const queryPianoBySlug = cache(async (slug: string): Promise<Piano | null> => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pianos',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    depth: 1,
    where: {
      slug: { equals: slug },
    },
  })

  const doc = result.docs?.[0]
  if (!doc) return null
  return adaptPayloadPiano(doc)
})

export const queryAvailablePianos = cache(async (): Promise<Piano[]> => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pianos',
    draft: false,
    limit: 200,
    overrideAccess: false,
    pagination: false,
    depth: 1,
    where: {
      and: [
        { isAvailable: { equals: true } },
        { _status: { equals: 'published' } },
      ],
    },
    sort: '-publishedAt',
  })

  return result.docs.map(adaptPayloadPiano)
})

export const queryFeaturedPianos = cache(async (): Promise<Piano[]> => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pianos',
    draft: false,
    limit: 10,
    overrideAccess: false,
    pagination: false,
    depth: 1,
    where: {
      and: [
        { isFeatured: { equals: true } },
        { isAvailable: { equals: true } },
        { _status: { equals: 'published' } },
      ],
    },
    sort: '-publishedAt',
  })

  return result.docs.map(adaptPayloadPiano)
})
