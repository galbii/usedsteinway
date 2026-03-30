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
import { getFeaturedPianos, BRANDS, CATEGORIES, GUIDES, TESTIMONIALS } from '@/lib/piano-data'
import { FeaturedCarousel } from './FeaturedCarousel'

const C = {
  bg:          'hsl(36, 22%, 96%)',
  darkBg:      'hsl(350, 62%, 26%)',
  darkCard:    'hsl(350, 56%, 32%)',
  accent:      'hsl(40, 72%, 52%)',
  accentLight: 'hsl(40, 65%, 88%)',
  accentMid:   'hsl(40, 58%, 68%)',
  accentFaded: 'hsl(40, 72%, 52%, 0.28)',
  text:        'hsl(350, 12%, 11%)',
  muted:       'hsl(350, 5%, 46%)',
  border:      'hsl(36, 18%, 89%)',
  borderDark:  'hsl(350, 48%, 40%)',
  hover:       'hsl(350, 8%, 93%)',
  ivory:       'hsl(36, 22%, 96%)',
}

export function UsedSteinwaysVariantPage() {
  const featured = getFeaturedPianos()
  const featuredGuides = GUIDES.slice(0, 3)
  const testimonial = TESTIMONIALS[0]

  return (
    <div style={{ backgroundColor: C.bg }}>

      {/* ═══════════════════════════════════════════════
          HERO — Solid ivory panel left, photo right
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Photo — full bleed, shows through on right */}
        <div className="absolute inset-0">
          <Image
            src="/Roger-at-work-2-for-web.jpg"
            alt="Roger evaluating a piano in the showroom"
            fill
            priority
            className="object-cover object-[62%_center]"
            sizes="100vw"
          />
        </div>

        {/* Desktop: solid ivory panel — widened for larger wordmark */}
        <div
          className="absolute inset-y-0 left-0 hidden lg:block"
          style={{
            width: 'calc(54% + 1px)',
            backgroundColor: C.bg,
          }}
        />

        {/* Desktop: feather at panel edge */}
        <div
          className="absolute inset-y-0 hidden lg:block"
          style={{
            left: '54%',
            width: '80px',
            background: `linear-gradient(to right, ${C.bg}, transparent)`,
          }}
        />

        {/* Mobile: ivory fade downward — text reads on top, photo shows below */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background: `linear-gradient(to bottom, ${C.bg} 0%, ${C.bg} 52%, transparent 78%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-14 xl:px-20 py-28 lg:py-0">
          <div className="max-w-[560px] lg:max-w-[500px]">

            {/* Overline */}
            <div
              className="flex items-center gap-4 mb-12 animate-fade-up"
              style={{ animationDelay: '0.05s', opacity: 0 }}
            >
              <div className="h-px w-8" style={{ backgroundColor: C.accent }} />
              <span
                className="font-display text-[11px] tracking-[0.5em] uppercase"
                style={{ color: C.muted }}
              >
                New Hampshire · Est. 1993
              </span>
            </div>

            {/* Wordmark — "Used Steinways" as the logo */}
            <h1
              className="font-cormorant font-light leading-[0.95] mb-10 animate-fade-up"
              style={{ animationDelay: '0.14s', opacity: 0 }}
            >
              <span
                className="block italic"
                style={{ fontSize: 'clamp(2.2rem, 3.5vw, 4rem)', color: C.accent }}
              >
                Used
              </span>
              <span
                className="block"
                style={{ fontSize: 'clamp(4rem, 7vw, 9rem)', color: C.text, letterSpacing: '-0.01em' }}
              >
                Steinways
              </span>
            </h1>

            {/* Tagline */}
            <p
              className="text-base leading-[1.8] mb-12 animate-fade-up"
              style={{
                animationDelay: '0.24s',
                opacity: 0,
                color: C.muted,
                maxWidth: '34ch',
              }}
            >
              Every instrument personally evaluated by Roger —
              a Registered Piano Technician with thirty years of experience.
            </p>

            {/* CTAs */}
            <div
              className="flex items-center gap-8 animate-fade-up"
              style={{ animationDelay: '0.32s', opacity: 0 }}
            >
              <Link
                href="/pianos"
                className="inline-flex items-center justify-center px-10 py-4 font-display text-[11px] tracking-[0.35em] uppercase transition-opacity duration-200 hover:opacity-75"
                style={{ backgroundColor: C.text, color: C.bg }}
              >
                Browse Collection
              </Link>
              <Link
                href="/contact"
                className="group font-display text-[11px] tracking-[0.35em] uppercase inline-flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-50"
                style={{ color: C.muted }}
              >
                Talk to Roger
                <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
              </Link>
            </div>

            {/* Stats */}
            <div
              className="flex items-start mt-16 pt-10 animate-fade-up"
              style={{ animationDelay: '0.42s', opacity: 0, borderTop: `1px solid ${C.border}` }}
            >
              {[
                { n: '30+', l: 'Years' },
                { n: '25',  l: 'Instruments' },
                { n: '10',  l: 'Brands' },
              ].map(({ n, l }, i) => (
                <div key={l} className="flex items-stretch">
                  {i > 0 && (
                    <div
                      className="w-px mx-10 self-stretch"
                      style={{ backgroundColor: C.border }}
                    />
                  )}
                  <div>
                    <p
                      className="font-cormorant font-light leading-none"
                      style={{ fontSize: 'clamp(2rem, 2.8vw, 3rem)', color: C.text }}
                    >
                      {n}
                    </p>
                    <p
                      className="font-display text-[10px] tracking-[0.4em] uppercase mt-2"
                      style={{ color: C.muted }}
                    >
                      {l}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
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
              {['Steinway & Sons', '·', 'Handcrafted European Pianos', '·', 'Bösendorfer', '·', 'C. Bechstein', '·', 'Blüthner', '·', 'Petrof', '·', 'Schimmel', '·', 'Shigeru Kawai'].map((item, idx) => (
                <span key={idx} className="flex items-center">
                  <span
                    className="font-display text-[10px] tracking-[0.45em] uppercase px-8"
                    style={{ color: 'rgba(245, 235, 220, 0.28)' }}
                  >
                    {item}
                  </span>
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

          <FeaturedCarousel pianos={featured} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PHILOSOPHY — Full-bleed piano-keys image, indigo overlay
      ═══════════════════════════════════════════════ */}
      <section
        className="relative py-36 px-8"
        style={{ backgroundColor: C.darkBg }}
      >
        {/* Background: Roger working in the showroom */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/Roger-at-work-2-for-web.jpg"
            alt="Roger evaluating a piano in the showroom"
            fill
            className="object-cover object-[center_30%]"
            sizes="100vw"
          />
          {/* Heavy overlay — image serves as texture/atmosphere, text stays legible */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'hsl(350, 62%, 26%, 0.88)' }}
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
          CATEGORIES — Three editorial pillars
      ═══════════════════════════════════════════════ */}
      <section className="py-36 px-8" style={{ backgroundColor: C.bg }}>
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-4">
            <div>
              <span
                className="font-display text-[11px] tracking-[0.45em] uppercase block mb-5"
                style={{ color: C.accent }}
              >
                The Collection
              </span>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)', color: C.text }}
              >
                Three Traditions.<br />One Standard.
              </h2>
            </div>
            <p
              className="text-base max-w-xs leading-relaxed"
              style={{ color: C.muted }}
            >
              Every instrument personally selected — regardless of nameplate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border" style={{ borderColor: C.border }}>

            {/* Steinway */}
            <Link
              href="/pianos/steinway"
              className="group relative flex flex-col p-12 overflow-hidden transition-colors duration-300"
              style={{ borderRight: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[3px] transition-all duration-300 ease-out"
                style={{ backgroundColor: C.accent }}
              />
              <p
                className="font-display text-[9px] tracking-[0.4em] uppercase mb-6"
                style={{ color: C.muted }}
              >
                Hamburg · Est. 1853
              </p>
              <h3
                className="font-cormorant font-light mb-5 leading-tight"
                style={{ fontSize: 'clamp(2.2rem, 3vw, 3.2rem)', color: C.text }}
              >
                Steinway<br />&amp; Sons
              </h3>
              <p
                className="text-sm leading-relaxed mb-8 flex-1"
                style={{ color: C.muted }}
              >
                The standard by which all concert grands are measured. We carry Models S through D — the full Hamburg and New York range.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  {['Model B', 'Model D', 'Model M', 'Model S'].map((m) => (
                    <span
                      key={m}
                      className="font-display text-[9px] tracking-[0.2em] uppercase px-2 py-1"
                      style={{ backgroundColor: `${C.accent}10`, color: C.accent }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              <p
                className="font-display text-[10px] tracking-[0.3em] uppercase mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: C.accent }}
              >
                Explore →
              </p>
            </Link>

            {/* Handcrafted European */}
            <Link
              href="/pianos/european"
              className="group relative flex flex-col p-12 overflow-hidden transition-colors duration-300"
              style={{ borderRight: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, backgroundColor: C.darkBg }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[3px] transition-all duration-300 ease-out"
                style={{ backgroundColor: C.accent }}
              />
              <p
                className="font-display text-[9px] tracking-[0.4em] uppercase mb-6"
                style={{ color: 'rgba(245,235,220,0.35)' }}
              >
                Vienna · Berlin · Leipzig · Hradec Králové
              </p>
              <h3
                className="font-cormorant font-light mb-5 leading-tight"
                style={{ fontSize: 'clamp(2.2rem, 3vw, 3.2rem)', color: C.ivory }}
              >
                Handcrafted<br />European Pianos
              </h3>
              <p
                className="text-sm leading-relaxed mb-8 flex-1"
                style={{ color: 'rgba(245,235,220,0.50)' }}
              >
                The great ateliers of Europe. Each maker with a distinct voice — from Bösendorfer's Viennese warmth to Bechstein's crystalline clarity.
              </p>
              <div className="flex gap-2 flex-wrap">
                {['Bösendorfer', 'C. Bechstein', 'Blüthner', 'Petrof', 'Schimmel'].map((b) => (
                  <span
                    key={b}
                    className="font-display text-[9px] tracking-[0.15em] uppercase px-2 py-1"
                    style={{ border: `1px solid rgba(245,235,220,0.15)`, color: 'rgba(245,235,220,0.45)' }}
                  >
                    {b}
                  </span>
                ))}
              </div>
              <p
                className="font-display text-[10px] tracking-[0.3em] uppercase mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: C.accent }}
              >
                Explore →
              </p>
            </Link>

            {/* Shigeru Kawai */}
            <Link
              href="/pianos/shigeru-kawai"
              className="group relative flex flex-col p-12 overflow-hidden transition-colors duration-300"
              style={{ borderBottom: `1px solid ${C.border}` }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[3px] transition-all duration-300 ease-out"
                style={{ backgroundColor: C.accent }}
              />
              <p
                className="font-display text-[9px] tracking-[0.4em] uppercase mb-6"
                style={{ color: C.muted }}
              >
                Hamamatsu, Japan · Est. 1927
              </p>
              <h3
                className="font-cormorant font-light mb-5 leading-tight"
                style={{ fontSize: 'clamp(2.2rem, 3vw, 3.2rem)', color: C.text }}
              >
                Shigeru<br />Kawai
              </h3>
              <p
                className="text-sm leading-relaxed mb-8 flex-1"
                style={{ color: C.muted }}
              >
                Japan's finest concert instrument. A revelatory alternative to European grands — world-class tone at a fraction of the price.
              </p>
              <div className="flex gap-2 flex-wrap">
                {['SK-2', 'SK-3', 'SK-5', 'SK-6', 'SK-7'].map((m) => (
                  <span
                    key={m}
                    className="font-display text-[9px] tracking-[0.2em] uppercase px-2 py-1"
                    style={{ backgroundColor: `${C.accent}10`, color: C.accent }}
                  >
                    {m}
                  </span>
                ))}
              </div>
              <p
                className="font-display text-[10px] tracking-[0.3em] uppercase mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: C.accent }}
              >
                Explore →
              </p>
            </Link>

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
                  boxShadow: '0 2px 20px hsl(350 62% 26% / 0.45)',
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
        <section
          className="relative py-32 px-8 overflow-hidden"
          style={{ backgroundColor: C.accent }}
        >
          {/* Large decorative opening quote — structural atmosphere */}
          <div
            className="absolute select-none pointer-events-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(18rem, 30vw, 28rem)',
              lineHeight: 1,
              color: 'hsl(350, 62%, 26%, 0.07)',
              top: '-2rem',
              left: '-1rem',
              fontStyle: 'italic',
              fontWeight: 300,
            }}
          >
            &ldquo;
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Top rule + label */}
            <div className="flex items-center gap-5 mb-16">
              <div className="h-px flex-1 max-w-[3rem]" style={{ backgroundColor: 'hsl(350, 62%, 26%, 0.35)' }} />
              <span
                className="font-display text-[12px] tracking-[0.42em] uppercase"
                style={{ color: 'hsl(350, 62%, 26%, 0.70)' }}
              >
                Client Story
              </span>
            </div>

            {/* Quote */}
            <blockquote
              className="font-cormorant font-light italic leading-[1.25] mb-16"
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 3.4rem)',
                color: 'hsl(350, 62%, 14%)',
                maxWidth: '52rem',
              }}
            >
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {/* Attribution + CTA row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-10">

              {/* Attribution */}
              <div className="flex items-center gap-5">
                {/* Small monogram mark */}
                <div
                  className="w-11 h-11 flex items-center justify-center shrink-0"
                  style={{
                    border: '1px solid hsl(350, 62%, 26%, 0.35)',
                  }}
                >
                  <span
                    className="font-cormorant text-xl font-light"
                    style={{ color: 'hsl(350, 62%, 26%, 0.70)' }}
                  >
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p
                    className="font-display text-[13px] tracking-[0.38em] uppercase mb-2"
                    style={{ color: 'hsl(350, 12%, 11%, 0.85)' }}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    className="font-display text-[12px] tracking-[0.26em] uppercase"
                    style={{ color: 'hsl(350, 12%, 11%, 0.58)' }}
                  >
                    {testimonial.piano} · {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Black CTA button */}
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-3 px-9 py-4 font-display text-[12px] tracking-[0.35em] uppercase transition-opacity duration-200 hover:opacity-80 shrink-0"
                style={{
                  backgroundColor: 'hsl(350, 12%, 11%)',
                  color: '#ffffff',
                }}
              >
                More Stories
                <span className="text-xs">→</span>
              </Link>
            </div>
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
