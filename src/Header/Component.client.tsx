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
import type { Brand } from '@/payload-types'

type BrandModel = NonNullable<Brand['models']>[number]

interface HeaderClientProps {
  data: Header
  models?: BrandModel[]
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, models = [] }) => {
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

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40)
          ticking.current = false
        })
        ticking.current = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const navItems = data?.navItems || []

  return (
    <>
      <header
        className={cn(
          'w-full relative animate-header-reveal overflow-visible',
          'transition-[background-color,box-shadow] duration-300 ease-out',
        )}
        style={{
          backgroundColor: 'hsl(350, 62%, 26%)',
          boxShadow: scrolled
            ? '0 1px 0 0 rgba(200,160,75,0.1), 0 12px 40px -8px rgba(0,0,0,0.6)'
            : 'none',
        }}
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div
          className={cn(
            'max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between',
            'transition-[height] duration-300 ease-out',
            scrolled ? 'h-[60px]' : 'h-[72px]',
          )}
        >
          {/* Logo — monogram overhangs below header */}
          <div className="overflow-visible relative z-50">
            <PianoLogo theme="dark" size="md" monogramOffset={8} />
          </div>

          {/* Center nav */}
          <HeaderNav data={data} models={models} scrolled={scrolled} />

          {/* Right side */}
          <div className="flex items-center gap-4 lg:gap-5">
            {/* Search */}
            <Link
              href="/search"
              className={cn(
                'hidden lg:flex items-center transition-all duration-200',
                'text-piano-cream/40 hover:text-piano-cream/80',
              )}
              aria-label="Search"
            >
              <SearchIcon className="w-[15px] h-[15px]" />
            </Link>

            {/* Vertical rule */}
            <div className="hidden lg:block w-px h-[18px] bg-piano-cream/10" />

            {/* Visit CTA */}
            <Link
              href="/visit"
              className={cn(
                'hidden lg:inline-flex items-center',
                'px-[18px] py-[7px] transition-all duration-300',
                'border border-piano-cream/25 hover:border-piano-cream/60',
                'font-display font-medium text-[11px] tracking-[0.22em] uppercase',
                'text-piano-cream/70 hover:text-piano-cream',
              )}
            >
              Visit
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] text-piano-cream/80 -mr-1"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className={cn(
                'block w-[18px] bg-current transition-all duration-300 ease-in-out origin-center h-px',
                mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : '',
              )} />
              <span className={cn(
                'block w-[18px] bg-current transition-all duration-300 ease-in-out h-px',
                mobileMenuOpen ? 'opacity-0 scale-x-0' : '',
              )} />
              <span className={cn(
                'block w-[18px] bg-current transition-all duration-300 ease-in-out origin-center h-px',
                mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : '',
              )} />
            </button>
          </div>
        </div>

        {/* Gold dash — 40px curator's mark, anchored left */}
        <div
          className="absolute bottom-0 left-8"
          style={{
            width: '40px',
            height: '1px',
            background: 'hsl(40, 72%, 52%)',
            opacity: 0.7,
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
        style={{ backgroundColor: 'rgba(4, 2, 1, 0.72)', backdropFilter: 'blur(4px)' }}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <aside
        className={cn(
          'fixed top-0 right-0 h-dvh w-[280px] z-50 lg:hidden flex flex-col',
          'transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.08,1)]',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        style={{
          backgroundColor: 'hsl(350, 56%, 15%)',
          borderLeft: '1px solid rgba(200, 160, 75, 0.12)',
        }}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Sidebar header */}
        <div
          className="flex items-center justify-between px-7 h-[72px] shrink-0"
          style={{ borderBottom: '1px solid rgba(200, 160, 75, 0.08)' }}
        >
          <PianoLogo theme="dark" size="sm" />

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-piano-cream/30 hover:text-piano-cream/70 transition-colors duration-150 p-1 -mr-1"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links — staggered reveal */}
        <nav className="flex-1 flex flex-col px-7 pt-6 pb-4 overflow-y-auto">
          {navItems.map(({ link }, i) => (
            <div
              key={i}
              style={{
                borderBottom: '1px solid rgba(200, 160, 75, 0.07)',
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(14px)',
                transition: `opacity 0.4s ease ${i * 65 + 120}ms, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 65 + 120}ms`,
              }}
            >
              <CMSLink
                {...link}
                appearance="link"
                className={cn(
                  'flex items-center justify-between w-full py-[14px]',
                  'font-display font-medium text-[13px] tracking-[0.18em] uppercase',
                  'text-piano-cream/60 hover:text-piano-cream transition-colors duration-150',
                )}
              />
            </div>
          ))}

          {/* Visit in sidebar */}
          <div
            style={{
              borderBottom: '1px solid rgba(200, 160, 75, 0.07)',
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(14px)',
              transition: `opacity 0.4s ease ${navItems.length * 65 + 120}ms, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${navItems.length * 65 + 120}ms`,
            }}
          >
            <Link
              href="/visit"
              className={cn(
                'flex items-center justify-between w-full py-[14px]',
                'font-display font-medium text-[11px] tracking-[0.22em] uppercase',
                'text-piano-gold/65 hover:text-piano-gold transition-colors duration-150',
              )}
            >
              Visit
            </Link>
          </div>
        </nav>

        {/* Sidebar footer */}
        <div
          className="px-7 py-6 shrink-0"
          style={{
            borderTop: '1px solid rgba(200, 160, 75, 0.07)',
            opacity: mobileMenuOpen ? 1 : 0,
            transition: `opacity 0.4s ease ${navItems.length * 65 + 320}ms`,
          }}
        >
          <Link
            href="/search"
            className={cn(
              'flex items-center gap-3 w-full',
              'font-display text-[10px] tracking-[0.22em] uppercase',
              'text-piano-cream/35 hover:text-piano-cream/65 transition-colors duration-150',
            )}
          >
            <SearchIcon className="w-3.5 h-3.5 shrink-0" />
            Search Pianos
          </Link>

          <div className="mt-8">
            <div
              className="h-px mb-3"
              style={{
                background: 'linear-gradient(to right, rgba(200,160,75,0.5), transparent)',
                width: mobileMenuOpen ? '1.5rem' : '0',
                transition: `width 0.6s ease ${navItems.length * 65 + 420}ms`,
              }}
            />
            <p className="font-display text-[9px] tracking-[0.28em] uppercase text-piano-cream/20">
              Used Steinways
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
