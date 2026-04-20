import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { generateMeta } from '@/utilities/generateMeta'
import { formatDateTime } from '@/utilities/formatDateTime'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Media as MediaType } from '@/payload-types'

import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const testimonials = await payload.find({
    collection: 'testimonials',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return testimonials.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function TestimonialPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/testimonials/' + decodedSlug
  const testimonial = await queryTestimonialBySlug({ slug: decodedSlug })

  if (!testimonial) return <PayloadRedirects url={url} />

  const { title, customerName, location, featuredImage, content, publishedAt } = testimonial
  const hasImage = featuredImage && typeof featuredImage === 'object'

  return (
    <article>
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      {/* Hero */}
      <div className="bg-white pt-[10.4rem]">
        <div className="container pb-12 pt-16">
          <div className="max-w-4xl">
            <h1 className="mb-6 text-[clamp(2rem,5vw,4.5rem)] font-display font-bold leading-tight text-foreground">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-base text-muted-foreground">
              <span className="font-semibold text-foreground text-lg">{customerName}</span>
              {location && <span>{location}</span>}
              {publishedAt && (
                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              )}
            </div>
          </div>
        </div>

        {hasImage && (
          <div className="container pb-0">
            <div className="relative w-full aspect-[16/7] overflow-hidden rounded-xl">
              <Media
                fill
                priority
                imgClassName="object-cover"
                resource={featuredImage as MediaType}
              />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="bg-white">
        <div className="container py-16">
          <div className="max-w-3xl mx-auto">
            <RichText data={content} enableGutter={false} className="prose-xl md:prose-2xl" />
          </div>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const testimonial = await queryTestimonialBySlug({ slug: decodedSlug })

  return generateMeta({ doc: testimonial, url: `/testimonials/${decodedSlug}` })
}

const queryTestimonialBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'testimonials',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
