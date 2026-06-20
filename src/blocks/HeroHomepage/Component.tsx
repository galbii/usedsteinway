import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import { Media as MediaComponent } from '@/components/Media'
import { queryShowroomPhotos, querySteinwayPhotos } from '@/lib/payload/media'
import { HeroImageCycler } from './Component.client'

// Static homepage defaults — used when a CMS field is empty (overwrite system).
const DEFAULTS = {
  eyebrow: 'Est. 1980 · Massachusetts',
  heading: 'UsedSteinways',
  subLabel: 'Quality Instruments · Expert Hands',
  tagline:
    'Every piano personally evaluated by Roger, a master piano technician with over 45 years of experience.',
  primaryCta: { label: 'Browse Collection', href: '/pianos' },
  secondaryCta: { label: 'Get in Touch', href: '/contact' },
  stats: [
    { number: '45+', label: 'Years' },
    { number: '20+', label: 'Steinways' },
  ],
}

type HeroHomepageBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  subLabel?: string | null
  tagline?: string | null
  logoImage?: Media | string | null
  heroImages?: Array<{ image: Media | string | null; id?: string | null }> | null
  stats?: Array<{ number: string; label: string; id?: string | null }> | null
  primaryCta?: { label?: string | null; href?: string | null } | null
  secondaryCta?: { label?: string | null; href?: string | null } | null
  blockType: 'heroHomepage'
  id?: string | null
  blockName?: string | null
  disableInnerContainer?: boolean
}

const C = {
  bg:          'hsl(36, 22%, 96%)',
  darkBg:      'hsl(350, 62%, 26%)',
  accent:      'hsl(40, 72%, 52%)',
  text:        'hsl(350, 12%, 11%)',
  muted:       'hsl(350, 5%, 46%)',
  border:      'hsl(36, 18%, 89%)',
  ivory:       'hsl(36, 22%, 96%)',
}

function isMedia(val: Media | string | null | undefined): val is Media {
  return typeof val === 'object' && val !== null && 'url' in val
}

export const HeroHomepageBlock = async ({
  eyebrow,
  heading,
  subLabel,
  tagline,
  logoImage,
  heroImages,
  stats,
  primaryCta,
  secondaryCta,
}: HeroHomepageBlockProps) => {
  // Copy falls back to the static homepage values when empty.
  const eyebrowText = eyebrow || DEFAULTS.eyebrow
  const headingText = heading || DEFAULTS.heading
  const subLabelText = subLabel || DEFAULTS.subLabel
  const taglineText = tagline || DEFAULTS.tagline
  const primary = {
    label: primaryCta?.label || DEFAULTS.primaryCta.label,
    href: primaryCta?.href || DEFAULTS.primaryCta.href,
  }
  const secondary = {
    label: secondaryCta?.label || DEFAULTS.secondaryCta.label,
    href: secondaryCta?.href || DEFAULTS.secondaryCta.href,
  }
  const resolvedStats = stats && stats.length > 0 ? stats : DEFAULTS.stats

  // Images: admin-supplied array wins; otherwise mirror the static hero's live
  // source — shuffled showroom + steinway photos — then the single Roger fallback.
  const adminHeroImages: Media[] = (heroImages ?? [])
    .map((item) => item.image)
    .filter(isMedia)

  let resolvedHeroImages: Media[] = adminHeroImages
  if (resolvedHeroImages.length === 0) {
    const [showroomPhotos, steinwayPhotos] = await Promise.all([
      queryShowroomPhotos(18),
      querySteinwayPhotos(18),
    ])
    resolvedHeroImages = [...showroomPhotos, ...steinwayPhotos].sort(() => Math.random() - 0.5)
  }

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: C.ivory, minHeight: '100svh' }}
    >
      {/* Warm radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 20% 50%, hsl(36, 42%, 90%) 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 lg:grid lg:grid-cols-[58%_42%] min-h-[100svh]">

        {/* LEFT COLUMN */}
        <div
          className="flex flex-col justify-center min-w-0 overflow-hidden px-10 md:px-16 xl:px-24 py-28 lg:py-20"
          style={{ borderRight: `1px solid hsla(40, 72%, 52%, 0.16)` }}
        >
          {/* Eyebrow overline */}
          <div
            className="flex items-center gap-5 mb-14"
            style={{ animation: 'reveal-left 0.9s cubic-bezier(0.16,1,0.3,1) 0.05s both' }}
          >
            <div
              className="h-px shrink-0"
              style={{
                width: '2.5rem',
                backgroundColor: C.accent,
                animation: 'scale-x-in 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both',
                transformOrigin: 'left',
              }}
            />
            <span className="font-display text-[11px] tracking-[0.55em] uppercase" style={{ color: C.muted }}>
              {eyebrowText}
            </span>
          </div>

          {/* Logo + wordmark */}
          <div className="mb-8" style={{ animation: 'section-reveal 1s cubic-bezier(0.16,1,0.3,1) 0.12s both' }}>
            {isMedia(logoImage) ? (
              <div
                className="mb-8 flex justify-center"
                style={{ animation: 'float-badge 6s ease-in-out 1.2s infinite' }}
              >
                <MediaComponent resource={logoImage} imgClassName="w-[110px] h-[110px] object-contain" priority />
              </div>
            ) : (
              <div className="mb-8 flex justify-center">
                <Image
                  src="/UsedSteinway.png"
                  alt="UsedSteinways monogram"
                  width={110}
                  height={110}
                  priority
                  style={{ animation: 'float-badge 6s ease-in-out 1.2s infinite' }}
                />
              </div>
            )}
            <h1
              className="leading-[0.90]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(4rem, 7.8vw, 8.5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: C.text,
                letterSpacing: '-0.015em',
                animation: 'reveal-left 1s cubic-bezier(0.16,1,0.3,1) 0.22s both',
              }}
            >
              {headingText}
            </h1>
          </div>

          {/* Gold sub-label */}
          <p
            className="font-display text-[11px] tracking-[0.50em] uppercase mb-12"
            style={{ color: C.accent, animation: 'fade-up 0.8s ease-out 0.36s both' }}
          >
            {subLabelText}
          </p>

          {/* Tagline */}
          <p
            className="text-xl leading-[1.75] mb-14"
            style={{
              color: C.muted,
              maxWidth: '34ch',
              animation: 'reveal-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.46s both',
            }}
          >
            {taglineText}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            style={{ animation: 'fade-up 0.8s ease-out 0.58s both' }}
          >
            <Link
              href={primary.href}
              className="group relative inline-flex items-center justify-center overflow-hidden font-display text-[13px] tracking-[0.38em] uppercase transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]"
              style={{
                backgroundColor: C.darkBg,
                color: C.ivory,
                padding: '1.25rem 3.2rem',
                boxShadow: `0 4px 24px hsla(350,62%,14%,0.20)`,
              }}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"
                style={{ backgroundColor: C.accent }}
                aria-hidden
              />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[hsl(350,62%,14%)]">
                {primary.label}
              </span>
            </Link>
            <Link
              href={secondary.href}
              className="inline-flex items-center justify-center font-display text-[13px] tracking-[0.38em] uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.99]"
              style={{ border: `1.5px solid ${C.text}`, color: C.text, padding: '1.2rem 2.8rem' }}
            >
              {secondary.label}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-start justify-center pt-10 w-full" style={{ borderTop: `1px solid ${C.border}` }}>
            {resolvedStats.map((stat, i) => (
                <div
                  key={i}
                  className="flex items-stretch"
                  style={{ animation: `counter-up 0.7s cubic-bezier(0.16,1,0.3,1) ${(0.68 + i * 0.12).toFixed(2)}s both` }}
                >
                  {i > 0 && (
                    <div className="w-px mx-8 self-stretch" style={{ backgroundColor: C.border }} />
                  )}
                  <div>
                    <p
                      className="font-light leading-none"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.8rem, 3.5vw, 4rem)', color: C.text }}
                    >
                      {stat.number.endsWith('+') ? stat.number : `${stat.number}+`}
                    </p>
                    <p className="font-display text-[10px] tracking-[0.42em] uppercase mt-2" style={{ color: C.muted }}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* RIGHT COLUMN — cycling images (desktop) */}
        <div
          className="relative hidden lg:block overflow-hidden"
          style={{ animation: 'reveal-right 1s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}
        >
          {resolvedHeroImages.length > 0 ? (
            <HeroImageCycler heroImages={resolvedHeroImages} />
          ) : (
            <Image
              src="/Roger-at-work-2-for-web.jpg"
              alt="Roger evaluating a piano in the showroom"
              fill
              priority
              className="object-cover object-[65%_center]"
              sizes="42vw"
            />
          )}

          {/* Corner marks */}
          {['top-8 left-8', 'top-8 right-8', 'bottom-8 left-8', 'bottom-8 right-8'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} z-20 pointer-events-none ${i % 2 === 1 ? 'flex flex-col items-end' : ''} ${i >= 2 ? 'justify-end' : ''}`}>
              {i < 2 ? (
                <>
                  <div className="w-7 h-px" style={{ backgroundColor: C.accent }} />
                  <div className="w-px h-7" style={{ backgroundColor: C.accent }} />
                </>
              ) : (
                <>
                  <div className="w-px h-7" style={{ backgroundColor: C.accent }} />
                  <div className="w-7 h-px" style={{ backgroundColor: C.accent }} />
                </>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Mobile — full-bleed photo strip */}
      <div className="relative lg:hidden w-full overflow-hidden" style={{ height: '60vw', minHeight: '280px', maxHeight: '480px' }}>
        {resolvedHeroImages.length > 0 ? (
          <HeroImageCycler heroImages={resolvedHeroImages} />
        ) : (
          <Image
            src="/Roger-at-work-2-for-web.jpg"
            alt="Roger evaluating a piano in the showroom"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        )}
      </div>
    </section>
  )
}
