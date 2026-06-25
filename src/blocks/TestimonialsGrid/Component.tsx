import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Testimonial } from '@/payload-types'

type TestimonialsGridBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  limit?: number | null
  blockType: 'testimonialsGrid'
  id?: string | null
  blockName?: string | null
  disableInnerContainer?: boolean
}

export const TestimonialsGridBlock: React.FC<TestimonialsGridBlockProps> = async ({
  eyebrow,
  heading,
  limit,
}) => {
  let testimonials: Testimonial[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'testimonials',
      draft: false,
      limit: typeof limit === 'number' && limit > 0 ? limit : 100,
      overrideAccess: false,
      pagination: false,
      sort: ['priority', '-publishedAt'],
      where: {
        _status: { equals: 'published' },
      },
    })
    testimonials = docs
  } catch {
    return null
  }

  if (testimonials.length === 0) return null

  return (
    <section className="py-24 px-8 bg-piano-cream">
      <div className="max-w-7xl mx-auto">
        {(eyebrow || heading) && (
          <div className="mb-14 text-center">
            {eyebrow && (
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-3">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2
                className="font-cormorant font-light text-piano-black"
                style={{ fontSize: 'clamp(2.4rem, 4vw, 4rem)' }}
              >
                {heading}
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-piano-cream border border-piano-linen p-8 hover:border-piano-gold/30 transition-colors flex flex-col"
            >
              <h2 className="font-cormorant font-light text-piano-black leading-snug mb-4 text-2xl group-hover:text-piano-burgundy transition-colors flex-1">
                {testimonial.title}
              </h2>
              <footer className="border-t border-piano-linen pt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="font-medium text-piano-black text-base">
                    {testimonial.customerName}
                  </p>
                  {testimonial.location && (
                    <p className="text-piano-stone/70 text-xs mt-0.5">{testimonial.location}</p>
                  )}
                </div>
                <Link
                  href={`/testimonials/${testimonial.slug}`}
                  className="shrink-0 border border-piano-burgundy/30 text-piano-burgundy px-5 py-2 font-display text-[10px] tracking-[0.25em] uppercase hover:bg-piano-burgundy hover:text-piano-cream transition-colors duration-200 whitespace-nowrap"
                >
                  View Testimonial
                </Link>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
