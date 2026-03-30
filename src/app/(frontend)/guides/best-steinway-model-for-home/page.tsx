/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import Link from 'next/link'
import { InquiryCTA } from '@/components/piano/InquiryCTA'

export const metadata: Metadata = {
  title: 'Which Steinway Model is Right for Your Home? | UsedSteinways.com',
  description:
    "How to match a Steinway to your room size, budget, and musical goals. Room measurement guide, model-by-model recommendations, and buyer profiles for every type of pianist.",
}

const TOC = [
  { id: 'room-size', label: 'Measuring Your Room' },
  { id: 'acoustic-vs-physical', label: 'Acoustic vs. Physical Fit' },
  { id: 'model-by-room', label: 'Model by Room Size' },
  { id: 'budget', label: 'Budget Considerations' },
  { id: 'new-vs-preowned', label: 'New vs. Pre-Owned by Model' },
  { id: 'buyer-profiles', label: 'By Buyer Profile' },
  { id: 'our-pick', label: 'Our Consistent Recommendation' },
]

export default function BestSteinwayModelPage() {
  return (
    <main className="min-h-screen bg-piano-cream">
      {/* Hero */}
      <section className="bg-piano-burgundy py-28 px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-piano-cream/50 font-display text-[11px] tracking-[0.45em] uppercase mb-8">
            <Link href="/guides" className="hover:text-piano-gold transition-colors">
              Guides
            </Link>
            <span>·</span>
            <span className="text-piano-cream">Which Model for Your Home?</span>
          </nav>
          <span className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold bg-piano-gold/10 border border-piano-gold/30 px-3 py-1 mb-6 inline-block">
            Buying Guide
          </span>
          <h1
            className="font-cormorant font-light text-white mt-5 mb-6 leading-snug"
            style={{ fontSize: 'clamp(3.6rem, 7vw, 8.5rem)' }}
          >
            Which Steinway Model is Right for Your Home?
          </h1>
          <div className="flex items-center gap-6 text-piano-silver text-sm">
            <span>9 min read</span>
            <span>·</span>
            <span>By Roger · Updated February 2026</span>
          </div>
        </div>
      </section>

      {/* Article Layout */}
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid lg:grid-cols-[1fr_280px] gap-16 items-start">
          {/* Article Body */}
          <article className="max-w-none">
            <p className="text-xl text-piano-stone leading-relaxed mb-10 font-cormorant font-light">
              The most common mistake in buying a grand piano is letting the heart override the
              room. We've seen a 6'10" Model B crammed into a 12' × 14' room where it sounded
              boomy and uncontrolled — and we've seen a 5'7" Model M sing beautifully in a
              well-proportioned living room. Model selection begins with measurement.
            </p>

            <section id="room-size" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                Measuring Your Room
              </h2>
              <p className="text-piano-stone leading-relaxed mb-4">
                Measure the room at its longest and widest points. Then identify where the piano
                will be placed — typically against a wall or in a corner, with the keyboard end
                toward the room. Account for the piano's full length plus 3–4 feet for the pianist
                to sit, plus 2–3 feet on each side for the lid to open fully and for passage.
              </p>
              <p className="text-piano-stone leading-relaxed mb-4">
                The minimum floor space for a grand piano at its location:
              </p>
              <div className="space-y-2 mb-6">
                {[
                  ["Model S (5'1\")", "8' × 7' minimum", "10' × 9' comfortable"],
                  ["Model M (5'7\")", "9' × 7' minimum", "11' × 9' comfortable"],
                  ["Model A (6'2\")", "10' × 7' minimum", "12' × 9' comfortable"],
                  ["Model B (6'10\")", "11' × 8' minimum", "14' × 10' comfortable"],
                  ["Model C (7'5\")", "12' × 8' minimum", "15' × 11' comfortable"],
                  ["Model D (8'11¾\")", "14' × 9' minimum", "18' × 12' comfortable"],
                ].map(([model, min, comfortable]) => (
                  <div key={model} className="grid grid-cols-[1fr_1fr_1fr] gap-3 py-2.5 border-b border-piano-linen text-sm">
                    <span className="font-medium text-piano-black">{model}</span>
                    <span className="text-piano-stone">{min}</span>
                    <span className="text-piano-stone">{comfortable}</span>
                  </div>
                ))}
              </div>
              <p className="text-piano-stone leading-relaxed">
                These are physical minimums and comfortable targets, not acoustic ideals. A piano
                placed too close to walls will have exaggerated bass response and reduced projection
                — more on this below.
              </p>
            </section>

            <section id="acoustic-vs-physical" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                Acoustic vs. Physical Fit
              </h2>
              <p className="text-piano-stone leading-relaxed mb-4">
                Physical fit is whether the instrument can occupy the space without blocking doors
                or overwhelming the room visually. Acoustic fit is whether the room can support
                the instrument's sound without distortion.
              </p>
              <p className="text-piano-stone leading-relaxed mb-4">
                Rooms that are too small for a piano create a phenomenon called "room modes" — bass
                frequencies that resonate at specific frequencies determined by the room's
                dimensions, causing certain notes to boom unnaturally. A 9-foot room with a large
                piano will typically have problems in the low-mid bass range.
              </p>
              <p className="text-piano-stone leading-relaxed mb-4">
                Rooms with parallel walls and hard surfaces (wood floors, plaster walls, no
                soft furnishings) will amplify these problems. Rooms with carpet, upholstered
                furniture, bookshelves, and irregular surfaces absorb and diffuse sound in ways
                that allow larger instruments to work in smaller spaces.
              </p>
              <p className="text-piano-stone leading-relaxed">
                Ceiling height matters: a 10-foot ceiling handles a Model B better than an 8-foot
                ceiling. The rule of thumb we use: the room should have at least 2,000 cubic feet
                of volume for a Model B to sound its best. That's roughly a 14' × 16' × 9'
                room — not large, but meaningfully proportioned.
              </p>
            </section>

            <section id="model-by-room" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                Model Recommendations by Room Size
              </h2>
              <div className="space-y-5">
                {[
                  {
                    room: 'Under 150 sq ft',
                    examples: 'Small study, second bedroom, apartment living room',
                    recommendation: 'Model S',
                    note: "The S is the only Steinway grand that works well in a small room without acoustic compromise. Don't be tempted to go larger — the room will tell you it was a mistake.",
                  },
                  {
                    room: '150–250 sq ft',
                    examples: 'Average living room, medium study, large apartment room',
                    recommendation: 'Model M or Model A',
                    note: "The M is the most frequently right answer for typical living rooms. The A gains usable bass if your room has good ceiling height. Either will sound excellent.",
                  },
                  {
                    room: '250–400 sq ft',
                    examples: 'Large living room, dedicated music room, open-plan space',
                    recommendation: 'Model B',
                    note: "This is the room where the B becomes possible and, in our view, the obvious choice. The B in a well-proportioned room is the finest home piano experience available.",
                  },
                  {
                    room: '400–600 sq ft',
                    examples: 'Dedicated studio, ballroom, large open-plan',
                    recommendation: 'Model B or Model C',
                    note: "At this scale, a Model C becomes appropriate. The B will still sound excellent; the C will fill the space more fully. Factor in ceiling height — lower ceilings favor the B.",
                  },
                  {
                    room: 'Over 600 sq ft',
                    examples: 'Performance space, recital room, institutional venue',
                    recommendation: 'Model C or Model D',
                    note: "At this scale, you're in institutional territory. The D is appropriate for professional performance spaces only — it sounds thin in rooms that can't support its projection.",
                  },
                ].map(({ room, examples, recommendation, note }) => (
                  <div key={room} className="p-6 bg-piano-cream border border-piano-linen">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-cormorant font-light text-3xl text-piano-black">{room}</h3>
                        <p className="text-piano-stone text-xs mt-1">{examples}</p>
                      </div>
                      <span className="font-display text-[11px] tracking-[0.3em] uppercase text-piano-gold bg-piano-gold/10 px-3 py-1 shrink-0">
                        {recommendation}
                      </span>
                    </div>
                    <p className="text-piano-stone text-sm leading-relaxed">{note}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="budget" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                Budget Considerations
              </h2>
              <p className="text-piano-stone leading-relaxed mb-4">
                Budget constrains model choice in the pre-owned market less than you might expect —
                because price follows model size closely. A pre-owned Model S is not an entry-level
                instrument; it's simply a smaller Steinway. A pre-owned Model M in excellent
                condition is a serious piano for $30,000–$50,000.
              </p>
              <p className="text-piano-stone leading-relaxed mb-5">
                Approximate pre-owned budget ranges (2026 pricing, excellent condition):
              </p>
              <div className="space-y-2">
                {[
                  ['$25,000–$40,000', 'Model S (recent) or Model M (late 2000s)'],
                  ['$40,000–$60,000', 'Model M (excellent, recent) or Model A'],
                  ['$55,000–$75,000', 'Model B (2000–2010)'],
                  ['$75,000–$95,000', 'Model B (2010–present, excellent)'],
                  ['$90,000–$130,000', 'Model C (2000+) or fully rebuilt Model D'],
                  ['$150,000+', 'Model D (excellent)'],
                ].map(([budget, models]) => (
                  <div key={budget} className="flex gap-4 py-2.5 border-b border-piano-linen text-sm">
                    <span className="font-semibold text-piano-black w-48 shrink-0">{budget}</span>
                    <span className="text-piano-stone">{models}</span>
                  </div>
                ))}
              </div>
              <p className="text-piano-stone text-sm mt-4 leading-relaxed">
                The best value in the current market is the Model B from 1990–2005 in very good
                condition — excellent musical instrument, meaningful discount to recent production.
              </p>
            </section>

            <section id="new-vs-preowned" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                New vs. Pre-Owned Considerations by Model
              </h2>
              <p className="text-piano-stone leading-relaxed mb-4">
                The case for pre-owned is strongest for the Model B and Model A — the most
                commonly owned home Steinways — where the pre-owned market is deepest and
                values are most transparent. You will almost always find what you're looking
                for in those models without waiting.
              </p>
              <p className="text-piano-stone leading-relaxed mb-4">
                For the Model S, new may actually be preferable in some cases: the pre-owned
                market is thinner, and a new S with Steinway's warranty and your specific
                finish preference may be worth the premium if you're in a major metropolitan area
                with good access to a Steinway dealer.
              </p>
              <p className="text-piano-stone leading-relaxed">
                For the Model D: almost always buy pre-owned. A fully rebuilt D costs
                $120,000–$155,000; a new D costs $200,000+. The rebuilt instrument from an
                authorized rebuilder has new soundboard, new strings, new action — it is
                acoustically a new piano. The economics strongly favor pre-owned at this scale.
              </p>
            </section>

            <section id="buyer-profiles" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                Recommendations by Buyer Profile
              </h2>
              <div className="space-y-5">
                {[
                  {
                    profile: 'Serious Amateur (adult learner, plays for pleasure)',
                    ideal: 'Model M or Model A',
                    why: "The M is honestly the sweet spot for adult home pianists who play seriously. Sufficient musical depth to be genuinely rewarding; fits most living rooms; excellent pre-owned value. Don't buy smaller than an M if you're serious about your playing.",
                  },
                  {
                    profile: 'Piano Teacher (home studio, 20–40 students/week)',
                    ideal: 'Model A or Model B',
                    why: 'You need an instrument that motivates students and withstands daily use by multiple players. The action should be exemplary — students learn their technique against your instrument. The extra investment in a B or A is justified.',
                  },
                  {
                    profile: 'Semi-Professional (regular performance, serious study)',
                    ideal: 'Model B',
                    why: "If you perform regularly and practice seriously, the Model B is where you want to be. It's the finest home Steinway, and the difference from an A is audible in the bass weight and tonal complexity. Get the B.",
                  },
                  {
                    profile: 'Professional (conservatory-trained, active performer)',
                    ideal: 'Model B or Model C',
                    why: "You already know what you need. The question is usually whether your room supports the C — if it does, the C is significantly more capable. If not, a fine Model B in excellent condition is a worthy home instrument.",
                  },
                  {
                    profile: 'Collector or investor',
                    ideal: 'Model B, Hamburg, pre-1985',
                    why: "The vintage Hamburg instruments from 1970–1985 represent exceptional value for buyers who understand what they're acquiring. They require more maintenance knowledge but reward it with extraordinary musical instruments at below-market prices.",
                  },
                ].map(({ profile, ideal, why }) => (
                  <div key={profile} className="p-6 bg-piano-cream border border-piano-linen">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="font-cormorant font-light text-2xl text-piano-black">{profile}</h3>
                      <span className="font-display text-[11px] tracking-[0.3em] uppercase text-piano-gold bg-piano-gold/10 px-3 py-1 shrink-0">
                        {ideal}
                      </span>
                    </div>
                    <p className="text-piano-stone text-sm leading-relaxed">{why}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="our-pick" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                Our Consistent Recommendation
              </h2>
              <p className="text-piano-stone leading-relaxed mb-4">
                If we could give one piece of advice to the majority of buyers: measure your room,
                confirm a Model B physically fits with the recommended spacing, and if it does —
                buy the B.
              </p>
              <p className="text-piano-stone leading-relaxed mb-4">
                The Model B is Steinway's finest home instrument. Not because it's the largest
                one that fits in a house, but because at 6'10", Steinway's soundboard design
                and string lengths reach a level of refinement that the smaller models —
                however good — don't fully achieve. The bass is rounder, the midrange is richer,
                the dynamic range is wider. These are not small differences.
              </p>
              <p className="text-piano-stone leading-relaxed">
                Buy an M or A if the B genuinely doesn't fit. They are excellent instruments.
                But if a B fits and budget allows, it's the right instrument for a lifetime
                of serious playing.
              </p>
            </section>
          </article>

          {/* Sidebar TOC */}
          <aside className="hidden lg:block sticky top-24">
            <div className="bg-piano-indigo-card p-6">
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-5">
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
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-3">
                Not Sure?
              </p>
              <p className="text-piano-stone text-sm leading-relaxed mb-4">
                Tell us about your room and we'll recommend the right model for your space.
              </p>
              <Link
                href="/contact"
                className="block text-center bg-piano-black text-piano-cream py-3 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-charcoal transition-colors"
              >
                Ask Roger
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <InquiryCTA variant="dark" />
    </main>
  )
}
