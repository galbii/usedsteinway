import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Brand } from '@/payload-types'
import type { Brand as DomainBrand, PianoModel } from '@/types/piano'

export type BrandRow = {
  id: string
  name: string
  slug: string
  country: string | null
  founded: number | null
  category: string | null
  prestige: string | null
  tagline: string | null
  description: string | null
  priceRange: string | null
  accentColor: string | null
  heroImageUrl: string | null
  models: { name: string; slug: string; type: string }[]
}

function adaptBrand(doc: Brand): BrandRow {
  let heroImageUrl: string | null = null
  if (doc.heroImage && typeof doc.heroImage !== 'string') {
    heroImageUrl = doc.heroImage.url ?? doc.heroImage.thumbnailURL ?? null
  }

  return {
    id: doc.id,
    name: doc.name,
    slug: doc.slug,
    country: doc.country ?? null,
    founded: doc.founded ?? null,
    category: doc.category ?? null,
    prestige: doc.prestige ?? null,
    tagline: doc.tagline ?? null,
    description: doc.description ?? null,
    priceRange: doc.priceRange ?? null,
    accentColor: doc.accentColor ?? null,
    heroImageUrl,
    models: (doc.models ?? [])
      .slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((m) => ({ name: m.name, slug: m.slug, type: m.type })),
  }
}

export const queryBrandBySlug = cache(async (slug: string): Promise<Brand | null> => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'brands',
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: false,
    depth: 1,
  })
  return result.docs[0] ?? null
})

export function adaptPayloadBrandToDomain(doc: Brand): DomainBrand {
  let heroImageUrl = ''
  if (doc.heroImage && typeof doc.heroImage !== 'string') {
    heroImageUrl = doc.heroImage.url ?? doc.heroImage.thumbnailURL ?? ''
  }
  return {
    slug: doc.slug,
    name: doc.name,
    country: doc.country ?? '',
    founded: doc.founded ?? 0,
    category: (doc.category as DomainBrand['category']) ?? 'other',
    tagline: doc.tagline ?? '',
    description: doc.description ?? '',
    whyBuyPreowned: (doc.whyBuyPreowned ?? []).map((w) => w.text),
    heroImageUrl,
    models: (doc.models ?? []).map((m) => m.name),
    priceRange: doc.priceRange ?? '',
    prestige: (doc.prestige as DomainBrand['prestige']) ?? 'Professional',
    accentColor: doc.accentColor ?? undefined,
  }
}

export function adaptPayloadBrandModels(doc: Brand): PianoModel[] {
  return (doc.models ?? [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((m) => ({
      slug: m.slug,
      brandSlug: doc.slug,
      name: m.name,
      type: m.type as PianoModel['type'],
      size: m.size ?? '',
      sizeInches: m.sizeInches ?? '',
      weight: m.weight ?? '',
      stringLength: m.stringLength ?? '',
      yearRange: m.yearRange ?? '',
      description: m.description,
      highlights: (m.highlights ?? []).map((h) => h.text),
      priceGuide: (m.priceGuide ?? []).map((p) => ({
        era: p.era,
        condition: p.condition,
        priceRange: p.priceRange,
      })),
      adjacentModels: (m.adjacentModels ?? []).map((a) => ({
        slug: a.adjacentSlug,
        name: a.adjacentName,
      })),
      imageUrl: typeof m.image === 'object' && m.image?.url ? m.image.url : '',
    }))
}

export const queryModelFromBrand = cache(
  async (brandSlug: string, modelSlug: string): Promise<PianoModel | null> => {
    const brandDoc = await queryBrandBySlug(brandSlug)
    if (!brandDoc?.models) return null
    const modelDoc = brandDoc.models.find((m) => m.slug === modelSlug)
    if (!modelDoc) return null
    return {
      slug: modelDoc.slug,
      brandSlug,
      name: modelDoc.name,
      type: modelDoc.type as PianoModel['type'],
      size: modelDoc.size ?? '',
      sizeInches: modelDoc.sizeInches ?? '',
      weight: modelDoc.weight ?? '',
      stringLength: modelDoc.stringLength ?? '',
      yearRange: modelDoc.yearRange ?? '',
      description: modelDoc.description,
      highlights: (modelDoc.highlights ?? []).map((h) => h.text),
      priceGuide: (modelDoc.priceGuide ?? []).map((p) => ({
        era: p.era,
        condition: p.condition,
        priceRange: p.priceRange,
      })),
      adjacentModels: (modelDoc.adjacentModels ?? []).map((a) => ({
        slug: a.adjacentSlug,
        name: a.adjacentName,
      })),
      imageUrl:
        typeof modelDoc.image === 'object' && modelDoc.image?.url ? modelDoc.image.url : '',
    }
  },
)

export const queryBrands = cache(async (): Promise<BrandRow[]> => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'brands',
    limit: 50,
    overrideAccess: false,
    pagination: false,
    depth: 1,
    sort: 'name',
  })

  return result.docs.map(adaptBrand)
})
