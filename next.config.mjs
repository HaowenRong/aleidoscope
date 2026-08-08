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
    qualities: [20, 75],
  }
};

export default nextConfig;
