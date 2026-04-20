import type { Metadata } from 'next'
import Link from 'next/link'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { SiteSetting } from '@/payload-types'
import { ContactForm } from './_components/ContactForm'
import { LocationTabs } from '@/components/piano/LocationTabs'

export const metadata: Metadata = {
  title: 'Contact Roger | UsedSteinways.com',
  description: 'Get in touch with Roger about buying, selling, or visiting the showroom.',
}


interface ContactPageProps {
  searchParams: Promise<{ piano?: string }>
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { piano: defaultPiano } = await searchParams
  const siteSettings = (await getCachedGlobal('site-settings', 0)()) as SiteSetting
  const { phone, email, hoursOfOperation } = siteSettings?.contactInfo ?? {}
  const locations = siteSettings?.locations ?? []

  const displayPhone = phone ?? '508-545-0766'
  const displayEmail = email ?? 'info@usedsteinways.com'
  const displayHours =
    hoursOfOperation ?? 'By appointment. Walk-in may be possible but not guaranteed.'
  const telHref = `tel:+1${displayPhone.replace(/\D/g, '')}`

  return (
    <main className="min-h-screen bg-piano-cream">

      {/* ── Hero — dark strip ─────────────────────────────────────── */}
      <section className="bg-piano-black relative pt-28 pb-20 px-8">
        <div className="max-w-7xl mx-auto">

          <p className="font-display text-sm tracking-[0.6em] uppercase text-piano-gold/60 mb-10">
            UsedSteinways.com — Private Consultations Welcome
          </p>

          <h1
            className="font-light text-piano-cream leading-[0.88] tracking-tight"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(5rem, 13vw, 14rem)',
            }}
          >
            Contact
            <br />
            <span className="italic text-piano-gold/90">Roger</span>
          </h1>

          <div className="flex items-center gap-6 mt-12 mb-10">
            <div className="flex-1 h-px bg-piano-gold/25" />
            <span className="font-display text-sm tracking-[0.5em] uppercase text-piano-gold/40 shrink-0">
              Every Conversation Starts With Listening
            </span>
            <div className="w-12 h-px bg-piano-gold/25 shrink-0" />
          </div>

          <p className="text-piano-silver/60 text-xl max-w-lg leading-relaxed font-light">
            Whether buying, selling, or simply curious — we&apos;re here.
          </p>
        </div>
      </section>

      {/* ── Form + Sidebar ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">

          {/* Form Panel */}
          <div className="bg-piano-warm-white px-12 py-14">
            <div className="flex items-center gap-5 mb-12">
              <p className="font-display text-sm tracking-[0.5em] uppercase text-piano-black shrink-0">
                Send a Message
              </p>
              <div className="flex-1 h-px bg-piano-linen" />
            </div>
            <ContactForm defaultPiano={defaultPiano} />
          </div>

          {/* Sidebar — dark panel */}
          <div className="lg:sticky lg:top-8 bg-piano-black divide-y divide-piano-charcoal">

            {/* Showroom Details */}
            <div className="px-10 py-10">
              <div className="flex items-center gap-3 mb-8">
                <p className="font-display text-sm tracking-[0.5em] uppercase text-piano-gold/60 shrink-0">
                  Showroom
                </p>
                <div className="flex-1 h-px bg-piano-gold/15" />
              </div>
              <div className="space-y-7">
                <div>
                  <p className="font-display text-xs tracking-[0.4em] uppercase text-piano-silver/30 mb-2">
                    Phone
                  </p>
                  <a
                    href={telHref}
                    className="text-piano-gold text-lg hover:text-piano-gold/75 transition-colors duration-200 font-light"
                  >
                    {displayPhone}
                  </a>
                </div>
                <div>
                  <p className="font-display text-[10px] tracking-[0.4em] uppercase text-piano-silver/30 mb-2">
                    Email
                  </p>
                  <a
                    href={`mailto:${displayEmail}`}
                    className="text-piano-cream/70 text-base hover:text-piano-cream transition-colors duration-200 font-light"
                  >
                    {displayEmail}
                  </a>
                </div>
                <div>
                  <p className="font-display text-[10px] tracking-[0.4em] uppercase text-piano-silver/30 mb-2">
                    Hours
                  </p>
                  <p className="text-piano-silver/55 text-base leading-relaxed font-light">
                    {displayHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="px-10 py-8">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/visit"
                  className="block text-center border border-piano-silver/30 py-4 text-piano-silver/70 font-display text-xs tracking-widest uppercase hover:border-piano-gold/60 hover:text-piano-gold transition-all duration-200"
                >
                  Plan Your Visit
                </Link>
                <Link
                  href="/sell-your-piano"
                  className="block text-center border border-piano-silver/30 py-4 text-piano-silver/70 font-display text-xs tracking-widest uppercase hover:border-piano-gold/60 hover:text-piano-gold transition-all duration-200"
                >
                  Sell Your Piano
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Locations ────────────────────────────────────────────── */}
      {locations.length > 0 && (
        <section className="border-t border-piano-linen">
          <div className="max-w-7xl mx-auto px-8 py-20">
            <div className="flex items-center gap-5 mb-12">
              <p className="font-display text-sm tracking-[0.5em] uppercase text-piano-stone/50 shrink-0">
                Our Locations
              </p>
              <div className="flex-1 h-px bg-piano-linen" />
            </div>
            <LocationTabs locations={locations} phone={displayPhone} />
          </div>
        </section>
      )}
    </main>
  )
}
