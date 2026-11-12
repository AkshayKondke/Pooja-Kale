import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.BASE_PATH || './',
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-motion': ['framer-motion'],
          'vendor-charts': ['recharts'],
          'vendor-icons': ['lucide-react']
        }
      }
    }
  }
});
