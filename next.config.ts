import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.literal.club",
      },
    ],
  },
  transpilePackages: ["next-mdx-remote"],
};

export default withPayload(nextConfig);
