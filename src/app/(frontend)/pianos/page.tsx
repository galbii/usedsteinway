import type { Metadata } from 'next'
import { PianoBrowser } from '@/components/piano/PianoBrowser'
import { InquiryCTA } from '@/components/piano/InquiryCTA'
import { PianoHeroCarousel } from '@/components/piano/PianoHeroCarousel'
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
      {/* Featured pianos hero carousel */}
      <PianoHeroCarousel pianos={featured} />

      {/* Filterable inventory browser */}
      <div id="inventory">
        <PianoBrowser pianos={allPianos} />
      </div>

      <InquiryCTA variant="dark" />
    </main>
  )
}
