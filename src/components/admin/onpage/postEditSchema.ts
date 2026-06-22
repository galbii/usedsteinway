import { editablePostBlocks } from '@/blocks/postRegistry'
import { serializeBlocks, type EditorBlockSchema, type EditorFieldSchema } from './editorSchema'

// The post body is a `layout` blocks array (Expert, Content, MediaBlock,
// Banner, CallToAction) — edited in the drawer's Content tab. Derived from the
// shared post-block registry so new block types appear automatically, matching
// the Pages on-page editor.
export function postBlockSchemas(): EditorBlockSchema[] {
  return serializeBlocks(editablePostBlocks)
}

// Scalar/identity fields edited in the drawer's Details tab.
//
// Hand-authored (rather than serialized from the live collection like the brand
// drawer) for two reasons specific to Posts:
//   1. SEO fields live under a *named* `meta` tab. The flat field serializer
//      hoists tab fields to the top level, which would collide `meta.title`
//      with the post's own `title` and write bogus top-level keys on save.
//      Declaring `meta` as an explicit group keeps the data nested correctly.
//   2. Relationship/date fields (categories, relatedPosts, authors,
//      publishedAt) are deferred to full admin in v1, so they're omitted here.
// Keep in sync with src/collections/Posts when adding simple editable fields.
export function postEditFieldSchemas(): EditorFieldSchema[] {
  return [
    { kind: 'text', name: 'title', label: 'Title', required: true },
    {
      kind: 'upload',
      name: 'heroImage',
      label: 'Hero Image',
      mimeFilter: 'image/',
      description: 'Featured image shown at the top of the post (recommended: 1600×900px)',
    },
    {
      kind: 'group',
      name: 'meta',
      label: 'SEO',
      fields: [
        { kind: 'text', name: 'title', label: 'Meta Title' },
        { kind: 'upload', name: 'image', label: 'Meta Image', mimeFilter: 'image/' },
        { kind: 'textarea', name: 'description', label: 'Meta Description' },
      ],
    },
    { kind: 'checkbox', name: 'isNews', label: 'News' },
    { kind: 'checkbox', name: 'isGuide', label: 'Guide' },
    {
      kind: 'array',
      name: 'tags',
      label: 'Tags',
      fields: [{ kind: 'text', name: 'tag', label: 'Tag', required: true }],
    },
  ]
}
