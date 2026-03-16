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
      <section className="relative bg-piano-black py-28 px-8 overflow-hidden">
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
            <p className="font-display text-xs tracking-[0.3em] uppercase text-piano-gold mb-5">
              Our Story
            </p>
            <h1
              className="text-5xl md:text-6xl font-medium text-white mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
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
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-burgundy mb-4">
              The Background
            </p>
            <h2
              className="text-3xl md:text-4xl font-medium text-piano-black mb-8 leading-snug"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Thirty years of listening to what pianos say
            </h2>
            <div className="space-y-5 text-gray-700 leading-loose">
              <p>
                I became a piano technician in 1993, initially to support my own performing career.
                What I discovered was that I loved the instruments themselves — the physics of how
                a 7,000-part machine transforms physical energy into musical expression.
              </p>
              <p>
                I completed my Registered Piano Technician (RPT) certification in 1997 and spent
                the next decade maintaining concert grands for universities and performance venues
                across New England. I've worked on instruments at Symphony Hall, the New England
                Conservatory, and dozens of university concert halls.
              </p>
              <p>
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
            <div className="absolute -bottom-6 -left-6 bg-piano-black p-6 max-w-xs">
              <p
                className="text-piano-gold text-3xl font-medium mb-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
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
      <section className="py-20 px-8 bg-piano-cream border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-piano-charcoal p-10 relative">
              <div className="absolute top-6 left-8 text-piano-gold/20 font-display text-8xl font-bold leading-none select-none">
                "
              </div>
              <blockquote className="relative">
                <p
                  className="text-piano-cream text-2xl md:text-3xl font-medium leading-snug mb-6"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  A warehouse fills a room with inventory. A curator fills a room with the right instruments.
                </p>
                <footer className="text-piano-silver text-sm font-display tracking-widest uppercase">
                  — Roger, founder
                </footer>
              </blockquote>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-burgundy mb-4">
              Our Philosophy
            </p>
            <h2
              className="text-3xl md:text-4xl font-medium text-piano-black mb-6 leading-snug"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              The Curator, Not the Warehouse
            </h2>
            <div className="space-y-4 text-gray-700 leading-loose">
              <p>
                Most pre-owned piano dealers operate like warehouses — acquire as many instruments as
                possible, display them, and let buyers sort it out. Volume is the business model.
              </p>
              <p>
                We operate differently. At any given time, we carry 25–30 pianos. Not because we
                can't find more. Because we won't add an instrument to the collection unless we can
                speak to it personally — its playing history, its condition in detail, its particular
                character as a musical instrument.
              </p>
              <p>
                Smaller collection. Deeper expertise. Personal relationships with every buyer.
                That's the boutique model, and it produces better outcomes for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 px-8 bg-piano-black border-t border-piano-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-gold mb-3">
              What Sets Us Apart
            </p>
            <h2
              className="text-3xl md:text-4xl font-medium text-piano-cream"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Three Pillars
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Multi-Brand Authority',
                body: "We're not married to any single manufacturer. We select the finest instruments regardless of nameplate — Steinway, Bösendorfer, Bechstein, Kawai, Blüthner. Our only criterion is: is this instrument exceptional?",
              },
              {
                number: '02',
                title: 'Radical Transparency',
                body: "We show prices. We provide detailed condition reports. We record video demos of every piano. We disclose everything — because serious buyers deserve to make informed decisions, not guesses.",
              },
              {
                number: '03',
                title: 'Boutique Curation',
                body: "We never carry more than 25–30 instruments at a time. Not because we can't find more — because we won't carry anything we haven't personally approved. Fewer pianos. Deeper expertise. Better outcomes for you.",
              },
            ].map(({ number, title, body }) => (
              <div key={number} className="border border-piano-gold/15 p-8">
                <p className="text-piano-gold/30 font-display text-5xl font-bold mb-6">{number}</p>
                <h3
                  className="text-xl font-medium text-piano-cream mb-4"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {title}
                </h3>
                <p className="text-piano-silver/80 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials / Timeline */}
      <section className="py-20 px-8 bg-piano-cream border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto">
            <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-burgundy mb-4 text-center">
              A Career in Brief
            </p>
            <h2
              className="text-3xl font-medium text-piano-black mb-12 text-center"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
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
                    <div className="w-px bg-gray-200 group-first:h-4 h-0 grow-0" />
                    <div className="w-2 h-2 rounded-full bg-piano-gold shrink-0 my-2" />
                    <div className={`w-px bg-gray-200 grow ${i === 5 ? 'h-4' : ''}`} />
                  </div>
                  <div className="pb-8 pt-1">
                    <p className="font-display text-xs tracking-widest uppercase text-piano-burgundy mb-1">
                      {year}
                    </p>
                    <p className="text-gray-700 leading-relaxed">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Positioning Statement */}
      <section className="py-20 px-8 bg-piano-black border-t border-piano-gold/10">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote>
            <p
              className="text-3xl md:text-4xl text-piano-cream font-medium leading-snug mb-8"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              "Every piano personally selected. Every detail inspected. The most discerning
              collection of pre-owned Steinway and world-class pianos in New England."
            </p>
          </blockquote>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pianos"
              className="inline-block bg-piano-burgundy text-white px-8 py-4 font-display text-xs tracking-[0.2em] uppercase hover:bg-piano-burgundy/90 transition-colors"
            >
              Browse the Collection
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-piano-gold text-piano-gold px-8 py-4 font-display text-xs tracking-[0.2em] uppercase hover:bg-piano-gold/10 transition-colors"
            >
              Contact Roger
            </Link>
          </div>
        </div>
      </section>

      <InquiryCTA variant="light" />
    </main>
  )
}
