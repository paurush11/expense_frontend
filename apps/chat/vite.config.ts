import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode)
    },
    build: {
      lib: {
        entry: resolve(__dirname, 'src/main.tsx'),
        name: 'chat',
        fileName: () => 'chat.js',
        formats: ['iife']
      },
      outDir: 'dist',
      assetsDir: 'assets',
    }
  }
})
