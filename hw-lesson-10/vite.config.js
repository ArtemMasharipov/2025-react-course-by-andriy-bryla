import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Central helper for absolute paths
const r = p => resolve(__dirname, p)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': r('src'),
      '@app': r('src/app'),
      '@components': r('src/components'),
      '@layouts': r('src/layouts'),
      '@pages': r('src/pages'),
      '@router': r('src/router'),
      '@providers': r('src/providers'),
      '@contexts': r('src/contexts'),
      '@shared': r('src/shared'),
    },
  },
})
