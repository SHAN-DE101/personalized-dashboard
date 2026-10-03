/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Prevent ESLint warnings/errors from failing production builds on Vercel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Prevent type errors from blocking production builds
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
    ],
  },
};

export default nextConfig;
