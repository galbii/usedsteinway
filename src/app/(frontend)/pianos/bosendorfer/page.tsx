import type { Metadata } from 'next'
import { BrandPageV2 } from '@/components/piano/BrandPageV2'
import { getBrand, getPianosByBrand } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Bösendorfer Pianos For Sale | UsedSteinways.com',
  description: 'Pre-owned Bösendorfer grand pianos. Vienna-made instruments with exceptional warmth and character, personally selected.',
}

export default function BosendorferPage() {
  const brand = getBrand('bosendorfer')
  if (!brand) notFound()
  const pianos = getPianosByBrand('bosendorfer')
  return <BrandPageV2 brand={brand} pianos={pianos} />
}
