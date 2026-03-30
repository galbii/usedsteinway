import type { Metadata } from 'next'
import Link from 'next/link'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { SiteSetting } from '@/payload-types'
import { ContactForm } from './_components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Roger | UsedSteinways.com',
  description: 'Get in touch with Roger about buying, selling, or visiting the showroom.',
}

export default async function ContactPage() {
  const siteSettings = await getCachedGlobal('site-settings', 0)() as SiteSetting
  const { phone, email, hoursOfOperation } = siteSettings?.contactInfo ?? {}
  const locations = siteSettings?.locations ?? []

  const displayPhone = phone ?? '508-545-0766'
  const displayEmail = email ?? 'info@usedsteinways.com'
  const displayHours = hoursOfOperation ?? 'By appointment. Walk-in may be possible but not guaranteed.'
  const telHref = `tel:+1${displayPhone.replace(/\D/g, '')}`

  return (
    <main className="min-h-screen bg-piano-cream">
      {/* Page Header */}
      <section className="bg-piano-burgundy py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">
            Get in Touch
          </p>
          <h1
            className="font-cormorant font-light text-white mb-4"
            style={{ fontSize: 'clamp(3.6rem, 7vw, 8.5rem)' }}
          >
            Contact Roger
          </h1>
          <p className="text-piano-cream/70 text-lg max-w-xl leading-relaxed">
            Every conversation starts with listening. Tell us what you&apos;re looking for.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16">

          {/* Left: Form */}
          <div>
            <ContactForm />
          </div>

          {/* Right: Contact Info */}
          <div className="space-y-6">
            {/* Shared Contact Details */}
            <div className="bg-piano-black p-8">
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-6">
                Showroom Details
              </p>
              <div className="space-y-5">
                <div>
                  <p className="font-display text-xs tracking-widest uppercase text-piano-silver/50 mb-1">Phone</p>
                  <a href={telHref} className="text-piano-gold text-sm hover:text-piano-gold/80 transition-colors">
                    {displayPhone}
                  </a>
                </div>
                <div>
                  <p className="font-display text-xs tracking-widest uppercase text-piano-silver/50 mb-1">Email</p>
                  <a href={`mailto:${displayEmail}`} className="text-piano-cream/80 text-sm hover:text-piano-cream transition-colors">
                    {displayEmail}
                  </a>
                </div>
                <div>
                  <p className="font-display text-xs tracking-widest uppercase text-piano-silver/50 mb-2">Hours</p>
                  <p className="text-piano-cream/80 text-sm leading-relaxed">{displayHours}</p>
                </div>
              </div>
            </div>

            {/* Locations */}
            {locations.length > 0 && (
              <div className="space-y-4">
                <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-stone/60">
                  Our Locations
                </p>
                {locations.map((loc, i) => (
                  <div key={i} className="bg-piano-black p-6">
                    <p className="font-display text-[10px] tracking-[0.4em] uppercase text-piano-gold mb-3">
                      {loc.name}
                    </p>
                    <p className="text-piano-cream text-sm leading-relaxed mb-4">
                      {loc.streetAddress}<br />
                      {loc.city}, {loc.state} {loc.zip}
                    </p>
                    {loc.googleMapsUrl && (
                      <a
                        href={loc.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block border border-piano-gold/40 text-piano-gold/80 px-5 py-2 font-display text-[10px] tracking-[0.3em] uppercase hover:border-piano-gold hover:text-piano-gold transition-colors"
                      >
                        Get Directions →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/visit"
                className="block text-center border border-piano-black/20 py-3 text-piano-black font-display text-[11px] tracking-[0.3em] uppercase hover:border-piano-gold hover:text-piano-gold transition-colors"
              >
                Plan Your Visit
              </Link>
              <Link
                href="/sell-your-piano"
                className="block text-center border border-piano-black/20 py-3 text-piano-black font-display text-[11px] tracking-[0.3em] uppercase hover:border-piano-gold hover:text-piano-gold transition-colors"
              >
                Sell Your Piano
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
