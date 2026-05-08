'use client'

import React from 'react'
import Link from 'next/link'

const brands = [
  {
    eyebrow: 'Grand · Upright',
    label: 'Steinway & Sons',
    description: "The World's Most Recognized Brand",
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

export function MobileBrandsSection() {
  return (
    <div className="pl-3 border-l border-[rgba(200,160,75,0.2)]">
      {brands.map((brand) => (
        <Link
          key={brand.href}
          href={brand.href}
          className="group flex flex-col py-3 transition-colors duration-150"
        >
          <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[rgba(200,160,75,0.55)] mb-1">
            {brand.eyebrow}
          </span>
          <span
            className="text-[rgba(255,248,235,0.72)] group-hover:text-[rgba(255,248,235,1)] transition-colors duration-150 mb-0.5"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 400, lineHeight: 1.1 }}
          >
            {brand.label}
          </span>
          <span className="font-display text-[10px] tracking-[0.3em] uppercase text-[rgba(255,248,235,0.28)]">
            {brand.description}
          </span>
        </Link>
      ))}
    </div>
  )
}
