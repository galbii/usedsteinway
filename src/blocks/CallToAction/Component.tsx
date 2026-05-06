import React from 'react'
import Link from 'next/link'
import type { CallToActionBlock as CTABlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

type Props = CTABlockProps

const C = {
  bg:         'hsl(36, 22%, 96%)',
  darkBg:     'hsl(350, 62%, 26%)',
  charcoal:   'hsl(25, 5%, 12%)',
  accent:     'hsl(40, 72%, 52%)',
  text:       'hsl(350, 12%, 11%)',
  muted:      'hsl(350, 5%, 46%)',
  border:     'hsl(36, 18%, 89%)',
  borderDark: 'hsl(350, 45%, 38%)',
  ivory:      'hsl(36, 22%, 96%)',
}

type LinkShape = NonNullable<Props['links']>[number]['link']

function resolveHref(link: LinkShape): string {
  if (link.type === 'reference' && link.reference?.value) {
    const val = link.reference.value
    if (typeof val === 'object' && val !== null && 'slug' in val) {
      const slug = (val as { slug?: string | null }).slug
      if (slug) {
        return link.reference.relationTo === 'pages'
          ? `/${slug}`
          : `/${link.reference.relationTo}/${slug}`
      }
    }
  }
  return link.url ?? '#'
}

// ── Rich text class helpers ────────────────────────────────────

const rtLight = [
  '[&_h1]:font-cormorant [&_h1]:font-light [&_h1]:leading-[1.0]',
  '[&_h1]:text-[clamp(3.5rem,7vw,7.5rem)] [&_h1]:text-[hsl(350,12%,11%)] [&_h1]:mb-6',
  '[&_h2]:font-cormorant [&_h2]:font-light [&_h2]:leading-[1.05]',
  '[&_h2]:text-[clamp(2.5rem,5vw,5.5rem)] [&_h2]:text-[hsl(350,12%,11%)] [&_h2]:mb-5',
  '[&_h3]:font-cormorant [&_h3]:font-light [&_h3]:text-[hsl(350,12%,11%)] [&_h3]:mb-4',
  '[&_p]:text-[hsl(350,5%,46%)] [&_p]:text-lg [&_p]:leading-relaxed [&_p]:max-w-[40ch] [&_p]:mx-auto',
  '[&>*:last-child]:mb-0',
].join(' ')

const rtDark = [
  '[&_h1]:font-cormorant [&_h1]:font-light [&_h1]:leading-[1.05]',
  '[&_h1]:text-[clamp(3rem,6vw,6.5rem)] [&_h1]:text-[hsl(36,22%,96%)] [&_h1]:mb-6',
  '[&_h2]:font-cormorant [&_h2]:font-light [&_h2]:leading-[1.08]',
  '[&_h2]:text-[clamp(2.5rem,5vw,5.5rem)] [&_h2]:text-[hsl(36,22%,96%)] [&_h2]:mb-5',
  '[&_h3]:font-cormorant [&_h3]:font-light [&_h3]:text-[hsl(36,22%,96%)] [&_h3]:mb-4',
  '[&_p]:text-[rgba(245,235,220,0.55)] [&_p]:text-lg [&_p]:leading-relaxed [&_p]:max-w-[40ch] [&_p]:mx-auto',
  '[&>*:last-child]:mb-0',
].join(' ')

const rtRuled = [
  '[&_h1]:font-cormorant [&_h1]:font-light [&_h1]:leading-[1.0]',
  '[&_h1]:text-[clamp(2.2rem,4.5vw,4rem)] [&_h1]:text-[hsl(350,12%,11%)] [&_h1]:mb-4',
  '[&_h2]:font-cormorant [&_h2]:font-light [&_h2]:leading-[1.05]',
  '[&_h2]:text-[clamp(2rem,4vw,3.5rem)] [&_h2]:text-[hsl(350,12%,11%)] [&_h2]:mb-4',
  '[&_h3]:font-cormorant [&_h3]:font-light [&_h3]:text-[hsl(350,12%,11%)] [&_h3]:mb-3',
  '[&_p]:text-[hsl(350,5%,46%)] [&_p]:leading-relaxed [&_p]:text-base',
  '[&>*:last-child]:mb-0',
].join(' ')

// ── Diamond ornament divider ──────────────────────────────────

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-5 mb-12">
      <div className="h-px w-10 shrink-0" style={{ backgroundColor: 'hsla(40,72%,52%,0.38)' }} />
      <div
        className="w-2 h-2 rotate-45 border shrink-0"
        style={{ borderColor: C.accent }}
      />
      <div className="h-px w-10 shrink-0" style={{ backgroundColor: 'hsla(40,72%,52%,0.38)' }} />
    </div>
  )
}

// ── Corner marks (dark variant) ───────────────────────────────

function CornerMarks() {
  return (
    <>
      {/* top-left */}
      <div className="absolute top-8 left-8 z-20 pointer-events-none">
        <div className="w-7 h-px" style={{ backgroundColor: C.accent }} />
        <div className="w-px h-7" style={{ backgroundColor: C.accent }} />
      </div>
      {/* top-right */}
      <div className="absolute top-8 right-8 z-20 pointer-events-none flex flex-col items-end">
        <div className="w-7 h-px" style={{ backgroundColor: C.accent }} />
        <div className="w-px h-7" style={{ backgroundColor: C.accent }} />
      </div>
      {/* bottom-left */}
      <div className="absolute bottom-8 left-8 z-20 pointer-events-none flex flex-col justify-end">
        <div className="w-px h-7" style={{ backgroundColor: C.accent }} />
        <div className="w-7 h-px" style={{ backgroundColor: C.accent }} />
      </div>
      {/* bottom-right */}
      <div className="absolute bottom-8 right-8 z-20 pointer-events-none flex flex-col items-end justify-end">
        <div className="w-px h-7" style={{ backgroundColor: C.accent }} />
        <div className="w-7 h-px" style={{ backgroundColor: C.accent }} />
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────

export const CallToActionBlock: React.FC<Props> = ({ links, richText, style }) => {
  const variant = style ?? 'light'
  const safeLinks = links ?? []

  // ── DARK — deep burgundy, corner marks, centered ──────────────
  if (variant === 'dark') {
    return (
      <section
        className="relative overflow-hidden py-28 px-8"
        style={{ backgroundColor: C.darkBg }}
      >
        <CornerMarks />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <GoldDivider />

          {richText && (
            <div className="mb-12">
              <RichText className={rtDark} data={richText} enableGutter={false} />
            </div>
          )}

          {safeLinks.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {safeLinks.map(({ link }, i) => (
                <Link
                  key={i}
                  href={resolveHref(link)}
                  target={link.newTab ? '_blank' : undefined}
                  rel={link.newTab ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center justify-center px-10 py-4 font-display text-[11px] tracking-[0.35em] uppercase transition-opacity duration-200 hover:opacity-80"
                  style={
                    i === 0
                      ? { backgroundColor: C.accent, color: 'hsl(350, 62%, 14%)' }
                      : { border: `1px solid ${C.borderDark}`, color: 'rgba(245,235,220,0.70)' }
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  // ── RULED — gold top bar, horizontal split, arrow buttons ─────
  if (variant === 'ruled') {
    return (
      <section
        className="relative"
        style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}` }}
      >
        {/* 3px gold rule — always visible */}
        <div className="h-[3px] w-full" style={{ backgroundColor: C.accent, opacity: 0.75 }} />

        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            {/* Left — rich text */}
            {richText && (
              <div className="min-w-0 lg:max-w-[56ch]">
                <RichText className={rtRuled} data={richText} enableGutter={false} />
              </div>
            )}

            {/* Right — buttons */}
            {safeLinks.length > 0 && (
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                {safeLinks.map(({ link }, i) => (
                  <Link
                    key={i}
                    href={resolveHref(link)}
                    target={link.newTab ? '_blank' : undefined}
                    rel={link.newTab ? 'noopener noreferrer' : undefined}
                    className="group inline-flex items-center justify-between gap-8 px-8 py-4 font-display text-[11px] tracking-[0.38em] uppercase transition-all duration-300 hover:opacity-90"
                    style={
                      i === 0
                        ? { backgroundColor: C.text, color: C.ivory }
                        : { border: `1.5px solid ${C.border}`, color: C.text }
                    }
                  >
                    <span>{link.label}</span>
                    <span
                      className="text-xs transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: i === 0 ? C.ivory : C.muted }}
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom border */}
        <div style={{ borderBottom: `1px solid ${C.border}` }} />
      </section>
    )
  }

  // ── LIGHT (default) — ivory centered, generous whitespace ─────
  return (
    <section className="py-28 px-8" style={{ backgroundColor: C.bg }}>
      <div className="max-w-3xl mx-auto text-center">
        <GoldDivider />

        {richText && (
          <div className="mb-14">
            <RichText className={rtLight} data={richText} enableGutter={false} />
          </div>
        )}

        {safeLinks.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {safeLinks.map(({ link }, i) => (
              <Link
                key={i}
                href={resolveHref(link)}
                target={link.newTab ? '_blank' : undefined}
                rel={link.newTab ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center justify-center px-12 py-4 font-display text-[11px] tracking-[0.3em] uppercase transition-opacity duration-200 hover:opacity-80"
                style={
                  i === 0
                    ? { backgroundColor: C.text, color: C.bg }
                    : { border: `1px solid ${C.border}`, color: C.text }
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
