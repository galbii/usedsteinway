'use client'
import { useEffect } from 'react'
import type { PluginComponent } from '@payloadcms/richtext-lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import {
  $getRoot,
  $isParagraphNode,
  $isTextNode,
  $createTextNode,
  type ParagraphNode,
} from '@payloadcms/richtext-lexical/lexical'

// Returns true when every text node in the paragraph carries inline formatting
// (bold, italic, etc.). Such paragraphs are intentional emphasis blocks, not
// line-wrap artifacts, so the normalizer should leave them alone.
function isFullyFormatted(paragraph: ParagraphNode): boolean {
  const textNodes = paragraph.getChildren().filter($isTextNode)
  return textNodes.length > 0 && textNodes.every((n) => n.getFormat() !== 0)
}

// Merges consecutive paragraph nodes that appear to be line-wrapped text
// (i.e., the paragraph doesn't end with sentence-ending punctuation).
// Only runs immediately after a paste event.
export const PasteNormalizerPlugin: PluginComponent = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerUpdateListener(({ tags }) => {
      if (!tags.has('paste')) return

      editor.update(
        () => {
          const root = $getRoot()
          let i = 0

          while (i < root.getChildrenSize() - 1) {
            const children = root.getChildren()
            const current = children[i]
            const next = children[i + 1]

            if (!$isParagraphNode(current) || !$isParagraphNode(next)) {
              i++
              continue
            }

            const currentText = current.getTextContent().trim()

            // Remove empty paragraphs (blank lines from paste)
            if (!currentText) {
              current.remove()
              continue
            }

            // If current paragraph doesn't end with sentence punctuation,
            // it's a split line — merge with the next paragraph
            if (!/[.!?:;"'»\])]$/.test(currentText)) {
              // Skip merge if either paragraph is entirely formatted (bold/italic).
              // Those are intentional emphasis blocks, not line-wrap artifacts.
              if (isFullyFormatted(current) || isFullyFormatted(next)) {
                i++
                continue
              }

              // Only add a space if the last character isn't already a space.
              // Inherit the format of the last text node so we don't break
              // bold/italic runs at the merge boundary.
              if (!current.getTextContent().endsWith(' ')) {
                const lastChild = current.getLastChild()
                const spaceFormat = $isTextNode(lastChild) ? lastChild.getFormat() : 0
                const space = $createTextNode(' ')
                if (spaceFormat) space.setFormat(spaceFormat)
                current.append(space)
              }
              for (const child of next.getChildren()) {
                current.append(child)
              }
              next.remove()
              // Re-check this index — the merged paragraph may need further merging
              continue
            }

            i++
          }
        },
        { tag: 'history-merge' },
      )
    })
  }, [editor])

  return null
}
