import type { Metadata } from 'next'
import { ModelPageTemplate } from '@/components/piano/ModelPageTemplate'
import { getModel, getPianosByModel } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Steinway Model O For Sale | Vintage Discontinued Model | UsedSteinways.com',
  description: "Pre-owned Steinway Model O grand pianos. A discontinued vintage model prized by collectors. Price guide, specifications, and current inventory.",
}

export default function ModelOPage() {
  const model = getModel('model-o')
  if (!model) notFound()
  const inventory = getPianosByModel('model-o')
  return <ModelPageTemplate model={model} currentInventory={inventory} />
}
