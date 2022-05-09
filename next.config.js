/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [{ source: "/search/:path*", destination: "/api/:path*" }];
  },
}

module.exports = nextConfig
