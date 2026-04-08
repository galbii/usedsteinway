import type { Metadata } from 'next'
import { HeroCarousel } from '@/components/piano/HeroCarousel'
import { PianoBrowser } from '@/components/piano/PianoBrowser'
import { InquiryCTA } from '@/components/piano/InquiryCTA'
import { queryAvailablePianos, queryFeaturedPianos } from '@/lib/payload/pianos'

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
      {/* Full-viewport featured piano slideshow */}
      <HeroCarousel pianos={featured} />

      {/* Filterable inventory browser */}
      <PianoBrowser pianos={allPianos} />

      <InquiryCTA variant="dark" />
    </main>
  )
}
