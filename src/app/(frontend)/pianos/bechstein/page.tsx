import type { Metadata } from 'next'
import { BrandPageV2 } from '@/components/piano/BrandPageV2'
import { getBrand, getPianosByBrand } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'C. Bechstein Pianos For Sale | UsedSteinways.com',
  description: 'Pre-owned C. Bechstein grand pianos. Berlin-crafted instruments renowned for clarity, precision, and a singing tone, personally selected.',
}

export default function BechsteinPage() {
  const brand = getBrand('bechstein')
  if (!brand) notFound()
  const pianos = getPianosByBrand('bechstein')
  return <BrandPageV2 brand={brand} pianos={pianos} />
}
