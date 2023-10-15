import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const url="https://e-commerce-aaoa-kjnttclmp-prateeky477.vercel.app" || "https://e-commerce-aaoa-git-main-prateeky477.vercel.app"  || "e-commerce-aaoa.vercel.app" || "https://e-commerce-aaoa.vercel.app"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": url
    },
    watch: {
      usePolling: true,
    },
  }
})


