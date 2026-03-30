import type { Metadata } from 'next'
import { BrandPageV2 } from '@/components/piano/BrandPageV2'
import { getBrand, getPianosByBrand } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Schimmel Pianos For Sale | UsedSteinways.com',
  description:
    'Browse pre-owned Schimmel grand and upright pianos. German precision engineering since 1885 — personally inspected and selected.',
}

export default function SchimmelPage() {
  const brand = getBrand('schimmel')
  if (!brand) notFound()
  const pianos = getPianosByBrand('schimmel')
  return <BrandPageV2 brand={brand} pianos={pianos} />
}
