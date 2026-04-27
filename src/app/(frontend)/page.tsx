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
  title: 'Portal to Rare and Quality Steinways | UsedSteinways',
  description:
    "Your portal to rare and quality pre-owned Steinway pianos. A curated collection of Steinway, Bösendorfer, Bechstein and world-class instruments — every piano personally selected and inspected by Roger. New England's most trusted source for fine used pianos.",
  keywords: [
    'used Steinway pianos',
    'rare Steinway for sale',
    'pre-owned Steinway',
    'quality used pianos',
    'Steinway grand piano',
    'Bösendorfer',
    'Bechstein',
    'fine used pianos New Hampshire',
    'UsedSteinways',
  ],
  openGraph: {
    title: 'Portal to Rare and Quality Steinways | UsedSteinways',
    description:
      'Your portal to rare and quality pre-owned Steinway pianos. Every instrument personally selected and inspected by Roger.',
    siteName: 'UsedSteinways.com',
    type: 'website',
    url: getServerSideURL(),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portal to Rare and Quality Steinways | UsedSteinways',
    description:
      "Rare and quality pre-owned Steinway pianos — personally selected and inspected. New England's most trusted source for fine used pianos.",
  },
  alternates: {
    canonical: getServerSideURL(),
  },
}
