import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

export const ContentBlock: React.FC<ContentBlockProps> = ({ richText }) => {
  if (!richText) return null

  return (
    /*
      enableProse={false} bypasses the `prose dark:prose-invert` classes entirely —
      which caused white text on a white bg in dark mode. We apply our own
      editorial typography styles here instead.
    */
    <div
      className={[
        '[&_p]:text-[#111] [&_p]:text-xl [&_p]:leading-[1.85] [&_p]:mb-6',
        '[&_h2]:text-[#111] [&_h2]:text-4xl [&_h2]:leading-tight [&_h2]:mt-12 [&_h2]:mb-5',
        '[&_h3]:text-[#111] [&_h3]:text-3xl [&_h3]:leading-snug [&_h3]:mt-10 [&_h3]:mb-4',
        '[&_h4]:text-[#111] [&_h4]:text-2xl [&_h4]:mt-8 [&_h4]:mb-3',
        '[&_ul]:list-disc [&_ul]:pl-7 [&_ul]:mb-6',
        '[&_ol]:list-decimal [&_ol]:pl-7 [&_ol]:mb-6',
        '[&_li]:text-[#111] [&_li]:text-xl [&_li]:leading-[1.75] [&_li]:mb-2',
        '[&_blockquote]:border-l-[3px] [&_blockquote]:border-[hsl(40,72%,52%)] [&_blockquote]:pl-6 [&_blockquote]:my-8 [&_blockquote]:italic [&_blockquote]:text-[#444]',
        '[&_strong]:font-semibold [&_strong]:text-[#111]',
        '[&_a]:text-[hsl(40,55%,36%)] [&_a]:underline [&_a]:underline-offset-2',
        '[&_hr]:border-[hsl(36,20%,88%)] [&_hr]:my-10',
      ].join(' ')}
      style={{
        fontFamily: '"Cormorant Garamond", Georgia, serif',
        color: '#111',
      }}
    >
      <RichText data={richText} enableGutter={false} enableProse={false} />
    </div>
  )
}
