/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['res.cloudinary.com', 'img.icons8.com'],
  },
}

module.exports = nextConfig
