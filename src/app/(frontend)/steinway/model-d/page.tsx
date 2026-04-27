import type { Metadata } from 'next'
import { ModelPageTemplate } from '@/components/piano/ModelPageTemplate'
import { getModel, getPianosByModel } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Steinway Model D Concert Grand For Sale | UsedSteinways.com',
  description: "Pre-owned Steinway Model D concert grand pianos. 8'11\" — the world's most celebrated concert instrument. Price guide, specifications, and current inventory.",
}

export default function ModelDPage() {
  const model = getModel('model-d')
  if (!model) notFound()
  const inventory = getPianosByModel('model-d')
  return <ModelPageTemplate model={model} currentInventory={inventory} />
}
