import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // --- YOUR EXISTING ---
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google Avatars
      },

      // --- COMMON SOCIAL & COMMUNITY ---
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com', // Facebook Avatars
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com', // Twitter Images
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com', // Pinterest
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com', // Imgur
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com', // Discord
      },
      {
        protocol: 'https',
        hostname: 'media.discordapp.net', // Discord
      },

      // --- COMMON CDNs & HOSTING ---
      {
        protocol: 'https',
        hostname: '**.cloudinary.com', // Cloudinary (wildcard for all subdomains)
      },
      {
        protocol: 'https',
        hostname: '**.imgix.net', // Imgix (wildcard)
      },
      {
        protocol: 'https',
        hostname: '**.digitaloceanspaces.com', // DigitalOcean Spaces (wildcard)
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com', // AWS S3
      },
      {
        protocol: 'https',
        hostname: '**.s3.amazonaws.com', // AWS S3 (wildcard)
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com', // Shopify
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com', // Firebase Storage
      },
      {
        protocol: 'https',
        hostname: 'github.com', // GitHub (for raw content)
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com', // GitHub (for raw content)
      },
      {
        protocol: 'https',
        hostname: 'gitlab.com', // GitLab (for raw content)
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      }
    ],
  },
};

export default nextConfig;