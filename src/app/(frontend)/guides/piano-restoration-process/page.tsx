/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import Link from 'next/link'
import { InquiryCTA } from '@/components/piano/InquiryCTA'

export const metadata: Metadata = {
  title: 'Inside a Piano Restoration: What Actually Happens | UsedSteinways.com',
  description:
    'What a full piano restoration involves, what it costs, the difference between regulation and rebuild, and how to evaluate whether a restored instrument was done right.',
}

const TOC = [
  { id: 'terminology', label: 'Regulation vs. Rebuild' },
  { id: 'what-restoration-means', label: 'What Restoration Actually Is' },
  { id: 'components', label: 'Component by Component' },
  { id: 'costs', label: 'Cost Expectations' },
  { id: 'evaluating-quality', label: 'Evaluating Restoration Quality' },
  { id: 'red-flags', label: 'Red Flags' },
  { id: 'how-we-buy', label: 'How We Evaluate Before Purchase' },
]

export default function PianoRestorationProcessPage() {
  return (
    <main className="min-h-screen bg-piano-cream">
      {/* Hero */}
      <section className="bg-piano-black py-28 px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-piano-cream/50 font-display text-[11px] tracking-[0.45em] uppercase mb-8">
            <Link href="/guides" className="hover:text-piano-gold transition-colors">
              Guides
            </Link>
            <span>·</span>
            <span className="text-piano-cream">Piano Restoration</span>
          </nav>
          <span className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold bg-piano-gold/10 border border-piano-gold/30 px-3 py-1 mb-6 inline-block">
            Education
          </span>
          <h1
            className="font-cormorant font-light text-white mt-5 mb-6 leading-snug"
            style={{ fontSize: 'clamp(3.6rem, 7vw, 8.5rem)' }}
          >
            Inside a Piano Restoration: What Actually Happens
          </h1>
          <div className="flex items-center gap-6 text-piano-silver text-sm">
            <span>11 min read</span>
            <span>·</span>
            <span>By Roger · Updated January 2026</span>
          </div>
        </div>
      </section>

      {/* Article Layout */}
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid lg:grid-cols-[1fr_280px] gap-16 items-start">
          {/* Article Body */}
          <article className="max-w-none">
            <p className="text-xl text-piano-stone leading-relaxed mb-10 font-cormorant font-light">
              "Fully restored" is one of the most abused phrases in the piano market. It can mean
              a complete $45,000 rebuild by a Steinway-authorized rebuilder, or it can mean someone
              cleaned the keys and tuned it. Understanding what restoration actually involves —
              and what it costs — is essential before you buy a rebuilt instrument.
            </p>

            <section id="terminology" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                Regulation vs. Rebuild: The Critical Distinction
              </h2>
              <p className="text-piano-stone leading-relaxed mb-4">
                These terms are often conflated. They describe fundamentally different procedures:
              </p>
              <div className="space-y-4 mb-6">
                {[
                  {
                    term: 'Tuning',
                    scope: 'Adjusting string tension to correct pitch.',
                    time: '1–2 hours',
                    cost: '$150–$250',
                    note: 'Should be done every 6–12 months. Not restoration.',
                  },
                  {
                    term: 'Voicing',
                    scope: 'Adjusting hammer hardness to change tonal quality — brightening or mellowing the sound.',
                    time: '2–4 hours',
                    cost: '$200–$500',
                    note: 'Maintenance, not restoration. Changes sound character without replacing parts.',
                  },
                  {
                    term: 'Regulation',
                    scope: 'Adjusting all mechanical components of the action to manufacturer specifications — key height, blow distance, let-off, aftertouch, and dozens of other parameters.',
                    time: '8–20 hours',
                    cost: '$800–$2,500',
                    note: 'Should be performed every 3–5 years on a regularly played instrument. Not restoration, but essential maintenance.',
                  },
                  {
                    term: 'Partial Restoration',
                    scope: 'Replacing specific worn components: new hammer heads, restringing, new damper felts. Original soundboard, strings and action parts retained where serviceable.',
                    time: '20–80 hours',
                    cost: '$5,000–$18,000',
                    note: 'Meaningfully extends instrument life. Components replaced are new; others remain original.',
                  },
                  {
                    term: 'Full Restoration / Rebuild',
                    scope: 'Complete replacement of all acoustic and mechanical components. New soundboard, new strings, new pins, complete new action (or full action rebuild with new hammers, shanks, flanges), often new keytops and felts. Structural repairs as needed.',
                    time: '200–500 hours',
                    cost: '$25,000–$55,000',
                    note: 'The result is acoustically a new instrument. All performance components have been replaced.',
                  },
                ].map(({ term, scope, time, cost, note }) => (
                  <div key={term} className="p-5 bg-piano-cream border border-piano-linen">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-cormorant font-light text-2xl text-piano-black">{term}</h3>
                      <div className="text-right shrink-0">
                        <span className="text-piano-stone text-xs block">{time}</span>
                        <span className="font-semibold text-piano-black text-sm">{cost}</span>
                      </div>
                    </div>
                    <p className="text-piano-stone text-sm leading-relaxed mb-2">{scope}</p>
                    <p className="text-piano-stone text-xs italic">{note}</p>
                  </div>
                ))}
              </div>
              <p className="text-piano-stone leading-relaxed">
                When a seller says "recently restored," your first question should be: "Can you
                provide documentation of exactly what work was performed and by whom?" Legitimate
                restoration generates receipts, invoices, and in some cases, technical reports.
              </p>
            </section>

            <section id="what-restoration-means" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                What a Full Restoration Actually Is
              </h2>
              <p className="text-piano-stone leading-relaxed mb-4">
                A full professional rebuild takes a piano apart to its structural skeleton and
                rebuilds it with new acoustic and mechanical components. For a Steinway, this
                typically takes 200–500 hours of skilled labor across several months, depending
                on the instrument's condition and what work is required.
              </p>
              <p className="text-piano-stone leading-relaxed mb-4">
                The process begins with disassembly: removing the action, strings, plate, and in
                a full restoration, the old soundboard. Each component is evaluated. Some elements —
                the rim, the bridge, the case structure — are almost always reused if sound. Others
                are always replaced.
              </p>
              <p className="text-piano-stone leading-relaxed">
                A properly done full restoration on a quality vintage Steinway produces an instrument
                that competes acoustically with a new Steinway of the same model. The structural
                components (the rim, the plate, the keys) carry the character of the original
                instrument; the acoustic and mechanical components are new and will last another
                40–60 years.
              </p>
            </section>

            <section id="components" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                Component by Component
              </h2>
              <div className="space-y-5">
                {[
                  {
                    component: 'Soundboard',
                    description: 'The spruce panel that amplifies string vibrations. A new soundboard is the single most impactful component in a restoration. Steinway-authorized rebuilders use Sitka spruce soundboards from approved suppliers (Bolduc, Edelmann). A new soundboard changes the acoustic character of an instrument profoundly.',
                    lifespan: '40–80 years',
                    cost: '$6,000–$14,000 installed',
                    note: "The crown (arch) of a new soundboard is higher than a broken-in one. Expect 6–18 months of acoustic settling before a new soundboard reaches its full voice.",
                  },
                  {
                    component: 'Strings',
                    description: 'Treble strings are high-carbon steel wire (Röslau is the preferred brand for Steinway work). Bass strings are copper-wound steel cores, custom wound to the instrument\'s specifications. A complete restringing includes new tuning pins driven into fresh pinholes in the pinblock.',
                    lifespan: '30–50 years under normal conditions',
                    cost: '$3,500–$7,000 complete',
                    note: 'New strings require 6–12 months to stabilize in pitch. Fresh strings should be tuned at least 4 times in the first year.',
                  },
                  {
                    component: 'Tuning Pins and Pinblock',
                    description: 'The pinblock is a laminated maple block into which steel tuning pins are driven. Over decades, the wood compresses around the pins and eventually loses its grip. A new pinblock is drilled and fitted precisely to accept new larger-diameter pins. This is among the most technically demanding parts of a rebuild.',
                    lifespan: '40–70 years',
                    cost: '$3,000–$8,000',
                    note: 'A pinblock replacement that is done incorrectly causes ongoing tuning instability. It must be done by an experienced rebuilder.',
                  },
                  {
                    component: 'Hammers',
                    description: 'Piano hammers are felt-covered wooden moldings. They compress and harden with use, gradually becoming brighter and less responsive to voicing. New hammers are softer and can be voiced to a wide range of tonal characters. Top rebuilders use Renner or Abel hammers for Steinway work.',
                    lifespan: '15–25 years with regular voicing',
                    cost: '$2,500–$5,500 for a complete set',
                    note: 'New hammers must be voiced (needled) to achieve their final tonal character. This is an art; the quality of the voicing is as important as the quality of the hammers.',
                  },
                  {
                    component: 'Action Parts',
                    description: 'The action mechanism (wippen assemblies, repetition levers, hammers, shanks, flanges) wears with use. A complete action rebuild replaces all moving parts. Many rebuilders use Renner German-made action parts, which are the same supplier Steinway uses for current production.',
                    lifespan: '30–50 years',
                    cost: '$8,000–$18,000 for complete action rebuild',
                    note: "A regulated new action feels and responds like a factory-new Steinway. The regulation quality determines much of the instrument's playability.",
                  },
                  {
                    component: 'Keys',
                    description: 'The keys themselves rarely need replacement (they are solid spruce). Keytops (the playing surface) are replaced when worn or yellowed. Modern keytops use synthetic ivory-feel materials; original ivory keytops on older instruments may be retained or replaced.',
                    lifespan: '40–80 years (structural key); 15–30 years (keytop)',
                    cost: '$1,500–$3,500 for new keytops',
                    note: 'Original ivory keytops in excellent condition are a feature worth preserving. Synthetic replacements are acceptable but not equivalent.',
                  },
                ].map(({ component, description, lifespan, cost, note }) => (
                  <div key={component} className="p-6 bg-piano-cream border border-piano-linen">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="font-cormorant font-light text-2xl text-piano-black">{component}</h3>
                      <div className="text-right shrink-0">
                        <span className="text-piano-stone text-xs block">{lifespan}</span>
                        <span className="font-semibold text-piano-black text-sm">{cost}</span>
                      </div>
                    </div>
                    <p className="text-piano-stone text-sm leading-relaxed mb-3">{description}</p>
                    <div className="flex gap-2">
                      <span className="text-piano-gold text-xs font-display tracking-wide uppercase shrink-0">Note:</span>
                      <span className="text-piano-stone text-xs leading-relaxed">{note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="costs" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                Cost Expectations
              </h2>
              <p className="text-piano-stone leading-relaxed mb-4">
                Total restoration costs for a Steinway grand by model:
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-piano-linen">
                      <th className="text-left py-3 pr-6 font-display text-[11px] tracking-[0.45em] uppercase text-piano-stone">Model</th>
                      <th className="text-left py-3 pr-6 font-display text-[11px] tracking-[0.45em] uppercase text-piano-stone">Partial Restoration</th>
                      <th className="text-right py-3 font-display text-[11px] tracking-[0.45em] uppercase text-piano-stone">Full Rebuild</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Model S / M', '$8,000–$14,000', '$22,000–$32,000'],
                      ['Model A', '$10,000–$16,000', '$26,000–$36,000'],
                      ['Model B', '$12,000–$20,000', '$32,000–$48,000'],
                      ['Model C', '$15,000–$22,000', '$38,000–$55,000'],
                      ['Model D', '$18,000–$28,000', '$50,000–$75,000'],
                    ].map(([model, partial, full]) => (
                      <tr key={model} className="border-b border-piano-linen">
                        <td className="py-3 pr-6 font-medium text-piano-black">{model}</td>
                        <td className="py-3 pr-6 text-piano-stone">{partial}</td>
                        <td className="py-3 text-right font-semibold text-piano-black">{full}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-piano-stone text-xs leading-relaxed">
                These are 2026 estimates for work performed by qualified independent rebuilders.
                Steinway factory rebuilds (Hamburg or New York) cost 30–50% more. Geographic
                variation is significant — New York and Boston rates are higher than Midwest rates.
              </p>
            </section>

            <section id="evaluating-quality" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                Evaluating Restoration Quality
              </h2>
              <p className="text-piano-stone leading-relaxed mb-5">
                How to tell whether a restoration was done well:
              </p>
              <ul className="space-y-4">
                {[
                  {
                    check: 'Request documentation',
                    detail: 'A proper rebuild generates receipts. You should be able to see what was replaced, what brand of components was used (Renner, Abel, Bolduc, Röslau are good signs), and who performed the work. Steinway-authorized rebuilder certification matters.',
                  },
                  {
                    check: 'Check tuning stability',
                    detail: "A piano that was restrung within the past 12 months will need more frequent tuning as strings stretch and stabilize. Ask when the work was done and how many tunings it's had since. 4–6 tunings in the first year is normal and healthy.",
                  },
                  {
                    check: 'Evaluate the action regulation',
                    detail: 'A well-regulated action has consistent key weight and depth across all 88 keys, clean hammer return without ciphering, and responsive repetition. Play every note slowly. Inconsistency after restoration suggests the regulation was not done properly.',
                  },
                  {
                    check: 'Listen for soundboard quality',
                    detail: 'A new soundboard should have even tone throughout the registers with no wolf notes or dead spots. Play scales slowly from bass to treble, listening for tonal gaps. A high-quality soundboard has no obvious break points.',
                  },
                  {
                    check: 'Verify the pinblock',
                    detail: 'Ask a technician to check tuning pin torque. Each pin should require consistent resistance to turn. Pins that spin freely or feel different from their neighbors suggest a pinblock issue despite claims of replacement.',
                  },
                ].map(({ check, detail }, i) => (
                  <li key={i} className="flex gap-4 p-5 bg-piano-cream border border-piano-linen list-none">
                    <span className="font-display text-piano-gold text-sm font-semibold shrink-0 w-6">
                      {i + 1}.
                    </span>
                    <div>
                      <span className="font-cormorant font-light text-xl text-piano-black block mb-1">{check}</span>
                      <span className="text-piano-stone text-sm leading-relaxed">{detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section id="red-flags" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                Red Flags in Restored Instruments
              </h2>
              <ul className="space-y-3">
                {[
                  'No documentation of work performed — only verbal claims.',
                  'Unknown or uncertified rebuilder with no references or verifiable track record.',
                  "Cheap hammer brands (not Renner, Abel, or equivalent) on a high-value instrument. If someone spent $45,000 restoring a Steinway B, they used Renner hammers.",
                  'Uneven regulation immediately after claimed restoration — suggests shortcuts.',
                  'New strings but original pinblock — the most critical component was skipped.',
                  'Cosmetically perfect case with acoustically mediocre results — restoration budget was spent on aesthetics rather than function.',
                  'Seller refuses to allow pre-purchase inspection after a restoration claim.',
                ].map((flag, i) => (
                  <li key={i} className="flex gap-3 p-4 bg-red-50 border border-red-100 list-none">
                    <span className="text-red-500 shrink-0 mt-0.5">✕</span>
                    <span className="text-piano-stone text-sm leading-relaxed">{flag}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="how-we-buy" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                How We Evaluate Before Purchase
              </h2>
              <p className="text-piano-stone leading-relaxed mb-4">
                Every instrument we offer for sale has been evaluated by a Registered Piano
                Technician before we acquire it. For instruments represented as restored, that
                evaluation includes verification of the rebuilder's credentials, inspection of
                available documentation, and physical assessment of the acoustic and mechanical
                components.
              </p>
              <p className="text-piano-stone leading-relaxed mb-4">
                We do not resell instruments where restoration claims cannot be verified. If a
                seller tells us an instrument was "completely rebuilt" but cannot produce
                documentation or identify the rebuilder, we evaluate it on its current merits
                only — not on the claimed work history.
              </p>
              <p className="text-piano-stone leading-relaxed">
                When we describe an instrument as restored, rebuilt, or having had specific work
                performed, we can provide the documentation to support that claim. That's the
                standard we hold ourselves to, and it's the standard you should expect from any
                reputable dealer.
              </p>
            </section>
          </article>

          {/* Sidebar TOC */}
          <aside className="hidden lg:block sticky top-24">
            <div className="bg-piano-black p-6">
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
                Questions?
              </p>
              <p className="text-piano-stone text-sm leading-relaxed mb-4">
                We document every instrument's history. Ask us about any piano we carry.
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
