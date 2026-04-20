import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Greeting } from './Greeting'
import { StatsRow, type StatItem } from './StatsRow'
import { RecentPianos } from './RecentPianos'
import { QuickActions } from './QuickActions'

const COLORS = {
  black: 'hsl(25, 6%, 9%)',
}

export default async function Dashboard() {
  const payload = await getPayload({ config: configPromise })

  // Fetch counts and recent pianos in parallel
  const [pianoCount, brandCount, postCount, testimonialCount, recentPianos] = await Promise.all([
    payload.count({ collection: 'pianos' }),
    payload.count({ collection: 'brands' }),
    payload.count({ collection: 'posts' }),
    payload.count({ collection: 'testimonials' }),
    payload.find({
      collection: 'pianos',
      limit: 6,
      sort: '-createdAt',
      depth: 1,
    }),
  ])

  // Stats config — add or reorder here to extend the dashboard
  const stats: StatItem[] = [
    { label: 'Pianos', value: pianoCount.totalDocs, href: '/admin/collections/pianos' },
    { label: 'Brands', value: brandCount.totalDocs, href: '/admin/collections/brands' },
    { label: 'Posts', value: postCount.totalDocs, href: '/admin/collections/posts' },
    { label: 'Testimonials', value: testimonialCount.totalDocs, href: '/admin/collections/testimonials' },
  ]

  return (
    <div
      style={{
        background: COLORS.black,
        minHeight: '100vh',
        padding: '0',
        // Extend edge-to-edge within the admin content pane
        margin: 'calc(-1 * var(--gutter-h, 24px)) calc(-1 * var(--gutter-h, 24px)) 0',
      }}
    >
      {/* Inner content with consistent gutters */}
      <div style={{ padding: '40px 48px 60px' }}>
        {/* Greeting */}
        <div style={{ marginBottom: '24px' }}>
          <Greeting />
        </div>

        {/* Stats row */}
        <div style={{ marginBottom: '24px' }}>
          <StatsRow stats={stats} />
        </div>

        {/* Main content — two column */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 280px',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <RecentPianos pianos={recentPianos.docs} />
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
