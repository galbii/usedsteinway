'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import type { Piano } from '@/types/piano'
import { ConditionBadge } from './ConditionBadge'
import { InquiryCTA } from './InquiryCTA'
import { PianoInquiryForm } from './PianoInquiryForm'
import { PianoMediaCarousel } from './PianoMediaCarousel'
import { LocationTabs } from './LocationTabs'
import { cn } from '@/utilities/ui'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import dynamic from 'next/dynamic'

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

  const allImages = [
    ...piano.imageUrls,
    ...(piano.stockImageUrl && !piano.imageUrls.includes(piano.stockImageUrl)
      ? [piano.stockImageUrl]
      : []),
  ]
  const stockImageIndex = piano.stockImageUrl ? allImages.indexOf(piano.stockImageUrl) : -1
  const isActiveStockImage = activeImage === stockImageIndex && stockImageIndex !== -1

  const telHref = phone ? `tel:+1${phone.replace(/\D/g, '')}` : undefined
  const displayPhone = phone ?? undefined

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.sr')
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in-view')
        }),
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen bg-piano-cream">

      {/* ── Hero — Light Split ── */}
      <section className="flex flex-col lg:flex-row bg-piano-cream" style={{ minHeight: '100svh' }}>

        {/* Left: Product Info */}
        <div className="lg:w-[44%] flex flex-col px-8 pt-10 pb-14 lg:px-14 lg:pt-14 lg:pb-16">

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-piano-stone/40 font-display text-xs tracking-[0.4em] uppercase"
            style={{ animation: 'fade-up 0.6s ease-out 0s both' }}
          >
            <Link href="/pianos" className="hover:text-piano-burgundy transition-colors">Pianos</Link>
            <span aria-hidden="true">·</span>
            <Link href={`/pianos/${piano.brandSlug}`} className="hover:text-piano-burgundy transition-colors">
              {piano.brand}
            </Link>
            <span aria-hidden="true">·</span>
            <span className="text-piano-stone/60" aria-current="page">{piano.model}</span>
          </nav>

          {/* Main Identity */}
          <div className="flex-1 flex flex-col justify-center py-12 lg:py-0">

            {/* Eyebrow */}
            <div
              className="flex items-center gap-3 mb-5"
              style={{ animation: 'fade-up 0.65s ease-out 0.06s both' }}
            >
              <div className="h-px w-8 bg-piano-burgundy/70" />
              <p className="font-display text-xs tracking-[0.5em] uppercase text-piano-burgundy">
                {piano.brand} · {piano.year}
              </p>
            </div>

            {/* Model name */}
            <h1
              className="font-cormorant font-light text-piano-black leading-[0.88] mb-5"
              style={{
                fontSize: 'clamp(5rem, 9.5vw, 12rem)',
                animation: 'fade-up 0.75s ease-out 0.12s both',
              }}
            >
              {piano.model}
            </h1>

            {/* Burgundy divider */}
            <div
              className="h-px bg-piano-burgundy/40 mb-6"
              style={{
                width: '3.5rem',
                animation: 'scale-x-in 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both',
                transformOrigin: 'left center',
              }}
            />

            {/* Attributes */}
            <div
              className="flex items-center gap-3 flex-wrap mb-8"
              style={{ animation: 'fade-up 0.65s ease-out 0.26s both' }}
            >
              <ConditionBadge condition={piano.condition} />
              <span className="text-piano-stone/60 text-base font-light">
                {piano.finish} · {piano.size}
              </span>
              {piano.isFeatured && (
                <span className="animate-float-badge bg-piano-burgundy/8 text-piano-burgundy text-xs font-display tracking-[0.4em] uppercase px-3 py-1 border border-piano-burgundy/25">
                  Featured
                </span>
              )}
            </div>

            {/* Floating glass price card */}
            <div
              className="bg-white/90 backdrop-blur-sm border border-black/[0.06] shadow-[0_4px_32px_rgba(0,0,0,0.07)] p-7 mb-8 self-start"
              style={{ animation: 'fade-up 0.7s ease-out 0.3s both' }}
            >
              <p className="font-display text-xs tracking-[0.45em] uppercase text-piano-stone/45 mb-2">
                Asking Price
              </p>
              <p
                className="font-cormorant font-light text-piano-black"
                style={{ fontSize: 'clamp(2.4rem, 4vw, 4rem)' }}
              >
                {piano.priceDisplay}
              </p>
              {piano.retailPrice && (
                <p className="text-piano-stone/40 text-xs font-display tracking-wide mt-2">
                  New retail:{' '}
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                  }).format(piano.retailPrice)}
                </p>
              )}
            </div>

            {/* CTAs */}
            <div
              className="flex flex-col gap-3"
              style={{ animation: 'fade-up 0.65s ease-out 0.36s both' }}
            >
              <Link
                href={`/contact?subject=${encodeURIComponent(`Schedule Viewing: ${piano.title}`)}`}
                className="w-full text-center bg-piano-black text-piano-cream px-10 py-4 font-display text-xs tracking-[0.3em] uppercase hover:bg-piano-burgundy transition-colors duration-200"
              >
                Schedule a Viewing
              </Link>
              <a
                href="#inquiry"
                className="w-full text-center border border-piano-burgundy/55 text-piano-burgundy px-10 py-4 font-display text-xs tracking-[0.3em] uppercase hover:bg-piano-burgundy/5 hover:border-piano-burgundy transition-colors duration-200"
              >
                Check Availability
              </a>
              {displayPhone && telHref && (
                <a
                  href={telHref}
                  className="w-full text-center text-piano-stone/50 px-10 py-4 font-display text-xs tracking-[0.3em] uppercase hover:text-piano-stone transition-colors duration-200"
                >
                  {displayPhone}
                </a>
              )}
            </div>
          </div>

          {/* Serial */}
          {piano.serialNumber && (
            <p
              className="text-piano-stone/30 text-xs font-display tracking-[0.4em] uppercase"
              style={{ animation: 'fade-up 0.6s ease-out 0.44s both' }}
            >
              Serial #{piano.serialNumber}
            </p>
          )}
        </div>

        {/* Right: Image Gallery */}
        <div
          className="relative lg:w-[56%] overflow-hidden bg-piano-linen"
          style={{ minHeight: '56vw' }}
        >
          {allImages.map((url, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: activeImage === i ? 1 : 0 }}
            >
              <Image
                src={url}
                alt={`${piano.title} — photo ${i + 1} of ${allImages.length}`}
                fill
                className={cn('object-cover', activeImage === i && 'animate-kenburns')}
                sizes="(max-width: 1024px) 100vw, 56vw"
                priority={i === 0}
              />
            </div>
          ))}

          {/* Counter + ref — glass pill */}
          <div
            className="absolute top-5 right-5 z-20 flex items-center gap-2"
            aria-live="polite"
            aria-atomic="true"
          >
            {isActiveStockImage && (
              <span className="bg-white/20 backdrop-blur-xl border border-white/30 px-2.5 py-1 text-white/80 font-display text-[10px] tracking-[0.35em] uppercase">
                Ref
              </span>
            )}
            <span className="bg-white/20 backdrop-blur-xl border border-white/25 px-3 py-1.5 text-white font-display text-xs tracking-[0.4em]">
              {activeImage + 1} / {allImages.length}
            </span>
          </div>

          {/* Glass thumbnail strip */}
          {allImages.length > 1 && (
            <div
              className="absolute bottom-0 inset-x-0 z-20"
              role="group"
              aria-label="Image thumbnails"
            >
              <div className="bg-white/12 backdrop-blur-xl border-t border-white/20 px-5 py-3.5 flex gap-2 overflow-x-auto">
                {allImages.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View ${piano.title} — photo ${i + 1}`}
                    aria-pressed={activeImage === i}
                    className={cn(
                      'relative w-16 h-11 shrink-0 overflow-hidden transition-all duration-300',
                      activeImage === i
                        ? 'ring-1 ring-white opacity-100 scale-105'
                        : 'opacity-50 hover:opacity-80',
                    )}
                  >
                    <Image
                      src={url}
                      alt={`${piano.title} — thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                    {i === stockImageIndex && (
                      <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white/70 font-display text-[7px] tracking-widest uppercase text-center py-0.5">
                        Ref
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Specs Strip ── */}
      <div className="bg-white border-y border-black/[0.05] shadow-[0_1px_24px_rgba(0,0,0,0.04)] overflow-x-auto">
        <dl className="flex divide-x divide-black/[0.05] max-w-7xl mx-auto">
          {[
            { label: 'Year', value: piano.year },
            { label: 'Brand', value: piano.brand },
            { label: 'Finish', value: piano.finish },
            { label: 'Size', value: piano.size },
            ...(piano.serialNumber ? [{ label: 'Serial', value: `#${piano.serialNumber}` }] : []),
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col px-8 py-6 min-w-[130px]">
              <dt className="text-piano-stone/40 text-[10px] font-display tracking-[0.45em] uppercase mb-1.5">
                {label}
              </dt>
              <dd className="text-piano-black text-base font-light">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── Story & Details ── */}
      <section className="bg-piano-cream py-28 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-16 xl:gap-24">

            {/* Main content */}
            <div className="space-y-16">

              {/* Section eyebrow */}
              <div className="flex items-center gap-4 sr">
                <div className="h-px w-8 bg-piano-burgundy/60" />
                <p className="font-display text-xs tracking-[0.55em] uppercase text-piano-burgundy">
                  About This Piano
                </p>
              </div>

              {/* Title */}
              <h2
                className="font-cormorant font-light text-piano-black sr sr-d1"
                style={{ fontSize: 'clamp(3.5rem, 5.5vw, 6rem)' }}
              >
                {piano.title}
              </h2>

              {/* Description */}
              {piano.richTextDescription ? (
                <div className="text-piano-stone text-xl leading-relaxed [&_p]:mb-5 [&_h2]:font-cormorant [&_h2]:font-light [&_h2]:text-piano-black [&_h2]:text-4xl [&_h2]:mb-4 [&_h3]:font-display [&_h3]:text-piano-burgundy [&_h3]:tracking-widest [&_h3]:uppercase [&_h3]:text-xs [&_h3]:mb-3 sr sr-d2">
                  <RichText
                    data={piano.richTextDescription as DefaultTypedEditorState}
                    enableGutter={false}
                    enableProse={false}
                  />
                </div>
              ) : piano.description ? (
                <p className="text-piano-stone text-xl leading-relaxed sr sr-d2">
                  {piano.description}
                </p>
              ) : null}

              {/* Restoration */}
              {piano.restorationHistory && (
                <div className="border-l-2 border-piano-burgundy/40 pl-8 sr sr-d1">
                  <p className="font-display text-xs tracking-[0.45em] uppercase text-piano-burgundy mb-4">
                    Restoration History
                  </p>
                  <p className="text-piano-stone text-xl leading-relaxed">
                    {piano.restorationHistory}
                  </p>
                </div>
              )}

              {/* Condition Report */}
              {piano.conditionReport && (
                <div className="bg-white/80 backdrop-blur-sm border border-piano-burgundy/10 shadow-[0_2px_20px_rgba(0,0,0,0.04)] p-8 sr sr-d2">
                  <p className="font-display text-xs tracking-[0.45em] uppercase text-piano-burgundy mb-4">
                    Condition Report
                  </p>
                  <p className="text-piano-stone text-lg leading-relaxed">
                    {piano.conditionReport}
                  </p>
                </div>
              )}
            </div>

            {/* Floating glass specs sidebar */}
            <div>
              <div className="bg-white/90 backdrop-blur-xl border border-black/[0.06] shadow-[0_12px_48px_rgba(0,0,0,0.07)] p-10 lg:sticky lg:top-8 sr sr-d2">
                <div className="flex items-center gap-3 mb-7">
                  <div className="h-px w-6 bg-piano-burgundy/60" />
                  <p className="font-display text-xs tracking-[0.45em] uppercase text-piano-burgundy">
                    Specifications
                  </p>
                </div>
                <dl className="space-y-4">
                  {Object.entries(piano.specs).map(([key, val]) => (
                    <div
                      key={key}
                      className="pb-4 border-b border-black/[0.05] last:border-0 last:pb-0"
                    >
                      <dt className="text-piano-stone/50 text-[10px] font-display tracking-[0.45em] uppercase mb-1.5">
                        {key}
                      </dt>
                      <dd className="text-piano-black text-base font-light">{val}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 pt-8 border-t border-black/[0.05] space-y-3">
                  <Link
                    href="/contact"
                    className="block text-center bg-piano-black text-piano-cream px-8 py-4 font-display text-xs tracking-[0.3em] uppercase hover:bg-piano-burgundy transition-colors"
                  >
                    Get in Touch
                  </Link>
                  {displayPhone && telHref && (
                    <a
                      href={telHref}
                      className="block text-center border border-piano-stone/20 text-piano-stone/60 px-8 py-4 font-display text-xs tracking-[0.3em] uppercase hover:border-piano-burgundy hover:text-piano-burgundy transition-colors"
                    >
                      {displayPhone}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Media Carousel ── */}
      {allImages.length > 0 && (
        <PianoMediaCarousel
          images={allImages}
          title={piano.title}
          stockImageIndex={stockImageIndex}
        />
      )}

      {/* ── Inquiry Form ── */}
      <section
        id="inquiry"
        className="bg-piano-burgundy border-t border-piano-gold/10 py-28 px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="flex items-center gap-4 mb-6 sr">
              <div className="h-px w-8 bg-piano-gold/40" />
              <p className="font-display text-xs tracking-[0.55em] uppercase text-piano-gold">
                Make an Inquiry
              </p>
            </div>
            <h2
              className="font-cormorant font-light text-piano-cream sr sr-d1"
              style={{ fontSize: 'clamp(3.5rem, 5.5vw, 6rem)' }}
            >
              Ask Roger About This Piano
            </h2>
          </div>
          <PianoInquiryForm pianoTitle={piano.title} pianoSlug={piano.slug} phone={phone} />
        </div>
      </section>

      {/* ── Locations ── */}
      {locations.length > 0 && (
        <section className="py-24 px-8 bg-piano-cream">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-6 sr">
              <div className="h-px w-8 bg-piano-burgundy/60" />
              <p className="font-display text-xs tracking-[0.55em] uppercase text-piano-burgundy">
                Visit Our Showroom
              </p>
            </div>
            <h2
              className="font-cormorant font-light text-piano-black mb-12 sr sr-d1"
              style={{ fontSize: 'clamp(3rem, 4.5vw, 5rem)' }}
            >
              See It In Person
            </h2>
            <LocationTabs locations={locations} phone={phone} />
          </div>
        </section>
      )}

      <InquiryCTA pianoTitle={piano.title} variant="dark" />
    </main>
  )
}
