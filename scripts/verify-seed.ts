/**
 * Verify the seeded Home and About pages exist and report their block layout.
 * Uses top-level await so `payload run` waits for completion.
 *
 *   bun run verify:seed
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

const slugs = ['home', 'about', 'financing', 'visit', 'sell-your-piano', 'testimonials']
for (const slug of slugs) {
  const res = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    pagination: false,
    depth: 0,
  })
  const doc = res.docs[0]
  if (doc) {
    console.log(
      `[${slug}] id=${doc.id} status=${doc._status} blocks=${doc.layout?.length ?? 0} → ${(doc.layout ?? []).map((b) => b.blockType).join(', ')}`,
    )
  } else {
    console.log(`[${slug}] NOT FOUND`)
  }
}

process.exit(0)
