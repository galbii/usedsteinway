import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import { Media as MediaComponent } from '@/components/Media'

type PhilosophyBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  body?: string | null
  backgroundImage?: Media | string | null
  primaryCta?: { label?: string | null; href?: string | null } | null
  secondaryCta?: { label?: string | null; href?: string | null } | null
  blockType: 'philosophy'
  id?: string | null
  blockName?: string | null
  disableInnerContainer?: boolean
}

const C = {
  accent:     'hsl(40, 72%, 52%)',
  darkBg:     'hsl(350, 62%, 26%)',
  borderDark: 'hsl(350, 45%, 38%)',
  ivory:      'hsl(36, 22%, 96%)',
  ivoryMuted: 'rgba(245,235,220,0.50)',
}

// ── Static defaults (mirror UsedSteinwaysHomePage.tsx Philosophy section) ──
const DEFAULT_EYEBROW = 'Our Philosophy'
const DEFAULT_HEADING = 'People + Pianos\\n= Music'
const DEFAULT_BODY =
  'Over 45 years of expertise.\\nA trade-up policy that lets you grow.\\nTwo showrooms with over two hundred pianos to match individual preferences.'
const DEFAULT_PRIMARY_LABEL = 'Our Story'
const DEFAULT_PRIMARY_HREF = '/about'
const DEFAULT_SECONDARY_LABEL = 'Browse Pianos'
const DEFAULT_SECONDARY_HREF = '/pianos'
const DEFAULT_BG_IMAGE = '/Roger-at-work-2-for-web.jpg'

function isMedia(val: Media | string | null | undefined): val is Media {
  return typeof val === 'object' && val !== null && 'url' in val
}

export const PhilosophyBlock: React.FC<PhilosophyBlockProps> = ({
  eyebrow,
  heading,
  body,
  backgroundImage,
  primaryCta,
  secondaryCta,
}) => {
  const eyebrowText = eyebrow || DEFAULT_EYEBROW
  const headingParts = (heading || DEFAULT_HEADING).split('\\n')
  const bodyParts = (body || DEFAULT_BODY).split('\\n')

  const primaryLabel = primaryCta?.label || DEFAULT_PRIMARY_LABEL
  const primaryHref = primaryCta?.href || DEFAULT_PRIMARY_HREF
  const secondaryLabel = secondaryCta?.label || DEFAULT_SECONDARY_LABEL
  const secondaryHref = secondaryCta?.href || DEFAULT_SECONDARY_HREF

  return (
    <section className="relative overflow-hidden py-36 px-8" style={{ backgroundColor: C.darkBg }}>

      {/* Background image — CMS override falls back to the static homepage photo */}
      {isMedia(backgroundImage) ? (
        <MediaComponent
          resource={backgroundImage}
          fill
          imgClassName="object-cover object-[center_30%]"
          priority
        />
      ) : (
        <Image
          src={DEFAULT_BG_IMAGE}
          alt=""
          fill
          className="object-cover object-[center_30%]"
          sizes="100vw"
        />
      )}

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: 'hsla(350, 62%, 14%, 0.94)' }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-3xl mx-auto text-center">

        {/* Eyebrow with flanking gold lines */}
        <div className="sr flex items-center justify-center gap-5 mb-12">
          <div className="h-px w-10 shrink-0" style={{ backgroundColor: 'hsla(40,72%,52%,0.40)' }} />
          <span className="font-display text-[10px] tracking-[0.5em] uppercase" style={{ color: C.accent }}>
            {eyebrowText}
          </span>
          <div className="h-px w-10 shrink-0" style={{ backgroundColor: 'hsla(40,72%,52%,0.40)' }} />
        </div>

        {/* Heading */}
        <h2
          className="sr sr-d1 font-light leading-[1.05] mb-8"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(3rem, 6vw, 6.5rem)',
            color: C.ivory,
          }}
        >
          {headingParts.map((part, i) => (
            <React.Fragment key={i}>
              {part}
              {i < headingParts.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>

        {/* Body */}
        <p
          className="sr sr-d2 leading-loose mx-auto mb-14"
          style={{ fontSize: '1.125rem', color: C.ivoryMuted, maxWidth: '42ch' }}
        >
          {bodyParts.map((part, i) => (
            <React.Fragment key={i}>
              {part}
              {i < bodyParts.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>

        {/* CTAs */}
        <div className="sr sr-d3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center px-10 py-4 font-display text-[11px] tracking-[0.35em] uppercase transition-opacity duration-200 hover:opacity-80"
            style={{ backgroundColor: C.accent, color: 'hsl(350, 62%, 14%)' }}
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center px-10 py-4 font-display text-[11px] tracking-[0.35em] uppercase transition-opacity duration-200 hover:opacity-60"
            style={{ border: `1px solid ${C.borderDark}`, color: 'rgba(245,235,220,0.70)' }}
          >
            {secondaryLabel}
          </Link>
        </div>

      </div>
    </section>
  )
}
