import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { slugField } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { mediaArrayField } from '@/lib/payload/fields/media'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { revalidatePiano, revalidateDelete } from './hooks/revalidatePiano'

export const Pianos: CollectionConfig<'pianos'> = {
  slug: 'pianos',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    brand: true,
    condition: true,
    price: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'brand', 'condition', 'price', 'isAvailable', 'updatedAt'],
    description: 'Individual piano listings available for sale.',
    components: {
      beforeList: ['@/collections/Pianos/SeedButton#SeedButton'],
    },
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pianos',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pianos',
        req,
      }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "2015 Steinway Model B — Satin Ebony"',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            // Identification
            {
              type: 'row',
              fields: [
                {
                  name: 'brand',
                  type: 'relationship',
                  relationTo: 'brands',
                  required: true,
                  admin: { width: '50%' },
                },
                {
                  name: 'model',
                  type: 'text',
                  label: 'Model',
                  admin: {
                    description: 'e.g. "Model B"',
                    width: '50%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'year',
                  type: 'number',
                  label: 'Year',
                  admin: {
                    description: 'Manufacturing year',
                    width: '33%',
                  },
                },
                {
                  name: 'serialNumber',
                  type: 'text',
                  label: 'Serial Number',
                  admin: { width: '33%' },
                },
                {
                  name: 'finish',
                  type: 'text',
                  label: 'Finish',
                  admin: {
                    description: 'e.g. "Satin Ebony"',
                    width: '33%',
                  },
                },
              ],
            },

            // Specifications
            {
              name: 'specifications',
              type: 'group',
              label: 'Specifications',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'size',
                      type: 'text',
                      label: 'Size',
                      admin: {
                        description: "e.g. \"6'10\" (211 cm)\"",
                        width: '50%',
                      },
                    },
                    {
                      name: 'length',
                      type: 'text',
                      label: 'Length',
                      admin: {
                        description: "e.g. \"6'10\"\"",
                        width: '50%',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'width',
                      type: 'text',
                      label: 'Width',
                      admin: {
                        description: 'e.g. "58"',
                        width: '33%',
                      },
                    },
                    {
                      name: 'stringLength',
                      type: 'text',
                      label: 'String Length',
                      admin: { width: '33%' },
                    },
                    {
                      name: 'keys',
                      type: 'number',
                      label: 'Keys',
                      defaultValue: 88,
                      admin: { width: '16%' },
                    },
                  ],
                },
              ],
            },

            // Pricing
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  type: 'number',
                  label: 'Asking Price (USD)',
                  required: true,
                  admin: {
                    description: 'e.g. 89500',
                    width: '50%',
                  },
                },
                {
                  name: 'retailPrice',
                  type: 'number',
                  label: 'New Retail Price (USD)',
                  admin: {
                    description: 'Optional. Original price when new — shows value contrast to buyers.',
                    width: '50%',
                  },
                },
              ],
            },

            // Condition
            {
              type: 'row',
              fields: [
                {
                  name: 'condition',
                  type: 'select',
                  label: 'Condition',
                  required: true,
                  options: [
                    { label: 'New', value: 'new' },
                    { label: 'Used', value: 'used' },
                    { label: 'Reconditioned', value: 'reconditioned' },
                    { label: 'Rebuilt', value: 'rebuilt' },
                  ],
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'conditionReport',
              type: 'textarea',
              label: 'Condition Report',
              admin: {
                description: 'Detailed notes on the piano\'s current condition.',
              },
            },

            // Content
            {
              name: 'description',
              type: 'richText',
              label: 'Description',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                  HorizontalRuleFeature(),
                ],
              }),
              admin: {
                description: 'Full listing description. Include provenance and history here.',
              },
            },
            {
              name: 'restorationHistory',
              type: 'textarea',
              label: 'Restoration History',
              admin: {
                description: 'Optional. Notes on any restoration or rebuilding work performed.',
              },
            },

            // Tags
            {
              name: 'tags',
              type: 'array',
              label: 'Tags',
              admin: {
                description: 'Optional freeform tags e.g. "concert-quality", "single-owner"',
              },
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  required: true,
                  label: 'Tag',
                },
              ],
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              ...mediaArrayField('images', {
                minRows: 1,
                maxRows: 20,
                admin: {
                  description: 'Upload piano photos. First image is used as the listing thumbnail.',
                },
              }),
              label: 'Photos',
            },
            {
              name: 'stockImageUrl',
              type: 'text',
              label: 'Stock Image URL',
              admin: {
                description:
                  'Optional reference image from the brand website. Used as a fallback when no photos have been uploaded yet.',
              },
            },
            {
              name: 'videoUrl',
              type: 'text',
              label: 'Video URL',
              admin: {
                description: 'Optional YouTube or Vimeo link.',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
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

    // Sidebar fields
    {
      name: 'isAvailable',
      type: 'checkbox',
      label: 'Available for Sale',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Uncheck when the piano has been sold.',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Featured Listing',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Featured pianos appear prominently on the homepage.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
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
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePiano],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
