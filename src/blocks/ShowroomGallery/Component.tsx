import React from 'react'
import type { Media } from '@/payload-types'
import { ShowroomGallerySection } from '@/app/(frontend)/_components/ShowroomGallerySection'

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

function isMedia(val: Media | string | null | undefined): val is Media {
  return typeof val === 'object' && val !== null && 'url' in val
}

export const ShowroomGalleryBlock: React.FC<ShowroomGalleryBlockProps> = ({ images }) => {
  const resolvedImages: Media[] = (images ?? [])
    .map((item) => item.image)
    .filter(isMedia)

  if (resolvedImages.length === 0) return null

  return <ShowroomGallerySection images={resolvedImages} />
}
