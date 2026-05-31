/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'service',
            value: '(?<service>.*)',
          },
        ],
        destination: '/contact?service=:service',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
