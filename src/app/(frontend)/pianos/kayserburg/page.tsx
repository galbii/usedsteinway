import type { Metadata } from 'next'
import { BrandPageV2 } from '@/components/piano/BrandPageV2'
import { getBrand, getPianosByBrand } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Kayserburg Pianos For Sale | UsedSteinways.com',
  description: "Pre-owned Kayserburg grand pianos. Kawai's premium Chinese-market brand combining European design with precision Japanese manufacturing, personally selected.",
}

export default function KayserburgPage() {
  const brand = getBrand('kayserburg')
  if (!brand) notFound()
  const pianos = getPianosByBrand('kayserburg')
  return <BrandPageV2 brand={brand} pianos={pianos} />
}
