import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { FeaturedTestimonialsCarousel } from '@/app/(frontend)/testimonials/_components/FeaturedTestimonialsCarousel'

type TestimonialsFeaturedBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  blockType: 'testimonialsFeatured'
  id?: string | null
  blockName?: string | null
  disableInnerContainer?: boolean
}

export const TestimonialsFeaturedBlock: React.FC<TestimonialsFeaturedBlockProps> = async () => {
  let featured: Array<{
    id: string
    title: string
    customerName: string
    location?: string | null
    slug: string
  }> = []

  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'testimonials',
      draft: false,
      limit: 100,
      overrideAccess: false,
      pagination: false,
      sort: ['priority', '-publishedAt'],
      where: {
        and: [{ _status: { equals: 'published' } }, { featured: { equals: true } }],
      },
    })

    featured = docs.map((t) => ({
      id: String(t.id),
      title: t.title,
      customerName: t.customerName,
      location: t.location,
      slug: t.slug,
    }))
  } catch {
    return null
  }

  if (featured.length === 0) return null

  return <FeaturedTestimonialsCarousel testimonials={featured} />
}
