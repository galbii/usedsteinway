import Link from 'next/link'
import Image from 'next/image'
import type { PianoModel, Piano } from '@/types/piano'
import { PianoCardFeatured } from './PianoCardFeatured'
import { InquiryCTA } from './InquiryCTA'

interface ModelPageTemplateProps {
  model: PianoModel
  currentInventory: Piano[]
  brandHref?: string
  brandLabel?: string
  modelUrlBase?: string
}

export function ModelPageTemplate({
  model,
  currentInventory,
  brandHref = '/steinway',
  brandLabel = 'Steinway',
  modelUrlBase = '/steinway',
}: ModelPageTemplateProps) {
  return (
    <main className="min-h-screen bg-piano-cream">
      {/* Hero — centered announcement (matches brand landing pages) */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-piano-burgundy px-8 py-32 overflow-hidden">
        {model.imageUrl && (
          <div className="absolute inset-0">
            <Image src={model.imageUrl} alt={model.name} fill priority className="object-cover opacity-25" sizes="100vw" />
          </div>
        )}
        {/* Overlay — darker at top and bottom, clear in middle */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(4,1,1,0.55) 0%, rgba(4,1,1,0.12) 35%, rgba(4,1,1,0.12) 65%, rgba(4,1,1,0.78) 100%)' }}
        />

        {/* Breadcrumb */}
        <nav
          className="absolute top-0 left-0 right-0 flex items-center justify-center gap-2 text-piano-cream/55 font-display text-[10px] tracking-[0.4em] uppercase"
          style={{ paddingTop: 'clamp(5rem, 8vh, 7rem)' }}
        >
          <Link href="/pianos" className="hover:text-piano-gold transition-colors">All Pianos</Link>
          <span>·</span>
          <Link href={brandHref} className="hover:text-piano-gold transition-colors">{brandLabel}</Link>
          <span>·</span>
          <span className="text-piano-cream/85">{model.name}</span>
        </nav>

        {/* Centered announcement */}
        <div className="relative flex flex-col items-center text-center max-w-3xl">
          <p
            className="font-display text-piano-gold"
            style={{ fontSize: 'clamp(10px, 1vw, 12px)', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: 'clamp(1.25rem, 2.5vh, 2rem)', paddingLeft: '0.5em' }}
          >
            {brandLabel} · {model.type}
          </p>
          <h1
            className="font-cormorant font-light text-piano-cream text-balance"
            style={{ fontSize: 'clamp(3.4rem, 8vw, 8.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            {brandLabel} {model.name}
          </h1>
          {/* Hairline rule with center diamond */}
          <div
            className="flex items-center justify-center"
            style={{ gap: '0.85rem', margin: 'clamp(1.75rem, 3.5vh, 2.75rem) 0 clamp(1.25rem, 2.5vh, 1.75rem)' }}
          >
            <span style={{ width: 'clamp(2.5rem, 6vw, 5rem)', height: '1px', backgroundColor: 'rgba(200,160,75,0.28)' }} />
            <span style={{ width: '5px', height: '5px', transform: 'rotate(45deg)', backgroundColor: 'hsl(40, 72%, 52%)' }} />
            <span style={{ width: 'clamp(2.5rem, 6vw, 5rem)', height: '1px', backgroundColor: 'rgba(200,160,75,0.28)' }} />
          </div>
          {(model.size || model.yearRange) && (
            <p
              className="font-cormorant font-light italic text-piano-cream/60"
              style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.85rem)', lineHeight: 1.4 }}
            >
              {[model.size, model.yearRange].filter(Boolean).join('  ·  ')}
            </p>
          )}
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
                href={`${modelUrlBase}/${m.slug}`}
                className="border border-piano-linen px-6 py-2.5 text-piano-black text-[11px] font-display tracking-[0.3em] uppercase hover:border-piano-gold hover:text-piano-gold transition-colors"
              >
                {m.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <InquiryCTA brand={brandLabel} variant="dark" />
    </main>
  )
}
