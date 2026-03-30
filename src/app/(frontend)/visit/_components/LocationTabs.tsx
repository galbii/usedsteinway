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
}

function buildEmbedUrl(loc: Location): string {
  const q = encodeURIComponent(`${loc.streetAddress}, ${loc.city}, ${loc.state} ${loc.zip}`)
  return `https://maps.google.com/maps?q=${q}&output=embed&hl=en`
}

export function LocationTabs({ locations }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (locations.length === 0) return null

  const active = locations[activeIndex]
  if (!active) return null

  const embedUrl = buildEmbedUrl(active)
  const directionsUrl =
    active.googleMapsUrl ??
    `https://maps.google.com/?q=${encodeURIComponent(`${active.streetAddress}, ${active.city}, ${active.state} ${active.zip}`)}`

  return (
    <div>
      {/* Tab row */}
      <div className="flex border-b border-piano-linen mb-0">
        {locations.map((loc, i) => (
          <button
            key={loc.id ?? i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              'relative px-8 py-4 font-display text-[11px] tracking-[0.35em] uppercase transition-colors focus:outline-none',
              activeIndex === i
                ? 'text-piano-gold border-b-2 border-piano-gold -mb-px bg-transparent'
                : 'text-piano-stone/60 hover:text-piano-stone border-b-2 border-transparent -mb-px',
            )}
          >
            {loc.name}
          </button>
        ))}
      </div>

      {/* Map + Info panel */}
      <div className="grid lg:grid-cols-[1fr_340px]">
        {/* Map */}
        <div className="relative overflow-hidden" style={{ minHeight: '420px' }}>
          <iframe
            key={activeIndex}
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map — ${active.name} showroom`}
          />
        </div>

        {/* Location info */}
        <div className="bg-piano-black p-8 flex flex-col justify-between gap-8">
          <div>
            <p className="font-display text-[10px] tracking-[0.45em] uppercase text-piano-gold mb-6">
              {active.name} Location
            </p>
            <div className="space-y-5">
              <div>
                <p className="font-display text-[10px] tracking-[0.3em] uppercase text-piano-silver/40 mb-1">
                  Address
                </p>
                <p className="text-piano-cream text-base leading-relaxed">
                  {active.streetAddress}
                  <br />
                  {active.city}, {active.state} {active.zip}
                </p>
              </div>
            </div>
          </div>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-piano-gold text-piano-gold px-6 py-3.5 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-gold/10 transition-colors"
          >
            Get Directions →
          </a>
        </div>
      </div>
    </div>
  )
}
