'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/utilities/ui'

const PIANO_BRANDS = [
  { label: 'All Pianos', href: '/pianos' },
  { label: 'Steinway & Sons', href: '/pianos/steinway' },
  { label: 'Bösendorfer', href: '/pianos/bosendorfer' },
  { label: 'C. Bechstein', href: '/pianos/bechstein' },
  { label: 'Blüthner', href: '/pianos/bluthner' },
  { label: 'Shigeru Kawai', href: '/pianos/shigeru-kawai' },
  { label: 'Petrof', href: '/pianos/petrof' },
  { label: 'Yamaha (CF Series)', href: '/pianos/yamaha' },
]

const NAV_LINKS = [
  { label: 'Guides', href: '/guides' },
  { label: 'About', href: '/about' },
  { label: 'Visit', href: '/visit' },
  { label: 'Sell Your Piano', href: '/sell-your-piano' },
]

export function PianoHeader() {
  const pathname = usePathname()
  const [pianoMenuOpen, setPianoMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === href : pathname.startsWith(href)

  return (
    <header
      className="sticky top-0 z-50 w-full bg-piano-black border-b border-piano-gold/10"
    >
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-0">
          <span
            className="text-piano-cream font-normal leading-none tracking-tight group-hover:text-white transition-colors"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.2rem' }}
          >
            UsedSteinways
          </span>
          <span
            className="text-piano-gold/70 group-hover:text-piano-gold font-normal leading-none tracking-tight transition-colors"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.2rem' }}
          >
            .com
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Pianos Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setPianoMenuOpen(true)}
            onMouseLeave={() => setPianoMenuOpen(false)}
          >
            <button
              className={cn(
                'flex items-center gap-1 font-display text-xs tracking-[0.15em] uppercase transition-colors py-1',
                pathname.startsWith('/pianos') ? 'text-piano-gold' : 'text-piano-cream/70 hover:text-piano-cream',
              )}
            >
              Pianos
              <svg className="w-3 h-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {pianoMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-piano-charcoal border border-piano-gold/20 shadow-2xl shadow-piano-black/40 py-2">
                {PIANO_BRANDS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'block px-5 py-2.5 font-display text-xs tracking-wide transition-colors',
                      item.href === '/pianos'
                        ? 'text-piano-gold border-b border-piano-gold/10 mb-1 uppercase tracking-[0.15em]'
                        : 'text-piano-cream/70 hover:text-piano-cream hover:bg-piano-gold/5',
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-display text-xs tracking-[0.15em] uppercase transition-colors',
                isActive(link.href) ? 'text-piano-gold' : 'text-piano-cream/70 hover:text-piano-cream',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Contact CTA + Mobile */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center bg-piano-burgundy text-white px-5 py-2 font-display text-xs tracking-[0.2em] uppercase hover:bg-piano-burgundy/90 transition-colors"
          >
            Contact
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-piano-cream p-1"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-piano-charcoal border-t border-piano-gold/10">
          <div className="px-8 py-6 space-y-1">
            <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-gold mb-3">Pianos</p>
            {PIANO_BRANDS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-piano-cream/80 hover:text-piano-cream font-display text-xs tracking-wide"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-piano-gold/10 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-piano-cream/80 hover:text-piano-cream font-display text-xs tracking-[0.15em] uppercase"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block mt-4 text-center bg-piano-burgundy text-white py-3 font-display text-xs tracking-[0.2em] uppercase"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
