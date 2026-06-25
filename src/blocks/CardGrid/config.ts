import type { Block } from 'payload'

export const CardGrid: Block = {
  slug: 'cardGrid',
  interfaceName: 'CardGridBlock',
  labels: {
    singular: 'Card Grid',
    plural: 'Card Grids',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      admin: {
        description: "Small uppercase label above the heading (e.g. 'The Value Proposition')",
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      admin: {
        description: 'Large cormorant display heading. Use line breaks for multi-line headings.',
      },
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Intro',
      admin: {
        description: 'Optional supporting paragraph below the heading',
      },
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 0,
      admin: {
        description: 'Cards rendered in the grid. Titles may contain line breaks to wrap across lines.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          admin: { description: 'Card title. Use line breaks to wrap onto multiple lines.' },
        },
        {
          name: 'body',
          type: 'textarea',
          label: 'Body',
          admin: { description: 'Short supporting copy for the card' },
        },
      ],
    },
    {
      name: 'closingText',
      type: 'textarea',
      label: 'Closing Text',
      admin: {
        description: 'Optional paragraph rendered below the grid',
      },
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Columns',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      admin: {
        description: 'Number of columns on large screens',
        position: 'sidebar',
      },
    },
    {
      name: 'showNumbers',
      type: 'checkbox',
      label: 'Show Numbers',
      defaultValue: false,
      admin: {
        description: 'Render 01/02/03… numerals per card (divider layout)',
        position: 'sidebar',
      },
    },
    {
      name: 'bgStyle',
      type: 'select',
      label: 'Background Style',
      defaultValue: 'charcoal',
      options: [
        { label: 'Burgundy', value: 'burgundy' },
        { label: 'Charcoal', value: 'charcoal' },
        { label: 'Cream', value: 'cream' },
        { label: 'Black', value: 'black' },
      ],
      admin: {
        description: 'Section background color',
        position: 'sidebar',
      },
    },
  ],
}
