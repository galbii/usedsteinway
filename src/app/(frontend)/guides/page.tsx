import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { GUIDES } from '@/lib/piano-data'
import { InquiryCTA } from '@/components/piano/InquiryCTA'

export const metadata: Metadata = {
  title: 'Piano Buying Guides | UsedSteinways.com',
  description:
    'Expert guides on buying pre-owned Steinway and premium pianos. Pricing guides, model comparisons, restoration insights, and what to look for.',
}

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-piano-cream">
      {/* Hero */}
      <section className="bg-piano-black py-28 px-8">
        <div className="max-w-3xl mx-auto">
          <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-5">
            Knowledge Base
          </p>
          <h1
            className="font-cormorant font-light text-white mb-6 leading-none"
            style={{ fontSize: 'clamp(3.6rem, 7vw, 8.5rem)' }}
          >
            Piano Buying Guides
          </h1>
          <p className="text-piano-cream/70 text-lg max-w-2xl leading-relaxed">
            Three decades of expertise distilled into practical guides. From pricing to restoration,
            everything you need to buy a world-class piano with confidence.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-28 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group block bg-piano-cream border border-piano-linen hover:border-piano-gold/30 transition-all duration-200 hover:shadow-lg overflow-hidden"
              >
                {guide.imageUrl && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-piano-warm-white">
                    <Image
                      src={guide.imageUrl}
                      alt={guide.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-piano-black/20 group-hover:bg-piano-black/10 transition-colors" />
                  </div>
                )}
                <div className="p-7">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display text-[11px] tracking-[0.3em] uppercase text-piano-gold">
                      {guide.category}
                    </span>
                    <span className="text-piano-stone/70 text-xs">{guide.readTime}</span>
                  </div>
                  <h2 className="font-cormorant font-light text-piano-black text-3xl mb-3 leading-snug group-hover:text-piano-gold transition-colors">
                    {guide.title}
                  </h2>
                  <p className="text-piano-stone text-base leading-relaxed line-clamp-3">
                    {guide.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-piano-gold/60 group-hover:text-piano-gold transition-colors">
                    <span className="font-display text-[11px] tracking-[0.3em] uppercase">
                      Read Guide
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InquiryCTA variant="dark" />
    </main>
  )
}
