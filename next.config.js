/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.pixabay.com', 'lh3.googleusercontent.com'],
    },
}
const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NEXT_DEV_PROJECT === 'development',
})

module.exports = withPWA(nextConfig)
