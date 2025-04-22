import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  theme: {
    extend: {
      aspectRatio: {
        square: '1 / 1',
      }
    }
  },
  extend: {
    animation: {
      'spin-slow': 'spin 15s linear infinite',
    },
  }
  
})
