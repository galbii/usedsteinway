import type { Metadata } from 'next'
import { ModelPageTemplate } from '@/components/piano/ModelPageTemplate'
import { getModel, getPianosByModel } from '@/lib/piano-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Hamburg Steinway Model S For Sale | UsedSteinways.com',
  description: "Pre-owned Hamburg Steinway Model S grand pianos. German-crafted instruments with the legendary Hamburg voicing and touch. Price guide, specifications, and current inventory.",
}

export default function HamburgSPage() {
  const model = getModel('hamburg-s')
  if (!model) notFound()
  const inventory = getPianosByModel('hamburg-s')
  return <ModelPageTemplate model={model} currentInventory={inventory} />
}
