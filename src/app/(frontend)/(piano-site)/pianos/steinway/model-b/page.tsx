import type { Metadata } from 'next'
import { ModelPageTemplate } from '@/components/piano/ModelPageTemplate'
import { getModel, getPianosByModel } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Steinway Model B For Sale | UsedSteinways.com',
  description: "Pre-owned Steinway Model B grand pianos. 6'10\" — Steinway's finest home grand. Price guide, specifications, and current inventory.",
}

export default function ModelBPage() {
  const model = getModel('model-b')
  if (!model) notFound()
  const inventory = getPianosByModel('model-b')
  return <ModelPageTemplate model={model} currentInventory={inventory} />
}
