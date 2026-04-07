import { getBrand, STEINWAY_MODELS } from '@/lib/piano-data'
import type { Payload } from 'payload'

export async function seedSteinwayBrand(payload: Payload): Promise<void> {
  const existing = await payload.find({
    collection: 'brands',
    where: { slug: { equals: 'steinway' } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    payload.logger.info('Steinway brand already seeded — skipping.')
    return
  }

  const brand = getBrand('steinway')
  if (!brand) throw new Error('getBrand("steinway") returned undefined')

  await payload.create({
    collection: 'brands',
    data: {
      name: brand.name,
      slug: brand.slug,
      country: brand.country,
      founded: brand.founded,
      category: brand.category as 'steinway' | 'european' | 'shigeru-kawai' | 'other',
      tagline: brand.tagline,
      description: brand.description,
      whyBuyPreowned: brand.whyBuyPreowned.map((text) => ({ text })),
      priceRange: brand.priceRange,
      prestige: brand.prestige as 'Ultra Premium' | 'Premium' | 'Professional',
      models: STEINWAY_MODELS.map((m, i) => ({
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
        priceGuide: m.priceGuide.map((p) => ({
          era: p.era,
          condition: p.condition,
          priceRange: p.priceRange,
        })),
        adjacentModels: m.adjacentModels.map((a) => ({
          adjacentSlug: a.slug,
          adjacentName: a.name,
        })),
        order: i,
      })),
    },
  })

  payload.logger.info('Steinway brand seeded successfully.')
}
