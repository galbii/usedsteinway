import type { Metadata } from 'next'
import { BrandPageV2 } from '@/components/piano/BrandPageV2'
import { BrandStory } from '@/components/piano/BrandStory'
import { PianoHeroCarousel } from '@/components/piano/PianoHeroCarousel'
import { notFound } from 'next/navigation'
import { queryPianosByBrand } from '@/lib/payload/pianos'
import { getBrandPageData, brandHeroEyebrow } from '@/lib/payload/brands'
import { BrandEditButton } from '@/components/admin/onpage/BrandEditButton'
import { brandEditFieldSchemas } from '@/components/admin/onpage/brandEditSchema'

// ISR safety net: the revalidateBrand hook is the primary freshness path, but
// on-demand revalidation is lazy + Route-Handler-scoped, so brand/model edits
// can lag. A short window bounds staleness without per-edit work.
export const revalidate = 30

export const metadata: Metadata = {
  title: 'Shigeru Kawai Pianos For Sale | UsedSteinways.com',
  description:
    "Pre-owned Shigeru Kawai grand pianos — Kawai's flagship hand-crafted instruments, built to rival the world's finest pianos. Personally selected.",
}

export default async function ShigeruPage() {
  const [pianos, { brand, models, heroImageUrl }] = await Promise.all([
    queryPianosByBrand('shigeru-kawai'),
    getBrandPageData('shigeru-kawai'),
  ])
  if (!brand) notFound()

  const featured = pianos.filter((p) => p.isFeatured)
  const carouselPianos = featured.length > 0 ? featured : pianos.slice(0, 6)

  return (
    <>
      <PianoHeroCarousel
        pianos={carouselPianos}
        staticImageUrl={heroImageUrl}
        variant="center"
        eyebrow={brandHeroEyebrow(brand)}
        headingLine1={brand.name}
        tagline={brand.tagline}
        minimal
      />
      <BrandStory brand={brand} />
      <BrandPageV2
        brand={brand}
        pianos={pianos}
        models={models.length ? models : undefined}
        hideHero
        hideStory
      />
      <BrandEditButton
        brandSlug="shigeru-kawai"
        brandName={brand.name}
        fieldSchemas={brandEditFieldSchemas()}
      />
    </>
  )
}
