import type { Block } from 'payload'

export const TestimonialsGrid: Block = {
  slug: 'testimonialsGrid',
  interfaceName: 'TestimonialsGridBlock',
  labels: {
    singular: 'Testimonials Grid',
    plural: 'Testimonials Grids',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      admin: {
        description: 'Optional small uppercase label above the grid.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      admin: {
        description: 'Optional display heading above the grid.',
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Limit',
      min: 1,
      admin: {
        description: 'Optional cap on how many testimonials to show. Leave empty to show all published.',
        position: 'sidebar',
      },
    },
  ],
}
