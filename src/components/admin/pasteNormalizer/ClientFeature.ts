'use client'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import { PasteNormalizerPlugin } from './Plugin'

export const PasteNormalizerClientFeature = createClientFeature({
  plugins: [{ Component: PasteNormalizerPlugin, position: 'normal' }],
})
