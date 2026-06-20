import React from 'react'
import Link from 'next/link'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { SiteSetting } from '@/payload-types'

type FinalCtaBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  body?: string | null
  primaryCta?: { label?: string | null; href?: string | null } | null
  secondaryCta?: { label?: string | null; href?: string | null } | null
  phoneSource?: ('siteSettings' | 'custom') | null
  phoneOverride?: string | null
  blockType: 'finalCta'
  id?: string | null
  blockName?: string | null
  disableInnerContainer?: boolean
}

const C = {
  bg:     'hsl(36, 22%, 96%)',
  accent: 'hsl(40, 72%, 52%)',
  text:   'hsl(350, 12%, 11%)',
  muted:  'hsl(350, 5%, 46%)',
  border: 'hsl(36, 18%, 89%)',
}

// ── Static defaults (mirror UsedSteinwaysHomePage.tsx FinalCta section) ──
const DEFAULT_EYEBROW = 'Burlington & Natick Showrooms'
const DEFAULT_HEADING = 'Begin Your\\nSearch'
const DEFAULT_BODY =
  "Tell us what you're looking for — or come hear the pianos yourself. Every conversation starts with listening."
const DEFAULT_PRIMARY_LABEL = 'Get in Touch'
const DEFAULT_PRIMARY_HREF = '/contact'
const DEFAULT_SECONDARY_LABEL = 'Browse Inventory'
const DEFAULT_SECONDARY_HREF = '/pianos'
const DEFAULT_PHONE = '508-545-0766'

export const FinalCtaBlock: React.FC<FinalCtaBlockProps> = async ({
  eyebrow,
  heading,
  body,
  primaryCta,
  secondaryCta,
  phoneSource,
  phoneOverride,
}) => {
  let phone: string | null = null
  if (phoneSource === 'custom') {
    phone = phoneOverride?.trim() || null
  } else {
    try {
      const siteSettings = (await getCachedGlobal('site-settings', 0)()) as SiteSetting | null
      phone = siteSettings?.contactInfo?.phone ?? null
    } catch {
      phone = null
    }
  }
  // Match the static homepage which always renders a phone, defaulting to 508-545-0766.
  phone = phone || DEFAULT_PHONE

  const eyebrowText = eyebrow || DEFAULT_EYEBROW
  const headingParts = (heading || DEFAULT_HEADING).split('\\n')
  const bodyText = body || DEFAULT_BODY

  const primaryLabel = primaryCta?.label || DEFAULT_PRIMARY_LABEL
  const primaryHref = primaryCta?.href || DEFAULT_PRIMARY_HREF
  const secondaryLabel = secondaryCta?.label || DEFAULT_SECONDARY_LABEL
  const secondaryHref = secondaryCta?.href || DEFAULT_SECONDARY_HREF

  return (
    <section className="py-36 px-8" style={{ backgroundColor: C.bg }}>
      <div className="max-w-3xl mx-auto text-center">

        <div className="sr flex items-center justify-center gap-5 mb-12">
          <div className="h-px w-10" style={{ backgroundColor: 'hsla(40, 72%, 52%, 0.38)' }} />
          <span
            className="font-display text-[10px] tracking-[0.48em] uppercase"
            style={{ color: C.muted }}
          >
            {eyebrowText}
          </span>
          <div className="h-px w-10" style={{ backgroundColor: 'hsla(40, 72%, 52%, 0.38)' }} />
        </div>

        <h2
          className="sr sr-d1 font-light leading-[1.0] mb-8"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(3.5rem, 7vw, 7.5rem)',
            color: C.text,
          }}
        >
          {headingParts.map((part, i) => (
            <React.Fragment key={i}>
              {part}
              {i < headingParts.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>

        <p
          className="sr sr-d2 text-lg leading-relaxed max-w-[36ch] mx-auto mb-14"
          style={{ color: C.muted }}
        >
          {bodyText}
        </p>

        <div className="sr sr-d3 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center px-12 py-4 font-display text-[11px] tracking-[0.3em] uppercase transition-opacity duration-200 hover:opacity-80"
            style={{ backgroundColor: C.text, color: C.bg }}
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center px-12 py-4 font-display text-[11px] tracking-[0.3em] uppercase transition-opacity duration-200 hover:opacity-70"
            style={{ border: `1px solid ${C.border}`, color: C.text }}
          >
            {secondaryLabel}
          </Link>
        </div>

        <p
          className="mt-10 font-display text-sm tracking-wide"
          style={{ color: C.muted }}
        >
          or call/text{' '}
          <a
            href={`tel:+1${phone.replace(/\D/g, '')}`}
            className="transition-opacity hover:opacity-70"
            style={{ color: C.text }}
          >
            {phone}
          </a>
        </p>
      </div>
    </section>
  )
}
