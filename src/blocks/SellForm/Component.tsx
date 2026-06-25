import React from 'react'
import { SellPianoForm } from '@/app/(frontend)/sell-your-piano/_components/SellPianoForm'

type SellFormBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  intro?: string | null
  blockType: 'sellForm'
  id?: string | null
  blockName?: string | null
  disableInnerContainer?: boolean
}

// ── Static defaults (mirror the hand-built /sell-your-piano form section) ──
const DEFAULT_EYEBROW = 'Piano Inquiry'
const DEFAULT_HEADING = 'Please provide information about your piano'
const DEFAULT_INTRO =
  'Please note: Due to the high volume of inquiries, we will consider pianos submitted here over phone calls. We will endeavor to respond as quickly as time allows.'

export const SellFormBlock: React.FC<SellFormBlockProps> = ({ eyebrow, heading, intro }) => {
  const eyebrowText = eyebrow || DEFAULT_EYEBROW
  const headingText = heading || DEFAULT_HEADING
  const introText = intro || DEFAULT_INTRO

  return (
    <section className="max-w-4xl mx-auto px-8 py-20">
      <div className="bg-piano-warm-white px-10 py-14">
        <div className="flex items-center gap-5 mb-4">
          <p className="font-display text-sm tracking-[0.45em] uppercase text-piano-gold shrink-0">
            {eyebrowText}
          </p>
          <div className="flex-1 h-px bg-piano-linen" />
        </div>

        {headingText && (
          <p
            className="text-piano-black mb-12 font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem, 2.4vw, 2rem)' }}
          >
            {headingText}
          </p>
        )}

        {introText && (
          <p className="text-piano-stone text-base leading-relaxed mb-12 border-l-2 border-piano-gold/40 pl-5">
            {introText}
          </p>
        )}

        <SellPianoForm />
      </div>
    </section>
  )
}
