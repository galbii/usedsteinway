'use client'

import { useEffect } from 'react'

/**
 * Drives the `.sr` scroll-reveal system (defined in globals.css) for any page
 * rendered from CMS blocks.
 *
 * The static homepage and About page run their own `useScrollReveal` hook, but
 * the block render path (RenderBlocks) has no observer. Without this, every
 * block that ships `.sr` / `.sr-d*` classes would stay at `opacity: 0` and
 * never appear. Mounting this once alongside the blocks reveals them exactly
 * like the static pages do.
 */
export function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.sr, .sr-fade, .sr-left, .sr-right')
    if (els.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Both classes cover every variant (`.sr`/`.sr-fade` use `.visible`,
            // `.sr-left`/`.sr-right` use `.in-view`).
            entry.target.classList.add('visible', 'in-view')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
