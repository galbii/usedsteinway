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

      {/* ── Hero ── */}
      <section className="relative h-[75vh] min-h-[520px] max-h-[800px] overflow-hidden bg-piano-burgundy">
        <Image
          src={brand.heroImageUrl}
          alt={brand.name}
          fill
          priority
          className="object-cover opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-piano-black/40 via-transparent to-piano-black/85" />

        {/* Breadcrumb */}
        <div className="absolute top-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-8">
            <nav className="flex items-center gap-2 text-piano-cream/50 font-display text-[10px] tracking-[0.3em] uppercase">
              <Link href="/pianos" className="hover:text-piano-gold transition-colors">All Pianos</Link>
              <span>·</span>
              <span className="text-piano-cream/80">{brand.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 pb-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <span className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold block mb-5">
                {brand.country} · Est. {brand.founded} · {brand.prestige}
              </span>
              <h1
                className="font-cormorant font-light text-white leading-none mb-6"
                style={{ fontSize: 'clamp(3.6rem, 7vw, 8rem)' }}
              >
                {brand.name}
              </h1>
              <p className="text-piano-cream/75 text-xl font-light max-w-xl leading-relaxed">
                {brand.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section className="bg-piano-cream py-28 px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold block mb-5">
              The Instrument
            </span>
            <h2
              className="font-cormorant font-light text-piano-black leading-snug mb-8"
              style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4.5rem)' }}
            >
              About {brand.name}
            </h2>
            <p className="text-piano-stone text-lg leading-relaxed">{brand.description}</p>
          </div>
          <div className="border-l border-piano-linen pl-12">
            <span className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold block mb-8">
              The Case for Pre-Owned
            </span>
            <ul className="space-y-6">
              {brand.whyBuyPreowned.map((reason, i) => (
                <li key={i} className="flex gap-5">
                  <span className="mt-0.5 shrink-0 w-6 h-6 border border-piano-gold/40 flex items-center justify-center text-piano-gold font-display text-[9px] font-bold">
                    {i + 1}
                  </span>
                  <p className="text-piano-stone text-base leading-relaxed">{reason}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="border-t border-piano-linen" />

      {/* ── Current Inventory ── */}
      <section className="bg-piano-burgundy py-28 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold block mb-5">
                Available Now
              </span>
              <h2
                className="font-cormorant font-light text-piano-cream"
                style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4.5rem)' }}
              >
                {brand.name} Collection
              </h2>
            </div>
            {pianos.length > 0 && (
              <p className="text-piano-stone font-display text-[10px] tracking-[0.3em] uppercase">
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
            <div className="border border-piano-gold/20 py-20 text-center">
              <p className="text-piano-stone text-lg mb-4">
                No {brand.name} pianos in current inventory.
              </p>
              <p className="text-piano-stone/60 text-base max-w-md mx-auto leading-relaxed mb-10">
                We source and curate instruments continuously. Contact us and we will notify you
                when a {brand.name} becomes available.
              </p>
              <Link
                href={`/contact?subject=${encodeURIComponent(`Waiting List: ${brand.name}`)}`}
                className="inline-block border border-piano-gold text-piano-gold px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-gold/10 transition-colors"
              >
                Join the Waiting List
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Models Overview ── */}
      {models && models.length > 0 && (
        <section className="bg-piano-cream py-28 px-8 border-t border-piano-linen">
          <div className="max-w-7xl mx-auto">
            <span className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold block mb-5">
              Model Lineup
            </span>
            <h2
              className="font-cormorant font-light text-piano-black mb-16"
              style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4.5rem)' }}
            >
              {brand.name} Models
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-piano-linen border border-piano-linen">
              {models.map((model) => (
                <Link
                  key={model.slug}
                  href={`/pianos/${brand.slug}/${model.slug}`}
                  className="group p-8 bg-piano-cream hover:bg-piano-warm-white transition-colors duration-200"
                >
                  <span className="font-display text-[10px] tracking-[0.35em] uppercase text-piano-gold block mb-3">
                    {model.type}
                  </span>
                  <h3 className="font-cormorant text-3xl font-light text-piano-black mb-2 group-hover:text-piano-charcoal transition-colors">
                    {model.name}
                  </h3>
                  <p className="text-piano-stone text-sm mb-5">
                    {model.size} · {model.yearRange}
                  </p>
                  <p className="text-piano-stone text-base leading-relaxed line-clamp-2 mb-5">
                    {model.description}
                  </p>
                  <span className="font-display text-[10px] tracking-[0.3em] uppercase text-piano-stone group-hover:text-piano-black transition-colors inline-flex items-center gap-1.5">
                    View Model
                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </span>
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
