import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

// Recursively extract plain text from any serialized Lexical node
function getNodeText(node: Record<string, unknown>): string {
  if (typeof node.text === 'string') return node.text
  if (Array.isArray(node.children)) {
    return (node.children as Record<string, unknown>[]).map(getNodeText).join('')
  }
  return ''
}

const SENTENCE_END = /[.!?:;"'»\])]$/

/**
 * Merges consecutive root-level paragraph nodes that appear to be line-wrapped
 * text from an external source (PDF, website copy-paste).
 *
 * Heuristic: if a paragraph's plain text does NOT end with sentence-ending
 * punctuation and the next sibling is also a paragraph, they're merged with a
 * space between them — preserving all inline formatting (bold, italic, links).
 * Empty paragraphs are dropped entirely.
 *
 * Apply this to rich text content that was saved before the PasteNormalizerFeature
 * was enabled. New pastes are automatically cleaned up by the editor plugin.
 */
export function normalizeRichTextContent(
  data: DefaultTypedEditorState | null | undefined,
): DefaultTypedEditorState | null | undefined {
  if (!data?.root?.children?.length) return data

  type Node = Record<string, unknown>
  const children = data.root.children as Node[]
  const result: Node[] = []
  let i = 0

  while (i < children.length) {
    const curr = children[i]!

    // Non-paragraph nodes (headings, lists, blocks, hr) pass through untouched
    if (curr['type'] !== 'paragraph') {
      result.push(curr)
      i++
      continue
    }

    const currText = getNodeText(curr).trim()

    // Empty paragraph — drop it
    if (!currText) {
      i++
      continue
    }

    // Start accumulating this paragraph
    let merged: Node = { ...curr, children: [...(curr['children'] as unknown[])] }
    i++

    // Keep merging subsequent paragraphs while the running text doesn't end
    // with sentence-ending punctuation
    while (i < children.length) {
      const runningText = getNodeText(merged).trim()
      if (SENTENCE_END.test(runningText)) break

      const next = children[i]!
      if (next['type'] !== 'paragraph') break

      i++ // consume next

      const nextText = getNodeText(next).trim()
      if (!nextText) continue // empty paragraph between lines — skip, keep checking

      // Merge: append a plain space then the next paragraph's children
      merged = {
        ...merged,
        children: [
          ...(merged['children'] as unknown[]),
          { type: 'text', text: ' ', version: 1, format: 0, mode: 'normal', style: '', detail: 0 },
          ...(next['children'] as unknown[]),
        ],
      }
    }

    result.push(merged)
  }

  return {
    ...data,
    root: {
      ...data.root,
      children: result as typeof data.root.children,
    },
  }
}
