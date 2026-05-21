'use client'

/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.sr, .sr-left, .sr-right, .sr-fade')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export function AboutPageContent() {
  useScrollReveal()

  return (
    <main className="min-h-screen bg-piano-cream">

      {/* ── 1. HERO — burgundy ──────────────────────────────────────── */}
      <section
        className="relative bg-piano-burgundy overflow-hidden flex flex-col justify-end"
        style={{ minHeight: '82vh' }}
      >
        {/* Background image — Roger's Piano showroom */}
        <div className="absolute inset-0">
          <Image
            src="/api/media/file/IMG_8831.JPG"
            alt="Roger's Piano showroom"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </div>
        {/* Gradient — heavy at bottom where text lives, lighter at top */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(4,1,1,0.98) 0%, rgba(55,8,18,0.92) 55%, rgba(55,8,18,0.60) 100%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto w-full px-8 md:px-16 pb-20 md:pb-28">
          {/* Eyebrow */}
          <div className="sr sr-d1 flex items-center gap-5 mb-8">
            <div className="h-px w-8 bg-piano-gold/50 shrink-0" />
            <p className="font-display text-[11px] tracking-[0.55em] uppercase text-piano-gold/80">
              Since 1980 — New England
            </p>
          </div>
          {/* Headline — two controlled lines */}
          <h1
            className="sr sr-d2 font-cormorant font-light text-piano-cream leading-[1.0] mb-8"
            style={{ fontSize: 'clamp(3rem, 5.2vw, 6.5rem)', maxWidth: '18ch' }}
          >
            New England's{' '}
            <span className="italic text-piano-gold/90">Destination</span>
            <br />
            for Rebuilt Steinway Excellence.
          </h1>
          {/* Subtext + divider */}
          <div className="sr sr-d3 flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-12">
            <p
              className="text-piano-cream/55 leading-relaxed font-light"
              style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', maxWidth: '44ch' }}
            >
              For over 40 years, a trusted source for fine pianos — specializing in the rebuilding
              and restoration of vintage Steinway &amp; Sons instruments.
            </p>
            <div className="flex items-center gap-4 shrink-0 pb-1">
              <div className="h-px w-10 bg-piano-gold/30" />
              <span className="font-display text-[9px] tracking-[0.55em] uppercase text-piano-gold/40">
                Est. 1980
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FOUNDING STORY — cream ───────────────────────────────── */}
      <section className="py-28 md:py-36 px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text */}
          <div>
            <p className="sr font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-5">
              Our Story
            </p>
            <h2
              className="sr sr-d1 font-cormorant font-light text-piano-black leading-snug mb-10"
              style={{ fontSize: 'clamp(2.8rem, 4.5vw, 5.2rem)' }}
            >
              More than a showroom.
              <br />
              <span className="italic">A full-service piano center.</span>
            </h2>
            <div className="space-y-6 text-piano-stone">
              <p className="sr sr-d2 text-[1.0625rem] leading-[1.85]">
                Founded in 1980 by master technician Roger Shaffer, Roger's Piano quickly earned
                a reputation for meticulous Steinway rebuilding and deep technical expertise. What
                began as a singular commitment to craftsmanship has grown into New England's most
                trusted destination for fine pianos.
              </p>
              <p className="sr sr-d3 text-[1.0625rem] leading-[1.85]">
                That tradition continues today. Partner Carol Wu brings pianistic insight and
                exceptional customer care — guiding customers to instruments that best match their
                musical needs and long-term goals.
              </p>
              <p className="sr sr-d4 text-[1.0625rem] leading-[1.85]">
                Today, Roger's Piano operates two showrooms and provides comprehensive services:
                tuning, maintenance, full restorations, player-piano system installations, and a
                rental program for those beginning their musical journey.
              </p>
            </div>
          </div>

          {/* Image + stat */}
          <div className="sr-right relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-piano-charcoal">
              <Image
                src="/api/media/file/IMG_8832.JPG"
                alt="Roger's Piano showroom"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. RESTORATION PHILOSOPHY — charcoal ────────────────────── */}
      <section className="bg-piano-charcoal py-28 md:py-36 px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Editorial statement — left */}
          <div className="sr-left order-2 lg:order-1">
            <div className="relative border-l-2 border-piano-gold/50 pl-10 py-4">
              <p
                className="font-cormorant font-light italic text-piano-cream leading-[1.25]"
                style={{ fontSize: 'clamp(2.6rem, 4.2vw, 4.4rem)' }}
              >
                Authenticity over replacement — preserving what makes a great Steinway
                <em className="not-italic text-piano-gold"> great.</em>
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px w-8 bg-piano-gold/50" />
                <span className="font-display text-[10px] tracking-[0.45em] uppercase text-piano-silver/70">
                  Restoration Philosophy
                </span>
              </div>
            </div>
          </div>

          {/* Prose — right */}
          <div className="order-1 lg:order-2">
            <p className="sr font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-5">
              Our Philosophy
            </p>
            <h2
              className="sr sr-d1 font-cormorant font-light text-piano-cream leading-snug mb-8"
              style={{ fontSize: 'clamp(2.8rem, 4.5vw, 5.2rem)' }}
            >
              Where Heritage
              <br />
              Meets Craftsmanship
            </h2>
            <div className="space-y-5 text-piano-cream/85">
              <p className="sr sr-d2 text-[1.125rem] leading-[1.85]">
                Our rebuilt Steinway pianos offer a compelling alternative to buying new —
                delivering legendary performance and prestige at significantly greater value.
              </p>
              <p className="sr sr-d3 text-[1.125rem] leading-[1.85]">
                We follow a restoration philosophy that emphasizes authenticity over replacement,
                preserving original components whenever possible to retain the tonal character
                and musical maturity that define classic Steinways.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. VALUE PROPOSITION — burgundy ────────────────────────── */}
      <section className="bg-piano-burgundy py-28 md:py-36 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="mb-20">
            <div className="sr flex items-center gap-5 mb-6">
              <div className="h-px w-8 bg-piano-gold/50 shrink-0" />
              <p className="font-display text-[11px] tracking-[0.5em] uppercase text-piano-gold/70">
                The Value Proposition
              </p>
            </div>
            <h2
              className="sr sr-d1 font-cormorant font-light text-piano-cream leading-[0.95]"
              style={{ fontSize: 'clamp(3rem, 5.5vw, 6rem)' }}
            >
              A Smarter Way
              <br />
              <span className="italic">to Own a Steinway.</span>
            </h2>
          </div>

          {/* Three columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-piano-gold/15">

            {[
              {
                num: '01',
                title: 'Luxury\nWithin Reach',
                body: 'Exceptional value compared to new instruments.',
              },
              {
                num: '02',
                title: 'Proven\nMusical Maturity',
                body: 'Richer tone and more responsive touch.',
              },
              {
                num: '03',
                title: 'Sustainable\nChoice',
                body: 'Extending the life of a world-class piano.',
              },
            ].map(({ num, title, body }, i) => (
              <div
                key={num}
                className={`sr sr-d${i + 1} py-10 lg:py-0 ${i === 0 ? 'lg:pr-14' : i === 1 ? 'lg:px-14' : 'lg:pl-14'}`}
              >
                {/* Number */}
                <p className="font-display text-[10px] tracking-[0.5em] uppercase text-piano-gold/50 mb-6">
                  {num}
                </p>
                {/* Rule */}
                <div className="h-px w-10 bg-piano-gold/30 mb-6" />
                {/* Title */}
                <h3
                  className="font-cormorant font-light text-piano-cream mb-6 leading-[1.1]"
                  style={{ fontSize: 'clamp(1.9rem, 2.4vw, 2.5rem)', whiteSpace: 'pre-line' }}
                >
                  {title}
                </h3>
                {/* Body */}
                <p className="text-piano-silver/85 text-[1rem] leading-[1.85]">{body}</p>
              </div>
            ))}

          </div>

          {/* Closing line from brief */}
          <p className="sr mt-14 text-piano-silver/75 text-[1rem] leading-[1.85]" style={{ maxWidth: '60ch' }}>
            We are not just a retailer, but a strategic partner in piano ownership — helping
            customers make informed, long-term investments in music.
          </p>

        </div>
      </section>

      {/* ── 5. EXPERT REBUILDING — cream ───────────────────────────── */}
      <section className="py-28 md:py-36 px-8 bg-piano-cream border-t border-piano-linen">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — text */}
          <div>
            <p className="sr font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-5">
              The Process
            </p>
            <h2
              className="sr sr-d1 font-cormorant font-light text-piano-black leading-snug mb-10"
              style={{ fontSize: 'clamp(2.8rem, 4.5vw, 5.2rem)' }}
            >
              Expert Rebuilding,
              <br />
              <span className="italic">Global Craftsmanship</span>
            </h2>
            <div className="space-y-6 text-piano-stone">
              <p className="sr sr-d2 text-[1.0625rem] leading-[1.85]">
                Roger's Piano may collaborate with highly skilled restoration specialists worldwide —
                known for their precision and respect for traditional methods.
              </p>
              <p className="sr sr-d3 text-[1.0625rem] leading-[1.85]">
                Whether it's a classic Model A grand or a vintage upright, each rebuilt Steinway
                undergoes a meticulous process designed to bring it back to life — visually,
                structurally, and musically.
              </p>
            </div>
          </div>

          {/* Right — feature list */}
          <div className="sr-right space-y-0 lg:pt-24">
            {[
              {
                label: 'Performance',
                detail: 'Meets or exceeds performance expectations.',
              },
              {
                label: 'Design Integrity',
                detail: 'Retains the design integrity of the original build.',
              },
              {
                label: 'Concert Quality',
                detail: 'Delivers a refined, concert-quality playing experience.',
              },
            ].map(({ label, detail }) => (
              <div
                key={label}
                className="border-t border-piano-linen py-8 last:border-b group"
              >
                <div className="flex items-start gap-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-piano-gold mt-2.5 shrink-0" />
                  <div>
                    <p className="font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-2">
                      {label}
                    </p>
                    <p className="text-piano-stone text-[1rem] leading-[1.8]">{detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. BEYOND SALES / SERVICES — charcoal ──────────────────── */}
      <section className="py-28 md:py-36 px-8 bg-piano-charcoal">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-20 max-w-2xl">
            <p className="sr font-display text-[11px] tracking-[0.45em] uppercase text-piano-gold mb-5">
              A Lifetime Resource
            </p>
            <h2
              className="sr sr-d1 font-cormorant font-light text-piano-cream leading-snug mb-6"
              style={{ fontSize: 'clamp(2.8rem, 4.5vw, 5.2rem)' }}
            >
              Beyond the Sale
            </h2>
            <p className="sr sr-d2 text-piano-silver/85 text-[1.0625rem] leading-[1.85]">
              What truly differentiates Roger's Piano is our long-term commitment to customers.
              This end-to-end capability ensures that every piano continues to perform at its
              best for years to come.
            </p>
          </div>

          {/* Service cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-piano-gold/10">
            {[
              {
                service: 'Tuning &\nMaintenance',
                detail: 'Precision tuning and ongoing maintenance.',
              },
              {
                service: 'Full\nRestorations',
                detail: 'Full restorations and rebuilding.',
              },
              {
                service: 'Player Piano\nSystems',
                detail: 'Player-piano system installations.',
              },
              {
                service: 'Piano\nRentals',
                detail: 'Piano rentals for beginners and institutions.',
              },
            ].map(({ service, detail }, i) => (
              <div
                key={service}
                className={`sr sr-d${i + 1} bg-piano-black px-8 py-10 border-t-2 border-t-piano-gold/0 hover:border-t-piano-gold/40 transition-colors duration-500`}
              >
                <h3
                  className="font-cormorant font-light text-piano-cream mb-5 leading-[1.1]"
                  style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)', whiteSpace: 'pre-line' }}
                >
                  {service}
                </h3>
                <div className="h-px w-8 bg-piano-gold/30 mb-5" />
                <p className="text-piano-silver/85 text-[0.9375rem] leading-[1.85]">{detail}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 7. PROMISE / CTA — burgundy ────────────────────────────── */}
      <section className="py-28 md:py-36 px-8 bg-piano-burgundy border-t border-piano-gold/10">
        <div className="max-w-4xl mx-auto">

          {/* Decorative top rule */}
          <div className="sr flex items-center gap-6 mb-16">
            <div className="h-px flex-1 bg-piano-gold/15" />
            <p className="font-display text-[10px] tracking-[0.55em] uppercase text-piano-gold/50">
              Our Promise
            </p>
            <div className="h-px flex-1 bg-piano-gold/15" />
          </div>

          {/* Main quote */}
          <blockquote className="mb-12">
            <p
              className="sr sr-d1 font-cormorant font-light text-piano-cream leading-[1.08] mb-8"
              style={{ fontSize: 'clamp(2.6rem, 5vw, 5.5rem)' }}
            >
              "Authentic craftsmanship, enduring value, and a deeper connection to the
              instrument's{' '}
              <em className="italic text-piano-gold/80">legacy.</em>"
            </p>
          </blockquote>

          {/* Supporting text */}
          <p className="sr sr-d2 text-piano-cream/50 text-[1.0625rem] leading-[1.85] mb-14" style={{ maxWidth: '54ch' }}>
            Roger's Piano has earned its reputation as New England's authority on rebuilt
            Steinway pianos by combining decades of experience with a clear philosophy:
            preserve what makes great instruments exceptional.
          </p>

          {/* CTAs */}
          <div className="sr sr-d3 flex flex-col sm:flex-row gap-4">
            <Link
              href="/pianos"
              className="inline-block bg-piano-cream text-piano-burgundy px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-gold hover:text-piano-black transition-colors duration-300"
            >
              Browse the Collection
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-piano-gold/50 text-piano-gold px-10 py-4 font-display text-[11px] tracking-[0.3em] uppercase hover:bg-piano-gold/10 hover:border-piano-gold transition-colors duration-300"
            >
              Get in Touch
            </Link>
          </div>

        </div>
      </section>

    </main>
  )
}
