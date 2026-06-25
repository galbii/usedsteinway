import type { Block } from 'payload'

export const TestimonialsFeatured: Block = {
  slug: 'testimonialsFeatured',
  interfaceName: 'TestimonialsFeaturedBlock',
  labels: {
    singular: 'Featured Testimonials Carousel',
    plural: 'Featured Testimonials Carousels',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      admin: {
        description: 'Optional small label (internal — the carousel renders its own "Featured Voices" eyebrow).',
        position: 'sidebar',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      admin: {
        description: 'Optional internal label for this block.',
        position: 'sidebar',
      },
    },
  ],
}
