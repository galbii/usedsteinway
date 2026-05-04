'use client'

import React from 'react'
import Link from 'next/link'
import type { Brand } from '@/payload-types'

type BrandModel = NonNullable<Brand['models']>[number]

interface MobileModelsSectionProps {
  models: BrandModel[]
}

export function MobileModelsSection({ models }: MobileModelsSectionProps) {
  return (
    <div className="pl-3 border-l border-[rgba(200,160,75,0.2)]">
      {models.map((model) => (
        <Link
          key={model.id ?? model.slug}
          href={`/pianos/steinway/${model.slug}`}
          className="group flex items-baseline gap-3 py-2.5 transition-colors duration-150"
        >
          <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[rgba(200,160,75,0.55)] shrink-0 w-14">
            {model.type === 'Concert Grand' ? 'Concert' : model.type}
          </span>
          <span
            className="text-[rgba(255,248,235,0.72)] group-hover:text-[rgba(255,248,235,1)] transition-colors duration-150"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 400, lineHeight: 1 }}
          >
            {model.name}
          </span>
          {model.size && (
            <span className="font-display text-[10px] tracking-[0.2em] text-[rgba(255,248,235,0.28)] ml-auto shrink-0">
              {model.size}
            </span>
          )}
        </Link>
      ))}

      <Link
        href="/pianos/steinway"
        className="flex items-center gap-2 pt-3 pb-1 font-display text-[10px] tracking-[0.35em] uppercase text-[rgba(200,160,75,0.42)] hover:text-[rgba(200,160,75,0.72)] transition-colors duration-150"
      >
        View all models
        <span>→</span>
      </Link>
    </div>
  )
}
