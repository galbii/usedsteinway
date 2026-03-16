import type { Metadata } from 'next'
import { BrandPageV1 } from '@/components/piano/BrandPageV1'
import { getBrand, getPianosByBrand, STEINWAY_MODELS } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Steinway Pianos — Simple View | UsedSteinways.com',
  description: 'Pre-owned Steinway & Sons grand pianos for sale.',
}

export default function SteinwayV1Page() {
  const brand = getBrand('steinway')
  if (!brand) notFound()
  const pianos = getPianosByBrand('steinway')
  return <BrandPageV1 brand={brand} pianos={pianos} models={STEINWAY_MODELS} />
}
