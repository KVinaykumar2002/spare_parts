import type { NextConfig } from "next";
import path from "node:path";
import { existsSync } from "node:fs";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirect /home to /
      { source: "/home", destination: "/", permanent: true },
      // Add more redirects as needed, e.g.:
      // { source: "/old-path", destination: "/new-path", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  // Only set in monorepos where deps live at repo root; omit on Vercel to avoid "Cannot find module next/dist/compiled/..." errors
  ...(process.env.VERCEL ? {} : { outputFileTracingRoot: path.resolve(__dirname, '../../') }),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Only add Turbopack config if loader exists and we're in dev mode
  ...(process.env.NODE_ENV === 'development' && existsSync(LOADER) ? {
    turbopack: {
      rules: {
        "*.{jsx,tsx}": {
          loaders: [LOADER]
        }
      }
    }
  } : {}),
};

export default nextConfig;
