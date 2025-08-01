import { MDXRemote } from 'next-mdx-remote/rsc'
import { Aside } from './aside'
import MdxImage from './img'
import { AccessibleLink } from '../ui/accessible-link'

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
    <h2 className="font-sans uppercase text-black text-3xl">{children}</h2>
  ),
  h2: ({ children }: any) => (
    <h3 className="font-sans uppercase text-black text-2xl">{children}</h3>
  ),
  h3: ({ children }: any) => (
    <h4 className="font-sans uppercase text-black text-xl">{children}</h4>
  ),
  h4: ({ children }: any) => (
    <h5 className="font-sans uppercase text-black text-lg">{children}</h5>
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
  }
}

export function MDXContent({ content }: KeystaticContentProps) {
  return (
    <MDXRemote
      source={content}
      components={components}
    />
  )
}