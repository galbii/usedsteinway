import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { SiteSetting } from '@/payload-types'
import { ContactForm } from './_components/ContactForm'
import { LocationTabs } from '@/components/piano/LocationTabs'
import { PianosHero } from '@/components/piano/PianosHero'
import { queryGalleryImages } from '@/lib/payload/media'

export const metadata: Metadata = {
  title: 'Get in Touch | UsedSteinways.com',
  description: 'Get in touch with Roger about buying, selling, or visiting the showroom.',
}


interface ContactPageProps {
  searchParams: Promise<{ piano?: string }>
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { piano: defaultPiano } = await searchParams
  const [siteSettings, galleryImages] = await Promise.all([
    getCachedGlobal('site-settings', 0)() as Promise<SiteSetting>,
    queryGalleryImages(16),
  ])
  const { phone, email, hoursOfOperation } = siteSettings?.contactInfo ?? {}
  const locations = siteSettings?.locations ?? []

  const displayPhone = phone ?? '508-545-0766'
  const displayEmail = email ?? 'info@usedsteinways.com'
  const displayHours =
    hoursOfOperation ?? 'By appointment. Walk-in may be possible but not guaranteed.'
  const telHref = `tel:+1${displayPhone.replace(/\D/g, '')}`

  return (
    <main className="min-h-screen bg-piano-cream">

      {/* ── Hero — cycling gallery background ────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: 'clamp(520px, 85vh, 900px)' }}>
        {/* Cycling gallery images — UI suppressed */}
        <div className="absolute inset-0">
          <PianosHero pianos={[]} galleryImages={galleryImages} backgroundOnly />
        </div>

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(4,1,1,0.82) 0%, rgba(4,1,1,0.55) 55%, rgba(4,1,1,0.18) 100%)' }}
        />

        {/* Two-column overlay: left = text, right = monogram */}
        <div className="absolute inset-0 z-20 flex items-end lg:grid lg:grid-cols-2">

          {/* Left — contact heading */}
          <div className="flex items-end px-10 md:px-16 xl:px-24 pb-16 md:pb-20">
            <div>
              <p
                className="font-display text-[10px] tracking-[0.6em] uppercase mb-8"
                style={{ color: 'hsla(40,72%,52%,0.70)' }}
              >
                UsedSteinways.com — Private Consultations Welcome
              </p>
              <h1
                className="font-light leading-[0.88] tracking-tight mb-8"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(5rem, 13vw, 14rem)',
                  color: 'hsl(36, 22%, 96%)',
                }}
              >
                Contact
                <br />
                <span style={{ fontStyle: 'italic', color: 'hsl(40, 72%, 62%)' }}>Roger</span>
              </h1>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-10 h-px shrink-0" style={{ backgroundColor: 'hsla(40,72%,52%,0.40)' }} />
                <span
                  className="font-display text-[10px] tracking-[0.50em] uppercase"
                  style={{ color: 'rgba(245,235,215,0.40)' }}
                >
                  Every Conversation Starts With Listening
                </span>
              </div>
              <p className="text-xl max-w-lg leading-relaxed font-light" style={{ color: 'rgba(245,235,215,0.55)' }}>
                Whether buying, selling, or simply curious — we&apos;re here.
              </p>
            </div>
          </div>

          {/* Right — monogram */}
          <div className="hidden lg:flex items-center justify-center pb-16">
            <Image
              src="/UsedSteinway.png"
              alt="UsedSteinways monogram"
              width={280}
              height={280}
              style={{ mixBlendMode: 'screen', opacity: 0.75 }}
            />
          </div>

        </div>
      </div>

      {/* ── Form + Sidebar ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">

          {/* Form Panel */}
          <div className="bg-piano-warm-white px-12 py-14">
            <div className="flex items-center gap-5 mb-12">
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold shrink-0">
                Send a Message
              </p>
              <div className="flex-1 h-px bg-piano-linen" />
            </div>
            <ContactForm defaultPiano={defaultPiano} />
          </div>

          {/* Sidebar — dark panel */}
          <div className="lg:sticky lg:top-8 bg-piano-burgundy divide-y divide-piano-gold/10">

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
