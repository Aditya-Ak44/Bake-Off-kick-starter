import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Bake-Off-kick-starter/',
  resolve: {
    alias: {
      "@": path.resolve("root", "./src"),
    },
  }, // Replace with your repo name
})
