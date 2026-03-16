import type { Metadata } from 'next'
import { BrandPageV2 } from '@/components/piano/BrandPageV2'
import { getBrand, getPianosByBrand } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Wendl & Lung Pianos For Sale | UsedSteinways.com',
  description: 'Pre-owned Wendl & Lung grand pianos. Austrian-heritage instruments built with European craftsmanship and exceptional value, personally selected.',
}

export default function WendlLungPage() {
  const brand = getBrand('wendl-lung')
  if (!brand) notFound()
  const pianos = getPianosByBrand('wendl-lung')
  return <BrandPageV2 brand={brand} pianos={pianos} />
}
