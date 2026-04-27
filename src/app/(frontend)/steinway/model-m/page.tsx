import type { Metadata } from 'next'
import { ModelPageTemplate } from '@/components/piano/ModelPageTemplate'
import { getModel, getPianosByModel } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: "Steinway Model M For Sale | 5'7\" Parlor Grand | UsedSteinways.com",
  description: "Pre-owned Steinway Model M parlor grand pianos. 5'7\" — a refined balance of tone and size for home use. Price guide, specifications, and current inventory.",
}

export default function ModelMPage() {
  const model = getModel('model-m')
  if (!model) notFound()
  const inventory = getPianosByModel('model-m')
  return <ModelPageTemplate model={model} currentInventory={inventory} />
}
