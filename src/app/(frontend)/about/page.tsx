import type { Metadata } from 'next'
import { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PageEditButton } from '@/components/admin/onpage/PageEditButton'
import { serializeBlocks } from '@/components/admin/onpage/editorSchema'
import { editableBlocks } from '@/blocks/registry'
import { AboutPageContent } from './_components/AboutPageContent'
import { InquiryCTA } from '@/components/piano/InquiryCTA'

export const metadata: Metadata = {
  title: "About Roger's Piano | New England's Rebuilt Steinway Destination",
  description:
    "Founded in 1980 by master technician Roger Shaffer, Roger's Piano is New England's trusted destination for rebuilt and restored vintage Steinway instruments — combining 40+ years of craftsmanship with enduring musical heritage.",
}

const queryAboutPage = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: { slug: { equals: 'about' } },
  })
  return result.docs?.[0] ?? null
})

export default async function AboutPage() {
  const { isEnabled: draft } = await draftMode()
  const page = await queryAboutPage()

  // CMS-driven: if an editor has built the About page out of blocks, render it.
  if (page) {
    const { hero, layout } = page
    return (
      <article className={hero?.type === 'none' ? '' : 'pt-16'}>
        {draft && <LivePreviewListener />}
        <RenderHero {...hero} />
        <RenderBlocks blocks={layout} />
        <PageEditButton pageId={page.id} blockSchemas={serializeBlocks(editableBlocks)} />
      </article>
    )
  }

  // Fallback: the original hand-built About page (default until a CMS page exists).
  return (
    <>
      <AboutPageContent />
      <InquiryCTA variant="light" />
    </>
  )
}
