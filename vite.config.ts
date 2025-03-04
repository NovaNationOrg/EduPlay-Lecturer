import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import {fileURLToPath, URL } from 'node:url'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
            VitePWA({ 
              injectRegister: 'script',
              manifest:{
                icons:[
                {
                  "src": "/web-app-manifest-512x512.png",
                  "sizes": "512x512",
                  "type": "image/png",
                  "purpose": "any maskable"
                }
              ],
                theme_color:"#181818",
              },
              registerType: 'autoUpdate',
              devOptions:{
                enabled:true
              } ,
              workbox:{
                globPatterns: ['**/*.{ts,css,html,ico,png,svg}'],
                runtimeCaching:[{
                  urlPattern: ({ url }) => {
                      return url.pathname.startsWith("/")
                  },
                  handler: "CacheFirst" as const,
                  options:{
                    cacheName: "general-cache",
                    cacheableResponse: {
                      statuses: [0,200]
                    }
                  }
                }]
              }
            }
            )
  ],resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  
})
