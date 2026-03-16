/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import Link from 'next/link'
import { InquiryCTA } from '@/components/piano/InquiryCTA'

export const metadata: Metadata = {
  title: 'The Complete Guide to Buying a Used Steinway | UsedSteinways.com',
  description:
    'Everything you need to know before spending $40,000–$120,000 on a pre-owned Steinway — condition evaluation, pricing, what to inspect, and how to negotiate.',
}

const TOC = [
  { id: 'why-preowned', label: 'Why Buy Pre-Owned?' },
  { id: 'models', label: 'Understanding the Models' },
  { id: 'inspection', label: 'What to Inspect' },
  { id: 'condition', label: 'Understanding Condition' },
  { id: 'pricing', label: 'Price Expectations' },
  { id: 'questions', label: 'Questions to Ask' },
  { id: 'prepurchase', label: 'Pre-Purchase Inspection' },
]

export default function BuyingGuidePage() {
  return (
    <main className="min-h-screen bg-piano-cream">
      {/* Hero */}
      <section className="bg-piano-black py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-piano-cream/50 font-display text-xs tracking-widest uppercase mb-8">
            <Link href="/guides" className="hover:text-piano-gold transition-colors">
              Guides
            </Link>
            <span>·</span>
            <span className="text-piano-cream">Buying a Used Steinway</span>
          </nav>
          <span className="font-display text-xs tracking-[0.2em] uppercase text-piano-gold bg-piano-gold/10 border border-piano-gold/30 px-3 py-1 mb-6 inline-block">
            Buying Guide
          </span>
          <h1
            className="text-4xl md:text-5xl font-medium text-white mt-5 mb-6 leading-snug"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The Complete Guide to Buying a Used Steinway
          </h1>
          <div className="flex items-center gap-6 text-piano-silver text-sm">
            <span>12 min read</span>
            <span>·</span>
            <span>By Roger · Updated February 2026</span>
          </div>
        </div>
      </section>

      {/* Article Layout */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-[1fr_280px] gap-16 items-start">
          {/* Article Body */}
          <article className="prose prose-lg max-w-none prose-headings:font-normal prose-headings:text-piano-black prose-a:text-piano-burgundy">
            <p
              className="text-xl text-gray-700 leading-relaxed not-prose mb-10"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Buying a pre-owned Steinway is one of the most financially and musically rewarding
              decisions a serious pianist can make — and one of the easiest to get wrong if you
              don't know what you're looking for.
            </p>

            <section id="why-preowned" className="mb-14">
              <h2
                className="text-2xl font-medium text-piano-black mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Why Buy Pre-Owned?
              </h2>
              <p className="text-gray-700 leading-loose mb-4">
                A new Steinway Model B retails for approximately $115,000. A 2010 Model B in
                excellent condition costs $65,000–$75,000. That $40,000 difference is not a quality
                gap — it's depreciation. The instrument's musical value hasn't declined; only its
                accounting value has.
              </p>
              <p className="text-gray-700 leading-loose mb-4">
                Better still: a well-maintained Steinway from the 1970s–1990s often has a tonal
                complexity that newer instruments don't match. The soundboard has had decades to
                settle and develop its voice. The action has been played and regulated by skilled
                technicians rather than factory robots.
              </p>
              <p className="text-gray-700 leading-loose mb-4">
                We've sold hundreds of pre-owned Steinways over three decades. The buyers who are
                happiest are invariably those who spent 20% less than the cost of a new instrument
                and ended up with something musically equal or superior. The buyers who have regrets
                are typically those who bought on impulse without proper inspection.
              </p>
              <blockquote className="border-l-4 border-piano-gold pl-6 py-2 my-8 not-prose">
                <p
                  className="text-xl text-gray-700 italic leading-relaxed"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  "We've never sold a piano we wouldn't be comfortable playing ourselves. Every
                  instrument in our collection has been personally evaluated."
                </p>
                <footer className="mt-3 text-sm text-piano-silver font-display tracking-wide">
                  — Roger
                </footer>
              </blockquote>
            </section>

            <section id="models" className="mb-14">
              <h2
                className="text-2xl font-medium text-piano-black mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Understanding the Models
              </h2>
              <p className="text-gray-700 leading-loose mb-4">
                Steinway makes six grand models, ranging from the 5'1" Model S to the 8'11¾" Model
                D. Each occupies a specific acoustic and spatial niche:
              </p>
              <div className="not-prose space-y-4 mb-6">
                {[
                  {
                    model: 'Model S',
                    size: "5'1\"",
                    note: "Smallest grand. Apartments, small rooms. Real Steinway tone in the most compact package. Best for rooms under 200 sq ft.",
                  },
                  {
                    model: 'Model M',
                    size: "5'7\"",
                    note: "Most popular home Steinway. Excellent balance of size and sound. Fits comfortably in most living rooms.",
                  },
                  {
                    model: 'Model O',
                    size: "5'10¾\"",
                    note: "Discontinued 1983. Vintage models only — excellent if well-maintained. A hidden gem of the line.",
                  },
                  {
                    model: 'Model A',
                    size: "6'2\"",
                    note: "Mid-range. More bass than the M, fits spaces where a B is too large. Underappreciated model.",
                  },
                  {
                    model: 'Model B',
                    size: "6'10\"",
                    note: "Our recommendation for serious home use. The finest home grand Steinway makes. Transforms any room acoustically.",
                  },
                  {
                    model: 'Model C',
                    size: "7'5\"",
                    note: "Professional instrument. Recital halls, large studios, serious collectors with appropriate space.",
                  },
                  {
                    model: 'Model D',
                    size: "8'11¾\"",
                    note: "Concert grand. Institutions and serious collectors only. A commitment of space as much as money.",
                  },
                ].map(({ model, size, note }) => (
                  <div key={model} className="flex gap-4 p-4 bg-white border border-gray-100">
                    <div className="shrink-0 w-24">
                      <span className="font-medium text-piano-black">{model}</span>
                      <span className="text-gray-400 text-sm ml-2">{size}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{note}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-700 leading-loose">
                We consistently recommend the <strong>Model B</strong> to buyers with a suitable
                room — it's the instrument where Steinway's engineering is most fully expressed
                without the logistical demands of the D. If you're measuring your room and a B fits,
                buy the B.
              </p>
            </section>

            <section id="inspection" className="mb-14">
              <h2
                className="text-2xl font-medium text-piano-black mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                What to Inspect
              </h2>
              <p className="text-gray-700 leading-loose mb-6">
                When you visit an instrument, work through these areas methodically. Don't let
                beautiful casework distract you from the mechanical and acoustic components that
                actually determine value.
              </p>
              <div className="not-prose space-y-6">
                {[
                  {
                    area: 'The Soundboard',
                    what: "Look for cracks running along the grain. Minor cracks don't always affect tone, but major ones do. Check the crown — the slight upward bow of the soundboard. Press gently on the surface between ribs: you should feel springiness, not flatness. A crowned soundboard is a healthy soundboard.",
                    redFlag:
                      "Multiple cracks crossing the grain, or a soundboard that has collapsed (no crown at all). This is the most expensive repair in piano rebuilding.",
                  },
                  {
                    area: 'The Action',
                    what: "Play every note slowly. Listen for ciphers — notes that don't stop sounding when the key is released. Check repetition speed: play each key rapidly five or six times and feel whether the hammer returns cleanly. Feel for consistency of touch weight across the entire keyboard. Inconsistency suggests deferred regulation.",
                    redFlag:
                      "Keys that don't return, hammers that cypher, wildly inconsistent touch weight from note to note. A regulation costs $500–$1,500; a full action rebuild costs $8,000–$15,000.",
                  },
                  {
                    area: 'The Strings',
                    what: "Open the lid and look along the strings at an angle. You're looking for surface rust on treble strings (acceptable in small amounts) versus deep pitting rust (unacceptable). Examine bass strings closely where the copper winding meets the steel core — this junction is where corrosion concentrates. Pluck a few bass strings with your fingernail; they should ring clearly, not sound muffled.",
                    redFlag:
                      "Heavy rust throughout the treble, or bass strings with broken windings or severe corrosion at the core junction. A complete restringing runs $3,000–$6,000.",
                  },
                  {
                    area: 'The Tuning Pins',
                    what: "Ask when it was last tuned and how long it held pitch. A piano in good condition should hold tune for 6–8 weeks minimum under normal conditions. Loose pins indicate a worn or cracked pinblock — the laminated maple block that the pins are driven into. The pinblock is not visible without removing the plate, but tuning stability is a reliable proxy.",
                    redFlag:
                      "A piano that won't hold tune for more than a few weeks. Pinblock replacement costs $3,000–$8,000 and requires dismantling the plate.",
                  },
                  {
                    area: 'The Case',
                    what: "Check veneer lifting, particularly around the legs and case seams. Look at the leg joints — they should be solid, not wobbly. Examine the lid hinge and prop stick. Cosmetic repairs are relatively inexpensive and shouldn't influence your assessment significantly. Structural issues are another matter.",
                    redFlag:
                      "Cracked or broken case structure, severely delaminating veneer across large surfaces, or loose leg joints. These suggest the instrument was stored improperly or moved carelessly.",
                  },
                  {
                    area: 'The Pedals',
                    what: "All three pedals should operate smoothly without squeaking or sticking. The sustain pedal should produce a clean, gradual increase in sustain. The sostenuto pedal should selectively sustain only the notes held at the moment of depression. The una corda pedal should shift the action slightly to the right.",
                    redFlag:
                      "Pedals that squeak, stick, or produce no effect. Usually a minor repair, but worth noting in negotiations.",
                  },
                ].map(({ area, what, redFlag }) => (
                  <div key={area} className="p-6 bg-white border border-gray-100">
                    <h3 className="font-semibold text-piano-black mb-2">{area}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">{what}</p>
                    <div className="flex gap-2">
                      <span className="text-red-500 text-xs font-display tracking-wide uppercase shrink-0">
                        Red Flag:
                      </span>
                      <span className="text-red-700 text-xs leading-relaxed">{redFlag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="condition" className="mb-14">
              <h2
                className="text-2xl font-medium text-piano-black mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Understanding Condition Ratings
              </h2>
              <p className="text-gray-700 leading-loose mb-6">
                Condition descriptions in the piano market are subjective and often optimistic.
                Sellers use "excellent" for what RPTs would call "good." At UsedSteinways, we follow
                the Registered Piano Technician (RPT) standard, and we describe condition honestly
                even when it might work against a sale.
              </p>
              <div className="not-prose space-y-3">
                {[
                  {
                    rating: 'Excellent',
                    desc: 'Plays and looks like new. All components original or recently professionally replaced. No deferred maintenance. Ready for professional use without qualification.',
                  },
                  {
                    rating: 'Very Good',
                    desc: 'Minor cosmetic wear only. Plays well with no significant mechanical issues. May benefit from routine regulation or voicing, but nothing that affects playability.',
                  },
                  {
                    rating: 'Good',
                    desc: 'Plays well but shows age. Some maintenance needed — regulation, voicing, possibly tuning stability work. Cosmetic imperfections present. Price should reflect deferred maintenance costs.',
                  },
                  {
                    rating: 'Fair',
                    desc: 'Plays but requires significant work to reach its potential. Best for buyers who understand restoration costs and are comfortable with the investment. Can be extraordinary value if priced accordingly.',
                  },
                ].map(({ rating, desc }) => (
                  <div key={rating} className="flex gap-4 p-4 bg-white border border-gray-100">
                    <span className="font-display text-xs tracking-wide uppercase font-semibold text-gray-700 w-20 shrink-0 pt-0.5">
                      {rating}
                    </span>
                    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-700 leading-loose mt-6">
                Always ask for a written condition report from the seller. If they can't provide one,
                that tells you something.
              </p>
            </section>

            <section id="pricing" className="mb-14">
              <h2
                className="text-2xl font-medium text-piano-black mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Price Expectations
              </h2>
              <p className="text-gray-700 leading-loose mb-4">
                Pricing varies significantly by model, year, condition, and origin (Hamburg vs. New
                York). Hamburg instruments typically command a 10–15% premium due to perceived
                quality consistency. As a rough guide for Model B:
              </p>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 pr-6 font-display text-xs tracking-widest uppercase text-gray-500">
                        Era
                      </th>
                      <th className="text-left py-3 pr-6 font-display text-xs tracking-widest uppercase text-gray-500">
                        Condition
                      </th>
                      <th className="text-right py-3 font-display text-xs tracking-widest uppercase text-gray-500">
                        Range
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['2010–present', 'Excellent', '$75,000–$95,000'],
                      ['2000–2009', 'Excellent', '$55,000–$70,000'],
                      ['1990–1999', 'Very Good', '$38,000–$52,000'],
                      ['1970–1989', 'Rebuilt', '$45,000–$65,000'],
                      ['1970–1989', 'Good (unrestored)', '$22,000–$35,000'],
                    ].map(([era, cond, price]) => (
                      <tr key={`${era}-${cond}`} className="border-b border-gray-100">
                        <td className="py-3 pr-6 font-medium text-gray-800">{era}</td>
                        <td className="py-3 pr-6 text-gray-500">{cond}</td>
                        <td className="py-3 text-right font-semibold text-piano-black">{price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-500 text-xs mt-4 leading-relaxed">
                Prices are illustrative market ranges as of early 2026. Contact us for current
                specific pricing. See our{' '}
                <Link
                  href="/guides/steinway-pricing-guide"
                  className="text-piano-burgundy hover:underline"
                >
                  full Steinway pricing guide
                </Link>{' '}
                for all models.
              </p>
            </section>

            <section id="questions" className="mb-14">
              <h2
                className="text-2xl font-medium text-piano-black mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Questions to Ask Any Seller
              </h2>
              <p className="text-gray-700 leading-loose mb-5">
                These aren't trick questions — they're reasonable due diligence for any transaction
                over $20,000. A reputable seller will welcome them.
              </p>
              <ul className="not-prose space-y-3">
                {[
                  'When was it last tuned, and how long did it hold pitch?',
                  'Has it ever had a soundboard repair, crack, or replacement?',
                  'What work has been done to the action — regulation, restringing, hammer replacement?',
                  "Has it been moved recently, and how many times? Moving is genuinely traumatic for pianos.",
                  'Can I see maintenance records or receipts from a piano technician?',
                  "Is the serial number consistent with the claimed year of manufacture? Steinway serial numbers are publicly documented — verify them.",
                  'Has it been kept in a climate-controlled environment? What are the humidity conditions of the room?',
                  'Will you allow a pre-purchase inspection by my technician?',
                  'Is the sale price negotiable based on the condition report?',
                  'What is the delivery arrangement, and is the piano insured during transport?',
                ].map((q, i) => (
                  <li key={i} className="flex gap-3 text-gray-700">
                    <span className="text-piano-gold mt-1 shrink-0">◆</span>
                    <span className="leading-relaxed">{q}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="prepurchase" className="mb-14">
              <h2
                className="text-2xl font-medium text-piano-black mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                The Pre-Purchase Inspection
              </h2>
              <p className="text-gray-700 leading-loose mb-4">
                For any piano over $20,000, a pre-purchase inspection by a Registered Piano
                Technician (RPT) is non-negotiable. The inspection costs $150–$300 and can save you
                $10,000 in unwanted repairs. This is the single most important advice in this guide.
              </p>
              <p className="text-gray-700 leading-loose mb-4">
                A thorough RPT inspection will evaluate: soundboard condition and crown, string and
                tuning pin condition, action regulation and hammer condition, structural integrity of
                the rim and plate, pedal and trap work function, and provide a written assessment of
                what work is needed, in what priority, and at what approximate cost.
              </p>
              <p className="text-gray-700 leading-loose mb-4">
                Find a Registered Piano Technician through the Piano Technicians Guild (PTG) website.
                Look for someone with experience specifically with concert-level instruments — not
                every qualified technician has worked extensively on nine-foot Steinways, but for a
                Model B or C, you want someone who has.
              </p>
              <p className="text-gray-700 leading-loose">
                Any reputable dealer — including us — will welcome your technician without
                hesitation. If a seller refuses an independent inspection, that refusal tells you
                everything you need to know. Walk away.
              </p>
            </section>
          </article>

          {/* Sidebar TOC */}
          <aside className="hidden lg:block sticky top-24">
            <div className="bg-piano-black p-6">
              <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-gold mb-5">
                In This Guide
              </p>
              <nav className="space-y-3">
                {TOC.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-piano-silver/70 hover:text-piano-cream text-sm transition-colors leading-relaxed"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
            <div className="mt-6 border border-piano-gold/20 p-6">
              <p className="font-display text-xs tracking-[0.2em] uppercase text-piano-burgundy mb-3">
                Need Help?
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                We're happy to guide you through the buying process personally.
              </p>
              <Link
                href="/contact"
                className="block text-center bg-piano-burgundy text-white py-3 font-display text-xs tracking-[0.2em] uppercase hover:bg-piano-burgundy/90 transition-colors"
              >
                Talk to Roger
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <InquiryCTA variant="dark" />
    </main>
  )
}
