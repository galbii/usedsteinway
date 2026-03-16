/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import Link from 'next/link'
import { InquiryCTA } from '@/components/piano/InquiryCTA'

export const metadata: Metadata = {
  title: 'Steinway Pricing Guide: What Should You Pay in 2026? | UsedSteinways.com',
  description:
    'Current market prices for every Steinway model — S through D — by era and condition. Hamburg vs New York pricing, what drives value, and how to spot an overpriced instrument.',
}

const TOC = [
  { id: 'market-overview', label: 'Market Overview' },
  { id: 'model-prices', label: 'Pricing by Model' },
  { id: 'hamburg-vs-ny', label: 'Hamburg vs. New York' },
  { id: 'what-affects-price', label: 'What Affects Price' },
  { id: 'finish-premium', label: 'The Finish Premium' },
  { id: 'overpriced', label: 'Spotting Overpriced Pianos' },
  { id: 'negotiating', label: 'Negotiating Tips' },
]

export default function SteinwayPricingGuidePage() {
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
            <span className="text-piano-cream">Steinway Pricing Guide</span>
          </nav>
          <span className="font-display text-xs tracking-[0.2em] uppercase text-piano-gold bg-piano-gold/10 border border-piano-gold/30 px-3 py-1 mb-6 inline-block">
            Buying Guide
          </span>
          <h1
            className="text-4xl md:text-5xl font-medium text-white mt-5 mb-6 leading-snug"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Steinway Pricing Guide: What Should You Pay in 2026?
          </h1>
          <div className="flex items-center gap-6 text-piano-silver text-sm">
            <span>8 min read</span>
            <span>·</span>
            <span>By Roger · Updated February 2026</span>
          </div>
        </div>
      </section>

      {/* Article Layout */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-[1fr_280px] gap-16 items-start">
          {/* Article Body */}
          <article className="max-w-none">
            <p
              className="text-xl text-gray-700 leading-relaxed mb-10"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              The pre-owned Steinway market has its own logic — and knowing current fair market
              values before you negotiate is the difference between a great purchase and an expensive
              lesson. These ranges reflect real transactions we've seen in the past twelve months.
            </p>

            <section id="market-overview" className="mb-14">
              <h2
                className="text-2xl font-medium text-piano-black mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Market Overview
              </h2>
              <p className="text-gray-700 leading-loose mb-4">
                The premium pre-owned piano market in 2026 remains strong. Inventory of well-kept
                pre-owned Steinways has tightened as fewer owners choose to sell — the post-pandemic
                interest in home instruments has kept demand elevated. Well-priced instruments in
                excellent condition move quickly; overpriced or misrepresented instruments sit for
                months.
              </p>
              <p className="text-gray-700 leading-loose mb-4">
                New Steinway prices increased approximately 8% in 2024 and another 5% in 2025, which
                has pushed pre-owned prices upward correspondingly. The spread between new and used
                remains meaningful — a 2012 Model B in excellent condition still represents a 35–40%
                discount to new — but buyers expecting bargain-basement pricing will be disappointed.
              </p>
              <p className="text-gray-700 leading-loose">
                The best values remain in the 1980s–1990s instruments in very good condition, and in
                fully rebuilt pre-1980 instruments. These represent genuine quality at prices
                meaningfully below current new retail.
              </p>
            </section>

            <section id="model-prices" className="mb-14">
              <h2
                className="text-2xl font-medium text-piano-black mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Pricing by Model
              </h2>
              <p className="text-gray-700 leading-loose mb-6">
                These ranges reflect current market pricing for standard ebony finish, standard
                condition as noted. Specialty finishes, exceptional provenance, or recent full
                rebuilds command premiums above these ranges.
              </p>

              {[
                {
                  model: 'Model S',
                  size: "5'1\"",
                  rows: [
                    ['2010–present', 'Excellent', '$28,000–$38,000'],
                    ['2000–2009', 'Very Good', '$18,000–$26,000'],
                    ['1985–1999', 'Good', '$12,000–$18,000'],
                    ['Pre-1985', 'Rebuilt', '$18,000–$26,000'],
                  ],
                },
                {
                  model: 'Model M',
                  size: "5'7\"",
                  rows: [
                    ['2010–present', 'Excellent', '$38,000–$52,000'],
                    ['2000–2009', 'Very Good', '$26,000–$36,000'],
                    ['1985–1999', 'Good', '$16,000–$24,000'],
                    ['Pre-1985', 'Rebuilt', '$24,000–$35,000'],
                  ],
                },
                {
                  model: 'Model A',
                  size: "6'2\"",
                  rows: [
                    ['2010–present', 'Excellent', '$52,000–$68,000'],
                    ['2000–2009', 'Very Good', '$36,000–$48,000'],
                    ['1985–1999', 'Good', '$22,000–$32,000'],
                    ['Pre-1985', 'Rebuilt', '$30,000–$44,000'],
                  ],
                },
                {
                  model: 'Model B',
                  size: "6'10\"",
                  rows: [
                    ['2010–present', 'Excellent', '$75,000–$95,000'],
                    ['2000–2009', 'Very Good', '$55,000–$70,000'],
                    ['1990–1999', 'Good', '$38,000–$52,000'],
                    ['Pre-1990', 'Rebuilt', '$45,000–$65,000'],
                  ],
                },
                {
                  model: 'Model C',
                  size: "7'5\"",
                  rows: [
                    ['2010–present', 'Excellent', '$95,000–$125,000'],
                    ['2000–2009', 'Very Good', '$70,000–$90,000'],
                    ['Pre-2000', 'Rebuilt', '$65,000–$85,000'],
                  ],
                },
                {
                  model: 'Model D',
                  size: "8'11¾\"",
                  rows: [
                    ['2010–present', 'Excellent', '$175,000–$225,000'],
                    ['2000–2009', 'Very Good', '$130,000–$165,000'],
                    ['Pre-2000', 'Rebuilt', '$120,000–$155,000'],
                  ],
                },
              ].map(({ model, size, rows }) => (
                <div key={model} className="mb-8">
                  <div className="flex items-baseline gap-3 mb-3">
                    <h3
                      className="text-lg font-medium text-piano-black"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {model}
                    </h3>
                    <span className="text-gray-400 text-sm">{size}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 pr-6 font-display text-xs tracking-widest uppercase text-gray-400">
                            Era
                          </th>
                          <th className="text-left py-2 pr-6 font-display text-xs tracking-widest uppercase text-gray-400">
                            Condition
                          </th>
                          <th className="text-right py-2 font-display text-xs tracking-widest uppercase text-gray-400">
                            Market Range
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map(([era, cond, price]) => (
                          <tr key={`${era}-${cond}`} className="border-b border-gray-100">
                            <td className="py-2.5 pr-6 font-medium text-gray-800">{era}</td>
                            <td className="py-2.5 pr-6 text-gray-500">{cond}</td>
                            <td className="py-2.5 text-right font-semibold text-piano-black">
                              {price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                Prices are market ranges as of early 2026 for standard ebony finish. Contact us for
                current specific pricing on instruments we have available.
              </p>
            </section>

            <section id="hamburg-vs-ny" className="mb-14">
              <h2
                className="text-2xl font-medium text-piano-black mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Hamburg vs. New York: Does Origin Affect Price?
              </h2>
              <p className="text-gray-700 leading-loose mb-4">
                Steinway & Sons operates two factories: Hamburg (founded 1880, for international
                markets) and Queens, New York (founded 1853, for North American markets). In the
                pre-owned market, Hamburg instruments typically command a 10–15% premium over
                comparable New York instruments of the same era and condition.
              </p>
              <p className="text-gray-700 leading-loose mb-4">
                Whether this premium is fully justified is a matter of genuine debate among
                technicians. Our honest assessment: the tonal and mechanical differences between
                factories have narrowed significantly since the 1990s, and a well-maintained New
                York Steinway from 2005 is not meaningfully inferior to a Hamburg instrument of the
                same year.
              </p>
              <p className="text-gray-700 leading-loose mb-4">
                Where the Hamburg premium is more defensible: pre-1990 instruments, where Hamburg
                maintained stricter quality control during a period when the New York factory faced
                labor disruptions and management challenges. The 1970s Hamburg instruments, in
                particular, are exceptional.
              </p>
              <div className="bg-piano-black/5 border-l-4 border-piano-gold p-6 my-6">
                <p
                  className="text-gray-700 italic text-lg leading-relaxed"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  "Don't pay a Hamburg premium for a post-2000 instrument. Do consider paying it for
                  a 1975–1985 Hamburg — those pianos are genuinely special."
                </p>
                <p className="text-sm text-gray-500 mt-3 font-display tracking-wide">— Roger</p>
              </div>
              <p className="text-gray-700 leading-loose">
                To identify factory of origin: Hamburg instruments have serial numbers documented in
                the Hamburg ledger (available through Steinway dealers); New York instruments are in
                the New York ledger. The piano's "Made in Germany" or "Made in USA" marking on the
                plate is the simplest indicator.
              </p>
            </section>

            <section id="what-affects-price" className="mb-14">
              <h2
                className="text-2xl font-medium text-piano-black mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                What Affects Price Beyond Model and Year
              </h2>
              <div className="space-y-5">
                {[
                  {
                    factor: 'Provenance',
                    detail:
                      'Concert-use instruments, instruments from notable institutions, or pianos with documented famous owners command premiums — sometimes significant ones. A Model D from a major conservatory is worth more than an identical Model D from a regional school. Single-owner instruments from documented private purchasers are preferable to instruments with unknown histories.',
                  },
                  {
                    factor: 'Recent Professional Service',
                    detail:
                      "A piano that was regulated and voiced by a Steinway-certified technician in the past 12 months is worth meaningfully more than an identical instrument that hasn't been serviced in three years. Ask for documentation. Recent service receipts are a concrete signal of how the instrument has been cared for.",
                  },
                  {
                    factor: 'Full Rebuild vs. Partial Work',
                    detail:
                      'A full professional rebuild (new soundboard, strings, pins, complete action rebuild) by a Steinway-authorized rebuilder adds substantial value — typically $25,000–$45,000 in materials and labor. A partial rebuild (new strings and hammers only) adds less. Understand exactly what work was done and verify it.',
                  },
                  {
                    factor: 'Climate History',
                    detail:
                      'A piano kept in a climate-controlled environment (45–55% relative humidity year-round) is worth more than an identical piano that spent winters at 20% humidity or summers at 80%. Humidity swings damage soundboards, strings, and pin blocks. Ask about the room conditions where the instrument lived.',
                  },
                  {
                    factor: 'Number of Moves',
                    detail:
                      "Every move is a stress event for a piano. A single-owner piano that has never moved since delivery is in a different category from a piano that's been moved four times. Moving damages bridges, soundboards, and structural components when done incorrectly.",
                  },
                ].map(({ factor, detail }) => (
                  <div key={factor} className="p-5 bg-white border border-gray-100">
                    <h3 className="font-semibold text-piano-black mb-2 text-sm">{factor}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="finish-premium" className="mb-14">
              <h2
                className="text-2xl font-medium text-piano-black mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                The Finish Premium
              </h2>
              <p className="text-gray-700 leading-loose mb-4">
                Standard ebony (polished or satin) is the baseline. Specialty finishes command
                premiums ranging from modest to substantial:
              </p>
              <div className="space-y-2">
                {[
                  ['Satin Ebony', 'Standard — baseline pricing'],
                  ['Polished Ebony', 'Standard — no premium over satin'],
                  ['Satin or Polished Mahogany', '5–10% premium'],
                  ['Satin or Polished Walnut', '5–10% premium'],
                  ['Satin or Polished Cherry', '10–15% premium'],
                  ['African Pommele Sapele', '15–25% premium'],
                  ['East Indian Rosewood', '20–30% premium'],
                  ['Macassar Ebony', '25–40% premium'],
                  ['Custom or limited edition finishes', 'Market dependent — can be 50%+'],
                ].map(([finish, note]) => (
                  <div key={finish} className="flex gap-4 items-start py-2.5 border-b border-gray-100">
                    <span className="font-medium text-gray-800 text-sm w-52 shrink-0">{finish}</span>
                    <span className="text-gray-500 text-sm">{note}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                Note: finish premiums are only meaningful if the finish is in excellent condition.
                A scratched or refinished specialty wood instrument loses most of its premium.
              </p>
            </section>

            <section id="overpriced" className="mb-14">
              <h2
                className="text-2xl font-medium text-piano-black mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Spotting Overpriced Pianos
              </h2>
              <p className="text-gray-700 leading-loose mb-5">
                These are the most common signs that an asking price is not justified:
              </p>
              <ul className="space-y-4">
                {[
                  {
                    flag: 'Price anchored to new retail',
                    desc: '"Only used once" or "barely played" are not sufficient justifications for near-new pricing. Depreciation happens regardless of use. A 2018 Model B is not worth $100,000 because the current new price is $115,000.',
                  },
                  {
                    flag: 'Rebuild costs added at face value',
                    desc: 'If a seller spent $35,000 on a rebuild in 2015 and is now pricing accordingly, understand that buyers absorb rebuild costs at about 50–60 cents on the dollar — the market doesn\'t reimburse rebuild expenses at full cost after the fact.',
                  },
                  {
                    flag: 'Condition overstated',
                    desc: '"Excellent" applied to an instrument with deferred regulation, surface rust on strings, or tuning stability issues. Get an independent RPT assessment before accepting any seller\'s condition description.',
                  },
                  {
                    flag: 'Hamburg premium on recent instruments',
                    desc: 'As noted above, paying 15% more for a 2010 Hamburg vs. a 2010 New York Steinway is not warranted by the acoustic or mechanical differences between those instruments.',
                  },
                  {
                    flag: 'Rare finish on damaged case',
                    desc: 'A specialty wood finish that has been refinished, has significant veneer lifting, or shows case damage should not command a finish premium.',
                  },
                ].map(({ flag, desc }) => (
                  <li key={flag} className="flex gap-4 p-4 bg-white border border-gray-100 list-none">
                    <span className="text-piano-burgundy mt-0.5 shrink-0">✕</span>
                    <div>
                      <span className="font-semibold text-gray-800 text-sm block mb-1">{flag}</span>
                      <span className="text-gray-600 text-sm leading-relaxed">{desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section id="negotiating" className="mb-14">
              <h2
                className="text-2xl font-medium text-piano-black mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Negotiating Tips
              </h2>
              <p className="text-gray-700 leading-loose mb-4">
                Negotiating on a high-value piano is legitimate and expected. Here's how to do it
                effectively:
              </p>
              <p className="text-gray-700 leading-loose mb-4">
                <strong>Use the RPT inspection report as a negotiating tool.</strong> If the
                technician identifies $4,000 of needed work, you have a concrete basis to request a
                corresponding price adjustment. This is not aggressive — it's honest pricing.
              </p>
              <p className="text-gray-700 leading-loose mb-4">
                <strong>Know the comparable sales.</strong> If similar instruments have sold for
                10–15% less than the asking price, cite specific comparables. Reputable dealers will
                engage with this honestly.
              </p>
              <p className="text-gray-700 leading-loose mb-4">
                <strong>Factor in delivery costs.</strong> Moving a 9-foot grand costs $800–$2,500
                depending on distance and stairs. If delivery is not included, calculate it into your
                total cost and negotiate accordingly.
              </p>
              <p className="text-gray-700 leading-loose">
                <strong>Avoid ultimatums on excellent instruments.</strong> A well-priced Steinway B
                in excellent condition will sell. If you've found the right instrument, negotiate
                reasonably but don't walk away over 3–5% for something that genuinely fits your
                needs.
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
                See Current Inventory
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Browse our current selection of pre-owned Steinways.
              </p>
              <Link
                href="/pianos/steinway"
                className="block text-center bg-piano-burgundy text-white py-3 font-display text-xs tracking-[0.2em] uppercase hover:bg-piano-burgundy/90 transition-colors"
              >
                View Steinways
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <InquiryCTA variant="dark" />
    </main>
  )
}
