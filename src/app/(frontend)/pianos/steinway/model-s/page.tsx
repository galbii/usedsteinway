import type { Metadata } from 'next'
import { ModelPageTemplate } from '@/components/piano/ModelPageTemplate'
import { getModel, getPianosByModel } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: "Steinway Model S For Sale | Compact 5'1\" Grand | UsedSteinways.com",
  description: "Pre-owned Steinway Model S grand pianos. 5'1\" — Steinway's most compact grand, ideal for smaller spaces. Price guide, specifications, and current inventory.",
}

export default function ModelSPage() {
  const model = getModel('model-s')
  if (!model) notFound()
  const inventory = getPianosByModel('model-s')
  return <ModelPageTemplate model={model} currentInventory={inventory} />
}
