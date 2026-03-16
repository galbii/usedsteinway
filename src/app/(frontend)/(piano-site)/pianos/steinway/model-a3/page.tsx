import type { Metadata } from 'next'
import { ModelPageTemplate } from '@/components/piano/ModelPageTemplate'
import { getModel, getPianosByModel } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: "Steinway Model A3 For Sale | 6'4\" Grand | UsedSteinways.com",
  description: "Pre-owned Steinway Model A3 grand pianos. 6'4\" — a rare and sought-after intermediate size between the A and B. Price guide, specifications, and current inventory.",
}

export default function ModelA3Page() {
  const model = getModel('model-a3')
  if (!model) notFound()
  const inventory = getPianosByModel('model-a3')
  return <ModelPageTemplate model={model} currentInventory={inventory} />
}
