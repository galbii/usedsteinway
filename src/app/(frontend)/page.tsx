import type { Metadata } from 'next'
import { getServerSideURL } from '@/utilities/getURL'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { SiteSetting } from '@/payload-types'
import { UsedSteinwaysVariantPage } from './variant/_components/UsedSteinwaysVariantPage'
import { queryFeaturedPianos } from '@/lib/payload/pianos'
import { queryRecentPosts } from '@/lib/payload/posts'
import { queryGalleryImages } from '@/lib/payload/media'
import { queryBrands } from '@/lib/payload/brands'

export default async function HomePage() {
  const [siteSettings, featured, recentPosts, galleryImages, brands] = await Promise.all([
    getCachedGlobal('site-settings', 0)() as Promise<SiteSetting>,
    queryFeaturedPianos(),
    queryRecentPosts(6),
    queryGalleryImages(18),
    queryBrands(),
  ])
  const locations = siteSettings?.locations ?? []
  const phone = siteSettings?.contactInfo?.phone ?? '508-545-0766'
  return <UsedSteinwaysVariantPage locations={locations} phone={phone} featured={featured} recentPosts={recentPosts} galleryImages={galleryImages} brands={brands} />
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: 'UsedSteinways.com — Pre-Owned Steinway & Fine Pianos | New Hampshire',
  description:
    "A curated collection of pre-owned Steinway, Bösendorfer, Bechstein and world-class pianos. Every instrument personally selected by Roger. New England's most discerning piano collection.",
  openGraph: {
    title: 'UsedSteinways.com',
    description: 'Every piano personally selected. Every detail inspected.',
    siteName: 'UsedSteinways.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UsedSteinways.com',
    description: 'Pre-owned Steinway & fine pianos. Personally selected.',
  },
}
