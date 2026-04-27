import type { Metadata } from 'next'
import Link from 'next/link'
import { BRANDS } from '@/lib/piano-data'
import { InquiryCTA } from '@/components/piano/InquiryCTA'
import { FeaturedCarousel } from '@/components/piano/FeaturedCarousel'
import { queryPianosByCategory } from '@/lib/payload/pianos'

export const metadata: Metadata = {
  title: 'Handcrafted European Pianos For Sale | UsedSteinways.com',
  description:
    'Pre-owned Bösendorfer, C. Bechstein, Blüthner, Petrof, and Schimmel — the great European piano ateliers. Personally selected by Roger.',
}

const C = {
  bg:          'hsl(36, 22%, 96%)',
  darkBg:      'hsl(350, 62%, 26%)',
  accent:      'hsl(40, 72%, 52%)',
  accentFaded: 'rgba(184,138,60,0.14)',
  text:        'hsl(350, 12%, 11%)',
  muted:       'hsl(350, 5%, 46%)',
  border:      'hsl(36, 18%, 89%)',
  borderDark:  'hsl(350, 48%, 40%)',
  ivory:       'hsl(36, 22%, 96%)',
}

const EUROPEAN_BRANDS = BRANDS.filter(
  (b) => b.category !== 'steinway' && b.category !== 'shigeru-kawai',
)

const BRAND_HREF: Record<string, string> = {
  bosendorfer: '/pianos/bosendorfer',
  bechstein:   '/pianos/bechstein',
  bluthner:    '/pianos/bluthner',
  petrof:      '/pianos/petrof',
  schimmel:    '/pianos/schimmel',
  kayserburg:  '/pianos/kayserburg',
  yamaha:      '/pianos/yamaha',
  'wendl-lung': '/pianos/wendl-lung',
  brodmann:    '/pianos/brodmann',
}

export default async function EuropeanPianosPage() {
  const pianos = await queryPianosByCategory('european')
  return (
    <main className="min-h-screen" style={{ backgroundColor: C.bg }}>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="py-32 px-8" style={{ backgroundColor: C.darkBg }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-5 mb-14">
            <div className="h-px w-12 shrink-0" style={{ backgroundColor: C.accent }} />
            <span
              className="font-display text-[10px] tracking-[0.55em] uppercase"
              style={{ color: C.accent }}
            >
              The Collection
            </span>
          </div>
          <h1
            className="font-cormorant font-light leading-[0.88] mb-8 max-w-5xl"
            style={{ fontSize: 'clamp(3.6rem, 8vw, 9rem)', color: C.ivory, letterSpacing: '-0.01em' }}
          >
            Handcrafted<br />European Pianos
          </h1>
          <div
            className="h-px w-full max-w-7xl mb-10"
            style={{ backgroundColor: 'rgba(245,235,220,0.08)' }}
          />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 max-w-5xl">
            <p
              className="leading-relaxed max-w-[46ch]"
              style={{ color: 'rgba(245,235,220,0.60)', fontSize: '1.125rem' }}
            >
              Five makers. Five distinct voices. A common commitment to hand-craftsmanship
              that has defined piano-making for over 150 years.
            </p>
            <p
              className="font-display text-[9px] tracking-[0.35em] uppercase shrink-0"
              style={{ color: 'rgba(245,235,220,0.30)' }}
            >
              Every instrument personally selected by Roger
            </p>
          </div>
        </div>
      </section>

      {/* ── Current Inventory ────────────────────────── */}
      {pianos.length > 0 && (
        <section className="py-20 px-8" style={{ backgroundColor: C.bg }}>
          <div className="max-w-7xl mx-auto mb-12">
            <span
              className="font-display text-[11px] tracking-[0.45em] uppercase block mb-5"
              style={{ color: C.accent }}
            >
              Available Now
            </span>
            <div className="flex items-end justify-between gap-4">
              <h2
                className="font-cormorant font-light leading-tight"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)', color: C.text }}
              >
                European Collection
              </h2>
              <p
                className="font-display text-[11px] tracking-[0.3em] uppercase pb-2"
                style={{ color: C.muted }}
              >
                {pianos.length} instrument{pianos.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <FeaturedCarousel pianos={pianos} />
        </section>
      )}

      {/* ── Brand Rows ───────────────────────────────── */}
      <section style={{ backgroundColor: C.bg }}>
        {EUROPEAN_BRANDS.map((brand) => {
          const href = BRAND_HREF[brand.slug] ?? `/pianos/${brand.slug}`
          return (
            <Link
              key={brand.slug}
              href={href}
              className="group block transition-colors duration-300 hover:bg-[hsl(36,22%,93%)]"
              style={{ borderTop: `1px solid ${C.border}` }}
            >
              <div
                className="h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                style={{ backgroundColor: C.accent }}
              />
              <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                  <div>
                    <p
                      className="font-display text-[9px] tracking-[0.42em] uppercase mb-4"
                      style={{ color: C.muted }}
                    >
                      {brand.country} · Est. {brand.founded}
                    </p>
                    <h2
                      className="font-cormorant font-light leading-[0.95] mb-3"
                      style={{ fontSize: 'clamp(2.8rem, 5vw, 5.5rem)', color: C.text }}
                    >
                      {brand.name}
                    </h2>
                    <p
                      className="text-sm leading-relaxed max-w-[52ch]"
                      style={{ color: C.muted }}
                    >
                      {brand.tagline}
                    </p>
                  </div>
                  <div className="flex items-end gap-8 shrink-0">
                    <div className="flex gap-2 flex-wrap justify-end">
                      {brand.models.slice(0, 4).map((m) => (
                        <span
                          key={m}
                          className="font-display text-[8px] tracking-[0.18em] uppercase px-2.5 py-1.5"
                          style={{ backgroundColor: C.accentFaded, color: 'hsl(40, 55%, 38%)' }}
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                    <span
                      className="font-display text-[9px] tracking-[0.35em] uppercase transition-all duration-200 opacity-0 group-hover:opacity-100 shrink-0"
                      style={{ color: C.accent }}
                    >
                      Browse →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
        <div style={{ borderTop: `1px solid ${C.border}` }} />
      </section>

      {/* ── Editorial Quote ──────────────────────────── */}
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
