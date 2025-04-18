import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Ice-breaking-game/', // 💥 Required for GitHub Pages
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
});
