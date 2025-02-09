import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    https: {
      key: './../certs/localhost.key',
      cert: './../certs/localhost.crt',
    }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      devOptions: {
        enabled: true,
        type: 'module'
      },
      manifest: {
        id: "pwa-demo-app",
        short_name: "PWA",
        name: "PWA Demo",
        icons: [
          {
            src: "assets/icons/pwa-64x64.png",
            sizes: "64x64",
            type: "image/png"
          },
          {
            src: "assets/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "assets/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "assets/icons/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff",
        categories: ["productivity"],
        protocol_handlers: [
          {
            protocol: "web+pwademo",
            url: "/%s"
          }
        ]
      },
      workbox: {

      }
    })]
})
