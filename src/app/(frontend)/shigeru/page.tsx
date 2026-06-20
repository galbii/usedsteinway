import type { Metadata } from 'next'
import { BrandPageV2 } from '@/components/piano/BrandPageV2'
import { notFound } from 'next/navigation'
import { queryPianosByBrand } from '@/lib/payload/pianos'
import { getBrandPageData } from '@/lib/payload/brands'
import { BrandEditButton } from '@/components/admin/onpage/BrandEditButton'
import { brandEditFieldSchemas } from '@/components/admin/onpage/brandEditSchema'

export const metadata: Metadata = {
  title: 'Shigeru Kawai Pianos For Sale | UsedSteinways.com',
  description:
    "Pre-owned Shigeru Kawai grand pianos — Kawai's flagship hand-crafted instruments, built to rival the world's finest pianos. Personally selected.",
}

export default async function ShigeruPage() {
  const [pianos, { brand, models }] = await Promise.all([
    queryPianosByBrand('shigeru-kawai'),
    getBrandPageData('shigeru-kawai'),
  ])
  if (!brand) notFound()

  return (
    <>
      <BrandPageV2 brand={brand} pianos={pianos} models={models.length ? models : undefined} />
      <BrandEditButton
        brandSlug="shigeru-kawai"
        brandName={brand.name}
        fieldSchemas={brandEditFieldSchemas()}
      />
    </>
  )
}
