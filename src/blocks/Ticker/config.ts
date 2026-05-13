import type { Block } from 'payload'

export const Ticker: Block = {
  slug: 'ticker',
  interfaceName: 'TickerBlock',
  labels: {
    singular: 'Scrolling Ticker',
    plural: 'Scrolling Tickers',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Ticker Items',
      required: true,
      minRows: 1,
      admin: {
        description: 'Brand names or labels that scroll across the ticker bar',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Text',
          admin: { description: "e.g. 'Steinway & Sons'" },
        },
      ],
    },
    {
      name: 'style',
      type: 'select',
      label: 'Style',
      defaultValue: 'dark',
      options: [
        { label: 'Dark Burgundy', value: 'dark' },
        { label: 'Light Ivory', value: 'light' },
      ],
      admin: {
        description: 'Background color of the ticker bar',
        position: 'sidebar',
      },
    },
  ],
}
