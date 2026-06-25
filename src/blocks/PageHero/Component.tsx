import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import { Media as MediaComponent } from '@/components/Media'

type PageHeroBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  headingAccent?: string | null
  subtext?: string | null
  backgroundImage?: Media | string | null
  estLabel?: string | null
  bgStyle?: 'burgundy' | 'charcoal' | 'cream' | 'black' | null
  blockType: 'heroPage'
  id?: string | null
  blockName?: string | null
  disableInnerContainer?: boolean
}

// ── Static defaults (mirror the About page HERO section) ──
const DEFAULT_EYEBROW = 'Since 1980 — New England'
const DEFAULT_HEADING = "New England's Destination"
const DEFAULT_HEADING_ACCENT = 'for Rebuilt Steinway Excellence.'
const DEFAULT_SUBTEXT =
  'For over 40 years, a trusted source for fine pianos — specializing in the rebuilding and restoration of vintage Steinway & Sons instruments.'
const DEFAULT_EST_LABEL = 'Est. 1980'
const DEFAULT_BG_STYLE: 'burgundy' | 'charcoal' | 'cream' | 'black' = 'burgundy'
const DEFAULT_BG_IMAGE = '/api/media/file/IMG_8831.JPG'

const BG_CLASS: Record<'burgundy' | 'charcoal' | 'cream' | 'black', string> = {
  burgundy: 'bg-piano-burgundy',
  charcoal: 'bg-piano-charcoal',
  cream: 'bg-piano-cream',
  black: 'bg-piano-black',
}

function isMedia(val: Media | string | null | undefined): val is Media {
  return typeof val === 'object' && val !== null && 'url' in val
}

export const PageHeroBlock: React.FC<PageHeroBlockProps> = ({
  eyebrow,
  heading,
  headingAccent,
  subtext,
  backgroundImage,
  estLabel,
  bgStyle,
}) => {
  const eyebrowText = eyebrow || DEFAULT_EYEBROW
  const headingText = heading || DEFAULT_HEADING
  const accentText = headingAccent ?? DEFAULT_HEADING_ACCENT
  const subtextText = subtext || DEFAULT_SUBTEXT
  const estText = estLabel ?? DEFAULT_EST_LABEL
  const bgClass = BG_CLASS[bgStyle || DEFAULT_BG_STYLE]

  return (
    <section
      className={`relative overflow-hidden flex flex-col justify-end ${bgClass}`}
      style={{ minHeight: '82vh' }}
    >
      {/* Background image — CMS override falls back to the About hero photo */}
      <div className="absolute inset-0">
        {isMedia(backgroundImage) ? (
          <MediaComponent
            resource={backgroundImage}
            fill
            imgClassName="object-cover object-center"
            priority
          />
        ) : (
          <Image
            src={DEFAULT_BG_IMAGE}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        )}
      </div>

      {/* Gradient — heavy at bottom where text lives, lighter at top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(4,1,1,0.98) 0%, rgba(55,8,18,0.92) 55%, rgba(55,8,18,0.60) 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto w-full px-8 md:px-16 pb-20 md:pb-28">
        {/* Eyebrow */}
        {eyebrowText && (
          <div className="sr sr-d1 flex items-center gap-5 mb-8">
            <div className="h-px w-8 bg-piano-gold/50 shrink-0" />
            <p className="font-display text-[11px] tracking-[0.55em] uppercase text-piano-gold/80">
              {eyebrowText}
            </p>
          </div>
        )}

        {/* Headline */}
        <h1
          className="sr sr-d2 font-cormorant font-light text-piano-cream leading-[1.0] mb-8"
          style={{ fontSize: 'clamp(3rem, 5.2vw, 6.5rem)', maxWidth: '18ch' }}
        >
          {headingText}
          {accentText && (
            <>
              {' '}
              <span className="italic text-piano-gold/90">{accentText}</span>
            </>
          )}
        </h1>

        {/* Subtext + flanking label */}
        <div className="sr sr-d3 flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-12">
          <p
            className="text-piano-cream/55 leading-relaxed font-light"
            style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', maxWidth: '44ch' }}
          >
            {subtextText}
          </p>
          {estText && (
            <div className="flex items-center gap-4 shrink-0 pb-1">
              <div className="h-px w-10 bg-piano-gold/30" />
              <span className="font-display text-[9px] tracking-[0.55em] uppercase text-piano-gold/40">
                {estText}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
