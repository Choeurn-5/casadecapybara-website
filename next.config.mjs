/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.casadecapybara.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
    ],
  },

  // Enforce preferred canonical host: non-www permanently redirects to www.
  // This is a Next.js-level safety net. If deploying on Vercel/Netlify,
  // also configure a platform-level redirect for the non-www domain.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'casadecapybara.com' }],
        destination: 'https://www.casadecapybara.com/:path*',
        permanent: true, // HTTP 308 — preserves request method
      },
    ];
  },

  allowedDevOrigins: ['192.168.1.41'],
};

export default nextConfig;
