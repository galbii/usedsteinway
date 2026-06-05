'use client'

import { useRef, useState } from 'react'
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
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  if (locations.length === 0) return null

  const active = locations[activeIndex]
  if (!active) return null

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const count = locations.length
    let next: number | null = null

    if (e.key === 'ArrowRight') next = (activeIndex + 1) % count
    else if (e.key === 'ArrowLeft') next = (activeIndex - 1 + count) % count
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = count - 1

    if (next !== null) {
      e.preventDefault()
      setActiveIndex(next)
      tabRefs.current[next]?.focus()
    }
  }

  const embedUrl = buildEmbedUrl(active)
  const directionsUrl =
    active.googleMapsUrl ??
    `https://maps.google.com/?q=${encodeURIComponent(`${active.streetAddress}, ${active.city}, ${active.state} ${active.zip}`)}`

  const telHref = phone ? `tel:+1${phone.replace(/\D/g, '')}` : undefined

  return (
    <div className="border border-piano-linen overflow-hidden">
      {/* Tab row */}
      <div className="flex" role="tablist" onKeyDown={handleKeyDown}>
        {locations.map((loc, i) => (
          <button
            key={loc.id ?? i}
            ref={(el) => {
              tabRefs.current[i] = el
            }}
            role="tab"
            aria-selected={activeIndex === i}
            aria-controls={`location-panel-${i}`}
            tabIndex={activeIndex === i ? 0 : -1}
            onClick={() => setActiveIndex(i)}
            className={cn(
              'relative flex-1 px-4 sm:px-10 py-4 sm:py-6 font-display text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-piano-gold focus-visible:ring-inset border-b-[3px]',
              activeIndex === i
                ? 'bg-piano-burgundy text-piano-cream border-piano-gold'
                : 'bg-piano-black text-piano-cream hover:bg-piano-charcoal border-piano-black',
            )}
          >
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
        <div className="relative overflow-hidden min-h-[320px] sm:min-h-[400px] lg:min-h-[480px]">
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
        <div className="flex flex-col justify-between gap-8 lg:gap-10 p-6 sm:p-8 lg:p-12 bg-piano-burgundy">
          <div className="space-y-6 sm:space-y-8">
            {/* Location name */}
            <div>
              <p className="font-display text-xs tracking-[0.45em] uppercase text-piano-gold mb-3">
                Selected Location
              </p>
              <p
                className="font-cormorant font-light text-piano-cream leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 2.8rem)' }}
              >
                {active.name}
              </p>
            </div>

            {/* Address */}
            <div className="border-t border-piano-cream/10 pt-5 sm:pt-7 space-y-1.5 sm:space-y-2">
              <p className="font-display text-xs tracking-[0.35em] uppercase text-piano-cream/40 mb-2 sm:mb-3">
                Address
              </p>
              <p className="text-piano-cream text-base sm:text-lg leading-relaxed">{active.streetAddress}</p>
              <p className="text-piano-cream text-base sm:text-lg leading-relaxed">
                {active.city}, {active.state} {active.zip}
              </p>
            </div>

            {/* Phone */}
            {phone && telHref && (
              <div className="border-t border-piano-cream/10 pt-5 sm:pt-7">
                <p className="font-display text-xs tracking-[0.35em] uppercase text-piano-cream/40 mb-2 sm:mb-3">
                  Phone
                </p>
                <a
                  href={telHref}
                  className="text-piano-gold text-lg sm:text-xl hover:text-piano-gold/80 transition-colors font-light"
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
            className="inline-flex items-center justify-center gap-2 bg-piano-gold text-piano-black px-6 sm:px-8 py-4 sm:py-5 font-display text-xs sm:text-sm tracking-[0.3em] uppercase hover:bg-piano-gold/90 transition-colors"
          >
            Get Directions →
          </a>
        </div>
      </div>
    </div>
  )
}
