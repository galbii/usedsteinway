import React from 'react'
import RichText from '@/components/RichText'
import { normalizeRichTextContent } from '@/utilities/normalizeRichTextContent'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

export const ContentBlock: React.FC<ContentBlockProps> = ({ richText }) => {
  if (!richText) return null

  const normalizedContent = normalizeRichTextContent(richText)

  return (
    /*
      enableProse={false} bypasses the `prose dark:prose-invert` classes entirely —
      which caused white text on a white bg in dark mode. We apply our own
      editorial typography styles here instead.
    */
    <div
      className={[
        // Body — fluid scale: 20px on phones → 26px on wide desktops
        '[&_p]:text-[#111] [&_p]:text-[clamp(1.25rem,0.55rem+1.1vw,1.625rem)] [&_p]:leading-[1.7] [&_p]:mb-8',

        // Drop cap on the opening paragraph — gold, Cormorant, set tight against the text
        '[&_p:first-of-type]:first-letter:float-left',
        '[&_p:first-of-type]:first-letter:font-cormorant',
        '[&_p:first-of-type]:first-letter:font-medium',
        '[&_p:first-of-type]:first-letter:text-[hsl(40,72%,52%)]',
        '[&_p:first-of-type]:first-letter:text-[clamp(4.5rem,7vw,6.5rem)]',
        '[&_p:first-of-type]:first-letter:leading-[0.82]',
        '[&_p:first-of-type]:first-letter:pr-3',
        '[&_p:first-of-type]:first-letter:pt-1',
        '[&_p:first-of-type]:first-letter:mr-1',

        // Hierarchy — bigger, tighter, with breathing room above
        '[&_h2]:text-[#111] [&_h2]:font-light [&_h2]:tracking-[-0.01em]',
        '[&_h2]:text-[clamp(2.25rem,1rem+2.6vw,3.75rem)] [&_h2]:leading-[1.08] [&_h2]:mt-16 [&_h2]:mb-6',
        '[&_h3]:text-[#111] [&_h3]:font-light [&_h3]:tracking-[-0.005em]',
        '[&_h3]:text-[clamp(1.875rem,0.9rem+1.9vw,2.875rem)] [&_h3]:leading-[1.15] [&_h3]:mt-12 [&_h3]:mb-5',
        '[&_h4]:text-[#111] [&_h4]:font-normal',
        '[&_h4]:text-[clamp(1.5rem,0.8rem+1.3vw,2.125rem)] [&_h4]:leading-[1.25] [&_h4]:mt-10 [&_h4]:mb-4',

        // Lists — match body scale, with comfortable indentation
        '[&_ul]:list-disc [&_ul]:pl-8 [&_ul]:mb-8 [&_ul]:marker:text-[hsl(40,55%,42%)]',
        '[&_ol]:list-decimal [&_ol]:pl-8 [&_ol]:mb-8 [&_ol]:marker:text-[hsl(40,55%,42%)]',
        '[&_li]:text-[#111] [&_li]:text-[clamp(1.25rem,0.55rem+1.1vw,1.625rem)] [&_li]:leading-[1.65] [&_li]:mb-3 [&_li]:pl-1',

        // Blockquote — pull-quote energy
        '[&_blockquote]:border-l-[3px] [&_blockquote]:border-[hsl(40,72%,52%)]',
        '[&_blockquote]:pl-8 [&_blockquote]:my-12 [&_blockquote]:italic',
        '[&_blockquote]:text-[#3a3a3a] [&_blockquote]:text-[clamp(1.5rem,0.8rem+1.4vw,2rem)]',
        '[&_blockquote]:leading-[1.45] [&_blockquote]:font-light',
        '[&_blockquote_p]:text-inherit [&_blockquote_p]:text-[length:inherit] [&_blockquote_p]:leading-[inherit]',
        '[&_blockquote_p:first-of-type]:first-letter:float-none [&_blockquote_p:first-of-type]:first-letter:text-[length:inherit] [&_blockquote_p:first-of-type]:first-letter:text-inherit [&_blockquote_p:first-of-type]:first-letter:p-0 [&_blockquote_p:first-of-type]:first-letter:m-0 [&_blockquote_p:first-of-type]:first-letter:font-[inherit]',

        // Inline
        '[&_strong]:font-semibold [&_strong]:text-[#111]',
        '[&_em]:italic',
        '[&_a]:text-[hsl(40,55%,36%)] [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-[hsl(40,55%,36%)]/40 hover:[&_a]:decoration-[hsl(40,55%,36%)]',

        // Divider — refined gold-tinted rule
        '[&_hr]:border-0 [&_hr]:h-px [&_hr]:bg-[linear-gradient(to_right,transparent,hsl(36,20%,80%)_20%,hsl(36,20%,80%)_80%,transparent)] [&_hr]:my-14',
      ].join(' ')}
      style={{
        fontFamily: '"Cormorant Garamond", Georgia, serif',
        color: '#111',
      }}
    >
      <RichText data={normalizedContent!} enableGutter={false} enableProse={false} />
    </div>
  )
}
