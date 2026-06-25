import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import { Media as MediaComponent } from '@/components/Media'

type FeatureItem = {
  label?: string | null
  detail?: string | null
  id?: string | null
}

type TwoColumnBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  body?: string | null
  accentSide?: 'left' | 'right' | null
  accentType?: 'image' | 'pullQuote' | 'featureList' | 'none' | null
  image?: Media | string | null
  quote?: string | null
  quoteAttribution?: string | null
  features?: FeatureItem[] | null
  bgStyle?: 'cream' | 'charcoal' | 'burgundy' | 'black' | null
  blockType: 'twoColumn'
  id?: string | null
  blockName?: string | null
  disableInnerContainer?: boolean
}

// ── Generic defaults so an empty block still renders cleanly ──
const DEFAULT_EYEBROW = 'Our Story'
const DEFAULT_HEADING = 'More than a showroom.'
const DEFAULT_BODY =
  "Founded in 1980 by master technician Roger Shaffer, Roger's Piano quickly earned a reputation for meticulous Steinway rebuilding and deep technical expertise.\n\nThat tradition continues today."
const DEFAULT_QUOTE =
  'Authenticity over replacement — preserving what makes a great Steinway great.'
const DEFAULT_QUOTE_ATTRIBUTION = 'Restoration Philosophy'
const DEFAULT_IMAGE = '/api/media/file/IMG_8832.JPG'

const DEFAULT_FEATURES: FeatureItem[] = [
  { label: 'Performance', detail: 'Meets or exceeds performance expectations.' },
  { label: 'Design Integrity', detail: 'Retains the design integrity of the original build.' },
  { label: 'Concert Quality', detail: 'Delivers a refined, concert-quality playing experience.' },
]

const BG_CLASS: Record<NonNullable<TwoColumnBlockProps['bgStyle']>, string> = {
  cream: 'bg-piano-cream',
  charcoal: 'bg-piano-charcoal',
  burgundy: 'bg-piano-burgundy',
  black: 'bg-piano-black',
}

function isMedia(val: Media | string | null | undefined): val is Media {
  return typeof val === 'object' && val !== null && 'url' in val
}

export const TwoColumnBlock: React.FC<TwoColumnBlockProps> = ({
  eyebrow,
  heading,
  body,
  accentSide,
  accentType,
  image,
  quote,
  quoteAttribution,
  features,
  bgStyle,
}) => {
  const eyebrowText = eyebrow || DEFAULT_EYEBROW
  const headingParts = (heading || DEFAULT_HEADING).split('\n')
  const bodyParts = (body || DEFAULT_BODY).split('\n\n').filter((p) => p.trim().length > 0)

  const bg = bgStyle || 'cream'
  const type = accentType || 'image'
  const accentOnLeft = (accentSide || 'right') === 'left'
  const isDark = bg !== 'cream'

  const headingColor = isDark ? 'text-piano-cream' : 'text-piano-black'
  const bodyColor = isDark ? 'text-piano-cream/85' : 'text-piano-stone'

  // Order: accent column sits on the chosen side; prose takes the other.
  const proseOrder = accentOnLeft ? 'order-1 lg:order-2' : 'order-1'
  const accentOrder = accentOnLeft ? 'order-2 lg:order-1' : 'order-2'

  // Feature lists align to start; image/quote align centered (mirrors source sections).
  const itemsAlign = type === 'featureList' ? 'items-start' : 'items-center'

  // ── Prose column ──
  const prose = (
    <div className={proseOrder}>
      <p className="sr font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-5">
        {eyebrowText}
      </p>
      <h2
        className={`sr sr-d1 font-cormorant font-light leading-snug mb-10 ${headingColor}`}
        style={{ fontSize: 'clamp(2.8rem, 4.5vw, 5.2rem)' }}
      >
        {headingParts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < headingParts.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h2>
      <div className={`space-y-6 ${bodyColor}`}>
        {bodyParts.map((part, i) => (
          <p key={i} className={`sr sr-d${i + 2} text-[1.0625rem] leading-[1.85]`}>
            {part}
          </p>
        ))}
      </div>
    </div>
  )

  // ── Full-width prose (no accent column) ──
  if (type === 'none') {
    return (
      <section className={`py-28 md:py-36 px-8 ${BG_CLASS[bg]}`}>
        <div className="max-w-3xl mx-auto">
          <p className="sr font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-5">
            {eyebrowText}
          </p>
          <h2
            className={`sr sr-d1 font-cormorant font-light leading-snug mb-10 ${headingColor}`}
            style={{ fontSize: 'clamp(2.8rem, 4.5vw, 5.2rem)' }}
          >
            {headingParts.map((part, i) => (
              <React.Fragment key={i}>
                {part}
                {i < headingParts.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <div className={`space-y-6 ${bodyColor}`}>
            {bodyParts.map((part, i) => (
              <p key={i} className={`sr sr-d${i + 2} text-[1.0625rem] leading-[1.85]`}>
                {part}
              </p>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ── Accent column ──
  let accent: React.ReactNode

  if (type === 'pullQuote') {
    const quoteText = quote || DEFAULT_QUOTE
    const attribution = quoteAttribution || DEFAULT_QUOTE_ATTRIBUTION
    accent = (
      <div className={`sr-left ${accentOrder}`}>
        <div className="relative border-l-2 border-piano-gold/50 pl-10 py-4">
          <p
            className="font-cormorant font-light italic text-piano-cream leading-[1.25]"
            style={{ fontSize: 'clamp(2.6rem, 4.2vw, 4.4rem)' }}
          >
            {quoteText}
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px w-8 bg-piano-gold/50" />
            <span className="font-display text-[10px] tracking-[0.45em] uppercase text-piano-silver/70">
              {attribution}
            </span>
          </div>
        </div>
      </div>
    )
  } else if (type === 'featureList') {
    const rows =
      features && features.length > 0
        ? features
        : DEFAULT_FEATURES
    accent = (
      <div className={`sr-right space-y-0 lg:pt-24 ${accentOrder}`}>
        {rows.map((row, i) => (
          <div
            key={row.id || i}
            className="border-t border-piano-linen py-8 last:border-b group"
          >
            <div className="flex items-start gap-6">
              <div className="w-1.5 h-1.5 rounded-full bg-piano-gold mt-2.5 shrink-0" />
              <div>
                <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-2">
                  {row.label || ''}
                </p>
                <p className="text-piano-stone text-[1rem] leading-[1.8]">{row.detail || ''}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  } else {
    // image
    accent = (
      <div className={`sr-right relative ${accentOrder}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-piano-charcoal">
          {isMedia(image) ? (
            <MediaComponent resource={image} fill imgClassName="object-cover" />
          ) : (
            <Image
              src={DEFAULT_IMAGE}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <section className={`py-28 md:py-36 px-8 ${BG_CLASS[bg]}`}>
      <div className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 ${itemsAlign}`}>
        {prose}
        {accent}
      </div>
    </section>
  )
}
