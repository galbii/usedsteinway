import type { Metadata } from 'next'
import { getServerSideURL } from '@/utilities/getURL'
import { UsedSteinwaysVariantPage } from './variant/_components/UsedSteinwaysVariantPage'

export default function HomePage() {
  return <UsedSteinwaysVariantPage />
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
