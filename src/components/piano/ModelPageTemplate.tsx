import Link from 'next/link'
import Image from 'next/image'
import type { PianoModel, Piano } from '@/types/piano'
import { PianoCardFeatured } from './PianoCardFeatured'
import { PriceGuideTable } from './PriceGuideTable'
import { InquiryCTA } from './InquiryCTA'

interface ModelPageTemplateProps {
  model: PianoModel
  currentInventory: Piano[]
}

export function ModelPageTemplate({ model, currentInventory }: ModelPageTemplateProps) {
  return (
    <main className="min-h-screen bg-piano-cream">
      {/* Hero */}
      <section className="relative bg-piano-burgundy pt-28 pb-24 px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src={model.imageUrl} alt={model.name} fill className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-piano-black/60 to-piano-black" />
        <div className="relative max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-piano-cream/60 font-display text-[11px] tracking-[0.45em] uppercase mb-8">
            <Link href="/pianos" className="hover:text-piano-gold transition-colors">All Pianos</Link>
            <span>·</span>
            <Link href="/pianos/steinway" className="hover:text-piano-gold transition-colors">Steinway</Link>
            <span>·</span>
            <span className="text-piano-cream">{model.name}</span>
          </nav>
          <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">
            Steinway & Sons · {model.type}
          </p>
          <h1
            className="font-cormorant font-light text-white mb-6"
            style={{ fontSize: 'clamp(3.6rem, 7vw, 8.5rem)' }}
          >
            Steinway {model.name}
          </h1>
          <p className="text-piano-cream/70 text-xl max-w-2xl leading-relaxed">
            {model.size} · {model.yearRange}
          </p>
        </div>
      </section>

      {/* Specs + Description */}
      <section className="py-28 px-8 bg-piano-cream">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16">
          {/* Description */}
          <div className="lg:col-span-3">
            <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">Overview</p>
            <h2
              className="font-cormorant font-light text-piano-black mb-6"
              style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4.5rem)' }}
            >
              What Makes the {model.name} Distinctive
            </h2>
            <p className="text-piano-stone text-lg leading-relaxed mb-8">{model.description}</p>
            <ul className="space-y-3">
              {model.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-piano-stone">
                  <span className="text-piano-gold mt-1">◆</span>
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specs Table */}
          <div className="lg:col-span-2">
            <div className="bg-piano-indigo-card p-8">
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-6">
                Specifications
              </p>
              <dl className="space-y-4">
                {[
                  { label: 'Length', value: model.size },
                  { label: 'Weight', value: model.weight },
                  { label: 'String Length', value: model.stringLength },
                  { label: 'Production', value: model.yearRange },
                  { label: 'Type', value: model.type },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-start pb-4 border-b border-piano-gold/10">
                    <dt className="text-piano-silver text-[11px] font-display tracking-[0.45em] uppercase">{label}</dt>
                    <dd className="text-piano-cream text-sm font-medium text-right max-w-[60%]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Price Guide */}
      <section className="py-24 px-8 bg-piano-burgundy border-t border-piano-gold/10">
        <div className="max-w-7xl mx-auto">
          <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-3">Market Pricing</p>
          <h2
            className="font-cormorant font-light text-piano-cream mb-10"
            style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4.5rem)' }}
          >
            Price Guide by Era & Condition
          </h2>
          <PriceGuideTable entries={model.priceGuide} className="max-w-3xl" />
          <p className="mt-6 text-piano-silver/60 text-xs max-w-2xl leading-relaxed">
            Prices are indicative market ranges based on current auction results, dealer prices, and private
            sales. Condition descriptions follow the Registered Piano Technician (RPT) standard scale.
            Contact us for a specific appraisal.
          </p>
        </div>
      </section>

      {/* Current Inventory */}
      {currentInventory.length > 0 && (
        <section className="py-28 px-8 bg-piano-cream border-t border-piano-linen">
          <div className="max-w-7xl mx-auto">
            <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-3">In Stock</p>
            <h2
              className="font-cormorant font-light text-piano-black mb-10"
              style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4.5rem)' }}
            >
              Available {model.name} Pianos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentInventory.map((p) => (
                <PianoCardFeatured key={p.id} piano={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Adjacent Models */}
      {model.adjacentModels.length > 0 && (
        <section className="py-12 px-8 bg-piano-black/5 border-t border-piano-linen">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4 justify-center">
            <p className="text-piano-stone text-[11px] font-display tracking-[0.45em] uppercase">Compare with:</p>
            {model.adjacentModels.map((m) => (
              <Link
                key={m.slug}
                href={`/pianos/steinway/${m.slug}`}
                className="border border-piano-linen px-6 py-2.5 text-piano-black text-[11px] font-display tracking-[0.3em] uppercase hover:border-piano-gold hover:text-piano-gold transition-colors"
              >
                {m.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <InquiryCTA brand="Steinway" variant="dark" />
    </main>
  )
}
