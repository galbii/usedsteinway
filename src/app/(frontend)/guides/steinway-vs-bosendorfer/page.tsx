/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import Link from 'next/link'
import { InquiryCTA } from '@/components/piano/InquiryCTA'

export const metadata: Metadata = {
  title: 'Steinway vs. Bösendorfer: An Honest Comparison | UsedSteinways.com',
  description:
    'A frank comparison of Steinway and Bösendorfer — tone character, touch, repertoire suitability, value, and resale. Which instrument belongs in your home?',
}

const TOC = [
  { id: 'overview', label: 'The Two Philosophies' },
  { id: 'tone', label: 'Tone Character' },
  { id: 'touch', label: 'Touch and Action' },
  { id: 'repertoire', label: 'Repertoire Suitability' },
  { id: 'value-resale', label: 'Value and Resale' },
  { id: 'models', label: 'Comparable Models' },
  { id: 'our-view', label: 'Our Honest View' },
]

export default function SteinwayVsBosendorferPage() {
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
            <span className="text-piano-cream">Steinway vs. Bösendorfer</span>
          </nav>
          <span className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold bg-piano-gold/10 border border-piano-gold/30 px-3 py-1 mb-6 inline-block">
            Comparison
          </span>
          <h1
            className="font-cormorant font-light text-white mt-5 mb-6 leading-snug"
            style={{ fontSize: 'clamp(3.6rem, 7vw, 8.5rem)' }}
          >
            Steinway vs. Bösendorfer: An Honest Comparison
          </h1>
          <div className="flex items-center gap-6 text-piano-silver text-sm">
            <span>10 min read</span>
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
              We sell both. We love both. And we have clear opinions about which one belongs in
              your home — opinions that depend entirely on who you are as a musician and what music
              you play.
            </p>

            <section id="overview" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                Two Instruments, Two Philosophies
              </h2>
              <p className="text-piano-stone leading-relaxed mb-4">
                Steinway & Sons was founded in 1853 by Henry Steinway in New York. From the
                beginning, the instrument was designed for the concert hall — for projection,
                clarity, and athletic responsiveness. Steinway's innovations (the duplex scale,
                the overstrung bass, the one-piece bent rim) were engineering solutions to the
                problem of filling large spaces with a focused, powerful sound.
              </p>
              <p className="text-piano-stone leading-relaxed mb-4">
                Bösendorfer was founded in Vienna in 1828 — twenty-five years earlier — by Ignaz
                Bösendorfer, who built his first instrument for Franz Liszt. The Viennese tradition
                from which Bösendorfer emerges is different: more intimate, more harmonically
                complex, designed for salons and small concert halls rather than the opera-house
                acoustics of American venues. Where Steinway projects, Bösendorfer resonates.
              </p>
              <p className="text-piano-stone leading-relaxed">
                These founding philosophies have never fully left either instrument. When you play
                them side by side, you are hearing a century and a half of engineering tradition
                made audible.
              </p>
            </section>

            <section id="tone" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                Tone Character
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-piano-burgundy text-white">
                  <h3 className="font-cormorant font-light text-2xl mb-4 text-piano-gold">
                    Steinway
                  </h3>
                  <ul className="space-y-3 text-sm text-piano-cream/80">
                    {[
                      'Focused, brilliant top register',
                      'Powerful, authoritative bass',
                      'Fast, responsive attack',
                      'Clear projection across large spaces',
                      'Tone that cuts through an orchestra',
                      'Consistent voice throughout the range',
                    ].map((trait) => (
                      <li key={trait} className="flex gap-2">
                        <span className="text-piano-gold shrink-0">+</span>
                        {trait}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 bg-piano-indigo-card text-white">
                  <h3 className="font-cormorant font-light text-2xl mb-4 text-piano-gold">
                    Bösendorfer
                  </h3>
                  <ul className="space-y-3 text-sm text-piano-cream/80">
                    {[
                      'Warm, complex, orchestral depth',
                      'Rich harmonic overtones throughout',
                      'Bass with extraordinary resonance',
                      'Nuanced, singing midrange',
                      'Tone that blooms in smaller spaces',
                      'Imperial: extra bass notes below A0',
                    ].map((trait) => (
                      <li key={trait} className="flex gap-2">
                        <span className="text-piano-gold shrink-0">+</span>
                        {trait}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-piano-stone leading-relaxed mb-4">
                The tonal difference is immediately audible to any sensitive ear. Play a Brahms
                intermezzo on a Steinway Model B, then on a Bösendorfer 200 of comparable quality.
                The Steinway version is cleaner, more precise, more projected. The Bösendorfer
                version has more harmonic complexity — each note seems to radiate more overtones,
                creating a sound that is richer and, in the right space, extraordinarily beautiful.
              </p>
              <p className="text-piano-stone leading-relaxed mb-4">
                In a large concert hall, the Steinway's clarity and projection advantage matters
                enormously. In a medium-sized room or recording studio, the Bösendorfer's harmonic
                richness can be the more compelling instrument.
              </p>
              <blockquote className="border-l-4 border-piano-gold pl-6 py-2 my-8">
                <p className="text-xl text-piano-stone italic leading-relaxed font-cormorant font-light">
                  "The Steinway wants to be heard across a room. The Bösendorfer wants you to lean
                  in and listen."
                </p>
                <footer className="mt-3 text-sm text-piano-silver font-display tracking-wide">
                  — Roger
                </footer>
              </blockquote>
            </section>

            <section id="touch" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                Touch and Action
              </h2>
              <p className="text-piano-stone leading-relaxed mb-4">
                The Steinway action is arguably the most widely copied action in the world. It is
                fast, consistent, and athletic — designed for the technical demands of 19th and
                20th century concert repertoire. The repetition is crisp, the key weight is
                carefully regulated, and the resistance curve is predictable. Pianists who learn
                on Steinways develop their technique against this standard.
              </p>
              <p className="text-piano-stone leading-relaxed mb-4">
                The Bösendorfer action is heavier and more nuanced. Key weight is typically 5–10
                grams heavier in the bass register than a comparable Steinway, with a touch depth
                that is slightly shallower. The repetition mechanism requires more deliberate
                articulation — you can't play it as athletically as a Steinway without some
                adjustment. In return, the action rewards sensitivity and gradation of touch in
                ways that the Steinway, with its faster response, sometimes compresses.
              </p>
              <p className="text-piano-stone leading-relaxed mb-4">
                Most pianists who regularly play both instruments find the Steinway easier to
                perform on initially, and the Bösendorfer more rewarding musically once they've
                spent time with it. The adjustment period is real — expect 2–3 weeks before a
                Bösendorfer action feels natural to a Steinway-trained hand.
              </p>
              <p className="text-piano-stone leading-relaxed">
                For practice and technique development, the Steinway's consistency is an
                advantage. For expressive playing where touch-weight gradation matters above all
                else, the Bösendorfer rewards patience.
              </p>
            </section>

            <section id="repertoire" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                Repertoire Suitability
              </h2>
              <p className="text-piano-stone leading-relaxed mb-5">
                This is where we can be most specific. If you know what you play, you can know
                which instrument serves you better:
              </p>
              <div className="space-y-4">
                {[
                  {
                    repertoire: 'Beethoven, Schubert',
                    verdict: 'Bösendorfer',
                    note: "The Viennese piano tradition for which this music was written. Schubert's song-like lines benefit from the warm midrange; Beethoven's harmonic explorations gain complexity.",
                  },
                  {
                    repertoire: 'Brahms, Schumann',
                    verdict: 'Bösendorfer, slight edge',
                    note: "The German Romantic repertoire where harmonic weight and overtone richness matter most. The extra bass resonance on the Imperial is extraordinary for late Brahms.",
                  },
                  {
                    repertoire: 'Chopin, Liszt',
                    verdict: 'Either — personal preference',
                    note: 'Liszt played a Bösendorfer. Many modern pianists prefer the Steinway for its clarity in complex textures. Both are entirely appropriate.',
                  },
                  {
                    repertoire: 'Debussy, Ravel',
                    verdict: 'Steinway',
                    note: "The French impressionist palette — clarity of color, rapid attack, distinct voices in complex textures — is served by Steinway's focused tone.",
                  },
                  {
                    repertoire: 'Prokofiev, Bartók, contemporary',
                    verdict: 'Steinway',
                    note: "Percussive, athletic playing that demands fast repetition and a bright, cutting attack. The Bösendorfer can manage this repertoire but the Steinway was made for it.",
                  },
                  {
                    repertoire: 'Bach, Baroque',
                    verdict: 'Either — room dependent',
                    note: 'The contrapuntal clarity of Bach benefits from both instruments differently. The Steinway clarifies lines; the Bösendorfer enriches them. Room size is the deciding factor.',
                  },
                  {
                    repertoire: 'Jazz, crossover',
                    verdict: 'Steinway',
                    note: 'The jazz tradition was built on Steinways. The consistent touch, bright tone, and fast response are what jazz pianists expect and need.',
                  },
                ].map(({ repertoire, verdict, note }) => (
                  <div key={repertoire} className="grid md:grid-cols-[1fr_auto_2fr] gap-4 p-4 bg-piano-cream border border-piano-linen items-start">
                    <span className="font-medium text-piano-black text-sm">{repertoire}</span>
                    <span className="font-display text-[11px] tracking-[0.3em] uppercase text-piano-gold bg-piano-gold/10 px-3 py-1 self-start whitespace-nowrap">
                      {verdict}
                    </span>
                    <p className="text-piano-stone text-sm leading-relaxed">{note}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="value-resale" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                Value and Resale
              </h2>
              <p className="text-piano-stone leading-relaxed mb-4">
                On this dimension, Steinway wins unambiguously, and it's not close.
              </p>
              <p className="text-piano-stone leading-relaxed mb-4">
                Steinway is the most liquid pre-owned piano in the world. There are more buyers,
                more dealers, more technicians who specialize in the instrument, and more price
                transparency than for any other piano brand. A Model B in excellent condition sells
                within weeks at a known market rate. This liquidity matters enormously if your
                circumstances change.
              </p>
              <p className="text-piano-stone leading-relaxed mb-4">
                Bösendorfer resale is more complex. The buyer pool is smaller; the circle of
                technicians qualified to evaluate them is narrower; the market is less transparent.
                A well-priced Bösendorfer 200 in excellent condition will sell — but it may take
                months rather than weeks, and pricing requires more judgment. Certain models (the
                Imperial, the 225) hold value better than smaller models.
              </p>
              <p className="text-piano-stone leading-relaxed mb-4">
                New Bösendorfer pricing has also lagged Steinway's increases. A new Bösendorfer 200
                costs approximately $90,000–$105,000; a new Steinway B is $115,000. The pre-owned
                spread is similar. Neither brand is a poor investment, but Steinway is meaningfully
                safer if resale matters to you.
              </p>
              <div className="bg-piano-black/5 border-l-4 border-piano-gold p-6 my-6">
                <p className="text-piano-stone italic text-lg leading-relaxed font-cormorant font-light">
                  "Buy a Bösendorfer because you love the instrument, not as an investment. Buy a
                  Steinway if financial liquidity matters to you even a little."
                </p>
                <p className="text-sm text-piano-stone mt-3 font-display tracking-wide">— Roger</p>
              </div>
            </section>

            <section id="models" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                Comparable Models
              </h2>
              <p className="text-piano-stone leading-relaxed mb-5">
                Sizing the instruments against each other by approximate length:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-piano-linen">
                      <th className="text-left py-3 pr-6 font-display text-[11px] tracking-[0.45em] uppercase text-piano-stone">
                        Steinway
                      </th>
                      <th className="text-left py-3 pr-6 font-display text-[11px] tracking-[0.45em] uppercase text-piano-stone">
                        Length
                      </th>
                      <th className="text-left py-3 pr-6 font-display text-[11px] tracking-[0.45em] uppercase text-piano-stone">
                        Bösendorfer Equivalent
                      </th>
                      <th className="text-right py-3 font-display text-[11px] tracking-[0.45em] uppercase text-piano-stone">
                        Length
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Model M", "5'7\"", "170", "5'7\""],
                      ["Model A", "6'2\"", "185", "6'1\""],
                      ["Model B", "6'10\"", "200", "6'7\""],
                      ["Model C", "7'5\"", "214", "7'"],
                      ["Model D", "8'11¾\"", "Imperial 290", "9'6\""],
                    ].map(([sm, sl, bm, bl]) => (
                      <tr key={sm} className="border-b border-piano-linen">
                        <td className="py-3 pr-6 font-medium text-piano-black">{sm}</td>
                        <td className="py-3 pr-6 text-piano-stone">{sl}</td>
                        <td className="py-3 pr-6 font-medium text-piano-black">{bm}</td>
                        <td className="py-3 text-right text-piano-stone">{bl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-piano-stone text-xs mt-3">
                Note: The Imperial 290 is the only 9-foot-plus piano in regular production with
                additional bass notes (97 keys vs standard 88). There is no direct Steinway
                equivalent.
              </p>
            </section>

            <section id="our-view" className="mb-14">
              <h2
                className="font-cormorant font-light text-piano-black mb-5"
                style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
              >
                Our Honest Recommendation
              </h2>
              <p className="text-piano-stone leading-relaxed mb-4">
                <strong>Buy a Steinway</strong> if: you play a broad repertoire, you share the
                instrument with students or other players, resale matters to you, you play in larger
                spaces, or you are uncertain. The Steinway is the safer and more versatile choice
                in the vast majority of situations.
              </p>
              <p className="text-piano-stone leading-relaxed mb-4">
                <strong>Buy a Bösendorfer</strong> if: you play primarily German Romantic
                repertoire, you have a dedicated music room with good acoustics, you are willing to
                take the time to adapt to the instrument, and the tonal difference genuinely moves
                you. If you've played both seriously and keep finding yourself reaching for the
                Bösendorfer's sound, trust that instinct — it's the right instrument for you.
              </p>
              <p className="text-piano-stone leading-relaxed mb-4">
                We have clients who own both — a Steinway B for teaching and general use, a
                Bösendorfer 200 for personal practice. For most buyers, that is not the choice.
                The question is simply: which one would make you practice more?
              </p>
              <p className="text-piano-stone leading-relaxed">
                We're happy to arrange for you to play both instruments side by side. That
                comparison, in our experience, usually resolves the question more convincingly than
                any amount of written analysis.
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
                Play Both
              </p>
              <p className="text-piano-stone text-sm leading-relaxed mb-4">
                We can arrange a side-by-side comparison at your convenience.
              </p>
              <Link
                href="/contact"
                className="block text-center bg-piano-black text-piano-cream py-3 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-charcoal transition-colors"
              >
                Schedule a Visit
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <InquiryCTA variant="dark" />
    </main>
  )
}
