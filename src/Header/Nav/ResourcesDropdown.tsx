'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'

interface ResourcesDropdownProps {
  scrolled: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const links = [
  { label: 'Guides', href: '/guides', description: 'Piano buying & care guides' },
  { label: 'Testimonials', href: '/testimonials', description: 'Stories from our clients' },
  { label: 'About', href: '/about', description: 'Our story and expertise' },
]

export function ResourcesDropdown({ scrolled, onMouseEnter, onMouseLeave }: ResourcesDropdownProps) {
  return (
    <div
      className={cn(
        'fixed left-0 right-0 z-40',
        'transition-[top] duration-500 ease-out',
      )}
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
        {/* Label — left anchor */}
        <div
          className="shrink-0 py-8 pr-12"
          style={{ borderRight: '1px solid rgba(200, 160, 75, 0.12)' }}
        >
          <p
            className="font-display text-[11px] tracking-[0.55em] uppercase"
            style={{ color: 'rgba(200, 160, 75, 0.65)' }}
          >
            Resources
          </p>
        </div>

        {/* Links */}
        <div className="flex items-stretch py-4 px-8 gap-1">
          {links.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex flex-col justify-center px-10 py-5 transition-all duration-200"
              style={{
                borderRight: i < links.length - 1 ? '1px solid rgba(200, 160, 75, 0.08)' : undefined,
                minWidth: '200px',
              }}
            >
              {/* Hover fill */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{ backgroundColor: 'rgba(255, 248, 235, 0.04)' }}
                aria-hidden
              />

              {/* Label */}
              <span
                className="relative block transition-colors duration-200"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '32px',
                  fontWeight: 400,
                  lineHeight: 1,
                  color: 'rgba(255, 248, 235, 0.88)',
                }}
              >
                {item.label}
              </span>

              {/* Description */}
              <span
                className="relative block font-display text-[10px] tracking-[0.35em] uppercase mt-2 transition-colors duration-200"
                style={{ color: 'rgba(255, 248, 235, 0.32)' }}
              >
                {item.description}
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
