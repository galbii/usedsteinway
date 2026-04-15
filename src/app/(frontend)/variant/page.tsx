import type { Metadata } from 'next'
import { getServerSideURL } from '@/utilities/getURL'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { SiteSetting } from '@/payload-types'
import { UsedSteinwaysVariantPage } from './_components/UsedSteinwaysVariantPage'
import { queryFeaturedPianos } from '@/lib/payload/pianos'

export default async function VariantPage() {
  const [siteSettings, featured] = await Promise.all([
    getCachedGlobal('site-settings', 0)() as Promise<SiteSetting>,
    queryFeaturedPianos(),
  ])
  const locations = siteSettings?.locations ?? []
  const phone = siteSettings?.contactInfo?.phone ?? '508-545-0766'
  return <UsedSteinwaysVariantPage locations={locations} phone={phone} featured={featured} />
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: 'UsedSteinways.com — Variant Design',
  description: 'Design variant for UsedSteinways.com homepage.',
}
