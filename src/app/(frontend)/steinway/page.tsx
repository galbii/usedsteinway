import type { Metadata } from 'next'
import { BrandPageV2 } from '@/components/piano/BrandPageV2'
import { PianoHeroCarousel } from '@/components/piano/PianoHeroCarousel'
import { getBrand, STEINWAY_MODELS } from '@/lib/piano-data'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { queryPianosByBrand } from '@/lib/payload/pianos'
import type { PianoModel } from '@/types/piano'
import type { Brand } from '@/payload-types'

type BrandModel = NonNullable<Brand['models']>[number]

export const metadata: Metadata = {
  title: 'Steinway & Sons Pianos For Sale | UsedSteinways.com',
  description:
    'Browse our curated selection of pre-owned Steinway & Sons grand pianos. Model B, Model D, Model M, and more — personally inspected and selected.',
}

function cmsModelToPianoModel(doc: BrandModel): PianoModel {
  return {
    slug: doc.slug,
    brandSlug: 'steinway',
    name: doc.name,
    type: doc.type,
    size: doc.size ?? '',
    sizeInches: doc.sizeInches ?? '',
    weight: doc.weight ?? '',
    stringLength: doc.stringLength ?? '',
    yearRange: doc.yearRange ?? '',
    description: doc.description,
    highlights: (doc.highlights ?? []).map((h) => h.text),
    priceGuide: (doc.priceGuide ?? []).map((p) => ({
      era: p.era,
      condition: p.condition,
      priceRange: p.priceRange,
    })),
    adjacentModels: (doc.adjacentModels ?? []).map((a) => ({
      slug: a.adjacentSlug,
      name: a.adjacentName,
    })),
    imageUrl: typeof doc.image === 'object' && doc.image?.url ? doc.image.url : '',
  }
}

const MODEL_ORDER: Record<string, number> = {
  'model-s': 0,
  'model-m': 1,
  'model-o': 2,
  'model-a': 3,
  'model-b': 4,
  'model-c': 5,
  'model-d': 6,
}

const REMOVED_SLUGS = new Set(['model-a3', 'hamburg-s'])

async function getModelsFromCMS(): Promise<PianoModel[] | null> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'brands',
      where: { slug: { equals: 'steinway' } },
      limit: 1,
    })
    const brand = result.docs[0]
    if (!brand?.models || brand.models.length === 0) return null
    return [...brand.models]
      .filter((m) => !REMOVED_SLUGS.has(m.slug))
      .map(cmsModelToPianoModel)
      .sort((a, b) => (MODEL_ORDER[a.slug] ?? 99) - (MODEL_ORDER[b.slug] ?? 99))
  } catch {
    return null
  }
}

export default async function SteinwayPage() {
  const brand = getBrand('steinway')
  if (!brand) notFound()
  const [pianos, cmsModels] = await Promise.all([
    queryPianosByBrand('steinway'),
    getModelsFromCMS(),
  ])
  const models = cmsModels ?? STEINWAY_MODELS
  const featured = pianos.filter((p) => p.isFeatured)

  return (
    <>
      <PianoHeroCarousel
        pianos={featured}
        eyebrow="Steinway & Sons"
        headingLine1="Our Used"
        headingLine2="Steinways"
        showLogo
        minimal
      />
      <BrandPageV2
        brand={brand}
        pianos={pianos}
        models={models}
        modelUrlBase="/steinway"
        hideHero
      />
    </>
  )
}
