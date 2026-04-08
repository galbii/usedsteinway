import type { Metadata } from 'next'
import { getServerSideURL } from '@/utilities/getURL'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { SiteSetting } from '@/payload-types'
import { UsedSteinwaysVariantPage } from './_components/UsedSteinwaysVariantPage'

export default async function VariantPage() {
  const siteSettings = (await getCachedGlobal('site-settings', 0)()) as SiteSetting
  const locations = siteSettings?.locations ?? []
  const phone = siteSettings?.contactInfo?.phone ?? '508-545-0766'
  return <UsedSteinwaysVariantPage locations={locations} phone={phone} />
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: 'UsedSteinways.com — Variant Design',
  description: 'Design variant for UsedSteinways.com homepage.',
}
