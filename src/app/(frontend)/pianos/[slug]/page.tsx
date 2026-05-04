import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PianoDetailV2 } from '@/components/piano/PianoDetailV2'
import { InquiryCTA } from '@/components/piano/InquiryCTA'
import { BrandPageV2 } from '@/components/piano/BrandPageV2'
import { PianoHeroCarousel } from '@/components/piano/PianoHeroCarousel'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { queryPianoBySlug, queryPianosByBrand } from '@/lib/payload/pianos'
import { queryBrandBySlug, adaptPayloadBrandToDomain, adaptPayloadBrandModels } from '@/lib/payload/brands'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import type { SiteSetting } from '@/payload-types'
import type { Piano } from '@/types/piano'

interface Props {
  params: Promise<{ slug: string }>
}

// ── JSON-LD for individual pianos ────────────────────────────────────────────

function buildProductSchema(piano: Piano, baseUrl: string) {
  const conditionMap: Record<string, string> = {
    new: 'https://schema.org/NewCondition',
    used: 'https://schema.org/UsedCondition',
    reconditioned: 'https://schema.org/RefurbishedCondition',
    rebuilt: 'https://schema.org/UsedCondition',
    Excellent: 'https://schema.org/UsedCondition',
    'Very Good': 'https://schema.org/UsedCondition',
    Good: 'https://schema.org/UsedCondition',
    Fair: 'https://schema.org/UsedCondition',
  }

  const images = piano.imageUrls.map((url) =>
    url.startsWith('http') ? url : `${baseUrl}${url}`,
  )

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${piano.brand} ${piano.model}`,
    description:
      piano.description ||
      `${piano.brand} ${piano.model} piano, ${piano.year}. ${piano.finish} finish, ${piano.size}.`,
    ...(images.length > 0 ? { image: images } : {}),
    brand: { '@type': 'Brand', name: piano.brand },
    model: piano.model,
    itemCondition: conditionMap[piano.condition] ?? 'https://schema.org/UsedCondition',
    ...(piano.serialNumber ? { serialNumber: piano.serialNumber } : {}),
    ...(piano.finish ? { color: piano.finish } : {}),
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/pianos/${piano.slug}`,
      availability: piano.isAvailable
        ? 'https://schema.org/InStock'
        : 'https://schema.org/SoldOut',
      ...(piano.price ? { price: String(piano.price), priceCurrency: 'USD' } : {}),
      seller: { '@type': 'LocalBusiness', name: 'UsedSteinways.com', url: baseUrl },
    },
  }
}

function buildPianoBreadcrumbSchema(piano: Piano, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Pianos', item: `${baseUrl}/pianos` },
      {
        '@type': 'ListItem',
        position: 3,
        name: piano.brand,
        item: `${baseUrl}/pianos/${piano.brandSlug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: `${piano.brand} ${piano.model}`,
        item: `${baseUrl}/pianos/${piano.slug}`,
      },
    ],
  }
}

// Brands that have their own dedicated top-level routes — skip dynamic brand page for these
const DEDICATED_BRAND_ROUTES = new Set(['steinway', 'shigeru-kawai'])

// ── Static Params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const [pianos, brands] = await Promise.all([
    payload.find({
      collection: 'pianos',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: { slug: true },
    }),
    payload.find({
      collection: 'brands',
      limit: 100,
      overrideAccess: false,
      pagination: false,
      select: { slug: true },
    }),
  ])
  return [
    ...pianos.docs.map(({ slug }) => ({ slug })),
    ...brands.docs
      .filter(({ slug }) => !DEDICATED_BRAND_ROUTES.has(slug))
      .map(({ slug }) => ({ slug })),
  ]
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const decoded = decodeURIComponent(slug)
  const baseUrl = getServerSideURL()

  // Try brand first — skip brands that have dedicated top-level routes
  const brandDoc = !DEDICATED_BRAND_ROUTES.has(decoded) ? await queryBrandBySlug(decoded) : null
  if (brandDoc) {
    const brand = adaptPayloadBrandToDomain(brandDoc)
    const canonicalUrl = `${baseUrl}/pianos/${brand.slug}`
    const title = `${brand.name} Pianos For Sale | UsedSteinways.com`
    const description =
      brand.description ||
      `Pre-owned ${brand.name} grand pianos — personally inspected and selected by Roger, RPT.`
    return {
      metadataBase: new URL(baseUrl),
      title,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: mergeOpenGraph({
        title,
        description,
        url: canonicalUrl,
        ...(brand.heroImageUrl
          ? { images: [{ url: brand.heroImageUrl, width: 1200, height: 630, alt: brand.name }] }
          : {}),
      }),
      robots: { index: true, follow: true },
    }
  }

  // Fall back to piano
  const piano = await queryPianoBySlug(decoded)
  if (!piano) return { title: 'Piano Not Found | UsedSteinways.com' }

  const canonicalUrl = `${baseUrl}/pianos/${piano.slug}`
  const conditionLabel =
    piano.condition === 'new'
      ? 'New'
      : piano.condition === 'used'
        ? 'Pre-owned'
        : piano.condition.charAt(0).toUpperCase() + piano.condition.slice(1)

  const title = `${piano.brand} ${piano.model} (${piano.year}) | UsedSteinways.com`
  const description = `${conditionLabel} ${piano.brand} ${piano.model} grand piano — ${piano.finish} finish, ${piano.size}. ${piano.priceDisplay}. Personally evaluated by Roger, a Registered Piano Technician with 30+ years of experience.`

  const firstImage = piano.imageUrls[0]
  const ogImageUrl = firstImage
    ? firstImage.startsWith('http')
      ? firstImage
      : `${baseUrl}${firstImage}`
    : `${baseUrl}/website-template-OG.webp`

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: mergeOpenGraph({
      title,
      description,
      url: canonicalUrl,
      images: [
        { url: ogImageUrl, width: 1200, height: 630, alt: `${piano.brand} ${piano.model}` },
      ],
    }),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    robots: { index: true, follow: true },
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function PianoOrBrandPage({ params }: Props) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params
  const decoded = decodeURIComponent(slug)

  // ── Brand page ──────────────────────────────────────────────────────────────
  const brandDoc = !DEDICATED_BRAND_ROUTES.has(decoded) ? await queryBrandBySlug(decoded) : null
  if (brandDoc) {
    const [brand, pianos] = await Promise.all([
      Promise.resolve(adaptPayloadBrandToDomain(brandDoc)),
      queryPianosByBrand(decoded),
    ])
    const models = adaptPayloadBrandModels(brandDoc)
    const featured = pianos.filter((p) => p.isFeatured)

    return (
      <>
        <PianoHeroCarousel
          pianos={featured.length > 0 ? featured : pianos.slice(0, 5)}
          eyebrow={brand.name}
          headingLine1="Our Used"
          headingLine2={brand.name}
          minimal
        />
        <BrandPageV2
          brand={brand}
          pianos={pianos}
          models={models.length > 0 ? models : undefined}
          modelUrlBase={`/pianos/${brand.slug}`}
          hideHero
          modelsLinkable={false}
        />
      </>
    )
  }

  // ── Piano detail page ────────────────────────────────────────────────────────
  const piano = await queryPianoBySlug(decoded)
  if (!piano) notFound()

  const siteSettings = (await getCachedGlobal('site-settings', 0)()) as SiteSetting
  const allLocations = siteSettings?.locations ?? []
  const phone = siteSettings?.contactInfo?.phone ?? undefined

  const locations =
    piano.location && piano.location !== 'Incoming'
      ? allLocations.filter((loc) => loc.name === piano.location)
      : allLocations

  const baseUrl = getServerSideURL()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildProductSchema(piano, baseUrl)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildPianoBreadcrumbSchema(piano, baseUrl)),
        }}
      />
      {draft && <LivePreviewListener />}
      <PianoDetailV2 piano={piano} locations={locations} phone={phone} />
      <InquiryCTA pianoTitle={piano.title} variant="dark" />
    </>
  )
}
