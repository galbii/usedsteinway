import React from 'react'
import type { Piano as PianoType } from '@/payload-types'
import { FeaturedProductsCarousel } from '@/components/piano/FeaturedProductsCarousel'
import type { Piano } from '@/types/piano'
import { adaptPayloadPiano, queryFeaturedPianos } from '@/lib/payload/pianos'

type FeaturedPianosBlockProps = {
  heading?: string | null
  limit?: number | null
  pianos?: Array<{ piano: PianoType | string | null; id?: string | null }> | null
  blockType: 'featuredPianos'
  id?: string | null
  blockName?: string | null
  disableInnerContainer?: boolean
}

function isPopulatedPiano(val: PianoType | string | null | undefined): val is PianoType {
  return typeof val === 'object' && val !== null && 'id' in val
}

export const FeaturedPianosBlock: React.FC<FeaturedPianosBlockProps> = async ({
  limit,
  pianos: pinnedPianos,
}) => {
  let displayPianos: Piano[] = []

  if (pinnedPianos && pinnedPianos.length > 0) {
    // Override: editor pinned specific instruments.
    const populated = pinnedPianos.map((item) => item.piano).filter(isPopulatedPiano)
    displayPianos = populated.map(adaptPayloadPiano)

    // Honor the configured cap (if any) on the pinned selection.
    if (typeof limit === 'number' && limit > 0) {
      displayPianos = displayPianos.slice(0, limit)
    }
  } else {
    // STATIC DEFAULT: mirror the static homepage exactly — the same featured-piano
    // query (`queryFeaturedPianos`) that page.tsx feeds into <FeaturedProductsCarousel>.
    try {
      displayPianos = await queryFeaturedPianos()
    } catch {
      return null
    }
  }

  if (displayPianos.length === 0) return null

  return <FeaturedProductsCarousel pianos={displayPianos} />
}
