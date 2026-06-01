'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AdminReorderButton } from '@/components/admin/reorder/AdminReorderButton'
import { AdminReorderGrid } from '@/components/admin/reorder/AdminReorderGrid'
import { FeaturedTestimonialsCarousel } from './FeaturedTestimonialsCarousel'
import { TestimonialReorderCard } from './TestimonialReorderCard'
import type { Testimonial } from '@/payload-types'

interface TestimonialsPageClientProps {
  testimonials: Testimonial[]
}

export function TestimonialsPageClient({
  testimonials: initialTestimonials,
}: TestimonialsPageClientProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials)
  const [reorderMode, setReorderMode] = useState(false)

  if (reorderMode) {
    return (
      <>
        <AdminReorderGrid<Testimonial>
          items={testimonials}
          collection="testimonials"
          gridClassName="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6"
          renderCardBody={(t) => <TestimonialReorderCard testimonial={t} />}
          onSaved={(updated) => {
            setTestimonials(updated)
            setReorderMode(false)
          }}
          onCancel={() => setReorderMode(false)}
        />
        <AdminReorderButton value={reorderMode} onChange={setReorderMode} />
      </>
    )
  }

  const featuredTestimonials = testimonials.filter((t) => t.featured)

  return (
    <>
      {featuredTestimonials.length > 0 && (
        <FeaturedTestimonialsCarousel testimonials={featuredTestimonials} />
      )}

      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          {testimonials.length === 0 ? (
            <p className="text-piano-stone text-center text-lg">
              No testimonials published yet.
            </p>
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
                        <p className="text-piano-stone/70 text-xs mt-0.5">
                          {testimonial.location}
                        </p>
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

      <AdminReorderButton value={reorderMode} onChange={setReorderMode} />
    </>
  )
}
