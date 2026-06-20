import type { Metadata } from 'next'
import { BrandPageV2 } from '@/components/piano/BrandPageV2'
import { PianoHeroCarousel } from '@/components/piano/PianoHeroCarousel'
import { SteinwayModelsGrid } from './_components/SteinwayModelsGrid'
import { SteinwayPianosGrid } from './_components/SteinwayPianosGrid'
import { STEINWAY_MODELS } from '@/lib/piano-data'
import { notFound } from 'next/navigation'
import { queryPianosByBrand } from '@/lib/payload/pianos'
import { getBrandPageData } from '@/lib/payload/brands'
import { BrandEditButton } from '@/components/admin/onpage/BrandEditButton'
import { brandEditFieldSchemas } from '@/components/admin/onpage/brandEditSchema'

export const metadata: Metadata = {
  title: 'Steinway & Sons Pianos For Sale | UsedSteinways.com',
  description:
    'Browse our curated selection of pre-owned Steinway & Sons grand pianos. Model B, Model D, Model M, and more — personally inspected and selected.',
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

export default async function SteinwayPage() {
  const [pianos, { brand, models: rawModels }] = await Promise.all([
    queryPianosByBrand('steinway'),
    getBrandPageData('steinway', STEINWAY_MODELS),
  ])
  if (!brand) notFound()

  const models = rawModels
    .filter((m) => !REMOVED_SLUGS.has(m.slug))
    .sort((a, b) => (MODEL_ORDER[a.slug] ?? 99) - (MODEL_ORDER[b.slug] ?? 99))

  const featured = pianos.filter((p) => p.isFeatured)
  const carouselPianos = featured.length > 0 ? featured : pianos.slice(0, 6)

  return (
    <>
      <PianoHeroCarousel
        pianos={carouselPianos}
        eyebrow="Steinway & Sons"
        headingLine1="Our Used"
        headingLine2="Steinways"
        showLogo
        minimal
      />
      <SteinwayPianosGrid pianos={pianos} />
      <SteinwayModelsGrid models={models} />
      <BrandPageV2
        brand={brand}
        pianos={pianos}
        hideHero
        hideInventory
      />
      <BrandEditButton
        brandSlug="steinway"
        brandName={brand.name}
        fieldSchemas={brandEditFieldSchemas()}
      />
    </>
  )
}
