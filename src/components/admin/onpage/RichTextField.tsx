'use client'
import { useCallback } from 'react'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Minus,
  Heading2,
  Heading3,
  Heading4,
} from 'lucide-react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { HeadingNode, QuoteNode, $createHeadingNode, $createQuoteNode } from '@lexical/rich-text'
import {
  ListNode,
  ListItemNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list'
import { LinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import {
  HorizontalRuleNode,
  INSERT_HORIZONTAL_RULE_COMMAND,
} from '@lexical/react/LexicalHorizontalRuleNode'
import { $setBlocksType } from '@lexical/selection'
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  FORMAT_TEXT_COMMAND,
  type EditorState,
  type SerializedEditorState,
} from 'lexical'

export interface RichTextFieldProps {
  value: SerializedEditorState | null
  onChange: (value: SerializedEditorState) => void
  placeholder?: string
}

const editorTheme = {
  paragraph: 'mb-2',
  heading: {
    h2: 'font-cormorant text-3xl text-piano-black mt-4 mb-2',
    h3: 'font-cormorant text-2xl text-piano-black mt-4 mb-2',
    h4: 'font-cormorant text-xl text-piano-black mt-3 mb-2',
  },
  quote: 'border-l-2 border-piano-burgundy/40 pl-4 italic text-piano-stone',
  list: {
    ul: 'list-disc pl-6 my-2',
    ol: 'list-decimal pl-6 my-2',
    listitem: 'mb-1',
  },
  link: 'text-piano-burgundy underline',
  text: {
    bold: 'font-semibold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
  },
}

export function RichTextField({ value, onChange, placeholder }: RichTextFieldProps) {
  const handleChange = useCallback(
    (editorState: EditorState) => {
      onChange(editorState.toJSON())
    },
    [onChange],
  )

  const initialConfig = {
    namespace: 'OnPageRichText',
    theme: editorTheme,
    onError: (err: Error) => {
      console.error('Lexical error:', err)
    },
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, HorizontalRuleNode],
    editorState: value ? JSON.stringify(value) : undefined,
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border border-piano-stone/15 bg-white">
        <Toolbar />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="outline-none px-4 py-3 min-h-[200px] text-piano-black text-[15px] leading-relaxed"
                aria-label="Rich text editor"
              />
            }
            placeholder={
              <div className="absolute top-3 left-4 text-piano-stone/40 text-[15px] pointer-events-none select-none">
                {placeholder ?? 'Write here…'}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <HorizontalRulePlugin />
          <OnChangePlugin onChange={handleChange} />
        </div>
      </div>
    </LexicalComposer>
  )
}

function Toolbar() {
  const [editor] = useLexicalComposerContext()

  const format = (type: 'bold' | 'italic' | 'underline' | 'strikethrough') => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, type)
  }

  const setBlock = (block: 'paragraph' | 'h2' | 'h3' | 'h4' | 'quote') => {
    editor.update(() => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) return
      if (block === 'paragraph') {
        $setBlocksType(selection, () => $createParagraphNode())
      } else if (block === 'quote') {
        $setBlocksType(selection, () => $createQuoteNode())
      } else {
        $setBlocksType(selection, () => $createHeadingNode(block))
      }
    })
  }

  const insertList = (type: 'ul' | 'ol') => {
    editor.dispatchCommand(
      type === 'ul' ? INSERT_UNORDERED_LIST_COMMAND : INSERT_ORDERED_LIST_COMMAND,
      undefined,
    )
  }

  const insertHorizontalRule = () => {
    editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)
  }

  const insertLink = () => {
    const url = window.prompt('Link URL:')
    if (!url) return
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, url)
  }

  return (
    <div className="flex items-center gap-1 px-3 py-2 border-b border-piano-stone/15 bg-piano-cream/60 flex-wrap">
      <ToolbarBtn onClick={() => format('bold')} title="Bold">
        <Bold size={15} />
      </ToolbarBtn>
      <ToolbarBtn onClick={() => format('italic')} title="Italic">
        <Italic size={15} />
      </ToolbarBtn>
      <ToolbarBtn onClick={() => format('underline')} title="Underline">
        <UnderlineIcon size={15} />
      </ToolbarBtn>
      <ToolbarBtn onClick={() => format('strikethrough')} title="Strikethrough">
        <Strikethrough size={15} />
      </ToolbarBtn>
      <Divider />
      <ToolbarBtn onClick={() => setBlock('h2')} title="Heading 2">
        <Heading2 size={15} />
      </ToolbarBtn>
      <ToolbarBtn onClick={() => setBlock('h3')} title="Heading 3">
        <Heading3 size={15} />
      </ToolbarBtn>
      <ToolbarBtn onClick={() => setBlock('h4')} title="Heading 4">
        <Heading4 size={15} />
      </ToolbarBtn>
      <Divider />
      <ToolbarBtn onClick={() => setBlock('quote')} title="Quote">
        <Quote size={15} />
      </ToolbarBtn>
      <ToolbarBtn onClick={() => insertList('ul')} title="Bulleted list">
        <List size={15} />
      </ToolbarBtn>
      <ToolbarBtn onClick={() => insertList('ol')} title="Numbered list">
        <ListOrdered size={15} />
      </ToolbarBtn>
      <Divider />
      <ToolbarBtn onClick={insertLink} title="Insert link">
        <LinkIcon size={14} />
      </ToolbarBtn>
      <ToolbarBtn onClick={insertHorizontalRule} title="Horizontal rule">
        <Minus size={15} />
      </ToolbarBtn>
    </div>
  )
}

function ToolbarBtn({
  onClick,
  title,
  children,
}: {
  onClick: () => void
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className="p-2 text-piano-stone/70 hover:text-piano-black hover:bg-white rounded-sm transition-colors"
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-5 bg-piano-stone/20 mx-1" />
}
