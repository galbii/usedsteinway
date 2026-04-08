/**
 * Extracts plain text from a Lexical editor state JSON.
 * Recursively walks the AST and joins all text node values.
 * Used to generate preview snippets for cards and carousels.
 */
export function lexicalToPlainText(data: unknown): string {
  if (!data || typeof data !== 'object') return ''

  const node = data as Record<string, unknown>

  // Text node — return its text value
  if (node.type === 'text' && typeof node.text === 'string') {
    return node.text
  }

  // Recurse into children
  if (Array.isArray(node.children)) {
    const parts = (node.children as unknown[]).map(lexicalToPlainText).filter(Boolean)
    // Add spacing between block-level nodes
    return parts.join(' ')
  }

  // Root node — recurse into root.children
  if (node.root && typeof node.root === 'object') {
    return lexicalToPlainText(node.root)
  }

  return ''
}
