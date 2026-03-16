'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import type { Piano } from '@/types/piano'
import { ConditionBadge } from './ConditionBadge'
import { InquiryCTA } from './InquiryCTA'
import { cn } from '@/utilities/ui'

interface PianoDetailV2Props {
  piano: Piano
}

export function PianoDetailV2({ piano }: PianoDetailV2Props) {
  const [activeImage, setActiveImage] = useState(0)

  return (
    <main className="min-h-screen bg-piano-cream">
      {/* ── Full-Screen Gallery Header ── */}
      <section className="bg-piano-black">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-8 pt-8">
          <nav className="flex items-center gap-2 text-piano-cream/50 font-display text-xs tracking-widest uppercase mb-6">
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
              <div className="relative aspect-[16/10] overflow-hidden bg-piano-charcoal">
                {piano.imageUrls[activeImage] && (
                  <Image
                    src={piano.imageUrls[activeImage] ?? ''}
                    alt={piano.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                )}
                <div className="absolute bottom-4 right-4 bg-piano-black/70 px-3 py-1.5 text-piano-cream/70 font-display text-xs tracking-widest">
                  {activeImage + 1} / {piano.imageUrls.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {piano.imageUrls.length > 1 && (
                <div className="flex gap-2 mt-3 pb-6">
                  {piano.imageUrls.map((url, i) => (
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
                  <span className="bg-piano-gold/20 text-piano-gold text-xs font-display tracking-widest uppercase px-2.5 py-0.5 rounded-full border border-piano-gold/30">
                    Featured
                  </span>
                )}
              </div>
              <p className="font-display text-xs tracking-[0.25em] uppercase text-piano-gold mt-4 mb-2">
                {piano.brand} · {piano.year}
              </p>
              <h1
                className="text-3xl font-medium text-piano-cream leading-snug mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {piano.model}
              </h1>
              <p className="text-piano-silver text-sm mb-4">
                {piano.finish} · {piano.size}
              </p>

              <div className="border-t border-piano-gold/20 pt-5 mb-6">
                <p className="text-piano-silver text-xs font-display tracking-widest uppercase mb-1">Asking Price</p>
                <p
                  className="text-3xl font-semibold text-piano-cream"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {piano.priceDisplay}
                </p>
              </div>

              {/* 3 CTAs */}
              <div className="flex flex-col gap-3">
                <Link
                  href={`/contact?subject=${encodeURIComponent(`Schedule Viewing: ${piano.title}`)}`}
                  className="w-full text-center bg-piano-burgundy text-white py-4 font-display text-xs tracking-[0.2em] uppercase hover:bg-piano-burgundy/90 transition-colors"
                >
                  Schedule a Viewing
                </Link>
                <Link
                  href={`/contact?subject=${encodeURIComponent(`Request Details: ${piano.title}`)}`}
                  className="w-full text-center border border-piano-gold text-piano-gold py-4 font-display text-xs tracking-[0.2em] uppercase hover:bg-piano-gold/10 transition-colors"
                >
                  Request More Details
                </Link>
                <a
                  href="tel:+16035550123"
                  className="w-full text-center border border-piano-cream/20 text-piano-cream/70 py-4 font-display text-xs tracking-[0.2em] uppercase hover:border-piano-cream/50 hover:text-piano-cream transition-colors"
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
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-14">
              {/* Description */}
              <div>
                <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-burgundy mb-4">About This Instrument</p>
                <h2
                  className="text-2xl font-medium text-piano-black mb-5"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {piano.title}
                </h2>
                <p className="text-gray-700 leading-loose text-base">{piano.description}</p>
              </div>

              {/* Provenance */}
              {piano.provenance && (
                <div className="border-l-2 border-piano-gold pl-8">
                  <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-gold mb-3">Provenance</p>
                  <p className="text-gray-700 leading-loose italic">{piano.provenance}</p>
                </div>
              )}

              {/* Restoration */}
              {piano.restorationHistory && (
                <div>
                  <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-burgundy mb-3">Restoration History</p>
                  <p className="text-gray-700 leading-loose">{piano.restorationHistory}</p>
                </div>
              )}

              {/* Condition Report */}
              {piano.conditionReport && (
                <div className="bg-piano-black/5 p-8 border border-piano-gold/10">
                  <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-burgundy mb-4">Condition Report</p>
                  <p className="text-gray-700 leading-loose text-sm">{piano.conditionReport}</p>
                </div>
              )}
            </div>

            {/* Specs Sidebar */}
            <div className="space-y-8">
              <div className="bg-piano-black p-8">
                <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-gold mb-6">Specifications</p>
                <dl className="space-y-4">
                  {Object.entries(piano.specs).map(([key, val]) => (
                    <div key={key} className="pb-4 border-b border-piano-gold/10 last:border-0 last:pb-0">
                      <dt className="text-piano-silver text-xs font-display tracking-wide uppercase mb-1">{key}</dt>
                      <dd className="text-piano-cream text-sm font-medium">{val}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Quick Actions */}
              <div className="border border-piano-gold/20 p-6">
                <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-burgundy mb-4">Quick Contact</p>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="text-center bg-piano-burgundy text-white py-3 font-display text-xs tracking-widest uppercase hover:bg-piano-burgundy/90 transition-colors"
                  >
                    Contact Roger
                  </Link>
                  <a
                    href="tel:+16035550123"
                    className="text-center border border-piano-black/20 text-piano-black py-3 font-display text-xs tracking-widest uppercase hover:border-piano-burgundy hover:text-piano-burgundy transition-colors"
                  >
                    (603) 555-0123
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InquiryCTA pianoTitle={piano.title} variant="dark" />
    </main>
  )
}
