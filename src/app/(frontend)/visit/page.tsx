/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import Link from 'next/link'
import { InquiryCTA } from '@/components/piano/InquiryCTA'

export const metadata: Metadata = {
  title: 'Visit the Showroom | UsedSteinways.com',
  description:
    'Come hear the pianos for yourself. Our New Hampshire showroom is open by appointment and during regular hours. Play before you decide.',
}

export default function VisitPage() {
  return (
    <main className="min-h-screen bg-piano-cream">
      {/* Hero */}
      <section className="bg-piano-black py-28 px-8">
        <div className="max-w-7xl mx-auto">
          <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-5">
            Plan Your Visit
          </p>
          <h1
            className="font-cormorant font-light text-white mb-6"
            style={{ fontSize: 'clamp(3.6rem, 7vw, 8.5rem)' }}
          >
            Come Hear Them Yourself
          </h1>
          <p className="text-piano-cream/70 text-lg max-w-xl leading-relaxed">
            No piano purchase should be made without playing the instrument.
            Our showroom is designed to let you hear each piano at its best.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div className="space-y-10">
            {/* Hours */}
            <div>
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">
                Showroom Hours
              </p>
              <div className="bg-piano-cream border border-piano-linen divide-y divide-piano-linen">
                {[
                  { day: 'Monday – Friday', hours: '10:00 am – 6:00 pm' },
                  { day: 'Saturday', hours: '10:00 am – 4:00 pm' },
                  { day: 'Sunday', hours: 'By appointment' },
                  { day: 'Evening Appointments', hours: 'Available on request' },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between items-center px-6 py-4">
                    <span className="text-piano-stone text-base">{day}</span>
                    <span className="font-medium text-piano-black text-base">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div>
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">
                Location
              </p>
              <div className="bg-piano-black p-6">
                <p className="text-piano-cream leading-relaxed mb-4">
                  123 Concert Hall Drive<br />
                  Concord, New Hampshire 03301
                </p>
                <p className="text-piano-silver text-sm leading-relaxed mb-5">
                  Located in downtown Concord, 10 minutes from I-93. Free parking available
                  in the lot behind the building.
                </p>
                <a
                  href="https://maps.google.com/?q=Concord+NH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-piano-gold text-piano-gold px-6 py-2.5 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-gold/10 transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>

            {/* What to Expect */}
            <div>
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">
                What to Expect
              </p>
              <ul className="space-y-4">
                {[
                  'Play any piano in the collection without pressure or time limits',
                  "Roger is available to discuss each instrument's history and character",
                  'Acoustic environment is carefully designed for honest evaluation',
                  "We'll answer every question directly — including questions about competitors' inventory",
                  "No high-pressure sales. Our reputation depends on you finding the right piano, not just a piano.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-piano-stone">
                    <span className="text-piano-gold mt-1 shrink-0">◆</span>
                    <span className="leading-relaxed text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Travel Info */}
            <div>
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">
                Getting Here
              </p>
              <div className="space-y-4">
                {[
                  {
                    mode: 'By Car',
                    detail:
                      'Take I-93 to Exit 14 (Concord). Follow Main Street north 0.8 miles, then turn right on Concert Hall Drive. We are the third building on the left.',
                  },
                  {
                    mode: 'From Boston',
                    detail:
                      'Approximately 75 minutes via I-93 North. We are worth the drive — many clients travel from Massachusetts, Vermont, and Maine.',
                  },
                  {
                    mode: 'Parking',
                    detail: 'Free off-street parking available directly behind the building. No meters, no time limits.',
                  },
                ].map(({ mode, detail }) => (
                  <div key={mode} className="flex gap-4">
                    <div className="shrink-0 w-24">
                      <span className="font-display text-xs tracking-widest uppercase text-piano-black/50">
                        {mode}
                      </span>
                    </div>
                    <p className="text-piano-stone text-base leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Map + Appointment */}
          <div className="space-y-6">
            <div className="overflow-hidden border border-piano-linen">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46404.94754887869!2d-71.5599!3d43.2081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e2f1aba25b5125%3A0x7af3f5e9a6c9c7f6!2sConcord%2C%20NH!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="UsedSteinways Showroom — Concord, NH"
              />
            </div>

            <div className="bg-piano-cream border border-piano-gold/20 p-8">
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-3">
                Schedule a Visit
              </p>
              <h3 className="font-cormorant font-light text-piano-black text-3xl mb-4">
                Book a Private Appointment
              </h3>
              <p className="text-piano-stone text-base leading-relaxed mb-6">
                For a private session with no other visitors, give us a call or send a message.
                We'll arrange a time that works for you.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+16035550123"
                  className="block text-center bg-piano-black text-piano-cream py-3.5 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-charcoal transition-colors"
                >
                  Call (603) 555-0123
                </a>
                <Link
                  href="/contact?subject=Schedule+Visit"
                  className="block text-center border border-piano-black text-piano-black py-3.5 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-black hover:text-white transition-colors"
                >
                  Send a Message
                </Link>
              </div>
            </div>

            {/* First Visit Tips */}
            <div className="bg-piano-black p-8">
              <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-4">
                Tips for Your Visit
              </p>
              <ul className="space-y-3">
                {[
                  'Bring music you know well — familiar repertoire reveals a piano\'s character most honestly',
                  'Allow at least 90 minutes if you\'re seriously evaluating more than one instrument',
                  'Bring your teacher or accompanist if you\'d like a second opinion',
                  'Tell us in advance if you have a specific instrument you want to try — we\'ll make sure it\'s tuned and ready',
                ].map((tip, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-piano-gold/50 shrink-0 mt-0.5 text-xs">◆</span>
                    <span className="text-piano-silver/80 text-base leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <InquiryCTA variant="dark" />
    </main>
  )
}
