'use client'

import React from 'react'
import Link from 'next/link'

interface BrandsDropdownProps {
  scrolled: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const brands = [
  {
    eyebrow: 'Grand · Upright',
    label: 'Steinway & Sons',
    description: 'The world\'s most celebrated piano',
    href: '/steinway',
  },
  {
    eyebrow: 'Handcrafted',
    label: 'European Pianos',
    description: 'Bösendorfer, Blüthner & more',
    href: '/european-pianos',
  },
  {
    eyebrow: 'EX · SK Series',
    label: 'Shigeru Kawai',
    description: 'Japanese precision meets artistry',
    href: '/shigeru',
  },
]

export function BrandsDropdown({ scrolled, onMouseEnter, onMouseLeave }: BrandsDropdownProps) {
  return (
    <div
      className="fixed left-0 right-0 z-40 transition-[top] duration-500 ease-out"
      style={{
        top: scrolled ? '60px' : '72px',
        backgroundColor: 'hsl(350, 58%, 18%)',
        borderTop: '1px solid rgba(200, 160, 75, 0.22)',
        borderBottom: '1px solid rgba(200, 160, 75, 0.07)',
        boxShadow: '0 24px 64px -12px rgba(0,0,0,0.75)',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center">
        {/* Left anchor label */}
        <div
          className="shrink-0 py-9 pr-12"
          style={{ borderRight: '1px solid rgba(200, 160, 75, 0.12)' }}
        >
          <p
            className="font-display text-[11px] tracking-[0.55em] uppercase"
            style={{ color: 'rgba(200, 160, 75, 0.65)' }}
          >
            Our
          </p>
          <p
            className="font-display text-[11px] tracking-[0.5em] uppercase mt-1.5"
            style={{ color: 'rgba(255, 248, 235, 0.28)' }}
          >
            Pianos
          </p>
        </div>

        {/* Brand cards */}
        <div className="flex items-stretch py-4 px-8 gap-0">
          {brands.map((brand, i) => (
            <Link
              key={brand.href}
              href={brand.href}
              className="group relative flex flex-col justify-center px-10 py-6 transition-all duration-200"
              style={{
                borderRight: i < brands.length - 1 ? '1px solid rgba(200, 160, 75, 0.08)' : undefined,
                minWidth: '220px',
              }}
            >
              {/* Hover fill */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{ backgroundColor: 'rgba(255, 248, 235, 0.04)' }}
                aria-hidden
              />

              {/* Eyebrow */}
              <span
                className="relative block font-display text-[11px] tracking-[0.45em] uppercase mb-2.5 transition-colors duration-200"
                style={{ color: 'rgba(200, 160, 75, 0.6)' }}
              >
                {brand.eyebrow}
              </span>

              {/* Brand name */}
              <span
                className="relative block transition-colors duration-200"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '32px',
                  fontWeight: 400,
                  lineHeight: 1.1,
                  color: 'rgba(255, 248, 235, 0.88)',
                }}
              >
                {brand.label}
              </span>

              {/* Description */}
              <span
                className="relative block font-display text-[10px] tracking-[0.35em] uppercase mt-2.5 transition-colors duration-200"
                style={{ color: 'rgba(255, 248, 235, 0.32)' }}
              >
                {brand.description}
              </span>

              {/* Gold underline on hover */}
              <span
                className="absolute bottom-0 left-6 right-6 h-px transition-all duration-200 opacity-0 group-hover:opacity-100"
                style={{ backgroundColor: 'rgba(200, 160, 75, 0.45)' }}
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
