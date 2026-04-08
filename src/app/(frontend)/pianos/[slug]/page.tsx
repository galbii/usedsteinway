import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PianoDetailV2 } from '@/components/piano/PianoDetailV2'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'
import { queryPianoBySlug } from '@/lib/payload/pianos'

interface Props {
  params: Promise<{ slug: string }>
}

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const piano = await queryPianoBySlug(decodeURIComponent(slug))
  if (!piano) return { title: 'Piano Not Found' }
  // Build metadata from CMS meta fields if available, fallback to title
  return (
    generateMeta({ doc: piano as Parameters<typeof generateMeta>[0]['doc'] }) ?? {
      title: `${piano.title} | UsedSteinways.com`,
      description: `${piano.brand} ${piano.model} (${piano.year}) — ${piano.finish}, ${piano.size}. ${piano.priceDisplay}.`,
    }
  )
}

export default async function PianoDetailPage({ params }: Props) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params
  const piano = await queryPianoBySlug(decodeURIComponent(slug))

  if (!piano) notFound()

  return (
    <>
      {draft && <LivePreviewListener />}
      <PianoDetailV2 piano={piano} />
    </>
  )
}
