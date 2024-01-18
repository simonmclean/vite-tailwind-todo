import { defineConfig } from "vite";
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import react from "@vitejs/plugin-react-swc";

const pwaConfig: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
  manifest: {
    name: 'Vitey Todo App',
    short_name: 'Todo',
    description: 'Todo app made with Vite, React, Typescript and Tailwind',
    theme_color: '#0f172a',
    icons: [
      {
        "src": "pwa-64x64.png",
        "sizes": "64x64",
        "type": "image/png"
      },
      {
        "src": "pwa-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "pwa-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      },
      {
        "src": "maskable-icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "maskable"
      }
    ]
  }
}

export default defineConfig({
  plugins: [
    react(),
    VitePWA(pwaConfig)
  ],
});
