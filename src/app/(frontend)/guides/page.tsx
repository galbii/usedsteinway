import type { Metadata } from 'next'
import Link from 'next/link'
import { queryGuidePosts, queryAllPosts } from '@/lib/payload/posts'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { SiteSetting } from '@/payload-types'
import { LocationTabs } from '@/components/piano/LocationTabs'
import { GuidesPageClient } from './_components/GuidesPageClient'

export const metadata: Metadata = {
  title: 'Piano Buying Guides | UsedSteinways.com',
  description:
    'Expert guides on buying pre-owned Steinway and premium pianos. Pricing guides, model comparisons, restoration insights, and what to look for.',
}

export default async function GuidesPage() {
  const [guides, allPosts, siteSettings] = await Promise.all([
    queryGuidePosts(),
    queryAllPosts(),
    getCachedGlobal('site-settings', 0)() as Promise<SiteSetting>,
  ])

  const locations = siteSettings?.locations ?? []
  const phone = siteSettings?.contactInfo?.phone ?? '508-545-0766'

  return (
    <main className="min-h-screen bg-piano-cream">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-piano-burgundy py-28 px-8">
        <div className="max-w-3xl mx-auto">
          <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-5">
            Knowledge Base
          </p>
          <h1
            className="font-cormorant font-light text-white mb-6 leading-none"
            style={{ fontSize: 'clamp(3.6rem, 7vw, 8.5rem)' }}
          >
            Guides & News
          </h1>
          <p className="text-piano-cream/70 text-lg max-w-2xl leading-relaxed">
            Three decades of expertise distilled into practical guides. From pricing to restoration,
            everything you need to buy a world-class piano with confidence.
          </p>
        </div>
      </section>

      {/* ── Tab grid ──────────────────────────────────────────── */}
      <GuidesPageClient guides={guides} allPosts={allPosts} />

      {/* ── Locations ─────────────────────────────────────────── */}
      {locations.length > 0 && (
        <section className="px-8 py-24" style={{ backgroundColor: 'hsl(36, 22%, 96%)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-5 mb-14">
              <div className="h-px w-10 shrink-0" style={{ backgroundColor: 'hsl(40, 72%, 52%)' }} />
              <span
                className="font-display text-[10px] tracking-[0.5em] uppercase shrink-0"
                style={{ color: 'hsl(350, 5%, 46%)' }}
              >
                Our Locations
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: 'hsl(36, 18%, 89%)' }} />
            </div>
            <LocationTabs locations={locations} phone={phone} />
          </div>
        </section>
      )}

      {/* ── Dual CTA ──────────────────────────────────────────── */}
      <section
        className="px-8 py-0"
        style={{ backgroundColor: 'hsl(36, 22%, 96%)' }}
      >
        <div className="max-w-7xl mx-auto">

          {/* Thin rule */}
          <div
            className="h-px w-full mb-0"
            style={{ backgroundColor: 'hsl(36, 18%, 87%)' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ── Left: Browse Collection ──────────────────────── */}
            <Link
              href="/steinway"
              className="group relative flex flex-col justify-between overflow-hidden px-14 py-20"
              style={{ backgroundColor: 'hsl(350, 62%, 26%)' }}
            >
              {/* Subtle background texture: large faint numeral */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-8 bottom-4 leading-none select-none font-cormorant font-light"
                style={{
                  fontSize: 'clamp(10rem, 18vw, 18rem)',
                  color: 'hsla(40, 72%, 52%, 0.06)',
                  lineHeight: 1,
                }}
              >
                I
              </span>

              <div className="relative z-10">
                <p
                  className="font-display text-[10px] tracking-[0.5em] uppercase mb-8"
                  style={{ color: 'hsl(40, 72%, 52%)' }}
                >
                  Our Collection
                </p>
                <h2
                  className="font-cormorant font-light text-white leading-[1.0] mb-6"
                  style={{ fontSize: 'clamp(2.8rem, 4vw, 5rem)' }}
                >
                  Browse Every<br />Available Piano
                </h2>
                <p
                  className="text-base leading-relaxed max-w-sm"
                  style={{ color: 'hsla(36, 22%, 96%, 0.55)' }}
                >
                  Each instrument personally selected and inspected. Steinway, Bösendorfer,
                  Bechstein — curated for discerning buyers.
                </p>
              </div>

              <div className="relative z-10 mt-14 flex items-center gap-4">
                <span
                  className="inline-flex items-center justify-center px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase transition-all duration-300 group-hover:gap-6"
                  style={{ backgroundColor: 'hsl(40, 72%, 52%)', color: 'hsl(350, 62%, 26%)' }}
                >
                  View All Pianos
                  <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">→</span>
                </span>
              </div>
            </Link>

            {/* ── Right: Speak With Roger ───────────────────────── */}
            <Link
              href="/contact"
              className="group relative flex flex-col justify-between overflow-hidden px-14 py-20"
              style={{ backgroundColor: 'hsl(36, 22%, 93%)' }}
            >
              {/* Subtle background texture: large faint II */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-8 bottom-4 leading-none select-none font-cormorant font-light"
                style={{
                  fontSize: 'clamp(10rem, 18vw, 18rem)',
                  color: 'hsla(350, 62%, 26%, 0.05)',
                  lineHeight: 1,
                }}
              >
                II
              </span>

              {/* Thin vertical gold rule on left edge (only on lg+) */}
              <div
                className="absolute top-0 left-0 bottom-0 w-[2px] hidden lg:block"
                style={{ backgroundColor: 'hsl(36, 18%, 84%)' }}
              />

              <div className="relative z-10">
                <p
                  className="font-display text-[10px] tracking-[0.5em] uppercase mb-8"
                  style={{ color: 'hsl(350, 5%, 46%)' }}
                >
                  Personal Service
                </p>
                <h2
                  className="font-cormorant font-light leading-[1.0] mb-6"
                  style={{
                    fontSize: 'clamp(2.8rem, 4vw, 5rem)',
                    color: 'hsl(350, 12%, 11%)',
                  }}
                >
                  Get in<br />Touch
                </h2>
                <p
                  className="text-base leading-relaxed max-w-sm"
                  style={{ color: 'hsl(350, 5%, 46%)' }}
                >
                  Three decades of expertise, no sales pressure. Tell us what you need —
                  or come hear the pianos yourself.
                </p>
              </div>

              <div className="relative z-10 mt-14 flex items-center gap-6">
                <span
                  className="inline-flex items-center justify-center px-10 py-4 border font-display text-[11px] tracking-[0.3em] uppercase transition-all duration-300"
                  style={{
                    borderColor: 'hsl(350, 62%, 26%)',
                    color: 'hsl(350, 62%, 26%)',
                    backgroundColor: 'transparent',
                  }}
                >
                  Get in Touch
                  <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">→</span>
                </span>

                {phone && (
                  <span
                    className="font-display text-[10px] tracking-[0.25em] transition-colors"
                    style={{ color: 'hsl(40, 72%, 52%)' }}
                  >
                    {phone}
                  </span>
                )}
              </div>
            </Link>

          </div>

          {/* Bottom rule */}
          <div
            className="h-px w-full"
            style={{ backgroundColor: 'hsl(36, 18%, 87%)' }}
          />
        </div>
      </section>

      {/* Breathing room at very bottom */}
      <div className="h-16" style={{ backgroundColor: 'hsl(36, 22%, 96%)' }} />

    </main>
  )
}
