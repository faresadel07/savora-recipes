import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'robots.txt'],
      manifest: {
        name: 'Zaytoun',
        short_name: 'Zaytoun',
        description:
          'A quiet, curated corner of the internet for recipes worth cooking.',
        theme_color: '#13110F',
        background_color: '#FFFFFF',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icon-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Make sure the big mealdb cache is precached so the app works offline.
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,woff,json}'],
        // 4 MB ceiling per asset is plenty; our biggest is the recipe cache.
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/www\.themealdb\.com\/.*$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'mealdb-images',
              expiration: { maxEntries: 700, maxAgeSeconds: 60 * 60 * 24 * 90 },
            },
          },
          {
            urlPattern: /^https:\/\/forkify-api\.jonas\.io\/.*$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'forkify-api',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
          },
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash',
              expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: /^https:\/\/img\.youtube\.com\/.*$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'youtube-thumbnails',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: /^https:\/\/archive\.org\/services\/img\/.*$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'archive-covers',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 90 },
            },
          },
        ],
      },
    }),
  ],
});
