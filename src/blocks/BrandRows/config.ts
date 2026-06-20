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
      admin: {
        description:
          'Full-width brand category links with large editorial typography. Leave empty to auto-render the three default rows (Steinway & Sons, Handcrafted European, Shigeru Kawai) pulled live from the Brands collection. Add rows to control order, mix in custom rows, or override the auto-derived copy.',
      },
      fields: [
        {
          name: 'source',
          type: 'select',
          defaultValue: 'steinway',
          label: 'Content Source',
          admin: {
            description:
              'Auto-derive this row from a Brands-collection category, or build it manually with "Custom".',
          },
          options: [
            { label: 'Steinway & Sons (auto)', value: 'steinway' },
            { label: 'Handcrafted European (auto)', value: 'european' },
            { label: 'Shigeru Kawai (auto)', value: 'shigeru-kawai' },
            { label: 'Custom (manual)', value: 'custom' },
          ],
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Heading Override',
          admin: {
            description: 'Overrides the auto-derived heading. Required for Custom rows.',
          },
        },
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Eyebrow Override',
          admin: {
            description: "Overrides the auto eyebrow (e.g. 'United States · Est. 1853').",
          },
        },
        {
          name: 'tagline',
          type: 'text',
          label: 'Tagline Override',
          admin: {
            description: 'Overrides the brand tagline shown below the heading.',
          },
        },
        {
          name: 'href',
          type: 'text',
          label: 'Link URL Override',
          admin: {
            description: "Overrides the auto link (e.g. '/steinway'). Required for Custom rows.",
          },
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'CTA Button Label',
          admin: { description: "Defaults to 'Browse Collection' if left empty." },
        },
        {
          name: 'tags',
          type: 'array',
          label: 'Model Tags Override',
          admin: {
            description:
              'Overrides the auto-derived model/brand pill badges when one or more are set.',
          },
          fields: [{ name: 'name', type: 'text', required: true, label: 'Tag' }],
        },
        {
          name: 'style',
          type: 'select',
          label: 'Row Style Override',
          admin: {
            description:
              'Overrides the default background (Steinway & Shigeru = light, European = dark).',
          },
          options: [
            { label: 'Light (Ivory background)', value: 'light' },
            { label: 'Dark (Burgundy background)', value: 'dark' },
          ],
        },
      ],
    },
  ],
}
