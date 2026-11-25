import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages serves the site from /<repo-name>/; the deploy workflow sets BASE_PATH.
  // Locally and on a custom domain it stays "/".
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()]
});
