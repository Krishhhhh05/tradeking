import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all API requests starting with /api to the real API
      '/api': {
        target: 'https://apexapin.theplatformapi.com/api/apigateway',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Remove /api prefix
      }
    }
  }
})
