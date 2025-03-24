import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/on-my-grind/', // This should match your repository name
  plugins: [react()],
});