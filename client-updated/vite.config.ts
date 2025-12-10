import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // ADD THIS SECTION
  server: {
    port: 3000,
    // Optional: If you want Vite to automatically open the browser when you run 'npm run dev'
    open: true
  }
})
