import type { Metadata } from 'next'
import { ModelPageTemplate } from '@/components/piano/ModelPageTemplate'
import { getModel, getPianosByModel } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: "Steinway Model C For Sale | 7'5\" Professional Grand | UsedSteinways.com",
  description: "Pre-owned Steinway Model C grand pianos. 7'5\" — a professional-grade instrument bridging the B and D. Price guide, specifications, and current inventory.",
}

export default function ModelCPage() {
  const model = getModel('model-c')
  if (!model) notFound()
  const inventory = getPianosByModel('model-c')
  return <ModelPageTemplate model={model} currentInventory={inventory} />
}
