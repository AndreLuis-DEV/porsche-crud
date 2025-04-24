//porsche-crud/frontend/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Porta alternativa para evitar conflitos
    strictPort: true,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5001', // Ajuste para a porta backend
        changeOrigin: true
      }
    }
  }
})