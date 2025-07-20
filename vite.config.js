// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,            // or whatever port you’re running on
    proxy: {
      // intercept any request starting with /api
      '/api': {
        // send it to balldontlie’s host (no /api/v1 here)
        target: 'https://www.balldontlie.io',
        changeOrigin: true,
        secure: false,      // accept self‑signed / https
        /**
         * rewrite “/api/players”  →  “/api/v1/players”
         */
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
      },
    },
  },
})
