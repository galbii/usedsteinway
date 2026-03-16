'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/utilities/ui'
import { PianoLogo } from './PianoLogo'

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
    <header className="sticky top-0 z-50 w-full bg-piano-cream border-b border-piano-linen">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <PianoLogo theme="light" size="md" />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">

          {/* Pianos dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setPianoMenuOpen(true)}
            onMouseLeave={() => setPianoMenuOpen(false)}
          >
            <button
              className={cn(
                'flex items-center gap-1.5 font-display text-[11px] tracking-[0.25em] uppercase transition-colors py-1',
                pathname.startsWith('/pianos')
                  ? 'text-piano-black'
                  : 'text-piano-stone hover:text-piano-black',
              )}
            >
              Pianos
              <svg className="w-2.5 h-2.5 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {pianoMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-52 bg-piano-cream border border-piano-linen shadow-lg shadow-piano-black/5 py-2">
                {PIANO_BRANDS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'block px-5 py-3 font-display text-[10px] tracking-[0.25em] uppercase transition-colors',
                      item.href === '/pianos'
                        ? 'text-piano-black border-b border-piano-linen mb-1'
                        : 'text-piano-stone hover:text-piano-black hover:bg-piano-warm-white',
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
                'font-display text-[11px] tracking-[0.25em] uppercase transition-colors',
                isActive(link.href)
                  ? 'text-piano-black'
                  : 'text-piano-stone hover:text-piano-black',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 font-display text-[11px] tracking-[0.25em] uppercase text-piano-black hover:text-piano-gold transition-colors"
          >
            Contact
            <span className="text-piano-gold text-xs">→</span>
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-piano-black p-1"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-piano-cream border-t border-piano-linen">
          <div className="px-8 py-6 space-y-1">
            <p className="font-display text-[10px] tracking-[0.35em] uppercase text-piano-gold mb-4">
              Pianos
            </p>
            {PIANO_BRANDS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-piano-stone hover:text-piano-black font-display text-[11px] tracking-[0.22em] uppercase transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-5 mt-5 border-t border-piano-linen space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 text-piano-stone hover:text-piano-black font-display text-[11px] tracking-[0.22em] uppercase transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block mt-5 text-center border border-piano-black text-piano-black py-3.5 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-black hover:text-piano-cream transition-colors"
              >
                Contact Roger →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
