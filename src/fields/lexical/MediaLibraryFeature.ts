import { createServerFeature } from '@payloadcms/richtext-lexical'

/**
 * MediaLibraryFeature
 *
 * Adds a fixed-toolbar "+" dropdown item that opens our custom Media Manager
 * modal (folders, tags, search) as an alternative to Payload's stock ListDrawer
 * picker. Sits alongside the standard UploadFeature — schema, the frontend
 * HTML converter, and the populate hooks all still come from UploadFeature.
 * This feature only owns the picker UX: when the user selects an image we
 * insert a regular Payload UploadNode pointing at the chosen media ID.
 *
 * The client feature reaches our React-context-bound `openModal()` via a
 * window-level bridge installed in AdminRootProvider. Lexical toolbar items
 * are configured via plain callbacks (no hooks allowed), so a small bridge is
 * the simplest way to cross that boundary without forking Payload internals.
 */
export const MediaLibraryFeature = createServerFeature({
  feature: {
    ClientFeature: '@/fields/lexical/MediaLibraryFeature.client#MediaLibraryClientFeature',
  },
  key: 'mediaLibrary',
})
