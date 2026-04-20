'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import type { Piano } from '@/types/piano'
import { ConditionBadge } from './ConditionBadge'
import { InquiryCTA } from './InquiryCTA'
import { PianoInquiryForm } from './PianoInquiryForm'
import { PianoMediaCarousel } from './PianoMediaCarousel'
import { LocationTabs } from './LocationTabs'
import { cn } from '@/utilities/ui'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import dynamic from 'next/dynamic'

// Loaded lazily so the heavy Lexical runtime doesn't bloat the initial bundle
const RichText = dynamic(() => import('@/components/RichText'), { ssr: true })

type Location = {
  name: string
  streetAddress: string
  city: string
  state: string
  zip: string
  googleMapsUrl?: string | null
  id?: string | null
}

interface PianoDetailV2Props {
  piano: Piano
  locations?: Location[]
  phone?: string | null
}

export function PianoDetailV2({ piano, locations = [], phone }: PianoDetailV2Props) {
  const [activeImage, setActiveImage] = useState(0)

  // Combine uploaded photos with the stock image URL (stock goes last)
  const allImages = [
    ...piano.imageUrls,
    ...(piano.stockImageUrl && !piano.imageUrls.includes(piano.stockImageUrl)
      ? [piano.stockImageUrl]
      : []),
  ]
  const stockImageIndex = piano.stockImageUrl ? allImages.indexOf(piano.stockImageUrl) : -1
  const isActiveStockImage = activeImage === stockImageIndex && stockImageIndex !== -1

  return (
    <main className="min-h-screen bg-piano-cream">
      {/* ── Full-Screen Gallery Header ── */}
      <section className="bg-piano-burgundy">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-8 pt-8">
          <nav className="flex items-center gap-2 text-piano-cream/50 font-display text-[11px] tracking-[0.45em] uppercase mb-6">
            <Link href="/pianos" className="hover:text-piano-gold transition-colors">All Pianos</Link>
            <span>·</span>
            <Link href={`/pianos/${piano.brandSlug}`} className="hover:text-piano-gold transition-colors">{piano.brand}</Link>
            <span>·</span>
            <span className="text-piano-cream">{piano.model}</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-8 pb-0">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            {/* Main Gallery */}
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-piano-burgundy">
                {allImages[activeImage] && (
                  <Image
                    src={allImages[activeImage] ?? ''}
                    alt={piano.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                )}
                <div className="absolute bottom-4 right-4 bg-piano-black/70 px-3 py-1.5 text-piano-cream/70 font-display text-[11px] tracking-[0.45em]">
                  {activeImage + 1} / {allImages.length}
                </div>
                {isActiveStockImage && (
                  <div className="absolute top-4 left-4 bg-piano-black/70 px-3 py-1.5 text-piano-silver/70 font-display text-[10px] tracking-[0.35em] uppercase">
                    Reference image
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              {allImages.length > 1 && (
                <div className="flex gap-2 mt-3 pb-6">
                  {allImages.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={cn(
                        'relative w-20 h-14 shrink-0 overflow-hidden transition-all',
                        activeImage === i
                          ? 'ring-2 ring-piano-gold opacity-100'
                          : 'opacity-50 hover:opacity-80',
                      )}
                    >
                      <Image src={url} alt={`View ${i + 1}`} fill className="object-cover" sizes="80px" />
                      {i === stockImageIndex && (
                        <div className="absolute inset-x-0 bottom-0 bg-piano-black/60 text-piano-silver/80 font-display text-[8px] tracking-widest uppercase text-center py-0.5">
                          Ref
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar: Title + CTAs */}
            <div className="py-2 pb-10">
              <div className="flex items-start gap-3 mb-2">
                <ConditionBadge condition={piano.condition} />
                {piano.isFeatured && (
                  <span className="bg-piano-gold/20 text-piano-gold text-[11px] font-display tracking-[0.45em] uppercase px-2.5 py-0.5 rounded-full border border-piano-gold/30">
                    Featured
                  </span>
                )}
              </div>
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mt-4 mb-2">
                {piano.brand} · {piano.year}
              </p>
              <h1
                className="font-cormorant font-light text-piano-cream leading-snug mb-2"
                style={{ fontSize: 'clamp(3.6rem, 7vw, 8.5rem)' }}
              >
                {piano.model}
              </h1>
              <p className="text-piano-silver text-sm mb-4">
                {piano.finish} · {piano.size}
              </p>

              <div className="border-t border-piano-gold/20 pt-5 mb-6">
                <p className="text-piano-silver text-[11px] font-display tracking-[0.45em] uppercase mb-1">Asking Price</p>
                <p className="font-cormorant font-light text-3xl text-piano-cream">
                  {piano.priceDisplay}
                </p>
                {piano.retailPrice && (
                  <p className="text-piano-silver/50 text-xs font-display tracking-wide mt-2">
                    New retail:{' '}
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    }).format(piano.retailPrice)}
                  </p>
                )}
              </div>

              {/* 3 CTAs */}
              <div className="flex flex-col gap-3">
                <Link
                  href={`/contact?subject=${encodeURIComponent(`Schedule Viewing: ${piano.title}`)}`}
                  className="w-full text-center bg-piano-cream text-piano-burgundy px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:opacity-90 transition-opacity"
                >
                  Schedule a Viewing
                </Link>
                <a
                  href="#inquiry"
                  className="w-full text-center border border-piano-gold/50 text-piano-gold px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:border-piano-gold transition-colors"
                >
                  Check Availability
                </a>
                <a
                  href="tel:+16035550123"
                  className="w-full text-center border border-piano-cream/20 text-piano-cream/70 px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:border-piano-cream/50 hover:text-piano-cream transition-colors"
                >
                  Call (603) 555-0123
                </a>
              </div>

              {piano.serialNumber && (
                <p className="mt-6 text-piano-silver/40 text-xs font-display tracking-wide">
                  Serial #{piano.serialNumber}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Piano Story & Details ── */}
      <section className="py-28 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-14">
              {/* Description */}
              <div>
                <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">About This Instrument</p>
                <h2
                  className="font-cormorant font-light text-piano-black mb-5"
                  style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4.5rem)' }}
                >
                  {piano.title}
                </h2>
                {piano.richTextDescription ? (
                  <div className="text-piano-stone text-lg leading-relaxed [&_p]:mb-4 [&_h2]:font-cormorant [&_h2]:font-light [&_h2]:text-piano-black [&_h3]:font-display [&_h3]:text-piano-gold [&_h3]:tracking-widest [&_h3]:uppercase [&_h3]:text-sm">
                    <RichText
                      data={piano.richTextDescription as DefaultTypedEditorState}
                      enableGutter={false}
                      enableProse={false}
                    />
                  </div>
                ) : (
                  <p className="text-piano-stone text-lg leading-relaxed">{piano.description}</p>
                )}
              </div>

              {/* Restoration */}
              {piano.restorationHistory && (
                <div>
                  <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-3">Restoration History</p>
                  <p className="text-piano-stone text-lg leading-relaxed">{piano.restorationHistory}</p>
                </div>
              )}

              {/* Condition Report */}
              {piano.conditionReport && (
                <div className="bg-piano-black/5 p-8 border border-piano-linen">
                  <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">Condition Report</p>
                  <p className="text-piano-stone text-base leading-relaxed">{piano.conditionReport}</p>
                </div>
              )}
            </div>

            {/* Specs Sidebar */}
            <div className="space-y-8">
              <div className="bg-piano-burgundy p-8">
                <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-6">Specifications</p>
                <dl className="space-y-4">
                  {Object.entries(piano.specs).map(([key, val]) => (
                    <div key={key} className="pb-4 border-b border-piano-gold/10 last:border-0 last:pb-0">
                      <dt className="text-piano-silver text-[11px] font-display tracking-[0.45em] uppercase mb-1">{key}</dt>
                      <dd className="text-piano-cream text-sm font-medium">{val}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Quick Actions */}
              <div className="border border-piano-linen p-8">
                <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">Quick Contact</p>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="text-center bg-piano-black text-piano-cream px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-charcoal transition-colors"
                  >
                    Contact Roger
                  </Link>
                  <a
                    href="tel:+16035550123"
                    className="text-center border border-piano-black/20 text-piano-black px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:border-piano-gold hover:text-piano-gold transition-colors"
                  >
                    (603) 555-0123
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Media Carousel ── */}
      {allImages.length > 0 && (
        <PianoMediaCarousel images={allImages} title={piano.title} stockImageIndex={stockImageIndex} />
      )}

      {/* ── Locations ── */}
      {locations.length > 0 && (
        <section className="py-20 px-8 bg-piano-cream">
          <div className="max-w-7xl mx-auto">
            <p className="font-display text-[11px] tracking-[0.55em] uppercase text-piano-gold mb-4">
              Visit Our Showroom
            </p>
            <h2
              className="font-cormorant font-light text-piano-black mb-10"
              style={{ fontSize: 'clamp(2.4rem, 4vw, 4rem)' }}
            >
              See It In Person
            </h2>
            <LocationTabs locations={locations} phone={phone} />
          </div>
        </section>
      )}

      {/* ── Inquiry Form ── */}
      <section id="inquiry" className="bg-piano-black border-t border-piano-gold/10 py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="font-display text-[11px] tracking-[0.55em] uppercase text-piano-gold mb-4">
              Make an Inquiry
            </p>
            <h2
              className="font-cormorant font-light text-piano-cream"
              style={{ fontSize: 'clamp(2.6rem, 5vw, 4.5rem)' }}
            >
              Ask Roger About This Piano
            </h2>
          </div>
          <PianoInquiryForm pianoTitle={piano.title} pianoSlug={piano.slug} />
        </div>
      </section>

      <InquiryCTA pianoTitle={piano.title} variant="dark" />
    </main>
  )
}
