'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import type { Brand } from '@/payload-types'

type BrandModel = NonNullable<Brand['models']>[number]

interface ModelsDropdownProps {
  models: BrandModel[]
  scrolled: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function ModelsDropdown({ models, scrolled, onMouseEnter, onMouseLeave }: ModelsDropdownProps) {
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
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center gap-0">

        {/* Brand label — left anchor */}
        <div
          className="shrink-0 py-5 pr-8"
          style={{ borderRight: '1px solid rgba(200, 160, 75, 0.12)' }}
        >
          <p
            className="font-display text-[8px] tracking-[0.55em] uppercase"
            style={{ color: 'rgba(200, 160, 75, 0.55)' }}
          >
            Steinway
          </p>
          <p
            className="font-display text-[8px] tracking-[0.5em] uppercase mt-0.5"
            style={{ color: 'rgba(255, 248, 235, 0.22)' }}
          >
            Models
          </p>
        </div>

        {/* Horizontally scrollable model strip */}
        <div
          className="flex-1 overflow-x-auto py-4 px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex items-stretch gap-0" style={{ minWidth: 'max-content' }}>
            {models.map((model, i) => (
              <Link
                key={model.id ?? model.slug}
                href={`/pianos/steinway/${model.slug}`}
                className="group relative flex flex-col justify-center px-6 py-3 cursor-pointer transition-all duration-200"
                style={{
                  borderRight: '1px solid rgba(200, 160, 75, 0.08)',
                  minWidth: '130px',
                  animationDelay: `${i * 35}ms`,
                }}
              >
                {/* Hover fill */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  style={{ backgroundColor: 'rgba(255, 248, 235, 0.04)' }}
                  aria-hidden
                />

                {/* Type label */}
                <span
                  className="relative block font-display text-[7.5px] tracking-[0.5em] uppercase mb-1.5 transition-colors duration-200"
                  style={{ color: 'rgba(200, 160, 75, 0.5)' }}
                >
                  {model.type === 'Concert Grand' ? 'Concert' : model.type}
                </span>

                {/* Model name */}
                <span
                  className="relative block transition-colors duration-200"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '21px',
                    fontWeight: 400,
                    lineHeight: 1,
                    color: 'rgba(255, 248, 235, 0.82)',
                  }}
                >
                  {model.name}
                </span>

                {/* Size */}
                {model.size && (
                  <span
                    className="relative block font-display text-[8px] tracking-[0.28em] mt-1.5 transition-colors duration-200"
                    style={{ color: 'rgba(255, 248, 235, 0.3)' }}
                  >
                    {model.size}
                  </span>
                )}

                {/* Gold underline on hover */}
                <span
                  className="absolute bottom-0 left-4 right-4 h-px transition-all duration-200 opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: 'rgba(200, 160, 75, 0.35)' }}
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </div>

        {/* View all — right anchor */}
        <div
          className="shrink-0 py-5 pl-8"
          style={{ borderLeft: '1px solid rgba(200, 160, 75, 0.12)' }}
        >
          <Link
            href="/pianos/steinway"
            className="group flex items-center gap-2 transition-colors duration-200"
          >
            <span
              className="font-display text-[8px] tracking-[0.45em] uppercase transition-colors duration-200"
              style={{ color: 'rgba(255, 248, 235, 0.28)' }}
            >
              View All
            </span>
            <span
              className="font-display text-[10px] transition-all duration-200 group-hover:translate-x-0.5"
              style={{ color: 'rgba(200, 160, 75, 0.4)' }}
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
