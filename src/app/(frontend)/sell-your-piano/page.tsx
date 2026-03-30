/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import Link from 'next/link'
import { InquiryCTA } from '@/components/piano/InquiryCTA'

export const metadata: Metadata = {
  title: 'Sell Your Piano | UsedSteinways.com',
  description:
    'We buy fine pre-owned pianos directly from private owners. Receive a fair, transparent offer within 48 hours. Steinway, Bösendorfer, Bechstein, and other world-class instruments considered.',
}

const acceptedBrands = [
  { name: 'Steinway & Sons', note: 'All models, all eras — Hamburg and New York' },
  { name: 'Bösendorfer', note: 'Including the extended-key Imperial models' },
  { name: 'C. Bechstein', note: 'Concert and salon grands, uprights' },
  { name: 'Blüthner', note: 'Leipzig instruments from any era' },
  { name: 'Fazioli', note: 'All models considered' },
  { name: 'Shigeru Kawai', note: 'EX, SK, and SK-EX concert grands' },
  { name: 'Yamaha CFX / S-Series', note: 'Concert and premium studio grands' },
  { name: 'Mason & Hamlin', note: 'Boston-era and modern instruments' },
  { name: 'Knabe', note: 'Pre-1960 concert grands only' },
  { name: 'Other Fine Instruments', note: 'Contact us — we evaluate on merit, not just nameplate' },
]

const valueFactors = [
  {
    label: 'Brand & Model',
    detail:
      'Brand is the single largest driver of resale value. A Steinway Model B retains value at a fundamentally different rate than a similarly aged mid-tier instrument.',
  },
  {
    label: 'Year & Serial Number',
    detail:
      'Era matters. Pre-war Steinways from the 1920s–1940s are often more desirable than their modern counterparts. We know the manufacturing history of the major brands.',
  },
  {
    label: 'Condition',
    detail:
      'Mechanical condition (action, soundboard, strings, pinblock) and cosmetic condition are evaluated separately. Structural integrity is paramount.',
  },
  {
    label: 'Restoration History',
    detail:
      'Has the instrument been rebuilt? Who did the work? What was replaced? A properly documented restoration by a reputable rebuilder significantly increases value.',
  },
  {
    label: 'Finish & Case',
    detail:
      'Ebonized (black) instruments are the most common; satin ebony commands a slight premium. Exotic finishes, specialty legs, or unusual case styles can add or subtract value.',
  },
  {
    label: 'Location',
    detail:
      'We serve all of New England and will travel for significant instruments. For pianos outside our region, we work with trusted transport partners.',
  },
]

const faqs = [
  {
    q: 'Do you buy pianos directly, or do you sell on consignment?',
    a: "Both. For most instruments we prefer direct purchase — it's simpler for you and faster. For exceptionally valuable instruments (typically $50,000+), consignment may yield a higher net return. We'll discuss which makes more sense for your situation.",
  },
  {
    q: 'Can I get an appraisal without selling?',
    a: "Yes. We offer written appraisals for insurance, estate, or donation purposes. Appraisal fees start at $250 for uprights and $350 for grands. If you subsequently sell to us, the appraisal fee is credited toward the transaction.",
  },
  {
    q: 'How long does the process take?',
    a: 'After initial contact and photo review, Roger typically provides a preliminary offer range within 48 hours. If the instrument requires an in-person evaluation (which we recommend for anything above $15,000), we schedule a visit within a week. Offers following inspection are made on the same day.',
  },
  {
    q: 'Do you need to see the piano in person?',
    a: "For instruments priced under approximately $20,000, we can often make an offer based on detailed photographs and your description. For finer instruments, a personal evaluation produces a more accurate and usually higher offer — and protects both parties.",
  },
  {
    q: 'What if my piano needs work?',
    a: "We factor condition into every offer. It's almost always better to sell as-is rather than paying for repairs before selling — we have restoration resources you likely don't, and we won't pay you a premium for work we could do ourselves at cost.",
  },
  {
    q: 'Who handles moving the piano?',
    a: "We do. Once terms are agreed, we arrange pickup at our expense. You don't need to coordinate movers or logistics — we handle everything from scheduling to insurance.",
  },
  {
    q: 'Do you buy upright pianos?',
    a: "Selectively. We consider fine upright instruments from the top manufacturers — a Steinway Model K, a Bechstein Concert, a Blüthner upright. We do not buy student or entry-level uprights regardless of condition.",
  },
]

export default function SellYourPianoPage() {
  return (
    <main className="min-h-screen bg-piano-cream">
      {/* Hero */}
      <section className="bg-piano-burgundy py-32 px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-end">
          <div>
            <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-5">
              Private Acquisitions
            </p>
            <h1
              className="font-cormorant font-light text-white mb-6 leading-tight"
              style={{ fontSize: 'clamp(3.6rem, 7vw, 8.5rem)' }}
            >
              We Buy Fine Pianos
            </h1>
            <p className="text-piano-cream/70 text-lg leading-relaxed max-w-xl">
              Direct, private acquisitions of world-class instruments. Transparent offers,
              no middlemen, and logistics handled entirely by us.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-px bg-piano-gold/10">
            {[
              { stat: '48hrs', label: 'Offer turnaround' },
              { stat: '300+', label: 'Pianos purchased' },
              { stat: '30yrs', label: 'Buying experience' },
            ].map(({ stat, label }) => (
              <div key={label} className="bg-piano-indigo-card p-6 text-center">
                <p className="font-cormorant font-light text-piano-gold text-3xl mb-1">
                  {stat}
                </p>
                <p className="text-piano-silver/60 text-xs font-display tracking-widest uppercase leading-tight">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-28 px-8 bg-piano-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-3">
              Simple, Straightforward
            </p>
            <h2
              className="font-cormorant font-light text-piano-black"
              style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
            >
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-4xl mx-auto">
            {[
              {
                step: '01',
                title: 'Tell Us About Your Piano',
                body: 'Submit details online or call us directly. Share the make, model, year, and a few photographs. The more we know upfront, the faster and more accurately we can respond.',
                cta: null,
              },
              {
                step: '02',
                title: 'Roger Evaluates',
                body: "For most instruments, we provide a preliminary range within 48 hours based on photos and description. For significant pianos, Roger evaluates in person — at your home or storage location, at our expense.",
                cta: null,
              },
              {
                step: '03',
                title: 'Receive a Fair Offer',
                body: "You receive a written offer within 48 hours of evaluation. No games, no lowballing to leave room for negotiation. We make our best offer first — and we handle all logistics if you accept.",
                cta: null,
              },
            ].map(({ step, title, body }, i) => (
              <div
                key={step}
                className="relative border border-piano-linen p-8 bg-piano-cream"
              >
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 -right-px w-px h-8 bg-piano-linen z-10" />
                )}
                <p className="text-piano-gold/20 font-display text-6xl font-bold mb-4 leading-none">
                  {step}
                </p>
                <h3 className="font-cormorant font-light text-piano-black text-3xl mb-3">
                  {title}
                </h3>
                <p className="text-piano-stone text-base leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/contact?type=sell"
              className="inline-block bg-piano-black text-piano-cream px-12 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-charcoal transition-colors"
            >
              Start the Process
            </Link>
          </div>
        </div>
      </section>

      {/* What We Buy / Don't Buy */}
      <section className="py-28 px-8 bg-piano-burgundy border-t border-piano-gold/10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* What We Buy */}
          <div>
            <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">
              What We Purchase
            </p>
            <h2 className="font-cormorant font-light text-piano-cream text-3xl mb-8">
              Premium Instruments We Consider
            </h2>
            <ul className="space-y-3">
              {acceptedBrands.map(({ name, note }) => (
                <li key={name} className="flex gap-4 items-start">
                  <span className="text-piano-gold shrink-0 mt-0.5">◆</span>
                  <div>
                    <span className="text-piano-cream text-base font-medium">{name}</span>
                    <span className="text-piano-silver/60 text-base"> — {note}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* What We Don't Buy */}
          <div>
            <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold/40 mb-4">
              Outside Our Scope
            </p>
            <h2 className="font-cormorant font-light text-piano-cream text-3xl mb-8">
              What We Don't Buy
            </h2>
            <div className="space-y-4 mb-8">
              {[
                {
                  category: 'Digital & Hybrid Pianos',
                  reason:
                    'Clavinova, Disklavier (digital component), Roland, Korg, and all digital instruments — regardless of condition or price.',
                },
                {
                  category: 'Student & Entry-Level Acoustics',
                  reason:
                    'Instruments by Baldwin (post-1980s), Wurlitzer, Story & Clark, Kimball, or similar mass-market manufacturers.',
                },
                {
                  category: 'Uprights Under $8,000 Replacement Value',
                  reason:
                    "With rare exceptions, the economics of upright transport and reconditioning don't support most upright purchases.",
                },
                {
                  category: 'Heavily Damaged Instruments',
                  reason:
                    "Pianos with broken soundboards, severe structural damage, or extensive pest damage — even from prestigious makers. There are limits.",
                },
              ].map(({ category, reason }) => (
                <div key={category} className="flex gap-4">
                  <span className="text-piano-silver/30 shrink-0 mt-1 text-xs">✕</span>
                  <div>
                    <p className="text-piano-silver text-base font-medium">{category}</p>
                    <p className="text-piano-silver/50 text-base leading-relaxed">{reason}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border border-piano-gold/15 p-5">
              <p className="text-piano-silver/70 text-base leading-relaxed">
                <span className="text-piano-gold font-medium">Not sure?</span> Send us the make, model, and a photo. We'll tell you
                honestly within 24 hours whether it's something we'd consider — no obligation either way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Affects Value */}
      <section className="py-28 px-8 bg-piano-cream border-t border-piano-linen">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-3">
              Understanding Your Piano's Worth
            </p>
            <h2
              className="font-cormorant font-light text-piano-black mb-5"
              style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
            >
              What Determines Value
            </h2>
            <p className="text-piano-stone text-lg leading-relaxed">
              Piano valuation is nuanced. Here are the factors we weigh — and why each matters.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueFactors.map(({ label, detail }) => (
              <div key={label} className="bg-piano-cream border border-piano-linen p-6">
                <p className="font-cormorant font-light text-piano-black text-2xl mb-3">
                  {label}
                </p>
                <p className="text-piano-stone text-base leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curation Positioning */}
      <section className="py-24 px-8 bg-piano-indigo-card">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-6">
            Our Commitment to Your Instrument
          </p>
          <blockquote>
            <p
              className="font-cormorant font-light text-piano-cream leading-snug mb-6"
              style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
            >
              "We're not just buying your piano — we're finding it a new home."
            </p>
          </blockquote>
          <p className="text-piano-silver/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Every instrument we purchase becomes part of a curated collection. We don't flip pianos —
            we place them with buyers who will play them. That commitment to curation is why sellers
            come to us: their instruments end up with musicians, not in storage.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 px-8 bg-piano-cream border-t border-piano-linen">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-3">
              Common Questions
            </p>
            <h2
              className="font-cormorant font-light text-piano-black"
              style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
            >
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-0 divide-y divide-piano-linen">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group py-6">
                <summary className="flex justify-between items-start gap-6 cursor-pointer list-none">
                  <h3 className="font-cormorant font-light text-piano-black text-2xl leading-snug group-open:text-piano-gold transition-colors">
                    {q}
                  </h3>
                  <span className="text-piano-gold shrink-0 mt-0.5 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-piano-stone text-base leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-8 bg-piano-burgundy border-t border-piano-gold/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">
            Ready to Begin?
          </p>
          <h2
            className="font-cormorant font-light text-piano-cream mb-6"
            style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
          >
            Tell Us About Your Piano
          </h2>
          <p className="text-piano-silver/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Fill out our short inquiry form with your piano's details. We'll respond with an honest
            preliminary assessment within 48 hours — no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?type=sell"
              className="inline-block bg-piano-black text-piano-cream px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-charcoal transition-colors"
            >
              Submit Your Piano
            </Link>
            <a
              href="tel:+16035550123"
              className="inline-block border border-piano-gold text-piano-gold px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-gold/10 transition-colors"
            >
              Call (603) 555-0123
            </a>
          </div>
          <p className="text-piano-silver/40 text-xs mt-6">
            Prefer email? Write to{' '}
            <a
              href="mailto:info@usedsteinways.com"
              className="text-piano-silver/60 hover:text-piano-silver transition-colors underline"
            >
              info@usedsteinways.com
            </a>
          </p>
        </div>
      </section>

      <InquiryCTA variant="light" />
    </main>
  )
}
