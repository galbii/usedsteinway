'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

import type { Header } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { PianoLogo } from '@/components/layout/PianoLogo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    setMobileMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const navItems = data?.navItems || []

  return (
    <header
      className="sticky top-0 z-50 w-full bg-piano-cream border-b border-piano-linen"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <PianoLogo theme="light" size="md" />

        {/* Center nav — desktop only, Contact excluded */}
        <HeaderNav data={data} />

        {/* Right side — Contact + Search + mobile toggle */}
        <div className="flex items-center gap-6">
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center gap-1.5 font-display text-[11px] tracking-[0.25em] uppercase text-piano-black hover:text-piano-gold transition-colors"
          >
            Contact
            <span className="text-piano-gold text-xs">→</span>
          </Link>
          <Link
            href="/search"
            className="hidden lg:block text-piano-stone hover:text-piano-black transition-colors duration-150"
          >
            <span className="sr-only">Search</span>
            <SearchIcon className="w-4 h-4" />
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
            {navItems.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                appearance="link"
                className="block py-3 text-piano-stone hover:text-piano-black font-display text-[11px] tracking-[0.22em] uppercase transition-colors"
              />
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
