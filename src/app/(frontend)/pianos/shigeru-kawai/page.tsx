import type { Metadata } from 'next'
import { BrandPageV2 } from '@/components/piano/BrandPageV2'
import { getBrand, getPianosByBrand } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Shigeru Kawai Pianos For Sale | UsedSteinways.com',
  description: "Pre-owned Shigeru Kawai grand pianos. Kawai's flagship hand-crafted instruments, built to rival the world's finest pianos, personally selected.",
}

export default function ShigeruKawaiPage() {
  const brand = getBrand('shigeru-kawai')
  if (!brand) notFound()
  const pianos = getPianosByBrand('shigeru-kawai')
  return <BrandPageV2 brand={brand} pianos={pianos} />
}
