/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import Link from 'next/link'
import { PianoCardFeatured } from '@/components/piano/PianoCardFeatured'
import { InquiryCTA } from '@/components/piano/InquiryCTA'
import { getAvailablePianos, getFeaturedPianos, BRANDS, getPianosByBrand } from '@/lib/piano-data'

export const metadata: Metadata = {
  title: 'Piano Inventory | UsedSteinways.com',
  description: 'Browse our curated collection of pre-owned Steinway, Bösendorfer, Bechstein, and world-class pianos. Every instrument personally selected by Roger.',
}

export default function PianosPage() {
  const allPianos = getAvailablePianos()
  const featured = getFeaturedPianos()

  return (
    <main className="min-h-screen bg-piano-cream">
      {/* Hero */}
      <section className="bg-piano-black py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <p className="font-display text-xs tracking-[0.3em] uppercase text-piano-gold mb-5">
            New Hampshire · Est. 2005
          </p>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-6 leading-none max-w-4xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            A Curated Collection
          </h1>
          <p className="text-piano-cream/70 text-xl max-w-2xl leading-relaxed mb-4">
            Every piano personally selected. Every detail inspected.
          </p>
          <p className="text-piano-silver font-display text-sm tracking-wide">
            {allPianos.length} instruments currently available
          </p>
        </div>
      </section>

      {/* Featured Pianos */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-burgundy mb-2">Hand-Picked</p>
              <h2 className="text-3xl font-medium text-piano-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Featured Instruments
              </h2>
            </div>
            <p className="text-piano-silver text-sm font-display tracking-wide">{featured.length} featured</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featured.map((piano) => (
              <PianoCardFeatured key={piano.id} piano={piano} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Browser */}
      <section className="py-20 px-8 bg-piano-black border-t border-piano-gold/10">
        <div className="max-w-7xl mx-auto">
          <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-gold mb-3">Browse by Maker</p>
          <h2 className="text-3xl font-medium text-piano-cream mb-12" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            The World's Finest Pianos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {BRANDS.map((brand) => {
              const brandPianos = getPianosByBrand(brand.slug)
              return (
                <Link
                  key={brand.slug}
                  href={`/pianos/${brand.slug}`}
                  className="group p-6 border border-piano-gold/15 hover:border-piano-gold/50 bg-piano-charcoal transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-display text-xs tracking-[0.15em] uppercase text-piano-gold/60 group-hover:text-piano-gold transition-colors">
                      {brand.country}
                    </span>
                    {brandPianos.length > 0 && (
                      <span className="bg-piano-gold/10 text-piano-gold text-xs px-2 py-0.5 font-display tracking-wide">
                        {brandPianos.length}
                      </span>
                    )}
                  </div>
                  <h3 className="text-piano-cream font-medium text-base mb-1 group-hover:text-white transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {brand.name}
                  </h3>
                  <p className="text-piano-silver/60 text-xs leading-relaxed line-clamp-2 mb-4">
                    {brand.tagline}
                  </p>
                  <span className="text-piano-gold/50 group-hover:text-piano-gold font-display text-xs tracking-widest uppercase transition-colors">
                    View Collection →
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <InquiryCTA variant="dark" />
    </main>
  )
}
