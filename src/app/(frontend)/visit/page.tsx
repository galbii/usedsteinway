import type { Metadata } from 'next'
import { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PageEditButton } from '@/components/admin/onpage/PageEditButton'
import { serializeBlocks } from '@/components/admin/onpage/editorSchema'
import { editableBlocks } from '@/blocks/registry'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { SiteSetting } from '@/payload-types'
import { InquiryCTA } from '@/components/piano/InquiryCTA'
import { LocationTabs } from '@/components/piano/LocationTabs'
import { ContactModal } from '@/components/contact/ContactModal'

export const metadata: Metadata = {
  title: 'Visit the Showroom | UsedSteinways.com',
  description:
    'Come hear the pianos for yourself. Our Massachusetts showrooms are open by appointment. Play before you decide.',
}

const maximizeTips = [
  'Please be on time. We allow at least 60 minutes per appointment. We want you to have as much time with the pianos as possible.',
  'Tell us your search criteria. The more we understand your needs, the better we can match you with the right piano.',
  "If you have a specific piano you'd like to try, please tell us in advance of your visit so we can prep it.",
  'During your visit, feel free to ask questions. We want you to know how each piano may fit your preferences and understand what you will be purchasing.',
  'We suggest that you prepare 2 or 3 pieces of music to try on all pianos. This allows you to better compare the tone and touch of the different pianos.',
  'We are happy to extend your visit if no other appointment is expected.',
]

const queryVisitPage = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: { slug: { equals: 'visit' } },
  })
  return result.docs?.[0] ?? null
})

export default async function VisitPage() {
  const { isEnabled: draft } = await draftMode()
  const page = await queryVisitPage()

  // CMS-driven: if an editor has built the Visit page out of blocks, render it.
  if (page) {
    const { hero, layout } = page
    return (
      <article className={hero?.type === 'none' ? '' : 'pt-16'}>
        {draft && <LivePreviewListener />}
        <RenderHero {...hero} />
        <RenderBlocks blocks={layout} />
        <PageEditButton pageId={page.id} blockSchemas={serializeBlocks(editableBlocks)} />
      </article>
    )
  }

  // Fallback: the original hand-built Visit page (default until a CMS page exists).
  return <VisitStaticContent />
}

async function VisitStaticContent() {
  const siteSettings = (await getCachedGlobal('site-settings', 0)()) as SiteSetting
  const { phone, hoursOfOperation } = siteSettings?.contactInfo ?? {}
  const locations = siteSettings?.locations ?? []

  const displayPhone = phone ?? '508-545-0766'
  const displayHours = hoursOfOperation ?? 'By appointment. Walk-in welcome but not guaranteed.'
  const telHref = `tel:+1${displayPhone.replace(/\D/g, '')}`

  return (
    <main className="min-h-screen bg-piano-cream">
      {/* Hero */}
      <section className="bg-piano-burgundy py-16 sm:py-20 lg:py-28 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4 sm:mb-5">
            Plan Your Visit
          </p>
          <h1
            className="font-cormorant font-light text-white mb-5 sm:mb-6"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 8.5rem)' }}
          >
            Come Hear Them Yourself
          </h1>
          <p className="text-piano-cream/70 text-base sm:text-lg max-w-xl leading-relaxed">
            No piano purchase should be made without playing the instrument.
            Our showrooms are designed to let you hear each piano at its best.
          </p>
        </div>
      </section>

      {/* Showroom Hours + How to Maximize Your Visit — above the map */}
      <section className="bg-piano-cream">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-12 sm:pt-20 pb-10 sm:pb-16">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-14">
            {/* Hours */}
            <div>
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">
                Showroom Hours
              </p>
              <div className="bg-piano-cream border border-piano-linen p-6">
                <p className="text-piano-stone text-base leading-relaxed">{displayHours}</p>
              </div>
              <div className="mt-5">
                <ContactModal
                  variant="schedule"
                  locations={locations}
                  triggerLabel="Book Appointment"
                  triggerClassName="block w-full text-center bg-piano-black text-piano-cream py-3.5 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-burgundy transition-colors"
                />
              </div>
            </div>

            {/* How to Maximize Your Visit */}
            <div>
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">
                How to Maximize Your Visit
              </p>
              <ul className="space-y-4">
                {maximizeTips.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-piano-stone">
                    <span className="text-piano-gold mt-1 shrink-0">◆</span>
                    <span className="leading-relaxed text-base">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Location selector + Map */}
      {locations.length > 0 && (
        <section id="locations" className="bg-piano-cream border-t border-b border-piano-linen scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-12 sm:pt-16 pb-0">
            <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-5 sm:mb-6">
              Our Locations
            </p>
          </div>
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <LocationTabs locations={locations} phone={displayPhone} />
          </div>
          <div className="pb-12 sm:pb-16" />
        </section>
      )}

      {/* Appointment CTA — below the map */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
        <div className="max-w-xl mx-auto bg-piano-cream border border-piano-gold/20 p-6 sm:p-8">
          <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-3">
            Schedule a Visit
          </p>
          <h3 className="font-cormorant font-light text-piano-black text-3xl mb-4">
            Book an Appointment
          </h3>
          <p className="text-piano-stone text-base leading-relaxed mb-6">
            Please call or send a message to book your appointment. We will confirm the location,
            date and time.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={telHref}
              className="block text-center bg-piano-black text-piano-cream py-3.5 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-charcoal transition-colors"
            >
              Call/Text {displayPhone}
            </a>
            <ContactModal variant="schedule" locations={locations} />
          </div>
        </div>
      </div>

      <InquiryCTA variant="dark" />
    </main>
  )
}
