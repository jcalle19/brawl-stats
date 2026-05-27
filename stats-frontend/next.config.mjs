/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ai6j31goj4.ufs.sh',
      },
    ],
  },
};

export default nextConfig;
