import { fileURLToPath } from 'node:url';
import type { UserConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export const here = (path: string): string => fileURLToPath(new URL(path, import.meta.url));

export const DIST = here('../../Resources/Public/JavaScript/Dist');

/**
 * What both builds agree on.
 *
 * The output is deliberately boring, because CI asserts it byte for byte: no
 * hash in a file name, no sourcemap, and `process.env.NODE_ENV` pinned so
 * React's development-only machinery never enters the bundle.
 */
export function sharedConfig(): UserConfig {
  return {
    plugins: [tailwindcss()],
    resolve: {
      alias: { '@': here('./src') },
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    build: {
      outDir: DIST,
      emptyOutDir: false,
      target: 'es2022',
      sourcemap: false,
      cssCodeSplit: false,
      minify: 'oxc',
    },
  };
}
