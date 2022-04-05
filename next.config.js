/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
}

module.exports = withPWA({
  nextConfig,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
  i18n,
  images: {
    domains: ['sbar-images.s3.eu-north-1.amazonaws.com'],
  },
})
