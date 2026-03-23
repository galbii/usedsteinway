/* eslint-disable react/no-unescaped-entities */
/**
 * UsedSteinways — Variant Design
 * ─────────────────────────────────────────────────────────────
 * Palette: Deep Midnight Indigo + Warm Ivory + Burnished Gold
 *
 * Conceptual direction: A concert hall at night. Warm ivory base
 * sections (like candlelit programme notes) against deep indigo
 * darks (like velvet seats and stage shadow). Burnished gold accent
 * carries the heat — more vibrant and present than the original brass.
 *
 * The warm-cool tension between ivory and indigo creates visual energy
 * that the original warm-on-warm palette doesn't have. Indigo reads
 * as prestigious, modern, serious — Christie's or a Tiffany box.
 *
 * Design twists:
 *   Hero        → diagonal slash between panels
 *   Ticker      → deep indigo bar — first palette reveal
 *   Instruments → shadow cards with 4px gold top border, hover lift
 *   Philosophy  → full-bleed piano-keys image, indigo overlay
 *   Brands      → left gold accent bar animates in on hover
 *   Guides      → ivory cards floating on deep indigo bg
 *   Testimonial → burnished gold section bg — palette inversion
 *   CTA         → warm ivory, same typographic gravity
 * ─────────────────────────────────────────────────────────────
 */
import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedPianos, BRANDS, GUIDES, TESTIMONIALS } from '@/lib/piano-data'

const C = {
  bg:          'hsl(36, 22%, 96%)',
  darkBg:      'hsl(350, 45%, 9%)',
  darkCard:    'hsl(350, 40%, 12%)',
  accent:      'hsl(40, 72%, 52%)',
  accentLight: 'hsl(40, 65%, 88%)',
  accentMid:   'hsl(40, 58%, 68%)',
  accentFaded: 'hsl(40, 72%, 52%, 0.28)',
  text:        'hsl(350, 12%, 11%)',
  muted:       'hsl(350, 5%, 46%)',
  border:      'hsl(36, 18%, 89%)',
  borderDark:  'hsl(350, 30%, 18%)',
  hover:       'hsl(350, 8%, 93%)',
  ivory:       'hsl(36, 22%, 96%)',
}

export function UsedSteinwaysVariantPage() {
  const featured = getFeaturedPianos().slice(0, 3)
  const featuredGuides = GUIDES.slice(0, 3)
  const testimonial = TESTIMONIALS[0]

  return (
    <div style={{ backgroundColor: C.bg }}>

      {/* ═══════════════════════════════════════════════
          HERO — Diagonal slash split
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">

        {/* Left: Warm ivory panel */}
        <div
          className="relative z-10 flex flex-col justify-center px-10 md:px-16 xl:px-24 py-32 lg:py-0 lg:w-[46%] xl:w-[44%]"
          style={{ backgroundColor: C.bg }}
        >
          {/* Overline */}
          <div
            className="flex items-center gap-3 mb-10 animate-fade-up"
            style={{ animationDelay: '0.05s', opacity: 0 }}
          >
            <div className="h-px w-8" style={{ backgroundColor: C.accent }} />
            <span
              className="font-display text-[11px] tracking-[0.45em] uppercase"
              style={{ color: C.muted }}
            >
              New Hampshire · Est. 1993
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-cormorant leading-[1.03] mb-10 animate-fade-up"
            style={{
              fontSize: 'clamp(3.6rem, 7vw, 8.5rem)',
              animationDelay: '0.15s',
              opacity: 0,
              color: C.text,
            }}
          >
            The world's finest<br />
            <em className="italic" style={{ color: C.accent }}>pre-owned</em> pianos,<br />
            personally chosen.
          </h1>

          {/* Body */}
          <p
            className="text-lg leading-relaxed max-w-md mb-12 font-light animate-fade-up"
            style={{ animationDelay: '0.25s', opacity: 0, color: C.muted }}
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
              className="inline-flex items-center justify-center px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase transition-opacity duration-200 hover:opacity-80"
              style={{ backgroundColor: C.text, color: C.bg }}
            >
              Browse Collection
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase transition-colors duration-200 hover:opacity-80"
              style={{ border: `1px solid ${C.border}`, color: C.text }}
            >
              Talk to Roger
            </Link>
          </div>

          {/* Stats */}
          <div
            className="flex gap-12 mt-16 pt-10 animate-fade-up"
            style={{ animationDelay: '0.45s', opacity: 0, borderTop: `1px solid ${C.border}` }}
          >
            {[
              { n: '30+', l: 'Years' },
              { n: '25',  l: 'Instruments' },
              { n: '10',  l: 'Brands' },
            ].map(({ n, l }) => (
              <div key={l}>
                <p
                  className="font-cormorant font-light leading-none"
                  style={{ fontSize: 'clamp(2.8rem, 4vw, 4rem)', color: C.text }}
                >
                  {n}
                </p>
                <p
                  className="font-display text-[10px] tracking-[0.35em] uppercase mt-2"
                  style={{ color: C.muted }}
                >
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Diagonal slash — skewed gradient that bleeds the panel edge */}
        <div
          className="hidden lg:block absolute z-20 pointer-events-none"
          style={{
            left: 'calc(46% - 56px)',
            top: 0,
            bottom: 0,
            width: '112px',
            background: `linear-gradient(to right, ${C.bg} 0%, ${C.bg} 40%, transparent 100%)`,
            transform: 'skewX(-1.5deg)',
            transformOrigin: 'top left',
          }}
        />

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
          {/* Indigo-tinted overlay */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{ backgroundColor: 'hsl(350, 45%, 9%, 0.18)' }}
          />
          <div
            className="absolute inset-0 lg:hidden"
            style={{ backgroundColor: 'hsl(350, 45%, 9%, 0.58)' }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TICKER — First indigo reveal
      ═══════════════════════════════════════════════ */}
      <div
        className="h-12 flex items-center overflow-hidden"
        style={{
          backgroundColor: C.darkBg,
          borderTop:    `1px solid ${C.borderDark}`,
          borderBottom: `1px solid ${C.borderDark}`,
        }}
      >
        <div className="flex items-center animate-ticker whitespace-nowrap">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center shrink-0">
              {BRANDS.map((brand) => (
                <span key={brand.slug} className="flex items-center">
                  <span
                    className="font-display text-[10px] tracking-[0.45em] uppercase px-8"
                    style={{ color: 'hsl(36, 22%, 96%, 0.28)' }}
                  >
                    {brand.name}
                  </span>
                  <span style={{ color: C.accentFaded, fontSize: '0.75rem' }}>·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          FEATURED INSTRUMENTS — Shadow cards, gold top border
      ═══════════════════════════════════════════════ */}
      <section className="py-36 px-8" style={{ backgroundColor: C.bg }}>
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-4">
            <div>
              <span
                className="font-display text-[11px] tracking-[0.45em] uppercase block mb-5"
                style={{ color: C.accent }}
              >
                Hand-Selected
              </span>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)', color: C.text }}
              >
                Featured Instruments
              </h2>
            </div>
            <Link
              href="/pianos"
              className="group flex items-center gap-2 font-display text-[11px] tracking-[0.3em] uppercase transition-colors"
              style={{ color: C.muted }}
            >
              View all 25 pianos
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((piano) => (
              <Link
                key={piano.id}
                href={`/pianos/${piano.slug}`}
                className="group block overflow-hidden transition-all duration-500 hover:-translate-y-1.5"
                style={{
                  backgroundColor: '#fff',
                  borderTop: `4px solid ${C.accent}`,
                  boxShadow: '0 4px 28px hsl(350 35% 9% / 0.09), 0 1px 4px hsl(350 35% 9% / 0.06)',
                }}
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden"
                  style={{ backgroundColor: C.darkBg }}
                >
                  {piano.imageUrls[0] && (
                    <Image
                      src={piano.imageUrls[0]}
                      alt={piano.title}
                      fill
                      className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  {piano.isFeatured && (
                    <div className="absolute top-5 left-5">
                      <span
                        className="font-display text-[9px] tracking-[0.35em] uppercase px-3.5 py-2"
                        style={{ backgroundColor: C.accent, color: C.darkBg }}
                      >
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-9" style={{ borderTop: `1px solid ${C.border}` }}>
                  <p
                    className="font-display text-[10px] tracking-[0.4em] uppercase mb-4"
                    style={{ color: C.accent }}
                  >
                    {piano.brand} · {piano.year}
                  </p>
                  <h3
                    className="font-cormorant text-4xl font-light leading-snug mb-3"
                    style={{ color: C.text }}
                  >
                    {piano.model}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-7"
                    style={{ color: C.muted }}
                  >
                    {piano.finish} · {piano.size}
                  </p>
                  <div
                    className="flex items-center justify-between pt-6"
                    style={{ borderTop: `1px solid ${C.border}` }}
                  >
                    <span
                      className="font-cormorant text-2xl font-light"
                      style={{ color: C.text }}
                    >
                      {piano.priceDisplay}
                    </span>
                    <span
                      className="font-display text-[10px] tracking-[0.3em] uppercase inline-flex items-center gap-2"
                      style={{ color: C.muted }}
                    >
                      View
                      <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PHILOSOPHY — Full-bleed piano-keys image, indigo overlay
      ═══════════════════════════════════════════════ */}
      <section
        className="relative py-36 px-8"
        style={{ backgroundColor: C.darkBg }}
      >
        {/* Background: piano keys photograph */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1481091838234-b2c303aaea5c?w=1800&q=80"
            alt="Piano keys"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Deep indigo overlay — lets just enough image bleed through */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'hsl(350, 45%, 9%, 0.91)' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1px_1fr] items-start">

            {/* Left: Quote */}
            <div className="lg:pr-20 pb-16 lg:pb-0">
              <div className="h-px w-10 mb-14" style={{ backgroundColor: C.accent }} />
              <blockquote
                className="font-cormorant font-light italic leading-snug mb-12"
                style={{
                  fontSize: 'clamp(1.8rem, 2.8vw, 2.8rem)',
                  color: C.ivory,
                }}
              >
                "We're not married to any manufacturer. We select the finest
                instruments regardless of nameplate — the only criterion is
                excellence."
              </blockquote>
              <div className="flex items-center gap-5">
                <div
                  className="w-11 h-11 flex items-center justify-center shrink-0"
                  style={{ border: `1px solid ${C.accentMid}` }}
                >
                  <span
                    className="font-display text-xs font-bold"
                    style={{ color: C.accent }}
                  >
                    R
                  </span>
                </div>
                <div>
                  <p
                    className="font-cormorant text-xl font-light leading-none mb-1.5"
                    style={{ color: C.ivory }}
                  >
                    Roger
                  </p>
                  <p
                    className="font-display text-[10px] tracking-[0.35em] uppercase"
                    style={{ color: C.muted }}
                  >
                    Founder · RPT · 30 Years
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div
              className="hidden lg:block w-px self-stretch mx-14"
              style={{ backgroundColor: C.borderDark }}
            />

            {/* Right: Pillars */}
            <div
              className="lg:pl-20 pt-16 lg:pt-0 border-t lg:border-0"
              style={{ borderColor: C.borderDark }}
            >
              <span
                className="font-display text-[11px] tracking-[0.45em] uppercase block mb-10"
                style={{ color: C.accent }}
              >
                The Difference
              </span>
              <h3
                className="font-cormorant font-light mb-14 leading-snug"
                style={{
                  fontSize: 'clamp(2.2rem, 3.5vw, 3.4rem)',
                  color: C.ivory,
                }}
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
                    <span
                      className="font-display text-[10px] tracking-widest pt-0.5 shrink-0 w-7"
                      style={{ color: 'hsl(40, 72%, 52%, 0.30)' }}
                    >
                      {n}
                    </span>
                    <div>
                      <h4
                        className="font-cormorant text-2xl font-light mb-2"
                        style={{ color: C.ivory }}
                      >
                        {title}
                      </h4>
                      <p
                        className="text-base leading-relaxed"
                        style={{ color: C.muted }}
                      >
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="mt-12 pt-8"
                style={{ borderTop: `1px solid ${C.borderDark}` }}
              >
                <Link
                  href="/about"
                  className="font-display text-[10px] tracking-[0.35em] uppercase transition-opacity hover:opacity-100 inline-flex items-center gap-2"
                  style={{ color: C.accentFaded }}
                >
                  Roger's story →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BRANDS — Left gold accent bar animates on hover
      ═══════════════════════════════════════════════ */}
      <section className="py-36 px-8" style={{ backgroundColor: C.bg }}>
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-4">
            <div>
              <span
                className="font-display text-[11px] tracking-[0.45em] uppercase block mb-5"
                style={{ color: C.accent }}
              >
                The Makers
              </span>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)', color: C.text }}
              >
                World-Class Instruments
              </h2>
            </div>
            <p
              className="text-base max-w-xs leading-relaxed"
              style={{ color: C.muted }}
            >
              Ten of the world's finest piano brands — selected for excellence,
              not exclusivity.
            </p>
          </div>

          <div className="border" style={{ borderColor: C.border }}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {BRANDS.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/pianos/${brand.slug}`}
                  className="group p-8 flex flex-col relative overflow-hidden transition-colors duration-200"
                  style={{
                    borderRight:  `1px solid ${C.border}`,
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  {/* Left accent bar — animates from 0 width on hover */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[3px] transition-all duration-300 ease-out"
                    style={{ backgroundColor: C.accent }}
                  />
                  <div className="flex items-start justify-between mb-5">
                    <p
                      className="font-display text-[9px] tracking-[0.3em] uppercase leading-loose"
                      style={{ color: C.muted }}
                    >
                      {brand.country.split('/')[0]?.trim()}<br />{brand.founded}
                    </p>
                    {brand.prestige === 'Ultra Premium' && (
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0 mt-1"
                        style={{ backgroundColor: C.accent }}
                      />
                    )}
                  </div>
                  <h3
                    className="font-cormorant text-xl font-light leading-snug mb-2.5"
                    style={{ color: C.text }}
                  >
                    {brand.name}
                  </h3>
                  <p
                    className="text-xs leading-relaxed line-clamp-2 hidden sm:block flex-1"
                    style={{ color: C.muted }}
                  >
                    {brand.tagline}
                  </p>
                  <p
                    className="font-display text-[9px] tracking-[0.3em] uppercase mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: C.accent }}
                  >
                    Explore →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          GUIDES — Ivory cards floating on deep indigo
      ═══════════════════════════════════════════════ */}
      <section className="py-36 px-8" style={{ backgroundColor: C.darkBg }}>
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-4">
            <div>
              <span
                className="font-display text-[11px] tracking-[0.45em] uppercase block mb-5"
                style={{ color: C.accent }}
              >
                Expert Knowledge
              </span>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)', color: C.ivory }}
              >
                Buy With Confidence
              </h2>
            </div>
            <Link
              href="/guides"
              className="group flex items-center gap-2 font-display text-[11px] tracking-[0.3em] uppercase transition-colors"
              style={{ color: C.muted }}
            >
              All guides
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>

          {/* Ivory cards — cool indigo shadow creates depth against dark bg */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group flex flex-col p-10 transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: C.bg,
                  border: `1px solid ${C.border}`,
                  boxShadow: '0 2px 20px hsl(350 45% 9% / 0.35)',
                }}
              >
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="font-display text-[10px] tracking-[0.35em] uppercase"
                    style={{ color: C.accentMid }}
                  >
                    {guide.category}
                  </span>
                  <span
                    className="font-display text-[10px] tracking-wide"
                    style={{ color: C.muted }}
                  >
                    {guide.readTime}
                  </span>
                </div>
                <h3
                  className="font-cormorant text-[2rem] font-light leading-snug mb-5 flex-1"
                  style={{ color: C.text }}
                >
                  {guide.title}
                </h3>
                <p
                  className="text-base leading-relaxed line-clamp-3 mb-8"
                  style={{ color: C.muted }}
                >
                  {guide.description}
                </p>
                <div
                  className="pt-6"
                  style={{ borderTop: `1px solid ${C.border}` }}
                >
                  <span
                    className="font-display text-[10px] tracking-[0.3em] uppercase inline-flex items-center gap-2 transition-opacity group-hover:opacity-80"
                    style={{ color: C.accentFaded }}
                  >
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
          TESTIMONIAL — Burnished gold section — palette inversion
          Deep indigo text on warm gold: maximum contrast, most
          striking moment on the page.
      ═══════════════════════════════════════════════ */}
      {testimonial && (
        <section className="py-36 px-8" style={{ backgroundColor: C.accent }}>
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="h-px w-10 mx-auto mb-16"
              style={{ backgroundColor: 'hsl(350, 12%, 11%, 0.20)' }}
            />
            <blockquote
              className="font-cormorant font-light italic leading-relaxed mb-14"
              style={{
                fontSize: 'clamp(1.7rem, 3vw, 2.8rem)',
                color: C.darkBg,
              }}
            >
              "{testimonial.quote}"
            </blockquote>
            <div className="flex flex-col items-center gap-2.5">
              <p
                className="font-display text-[11px] tracking-[0.4em] uppercase"
                style={{ color: 'hsl(350, 12%, 11%, 0.60)' }}
              >
                {testimonial.name}
              </p>
              <p
                className="font-display text-[10px] tracking-[0.3em] uppercase"
                style={{ color: 'hsl(350, 12%, 11%, 0.42)' }}
              >
                {testimonial.piano} · {testimonial.location}
              </p>
            </div>
            <Link
              href="/testimonials"
              className="inline-block mt-12 font-display text-[10px] tracking-[0.35em] uppercase transition-opacity hover:opacity-70"
              style={{ color: 'hsl(350, 12%, 11%, 0.38)' }}
            >
              More stories →
            </Link>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════ */}
      <section className="py-36 px-8" style={{ backgroundColor: C.bg }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-5 mb-12">
            <div className="h-px w-12" style={{ backgroundColor: 'hsl(40, 72%, 52%, 0.45)' }} />
            <span
              className="font-display text-[10px] tracking-[0.45em] uppercase"
              style={{ color: C.muted }}
            >
              New Hampshire Showroom
            </span>
            <div className="h-px w-12" style={{ backgroundColor: 'hsl(40, 72%, 52%, 0.45)' }} />
          </div>

          <h2
            className="font-cormorant font-light leading-tight mb-8"
            style={{ fontSize: 'clamp(3.5rem, 7vw, 7.5rem)', color: C.text }}
          >
            Begin Your<br />Search
          </h2>

          <p
            className="text-lg leading-relaxed max-w-md mx-auto mb-14"
            style={{ color: C.muted }}
          >
            Tell us what you're looking for — or come hear the pianos yourself.
            Every conversation starts with listening.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-12 py-4 font-display text-[11px] tracking-[0.3em] uppercase transition-opacity duration-200 hover:opacity-80"
              style={{ backgroundColor: C.text, color: C.bg }}
            >
              Contact Roger
            </Link>
            <Link
              href="/pianos"
              className="inline-flex items-center justify-center px-12 py-4 font-display text-[11px] tracking-[0.3em] uppercase transition-opacity duration-200 hover:opacity-70"
              style={{ border: `1px solid ${C.border}`, color: C.text }}
            >
              Browse Inventory
            </Link>
          </div>

          <p
            className="mt-10 text-base font-display tracking-wide"
            style={{ color: C.muted }}
          >
            or call{' '}
            <a
              href="tel:+16035550123"
              className="transition-colors hover:opacity-80"
              style={{ color: C.text }}
            >
              (603) 555-0123
            </a>
          </p>
        </div>
      </section>

    </div>
  )
}
