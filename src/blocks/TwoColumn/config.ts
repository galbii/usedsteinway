import type { Block } from 'payload'
import { imageField } from '@/lib/payload/fields/media'

export const TwoColumn: Block = {
  slug: 'twoColumn',
  interfaceName: 'TwoColumnBlock',
  labels: {
    singular: 'Two Column',
    plural: 'Two Column',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: 'Our Story',
      admin: {
        description: "Small label above the heading (e.g. 'Our Story')",
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'More than a showroom.',
      admin: {
        description: 'Large display heading — use \\n for line breaks',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Body Text',
      defaultValue:
        "Founded in 1980 by master technician Roger Shaffer, Roger's Piano quickly earned a reputation for meticulous Steinway rebuilding and deep technical expertise.\n\nThat tradition continues today.",
      admin: {
        description: 'Body paragraphs — separate each paragraph with a BLANK LINE (two returns).',
      },
    },
    {
      name: 'accentSide',
      type: 'select',
      label: 'Accent Side',
      defaultValue: 'right',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Which side the accent column sits on. Prose takes the opposite side.',
      },
    },
    {
      name: 'accentType',
      type: 'select',
      label: 'Accent Type',
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Pull Quote', value: 'pullQuote' },
        { label: 'Feature List', value: 'featureList' },
        { label: 'None (full-width prose)', value: 'none' },
      ],
      admin: {
        position: 'sidebar',
        description:
          'Which accent column to render: Image (portrait photo), Pull Quote (large italic quote), Feature List (gold-dot rows), or None (prose spans the full width).',
      },
    },
    imageField('image', {
      label: 'Accent Image',
      admin: {
        description: 'Used when Accent Type = Image. Portrait image shown beside the prose.',
      },
    }),
    {
      name: 'quote',
      type: 'textarea',
      label: 'Pull Quote',
      admin: {
        description: 'Used when Accent Type = Pull Quote. The large italic statement.',
      },
    },
    {
      name: 'quoteAttribution',
      type: 'text',
      label: 'Quote Attribution',
      admin: {
        description: 'Used when Accent Type = Pull Quote. Small label beneath the quote.',
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      admin: {
        description: 'Used when Accent Type = Feature List. One row per feature.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          admin: { description: 'Uppercase gold label (e.g. "Performance")' },
        },
        {
          name: 'detail',
          type: 'textarea',
          label: 'Detail',
          admin: { description: 'Supporting sentence beneath the label' },
        },
      ],
    },
    {
      name: 'bgStyle',
      type: 'select',
      label: 'Background Style',
      defaultValue: 'cream',
      options: [
        { label: 'Cream', value: 'cream' },
        { label: 'Charcoal', value: 'charcoal' },
        { label: 'Burgundy', value: 'burgundy' },
        { label: 'Black', value: 'black' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Section background. Cream is light; charcoal/burgundy/black are dark.',
      },
    },
  ],
}
