import type { Metadata } from 'next'
import { BrandPageV2 } from '@/components/piano/BrandPageV2'
import { getBrand, getPianosByBrand } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Yamaha Grand Pianos For Sale | UsedSteinways.com',
  description: 'Pre-owned Yamaha grand pianos. Renowned for consistency, reliability, and brilliant tone — from the C-series to the flagship CFX, personally selected.',
}

export default function YamahaPage() {
  const brand = getBrand('yamaha')
  if (!brand) notFound()
  const pianos = getPianosByBrand('yamaha')
  return <BrandPageV2 brand={brand} pianos={pianos} />
}
