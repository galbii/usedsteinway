import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ModelPageTemplate } from '@/components/piano/ModelPageTemplate'
import { queryModelFromBrand } from '@/lib/payload/brands'
import { queryPianosByBrandAndModel } from '@/lib/payload/pianos'

interface Props {
  params: Promise<{ modelSlug: string }>
}

// Convert model slug to the value stored in the pianos collection's model field.
// e.g. "model-b" → "B", "model-a3" → "A3"
function modelSlugToValue(modelSlug: string): string {
  return modelSlug.replace(/^model-/, '').toUpperCase()
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'brands',
    where: { slug: { equals: 'steinway' } },
    limit: 1,
    overrideAccess: false,
    depth: 0,
  })
  const brand = result.docs[0]
  if (!brand?.models) return []
  return brand.models.map((m) => ({ modelSlug: m.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { modelSlug } = await params
  const model = await queryModelFromBrand('steinway', modelSlug)
  if (!model) return { title: 'Model Not Found | UsedSteinways.com' }
  return {
    title: `Steinway ${model.name} For Sale | UsedSteinways.com`,
    description: `Pre-owned Steinway ${model.name} grand pianos. ${model.size} — ${model.description.slice(0, 120)}. Price guide, specifications, and current inventory.`,
  }
}

export default async function SteinwayModelPage({ params }: Props) {
  const { modelSlug } = await params
  const model = await queryModelFromBrand('steinway', modelSlug)
  if (!model) notFound()

  const modelValue = modelSlugToValue(modelSlug)
  const inventory = await queryPianosByBrandAndModel('steinway', modelValue)

  return (
    <ModelPageTemplate
      model={model}
      currentInventory={inventory}
      brandHref="/steinway"
      brandLabel="Steinway"
      modelUrlBase="/steinway"
    />
  )
}
