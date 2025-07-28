import { withPayload } from '@payloadcms/next/withPayload'
import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.literal.club",
      },
    ],
  },
};

const withMDX = createMDX({
  // Add any remark/rehype plugins here if needed
})

export default withPayload(withMDX(nextConfig));
