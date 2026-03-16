import type { Metadata } from 'next'
import { BrandPageV2 } from '@/components/piano/BrandPageV2'
import { getBrand, getPianosByBrand } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Petrof Pianos For Sale | UsedSteinways.com',
  description: 'Pre-owned Petrof grand pianos. Czech-made instruments with a rich European heritage, celebrated for their warm tone and elegant craftsmanship, personally selected.',
}

export default function PetrofPage() {
  const brand = getBrand('petrof')
  if (!brand) notFound()
  const pianos = getPianosByBrand('petrof')
  return <BrandPageV2 brand={brand} pianos={pianos} />
}
