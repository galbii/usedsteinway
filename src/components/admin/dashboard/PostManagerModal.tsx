'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const COLORS = {
  black: 'hsl(25, 6%, 9%)',
  charcoal: 'hsl(25, 5%, 14%)',
  charcoalHover: 'hsl(25, 5%, 18%)',
  gold: 'hsl(40, 72%, 52%)',
  goldBorder: 'rgba(184, 134, 57, 0.18)',
  goldFaint: 'rgba(184, 134, 57, 0.07)',
  goldMuted: 'rgba(184, 134, 57, 0.45)',
  cream: 'hsl(36, 18%, 97%)',
  silver: 'hsl(25, 4%, 58%)',
  published: 'hsl(142, 50%, 45%)',
  publishedFaint: 'rgba(46, 160, 67, 0.12)',
  draft: 'hsl(35, 70%, 55%)',
  draftFaint: 'rgba(204, 130, 50, 0.12)',
}

const STYLES = `
  @keyframes usw-psm-shimmer {
    0% { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  .usw-psm-skeleton {
    background: linear-gradient(
      90deg,
      rgba(255,255,255,0.04) 25%,
      rgba(255,255,255,0.09) 50%,
      rgba(255,255,255,0.04) 75%
    );
    background-size: 800px 100%;
    animation: usw-psm-shimmer 1.6s infinite linear;
    border-radius: 3px;
  }
  .usw-psm-row {
    display: flex;
    align-items: center;
    padding: 14px 32px 14px 32px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: background 0.12s;
    cursor: default;
  }
  .usw-psm-row:last-child {
    border-bottom: none;
  }
  .usw-psm-row:hover {
    background: hsl(25, 5%, 17%);
  }
  .usw-psm-edit-link {
    color: ${COLORS.silver};
    text-decoration: none;
    font-size: 13px;
    letter-spacing: 0.06em;
    white-space: nowrap;
    flex-shrink: 0;
    transition: color 0.15s;
  }
  .usw-psm-edit-link:hover {
    color: ${COLORS.gold};
  }
  .usw-psm-filter-btn {
    background: none;
    border: 1px solid transparent;
    border-radius: 3px;
    padding: 5px 12px;
    font-size: 12px;
    letter-spacing: 0.08em;
    cursor: pointer;
    color: ${COLORS.silver};
    transition: color 0.15s, border-color 0.15s, background 0.15s;
    font-family: inherit;
  }
  .usw-psm-filter-btn:hover {
    color: ${COLORS.cream};
    border-color: ${COLORS.goldBorder};
  }
  .usw-psm-filter-btn.active {
    color: ${COLORS.gold};
    border-color: ${COLORS.goldMuted};
    background: ${COLORS.goldFaint};
  }
  .usw-psm-type-btn {
    background: none;
    border: 1px solid transparent;
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 11px;
    letter-spacing: 0.1em;
    cursor: pointer;
    color: ${COLORS.silver};
    transition: color 0.15s, border-color 0.15s, background 0.15s;
    font-family: inherit;
  }
  .usw-psm-type-btn:hover {
    color: ${COLORS.cream};
    border-color: ${COLORS.goldBorder};
  }
  .usw-psm-type-btn.active {
    color: ${COLORS.gold};
    border-color: ${COLORS.goldMuted};
    background: ${COLORS.goldFaint};
  }
  .usw-psm-search {
    background: ${COLORS.black};
    border: 1px solid ${COLORS.goldBorder};
    border-radius: 3px;
    padding: 5px 12px;
    font-size: 12px;
    color: ${COLORS.cream};
    font-family: inherit;
    outline: none;
    flex: 1;
    max-width: 180px;
    transition: border-color 0.15s;
  }
  .usw-psm-search::placeholder {
    color: ${COLORS.silver};
  }
  .usw-psm-search:focus {
    border-color: ${COLORS.goldMuted};
  }
  .usw-psm-sort-select {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 3px;
    color: ${COLORS.silver};
    font-family: inherit;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
    cursor: pointer;
  }
  .usw-psm-new-btn {
    background: rgba(184, 134, 57, 0.12);
    border: 1px solid rgba(184, 134, 57, 0.4);
    border-radius: 3px;
    padding: 9px 20px;
    font-size: 13px;
    letter-spacing: 0.1em;
    color: ${COLORS.gold};
    font-family: inherit;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: background 0.15s, border-color 0.15s;
  }
  .usw-psm-new-btn:hover {
    background: rgba(184, 134, 57, 0.2);
    border-color: rgba(184, 134, 57, 0.6);
  }
  .usw-psm-scroll::-webkit-scrollbar {
    width: 6px;
  }
  .usw-psm-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  .usw-psm-scroll::-webkit-scrollbar-thumb {
    background: ${COLORS.goldBorder};
    border-radius: 3px;
  }
`

interface Post {
  id: string
  title: string
  _status?: 'published' | 'draft' | null
  publishedAt?: string | null
  updatedAt: string
  categories?: (string | { id: string; title?: string | null })[] | null
  isNews?: boolean | null
  isGuide?: boolean | null
  tags?: { tag: string; id?: string | null }[] | null
}

interface PostManagerModalProps {
  open: boolean
  onClose: () => void
}

type StatusFilter = 'all' | 'published' | 'draft'
type TypeFilter = 'all' | 'news' | 'guide'

function statBadge(type: 'published' | 'draft'): React.CSSProperties {
  const isPublished = type === 'published'
  return {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 10,
    fontSize: 12,
    letterSpacing: '0.06em',
    background: isPublished ? COLORS.publishedFaint : COLORS.draftFaint,
    color: isPublished ? COLORS.published : COLORS.draft,
    border: `1px solid ${isPublished ? 'rgba(46,160,67,0.25)' : 'rgba(204,130,50,0.25)'}`,
  }
}

export function PostManagerModal({ open, onClose }: PostManagerModalProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest')

  // Inject styles once
  useEffect(() => {
    if (!document.getElementById('usw-psm-styles')) {
      const el = document.createElement('style')
      el.id = 'usw-psm-styles'
      el.textContent = STYLES
      document.head.appendChild(el)
    }
  }, [])

  // ESC to close
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Fetch posts when opened
  useEffect(() => {
    if (!open) return
    let cancelled = false

    async function fetchPosts() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/posts?limit=100&depth=1&sort=-updatedAt&draft=true')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (!cancelled) {
          setPosts(data.docs ?? [])
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load posts.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchPosts()
    return () => {
      cancelled = true
    }
  }, [open])

  if (!open) return null

  const totalPublished = posts.filter((p) => p._status === 'published').length
  const totalDraft = posts.filter((p) => p._status !== 'published').length

  // Filter logic
  const filtered = posts.filter((post) => {
    if (statusFilter === 'published' && post._status !== 'published') return false
    if (statusFilter === 'draft' && post._status !== 'draft') return false
    if (typeFilter === 'news' && !post.isNews) return false
    if (typeFilter === 'guide' && !post.isGuide) return false
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      if (!post.title.toLowerCase().includes(q)) return false
    }
    return true
  })

  // Sort logic
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'oldest')
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    if (sortBy === 'title') return a.title.localeCompare(b.title)
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(9, 8, 7, 0.82)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Panel */}
      <div
        style={{
          position: 'relative',
          width: 'min(860px, 96vw)',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          background: COLORS.charcoal,
          border: `1px solid ${COLORS.goldBorder}`,
          borderRadius: 4,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '28px 32px 20px',
            borderBottom: `1px solid ${COLORS.goldBorder}`,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'inherit',
                fontSize: 17,
                fontWeight: 600,
                color: COLORS.cream,
                lineHeight: 1.2,
                letterSpacing: '0.01em',
              }}
            >
              Post Manager
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: 13,
                color: COLORS.silver,
                fontFamily: 'inherit',
              }}
            >
              Manage blog content
            </div>
            {/* Live stats bar */}
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <span style={statBadge('published')}>
                {loading ? 0 : totalPublished} published
              </span>
              <span style={statBadge('draft')}>
                {loading ? 0 : totalDraft} drafts
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: COLORS.silver,
              fontSize: 20,
              lineHeight: 1,
              padding: '2px 4px',
              marginTop: -2,
              fontFamily: 'inherit',
              transition: 'color 0.15s',
            }}
            aria-label="Close"
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = COLORS.cream)}
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = COLORS.silver)
            }
          >
            ×
          </button>
        </div>

        {/* Toolbar */}
        <div
          style={{
            flexShrink: 0,
            padding: '12px 32px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            flexWrap: 'wrap',
          }}
        >
          {/* Status filter tabs */}
          <div style={{ display: 'flex', gap: 4 }}>
            {(['all', 'published', 'draft'] as StatusFilter[]).map((f) => (
              <button
                key={f}
                type="button"
                className={`usw-psm-filter-btn${statusFilter === f ? ' active' : ''}`}
                onClick={() => setStatusFilter(f)}
              >
                {f === 'all' ? 'All' : f === 'published' ? 'Published' : 'Drafts'}
              </button>
            ))}
          </div>

          {/* Separator */}
          <div
            style={{
              width: 1,
              height: 16,
              background: 'rgba(255,255,255,0.12)',
              flexShrink: 0,
            }}
          />

          {/* Type filter pills */}
          <div style={{ display: 'flex', gap: 4 }}>
            {(['all', 'news', 'guide'] as TypeFilter[]).map((f) => (
              <button
                key={f}
                type="button"
                className={`usw-psm-type-btn${typeFilter === f ? ' active' : ''}`}
                onClick={() => setTypeFilter(f)}
              >
                {f === 'all' ? 'All Types' : f === 'news' ? 'News' : 'Guides'}
              </button>
            ))}
          </div>

          {/* Sort select */}
          <select
            className="usw-psm-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'title')}
          >
            <option value="newest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title A–Z</option>
          </select>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Search */}
          <input
            className="usw-psm-search"
            type="text"
            placeholder="Search posts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Scrollable post list */}
        <div
          className="usw-psm-scroll"
          style={{
            flex: 1,
            overflowY: 'auto',
          }}
        >
          {/* Loading skeletons */}
          {loading && (
            <>
              {[0, 1, 2].map((i) => (
                <div key={i} className="usw-psm-row" style={{ gap: 0 }}>
                  {/* Date column skeleton */}
                  <div
                    style={{
                      width: 72,
                      flexShrink: 0,
                      textAlign: 'right',
                      paddingRight: 16,
                      borderRight: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: 5,
                    }}
                  >
                    <div className="usw-psm-skeleton" style={{ width: 32, height: 14 }} />
                    <div className="usw-psm-skeleton" style={{ width: 20, height: 10 }} />
                  </div>
                  {/* Content skeleton */}
                  <div
                    style={{
                      flex: 1,
                      padding: '0 20px 0 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 7,
                    }}
                  >
                    <div className="usw-psm-skeleton" style={{ width: '60%', height: 16 }} />
                    <div className="usw-psm-skeleton" style={{ width: '40%', height: 12 }} />
                  </div>
                  {/* Edit link skeleton */}
                  <div className="usw-psm-skeleton" style={{ width: 36, height: 12, flexShrink: 0 }} />
                </div>
              ))}
            </>
          )}

          {!loading && error && (
            <div
              style={{
                minHeight: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: COLORS.silver,
                fontSize: 14,
                fontStyle: 'italic',
              }}
            >
              {error}
            </div>
          )}

          {!loading && !error && sorted.length === 0 && (
            <div
              style={{
                minHeight: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: COLORS.silver,
                fontSize: 14,
                fontStyle: 'italic',
              }}
            >
              No posts match the current filters.
            </div>
          )}

          {!loading &&
            !error &&
            sorted.map((post) => {
              const isPublished = post._status === 'published'

              // Date breakdown
              const d = new Date(post.updatedAt)
              const month = d.toLocaleDateString('en-US', { month: 'short' })
              const day = String(d.getDate())

              // Resolve category titles
              const categoryLabels = (post.categories ?? [])
                .map((c) => (typeof c === 'object' && c !== null ? c.title ?? null : null))
                .filter((t): t is string => Boolean(t))

              return (
                <div key={post.id} className="usw-psm-row" style={{ gap: 0 }}>
                  {/* Date column */}
                  <div
                    style={{
                      width: 72,
                      flexShrink: 0,
                      textAlign: 'right',
                      paddingRight: 16,
                      borderRight: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontFamily: 'inherit',
                        fontWeight: 600,
                        color: COLORS.gold,
                        lineHeight: 1,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {month}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: COLORS.silver,
                        letterSpacing: '0.06em',
                        marginTop: 2,
                      }}
                    >
                      {day}
                    </div>
                  </div>

                  {/* Main content */}
                  <div
                    style={{
                      flex: 1,
                      padding: '0 20px 0 16px',
                      minWidth: 0,
                    }}
                  >
                    {/* Top line: status badge + title */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 5,
                      }}
                    >
                      {/* Status badge */}
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 7px',
                          borderRadius: 10,
                          fontSize: 10,
                          fontWeight: 600,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase' as const,
                          background: isPublished ? COLORS.publishedFaint : COLORS.draftFaint,
                          color: isPublished ? COLORS.published : COLORS.draft,
                          border: `1px solid ${isPublished ? 'rgba(46,160,67,0.25)' : 'rgba(204,130,50,0.25)'}`,
                          flexShrink: 0,
                        }}
                      >
                        {isPublished ? 'Published' : 'Draft'}
                      </span>

                      {/* Title */}
                      <span
                        style={{
                          fontFamily: 'inherit',
                          fontSize: 14,
                          color: COLORS.cream,
                          fontWeight: 500,
                          lineHeight: 1.2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap' as const,
                          minWidth: 0,
                          flex: 1,
                        }}
                      >
                        {post.title}
                      </span>
                    </div>

                    {/* Second line: categories + type pills */}
                    {(categoryLabels.length > 0 || post.isNews || post.isGuide) && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          flexWrap: 'wrap' as const,
                        }}
                      >
                        {categoryLabels.length > 0 && (
                          <span
                            style={{
                              fontSize: 12,
                              color: COLORS.silver,
                              letterSpacing: '0.04em',
                            }}
                          >
                            {categoryLabels.join(' · ')}
                          </span>
                        )}
                        {post.isNews && (
                          <span
                            style={{
                              padding: '1px 6px',
                              borderRadius: 8,
                              fontSize: 10,
                              background: COLORS.goldFaint,
                              color: COLORS.gold,
                              border: `1px solid ${COLORS.goldBorder}`,
                            }}
                          >
                            News
                          </span>
                        )}
                        {post.isGuide && (
                          <span
                            style={{
                              padding: '1px 6px',
                              borderRadius: 8,
                              fontSize: 10,
                              background: COLORS.goldFaint,
                              color: COLORS.gold,
                              border: `1px solid ${COLORS.goldBorder}`,
                            }}
                          >
                            Guide
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Edit link */}
                  <a
                    href={`/admin/collections/posts/${post.id}`}
                    className="usw-psm-edit-link"
                    onClick={onClose}
                  >
                    Edit →
                  </a>
                </div>
              )
            })}
        </div>

        {/* Footer */}
        <div
          style={{
            flexShrink: 0,
            padding: '16px 32px',
            borderTop: `1px solid ${COLORS.goldBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: COLORS.silver,
              fontFamily: 'inherit',
            }}
          >
            {posts.length} posts total · {totalPublished} published · {totalDraft} draft
            {totalDraft !== 1 ? 's' : ''}
          </span>
          <Link
            href="/admin/collections/posts/create"
            className="usw-psm-new-btn"
            onClick={onClose}
          >
            + New Post
          </Link>
        </div>
      </div>
    </div>
  )
}
