import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'
import { Aside } from './aside'
import MdxImage from './img'
import { AccessibleLink } from '../ui/accessible-link'
import rehypeShiki from '@shikijs/rehype'
import remarkGfm from 'remark-gfm'
import {
  transformerNotationHighlight,
  transformerNotationDiff,
  transformerMetaHighlight,
  transformerCompactLineOptions
} from '@shikijs/transformers'

interface KeystaticContentProps {
  content: string
}

export const components = {
  // Custom components - children will be rendered as MDX by MDXRemote
  Aside: ({ title, styled = false, children }: any) => (
    <Aside title={title} styled={styled}>
      {children}
    </Aside>
  ),

  // Styled HTML elements
  h1: ({ children }: any) => (
    <h2 className="font-sans uppercase text-inherit text-3xl">{children}</h2>
  ),
  h2: ({ children }: any) => (
    <h3 className="font-sans uppercase text-inherit text-2xl">{children}</h3>
  ),
  h3: ({ children }: any) => (
    <h4 className="font-sans uppercase text-inherit text-xl">{children}</h4>
  ),
  h4: ({ children }: any) => (
    <h5 className="font-sans uppercase text-inherit text-lg">{children}</h5>
  ),
  ol: ({ children }: any) => (
    <ol className="list-inside list-decimal">{children}</ol>
  ),
  ul: ({ children }: any) => (
    <ul className="list-inside list-disc">{children}</ul>
  ),
  li: ({ children }: any) => (
    <li className="">{children}</li>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-primary bg-primary/10 pl-2 py-2 text-body">
      {children}
    </blockquote>
  ),
  strong: ({ children }: any) => (
    <strong className="font-bold">{children}</strong>
  ),
  img: MdxImage,
  a: ({ children, href }: any) => {
    return <AccessibleLink href={href} className="text-accent">{children}</AccessibleLink>
  },
  // GitHub Flavored Markdown components
  table: ({ children }: any) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
  ),
  tbody: ({ children }: any) => (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">{children}</tbody>
  ),
  tr: ({ children }: any) => (
    <tr className="border-b border-gray-200 dark:border-gray-700">{children}</tr>
  ),
  th: ({ children }: any) => (
    <th className="px-4 py-2 text-left font-semibold border border-gray-300 dark:border-gray-600">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">{children}</td>
  ),
  del: ({ children }: any) => (
    <del className="line-through opacity-75">{children}</del>
  ),
  input: ({ type, checked, disabled }: any) =>
    type === 'checkbox' ? (
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className="mr-2 rounded"
        readOnly
      />
    ) : null,
  pre: ({ children, ...props }: any) => {
    // Shiki adds metadata as data attributes
    const title = props['data-title']
    const showLineNumbers = props['data-show-line-numbers'] !== 'false'

    return (
      <div className="code-block-wrapper my-6">
        {title && (
          <div className="code-block-title bg-[#2b3339] text-[#d3c6aa] px-4 py-2 rounded-t-lg border border-b-0 border-[#414b50] text-sm font-mono">
            {title}
          </div>
        )}
        <pre
          className={`shiki overflow-x-auto rounded-lg ${title ? 'rounded-t-none' : ''} ${showLineNumbers ? 'line-numbers' : ''}`}
          {...props}
        >
          {children}
        </pre>
      </div>
    )
  },
  code: ({ children, ...props }: any) => {
    // Check if it's inline code (no data-language attribute from Shiki)
    if (!props['data-language']) {
      return <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm" {...props}>{children}</code>
    }
    // For code blocks, Shiki handles the styling
    return <code {...props}>{children}</code>
  }
}

export function MDXContent({ content }: KeystaticContentProps) {
  return (
    <MDXRemote
      source={content}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [
              rehypeShiki,
              {
                theme: 'everforest-dark',
                transformers: [
                  // Built-in transformers
                  transformerNotationDiff(),      // For // [!code ++] and // [!code --]
                  transformerNotationHighlight(), // For // [!code highlight]
                  // Custom transformer for titles and line numbers
                  transformerMetaHighlight(),
                  transformerCompactLineOptions()
                ]
              }
            ]
          ]
        }
      }}
    />
  )
}