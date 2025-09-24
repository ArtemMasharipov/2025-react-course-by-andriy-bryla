import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

const createAlias = dir => resolve(import.meta.dirname, 'src', dir)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': createAlias('.'),
      '@shared': createAlias('shared'),
      '@entities': createAlias('entities'),
      '@features': createAlias('features'),
      '@widgets': createAlias('widgets'),
      '@pages': createAlias('pages'),
      '@layouts': createAlias('layouts'),
      '@app': createAlias('app'),
    },
  },
})
