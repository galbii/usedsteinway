import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access'
import { imageField } from '@/lib/payload/fields/media'

export const Brands: CollectionConfig = {
  slug: 'brands',
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'slug', 'prestige', 'country'],
    useAsTitle: 'name',
    description: 'Piano brands with embedded model specifications.',
    components: {
      beforeList: ['@/collections/Brands/SeedButton#SeedButton'],
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Brand Name',
          admin: {
            description: 'e.g. "Steinway & Sons"',
            width: '50%',
          },
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          label: 'Slug',
          index: true,
          admin: {
            description: 'e.g. "steinway"',
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'country',
          type: 'text',
          label: 'Country',
          admin: { width: '50%' },
        },
        {
          name: 'founded',
          type: 'number',
          label: 'Year Founded',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          label: 'Category',
          admin: { width: '50%' },
          options: [
            { label: 'Steinway', value: 'steinway' },
            { label: 'European', value: 'european' },
            { label: 'Shigeru Kawai', value: 'shigeru-kawai' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'prestige',
          type: 'select',
          label: 'Prestige Level',
          admin: { width: '50%' },
          options: [
            { label: 'Ultra Premium', value: 'Ultra Premium' },
            { label: 'Premium', value: 'Premium' },
            { label: 'Professional', value: 'Professional' },
          ],
        },
      ],
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'whyBuyPreowned',
      type: 'array',
      label: 'Why Buy Pre-Owned (Talking Points)',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Reason',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'priceRange',
          type: 'text',
          label: 'Price Range',
          admin: {
            description: 'e.g. "$30,000 – $200,000+"',
            width: '50%',
          },
        },
        {
          name: 'accentColor',
          type: 'text',
          label: 'Accent Color (optional hex)',
          admin: { width: '50%' },
        },
      ],
    },
    imageField('heroImage', {
      label: 'Hero Image',
    }),
    {
      name: 'models',
      type: 'array',
      label: 'Models',
      admin: {
        description: 'Piano models offered by this brand.',
        initCollapsed: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Model Name',
              admin: {
                description: 'e.g. "Model B"',
                width: '50%',
              },
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              label: 'Slug',
              admin: {
                description: 'e.g. "model-b"',
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          label: 'Piano Type',
          options: [
            { label: 'Grand', value: 'Grand' },
            { label: 'Upright', value: 'Upright' },
            { label: 'Concert Grand', value: 'Concert Grand' },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'size',
              type: 'text',
              label: 'Size',
              admin: {
                description: "e.g. \"6'10\"\"",
                width: '50%',
              },
            },
            {
              name: 'sizeInches',
              type: 'text',
              label: 'Size in Inches',
              admin: {
                description: 'e.g. "82"',
                width: '50%',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'weight',
              type: 'text',
              label: 'Weight',
              admin: { width: '50%' },
            },
            {
              name: 'stringLength',
              type: 'text',
              label: 'String Length',
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'yearRange',
          type: 'text',
          label: 'Year Range',
          admin: {
            description: 'e.g. "1884 – present"',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
        {
          name: 'highlights',
          type: 'array',
          label: 'Highlights',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              label: 'Highlight',
            },
          ],
        },
        {
          name: 'priceGuide',
          type: 'array',
          label: 'Price Guide',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'era',
                  type: 'text',
                  required: true,
                  label: 'Era',
                  admin: { width: '33%' },
                },
                {
                  name: 'condition',
                  type: 'text',
                  required: true,
                  label: 'Condition',
                  admin: { width: '33%' },
                },
                {
                  name: 'priceRange',
                  type: 'text',
                  required: true,
                  label: 'Price Range',
                  admin: { width: '33%' },
                },
              ],
            },
          ],
        },
        {
          name: 'adjacentModels',
          type: 'array',
          label: 'Adjacent Models',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'adjacentSlug',
                  type: 'text',
                  required: true,
                  label: 'Model Slug',
                  admin: { width: '50%' },
                },
                {
                  name: 'adjacentName',
                  type: 'text',
                  required: true,
                  label: 'Display Name',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
        {
          name: 'order',
          type: 'number',
          label: 'Display Order',
          defaultValue: 0,
          admin: {
            description: 'Lower numbers appear first',
          },
        },
        imageField('image', {
          label: 'Model Image',
        }),
      ],
    },
  ],
}
