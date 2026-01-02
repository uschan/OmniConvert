import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'OmniConvert Pro',
        short_name: 'OmniConvert',
        description: 'Professional Unit Converter & Calculation Suite',
        theme_color: '#050505',
        background_color: '#050505',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'https://pic.wildsalt.me/storage/img/logo/convert.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'https://pic.wildsalt.me/storage/img/logo/convert.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'https://pic.wildsalt.me/storage/img/logo/convert.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
      }
    })
  ],
  server: {
    host: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  }
});