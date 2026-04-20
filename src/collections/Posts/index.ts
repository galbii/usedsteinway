import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { ExpertBlock } from '../../blocks/Expert/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { imageField } from '../../lib/payload/fields/media'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    tags: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'posts',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'posts',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        // ── Content tab — hero image + layout builder ────────────────
        {
          label: 'Content',
          fields: [
            // Fixed: uses imageField() so the media manager button appears
            imageField('heroImage', {
              label: 'Hero Image',
              admin: {
                description: 'Featured image shown at the top of the post (recommended: 1600×900px)',
              },
            }),
            // Layout builder — composable blocks rendered on the post page.
            // To add a new block type: create src/blocks/YourBlock/config.ts,
            // import it here, add it to the blocks array, add the component
            // to RenderBlocks.tsx.
            {
              name: 'layout',
              type: 'blocks',
              label: 'Page Layout',
              // Every new post starts with an Expert Insight block pre-loaded.
              defaultValue: [
                {
                  blockType: 'expert',
                  quote: '',
                  expertName: 'Roger',
                  expertRole: 'Registered Piano Technician · 30 Years',
                  style: 'pullquote',
                },
              ],
              blocks: [
                ExpertBlock,   // Expert quote / profile card
                Content,       // Rich-text columns
                MediaBlock,    // Single media embed
                Banner,        // Info / warning / success callout
                CallToAction,  // CTA with links
              ],
              admin: {
                description:
                  'Build the post body by adding, reordering, and configuring blocks. ' +
                  'Each block type has its own fields and renders independently.',
                initCollapsed: false,
              },
            },
          ],
        },

        // ── Meta tab — categorisation, flags, tags ───────────────────
        {
          label: 'Meta',
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              admin: { position: 'sidebar' },
              filterOptions: ({ id }) => ({ id: { not_in: [id] } }),
              hasMany: true,
              relationTo: 'posts',
            },
            {
              name: 'categories',
              type: 'relationship',
              admin: { position: 'sidebar' },
              hasMany: true,
              relationTo: 'categories',
            },
            {
              name: 'isNews',
              type: 'checkbox',
              label: 'News',
              defaultValue: false,
              admin: {
                position: 'sidebar',
                description: 'Mark this post as a News item',
              },
            },
            {
              name: 'isGuide',
              type: 'checkbox',
              label: 'Guide',
              defaultValue: false,
              admin: {
                position: 'sidebar',
                description: 'Mark this post as a Guide',
              },
            },
            {
              name: 'tags',
              type: 'array',
              admin: { position: 'sidebar', initCollapsed: true },
              fields: [
                { name: 'tag', type: 'text', required: true },
              ],
              labels: { singular: 'Tag', plural: 'Tags' },
            },
          ],
        },

        // ── SEO tab ──────────────────────────────────────────────────
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },

    // ── Sidebar fields ───────────────────────────────────────────────
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: { position: 'sidebar' },
      hasMany: true,
      relationTo: 'users',
    },
    {
      name: 'populatedAuthors',
      type: 'array',
      access: { update: () => false },
      admin: { disabled: true, readOnly: true },
      fields: [
        { name: 'id', type: 'text' },
        { name: 'name', type: 'text' },
      ],
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: { interval: 100 },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
