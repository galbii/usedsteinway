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
      <section className="relative bg-piano-black pt-20 pb-16 px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src={model.imageUrl} alt={model.name} fill className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-piano-black/60 to-piano-black" />
        <div className="relative max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-piano-cream/60 font-display text-xs tracking-widest uppercase mb-8">
            <Link href="/pianos" className="hover:text-piano-gold transition-colors">All Pianos</Link>
            <span>·</span>
            <Link href="/pianos/steinway" className="hover:text-piano-gold transition-colors">Steinway</Link>
            <span>·</span>
            <span className="text-piano-cream">{model.name}</span>
          </nav>
          <p className="font-display text-xs tracking-[0.3em] uppercase text-piano-gold mb-4">
            Steinway & Sons · {model.type}
          </p>
          <h1
            className="text-5xl md:text-6xl font-medium text-white mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Steinway {model.name}
          </h1>
          <p className="text-piano-cream/70 text-xl max-w-2xl leading-relaxed">
            {model.size} · {model.yearRange}
          </p>
        </div>
      </section>

      {/* Specs + Description */}
      <section className="py-20 px-8 bg-piano-cream">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16">
          {/* Description */}
          <div className="lg:col-span-3">
            <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-burgundy mb-4">Overview</p>
            <h2
              className="text-3xl font-medium text-piano-black mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              What Makes the {model.name} Distinctive
            </h2>
            <p className="text-gray-700 leading-loose mb-8">{model.description}</p>
            <ul className="space-y-3">
              {model.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-gray-700">
                  <span className="text-piano-gold mt-1">◆</span>
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specs Table */}
          <div className="lg:col-span-2">
            <div className="bg-piano-black p-8">
              <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-gold mb-6">
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
                    <dt className="text-piano-silver text-xs font-display tracking-wide uppercase">{label}</dt>
                    <dd className="text-piano-cream text-sm font-medium text-right max-w-[60%]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Price Guide */}
      <section className="py-16 px-8 bg-piano-black border-t border-piano-gold/10">
        <div className="max-w-7xl mx-auto">
          <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-gold mb-3">Market Pricing</p>
          <h2
            className="text-3xl font-medium text-piano-cream mb-10"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
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
        <section className="py-20 px-8 bg-piano-cream border-t border-piano-gold/10">
          <div className="max-w-7xl mx-auto">
            <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-burgundy mb-3">In Stock</p>
            <h2
              className="text-3xl font-medium text-piano-black mb-10"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
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
        <section className="py-12 px-8 bg-piano-black/5 border-t border-piano-gold/10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4 justify-center">
            <p className="text-gray-500 text-sm font-display tracking-wide uppercase">Compare with:</p>
            {model.adjacentModels.map((m) => (
              <Link
                key={m.slug}
                href={`/pianos/steinway/${m.slug}`}
                className="border border-piano-black/20 px-6 py-2.5 text-piano-black text-sm font-display tracking-widest uppercase hover:border-piano-burgundy hover:text-piano-burgundy transition-colors"
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
