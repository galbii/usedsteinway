'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const allItems = data?.navItems || []

  // Contact is handled separately in the right-side slot
  const mainItems = allItems.filter(({ link }) => {
    const url = link?.url ?? ''
    const label = link?.label?.toLowerCase() ?? ''
    return !url.includes('/contact') && label !== 'contact'
  })

  return (
    <nav className="hidden lg:flex items-center gap-10">
      {mainItems.map(({ link }, i) => (
        <span
          key={i}
          className="relative group animate-nav-in opacity-0"
          style={{ animationDelay: `${i * 80 + 200}ms` }}
        >
          <CMSLink
            {...link}
            appearance="link"
            className="font-display font-semibold text-[13px] tracking-[0.2em] uppercase text-piano-cream group-hover:text-white transition-colors duration-200 pb-0.5"
          />
          {/* Gold underline — slides in from left on hover */}
          <span
            className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ease-out"
            style={{ backgroundColor: 'hsl(40, 72%, 60%)' }}
          />
        </span>
      ))}
    </nav>
  )
}
