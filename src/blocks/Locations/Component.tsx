import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { LocationTabs } from '@/components/piano/LocationTabs'
import type { SiteSetting } from '@/payload-types'

type LocationsBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  blockType: 'locations'
  id?: string | null
  blockName?: string | null
  disableInnerContainer?: boolean
}

// Local palette — keep colors consistent with the homepage section.
const C = {
  bg:     'hsl(36, 22%, 96%)',
  accent: 'hsl(40, 72%, 52%)',
  muted:  'hsl(350, 5%, 46%)',
  border: 'hsl(36, 18%, 89%)',
}

export const LocationsBlock: React.FC<LocationsBlockProps> = async ({ eyebrow, heading }) => {
  const siteSettings = (await getCachedGlobal('site-settings', 0)()) as SiteSetting

  const locations = siteSettings?.locations ?? []
  const phone = siteSettings?.contactInfo?.phone ?? undefined

  if (!locations.length) return null

  const eyebrowText = eyebrow?.trim() || 'Our Locations'
  const headingText = heading?.trim() ?? ''

  return (
    <section className="px-8 py-24" style={{ backgroundColor: C.bg }}>
      <div className="max-w-7xl mx-auto">
        <div className="sr flex items-center gap-5 mb-14">
          <div className="h-px w-10 shrink-0" style={{ backgroundColor: C.accent }} />
          <span
            className="font-display text-[10px] tracking-[0.5em] uppercase shrink-0"
            style={{ color: C.muted }}
          >
            {eyebrowText}
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: C.border }} />
        </div>

        {headingText && (
          <h2
            className="sr font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-12"
            style={{ color: 'hsl(220, 13%, 13%)' }}
          >
            {headingText}
          </h2>
        )}

        <div className="sr sr-d1">
          <LocationTabs locations={locations} phone={phone ?? undefined} />
        </div>
      </div>
    </section>
  )
}
