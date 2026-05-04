'use client'

import React from 'react'
import Link from 'next/link'

const links = [
  { label: 'Guides', href: '/guides', description: 'Piano buying & care guides' },
  { label: 'Gallery', href: '/gallery', description: 'Visual archive of our pianos' },
  { label: 'Testimonials', href: '/testimonials', description: 'Stories from our clients' },
  { label: 'About', href: '/about', description: 'Our story and expertise' },
  { label: 'Contact', href: '/contact', description: 'Get in touch with us' },
]

export function MobileResourcesSection() {
  return (
    <div className="pl-3 border-l border-[rgba(200,160,75,0.2)]">
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group flex flex-col py-2.5 transition-colors duration-150"
        >
          <span
            className="text-[rgba(255,248,235,0.72)] group-hover:text-[rgba(255,248,235,1)] transition-colors duration-150 mb-0.5"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 400, lineHeight: 1 }}
          >
            {item.label}
          </span>
          <span className="font-display text-[10px] tracking-[0.3em] uppercase text-[rgba(255,248,235,0.28)]">
            {item.description}
          </span>
        </Link>
      ))}
    </div>
  )
}
