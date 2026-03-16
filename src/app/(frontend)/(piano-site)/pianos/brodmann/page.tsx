import type { Metadata } from 'next'
import { BrandPageV2 } from '@/components/piano/BrandPageV2'
import { getBrand, getPianosByBrand } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Brodmann Pianos For Sale | UsedSteinways.com',
  description: 'Pre-owned Brodmann grand pianos. Vienna-inspired instruments handcrafted with traditional European methods and premium materials, personally selected.',
}

export default function BrodmannPage() {
  const brand = getBrand('brodmann')
  if (!brand) notFound()
  const pianos = getPianosByBrand('brodmann')
  return <BrandPageV2 brand={brand} pianos={pianos} />
}
