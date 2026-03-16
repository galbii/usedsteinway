import type { Metadata } from 'next'
import { BrandPageV2 } from '@/components/piano/BrandPageV2'
import { getBrand, getPianosByBrand, STEINWAY_MODELS } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Steinway & Sons Pianos For Sale | UsedSteinways.com',
  description: 'Browse our curated selection of pre-owned Steinway & Sons grand pianos. Model B, Model D, Model M, and more — personally inspected and selected.',
}

export default function SteinwayPage() {
  const brand = getBrand('steinway')
  if (!brand) notFound()
  const pianos = getPianosByBrand('steinway')
  return <BrandPageV2 brand={brand} pianos={pianos} models={STEINWAY_MODELS} />
}
