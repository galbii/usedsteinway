import type { Metadata } from 'next'
import { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { SiteSetting } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PageEditButton } from '@/components/admin/onpage/PageEditButton'
import { serializeBlocks } from '@/components/admin/onpage/editorSchema'
import { editableBlocks } from '@/blocks/registry'
import { UsedSteinwaysHomePage } from './_components/UsedSteinwaysHomePage'
import { queryFeaturedPianos, queryAvailablePianosCount } from '@/lib/payload/pianos'
import { queryRecentPosts } from '@/lib/payload/posts'
import { queryGalleryImages, queryShowroomPhotos, querySteinwayPhotos } from '@/lib/payload/media'
import { queryBrands } from '@/lib/payload/brands'

const queryHomePage = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: { slug: { equals: 'home' } },
  })
  return result.docs?.[0] ?? null
})

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const page = await queryHomePage()

  if (page) {
    const { hero, layout } = page
    return (
      <article className="pt-16 pb-24">
        {draft && <LivePreviewListener />}
        <RenderHero {...hero} />
        <RenderBlocks blocks={layout} />
        <PageEditButton pageId={page.id} blockSchemas={serializeBlocks(editableBlocks)} />
      </article>
    )
  }

  const [siteSettings, featured, recentPosts, showroomPhotos, steinwayPhotos, galleryImages, brands, availablePianosCount] = await Promise.all([
    getCachedGlobal('site-settings', 0)() as Promise<SiteSetting>,
    queryFeaturedPianos(),
    queryRecentPosts(6),
    queryShowroomPhotos(18),
    querySteinwayPhotos(18),
    queryGalleryImages(18),
    queryBrands(),
    queryAvailablePianosCount(),
  ])
  const heroImages = [...showroomPhotos, ...steinwayPhotos].sort(() => Math.random() - 0.5)
  const locations = siteSettings?.locations ?? []
  const phone = siteSettings?.contactInfo?.phone ?? '508-545-0766'
  return <UsedSteinwaysHomePage locations={locations} phone={phone} featured={featured} recentPosts={recentPosts} heroImages={heroImages} galleryImages={galleryImages} brands={brands} availablePianosCount={availablePianosCount} />
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
