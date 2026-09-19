import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';
import { here } from './vite.shared.ts';

export default defineConfig({
  // Tailwind runs in the test build too, so `tailwind.css?inline` is the real
  // stylesheet: the shadow-root property fallback is a transform over
  // Tailwind's own output and a Tailwind upgrade that changed its shape must
  // fail a test rather than a backend.
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      '@': here('./src'),
      '@webconsulting/shadcn-ui/runtime.js': here('./src/runtime.ts'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [here('./tests/setup.ts')],
    include: [here('./tests/**/*.test.{ts,tsx}')],
    css: true,
  },
});
