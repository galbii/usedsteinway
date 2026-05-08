import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { InquiryCTA } from '@/components/piano/InquiryCTA'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { FeaturedTestimonialsCarousel } from './_components/FeaturedTestimonialsCarousel'

export const metadata: Metadata = {
  title: 'Customer Testimonials | UsedSteinways.com',
  description:
    'What our clients say about buying through UsedSteinways.com. Real stories from pianists across New England.',
}

export default async function TestimonialsPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: testimonials } = await payload.find({
    collection: 'testimonials',
    draft: false,
    limit: 100,
    overrideAccess: false,
    pagination: false,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  const featuredTestimonials = testimonials.filter((t) => t.featured)

  return (
    <main className="min-h-screen bg-piano-cream">
      {/* Hero */}
      <section className="bg-piano-burgundy py-28 px-8">
        <div className="max-w-7xl mx-auto">
          <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-5">
            From Our Clients
          </p>
          <h1
            className="font-cormorant font-light text-white mb-6"
            style={{ fontSize: 'clamp(3.6rem, 7vw, 8.5rem)' }}
          >
            What Our Customers Say
          </h1>
          <p className="text-piano-cream/70 text-lg max-w-xl leading-relaxed">
            Our reputation is built one instrument at a time.<br />
            Here is what buyers say about their experience.
          </p>
        </div>
      </section>

      {/* Featured Carousel */}
      {featuredTestimonials.length > 0 && (
        <FeaturedTestimonialsCarousel testimonials={featuredTestimonials} />
      )}

      {/* Testimonials Grid */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          {testimonials.length === 0 ? (
            <p className="text-piano-stone text-center text-lg">No testimonials published yet.</p>
          ) : (
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
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 bg-piano-cream text-center border-t border-piano-linen">
        <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-3">
          Join Them
        </p>
        <h2
          className="font-cormorant font-light text-piano-black mb-6"
          style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
        >
          Ready to Find Your Piano?
        </h2>
        <Link
          href="/pianos"
          className="inline-block bg-piano-burgundy text-piano-cream px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-charcoal transition-colors"
        >
          Browse the Collection
        </Link>
      </section>

      <InquiryCTA variant="dark" />
    </main>
  )
}
