/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { InquiryCTA } from '@/components/piano/InquiryCTA'

export const metadata: Metadata = {
  title: 'About Roger | UsedSteinways.com',
  description:
    "The story behind UsedSteinways.com — three decades of expertise, a commitment to radical transparency, and a personal passion for the world's finest pianos.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-piano-cream">
      {/* Hero */}
      <section className="relative bg-piano-burgundy py-28 px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1600&q=80"
            alt="Grand piano"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-piano-black/40 to-piano-black" />
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-5">
              Our Story
            </p>
            <h1
              className="font-cormorant font-light text-white mb-6 leading-tight"
              style={{ fontSize: 'clamp(3.6rem, 7vw, 8.5rem)' }}
            >
              Every piano personally selected.
            </h1>
            <p className="text-piano-cream/70 text-xl leading-relaxed max-w-2xl">
              Three decades of expertise. A commitment to radical transparency.
              A collection where every instrument has earned its place.
            </p>
          </div>
        </div>
      </section>

      {/* Roger's Story */}
      <section className="py-32 px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">
              The Background
            </p>
            <h2
              className="font-cormorant font-light text-piano-black mb-8 leading-snug"
              style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
            >
              Thirty years of listening to what pianos say
            </h2>
            <div className="space-y-5 text-piano-stone leading-loose">
              <p className="text-lg leading-relaxed">
                I became a piano technician in 1993, initially to support my own performing career.
                What I discovered was that I loved the instruments themselves — the physics of how
                a 7,000-part machine transforms physical energy into musical expression.
              </p>
              <p className="text-lg leading-relaxed">
                I completed my Registered Piano Technician (RPT) certification in 1997 and spent
                the next decade maintaining concert grands for universities and performance venues
                across New England. I've worked on instruments at Symphony Hall, the New England
                Conservatory, and dozens of university concert halls.
              </p>
              <p className="text-lg leading-relaxed">
                UsedSteinways.com began in 2005 as a simple idea: serious buyers deserve better than
                the warehouse model. They deserve an expert who knows every instrument in the
                collection personally — who can tell you not just the specifications, but how the
                piano actually feels to play, and whether it suits your musical life.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden bg-piano-charcoal">
              <Image
                src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80"
                alt="Piano keyboard detail"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-piano-burgundy p-6 max-w-xs">
              <p className="font-cormorant font-light text-piano-gold text-3xl mb-1">
                30+
              </p>
              <p className="text-piano-silver text-sm font-display tracking-wide">
                years evaluating fine instruments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-28 px-8 bg-piano-cream border-t border-piano-linen">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-piano-charcoal p-10 relative">
              <div className="absolute top-6 left-8 text-piano-gold/20 font-display text-8xl font-bold leading-none select-none">
                "
              </div>
              <blockquote className="relative">
                <p className="font-cormorant font-light text-piano-cream text-2xl md:text-3xl leading-snug mb-6">
                  A warehouse fills a room with inventory. A curator fills a room with the right instruments.
                </p>
                <footer className="text-piano-silver text-sm font-display tracking-widest uppercase">
                  — Roger, founder
                </footer>
              </blockquote>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">
              Our Philosophy
            </p>
            <h2
              className="font-cormorant font-light text-piano-black mb-6 leading-snug"
              style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
            >
              The Curator, Not the Warehouse
            </h2>
            <div className="space-y-4 text-piano-stone leading-loose">
              <p className="text-lg leading-relaxed">
                Most pre-owned piano dealers operate like warehouses — acquire as many instruments as
                possible, display them, and let buyers sort it out. Volume is the business model.
              </p>
              <p className="text-lg leading-relaxed">
                We operate differently. At any given time, we carry 25–30 pianos. Not because we
                can't find more. Because we won't add an instrument to the collection unless we can
                speak to it personally — its playing history, its condition in detail, its particular
                character as a musical instrument.
              </p>
              <p className="text-lg leading-relaxed">
                Smaller collection. Deeper expertise. Personal relationships with every buyer.
                That's the boutique model, and it produces better outcomes for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Three P's */}
      <section className="bg-piano-burgundy border-t border-piano-gold/10 overflow-hidden">

        {/* Section header */}
        <div className="max-w-7xl mx-auto px-8 pt-28 pb-16">
          <div className="flex items-center gap-5 mb-10">
            <div className="h-px w-10 shrink-0 bg-piano-gold/50" />
            <p className="font-display text-[10px] tracking-[0.5em] uppercase text-piano-gold">
              Our Philosophy
            </p>
          </div>
          <h2
            className="font-cormorant font-light text-piano-cream leading-[1.02]"
            style={{ fontSize: 'clamp(3.2rem, 5.5vw, 6rem)' }}
          >
            People, Policies<br />and Pianos.
          </h2>
        </div>

        {/* Three columns */}
        <div className="max-w-7xl mx-auto px-8 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-piano-gold/10">

            <div className="py-12 lg:pr-14 border-b lg:border-b-0 lg:border-r border-piano-gold/10">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-cormorant font-light italic leading-none select-none text-[5rem] text-piano-gold/15">P</span>
                <h3 className="font-cormorant font-light text-piano-cream" style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)', lineHeight: 1.1 }}>
                  People
                </h3>
              </div>
              <p className="text-piano-silver/55 text-lg leading-[1.85]">
                Passionate and educated in all things piano. We spend as much time as needed — covering origin, scale design, materials, and how instruments compare — until we've found the right piano for you. No detail is too small.
              </p>
            </div>

            <div className="py-12 lg:px-14 border-b lg:border-b-0 lg:border-r border-piano-gold/10">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-cormorant font-light italic leading-none select-none text-[5rem] text-piano-gold/15">P</span>
                <h3 className="font-cormorant font-light text-piano-cream" style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)', lineHeight: 1.1 }}>
                  Policies
                </h3>
              </div>
              <p className="text-piano-silver/55 text-lg leading-[1.85]">
                Your piano purchase is an investment in your musical life. Our full trade-up policy lets you trade in at the original price paid — so you can start where you are, and move forward when you're ready.
              </p>
            </div>

            <div className="py-12 lg:pl-14">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-cormorant font-light italic leading-none select-none text-[5rem] text-piano-gold/15">P</span>
                <h3 className="font-cormorant font-light text-piano-cream" style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)', lineHeight: 1.1 }}>
                  Pianos
                </h3>
              </div>
              <p className="text-piano-silver/55 text-lg leading-[1.85]">
                No single manufacturer makes the perfect piano for everyone. We select over two hundred instruments from makers across Asia and Europe — traveling to the factories ourselves — so we can match each pianist to the instrument that truly fits.
              </p>
            </div>

          </div>
        </div>

        {/* Fazioli quote */}
        <div className="border-t border-piano-gold/10 mt-0">
          <div className="max-w-7xl mx-auto px-8 py-16">
            <div className="grid lg:grid-cols-[auto_1fr] gap-10 items-start">
              <div className="w-12 h-12 flex items-center justify-center border border-piano-gold/20 shrink-0">
                <span className="font-display text-[9px] tracking-[0.3em] uppercase text-piano-gold">F</span>
              </div>
              <div>
                <p className="font-display text-[9px] tracking-[0.42em] uppercase text-piano-silver/30 mb-5">
                  Fazioli — on artistic freedom
                </p>
                <blockquote
                  className="font-cormorant font-light italic text-piano-cream/70 leading-[1.4] mb-6"
                  style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)', maxWidth: '72ch' }}
                >
                  "Fazioli refuses to impose limitations on musical artists, convinced that
                  they should have the freedom to choose which instrument to play, based purely
                  on the belief that it is the best vehicle to express their talent."
                </blockquote>
                <p className="text-piano-silver/35 text-base leading-relaxed" style={{ maxWidth: '60ch' }}>
                  This is why at Roger's Piano, you will find the widest range of pianos
                  than any other showroom in New England.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Credentials / Timeline */}
      <section className="py-28 px-8 bg-piano-cream border-t border-piano-linen">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto">
            <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4 text-center">
              A Career in Brief
            </p>
            <h2
              className="font-cormorant font-light text-piano-black mb-14 text-center"
              style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
            >
              The Background Behind the Collection
            </h2>
            <div className="space-y-0">
              {[
                {
                  year: '1993',
                  event: 'Began training as a piano technician while performing as a concert pianist',
                },
                {
                  year: '1997',
                  event: 'Completed RPT (Registered Piano Technician) certification through the Piano Technicians Guild',
                },
                {
                  year: '1998–2004',
                  event: 'Concert hall technician for universities and performance venues across New England, including regular work with Symphony Hall and the New England Conservatory',
                },
                {
                  year: '2001',
                  event: 'Completed advanced Steinway technical training; began private work with Steinway Artist clients',
                },
                {
                  year: '2005',
                  event: 'Founded UsedSteinways.com with the first curated collection of 12 instruments',
                },
                {
                  year: 'Today',
                  event: 'Over 300 instruments placed with clients across the US and Canada. Still personally evaluates every piano before it enters the collection.',
                },
              ].map(({ year, event }, i) => (
                <div key={year} className="flex gap-8 group">
                  <div className="flex flex-col items-center">
                    <div className="w-px bg-piano-linen group-first:h-4 h-0 grow-0" />
                    <div className="w-2 h-2 rounded-full bg-piano-gold shrink-0 my-2" />
                    <div className={`w-px bg-piano-linen grow ${i === 5 ? 'h-4' : ''}`} />
                  </div>
                  <div className="pb-8 pt-1">
                    <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-1">
                      {year}
                    </p>
                    <p className="text-piano-stone text-lg leading-relaxed">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Positioning Statement */}
      <section className="py-28 px-8 bg-piano-burgundy border-t border-piano-gold/10">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote>
            <p
              className="font-cormorant font-light text-piano-cream leading-snug mb-8"
              style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
            >
              "Every piano personally selected. Every detail inspected. The most discerning
              collection of pre-owned Steinway and world-class pianos in New England."
            </p>
          </blockquote>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pianos"
              className="inline-block bg-piano-cream text-piano-burgundy px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:opacity-90 transition-opacity"
            >
              Browse the Collection
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-piano-gold text-piano-gold px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-gold/10 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <InquiryCTA variant="light" />
    </main>
  )
}
