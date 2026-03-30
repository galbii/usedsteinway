import type { Metadata } from 'next'
import Link from 'next/link'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { SiteSetting } from '@/payload-types'
import { InquiryCTA } from '@/components/piano/InquiryCTA'
import { LocationTabs } from '@/components/piano/LocationTabs'

export const metadata: Metadata = {
  title: 'Visit the Showroom | UsedSteinways.com',
  description:
    'Come hear the pianos for yourself. Our Massachusetts showrooms are open by appointment. Play before you decide.',
}

export default async function VisitPage() {
  const siteSettings = await getCachedGlobal('site-settings', 0)() as SiteSetting
  const { phone, hoursOfOperation } = siteSettings?.contactInfo ?? {}
  const locations = siteSettings?.locations ?? []

  const displayPhone = phone ?? '508-545-0766'
  const displayHours = hoursOfOperation ?? 'By appointment. Walk-in may be possible but not guaranteed.'
  const telHref = `tel:+1${displayPhone.replace(/\D/g, '')}`

  return (
    <main className="min-h-screen bg-piano-cream">
      {/* Hero */}
      <section className="bg-piano-burgundy py-28 px-8">
        <div className="max-w-7xl mx-auto">
          <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-5">
            Plan Your Visit
          </p>
          <h1
            className="font-cormorant font-light text-white mb-6"
            style={{ fontSize: 'clamp(3.6rem, 7vw, 8.5rem)' }}
          >
            Come Hear Them Yourself
          </h1>
          <p className="text-piano-cream/70 text-lg max-w-xl leading-relaxed">
            No piano purchase should be made without playing the instrument.
            Our showrooms are designed to let you hear each piano at its best.
          </p>
        </div>
      </section>

      {/* Location selector — full width */}
      {locations.length > 0 && (
        <section className="bg-piano-cream border-b border-piano-linen">
          <div className="max-w-7xl mx-auto px-8 pt-16 pb-0">
            <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-6">
              Our Locations
            </p>
          </div>
          <div className="max-w-7xl mx-auto px-8">
            <LocationTabs locations={locations} phone={displayPhone} />
          </div>
          <div className="pb-16" />
        </section>
      )}

      {/* Main content grid */}
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Hours + What to Expect */}
          <div className="space-y-10">
            {/* Hours */}
            <div>
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">
                Showroom Hours
              </p>
              <div className="bg-piano-cream border border-piano-linen p-6">
                <p className="text-piano-stone text-base leading-relaxed">{displayHours}</p>
              </div>
            </div>

            {/* What to Expect */}
            <div>
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">
                What to Expect
              </p>
              <ul className="space-y-4">
                {[
                  'Play any piano in the collection without pressure or time limits',
                  "Roger is available to discuss each instrument's history and character",
                  'Acoustic environment is carefully designed for honest evaluation',
                  "We'll answer every question directly — including questions about competitors' inventory",
                  "No high-pressure sales. Our reputation depends on you finding the right piano, not just a piano.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-piano-stone">
                    <span className="text-piano-gold mt-1 shrink-0">◆</span>
                    <span className="leading-relaxed text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Appointment CTA + Tips */}
          <div className="space-y-6">
            <div className="bg-piano-cream border border-piano-gold/20 p-8">
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-3">
                Schedule a Visit
              </p>
              <h3 className="font-cormorant font-light text-piano-black text-3xl mb-4">
                Book a Private Appointment
              </h3>
              <p className="text-piano-stone text-base leading-relaxed mb-6">
                For a private session with no other visitors, give us a call or send a message.
                {"We'll"} arrange a time that works for you.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={telHref}
                  className="block text-center bg-piano-black text-piano-cream py-3.5 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-charcoal transition-colors"
                >
                  Call {displayPhone}
                </a>
                <Link
                  href="/contact?subject=Schedule+Visit"
                  className="block text-center border border-piano-black text-piano-black py-3.5 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-black hover:text-white transition-colors"
                >
                  Send a Message
                </Link>
              </div>
            </div>

            {/* First Visit Tips */}
            <div className="bg-piano-indigo-card p-8">
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">
                Tips for Your Visit
              </p>
              <ul className="space-y-3">
                {[
                  "Bring music you know well — familiar repertoire reveals a piano's character most honestly",
                  "Allow at least 90 minutes if you're seriously evaluating more than one instrument",
                  "Bring your teacher or accompanist if you'd like a second opinion",
                  "Tell us in advance if you have a specific instrument you want to try — we'll make sure it's tuned and ready",
                ].map((tip, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-piano-gold/50 shrink-0 mt-0.5 text-xs">◆</span>
                    <span className="text-piano-silver/80 text-base leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <InquiryCTA variant="dark" />
    </main>
  )
}
