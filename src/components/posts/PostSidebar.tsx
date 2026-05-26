'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

/**
 * Editorial sidebar that lives beside a post (right side in PostPageLayout).
 *
 * Layout contract: the parent slot in PostPageLayout is `group` with
 * `w-16 hover:w-[280px] focus-within:w-[280px]` and `overflow-hidden`.
 * Content here renders at a fixed 280px width; when the parent slot is
 * collapsed (64px) only the LEFT 64px of content is visible. Every row
 * starts with a 64px icon column so icons fill the rail cleanly; labels
 * and secondary UI sit to the right and fade in on hover/focus.
 */

type Props = {
  title: string
  backHref?: string
  backLabel?: string
}

const RAIL = 64 // matches w-16 on the parent slot

const fadeIn =
  'opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100'

const IconBox: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <span
    className={'inline-flex shrink-0 items-center justify-center leading-none ' + className}
    style={{ width: RAIL, height: 28 }}
    aria-hidden
  >
    {children}
  </span>
)

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className={`mb-2 pl-1 font-display text-[10px] tracking-[0.3em] uppercase text-piano-stone ${fadeIn}`}>
    {children}
  </p>
)

const RowLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className={`whitespace-nowrap ${fadeIn}`}>{children}</span>
)

const Divider = () => (
  <div className={`my-5 ml-1 mr-3 h-px bg-piano-linen ${fadeIn}`} />
)

export const PostSidebar: React.FC<Props> = ({
  title,
  backHref = '/posts',
  backLabel = 'All Posts',
}) => {
  const [progress, setProgress] = useState(0)
  const [shareUrl, setShareUrl] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setShareUrl(window.location.href)
    const onScroll = () => {
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? Math.min(100, (el.scrollTop / total) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleCopy = async () => {
    if (!shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {}
  }

  const twitterHref = shareUrl
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`
    : '#'

  const facebookHref = shareUrl
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    : '#'

  return (
    <aside
      className="sticky top-0 flex w-[280px] flex-col py-5 pr-3"
      style={{ maxHeight: '100vh', overflowY: 'auto', scrollbarWidth: 'none' }}
    >
      {/* ── Mark / Logo ────────────────────────────────────────────
          Collapsed: small serif "S" monogram fits cleanly in the rail.
          Expanded: the full Steinway wordmark image appears beside it
          and fades in. */}
      <div className="mb-5 flex items-center">
        {/* Collapsed mark — text "S" fades out as the full logo fades in */}
        <IconBox className="font-cormorant text-[26px] font-light text-piano-gold transition-opacity duration-200 group-hover:opacity-0 group-focus-within:opacity-0">
          <Link href="/" aria-label="UsedSteinways home" className="text-piano-gold no-underline">
            S
          </Link>
        </IconBox>
        {/* Expanded mark — full ornate logo, positioned to overlap the rail
            so the crossfade reads as a single brand element growing in. */}
        <span className={`-ml-12 ${fadeIn}`}>
          <Link href="/" aria-label="UsedSteinways home">
            <Image
              src="/UsedSteinway.png"
              alt="UsedSteinways"
              width={56}
              height={61}
              className="object-contain"
              priority
            />
          </Link>
        </span>
      </div>

      {/* Gold rule — only visible when expanded */}
      <div
        className={`ml-1 mr-3 mb-5 h-px ${fadeIn}`}
        style={{ background: 'linear-gradient(to right, hsl(40 72% 52%), transparent)' }}
      />

      {/* ── Reading Progress ──────────────────────────────────────
          Collapsed: the progress fills a thin vertical-ish rectangle
          across the icon column. Expanded: full horizontal bar + %. */}
      <SectionLabel>Reading</SectionLabel>
      <div className="mb-1 flex items-center" style={{ height: 28 }}>
        <IconBox>
          <div className="h-[3px] w-8 overflow-hidden rounded-sm bg-piano-linen">
            <div
              className="h-full rounded-sm bg-piano-gold transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </IconBox>
        <span
          className={`min-w-[34px] text-left font-display text-[11px] font-semibold text-piano-gold ${fadeIn}`}
        >
          {Math.round(progress)}%
        </span>
      </div>

      <Divider />

      {/* ── Navigation ──────────────────────────────────────────── */}
      <SectionLabel>Navigation</SectionLabel>
      <div className="flex flex-col gap-1">
        <Link
          href={backHref}
          className="flex items-center font-cormorant text-[15px] font-normal text-piano-black no-underline"
          title={backLabel}
        >
          <IconBox className="text-piano-gold text-base">←</IconBox>
          <RowLabel>{backLabel}</RowLabel>
        </Link>

        <Link
          href="/pianos"
          className="flex items-center font-cormorant text-[15px] font-normal text-piano-black no-underline"
          title="Browse Pianos"
        >
          <IconBox className="text-piano-gold text-base">♪</IconBox>
          <RowLabel>Browse Pianos</RowLabel>
        </Link>
      </div>

      <Divider />

      {/* ── Share ───────────────────────────────────────────────── */}
      <SectionLabel>Share</SectionLabel>
      <div className="flex flex-col gap-1">
        <button
          onClick={handleCopy}
          className={
            'flex items-center border-0 bg-transparent p-0 text-left font-cormorant text-[15px] transition-colors cursor-pointer ' +
            (copied ? 'text-piano-gold' : 'text-piano-black')
          }
          title="Copy link"
        >
          <IconBox className="text-[13px]">{copied ? '✓' : '⧉'}</IconBox>
          <RowLabel>{copied ? 'Copied!' : 'Copy Link'}</RowLabel>
        </button>

        {shareUrl && (
          <a
            href={twitterHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center font-cormorant text-[15px] text-piano-black no-underline"
            title="Share on X"
          >
            <IconBox className="text-[13px] font-bold">𝕏</IconBox>
            <RowLabel>Share on X</RowLabel>
          </a>
        )}

        {shareUrl && (
          <a
            href={facebookHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center font-cormorant text-[15px] text-piano-black no-underline"
            title="Share on Facebook"
          >
            <IconBox className="text-[13px] font-bold">f</IconBox>
            <RowLabel>Share on Facebook</RowLabel>
          </a>
        )}
      </div>

      <Divider />

      {/* ── Enquire CTA — pill only visible when expanded ───────── */}
      <Link
        href="/pianos"
        className={`ml-1 mr-3 block border border-piano-gold px-4 py-3 text-center font-display text-[10px] tracking-[0.22em] uppercase text-piano-black no-underline transition-[opacity,background-color,color] duration-200 hover:bg-piano-gold hover:text-piano-cream ${fadeIn}`}
      >
        Inquire About a Piano
      </Link>

      <div className="min-h-6 flex-1" />

      {/* ── Tagline — only when expanded ─────────────────────────── */}
      <p
        className={`ml-1 mr-3 text-center font-cormorant text-[13px] italic leading-[1.7] text-piano-stone ${fadeIn}`}
      >
        Fine instruments.<br />Honest counsel.
      </p>
    </aside>
  )
}
