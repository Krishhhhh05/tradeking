import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://apexapin.theplatformapi.com/api/apigateway',
        changeOrigin: true,
        secure: true, // Ensure HTTPS is used properly
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
