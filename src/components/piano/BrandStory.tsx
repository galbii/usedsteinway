import type { Brand } from '@/types/piano'

interface BrandStoryProps {
  brand: Brand
}

/**
 * "About the brand" editorial section. Rendered directly beneath the hero on
 * every brand landing page (Steinway, Shigeru, and the dynamic /pianos/[slug]
 * brand pages). Extracted from BrandPageV2 so the brand story always leads,
 * ahead of inventory and the model lineup.
 */
export function BrandStory({ brand }: BrandStoryProps) {
  return (
    <section className="bg-piano-cream py-28 px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <span className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold block mb-5">
            The Instrument
          </span>
          <h2
            className="font-cormorant font-light text-piano-black leading-snug mb-8"
            style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4.5rem)' }}
          >
            About {brand.name}
          </h2>
          <p className="text-piano-stone text-lg leading-relaxed">{brand.description}</p>
        </div>
        {brand.whyBuyPreowned.length > 0 && (
          <div className="border-l border-piano-linen pl-12">
            <span className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold block mb-8">
              The Case for Pre-Owned
            </span>
            <ul className="space-y-6">
              {brand.whyBuyPreowned.map((reason, i) => (
                <li key={i} className="flex gap-5">
                  <span className="mt-0.5 shrink-0 w-6 h-6 border border-piano-gold/40 flex items-center justify-center text-piano-gold font-display text-[9px] font-bold">
                    {i + 1}
                  </span>
                  <p className="text-piano-stone text-base leading-relaxed">{reason}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
