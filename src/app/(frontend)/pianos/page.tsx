import type { Metadata } from 'next'
import { InquiryCTA } from '@/components/piano/InquiryCTA'
import { PianoHeroCarousel } from '@/components/piano/PianoHeroCarousel'
import { queryAvailablePianos, queryFeaturedPianos } from '@/lib/payload/pianos'
import { PianosPageClient } from './_components/PianosPageClient'

export const metadata: Metadata = {
  title: 'Piano Inventory | UsedSteinways.com',
  description:
    'Browse our curated collection of pre-owned Steinway, Bösendorfer, Bechstein, and world-class pianos. Every instrument personally selected by Roger.',
}

export default async function PianosPage() {
  const [allPianos, featured] = await Promise.all([
    queryAvailablePianos(),
    queryFeaturedPianos(),
  ])

  return (
    <main className="min-h-screen">
      <PianoHeroCarousel pianos={featured} />
      <PianosPageClient pianos={allPianos} />
      <InquiryCTA variant="dark" />
    </main>
  )
}
