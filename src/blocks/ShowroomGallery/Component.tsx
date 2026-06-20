import React from 'react'
import type { Media } from '@/payload-types'
import { ShowroomGallerySection } from '@/app/(frontend)/_components/ShowroomGallerySection'
import { queryGalleryImages } from '@/lib/payload/media'

type ShowroomGalleryBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  images?: Array<{ image: Media | string | null; id?: string | null }> | null
  galleryHref?: string | null
  showroomHref?: string | null
  blockType: 'showroomGallery'
  id?: string | null
  blockName?: string | null
  disableInnerContainer?: boolean
}

// ── Static defaults (mirror UsedSteinwaysHomePage.tsx ShowroomGallerySection) ──
const DEFAULT_EYEBROW = 'The Showroom'
const DEFAULT_HEADING = 'Inside Our\\nCollection'
const DEFAULT_GALLERY_HREF = '/gallery'
const DEFAULT_SHOWROOM_HREF = '/visit#locations'

function isMedia(val: Media | string | null | undefined): val is Media {
  return typeof val === 'object' && val !== null && 'url' in val
}

export const ShowroomGalleryBlock: React.FC<ShowroomGalleryBlockProps> = async ({
  eyebrow,
  heading,
  images,
  galleryHref,
  showroomHref,
}) => {
  let resolvedImages: Media[] = (images ?? []).map((item) => item.image).filter(isMedia)

  // When the block has no images, fall back to the SAME live query the static
  // homepage uses (page.tsx → queryGalleryImages(18)) so the grid matches.
  if (resolvedImages.length === 0) {
    resolvedImages = await queryGalleryImages(18)
  }

  return (
    <ShowroomGallerySection
      images={resolvedImages}
      eyebrow={eyebrow || DEFAULT_EYEBROW}
      heading={heading || DEFAULT_HEADING}
      galleryHref={galleryHref || DEFAULT_GALLERY_HREF}
      showroomHref={showroomHref || DEFAULT_SHOWROOM_HREF}
    />
  )
}
