'use client'

import React, { useState, useRef, useCallback } from 'react'

import type { Header as HeaderType, Brand } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ModelsDropdown } from './ModelsDropdown'

type BrandModel = NonNullable<Brand['models']>[number]

interface HeaderNavProps {
  data: HeaderType
  models?: BrandModel[]
  scrolled?: boolean
}

// Mirror the href resolution logic from CMSLink so we can detect the steinway link
// regardless of whether it's configured as a custom URL or an internal reference.
function resolveNavHref(link: NonNullable<HeaderType['navItems']>[number]['link']): string {
  if (
    link?.type === 'reference' &&
    typeof link.reference?.value === 'object' &&
    link.reference.value !== null &&
    'slug' in link.reference.value &&
    link.reference.value.slug
  ) {
    const prefix = link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''
    return `${prefix}/${link.reference.value.slug}`
  }
  return link?.url ?? ''
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, models = [], scrolled = false }) => {
  const allItems = data?.navItems || []
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Contact is handled separately in the right-side slot
  const mainItems = allItems.filter(({ link }) => {
    const href = resolveNavHref(link)
    const label = link?.label?.toLowerCase() ?? ''
    return !href.includes('/contact') && label !== 'contact'
  })

  const openDropdown = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setDropdownOpen(true)
  }, [])

  const scheduleClose = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setDropdownOpen(false), 120)
  }, [])

  return (
    <nav className="hidden lg:flex items-center gap-10">
      {mainItems.map(({ link }, i) => {
        const href = resolveNavHref(link)
        const isSteinwayLink = href === '/pianos/steinway' || href.startsWith('/pianos/steinway')
        const hasDropdown = isSteinwayLink && models.length > 0

        return (
          <span
            key={i}
            className="relative group animate-nav-in"
            style={{ animationDelay: `${i * 80 + 200}ms` }}
            onMouseEnter={hasDropdown ? openDropdown : undefined}
            onMouseLeave={hasDropdown ? scheduleClose : undefined}
          >
            <CMSLink
              {...link}
              appearance="link"
              className="font-display font-medium text-[13px] tracking-[0.2em] uppercase text-piano-cream/72 group-hover:text-piano-cream transition-colors duration-300"
            />
            {/* Subtle indicator dot for items with dropdown */}
            {hasDropdown && (
              <span
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full transition-opacity duration-200"
                style={{
                  backgroundColor: 'rgba(200, 160, 75, 0.6)',
                  opacity: dropdownOpen ? 1 : 0,
                }}
                aria-hidden
              />
            )}
          </span>
        )
      })}

      {/* Models dropdown — rendered outside nav items to avoid overflow clipping */}
      {dropdownOpen && models.length > 0 && (
        <ModelsDropdown
          models={models}
          scrolled={scrolled}
          onMouseEnter={openDropdown}
          onMouseLeave={scheduleClose}
        />
      )}
    </nav>
  )
}
