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
        <CMSLink
          key={i}
          {...link}
          appearance="link"
          className="font-display font-semibold text-[13px] tracking-[0.2em] uppercase text-piano-cream hover:text-white transition-colors duration-150"
        />
      ))}
    </nav>
  )
}
