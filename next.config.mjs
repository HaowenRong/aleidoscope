/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    minimumCacheTTL: 14400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL.replace('https://', ''),
      }
    ],
    qualities: [40, 75, 85],
  }
};

export default nextConfig;
