import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { LocationTabs } from '@/components/piano/LocationTabs'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Media as MediaType, SiteSetting } from '@/payload-types'

import { GalleryHero } from './_components/GalleryHero'
import { GalleryGrid } from './_components/GalleryGrid'

export const metadata: Metadata = {
  title: 'Gallery | UsedSteinways.com',
  description:
    'A curated visual archive of fine Steinway instruments — details, craftsmanship, and the beauty of each piano up close.',
}

function isMediaObject(val: unknown): val is MediaType {
  return typeof val === 'object' && val !== null && 'url' in (val as object)
}

export default async function GalleryPage() {
  const payload = await getPayload({ config: configPromise })

  const [{ docs: images }, siteSettings] = await Promise.all([
    payload.find({
      collection: 'media',
      overrideAccess: false,
      limit: 60,
      pagination: false,
      where: { tags: { contains: 'gallery' } },
    }),
    getCachedGlobal('site-settings', 0)() as Promise<SiteSetting>,
  ])

  const validImages = images.filter(isMediaObject)
  const locations   = siteSettings.locations ?? []
  const phone       = siteSettings.contactInfo?.phone ?? null

  return (
    <main className="min-h-screen bg-piano-cream">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <GalleryHero images={validImages} totalCount={validImages.length} />

      {/* ── Archive header + search/filter + bento grid ─────────── */}
      <GalleryGrid images={validImages} />

      {/* ── Locations ─────────────────────────────────────────── */}
      {locations.length > 0 && (
        <section className="mt-16 px-6 md:px-10 pb-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-10">
              <p className="font-display text-[10px] tracking-[0.55em] uppercase text-piano-gold mb-3">
                Visit Us
              </p>
              <h2
                className="font-cormorant font-light text-piano-black"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
              >
                Our Showrooms
              </h2>
            </div>
            <LocationTabs locations={locations} phone={phone} />
          </div>
        </section>
      )}

      {/* ── Footer rule ───────────────────────────────────────── */}
      <footer className="py-16 px-6 md:px-10 border-t border-piano-linen">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-8">
          <p className="font-display text-[9px] tracking-[0.5em] uppercase text-piano-stone/60">
            UsedSteinways.com
          </p>
          <div className="h-px flex-1 bg-piano-linen max-w-xs" />
          <p className="font-cormorant text-piano-stone/60 text-sm italic">
            Every instrument tells a story.
          </p>
        </div>
      </footer>
    </main>
  )
}
