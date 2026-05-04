import type { Metadata } from 'next'

import type { Media, Page, Post, Testimonial, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const SITE_NAME = 'UsedSteinways.com'
const FALLBACK_OG_IMAGE = '/website-template-OG.webp'

const resolveImageURL = (image?: Media | Config['db']['defaultIDType'] | null): string | null => {
  if (image && typeof image === 'object' && 'url' in image && image.url) {
    return getServerSideURL() + image.url
  }
  return null
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | Partial<Testimonial> | null
  url?: string
}): Promise<Metadata> => {
  const { doc, url } = args

  // Title: prefer explicit meta title → doc title → site name
  const title = doc?.meta?.title
    ? `${doc.meta.title} | ${SITE_NAME}`
    : doc?.title
      ? `${doc.title} | ${SITE_NAME}`
      : SITE_NAME

  const description = doc?.meta?.description || undefined

  // OG image: prefer meta image → heroImage (Posts) → generic fallback
  const ogImage =
    resolveImageURL(doc?.meta?.image) ??
    (doc && 'heroImage' in doc ? resolveImageURL(doc.heroImage as Media | string | null) : null) ??
    getServerSideURL() + FALLBACK_OG_IMAGE

  return {
    description,
    openGraph: mergeOpenGraph({
      description: description || '',
      images: [{ url: ogImage }],
      title,
      url: url ?? (Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/'),
    }),
    title,
  }
}
