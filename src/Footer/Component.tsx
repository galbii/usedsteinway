import Link from 'next/link'
import React from 'react'

import { PianoLogo } from '@/components/layout/PianoLogo'

const NAV_COLUMNS = [
  {
    title: 'Inventory',
    links: [
      { label: 'All Pianos', href: '/pianos' },
      { label: 'Steinway & Sons', href: '/pianos/steinway' },
      { label: 'Bösendorfer', href: '/pianos/bosendorfer' },
      { label: 'C. Bechstein', href: '/pianos/bechstein' },
      { label: 'Shigeru Kawai', href: '/pianos/shigeru-kawai' },
      { label: 'Recently Sold', href: '/recently-sold' },
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

export async function Footer() {
  return (
    <footer className="bg-piano-cream mt-auto">

      {/* ── Contact Band ── */}
      <div className="bg-piano-warm-white border-y border-piano-linen">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-base">
              <a
                href="tel:+16035550123"
                className="flex items-center gap-2 text-piano-black hover:text-piano-gold transition-colors"
              >
                <span className="font-display text-[10px] tracking-[0.35em] uppercase text-piano-gold hidden sm:inline">Phone</span>
                <span>(603) 555-0123</span>
              </a>
              <a
                href="mailto:info@usedsteinways.com"
                className="flex items-center gap-2 text-piano-stone hover:text-piano-black transition-colors"
              >
                <span className="font-display text-[10px] tracking-[0.35em] uppercase text-piano-gold/60 hidden sm:inline">Email</span>
                <span>info@usedsteinways.com</span>
              </a>
              <div className="flex items-center gap-2 text-piano-stone/70 text-xs">
                <span className="font-display text-[10px] tracking-[0.35em] uppercase text-piano-gold/60 hidden sm:inline">Hours</span>
                <span>Mon – Fri 10–6 · Sat 10–4</span>
              </div>
            </div>
            <Link
              href="/visit"
              className="inline-flex items-center gap-2 border border-piano-gold/40 text-piano-gold hover:border-piano-gold hover:bg-piano-gold/5 px-8 py-3 font-display text-[11px] tracking-[0.3em] uppercase transition-colors shrink-0"
            >
              Plan a Visit →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Footer Body ── */}
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-10">

        {/* Logo + tagline */}
        <div className="mb-12 pb-12 border-b border-piano-linen">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <PianoLogo theme="light" size="lg" />
              <p className="text-piano-stone font-display text-[10px] tracking-[0.4em] uppercase mt-3">
                New Hampshire · Est. 1993 · Roger, RPT
              </p>
            </div>
            <p className="font-cormorant font-light italic text-lg text-piano-stone/60 max-w-xs leading-relaxed text-right hidden md:block">
              &ldquo;Every piano personally selected.<br />Every detail inspected.&rdquo;
            </p>
          </div>
        </div>

        {/* Nav columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-12">
          {NAV_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-6">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-piano-stone hover:text-piano-black text-base transition-colors leading-relaxed"
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
        <div className="border-t border-piano-linen pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-piano-stone/50 text-[11px] font-display tracking-wide">
            © {new Date().getFullYear()} UsedSteinway · Concord, New Hampshire · All rights reserved
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
                className="text-piano-stone/50 hover:text-piano-black font-display text-[10px] tracking-[0.3em] uppercase transition-colors"
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
