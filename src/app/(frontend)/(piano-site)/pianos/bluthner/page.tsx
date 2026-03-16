import type { Metadata } from 'next'
import { BrandPageV2 } from '@/components/piano/BrandPageV2'
import { getBrand, getPianosByBrand } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Blüthner Pianos For Sale | UsedSteinways.com',
  description: 'Pre-owned Blüthner grand pianos. Leipzig-made instruments with the distinctive aliquot stringing for a uniquely warm and resonant tone, personally selected.',
}

export default function BluthnerPage() {
  const brand = getBrand('bluthner')
  if (!brand) notFound()
  const pianos = getPianosByBrand('bluthner')
  return <BrandPageV2 brand={brand} pianos={pianos} />
}
