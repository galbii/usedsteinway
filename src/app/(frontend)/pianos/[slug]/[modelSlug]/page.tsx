import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ModelPageTemplate } from '@/components/piano/ModelPageTemplate'
import { queryBrandBySlug, queryModelFromBrand } from '@/lib/payload/brands'
import { queryPianosByBrandAndModel } from '@/lib/payload/pianos'
import { ModelEditButton } from '@/components/admin/onpage/ModelEditButton'
import { modelEditFieldSchemas } from '@/components/admin/onpage/brandEditSchema'

interface Props {
  params: Promise<{ slug: string; modelSlug: string }>
}

// Brands with their own dedicated top-level routes — exclude from this dynamic route
const DEDICATED_BRAND_ROUTES = new Set(['steinway', 'shigeru-kawai'])

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'brands',
    limit: 100,
    overrideAccess: false,
    pagination: false,
    depth: 0,
    select: { slug: true, models: true },
  })
  return result.docs
    .filter((b) => !DEDICATED_BRAND_ROUTES.has(b.slug))
    .flatMap((b) =>
      (b.models ?? []).map((m) => ({ slug: b.slug, modelSlug: m.slug })),
    )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, modelSlug } = await params
  const decodedBrand = decodeURIComponent(slug)
  if (DEDICATED_BRAND_ROUTES.has(decodedBrand)) return { title: 'Not Found' }

  const [brandDoc, model] = await Promise.all([
    queryBrandBySlug(decodedBrand),
    queryModelFromBrand(decodedBrand, modelSlug),
  ])
  if (!brandDoc || !model) return { title: 'Model Not Found | UsedSteinways.com' }

  return {
    title: `${brandDoc.name} ${model.name} For Sale | UsedSteinways.com`,
    description: `Pre-owned ${brandDoc.name} ${model.name} pianos. ${model.size} — ${model.description.slice(0, 120)}. Price guide, specifications, and current inventory.`,
  }
}

export default async function BrandModelPage({ params }: Props) {
  const { slug, modelSlug } = await params
  const decodedBrand = decodeURIComponent(slug)
  if (DEDICATED_BRAND_ROUTES.has(decodedBrand)) notFound()

  const [brandDoc, model] = await Promise.all([
    queryBrandBySlug(decodedBrand),
    queryModelFromBrand(decodedBrand, modelSlug),
  ])
  if (!brandDoc || !model) notFound()

  const inventory = await queryPianosByBrandAndModel(decodedBrand, model.name)

  return (
    <>
      <ModelPageTemplate
        model={model}
        currentInventory={inventory}
        brandHref={`/pianos/${brandDoc.slug}`}
        brandLabel={brandDoc.name}
        modelUrlBase={`/pianos/${brandDoc.slug}`}
      />
      <ModelEditButton
        brandSlug={brandDoc.slug}
        modelSlug={modelSlug}
        modelName={`${brandDoc.name} ${model.name}`}
        fieldSchemas={modelEditFieldSchemas()}
      />
    </>
  )
}
