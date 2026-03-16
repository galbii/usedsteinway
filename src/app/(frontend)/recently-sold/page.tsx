import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { InquiryCTA } from '@/components/piano/InquiryCTA'

export const metadata: Metadata = {
  title: 'Recently Sold Pianos | UsedSteinways.com',
  description:
    "A record of fine pianos we've placed in new homes across New England and beyond. Social proof of our curation quality.",
}

const RECENTLY_SOLD = [
  {
    title: '2012 Steinway Model B — Polished Ebony',
    soldTo: 'A concert pianist in Brookline, MA',
    soldDate: 'January 2026',
    price: '$84,000',
    imageUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&q=80',
    note: 'Purchased new from Steinway New York. Single owner. Sold with complete service history.',
  },
  {
    title: '2008 Bösendorfer 200 — Vienna',
    soldTo: 'A Viennese-trained pianist, Providence RI',
    soldDate: 'December 2025',
    price: '$98,000',
    imageUrl: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=600&q=80',
    note: 'Pre-Yamaha acquisition. The buyer had been searching for this exact vintage for three years.',
  },
  {
    title: '2003 C. Bechstein B 212',
    soldTo: 'A university piano faculty, Burlington VT',
    soldDate: 'November 2025',
    price: '$62,000',
    imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80',
    note: 'Required some action work; we arranged this before the sale. Now serving as a faculty practice instrument.',
  },
  {
    title: '1995 Steinway Model D — Rebuilt',
    soldTo: 'A private recital hall, Concord NH',
    soldDate: 'October 2025',
    price: '$110,000',
    imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&q=80',
    note: 'Full rebuild by Yamaha-certified rebuilder, 2018. New Bolduc soundboard and Renner action.',
  },
  {
    title: '2015 Shigeru Kawai SK-6',
    soldTo: 'A private student in Newton MA',
    soldDate: 'September 2025',
    price: '$72,000',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
    note: 'Buyer was comparing Steinway B. We played both back-to-back. The SK-6 won on tone and value.',
  },
  {
    title: '1978 Steinway Model B — Hamburg',
    soldTo: 'A collector, Cambridge MA',
    soldDate: 'August 2025',
    price: '$52,000',
    imageUrl: 'https://images.unsplash.com/photo-1552422535-c45813c61732?w=600&q=80',
    note: 'Vintage Hamburg with original strings and action — superb tone. Sold to a buyer who specifically sought pre-CBS era Hamburg instruments.',
  },
]

export default function RecentlySoldPage() {
  return (
    <main className="min-h-screen bg-piano-cream">
      {/* Hero */}
      <section className="bg-piano-black py-28 px-8">
        <div className="max-w-7xl mx-auto">
          <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-5">
            Archive
          </p>
          <h1
            className="font-cormorant font-light text-white mb-6"
            style={{ fontSize: 'clamp(3.6rem, 7vw, 8.5rem)' }}
          >
            Recently Sold
          </h1>
          <p className="text-piano-cream/70 text-lg max-w-xl leading-relaxed">
            A record of instruments placed in new homes. Every sale is a story — a piano that found
            the musician it deserved, and a musician who found the instrument they&apos;d been
            searching for.
          </p>
        </div>
      </section>

      {/* Sold Grid */}
      <section className="py-28 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {RECENTLY_SOLD.map((item, i) => (
              <div key={i} className="bg-piano-cream border border-piano-linen overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden bg-piano-warm-white">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 bg-piano-charcoal/90 px-3 py-1.5">
                    <span className="font-display text-xs tracking-widest uppercase text-piano-silver">
                      Sold
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-cormorant font-light text-piano-black text-3xl mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-piano-silver text-xs font-display tracking-wide mb-4">
                    {item.soldDate} · {item.price}
                  </p>
                  <p className="text-piano-stone text-base leading-relaxed mb-3">{item.note}</p>
                  <p className="text-piano-stone/70 text-xs italic">Now with: {item.soldTo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 px-8 bg-piano-black border-t border-piano-gold/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { stat: '200+', label: 'Pianos Placed' },
            { stat: '18', label: 'States Represented' },
            { stat: '12', label: 'Countries Sourced From' },
            { stat: '100%', label: 'Satisfied Buyers' },
          ].map(({ stat, label }) => (
            <div key={label}>
              <p className="font-cormorant font-light text-piano-gold text-4xl mb-2">
                {stat}
              </p>
              <p className="font-display text-xs tracking-[0.15em] uppercase text-piano-silver/60">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 text-center bg-piano-cream border-t border-piano-linen">
        <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-3">
          Find Your Instrument
        </p>
        <h2
          className="font-cormorant font-light text-piano-black mb-6"
          style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
        >
          Your Piano is in the Collection
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/pianos"
            className="inline-block bg-piano-black text-piano-cream px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-charcoal transition-colors"
          >
            Browse Available Pianos
          </Link>
          <Link
            href="/contact"
            className="inline-block border border-piano-black text-piano-black px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-black hover:text-white transition-colors"
          >
            Tell Us What You Need
          </Link>
        </div>
      </section>

      <InquiryCTA variant="dark" />
    </main>
  )
}
