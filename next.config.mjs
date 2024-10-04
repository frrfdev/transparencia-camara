/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'www.camara.leg.br',
      },
    ],
  },
};

export default nextConfig;
