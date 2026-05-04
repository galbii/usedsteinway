import {
  BlockquoteFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  StrikethroughFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { PasteNormalizerFeature } from './pasteNormalizerFeature'

// Shared Lexical editor config for long-form content fields — used by:
//   - Posts: Content block richText field
//   - Pianos: description richText field
//
// Features: paragraph, bold, italic, underline, link (from rootFeatures) +
// headings h2–h4, blockquote, ordered/unordered lists, horizontal rule,
// fixed toolbar, inline toolbar, paste normalizer (merges line-wrap breaks).
export const contentLexical = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    BlockquoteFeature(),
    OrderedListFeature(),
    StrikethroughFeature(),
    UnorderedListFeature(),
    HorizontalRuleFeature(),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    PasteNormalizerFeature(),
  ],
})
