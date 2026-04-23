import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PianoDetailV2 } from '@/components/piano/PianoDetailV2'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { queryPianoBySlug } from '@/lib/payload/pianos'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import type { SiteSetting } from '@/payload-types'
import type { Piano } from '@/types/piano'

interface Props {
  params: Promise<{ slug: string }>
}

// ── JSON-LD Structured Data ──────────────────────────────────────────────────

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

function buildBreadcrumbSchema(piano: Piano, baseUrl: string) {
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

// ── Static Params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pianos = await payload.find({
    collection: 'pianos',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })
  return pianos.docs.map(({ slug }) => ({ slug }))
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const piano = await queryPianoBySlug(decodeURIComponent(slug))
  if (!piano) return { title: 'Piano Not Found | UsedSteinways.com' }

  const baseUrl = getServerSideURL()
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

export default async function PianoDetailPage({ params }: Props) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params
  const piano = await queryPianoBySlug(decodeURIComponent(slug))

  if (!piano) notFound()

  const siteSettings = (await getCachedGlobal('site-settings', 0)()) as SiteSetting
  const locations = siteSettings?.locations ?? []
  const phone = siteSettings?.contactInfo?.phone ?? undefined

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
          __html: JSON.stringify(buildBreadcrumbSchema(piano, baseUrl)),
        }}
      />
      {draft && <LivePreviewListener />}
      <PianoDetailV2 piano={piano} locations={locations} phone={phone} />
    </>
  )
}
