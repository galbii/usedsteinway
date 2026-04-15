/* eslint-disable react/no-unescaped-entities */
/**
 * UsedSteinways — Design Scale System
 * ─────────────────────────────────────────────────────────────
 * Display type (Cormorant Garamond, font-cormorant):
 *   Hero XL    → clamp(5rem, 8.5vw, 10rem)
 *   Section LG → clamp(3.2rem, 5.5vw, 6rem)
 *   Card MD    → text-4xl (2.25rem)
 *   Sub SM     → text-2xl (1.5rem)
 *   Inline     → text-xl (1.25rem)
 *
 * UI type (Syne, font-display) — small + wide tracking is intentional:
 *   Overlines  → text-[11px] tracking-[0.45em]
 *   Nav / BTN  → text-[11px] tracking-[0.28em]
 *   Captions   → text-[10px] tracking-[0.35em]
 *
 * Body (Geist Sans):
 *   Primary    → text-lg (18px)
 *   Secondary  → text-base (16px)
 *   Fine       → text-sm (14px)
 *
 * Spacing rhythm:
 *   Section    → py-36
 *   Card inner → p-8 / p-9
 *   Section hdr margin → mb-20
 *   Overline → mb-5
 *   Headline → mb-10
 * ─────────────────────────────────────────────────────────────
 */
import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedPianos, BRANDS, GUIDES, TESTIMONIALS } from '@/lib/piano-data'
import { HeroCarousel } from '@/components/piano/HeroCarousel'

export function UsedSteinwaysHomePage() {
  const featured = getFeaturedPianos()
  const featuredGuides = GUIDES.slice(0, 3)
  const testimonial = TESTIMONIALS[0]

  return (
    <div className="bg-piano-cream">

      {/* ═══════════════════════════════════════════════
          HERO — Split editorial composition
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">

        {/* Left: Ivory panel */}
        <div className="relative z-10 flex flex-col justify-center bg-piano-cream px-10 md:px-16 xl:px-24 py-32 lg:py-0 lg:w-[46%] xl:w-[44%]">

          {/* Overline */}
          <div
            className="flex items-center gap-3 mb-10 animate-fade-up"
            style={{ animationDelay: '0.05s', opacity: 0 }}
          >
            <div className="h-px w-8 bg-piano-gold" />
            <span className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-stone">
              New Hampshire · Est. 1993
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-cormorant leading-[1.03] text-piano-black mb-10 animate-fade-up"
            style={{
              fontSize: 'clamp(3.6rem, 7vw, 8.5rem)',
              animationDelay: '0.15s',
              opacity: 0,
            }}
          >
            The world's finest<br />
            <em className="italic text-piano-gold">pre-owned</em> pianos,<br />
            personally chosen.
          </h1>

          {/* Body */}
          <p
            className="text-piano-stone text-lg leading-relaxed max-w-md mb-12 font-light animate-fade-up"
            style={{ animationDelay: '0.25s', opacity: 0 }}
          >
            Every instrument personally evaluated by Roger — a Registered Piano
            Technician with thirty years of experience placing extraordinary
            pianos in extraordinary homes.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-up"
            style={{ animationDelay: '0.35s', opacity: 0 }}
          >
            <Link
              href="/pianos"
              className="inline-flex items-center justify-center bg-piano-black text-piano-cream px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-charcoal transition-colors duration-200"
            >
              Browse Collection
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-piano-black/25 text-piano-black px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:border-piano-gold hover:text-piano-gold transition-colors duration-200"
            >
              Talk to Roger
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="flex gap-12 mt-16 pt-10 border-t border-piano-linen animate-fade-up"
            style={{ animationDelay: '0.45s', opacity: 0 }}
          >
            {[
              { n: '30+', l: 'Years' },
              { n: '25', l: 'Instruments' },
              { n: '10', l: 'Brands' },
            ].map(({ n, l }) => (
              <div key={l}>
                <p className="font-cormorant font-light text-piano-black leading-none" style={{ fontSize: 'clamp(2.8rem, 4vw, 4rem)' }}>
                  {n}
                </p>
                <p className="font-display text-[10px] tracking-[0.35em] uppercase text-piano-stone mt-2">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical divider */}
        <div className="hidden lg:block absolute left-[46%] xl:left-[44%] top-0 bottom-0 w-px bg-piano-gold/20 z-20" />

        {/* Right: Piano photograph */}
        <div className="relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[54%] xl:w-[56%] h-72 lg:h-auto">
          <Image
            src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1600&q=90"
            alt="Grand piano in dramatic lighting"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 56vw"
          />
          <div className="absolute inset-0 bg-piano-black/15 hidden lg:block" />
          <div className="absolute inset-0 bg-piano-black/55 lg:hidden" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TICKER — Brand names marquee
      ═══════════════════════════════════════════════ */}
      <div className="bg-piano-black h-12 flex items-center overflow-hidden border-t border-b border-piano-gold/10">
        <div className="flex items-center animate-ticker whitespace-nowrap">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center shrink-0">
              {BRANDS.map((brand) => (
                <span key={brand.slug} className="flex items-center">
                  <span className="font-display text-[10px] tracking-[0.45em] uppercase text-piano-cream/30 px-8">
                    {brand.name}
                  </span>
                  <span className="text-piano-gold/20 text-xs">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          FEATURED INSTRUMENTS — Cinematic carousel
      ═══════════════════════════════════════════════ */}
      <HeroCarousel pianos={featured} />

      {/* Featured sub-bar — section label + view-all link */}
      <div className="bg-piano-black border-t border-piano-gold/10 flex items-center justify-between px-10 h-11">
        <span className="font-display text-[10px] tracking-[0.45em] uppercase text-piano-cream/20">
          Hand-Selected · Featured Instruments
        </span>
        <Link
          href="/pianos"
          className="group flex items-center gap-2 font-display text-[10px] tracking-[0.3em] uppercase text-piano-stone hover:text-piano-cream transition-colors"
        >
          View all 25 pianos
          <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
        </Link>
      </div>

      {/* ═══════════════════════════════════════════════
          PHILOSOPHY — The curator story
      ═══════════════════════════════════════════════ */}
      <section className="bg-piano-black py-36 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1px_1fr] items-start">

            {/* Left: Quote */}
            <div className="lg:pr-20 pb-16 lg:pb-0">
              <div className="h-px w-10 bg-piano-gold mb-14" />
              <blockquote
                className="font-cormorant font-light italic text-piano-cream leading-snug mb-12"
                style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.8rem)' }}
              >
                "We're not married to any manufacturer. We select the finest
                instruments regardless of nameplate — the only criterion is
                excellence."
              </blockquote>
              <div className="flex items-center gap-5">
                <div className="w-11 h-11 border border-piano-gold/35 flex items-center justify-center shrink-0">
                  <span className="text-piano-gold font-display text-xs font-bold">R</span>
                </div>
                <div>
                  <p className="font-cormorant text-piano-cream text-xl font-light leading-none mb-1.5">
                    Roger
                  </p>
                  <p className="font-display text-[10px] tracking-[0.35em] uppercase text-piano-stone">
                    Founder · RPT · 30 Years
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-piano-gold/12 self-stretch mx-14" />

            {/* Right: Pillars */}
            <div className="lg:pl-20 pt-16 lg:pt-0 border-t border-piano-gold/10 lg:border-0">
              <span className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold block mb-10">
                The Difference
              </span>
              <h3
                className="font-cormorant font-light text-piano-cream mb-14 leading-snug"
                style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.4rem)' }}
              >
                The Curator,<br />Not the Warehouse
              </h3>
              <div className="space-y-10">
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
                    body: 'Every instrument evaluated by Roger personally. A 30-year RPT who has worked on concert grands at Symphony Hall.',
                  },
                ].map(({ n, title, body }) => (
                  <div key={n} className="flex gap-7">
                    <span className="font-display text-[10px] tracking-widest text-piano-gold/25 pt-0.5 shrink-0 w-7">
                      {n}
                    </span>
                    <div>
                      <h4 className="font-cormorant text-piano-cream text-2xl font-light mb-2">
                        {title}
                      </h4>
                      <p className="text-piano-stone text-base leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-piano-gold/10">
                <Link
                  href="/about"
                  className="font-display text-[10px] tracking-[0.35em] uppercase text-piano-gold/45 hover:text-piano-gold transition-colors inline-flex items-center gap-2"
                >
                  Roger's story →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BRANDS — World-class instruments
      ═══════════════════════════════════════════════ */}
      <section className="bg-piano-cream py-36 px-8">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-4">
            <div>
              <span className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold block mb-5">
                The Makers
              </span>
              <h2
                className="font-cormorant font-light text-piano-black leading-tight"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                World-Class Instruments
              </h2>
            </div>
            <p className="text-piano-stone text-base max-w-xs leading-relaxed">
              Ten of the world's finest piano brands — selected for excellence,
              not exclusivity.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-piano-linen border border-piano-linen">
            {BRANDS.map((brand) => (
              <Link
                key={brand.slug}
                href={`/pianos/${brand.slug}`}
                className="group bg-piano-cream p-8 flex flex-col hover:bg-piano-warm-white transition-colors duration-200"
              >
                <div className="flex items-start justify-between mb-5">
                  <p className="font-display text-[9px] tracking-[0.3em] uppercase text-piano-stone leading-loose">
                    {brand.country.split('/')[0]?.trim()}<br />{brand.founded}
                  </p>
                  {brand.prestige === 'Ultra Premium' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-piano-gold shrink-0 mt-1" />
                  )}
                </div>
                <h3 className="font-cormorant text-xl font-light text-piano-black leading-snug group-hover:text-piano-charcoal transition-colors mb-2.5">
                  {brand.name}
                </h3>
                <p className="text-piano-stone text-xs leading-relaxed line-clamp-2 hidden sm:block flex-1">
                  {brand.tagline}
                </p>
                <p className="font-display text-[9px] tracking-[0.3em] uppercase text-piano-gold/0 group-hover:text-piano-gold/55 mt-4 transition-colors">
                  Explore →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          GUIDES — Editorial knowledge section
      ═══════════════════════════════════════════════ */}
      <section className="bg-piano-black py-36 px-8">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-4">
            <div>
              <span className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold block mb-5">
                Expert Knowledge
              </span>
              <h2
                className="font-cormorant font-light text-piano-cream leading-tight"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                Buy With Confidence
              </h2>
            </div>
            <Link
              href="/guides"
              className="group flex items-center gap-2 font-display text-[11px] tracking-[0.3em] uppercase text-piano-stone hover:text-piano-cream transition-colors"
            >
              All guides
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-piano-gold/8">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group bg-piano-charcoal p-10 flex flex-col hover:bg-[hsl(25_5%_12%)] transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="font-display text-[10px] tracking-[0.35em] uppercase text-piano-gold/45 group-hover:text-piano-gold/75 transition-colors">
                    {guide.category}
                  </span>
                  <span className="font-display text-[10px] tracking-wide text-piano-stone">
                    {guide.readTime}
                  </span>
                </div>
                <h3 className="font-cormorant text-[2rem] font-light text-piano-cream leading-snug mb-5 flex-1 group-hover:text-white transition-colors">
                  {guide.title}
                </h3>
                <p className="text-piano-stone text-base leading-relaxed line-clamp-3 mb-8">
                  {guide.description}
                </p>
                <div className="border-t border-piano-gold/10 pt-6">
                  <span className="font-display text-[10px] tracking-[0.3em] uppercase text-piano-gold/25 group-hover:text-piano-gold/65 transition-colors inline-flex items-center gap-2">
                    Read guide
                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </span>
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
        <section className="bg-piano-charcoal py-36 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-px w-10 bg-piano-gold/35 mx-auto mb-16" />
            <blockquote
              className="font-cormorant font-light italic text-piano-cream leading-relaxed mb-14"
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.8rem)' }}
            >
              "{testimonial.quote}"
            </blockquote>
            <div className="flex flex-col items-center gap-2.5">
              <p className="font-display text-[11px] tracking-[0.4em] uppercase text-piano-cream/60">
                {testimonial.name}
              </p>
              <p className="font-display text-[10px] tracking-[0.3em] uppercase text-piano-stone">
                {testimonial.piano} · {testimonial.location}
              </p>
            </div>
            <Link
              href="/testimonials"
              className="inline-block mt-12 font-display text-[10px] tracking-[0.35em] uppercase text-piano-gold/35 hover:text-piano-gold/75 transition-colors"
            >
              More stories →
            </Link>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════ */}
      <section className="bg-piano-cream py-36 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-5 mb-12">
            <div className="h-px w-12 bg-piano-gold/30" />
            <span className="font-display text-[10px] tracking-[0.45em] uppercase text-piano-stone">
              New Hampshire Showroom
            </span>
            <div className="h-px w-12 bg-piano-gold/30" />
          </div>

          <h2
            className="font-cormorant font-light text-piano-black leading-tight mb-8"
            style={{ fontSize: 'clamp(3.5rem, 7vw, 7.5rem)' }}
          >
            Begin Your<br />Search
          </h2>

          <p className="text-piano-stone text-lg leading-relaxed max-w-md mx-auto mb-14">
            Tell us what you're looking for — or come hear the pianos yourself.
            Every conversation starts with listening.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-piano-black text-piano-cream px-12 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-charcoal transition-colors duration-200"
            >
              Contact Roger
            </Link>
            <Link
              href="/pianos"
              className="inline-flex items-center justify-center border border-piano-black/20 text-piano-black px-12 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:border-piano-black hover:bg-piano-black hover:text-piano-cream transition-colors duration-200"
            >
              Browse Inventory
            </Link>
          </div>

          <p className="mt-10 text-base text-piano-stone font-display tracking-wide">
            or call{' '}
            <a href="tel:+16035550123" className="text-piano-black hover:text-piano-gold transition-colors">
              (603) 555-0123
            </a>
          </p>
        </div>
      </section>

    </div>
  )
}
