'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

import type { Header } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { PianoLogo } from '@/components/layout/PianoLogo'
import { HeaderNav } from './Nav'
import { cn } from '@/utilities/ui'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const ticking = useRef(false)

  useEffect(() => {
    setHeaderTheme(null)
    setMobileMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Scroll-aware compression
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30)
          ticking.current = false
        })
        ticking.current = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const navItems = data?.navItems || []

  return (
    <>
      <header
        className={cn(
          'w-full relative animate-header-reveal',
          'transition-[background-color,box-shadow] duration-500 ease-out',
          scrolled && 'shadow-[0_8px_32px_-8px_rgba(0,0,0,0.45)]',
        )}
        style={{
          backgroundColor: scrolled ? 'hsl(350, 68%, 19%)' : 'hsl(350, 62%, 26%)',
        }}
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div
          className={cn(
            'max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between',
            'transition-[height] duration-500 ease-out',
            scrolled ? 'h-16' : 'h-20',
          )}
        >
          {/* Logo — subtly scales on scroll */}
          <div className={cn(
            'transition-transform duration-500 ease-out origin-left',
            scrolled ? 'scale-[0.88]' : 'scale-100',
          )}>
            <PianoLogo theme="dark" size="md" />
          </div>

          {/* Center nav */}
          <HeaderNav data={data} />

          {/* Right side */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <Link
              href="/search"
              className={cn(
                'hidden lg:flex items-center transition-all duration-200',
                'text-piano-cream/70 hover:text-white hover:scale-110',
              )}
              aria-label="Search"
            >
              <SearchIcon className="w-4 h-4" />
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className="group hidden lg:inline-flex items-center gap-0 font-display font-semibold text-[13px] tracking-[0.2em] uppercase text-piano-cream hover:text-white transition-colors duration-200"
            >
              Contact
              <span
                className="inline-block opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out ml-1.5"
                style={{ color: 'hsl(40, 72%, 60%)' }}
              >
                →
              </span>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] text-piano-cream -mr-1"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className={cn(
                'block w-5 bg-current transition-all duration-300 ease-in-out origin-center h-px',
                mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : '',
              )} />
              <span className={cn(
                'block w-5 bg-current transition-all duration-300 ease-in-out h-px',
                mobileMenuOpen ? 'opacity-0 scale-x-0' : '',
              )} />
              <span className={cn(
                'block w-5 bg-current transition-all duration-300 ease-in-out origin-center h-px',
                mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : '',
              )} />
            </button>
          </div>
        </div>

        {/* Gold shimmer bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[6px]"
          style={{
            background: 'linear-gradient(90deg, hsl(40,72%,40%) 0%, hsl(42,90%,68%) 40%, hsl(36,95%,75%) 50%, hsl(42,90%,68%) 60%, hsl(40,72%,40%) 100%)',
            backgroundSize: '200% 100%',
            animation: 'gold-shimmer 4s ease-in-out infinite',
          }}
        />
      </header>

      {/* ── Mobile sidebar ─────────────────────────────────────────── */}

      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-opacity duration-500',
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        style={{ backgroundColor: 'rgba(10, 4, 6, 0.65)', backdropFilter: 'blur(2px)' }}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <aside
        className={cn(
          'fixed top-0 right-0 h-dvh w-[300px] z-50 lg:hidden flex flex-col',
          'transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.08,1)]',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        style={{
          backgroundColor: 'hsl(350, 56%, 18%)',
          borderLeft: '1px solid hsl(350, 48%, 35%)',
        }}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Sidebar header */}
        <div
          className="flex items-center justify-between px-7 h-20 shrink-0"
          style={{ borderBottom: '1px solid hsl(350, 48%, 30%)' }}
        >
          <PianoLogo theme="dark" size="sm" />

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-piano-cream/50 hover:text-piano-cream transition-colors duration-150 p-1 -mr-1"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links — staggered reveal */}
        <nav className="flex-1 flex flex-col px-7 pt-8 pb-4 overflow-y-auto">
          {navItems.map(({ link }, i) => (
            <div
              key={i}
              style={{
                borderBottom: '1px solid hsl(350, 40%, 28%)',
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(16px)',
                transition: `opacity 0.4s ease ${i * 70 + 150}ms, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 70 + 150}ms`,
              }}
            >
              <CMSLink
                {...link}
                appearance="link"
                className={cn(
                  'flex items-center justify-between w-full py-4',
                  'font-display font-semibold text-[13px] tracking-[0.18em] uppercase',
                  'text-piano-cream hover:text-white transition-colors duration-150',
                )}
              />
            </div>
          ))}

          {/* Contact in sidebar */}
          <div
            style={{
              borderBottom: '1px solid hsl(350, 40%, 28%)',
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(16px)',
              transition: `opacity 0.4s ease ${navItems.length * 70 + 150}ms, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${navItems.length * 70 + 150}ms`,
            }}
          >
            <Link
              href="/contact"
              className={cn(
                'flex items-center justify-between w-full py-4',
                'font-display font-semibold text-[13px] tracking-[0.18em] uppercase',
                'text-piano-cream hover:text-white transition-colors duration-150',
              )}
            >
              Contact
            </Link>
          </div>
        </nav>

        {/* Sidebar footer — search */}
        <div
          className="px-7 py-6 shrink-0"
          style={{
            borderTop: '1px solid hsl(350, 40%, 28%)',
            opacity: mobileMenuOpen ? 1 : 0,
            transition: `opacity 0.4s ease ${navItems.length * 70 + 350}ms`,
          }}
        >
          <Link
            href="/search"
            className={cn(
              'flex items-center gap-3 w-full',
              'font-display font-semibold text-[13px] tracking-[0.18em] uppercase',
              'text-piano-cream/60 hover:text-piano-cream transition-colors duration-150',
            )}
          >
            <SearchIcon className="w-3.5 h-3.5 shrink-0" />
            Search Pianos
          </Link>

          {/* Decorative rule */}
          <div
            className="mt-8 h-px w-8 transition-all duration-700"
            style={{
              backgroundColor: 'hsl(42, 90%, 65%)',
              width: mobileMenuOpen ? '2rem' : '0',
              opacity: 0.4,
              transitionDelay: `${navItems.length * 70 + 450}ms`,
            }}
          />
          <p
            className="mt-3 font-display text-[9px] tracking-[0.2em] uppercase"
            style={{ color: 'hsl(350, 30%, 50%)' }}
          >
            Used Steinways
          </p>
        </div>
      </aside>
    </>
  )
}
