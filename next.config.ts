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
  webpack: (config, { isServer }) => {
    // Handle node: protocol imports for Keystatic
    config.resolve.alias = {
      ...config.resolve.alias,
      'node:fs': 'fs',
      'node:fs/promises': 'fs/promises',
      'node:path': 'path',
      'node:url': 'url',
      'node:crypto': 'crypto',
      'node:util': 'util',
    };
    
    return config;
  },
};

const withMDX = createMDX({
  // Add any remark/rehype plugins here if needed
})

export default withMDX(nextConfig);
