import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'cosmo-ui': resolve(__dirname, 'node_modules/3d-solar-system-globe/dist/index.js')
    }
  },
  build: {
    chunkSizeWarningLimit: 8000,
  },
})