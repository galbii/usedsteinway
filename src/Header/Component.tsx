import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'

import type { Header, Brand } from '@/payload-types'
import { STEINWAY_MODELS } from '@/lib/piano-data'

export type BrandModel = NonNullable<Brand['models']>[number]

async function getSteinwayModels(): Promise<BrandModel[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'brands',
      where: { slug: { equals: 'steinway' } },
      limit: 1,
    })
    const brand = result.docs[0]
    const models = brand?.models ?? []
    if (models.length > 0) {
      return [...models].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    }
  } catch {
    // fall through to hardcoded fallback
  }

  // Fall back to hardcoded data so the dropdown is always populated
  return STEINWAY_MODELS.map((m, i) => ({
    id: m.slug,
    name: m.name,
    slug: m.slug,
    type: m.type as 'Grand' | 'Upright' | 'Concert Grand',
    size: m.size,
    sizeInches: m.sizeInches,
    weight: m.weight,
    stringLength: m.stringLength,
    yearRange: m.yearRange,
    description: m.description,
    highlights: m.highlights.map((text) => ({ text })),
    priceGuide: m.priceGuide,
    adjacentModels: m.adjacentModels.map((a) => ({ adjacentSlug: a.slug, adjacentName: a.name })),
    order: i,
  }))
}

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()
  const models = await getSteinwayModels()

  return <HeaderClient data={headerData} models={models} />
}
