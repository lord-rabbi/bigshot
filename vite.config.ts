import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', 
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
   optimizeDeps: {
    include: ["pdfjs-dist/build/pdf.worker.mjs"],
  },
});
