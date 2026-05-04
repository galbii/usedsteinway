import { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Piano as PayloadPiano, Brand, Media } from '@/payload-types'
import type { Piano } from '@/types/piano'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { lexicalToPlainText } from '@/utilities/lexicalToPlainText'
import { parseSizeFt } from '@/lib/pianoFilters'

// ─── Adapter ─────────────────────────────────────────────────────────────────

function formatPrice(price: number | null | undefined, priceOnCall?: boolean | null): string {
  if (priceOnCall) return 'Call for Pricing'
  if (!price) return 'Contact for Price'
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
  if (s?.pedals) specs['Pedals'] = String(s.pedals)
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
    price: doc.price ?? null,
    priceDisplay: formatPrice(doc.price, doc.priceOnCall),
    priceOnCall: doc.priceOnCall ?? false,
    retailPrice: doc.retailPrice ?? undefined,
    condition: doc.condition as Piano['condition'],
    finish: doc.finish ?? '',
    size: doc.specifications?.size ?? '',
    location: doc.location ?? null,
    isAvailable: doc.isAvailable ?? false,
    isFeatured: doc.isFeatured ?? false,
    priority: doc.priority ?? 20,
    imageUrls,
    stockImageUrl: doc.stockImageUrl ?? undefined,
    videoUrl: doc.videoUrl ?? undefined,
    description: descriptionPlainText,
    richTextDescription: (doc.description ?? undefined) as DefaultTypedEditorState | undefined,
    provenance: doc.provenance ?? undefined,
    restorationHistory: doc.restorationHistory ?? undefined,
    conditionReport: doc.conditionReport ?? undefined,
    specs: buildSpecs(doc),
    tags: (doc.tags ?? []).map((t) => t.tag),
    meta: {
      title: doc.meta?.title ?? undefined,
      description: doc.meta?.description ?? undefined,
      imageUrl:
        doc.meta?.image && typeof doc.meta.image === 'object'
          ? (doc.meta.image.url ?? undefined)
          : undefined,
    },
  }
}

// ─── Sort by physical length (ascending), brand priority as tiebreaker ────────

const BRAND_PRIORITY: Record<string, number> = {
  'steinway': 0,
  'shigeru-kawai': 1,
}

function brandPriority(brandSlug: string): number {
  return BRAND_PRIORITY[brandSlug] ?? 2
}

function sortPianoGrid(pianos: Piano[]): Piano[] {
  return [...pianos].sort((a, b) => {
    // 1. Display priority (lower number = first)
    const pDiff = a.priority - b.priority
    if (pDiff !== 0) return pDiff

    // 2. Physical length ascending (smaller → larger)
    const aFt = parseSizeFt(a.size)
    const bFt = parseSizeFt(b.size)
    if (aFt === null && bFt === null) return brandPriority(a.brandSlug) - brandPriority(b.brandSlug)
    if (aFt === null) return 1
    if (bFt === null) return -1
    if (aFt !== bFt) return aFt - bFt

    // 3. Brand tiebreaker
    return brandPriority(a.brandSlug) - brandPriority(b.brandSlug)
  })
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export const queryAvailablePianosCount = cache(async (): Promise<number> => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.count({
    collection: 'pianos',
    overrideAccess: false,
    where: {
      and: [
        { isAvailable: { equals: true } },
        { _status: { equals: 'published' } },
      ],
    },
  })
  return result.totalDocs
})

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

  return sortPianoGrid(result.docs.map(adaptPayloadPiano))
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

export const queryPianosByCategory = cache(async (category: string): Promise<Piano[]> => {
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
        { 'brand.category': { equals: category } },
        { isAvailable: { equals: true } },
        { _status: { equals: 'published' } },
      ],
    },
    sort: '-publishedAt',
  })

  return result.docs.map(adaptPayloadPiano)
})

export const queryPianosByBrand = cache(async (brandSlug: string): Promise<Piano[]> => {
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
        { 'brand.slug': { equals: brandSlug } },
        { isAvailable: { equals: true } },
        { _status: { equals: 'published' } },
      ],
    },
    sort: '-publishedAt',
  })

  return result.docs.map(adaptPayloadPiano)
})

export const queryPianosByBrandAndModel = cache(
  async (brandSlug: string, modelValue: string): Promise<Piano[]> => {
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
          { 'brand.slug': { equals: brandSlug } },
          { model: { equals: modelValue } },
          { isAvailable: { equals: true } },
          { _status: { equals: 'published' } },
        ],
      },
      sort: '-publishedAt',
    })

    return result.docs.map(adaptPayloadPiano)
  },
)

export const querySearchPianos = cache(async (query: string): Promise<Piano[]> => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pianos',
    draft: false,
    limit: 100,
    overrideAccess: false,
    pagination: false,
    depth: 1,
    where: {
      and: [
        { isAvailable: { equals: true } },
        { _status: { equals: 'published' } },
        {
          or: [
            { title:      { like: query } },
            { model:      { like: query } },
            { finish:     { like: query } },
            { 'tags.tag': { like: query } },
          ],
        },
      ],
    },
    sort: '-publishedAt',
  })

  return result.docs.map(adaptPayloadPiano)
})
