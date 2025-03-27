import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: '../API/wwwroot',
    chunkSizeWarningLimit: 1500,
    emptyOutDir: true
  },
  server: {
    port: 3000
  },
  plugins: [react()],
  define: {
    'process.env': process.env
  }
})
