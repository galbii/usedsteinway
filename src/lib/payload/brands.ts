import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Brand } from '@/payload-types'

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
