import type { MDXComponents } from 'mdx/types'
import { Aside } from './components/mdx/aside'
import MdxImage from './components/mdx/img'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom components
    Aside: ({ title, position = 'left', styled = false, ...props }) => (
      <Aside title={title} position={position} styled={styled} {...props} />
    ),
    
    // Styled HTML elements
    h1: ({ children }) => (
      <h2 className="font-sans uppercase text-black text-3xl">{children}</h2>
    ),
    h2: ({ children }) => (
      <h3 className="font-sans uppercase text-black text-2xl">{children}</h3>
    ),
    h3: ({ children }) => (
      <h4 className="font-sans uppercase text-black text-xl">{children}</h4>
    ),
    h4: ({ children }) => (
      <h5 className="font-sans uppercase text-black text-lg">{children}</h5>
    ),
    ol: ({ children }) => (
      <ol className="list-inside list-decimal">{children}</ol>
    ),
    ul: ({ children }) => (
      <ul className="list-inside list-disc">{children}</ul>
    ),
    li: ({ children }) => (
      <li className="">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary bg-primary/10 pl-2 py-2 text-body">
        {children}
      </blockquote>
    ),
    strong: ({ children }) => (
      <strong className="font-bold">{children}</strong>
    ),
    img: MdxImage,
    
    // Allow custom components to override defaults
    ...components,
  }
}