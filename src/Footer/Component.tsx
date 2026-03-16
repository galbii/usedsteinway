import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer
      className="mt-auto"
      style={{
        background: 'hsl(0 0% 10%)',
        borderTop: '1px solid hsl(40 46% 56% / 0.15)',
      }}
    >
      <div
        className="container py-8 flex flex-col md:flex-row md:justify-between md:items-center gap-6"
      >
        <div className="flex flex-col gap-2">
          <Link href="/">
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.15rem',
                fontWeight: 400,
                letterSpacing: '0.04em',
                color: 'hsl(40 33% 99%)',
              }}
            >
              UsedSteinways
              <span style={{ color: 'hsl(40 46% 56%)' }}>.com</span>
            </span>
          </Link>
          <p
            className="text-xs tracking-wide"
            style={{ color: 'hsl(220 9% 50%)', fontStyle: 'italic', fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Every piano personally selected. Every detail inspected.
          </p>
        </div>

        {navItems.length > 0 && (
          <nav className="flex flex-col md:flex-row gap-5">
            {navItems.map(({ link }, i) => {
              return (
                <CMSLink
                  className="text-[11px] tracking-[0.15em] uppercase transition-colors duration-150 text-piano-silver hover:text-piano-gold font-display"
                  key={i}
                  {...link}
                />
              )
            })}
          </nav>
        )}
      </div>

      <div
        className="container py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2"
        style={{ borderTop: '1px solid hsl(0 0% 14%)' }}
      >
        <p
          className="text-xs tracking-wide"
          style={{ color: 'hsl(220 9% 38%)', fontFamily: "'Syne', sans-serif" }}
        >
          © {new Date().getFullYear()} UsedSteinways.com — Concord, New Hampshire
        </p>
        <p
          className="text-xs"
          style={{ color: 'hsl(220 9% 30%)', fontFamily: "'Syne', sans-serif" }}
        >
          Roger&apos;s Piano
        </p>
      </div>
    </footer>
  )
}
