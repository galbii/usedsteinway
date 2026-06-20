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
      minRows: 0,
      admin: {
        description:
          'Brand names or labels that scroll across the ticker bar. Leave empty to use the default brand list.',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
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
