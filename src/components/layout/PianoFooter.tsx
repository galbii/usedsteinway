/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'

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

export function PianoFooter() {
  return (
    <footer className="bg-piano-black mt-auto">

      {/* ── Contact Band ── */}
      <div className="border-t border-piano-gold/15 border-b border-b-piano-gold/5 bg-piano-charcoal">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm">
              <a
                href="tel:+16035550123"
                className="flex items-center gap-2 text-piano-cream/80 hover:text-piano-gold transition-colors"
              >
                <span className="font-display text-[9px] tracking-[0.2em] uppercase text-piano-gold/50 hidden sm:inline">Phone</span>
                <span>(603) 555-0123</span>
              </a>
              <a
                href="mailto:info@usedsteinways.com"
                className="flex items-center gap-2 text-piano-silver/50 hover:text-piano-silver/80 transition-colors"
              >
                <span className="font-display text-[9px] tracking-[0.2em] uppercase text-piano-gold/30 hidden sm:inline">Email</span>
                <span>info@usedsteinways.com</span>
              </a>
              <div className="flex items-center gap-2 text-piano-silver/40 text-xs">
                <span className="font-display text-[9px] tracking-[0.2em] uppercase text-piano-gold/30 hidden sm:inline">Hours</span>
                <span>Mon – Fri 10–6 · Sat 10–4</span>
              </div>
            </div>
            <Link
              href="/visit"
              className="inline-flex items-center gap-2 border border-piano-gold/20 text-piano-gold/60 hover:border-piano-gold/50 hover:text-piano-gold px-4 py-2 font-display text-[10px] tracking-[0.2em] uppercase transition-colors shrink-0"
            >
              Plan a Visit →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Footer Body ── */}
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-10">

        {/* Logo + tagline above columns */}
        <div className="mb-12 pb-12 border-b border-piano-gold/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Link href="/" className="group inline-block">
                <p
                  className="text-[clamp(1.6rem,3vw,2.4rem)] font-normal text-piano-cream leading-none tracking-tight group-hover:text-white transition-colors"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  UsedSteinways
                  <span className="text-piano-gold">.com</span>
                </p>
              </Link>
              <p className="text-piano-silver/40 text-xs font-display tracking-[0.15em] mt-2 uppercase">
                New Hampshire · Est. 1993 · Roger, RPT
              </p>
            </div>
            <p
              className="text-piano-silver/40 text-sm italic max-w-xs leading-relaxed text-right hidden md:block"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              "Every piano personally selected.<br />Every detail inspected."
            </p>
          </div>
        </div>

        {/* Nav columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-12">
          {NAV_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-display text-[10px] tracking-[0.25em] uppercase text-piano-gold/60 mb-5">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-piano-silver/40 hover:text-piano-silver/70 text-sm transition-colors leading-relaxed"
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
          <p className="text-piano-silver/25 text-[11px] font-display tracking-wide">
            © {new Date().getFullYear()} UsedSteinways.com · Concord, New Hampshire · All rights reserved
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
                className="text-piano-silver/25 hover:text-piano-silver/50 font-display text-[10px] tracking-[0.2em] uppercase transition-colors"
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
