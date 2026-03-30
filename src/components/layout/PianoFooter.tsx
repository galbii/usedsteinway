/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { PianoLogo } from './PianoLogo'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { SiteSetting } from '@/payload-types'

const NAV_COLUMNS = [
  {
    title: 'Inventory',
    links: [
      { label: 'All Pianos', href: '/pianos' },
      { label: 'Steinway & Sons', href: '/pianos/steinway' },
      { label: 'Handcrafted European', href: '/pianos/european' },
      { label: 'Shigeru Kawai', href: '/pianos/shigeru-kawai' },
    ],
  },
  {
    title: 'Guides',
    links: [
      { label: 'Buying a Used Steinway', href: '/guides/buying-a-used-steinway' },
      { label: 'Steinway Pricing Guide', href: '/guides/steinway-pricing-guide' },
      { label: 'Steinway vs. Bösendorfer', href: '/guides/steinway-vs-bosendorfer' },
      { label: 'Best Model for Home', href: '/guides/best-steinway-model-for-home' },
      { label: 'All Guides', href: '/guides' },
    ],
  },
  {
    title: 'Showroom',
    links: [
      { label: 'About Roger', href: '/about' },
      { label: 'Visit Us', href: '/visit' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Sell Your Piano', href: '/sell-your-piano' },
      { label: 'Financing', href: '/financing' },
    ],
  },
]

export async function PianoFooter() {
  const siteSettings = await getCachedGlobal('site-settings', 0)() as SiteSetting
  const { phone, email, hoursOfOperation } = siteSettings?.contactInfo ?? {}

  const displayPhone = phone ?? '508-545-0766'
  const displayEmail = email ?? 'info@usedsteinways.com'
  const displayHours = hoursOfOperation ?? 'By appointment'
  const telHref = `tel:+1${displayPhone.replace(/\D/g, '')}`

  return (
    <footer className="mt-auto" style={{ backgroundColor: 'hsl(225, 52%, 10%)' }}>

      {/* ── Contact Band ── */}
      <div className="border-t border-piano-gold/15 border-b border-b-piano-gold/5" style={{ backgroundColor: 'hsl(225, 48%, 13%)' }}>
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-base">
              <a
                href={telHref}
                className="flex items-center gap-2 text-piano-cream/80 hover:text-piano-gold transition-colors"
              >
                <span className="font-display text-[10px] tracking-[0.35em] uppercase text-piano-gold/50 hidden sm:inline">Phone</span>
                <span>{displayPhone}</span>
              </a>
              <a
                href={`mailto:${displayEmail}`}
                className="flex items-center gap-2 text-piano-silver/50 hover:text-piano-silver/80 transition-colors"
              >
                <span className="font-display text-[10px] tracking-[0.35em] uppercase text-piano-gold/30 hidden sm:inline">Email</span>
                <span>{displayEmail}</span>
              </a>
              <div className="flex items-center gap-2 text-piano-silver/40 text-xs">
                <span className="font-display text-[10px] tracking-[0.35em] uppercase text-piano-gold/30 hidden sm:inline">Hours</span>
                <span>{displayHours}</span>
              </div>
            </div>
            <Link
              href="/visit"
              className="inline-flex items-center gap-2 border border-piano-gold/20 text-piano-gold/60 hover:border-piano-gold/50 hover:text-piano-gold px-8 py-3 font-display text-[11px] tracking-[0.3em] uppercase transition-colors shrink-0"
            >
              Plan a Visit →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Footer Body ── */}
      <div className="max-w-7xl mx-auto px-8 pt-20 pb-12">

        {/* Logo + tagline above columns */}
        <div className="mb-12 pb-12 border-b border-piano-gold/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <PianoLogo theme="dark" size="lg" />
              <p className="text-piano-silver/30 font-display text-[10px] tracking-[0.4em] uppercase mt-3">
                Massachusetts · Est. 1993 · Roger, RPT
              </p>
            </div>
            <p className="font-cormorant font-light italic text-lg text-piano-stone/40 max-w-xs leading-relaxed text-right hidden md:block">
              "Every piano personally selected.<br />Every detail inspected."
            </p>
          </div>
        </div>

        {/* Nav columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-12">
          {NAV_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold/60 mb-6">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-piano-stone/50 hover:text-piano-stone/80 text-base transition-colors leading-relaxed"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-piano-gold/8 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-piano-stone/35 text-[11px] font-display tracking-wide">
            © {new Date().getFullYear()} UsedSteinways · Natick & Burlington, MA · All rights reserved
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: 'Contact', href: '/contact' },
              { label: 'Blog', href: '/blog' },
              { label: 'Sell', href: '/sell-your-piano' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-piano-stone/35 hover:text-piano-stone/60 font-display text-[10px] tracking-[0.3em] uppercase transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
