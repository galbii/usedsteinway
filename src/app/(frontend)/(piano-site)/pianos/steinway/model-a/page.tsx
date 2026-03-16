import type { Metadata } from 'next'
import { ModelPageTemplate } from '@/components/piano/ModelPageTemplate'
import { getModel, getPianosByModel } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: "Steinway Model A For Sale | 6'2\" Grand | UsedSteinways.com",
  description: "Pre-owned Steinway Model A grand pianos. 6'2\" — exceptional tonal breadth in a versatile size. Price guide, specifications, and current inventory.",
}

export default function ModelAPage() {
  const model = getModel('model-a')
  if (!model) notFound()
  const inventory = getPianosByModel('model-a')
  return <ModelPageTemplate model={model} currentInventory={inventory} />
}
