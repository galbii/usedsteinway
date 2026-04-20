import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Gallery | UsedSteinways.com',
  description:
    'A curated visual archive of fine Steinway instruments — details, craftsmanship, and the beauty of each piano up close.',
}

// Bento pattern repeats every 5 items.
// Grid is 12 columns. Pattern produces:
//   Row block A: [large 8×2] + [small 4×1 / small 4×1]
//   Row block B: [medium 6×1] + [medium 6×1]
const BENTO: Array<{ cols: string; rows: string }> = [
  { cols: 'col-span-12 md:col-span-8', rows: 'row-span-1 md:row-span-2' }, // hero left
  { cols: 'col-span-6 md:col-span-4',  rows: 'row-span-1' },               // small right-top
  { cols: 'col-span-6 md:col-span-4',  rows: 'row-span-1' },               // small right-bottom
  { cols: 'col-span-12 md:col-span-6', rows: 'row-span-1' },               // medium left
  { cols: 'col-span-12 md:col-span-6', rows: 'row-span-1' },               // medium right
]

function isMediaObject(val: unknown): val is MediaType {
  return typeof val === 'object' && val !== null && 'url' in (val as object)
}

export default async function GalleryPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: images } = await payload.find({
    collection: 'media',
    overrideAccess: false,
    limit: 60,
    pagination: false,
    where: {
      tags: {
        contains: 'gallery',
      },
    },
  })

  const validImages = images.filter(isMediaObject)

  return (
    <main className="min-h-screen bg-piano-cream">

      {/* ── Page Header ──────────────────────────────────────────── */}
      <header className="pt-32 pb-14 px-6 md:px-10 border-b border-piano-linen">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-display text-[10px] tracking-[0.55em] uppercase text-piano-gold mb-5">
            Visual Archive
          </p>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h1
              className="font-cormorant font-light text-piano-black leading-[0.88] tracking-tight"
              style={{ fontSize: 'clamp(4.5rem, 10vw, 11rem)' }}
            >
              Gallery
            </h1>

            <div className="sm:pb-3 flex items-center gap-6">
              <div className="h-px w-10 bg-piano-linen hidden sm:block" />
              <p className="font-display text-[10px] tracking-[0.4em] uppercase text-piano-stone">
                {validImages.length}&nbsp;
                {validImages.length === 1 ? 'Image' : 'Images'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ── Bento Grid ───────────────────────────────────────────── */}
      <section className="py-3 px-3 md:px-4">
        <div className="max-w-[1400px] mx-auto">
          {validImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-48 gap-4">
              <div className="h-px w-16 bg-piano-linen" />
              <p className="font-cormorant text-piano-stone text-2xl font-light">
                No gallery images yet.
              </p>
              <div className="h-px w-16 bg-piano-linen" />
            </div>
          ) : (
            <div className="grid grid-cols-12 auto-rows-[220px] md:auto-rows-[300px] gap-2 md:gap-2.5 grid-flow-dense">
              {validImages.map((image, index) => {
                const bento = BENTO[index % BENTO.length]
                const label = String(index + 1).padStart(2, '0')

                return (
                  <div
                    key={image.id}
                    className={[
                      bento.cols,
                      bento.rows,
                      'group relative overflow-hidden bg-piano-charcoal',
                    ].join(' ')}
                  >
                    {/* ── Image (scales on hover) ── */}
                    <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05]">
                      <Media
                        resource={image}
                        fill
                        className="absolute inset-0"
                        imgClassName="object-cover"
                        priority={index < 3}
                      />
                    </div>

                    {/* ── Permanent vignette (subtle depth) ── */}
                    <div className="absolute inset-0 bg-gradient-to-t from-piano-black/30 via-transparent to-transparent pointer-events-none" />

                    {/* ── Hover overlay (slides up) ── */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-10 bg-gradient-to-t from-piano-black/92 via-piano-black/60 to-transparent pt-16 pb-5 px-5">
                      {(image.caption || image.alt) && (
                        <p
                          className="font-cormorant font-light text-piano-cream leading-snug"
                          style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)' }}
                        >
                          {image.caption ?? image.alt}
                        </p>
                      )}
                    </div>

                    {/* ── Gold accent line (expands on hover) ── */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-piano-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-600 delay-75 z-20 pointer-events-none" />

                    {/* ── Index number (fades in on hover) ── */}
                    <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pointer-events-none">
                      <span className="font-display text-[9px] tracking-[0.35em] text-piano-gold">
                        {label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Footer Rule ──────────────────────────────────────────── */}
      <footer className="mt-3 py-16 px-6 md:px-10 border-t border-piano-linen">
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
