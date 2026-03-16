/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedPianos, BRANDS, GUIDES, TESTIMONIALS } from '@/lib/piano-data'
import { PianoCardFeatured } from '@/components/piano/PianoCardFeatured'

export function UsedSteinwaysHomePage() {
  const featured = getFeaturedPianos().slice(0, 3)
  const featuredGuides = GUIDES.slice(0, 3)
  const testimonial = TESTIMONIALS[0]

  return (
    <div className="bg-piano-cream">

      {/* ═══════════════════════════════════════════════
          HERO — Full viewport, split composition
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden bg-piano-black">

        {/* Left: Content */}
        <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-24 lg:py-0 lg:w-[52%] xl:w-[48%]">

          {/* Overline */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px w-12 bg-piano-gold" />
            <span className="font-display text-[10px] tracking-[0.35em] uppercase text-piano-gold">
              New Hampshire · Est. 1993
            </span>
          </div>

          {/* Headline — broken for dramatic effect */}
          <h1
            className="text-[clamp(2.8rem,5.5vw,5.2rem)] font-normal leading-[1.05] text-white mb-8 max-w-xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The world's finest<br />
            <em className="not-italic text-piano-gold">pre-owned</em> pianos,<br />
            personally chosen.
          </h1>

          {/* Body */}
          <p className="text-piano-silver text-base md:text-lg leading-loose max-w-md mb-10">
            Every piano personally selected. Every detail inspected.
            A collection where each instrument has earned its place.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/pianos"
              className="inline-flex items-center justify-center bg-piano-burgundy text-white px-8 py-4 font-display text-[11px] tracking-[0.25em] uppercase hover:bg-piano-burgundy/90 transition-colors"
            >
              Browse the Collection
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-piano-gold/50 text-piano-gold px-8 py-4 font-display text-[11px] tracking-[0.25em] uppercase hover:border-piano-gold hover:bg-piano-gold/5 transition-colors"
            >
              Talk to Roger
            </Link>
          </div>

          {/* Scroll hint */}
          <div className="hidden lg:flex items-center gap-3 mt-20 text-piano-silver/40">
            <div className="w-px h-10 bg-piano-silver/20" />
            <span className="font-display text-[9px] tracking-[0.3em] uppercase">Scroll to explore</span>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[54%] h-64 lg:h-auto overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1400&q=85"
            alt="Grand piano in dramatic lighting"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 54vw"
          />
          {/* Gradient bleed into left content on desktop */}
          <div className="absolute inset-0 bg-gradient-to-r from-piano-black via-piano-black/30 to-transparent hidden lg:block" />
          {/* Mobile overlay */}
          <div className="absolute inset-0 bg-piano-black/50 lg:hidden" />
        </div>

        {/* Bottom gold rule */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-piano-gold/20" />
      </section>

      {/* ═══════════════════════════════════════════════
          TRUST BAR — Numbers that command attention
      ═══════════════════════════════════════════════ */}
      <section className="bg-piano-charcoal border-b border-piano-gold/10">
        <div className="max-w-7xl mx-auto px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-piano-gold/10">
            {[
              { stat: '30+', label: 'Years of Expertise', sub: 'Steinway-certified since 1993' },
              { stat: '25', label: 'Instruments', sub: 'Every one personally approved' },
              { stat: '#1', label: 'In New England', sub: 'Pre-owned fine piano selection' },
              { stat: '100%', label: 'Satisfaction', sub: 'Every buyer, every time' },
            ].map(({ stat, label, sub }) => (
              <div key={label} className="lg:px-8 first:pl-0 last:pr-0 text-center lg:text-left">
                <p
                  className="text-[2.8rem] font-normal leading-none text-piano-gold mb-1"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {stat}
                </p>
                <p className="font-display text-[11px] tracking-[0.15em] uppercase text-piano-cream mb-1">{label}</p>
                <p className="text-piano-silver/50 text-xs leading-relaxed hidden lg:block">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURED PIANOS — The collection
      ═══════════════════════════════════════════════ */}
      <section className="bg-piano-cream py-24 px-8">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-piano-burgundy" />
                <span className="font-display text-[10px] tracking-[0.3em] uppercase text-piano-burgundy">
                  Hand-Selected
                </span>
              </div>
              <h2
                className="text-[clamp(2rem,4vw,3.2rem)] font-normal text-piano-black leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Featured Instruments
              </h2>
            </div>
            <Link
              href="/pianos"
              className="group flex items-center gap-3 font-display text-[11px] tracking-[0.2em] uppercase text-piano-black/60 hover:text-piano-burgundy transition-colors shrink-0"
            >
              View all {featured.length > 0 ? '25' : ''} pianos
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((piano) => (
              <PianoCardFeatured key={piano.id} piano={piano} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PHILOSOPHY — The curator story
      ═══════════════════════════════════════════════ */}
      <section className="bg-piano-black py-24 px-8 border-t border-piano-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-0 lg:gap-0 items-start">

            {/* Left: Large editorial quote */}
            <div className="lg:pr-16 pb-12 lg:pb-0">
              <p className="text-piano-gold text-[5rem] leading-none font-display mb-4 opacity-30">"</p>
              <blockquote
                className="text-[clamp(1.5rem,2.8vw,2.2rem)] font-normal text-piano-cream leading-snug mb-10"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}
              >
                We're not married to any manufacturer. We select the finest instruments regardless of nameplate — the only criterion is excellence.
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-piano-charcoal border border-piano-gold/30 flex items-center justify-center">
                  <span className="text-piano-gold text-xs font-display font-bold">R</span>
                </div>
                <div>
                  <p className="text-piano-cream text-sm font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Roger</p>
                  <p className="text-piano-silver/50 font-display text-[10px] tracking-widest uppercase">Founder · RPT · 30 Years</p>
                </div>
              </div>
            </div>

            {/* Vertical divider */}
            <div className="hidden lg:block w-px bg-piano-gold/15 self-stretch mx-8" />

            {/* Right: Brand pillars */}
            <div className="lg:pl-16 pt-12 lg:pt-0 border-t border-piano-gold/10 lg:border-0">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-piano-gold" />
                <span className="font-display text-[10px] tracking-[0.3em] uppercase text-piano-gold">
                  The Difference
                </span>
              </div>
              <h3
                className="text-2xl font-normal text-piano-cream mb-10 leading-snug"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                The Curator,<br />Not the Warehouse
              </h3>
              <div className="space-y-8">
                {[
                  {
                    n: '01',
                    title: 'Multi-Brand Authority',
                    body: 'Steinway, Bösendorfer, Bechstein, Shigeru Kawai — we evaluate them all equally. You get the right piano, not the piano we happen to stock.',
                  },
                  {
                    n: '02',
                    title: 'Radical Transparency',
                    body: 'Prices shown. Condition reports detailed. Video demos recorded. We hide nothing because serious buyers deserve complete information.',
                  },
                  {
                    n: '03',
                    title: 'Personal Expertise',
                    body: 'Every instrument evaluated by Roger personally. Not staff. Not photographs. A 30-year technician who has worked on concert grands at Symphony Hall.',
                  },
                ].map(({ n, title, body }) => (
                  <div key={n} className="flex gap-6">
                    <span className="text-piano-gold/20 font-display text-xs tracking-widest font-bold pt-1 shrink-0 w-6">{n}</span>
                    <div>
                      <h4 className="text-piano-cream text-sm font-medium mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                        {title}
                      </h4>
                      <p className="text-piano-silver/60 text-sm leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 font-display text-[11px] tracking-[0.2em] uppercase text-piano-gold/60 hover:text-piano-gold transition-colors"
                >
                  Roger's story
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BRAND MOSAIC — 10 brands as elegant tiles
      ═══════════════════════════════════════════════ */}
      <section className="bg-piano-cream py-24 px-8 border-t border-piano-gold/10">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-piano-burgundy" />
                <span className="font-display text-[10px] tracking-[0.3em] uppercase text-piano-burgundy">
                  The Makers
                </span>
              </div>
              <h2
                className="text-[clamp(2rem,4vw,3.2rem)] font-normal text-piano-black leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                World-Class Instruments
              </h2>
            </div>
            <p className="text-piano-silver text-sm max-w-xs leading-relaxed">
              We carry ten of the world's finest piano brands — selected for excellence, not exclusivity.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {BRANDS.map((brand) => (
              <Link
                key={brand.slug}
                href={`/pianos/${brand.slug}`}
                className="group relative bg-white border border-gray-100 hover:border-piano-gold/40 hover:shadow-md p-6 transition-all duration-200 overflow-hidden"
              >
                {/* Prestige badge */}
                <div className="absolute top-3 right-3">
                  {brand.prestige === 'Ultra Premium' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-piano-gold" />
                  )}
                </div>

                <p className="font-display text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-2 group-hover:text-piano-burgundy transition-colors">
                  {brand.country.split('/')[0]?.trim()} · {brand.founded}
                </p>
                <h3
                  className="text-piano-black font-medium leading-snug text-[0.95rem] group-hover:text-piano-burgundy transition-colors"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {brand.name}
                </h3>
                <p className="text-gray-400 text-[11px] mt-3 leading-relaxed line-clamp-2 hidden sm:block">
                  {brand.tagline}
                </p>
                <div className="mt-4 flex items-center gap-1 text-piano-gold/0 group-hover:text-piano-gold/60 transition-colors">
                  <span className="font-display text-[9px] tracking-widest uppercase">Explore</span>
                  <span className="text-xs group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          GUIDES PREVIEW — Editorial knowledge section
      ═══════════════════════════════════════════════ */}
      <section className="bg-piano-black py-24 px-8 border-t border-piano-gold/10">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-piano-gold" />
                <span className="font-display text-[10px] tracking-[0.3em] uppercase text-piano-gold">
                  Expert Knowledge
                </span>
              </div>
              <h2
                className="text-[clamp(2rem,4vw,3.2rem)] font-normal text-piano-cream leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Buy with Confidence
              </h2>
            </div>
            <Link
              href="/guides"
              className="group flex items-center gap-3 font-display text-[11px] tracking-[0.2em] uppercase text-piano-silver/50 hover:text-piano-gold transition-colors shrink-0"
            >
              All guides
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group border border-piano-gold/10 hover:border-piano-gold/30 bg-piano-charcoal p-8 transition-all duration-200 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-[9px] tracking-[0.2em] uppercase text-piano-gold/60 group-hover:text-piano-gold transition-colors">
                    {guide.category}
                  </span>
                  <span className="text-piano-silver/30 font-display text-[9px] tracking-wide">{guide.readTime}</span>
                </div>
                <h3
                  className="text-piano-cream text-lg font-normal leading-snug mb-4 flex-1 group-hover:text-white transition-colors"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {guide.title}
                </h3>
                <p className="text-piano-silver/50 text-sm leading-relaxed line-clamp-2 mb-6">
                  {guide.description}
                </p>
                <div className="flex items-center gap-2 text-piano-gold/30 group-hover:text-piano-gold/70 transition-colors">
                  <span className="font-display text-[10px] tracking-widest uppercase">Read</span>
                  <span className="group-hover:translate-x-1 transition-transform text-sm">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TESTIMONIAL — Single commanding quote
      ═══════════════════════════════════════════════ */}
      {testimonial && (
        <section className="bg-piano-charcoal py-24 px-8 border-t border-piano-gold/10 relative overflow-hidden">
          {/* Decorative large quote mark */}
          <div
            className="absolute top-8 left-8 md:left-16 text-[12rem] leading-none text-piano-gold/5 pointer-events-none select-none"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            aria-hidden="true"
          >
            &ldquo;
          </div>

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <blockquote
              className="text-[clamp(1.4rem,2.5vw,2rem)] font-normal text-piano-cream leading-relaxed mb-10"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}
            >
              "{testimonial.quote}"
            </blockquote>

            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-px bg-piano-gold/40 mb-4" />
              <p className="font-display text-[11px] tracking-[0.25em] uppercase text-piano-cream">
                {testimonial.name}
              </p>
              <p className="font-display text-[10px] tracking-widest uppercase text-piano-silver/40">
                {testimonial.piano} · {testimonial.location}
              </p>
            </div>

            <Link
              href="/testimonials"
              className="inline-block mt-8 font-display text-[10px] tracking-[0.25em] uppercase text-piano-gold/40 hover:text-piano-gold/80 transition-colors"
            >
              More stories →
            </Link>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
          FINAL CTA — Begin Your Search
      ═══════════════════════════════════════════════ */}
      <section className="bg-piano-cream py-24 px-8 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-piano-gold/40" />
            <span className="font-display text-[10px] tracking-[0.35em] uppercase text-piano-silver">
              New Hampshire Showroom
            </span>
            <div className="h-px w-12 bg-piano-gold/40" />
          </div>

          <h2
            className="text-[clamp(2.4rem,5vw,4rem)] font-normal text-piano-black leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Begin Your Search
          </h2>

          <p className="text-gray-500 text-base md:text-lg leading-loose max-w-xl mx-auto mb-10">
            Tell us what you're looking for — or come hear the pianos yourself.
            Every conversation starts with listening.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-piano-burgundy text-white px-10 py-4 font-display text-[11px] tracking-[0.25em] uppercase hover:bg-piano-burgundy/90 transition-colors"
            >
              Contact Roger
            </Link>
            <Link
              href="/pianos"
              className="inline-flex items-center justify-center border border-piano-black/20 text-piano-black px-10 py-4 font-display text-[11px] tracking-[0.25em] uppercase hover:border-piano-black hover:bg-piano-black hover:text-white transition-colors"
            >
              Browse Inventory
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-400 font-display tracking-wide">
            or call{' '}
            <a href="tel:+16035550123" className="text-piano-burgundy hover:underline">
              (603) 555-0123
            </a>
          </p>
        </div>
      </section>

    </div>
  )
}
