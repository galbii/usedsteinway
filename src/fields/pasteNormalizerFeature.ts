import { createServerFeature } from '@payloadcms/richtext-lexical'

export const PasteNormalizerFeature = createServerFeature({
  feature: {
    ClientFeature:
      '@/components/admin/pasteNormalizer/ClientFeature#PasteNormalizerClientFeature',
  },
  key: 'pasteNormalizer',
})
