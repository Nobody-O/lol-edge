import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // Register React plugin to support JSX, HMR, etc.
  plugins: [react()],

  // Development server config (useful for local testing)
  server: {
    proxy: {
      // Proxy API calls starting with /api to your Flask backend on port 5000
      // Example: fetch('/api/summoner') will forward to http://localhost:5000/api/summoner
      '/api': 'http://localhost:5000',
    },
  },
});
