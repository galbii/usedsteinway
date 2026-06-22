'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/ui'
import type { PianoModel } from '@/types/piano'

// Descriptions longer than this get clamped to ~3 lines with a "Read full
// description" toggle. Short blurbs (e.g. "Steinway Upright") render in full
// with no toggle, so the control only appears when it does something.
const EXPAND_THRESHOLD = 140

export function SteinwayModelCard({ model }: { model: PianoModel }) {
  const [expanded, setExpanded] = useState(false)
  const expandable = model.description.length > EXPAND_THRESHOLD

  return (
    <div className="group relative flex flex-col w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)] p-8 rounded-2xl overflow-hidden border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(89,25,42,0.07)] transition-all duration-300 hover:bg-piano-burgundy/85 hover:border-piano-burgundy/40 hover:shadow-[0_20px_50px_rgba(89,25,42,0.28)]">
      {/* Left accent bar on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[3px] bg-piano-gold transition-all duration-300 ease-out" />

      {/* Stretched link — the whole card still navigates. It sits beneath the
          expand toggle (z-0 vs z-10) so the toggle handles its own clicks
          without nesting a button inside an anchor. */}
      <Link
        href={`/steinway/${model.slug}`}
        className="absolute inset-0 z-0"
        aria-label={`View ${model.name}`}
      />

      <span className="relative font-display text-[10px] tracking-[0.4em] uppercase text-piano-gold block mb-4">
        {model.type}
        {model.size ? ` · ${model.size}` : ''}
      </span>

      <h3
        className="relative font-cormorant font-light text-piano-black group-hover:text-white leading-none mb-4 transition-colors duration-300"
        style={{ fontSize: 'clamp(2rem, 2.5vw, 2.8rem)' }}
      >
        {model.name}
      </h3>

      {/* Description — clamps to ~3 lines with a soft fade, expands to full
          height. mask-image fades the clipped text regardless of the card's
          (hover-shifting) background; it's dropped once expanded. */}
      <div
        className={cn(
          'relative overflow-hidden transition-[max-height] duration-500 ease-in-out',
          expandable &&
            !expanded &&
            '[mask-image:linear-gradient(to_bottom,black_55%,transparent)]',
        )}
        style={{ maxHeight: expanded || !expandable ? '30rem' : '4.6rem' }}
      >
        <p className="text-piano-stone group-hover:text-piano-cream/70 text-sm leading-relaxed transition-colors duration-300">
          {model.description}
        </p>
      </div>

      {expandable && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="relative z-10 mt-3 self-start inline-flex items-center gap-1.5 font-display text-[10px] tracking-[0.3em] uppercase text-piano-burgundy group-hover:text-piano-gold transition-colors duration-300"
        >
          {expanded ? 'Show less' : 'Read full description'}
          <ChevronDown
            size={13}
            className={cn('transition-transform duration-300', expanded && 'rotate-180')}
          />
        </button>
      )}

      {/* Spacer keeps the footer pinned to the bottom so cards in a row align. */}
      <div aria-hidden className="flex-1 min-h-[1.5rem]" />

      {model.yearRange && (
        <p className="relative font-display text-[10px] tracking-[0.3em] uppercase text-piano-stone/60 group-hover:text-piano-cream/40 mb-5 transition-colors duration-300">
          {model.yearRange}
        </p>
      )}

      <span className="relative font-display text-[10px] tracking-[0.3em] uppercase text-piano-stone group-hover:text-piano-gold transition-colors duration-300 inline-flex items-center gap-1.5">
        View Model
        <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
      </span>
    </div>
  )
}
