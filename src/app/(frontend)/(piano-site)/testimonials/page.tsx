import type { Metadata } from 'next'
import Link from 'next/link'
import { TESTIMONIALS } from '@/lib/piano-data'
import { InquiryCTA } from '@/components/piano/InquiryCTA'

export const metadata: Metadata = {
  title: 'Customer Testimonials | UsedSteinways.com',
  description:
    'What our clients say about buying through UsedSteinways.com. Real stories from pianists across New England.',
}

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-piano-cream">
      {/* Hero */}
      <section className="bg-piano-black py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <p className="font-display text-xs tracking-[0.3em] uppercase text-piano-gold mb-5">
            From Our Clients
          </p>
          <h1
            className="text-5xl font-medium text-white mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What Pianists Say
          </h1>
          <p className="text-piano-cream/70 text-lg max-w-xl leading-relaxed">
            Our reputation is built one instrument at a time. Here&apos;s what buyers have to say
            about the experience.
          </p>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-16 px-8 border-b border-piano-gold/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-piano-gold text-5xl mb-6" aria-hidden="true">
            &ldquo;
          </p>
          <blockquote
            className="text-2xl md:text-3xl text-piano-black font-medium leading-snug mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {TESTIMONIALS[0]?.quote}
          </blockquote>
          <footer>
            <p className="font-display text-sm tracking-widest uppercase text-gray-700">
              {TESTIMONIALS[0]?.name}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {TESTIMONIALS[0]?.piano} · {TESTIMONIALS[0]?.location}
            </p>
          </footer>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white border border-gray-100 p-8 hover:border-piano-gold/30 transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-piano-gold text-sm">
                    ★
                  </span>
                ))}
              </div>
              <blockquote
                className="text-gray-700 leading-loose mb-6 text-base italic"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <footer className="border-t border-gray-100 pt-5">
                <p className="font-medium text-piano-black text-sm">{testimonial.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">{testimonial.piano}</p>
                <p className="text-gray-400 text-xs mt-0.5">{testimonial.location}</p>
              </footer>
            </div>
          ))}
        </div>
      </section>

      {/* Extended Testimonials (additional hardcoded) */}
      <section className="py-8 px-8 bg-piano-black border-t border-piano-gold/10">
        <div className="max-w-7xl mx-auto">
          <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-gold mb-8 text-center">
            More from Our Clients
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: 'Eleanor Vasquez',
                location: 'Hartford, CT',
                piano: '2005 Blüthner Model 6',
                quote:
                  "The Blüthner Roger found for me is extraordinary. I had never played a Blüthner before — I had no idea what I was missing. The aliquot stringing in the treble is unlike anything I've heard.",
              },
              {
                name: 'Thomas H.',
                location: 'Portland, ME',
                piano: '2012 Steinway Model A',
                quote: 'Roger talked me out of a Model B and into an A because my room simply couldn\'t do justice to a larger instrument. He was right. The A sings in that space.',
              },
              {
                name: 'Linda Park-Morrison',
                location: 'Newton, MA',
                piano: '2018 Shigeru Kawai SK-3',
                quote:
                  "As a piano teacher, I was skeptical of anything that wasn't a Steinway. Roger played both a Shigeru Kawai and a comparable Steinway back-to-back. I bought the Kawai.",
              },
            ].map(({ name, location, piano, quote }) => (
              <div key={name} className="border border-piano-gold/15 p-6">
                <p className="text-piano-gold text-xl mb-3" aria-hidden="true">
                  &ldquo;
                </p>
                <p
                  className="text-piano-cream/80 text-sm leading-relaxed mb-5 italic"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {quote}
                </p>
                <div className="border-t border-piano-gold/10 pt-4">
                  <p className="text-piano-cream text-xs font-display tracking-widest uppercase">
                    {name}
                  </p>
                  <p className="text-piano-silver/60 text-xs mt-0.5">
                    {piano} · {location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-8 bg-piano-cream text-center border-t border-gray-100">
        <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-burgundy mb-3">
          Join Them
        </p>
        <h2
          className="text-3xl font-medium text-piano-black mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Ready to Find Your Piano?
        </h2>
        <Link
          href="/pianos"
          className="inline-block bg-piano-burgundy text-white px-10 py-4 font-display text-xs tracking-[0.2em] uppercase hover:bg-piano-burgundy/90 transition-colors"
        >
          Browse the Collection
        </Link>
      </section>

      <InquiryCTA variant="dark" />
    </main>
  )
}
