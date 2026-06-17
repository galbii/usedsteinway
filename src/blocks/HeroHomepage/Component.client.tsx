'use client'

import { useState, useEffect } from 'react'
import { Media as MediaComponent } from '@/components/Media'
import type { Media } from '@/payload-types'

const HERO_INTERVAL = 3500
const HERO_FADE_MS  = 1000

type Props = {
  heroImages: Media[]
}

export function HeroImageCycler({ heroImages }: Props) {
  const [heroSlot, setHeroSlot] = useState<{ a: number; b: number; front: 'a' | 'b' }>({
    a: 0,
    b: Math.min(1, heroImages.length - 1),
    front: 'a',
  })

  useEffect(() => {
    if (heroImages.length <= 1) return
    const timer = setInterval(() => {
      setHeroSlot((prev) => {
        const currentIdx = prev.front === 'a' ? prev.a : prev.b
        const nextIdx    = (currentIdx + 1) % heroImages.length
        return prev.front === 'a'
          ? { a: prev.a, b: nextIdx, front: 'b' }
          : { a: nextIdx, b: prev.b, front: 'a' }
      })
    }, HERO_INTERVAL)
    return () => clearInterval(timer)
  }, [heroImages.length])

  if (heroImages.length === 0) return null

  return (
    <>
      {heroImages[heroSlot.a] && (
        <div
          className="absolute inset-0"
          style={{
            opacity: heroSlot.front === 'a' ? 1 : 0,
            transition: `opacity ${HERO_FADE_MS}ms ease-in-out`,
            animation: heroSlot.front === 'a' ? 'kenburns 18s ease-in-out infinite alternate' : undefined,
          }}
        >
          <MediaComponent
            resource={heroImages[heroSlot.a]!}
            fill
            imgClassName="object-cover object-center"
            priority
          />
        </div>
      )}
      {heroImages[heroSlot.b] && (
        <div
          className="absolute inset-0"
          style={{
            opacity: heroSlot.front === 'b' ? 1 : 0,
            transition: `opacity ${HERO_FADE_MS}ms ease-in-out`,
          }}
        >
          <MediaComponent
            resource={heroImages[heroSlot.b]!}
            fill
            imgClassName="object-cover object-center"
          />
        </div>
      )}
    </>
  )
}
