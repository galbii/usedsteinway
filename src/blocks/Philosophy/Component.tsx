import React from 'react'
import Link from 'next/link'
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
  const headingParts = heading ? heading.split('\\n') : []
  const bodyParts = body ? body.split('\\n') : []

  return (
    <section className="relative overflow-hidden py-36 px-8" style={{ backgroundColor: C.darkBg }}>

      {/* Background image */}
      {isMedia(backgroundImage) && (
        <MediaComponent
          resource={backgroundImage}
          fill
          imgClassName="object-cover object-[center_30%]"
          priority
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
        {eyebrow && (
          <div className="sr flex items-center justify-center gap-5 mb-12">
            <div className="h-px w-10 shrink-0" style={{ backgroundColor: 'hsla(40,72%,52%,0.40)' }} />
            <span className="font-display text-[10px] tracking-[0.5em] uppercase" style={{ color: C.accent }}>
              {eyebrow}
            </span>
            <div className="h-px w-10 shrink-0" style={{ backgroundColor: 'hsla(40,72%,52%,0.40)' }} />
          </div>
        )}

        {/* Heading */}
        {headingParts.length > 0 && (
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
        )}

        {/* Body */}
        {bodyParts.length > 0 && (
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
        )}

        {/* CTAs */}
        {(primaryCta?.label || secondaryCta?.label) && (
          <div className="sr sr-d3 flex flex-col sm:flex-row items-center justify-center gap-4">
            {primaryCta?.label && primaryCta.href && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center px-10 py-4 font-display text-[11px] tracking-[0.35em] uppercase transition-opacity duration-200 hover:opacity-80"
                style={{ backgroundColor: C.accent, color: 'hsl(350, 62%, 14%)' }}
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta?.label && secondaryCta.href && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center px-10 py-4 font-display text-[11px] tracking-[0.35em] uppercase transition-opacity duration-200 hover:opacity-60"
                style={{ border: `1px solid ${C.borderDark}`, color: 'rgba(245,235,220,0.70)' }}
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}

      </div>
    </section>
  )
}
