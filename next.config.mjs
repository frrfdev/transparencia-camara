/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'www.camara.leg.br',
      },
      {
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
};

export default nextConfig;
