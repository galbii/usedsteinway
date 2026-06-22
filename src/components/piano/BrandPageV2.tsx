import Link from 'next/link'
import Image from 'next/image'
import type { Brand, Piano, PianoModel } from '@/types/piano'
import { FeaturedProductsCarousel } from './FeaturedProductsCarousel'
import { InquiryCTA } from './InquiryCTA'

const C = {
  bg:     'hsl(36, 22%, 96%)',
  accent: 'hsl(40, 72%, 52%)',
  text:   'hsl(350, 12%, 11%)',
  muted:  'hsl(350, 5%, 46%)',
  border: 'hsl(36, 18%, 89%)',
}

interface BrandPageV2Props {
  brand: Brand
  pianos: Piano[]
  models?: PianoModel[]
  modelUrlBase?: string
  hideHero?: boolean
  hideInventory?: boolean
  hideStory?: boolean
  modelsLinkable?: boolean
}

export function BrandPageV2({ brand, pianos, models, modelUrlBase, hideHero = false, hideInventory = false, hideStory = false, modelsLinkable = true }: BrandPageV2Props) {
  const modelBase = modelUrlBase ?? `/pianos/${brand.slug}`
  return (
    <main className="min-h-screen bg-piano-cream">

      {/* ── Hero ── */}
      {!hideHero && (
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
      )}

      {/* ── Models Overview ── (sits directly beneath the brand story) */}
      {models && models.length > 0 && (
        <section className="relative overflow-hidden bg-piano-cream py-28 px-8 border-t border-piano-linen">
          {/* Soft glass backdrop — gives the frosted cards something to blur against */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-piano-burgundy/10 blur-3xl" />
            <div className="absolute top-1/3 -right-20 h-[24rem] w-[24rem] rounded-full bg-piano-gold/10 blur-3xl" />
            <div className="absolute -bottom-28 left-1/3 h-[22rem] w-[22rem] rounded-full bg-piano-burgundy/10 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto">
            <span className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold block mb-5">
              Model Lineup
            </span>
            <h2
              className="font-cormorant font-light text-piano-black mb-16"
              style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4.5rem)' }}
            >
              {brand.name} Models
            </h2>
            {/* Grid — centered flex-wrap so a partial last row sits in the middle */}
            <div className="flex flex-wrap justify-center gap-6">
              {models.map((model) => {
                const inner = (
                  <>
                    <span className="font-display text-[10px] tracking-[0.35em] uppercase text-piano-gold block mb-3">
                      {model.type}
                    </span>
                    <h3 className="font-cormorant text-3xl font-light text-piano-black group-hover:text-white mb-2 transition-colors duration-300">
                      {model.name}
                    </h3>
                    <p className="text-piano-stone group-hover:text-piano-cream/60 text-sm mb-5 transition-colors duration-300">
                      {model.size}
                    </p>
                    <p className="text-piano-stone group-hover:text-piano-cream/70 text-base leading-relaxed line-clamp-2 mb-5 transition-colors duration-300">
                      {model.description}
                    </p>
                    {modelsLinkable && (
                      <span className="font-display text-[10px] tracking-[0.3em] uppercase text-piano-stone group-hover:text-piano-gold transition-colors duration-300 inline-flex items-center gap-1.5">
                        View Model
                        <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                      </span>
                    )}
                  </>
                )
                const cardWidth =
                  'w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]'
                return modelsLinkable ? (
                  <Link
                    key={model.slug}
                    href={`${modelBase}/${model.slug}`}
                    className={`group relative flex flex-col ${cardWidth} p-8 rounded-2xl overflow-hidden border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(89,25,42,0.07)] transition-all duration-300 hover:bg-piano-burgundy/85 hover:border-piano-burgundy/40 hover:shadow-[0_20px_50px_rgba(89,25,42,0.28)]`}
                  >
                    {/* Left accent bar on hover */}
                    <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[3px] bg-piano-gold transition-all duration-300 ease-out" />
                    {inner}
                  </Link>
                ) : (
                  <div
                    key={model.slug}
                    className={`relative flex flex-col ${cardWidth} p-8 rounded-2xl overflow-hidden border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(89,25,42,0.07)]`}
                  >
                    {inner}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Current Inventory ── */}
      {!hideInventory && <section className="py-36 border-t border-piano-linen" style={{ backgroundColor: C.bg }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-4">
            <div>
              <span
                className="font-display text-[11px] tracking-[0.45em] uppercase block mb-5"
                style={{ color: C.accent }}
              >
                Available Now
              </span>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)', color: C.text }}
              >
                {brand.name} Collection
              </h2>
            </div>
            {pianos.length > 0 && (
              <p
                className="font-display text-[11px] tracking-[0.3em] uppercase"
                style={{ color: C.muted }}
              >
                {pianos.length} instrument{pianos.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        {pianos.length > 0 ? (
          <FeaturedProductsCarousel pianos={pianos} />
        ) : (
          <div className="max-w-7xl mx-auto px-8">
            <div
              className="py-20 text-center"
              style={{ border: `1px solid ${C.border}` }}
            >
              <p className="text-lg mb-4" style={{ color: C.muted }}>
                No {brand.name} pianos in current inventory.
              </p>
              <p
                className="text-base max-w-md mx-auto leading-relaxed mb-10"
                style={{ color: C.muted, opacity: 0.6 }}
              >
                We source and curate instruments continuously. Contact us and we will notify you
                when a {brand.name} becomes available.
              </p>
              <Link
                href={`/contact?subject=${encodeURIComponent(`Waiting List: ${brand.name}`)}`}
                className="inline-block px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase transition-colors hover:opacity-75"
                style={{ border: `1px solid ${C.accent}`, color: C.accent }}
              >
                Join the Waiting List
              </Link>
            </div>
          </div>
        )}
      </section>}

      {/* ── Brand Story ── (now hoisted above inventory via <BrandStory/> on each
          brand page; kept here behind hideStory for any legacy full-page usage) */}
      {!hideStory && (
        <section className="bg-piano-cream py-28 px-8 border-t border-piano-linen">
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
      )}

      {/* ── CTA ── */}
      <InquiryCTA brand={brand.name} variant="dark" />
    </main>
  )
}
