import type { Block } from 'payload'

import { ExpertBlock } from './Expert/config'
import { Content } from './Content/config'
import { MediaBlock } from './MediaBlock/config'
import { Banner } from './Banner/config'
import { CallToAction } from './CallToAction/config'

// Single source of truth for the Posts `layout` blocks. Consumed by both the
// Posts collection config (admin) and the on-page block editor (frontend post
// drawer), so the two can never drift. Add a new block here once and it shows
// up in both places. Mirrors src/blocks/registry.ts (the Pages equivalent).
export const editablePostBlocks: Block[] = [
  ExpertBlock, // Expert quote / profile card
  Content, // Rich-text columns
  MediaBlock, // Single media embed
  Banner, // Info / warning / success callout
  CallToAction, // CTA with links
]
