/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import Link from 'next/link'
import { InquiryCTA } from '@/components/piano/InquiryCTA'

export const metadata: Metadata = {
  title: 'What to Look for When Buying a Used Piano: 10 Things to Check | UsedSteinways.com',
  description:
    'Ten specific things to inspect when evaluating any used piano — in priority order. Written for buyers who are not piano technicians. Includes a DIY vs. expert checklist.',
}

const TOC = [
  { id: 'before-you-go', label: 'Before You Visit' },
  { id: 'ten-things', label: 'The 10 Inspection Points' },
  { id: 'diy-vs-rpt', label: 'What You Can Do vs. Expert' },
  { id: 'the-test-play', label: 'The Test Play' },
  { id: 'three-red-flags', label: 'Three Deal-Breaker Red Flags' },
  { id: 'next-steps', label: 'Next Steps After a Visit' },
]

export default function WhatToLookForUsedPianoPage() {
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
            <span className="text-piano-cream">What to Look For</span>
          </nav>
          <span className="font-display text-xs tracking-[0.2em] uppercase text-piano-gold bg-piano-gold/10 border border-piano-gold/30 px-3 py-1 mb-6 inline-block">
            Buying Guide
          </span>
          <h1
            className="text-4xl md:text-5xl font-medium text-white mt-5 mb-6 leading-snug"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What to Look for When Buying a Used Piano: 10 Things to Check
          </h1>
          <div className="flex items-center gap-6 text-piano-silver text-sm">
            <span>7 min read</span>
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
              You don't need to be a piano technician to evaluate a used piano intelligently.
              You need to know what to look at, in what order, and which problems are fixable
              versus which ones should end the conversation.
            </p>

            <section id="before-you-go" className="mb-14">
              <h2
                className="text-2xl font-medium text-piano-black mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Before You Visit
              </h2>
              <p className="text-gray-700 leading-loose mb-4">
                Ask these questions before spending time traveling to evaluate an instrument:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "When was it last tuned? (If more than 12 months ago, the pitch may be too far below A440 to evaluate tonally — ask if they'll have it tuned before your visit.)",
                  'What is the make, model, and serial number? (Verify the age through manufacturer records — Steinway serial numbers are publicly available.)',
                  'Has it had any major work done — soundboard repair, restringing, action rebuild?',
                  'How long have you owned it and how was it stored?',
                  'Will you allow a pre-purchase inspection by my technician?',
                ].map((q, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-piano-gold mt-1 shrink-0">◆</span>
                    <span className="text-gray-700 text-sm leading-relaxed">{q}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 leading-loose">
                A seller who won't answer basic questions before a visit, or who becomes evasive
                when asked about inspection, is telling you something. Proceed with caution.
              </p>
            </section>

            <section id="ten-things" className="mb-14">
              <h2
                className="text-2xl font-medium text-piano-black mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                The 10 Inspection Points
              </h2>
              <p className="text-gray-700 leading-loose mb-6">
                These are listed in priority order — higher numbers are more expensive to fix
                if problematic, but many are also easier to spot without technical training.
              </p>
              <div className="space-y-6">
                {[
                  {
                    number: '01',
                    title: 'Tuning Stability',
                    priority: 'Critical',
                    howTo: 'Ask when it was last tuned and how long it held pitch afterward. A healthy piano holds tune for 6–8 weeks minimum in a stable environment.',
                    whatItMeans: 'Poor tuning stability usually means worn tuning pins or a failing pinblock. This is one of the most expensive repairs ($3,000–$8,000).',
                    canYouTell: 'Partially — you can hear whether it sounds in tune, but truly evaluating pin torque requires a technician.',
                  },
                  {
                    number: '02',
                    title: 'Soundboard Condition',
                    priority: 'Critical',
                    howTo: "Open the lid and look at the wooden panel inside with a flashlight. You're looking for cracks running along the grain. Then press gently between the ribs (the ridges under the board) — you should feel springiness.",
                    whatItMeans: 'Minor cracks along the grain may not affect tone. Major cracks crossing the grain, or a soundboard without any spring (no crown), indicate expensive repair or replacement.',
                    canYouTell: 'Visually, yes — you can see cracks. Crown assessment is trickier but you can feel the difference between springy and flat.',
                  },
                  {
                    number: '03',
                    title: 'String Condition',
                    priority: 'High',
                    howTo: "Look along the strings at an angle with a flashlight. Check for rust — surface rust (light discoloration) is acceptable; deep pitting is not. Look specifically at bass strings where the copper winding meets the steel core.",
                    whatItMeans: 'Moderately rusted treble strings can be replaced for $2,000–$4,000. Severely corroded bass strings or broken windings mean bass restringing ($1,500–$3,000 for bass alone).',
                    canYouTell: "Yes — rust and corrosion are visible to the naked eye. You'll need a flashlight for bass strings.",
                  },
                  {
                    number: '04',
                    title: 'Action Response — All 88 Keys',
                    priority: 'High',
                    howTo: "Play each key slowly, one at a time, across the full keyboard. Listen for ciphers (notes that keep ringing after you release). Check that each key returns cleanly after pressing. Then play each key rapidly 5–6 times and feel whether the hammer catches properly.",
                    whatItMeans: 'Ciphering (notes that don\'t stop) is a mechanical failure in the repetition mechanism. Some ciphers are minor regulation issues ($500–$1,500 to fix); many ciphers suggest deeper action problems.',
                    canYouTell: "Yes — you can hear ciphers and feel keys that don't return. Subtle regulation issues need a technician.",
                  },
                  {
                    number: '05',
                    title: 'Touch Weight Consistency',
                    priority: 'High',
                    howTo: "Play a slow scale from the lowest note to the highest. Pay attention to how much force each key requires. The touch weight should be heavier in the bass and gradually lighter toward the treble — but consistently so, with no keys that feel dramatically heavier or lighter than their neighbors.",
                    whatItMeans: 'Wild inconsistency suggests deferred regulation. Light to fix if the action is otherwise sound ($800–$2,500); more expensive if parts are worn.',
                    canYouTell: "Yes — your hands will tell you if something is dramatically inconsistent. Subtle irregularities need an RPT.",
                  },
                  {
                    number: '06',
                    title: 'Hammer Condition',
                    priority: 'Medium-High',
                    howTo: "Open the lid and look at the hammers (the felt-covered wooden heads that strike the strings). They should be symmetrical and rounded, not flattened or grooved. On older instruments, look for deep grooves cut into the felt from string contact.",
                    whatItMeans: 'Moderately grooved hammers can be filed (reshaped) for $300–$600. Heavily grooved or hardened hammers produce a bright, harsh tone and need replacement ($2,500–$5,500 for a full set).',
                    canYouTell: 'Yes — you can see hammer grooves and flattening by opening the lid.',
                  },
                  {
                    number: '07',
                    title: 'Pedal Function',
                    priority: 'Medium',
                    howTo: "Press each pedal fully while playing. The sustain (right) pedal should produce a gradual increase in resonance as you press it deeper. It should operate silently. The una corda (left) pedal should shift the action slightly. The sostenuto (middle) pedal should hold only notes pressed at the moment of depression.",
                    whatItMeans: 'Noisy, sticking, or non-functional pedals are usually minor repairs ($200–$600). But investigate why — sometimes pedal problems indicate more serious structural issues.',
                    canYouTell: 'Yes — you can evaluate all three pedals yourself.',
                  },
                  {
                    number: '08',
                    title: 'Key Level and Condition',
                    priority: 'Medium',
                    howTo: "Stand back and look along the keyboard from the side. All keys should be at the same height. Then examine the keytops — they should be chip-free, not yellowed excessively, and without significant wear divots.",
                    whatItMeans: "Uneven key level is a regulation issue. Missing chips or severely worn keytops may need replacement ($1,500–$3,500 for new keytops). Don't confuse ivory yellowing (normal and desirable) with damage.",
                    canYouTell: 'Yes — both key level and keytop condition are visible without technical training.',
                  },
                  {
                    number: '09',
                    title: 'Case and Structure',
                    priority: 'Medium',
                    howTo: "Examine the veneer closely around the legs, case seams, and lid. Look for lifting veneer, cracks in the case, or legs that wobble when the piano is slightly shifted. Check that all leg joints are tight.",
                    whatItMeans: 'Minor veneer lifting is cosmetically annoying but relatively inexpensive to repair. Loose leg joints or structural cracks in the case are serious — they can indicate improper moving or storage.',
                    canYouTell: 'Yes — you can see veneer condition and feel wobble in legs.',
                  },
                  {
                    number: '10',
                    title: 'Tonal Balance',
                    priority: 'Contextual',
                    howTo: "Play the instrument fully, listening for tonal evenness across registers. Notes in the low treble (around middle C up to the second F) should not be dramatically different in character from bass or high treble. Listen for dead notes, wolf tones, or notes that buzz.",
                    whatItMeans: 'Tonal imbalance can be addressed through voicing (less expensive) or indicates soundboard or string issues (more expensive). Buzzes often indicate loose internal components — easily fixed.',
                    canYouTell: "Gross tonal problems, yes. Subtle voicing issues need a trained ear.",
                  },
                ].map(({ number, title, priority, howTo, whatItMeans, canYouTell }) => (
                  <div key={number} className="p-6 bg-white border border-gray-100">
                    <div className="flex items-start gap-4 mb-4">
                      <span
                        className="text-3xl font-medium text-gray-200 shrink-0 leading-none"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {number}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-piano-black">{title}</h3>
                          <span className={`font-display text-xs tracking-wide uppercase px-2 py-0.5 ${
                            priority === 'Critical'
                              ? 'text-red-700 bg-red-50'
                              : priority === 'High'
                              ? 'text-amber-700 bg-amber-50'
                              : 'text-gray-500 bg-gray-100'
                          }`}>
                            {priority}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 ml-14">
                      <div>
                        <span className="font-display text-xs tracking-wide uppercase text-gray-400 block mb-1">How to Check</span>
                        <p className="text-gray-600 text-sm leading-relaxed">{howTo}</p>
                      </div>
                      <div>
                        <span className="font-display text-xs tracking-wide uppercase text-gray-400 block mb-1">What It Means</span>
                        <p className="text-gray-600 text-sm leading-relaxed">{whatItMeans}</p>
                      </div>
                      <div>
                        <span className="font-display text-xs tracking-wide uppercase text-gray-400 block mb-1">Can You Evaluate This Yourself?</span>
                        <p className="text-gray-600 text-sm leading-relaxed">{canYouTell}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="diy-vs-rpt" className="mb-14">
              <h2
                className="text-2xl font-medium text-piano-black mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                What You Can Do vs. What Needs an Expert
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white border border-gray-100">
                  <h3
                    className="font-medium text-piano-black mb-4"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    You Can Evaluate
                  </h3>
                  <ul className="space-y-2">
                    {[
                      'Ciphers (stuck notes that keep ringing)',
                      'Keys that don\'t return',
                      'Visible soundboard cracks',
                      'String rust (visible with flashlight)',
                      'Hammer groove depth (visible)',
                      'Key level and keytop condition',
                      'Pedal noise and function',
                      'Case and veneer condition',
                      'Gross tonal imbalance or buzzes',
                      'Overall cleanliness and care',
                    ].map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-gray-600">
                        <span className="text-green-600 shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 bg-white border border-gray-100">
                  <h3
                    className="font-medium text-piano-black mb-4"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Needs a Registered Piano Technician
                  </h3>
                  <ul className="space-y-2">
                    {[
                      'Tuning pin torque (pinblock condition)',
                      'Soundboard crown measurement',
                      'Bridge condition and pin seating',
                      'Plate crack inspection',
                      'Action regulation precision',
                      'Voicing quality assessment',
                      'Structural rib condition under board',
                      'Subtle tonal anomalies',
                      'Accurate repair cost estimates',
                      'Overall value assessment',
                    ].map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-gray-600">
                        <span className="text-piano-burgundy shrink-0">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-gray-700 leading-loose mt-6">
                Your goal on a first visit: use your own evaluation to decide whether the
                instrument is worth the cost of an RPT inspection ($150–$300). If what you
                find is not an immediate deal-breaker, bring in the technician before committing.
              </p>
            </section>

            <section id="the-test-play" className="mb-14">
              <h2
                className="text-2xl font-medium text-piano-black mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                The Test Play
              </h2>
              <p className="text-gray-700 leading-loose mb-4">
                Before you play repertoire, do a systematic test:
              </p>
              <ol className="space-y-3">
                {[
                  "Play each of the 88 keys slowly, one at a time. Listen for ciphers. Feel for keys that don't return.",
                  'Play a slow chromatic scale from bottom to top. Listen for tonal consistency. Note dead spots or dramatically different notes.',
                  'Play a loud chord in the bass and listen to it decay. The sound should sustain cleanly, not buzz or rattle.',
                  'Play rapid passages in the middle register. Feel whether the action is responsive and consistent.',
                  'Test all three pedals while playing — noise, sticking, and effect.',
                  'Play something you know well. This is the final test: does the piano feel and sound like something you would want to practice on?',
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-gray-700 text-sm leading-relaxed">
                    <span className="font-display text-piano-gold font-semibold shrink-0 w-5">
                      {i + 1}.
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </section>

            <section id="three-red-flags" className="mb-14">
              <h2
                className="text-2xl font-medium text-piano-black mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Three Deal-Breaker Red Flags
              </h2>
              <p className="text-gray-700 leading-loose mb-5">
                Most problems are fixable at some cost. These three are different — they indicate
                structural failure or near-structural failure that makes a pre-owned instrument
                uneconomical to repair:
              </p>
              <div className="space-y-4">
                {[
                  {
                    flag: 'Piano that cannot hold tune for more than a few weeks',
                    why: 'This almost always indicates a failing pinblock. Replacement costs $3,000–$8,000 and requires removing the plate — major surgery. Unless the price reflects this, walk away.',
                    severity: 'Walk away unless price reflects repair cost',
                  },
                  {
                    flag: 'Collapsed soundboard (no crown, flat or concave)',
                    why: "A soundboard without crown has lost its acoustic function. It may play, but it won't have the tonal depth or projection that makes a fine piano worth owning. Replacement is $6,000–$14,000 installed.",
                    severity: 'Walk away unless the price is significantly below market',
                  },
                  {
                    flag: "Seller refuses pre-purchase inspection by your technician",
                    why: "There is no legitimate reason to refuse an independent inspection. The only reason to refuse is that the seller knows something they don't want discovered. This is the clearest signal in the entire buying process.",
                    severity: 'Always walk away',
                  },
                ].map(({ flag, why, severity }) => (
                  <div key={flag} className="p-5 bg-red-50 border border-red-100">
                    <h3 className="font-semibold text-red-800 text-sm mb-2">{flag}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">{why}</p>
                    <span className="font-display text-xs tracking-wide uppercase text-red-600">
                      {severity}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section id="next-steps" className="mb-14">
              <h2
                className="text-2xl font-medium text-piano-black mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Next Steps After Your Visit
              </h2>
              <p className="text-gray-700 leading-loose mb-4">
                If your first-pass evaluation doesn't reveal any deal-breakers, the path forward is:
              </p>
              <ol className="space-y-4">
                {[
                  'Hire a Registered Piano Technician (find one through the Piano Technicians Guild) to perform a full pre-purchase inspection. Budget $150–$300.',
                  'Use the inspection report to understand all deferred maintenance and its estimated cost. This becomes your negotiating basis.',
                  "If the technician finds no major issues and the price is at or below market for the condition, proceed. If there's significant deferred maintenance, request a price adjustment or walk away.",
                  'Budget for delivery. Professional piano moving costs $800–$2,500 depending on distance and access. This is not optional.',
                  'Plan your first tuning within 2–4 weeks of delivery, once the piano has adjusted to its new environment.',
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-gray-700 text-sm leading-relaxed">
                    <span className="font-display text-piano-gold font-semibold shrink-0 w-5">
                      {i + 1}.
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
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
                Related Guide
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Read our complete guide to buying a pre-owned Steinway.
              </p>
              <Link
                href="/guides/buying-a-used-steinway"
                className="block text-center bg-piano-burgundy text-white py-3 font-display text-xs tracking-[0.2em] uppercase hover:bg-piano-burgundy/90 transition-colors"
              >
                Buying Guide →
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <InquiryCTA variant="dark" />
    </main>
  )
}
