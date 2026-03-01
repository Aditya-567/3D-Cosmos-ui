import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '3d-solar-system-globe': resolve(__dirname, 'node_modules/3d-solar-system-globe/dist/index.js')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'), // Points to the file we created in Phase 1
      name: 'PlanetLibrary', // The global variable name (for UMD builds)
      fileName: 'index',     // The output file name
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled into your library
      external: ['react', 'react-dom', 'three', 'react-router-dom', '3d-solar-system-globe'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          three: 'THREE',
          'react-router-dom': 'ReactRouterDOM'
        },
      },
    },
  },
})