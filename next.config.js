/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.pixabay.com', 'lh3.googleusercontent.com'],
    },
    pwa: {
        fallbacks: {
            image: '/static/images/fallback.png',
            document: '/other-offline',  // если вы хотите использовать другую страницу для запасного маршрута, а не /_offline
            // font: '/static/font/fallback.woff2',
            // audio: ...,
            // video: ...,
        },
        // ...
    },
}
const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NEXT_DEV_PROJECT === 'development',
})

module.exports = withPWA(nextConfig)
