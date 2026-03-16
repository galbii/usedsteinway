import Link from 'next/link'
import Image from 'next/image'
import type { Brand, Piano, PianoModel } from '@/types/piano'
import { PianoCardFeatured } from './PianoCardFeatured'
import { InquiryCTA } from './InquiryCTA'

interface BrandPageV2Props {
  brand: Brand
  pianos: Piano[]
  models?: PianoModel[]
}

export function BrandPageV2({ brand, pianos, models }: BrandPageV2Props) {
  return (
    <main className="min-h-screen bg-piano-cream">
      {/* ── Cinematic Hero ── */}
      <section className="relative h-[75vh] min-h-[520px] max-h-[800px] overflow-hidden bg-piano-black">
        <Image
          src={brand.heroImageUrl}
          alt={brand.name}
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-piano-black/30 via-transparent to-piano-black/80" />

        {/* Breadcrumb */}
        <div className="absolute top-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-8">
            <nav className="flex items-center gap-2 text-piano-cream/60 font-display text-xs tracking-widest uppercase">
              <Link href="/pianos" className="hover:text-piano-gold transition-colors">
                All Pianos
              </Link>
              <span>·</span>
              <span className="text-piano-cream">{brand.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 pb-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <p className="font-display text-xs tracking-[0.3em] uppercase text-piano-gold mb-5">
                {brand.country} · Est. {brand.founded} · {brand.prestige}
              </p>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-none mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {brand.name}
              </h1>
              <p className="text-piano-cream/80 text-xl font-light max-w-xl leading-relaxed">
                {brand.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section className="bg-piano-cream py-20 px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-burgundy mb-4">
              The Instrument
            </p>
            <h2
              className="text-3xl md:text-4xl font-medium text-piano-black leading-snug mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              About {brand.name}
            </h2>
            <p className="text-gray-700 text-base leading-loose">{brand.description}</p>
          </div>
          <div className="border-l border-piano-gold/30 pl-12">
            <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-burgundy mb-6">
              The Case for Pre-Owned
            </p>
            <ul className="space-y-5">
              {brand.whyBuyPreowned.map((reason, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="mt-1 shrink-0 w-5 h-5 rounded-full border border-piano-gold flex items-center justify-center text-piano-gold"
                    style={{ fontSize: '10px' }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed text-sm">{reason}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Gold Divider ── */}
      <div className="border-t border-piano-gold/20" />

      {/* ── Current Inventory ── */}
      <section className="bg-piano-black py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-gold mb-3">
                Available Now
              </p>
              <h2
                className="text-3xl md:text-4xl font-medium text-piano-cream"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {brand.name} Collection
              </h2>
            </div>
            {pianos.length > 0 && (
              <p className="text-piano-silver font-display text-xs tracking-widest uppercase">
                {pianos.length} instrument{pianos.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {pianos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pianos.map((piano) => (
                <PianoCardFeatured key={piano.id} piano={piano} />
              ))}
            </div>
          ) : (
            <div className="border border-piano-gold/20 py-16 text-center">
              <p className="text-piano-silver text-base mb-4">
                No {brand.name} pianos in current inventory.
              </p>
              <p className="text-piano-silver/60 text-sm max-w-md mx-auto">
                We source and curate instruments continuously. Contact us and we will notify you
                when a {brand.name} becomes available.
              </p>
              <Link
                href={`/contact?subject=${encodeURIComponent(`Waiting List: ${brand.name}`)}`}
                className="mt-8 inline-block border border-piano-gold text-piano-gold px-8 py-3 font-display text-xs tracking-widest uppercase hover:bg-piano-gold/10 transition-colors"
              >
                Join the Waiting List
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Models Overview ── */}
      {models && models.length > 0 && (
        <section className="bg-piano-cream py-20 px-8 border-t border-piano-gold/20">
          <div className="max-w-7xl mx-auto">
            <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-burgundy mb-3">
              Model Lineup
            </p>
            <h2
              className="text-3xl font-medium text-piano-black mb-12"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {brand.name} Models
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.map((model) => (
                <Link
                  key={model.slug}
                  href={`/pianos/${brand.slug}/${model.slug}`}
                  className="group p-6 border border-piano-black/10 hover:border-piano-gold/40 bg-white transition-all duration-200 hover:shadow-md"
                >
                  <p className="font-display text-xs tracking-[0.15em] uppercase text-piano-burgundy mb-2">
                    {model.type}
                  </p>
                  <h3
                    className="text-xl font-medium text-piano-black mb-2"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {model.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {model.size} · {model.yearRange}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {model.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-piano-burgundy/70 group-hover:text-piano-burgundy transition-colors">
                    <span className="font-display text-xs tracking-widest uppercase">
                      View Model
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <InquiryCTA brand={brand.name} variant="dark" />
    </main>
  )
}
