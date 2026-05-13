import type { Block } from 'payload'

export const BrandRows: Block = {
  slug: 'brandRows',
  interfaceName: 'BrandRowsBlock',
  labels: {
    singular: 'Brand Rows',
    plural: 'Brand Rows',
  },
  fields: [
    {
      name: 'rows',
      type: 'array',
      label: 'Rows',
      required: true,
      minRows: 1,
      admin: {
        description: 'Each row is a full-width brand category link with large editorial typography',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Brand Name / Heading',
          admin: { description: "e.g. 'Steinway & Sons'" },
        },
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Eyebrow',
          admin: { description: "Country and founding year (e.g. 'New York, USA · Est. 1853')" },
        },
        {
          name: 'tagline',
          type: 'text',
          label: 'Tagline',
          admin: { description: 'Short description shown below the brand name' },
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'Link URL',
          admin: { description: "e.g. '/steinway'" },
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'CTA Button Label',
          admin: { description: "Defaults to 'Browse Collection' if left empty" },
        },
        {
          name: 'tags',
          type: 'array',
          label: 'Model Tags',
          admin: {
            description: 'Optional pill badges showing model names (e.g. Model S, Model B)',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Model Name',
            },
          ],
        },
        {
          name: 'style',
          type: 'select',
          label: 'Row Style',
          defaultValue: 'light',
          options: [
            { label: 'Light (Ivory background)', value: 'light' },
            { label: 'Dark (Burgundy background)', value: 'dark' },
          ],
        },
      ],
    },
  ],
}
