'use client'

import React, { useState, useRef, useCallback } from 'react'

import type { Header as HeaderType, Brand } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ModelsDropdown } from './ModelsDropdown'
import { ResourcesDropdown } from './ResourcesDropdown'
import { BrandsDropdown } from './BrandsDropdown'

type BrandModel = NonNullable<Brand['models']>[number]

interface HeaderNavProps {
  data: HeaderType
  models?: BrandModel[]
  scrolled?: boolean
}

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

type ActiveDropdown = 'models' | 'resources' | 'brands' | null

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, models = [], scrolled = false }) => {
  const allItems = data?.navItems || []
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const mainItems = allItems.filter(({ link }) => {
    const href = resolveNavHref(link)
    const label = link?.label?.toLowerCase() ?? ''
    return !href.includes('/contact') && label !== 'contact'
  })

  const openDropdown = useCallback((which: ActiveDropdown) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setActiveDropdown(which)
  }, [])

  const scheduleClose = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setActiveDropdown(null), 120)
  }, [])

  return (
    <nav className="hidden lg:flex items-center gap-10">
      {mainItems.map(({ link }, i) => {
        const href = resolveNavHref(link)
        const label = link?.label?.toLowerCase() ?? ''

        const isSteinwayLink = href === '/pianos/steinway' || href.startsWith('/pianos/steinway')
        const isResourcesLink = label === 'resources'
        const isPianosLink = href === '/pianos'

        const hasModelsDropdown = isSteinwayLink && models.length > 0
        const hasResourcesDropdown = isResourcesLink
        const hasBrandsDropdown = isPianosLink

        const isActive =
          (hasModelsDropdown && activeDropdown === 'models') ||
          (hasResourcesDropdown && activeDropdown === 'resources') ||
          (hasBrandsDropdown && activeDropdown === 'brands')

        return (
          <span
            key={i}
            className="relative group animate-nav-in"
            style={{ animationDelay: `${i * 80 + 200}ms` }}
            onMouseEnter={
              hasModelsDropdown
                ? () => openDropdown('models')
                : hasResourcesDropdown
                  ? () => openDropdown('resources')
                  : hasBrandsDropdown
                    ? () => openDropdown('brands')
                    : undefined
            }
            onMouseLeave={
              hasModelsDropdown || hasResourcesDropdown || hasBrandsDropdown ? scheduleClose : undefined
            }
          >
            <CMSLink
              {...link}
              appearance="link"
              className="font-display font-medium text-[13px] tracking-[0.2em] uppercase text-piano-cream/72 group-hover:text-piano-cream transition-colors duration-300"
            />
            {/* Indicator dot for items with a dropdown */}
            {(hasModelsDropdown || hasResourcesDropdown || hasBrandsDropdown) && (
              <span
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full transition-opacity duration-200"
                style={{
                  backgroundColor: 'rgba(200, 160, 75, 0.6)',
                  opacity: isActive ? 1 : 0,
                }}
                aria-hidden
              />
            )}
          </span>
        )
      })}

      {activeDropdown === 'models' && models.length > 0 && (
        <ModelsDropdown
          models={models}
          scrolled={scrolled}
          onMouseEnter={() => openDropdown('models')}
          onMouseLeave={scheduleClose}
        />
      )}

      {activeDropdown === 'resources' && (
        <ResourcesDropdown
          scrolled={scrolled}
          onMouseEnter={() => openDropdown('resources')}
          onMouseLeave={scheduleClose}
        />
      )}

      {activeDropdown === 'brands' && (
        <BrandsDropdown
          scrolled={scrolled}
          onMouseEnter={() => openDropdown('brands')}
          onMouseLeave={scheduleClose}
        />
      )}
    </nav>
  )
}
