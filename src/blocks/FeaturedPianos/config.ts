import type { Block } from 'payload'

export const FeaturedPianos: Block = {
  slug: 'featuredPianos',
  interfaceName: 'FeaturedPianosBlock',
  labels: {
    singular: 'Featured Pianos Carousel',
    plural: 'Featured Pianos Carousels',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Label',
      admin: {
        description: "Internal label for this block (e.g. 'Featured Instruments')",
        position: 'sidebar',
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Number of Pianos',
      defaultValue: 6,
      min: 1,
      max: 12,
      admin: {
        description: 'How many pianos to display. Ignored if specific pianos are pinned below.',
        position: 'sidebar',
      },
    },
    {
      name: 'pianos',
      type: 'array',
      label: 'Pin Specific Pianos (optional)',
      admin: {
        description: 'Leave empty to show the most recent featured pianos automatically. Add rows to pin specific instruments.',
      },
      fields: [
        {
          name: 'piano',
          type: 'relationship',
          relationTo: 'pianos',
          required: true,
          label: 'Piano',
        },
      ],
    },
  ],
}
