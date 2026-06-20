import type { Block } from 'payload'

export const SectionHeader: Block = {
  slug: 'sectionHeader',
  interfaceName: 'SectionHeaderBlock',
  labels: {
    singular: 'Section Header',
    plural: 'Section Headers',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: 'The Collection',
      admin: {
        description: "Small uppercase label above the heading (e.g. 'The Collection')",
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Our Pianos',
      admin: {
        description: "Giant italic display heading (e.g. 'Our Pianos')",
      },
    },
    {
      name: 'tagline',
      type: 'textarea',
      label: 'Tagline',
      defaultValue: "From the world's finest makers — Each with its unique tone and touch",
      admin: {
        description: 'Optional supporting paragraph aligned bottom-right beside the heading',
      },
    },
    {
      name: 'style',
      type: 'select',
      label: 'Background Style',
      defaultValue: 'dark',
      options: [
        { label: 'Dark Charcoal', value: 'dark' },
        { label: 'Light Ivory', value: 'light' },
      ],
      admin: {
        description: 'Section background color',
        position: 'sidebar',
      },
    },
  ],
}
