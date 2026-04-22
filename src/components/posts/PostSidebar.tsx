'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const gold   = 'hsl(40, 72%, 52%)'
const black  = '#111'
const muted  = '#666'
const line   = 'hsl(36, 20%, 86%)'

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p
    style={{
      fontFamily: '"Syne", sans-serif',
      fontSize: '10px',
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: muted,
      marginBottom: '14px',
    }}
  >
    {children}
  </p>
)

const Divider = () => (
  <div style={{ height: '1px', backgroundColor: line, margin: '1.75rem 0' }} />
)

type Props = {
  title: string
  backHref?: string
  backLabel?: string
}

export const PostSidebar: React.FC<Props> = ({
  title,
  backHref = '/posts',
  backLabel = 'All Posts',
}) => {
  const [progress, setProgress]         = useState(0)
  const [shareUrl, setShareUrl]         = useState('')
  const [copied, setCopied]             = useState(false)
  const [enquireHovered, setEnquireHovered] = useState(false)

  useEffect(() => {
    setShareUrl(window.location.href)

    const onScroll = () => {
      const el    = document.documentElement
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
      className="sticky top-0 flex flex-col"
      style={{
        maxHeight: '100vh',
        overflowY: 'auto',
        padding: '2.5rem 2rem',
        scrollbarWidth: 'none',
      }}
    >
      {/* ── Logo ────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <Link href="/">
          <Image
            src="/UsedSteinway.png"
            alt="UsedSteinways"
            width={80}
            height={87}
            style={{ objectFit: 'contain' }}
            priority
          />
        </Link>
      </div>

      {/* Gold rule */}
      <div style={{ height: '1px', background: `linear-gradient(to right, ${gold}, transparent)`, marginBottom: '2rem' }} />

      {/* ── Reading Progress ────────────────────────────────────── */}
      <Label>Reading Progress</Label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        {/* Bar */}
        <div
          style={{
            flex: 1,
            height: '3px',
            backgroundColor: line,
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              backgroundColor: gold,
              borderRadius: '2px',
              transition: 'width 0.12s ease-out',
            }}
          />
        </div>
        {/* Percentage */}
        <span
          style={{
            fontFamily: '"Syne", sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            color: gold,
            minWidth: '34px',
            textAlign: 'right',
          }}
        >
          {Math.round(progress)}%
        </span>
      </div>

      <Divider />

      {/* ── Navigation ──────────────────────────────────────────── */}
      <Label>Navigation</Label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <Link
          href={backHref}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '17px',
            fontWeight: 400,
            color: black,
            textDecoration: 'none',
            lineHeight: 1.2,
          }}
        >
          <span style={{ color: gold }}>←</span>
          <span>{backLabel}</span>
        </Link>

        <Link
          href="/pianos"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '17px',
            fontWeight: 400,
            color: black,
            textDecoration: 'none',
            lineHeight: 1.2,
          }}
        >
          <span>Browse Pianos</span>
          <span style={{ color: gold }}>→</span>
        </Link>
      </div>

      <Divider />

      {/* ── Share ───────────────────────────────────────────────── */}
      <Label>Share</Label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {/* Copy link */}
        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '17px',
            color: copied ? gold : black,
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'color 0.2s',
          }}
        >
          <span style={{ fontSize: '14px' }}>{copied ? '✓' : '⧉'}</span>
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>

        {/* X / Twitter */}
        {shareUrl && (
          <a
            href={twitterHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '17px',
              color: black,
              textDecoration: 'none',
            }}
          >
            <span style={{ fontFamily: 'sans-serif', fontSize: '13px', fontWeight: 700 }}>𝕏</span>
            <span>Share on X</span>
          </a>
        )}

        {/* Facebook */}
        {shareUrl && (
          <a
            href={facebookHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '17px',
              color: black,
              textDecoration: 'none',
            }}
          >
            <span style={{ fontFamily: 'sans-serif', fontSize: '13px', fontWeight: 700 }}>f</span>
            <span>Share on Facebook</span>
          </a>
        )}
      </div>

      <Divider />

      {/* ── Enquire CTA ─────────────────────────────────────────── */}
      <Link
        href="/pianos"
        onMouseEnter={() => setEnquireHovered(true)}
        onMouseLeave={() => setEnquireHovered(false)}
        style={{
          display: 'block',
          textAlign: 'center',
          padding: '13px 16px',
          border: `1px solid ${gold}`,
          background: enquireHovered ? gold : 'transparent',
          color: enquireHovered ? '#fff' : black,
          fontFamily: '"Syne", sans-serif',
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          transition: 'background 0.2s, color 0.2s',
        }}
      >
        Inquire About a Piano
      </Link>

      {/* Spacer */}
      <div style={{ flex: 1, minHeight: '2rem' }} />

      {/* ── Tagline ─────────────────────────────────────────────── */}
      <p
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: '13px',
          fontStyle: 'italic',
          color: '#999',
          lineHeight: 1.9,
          textAlign: 'center',
        }}
      >
        Fine instruments.<br />Honest counsel.
      </p>
    </aside>
  )
}
