'use client'

import { useState } from 'react'
import { cn } from '@/utilities/ui'

type Location = {
  name: string
  streetAddress: string
  city: string
  state: string
  zip: string
  googleMapsUrl?: string | null
  id?: string | null
}

type Props = {
  locations: Location[]
  phone?: string | null
}

function buildEmbedUrl(loc: Location): string {
  const q = encodeURIComponent(`${loc.streetAddress}, ${loc.city}, ${loc.state} ${loc.zip}`)
  return `https://maps.google.com/maps?q=${q}&output=embed&hl=en`
}

export function LocationTabs({ locations, phone }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (locations.length === 0) return null

  const active = locations[activeIndex]
  if (!active) return null

  const embedUrl = buildEmbedUrl(active)
  const directionsUrl =
    active.googleMapsUrl ??
    `https://maps.google.com/?q=${encodeURIComponent(`${active.streetAddress}, ${active.city}, ${active.state} ${active.zip}`)}`

  const telHref = phone ? `tel:+1${phone.replace(/\D/g, '')}` : undefined

  return (
    <div className="border border-piano-linen overflow-hidden">
      {/* Tab row */}
      <div className="flex" role="tablist">
        {locations.map((loc, i) => (
          <button
            key={loc.id ?? i}
            role="tab"
            aria-selected={activeIndex === i}
            aria-controls={`location-panel-${i}`}
            onClick={() => setActiveIndex(i)}
            className={cn(
              'relative flex-1 px-10 py-6 font-display text-sm tracking-[0.3em] uppercase transition-all duration-200 focus:outline-none border-b-2',
              activeIndex === i
                ? 'bg-piano-burgundy text-piano-cream border-piano-burgundy'
                : 'text-piano-stone/60 hover:text-piano-stone bg-piano-linen/40 border-transparent hover:bg-piano-linen',
            )}
          >
            {activeIndex === i && (
              <span className="absolute left-5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-piano-gold" />
            )}
            {loc.name}
          </button>
        ))}
      </div>

      {/* Map + Info panel */}
      <div
        id={`location-panel-${activeIndex}`}
        role="tabpanel"
        className="grid lg:grid-cols-[1fr_420px]"
      >
        {/* Map */}
        <div className="relative overflow-hidden" style={{ minHeight: '480px' }}>
          <iframe
            key={activeIndex}
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Google Map for ${active.name} showroom location`}
          />
        </div>

        {/* Location info */}
        <div className="flex flex-col justify-between gap-10 p-12 bg-piano-burgundy">
          <div className="space-y-8">
            {/* Location name */}
            <div>
              <p className="font-display text-xs tracking-[0.45em] uppercase text-piano-gold mb-3">
                Selected Location
              </p>
              <p
                className="font-cormorant font-light text-piano-cream leading-tight"
                style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)' }}
              >
                {active.name}
              </p>
            </div>

            {/* Address */}
            <div className="border-t border-piano-cream/10 pt-7 space-y-2">
              <p className="font-display text-xs tracking-[0.35em] uppercase text-piano-cream/40 mb-3">
                Address
              </p>
              <p className="text-piano-cream text-lg leading-relaxed">{active.streetAddress}</p>
              <p className="text-piano-cream text-lg leading-relaxed">
                {active.city}, {active.state} {active.zip}
              </p>
            </div>

            {/* Phone */}
            {phone && telHref && (
              <div className="border-t border-piano-cream/10 pt-7">
                <p className="font-display text-xs tracking-[0.35em] uppercase text-piano-cream/40 mb-3">
                  Phone
                </p>
                <a
                  href={telHref}
                  className="text-piano-gold text-xl hover:text-piano-gold/80 transition-colors font-light"
                >
                  {phone}
                </a>
              </div>
            )}
          </div>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-piano-gold text-piano-black px-8 py-5 font-display text-sm tracking-[0.3em] uppercase hover:bg-piano-gold/90 transition-colors"
          >
            Get Directions →
          </a>
        </div>
      </div>
    </div>
  )
}
