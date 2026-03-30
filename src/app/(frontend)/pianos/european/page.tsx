import type { Metadata } from 'next'
import Link from 'next/link'
import { InquiryCTA } from '@/components/piano/InquiryCTA'

export const metadata: Metadata = {
  title: 'Handcrafted European Pianos | UsedSteinways.com',
  description:
    'Pre-owned Bösendorfer, C. Bechstein, Blüthner, Petrof, and Schimmel — the great European piano ateliers. Personally selected by Roger.',
}

const C = {
  bg:          'hsl(36, 22%, 96%)',
  darkBg:      'hsl(350, 62%, 26%)',
  accent:      'hsl(40, 72%, 52%)',
  accentFaded: 'rgba(184,138,60,0.18)',
  text:        'hsl(350, 12%, 11%)',
  muted:       'hsl(350, 5%, 46%)',
  border:      'hsl(36, 18%, 89%)',
  borderDark:  'hsl(350, 48%, 40%)',
  ivory:       'hsl(36, 22%, 96%)',
}

const EUROPEAN_BRANDS = [
  {
    slug:    'bosendorfer',
    name:    'Bösendorfer',
    origin:  'Vienna, Austria',
    founded: 1828,
    tagline: "Viennese warmth and singing tone. The Emperor's piano maker.",
    href:    '/pianos/bosendorfer',
  },
  {
    slug:    'bechstein',
    name:    'C. Bechstein',
    origin:  'Berlin, Germany',
    founded: 1853,
    tagline: 'Crystalline clarity. The piano of Debussy, Liszt, and Brahms.',
    href:    '/pianos/bechstein',
  },
  {
    slug:    'bluthner',
    name:    'Blüthner',
    origin:  'Leipzig, Germany',
    founded: 1853,
    tagline: 'Aliquot stringing. A shimmering, uniquely luminous tone.',
    href:    '/pianos/bluthner',
  },
  {
    slug:    'petrof',
    name:    'Petrof',
    origin:  'Hradec Králové, Czech Republic',
    founded: 1864,
    tagline: 'Central European precision. Five generations of family craft.',
    href:    '/pianos/petrof',
  },
  {
    slug:    'schimmel',
    name:    'Schimmel',
    origin:  'Braunschweig, Germany',
    founded: 1885,
    tagline: 'German precision. A century of concert-hall excellence.',
    href:    '/pianos/schimmel',
  },
]

export default function EuropeanPianosPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: C.bg }}>

      {/* Hero */}
      <section className="py-32 px-8" style={{ backgroundColor: C.darkBg }}>
        <div className="max-w-7xl mx-auto">
          <p
            className="font-display text-[11px] tracking-[0.45em] uppercase mb-5"
            style={{ color: C.accent }}
          >
            Vienna · Berlin · Leipzig · Prague · Braunschweig
          </p>
          <h1
            className="font-cormorant font-light text-white mb-6 leading-none max-w-4xl"
            style={{ fontSize: 'clamp(3.6rem, 7vw, 8.5rem)' }}
          >
            Handcrafted<br />European Pianos
          </h1>
          <p
            className="mb-4 max-w-2xl leading-relaxed"
            style={{ color: 'rgba(245,235,220,0.65)', fontSize: '1.125rem' }}
          >
            Five makers. Five distinct voices. A common commitment to hand-craftsmanship
            that has defined European piano-making for over 150 years.
          </p>
          <p
            className="font-display text-sm tracking-wide"
            style={{ color: 'rgba(245,235,220,0.40)' }}
          >
            Every instrument personally selected and inspected by Roger.
          </p>
        </div>
      </section>

      {/* Brand Cards */}
      <section className="py-28 px-8">
        <div className="max-w-7xl mx-auto">
          <p
            className="font-display text-[11px] tracking-[0.45em] uppercase mb-3"
            style={{ color: C.accent }}
          >
            The Makers
          </p>
          <h2
            className="font-cormorant font-light mb-16"
            style={{ fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', color: C.text }}
          >
            Five Ateliers of Excellence
          </h2>

          <div className="border" style={{ borderColor: C.border }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {EUROPEAN_BRANDS.map((brand) => (
                <Link
                  key={brand.slug}
                  href={brand.href}
                  className="group relative flex flex-col p-10 overflow-hidden transition-colors duration-200"
                  style={{
                    borderRight: `1px solid ${C.border}`,
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[3px] transition-all duration-300 ease-out"
                    style={{ backgroundColor: C.accent }}
                  />
                  <p
                    className="font-display text-[9px] tracking-[0.35em] uppercase mb-6 leading-loose"
                    style={{ color: C.muted }}
                  >
                    {brand.origin}<br />Est. {brand.founded}
                  </p>
                  <h3
                    className="font-cormorant font-light mb-4 leading-tight"
                    style={{ fontSize: 'clamp(2rem, 2.5vw, 2.8rem)', color: C.text }}
                  >
                    {brand.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: C.muted }}
                  >
                    {brand.tagline}
                  </p>
                  <p
                    className="font-display text-[9px] tracking-[0.3em] uppercase mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: C.accent }}
                  >
                    View Collection →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Editorial / Quote */}
      <section className="py-28 px-8" style={{ backgroundColor: C.darkBg }}>
        <div className="max-w-3xl mx-auto">
          <div className="h-px w-10 mb-12" style={{ backgroundColor: C.accent }} />
          <blockquote
            className="font-cormorant font-light italic leading-snug mb-10"
            style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.8rem)', color: C.ivory }}
          >
            &ldquo;The great European makers each have a voice as distinct as a great singer.
            Bösendorfer sings. Bechstein speaks with precision. Blüthner shimmers.
            Finding the right one for you requires hearing them all.&rdquo;
          </blockquote>
          <div className="flex items-center gap-5">
            <div
              className="w-10 h-10 flex items-center justify-center shrink-0"
              style={{ border: `1px solid ${C.accent}` }}
            >
              <span className="font-display text-xs font-bold" style={{ color: C.accent }}>R</span>
            </div>
            <div>
              <p className="font-cormorant text-lg font-light" style={{ color: C.ivory }}>Roger</p>
              <p
                className="font-display text-[10px] tracking-[0.35em] uppercase"
                style={{ color: 'rgba(245,235,220,0.40)' }}
              >
                Founder · RPT · 30 Years
              </p>
            </div>
          </div>
        </div>
      </section>

      <InquiryCTA variant="dark" />
    </main>
  )
}
