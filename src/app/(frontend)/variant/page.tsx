import type { Metadata } from 'next'
import { getServerSideURL } from '@/utilities/getURL'
import { UsedSteinwaysVariantPage } from './_components/UsedSteinwaysVariantPage'

export default function VariantPage() {
  return <UsedSteinwaysVariantPage />
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: 'UsedSteinways.com — Variant Design',
  description: 'Design variant for UsedSteinways.com homepage.',
}
