import { defineConfig, mergeConfig } from 'vite';
import { here, sharedConfig } from './vite.shared.ts';

/**
 * The runtime: React once, for everybody.
 *
 * `runtime.js` is the module every shadcn app imports from, and the three
 * companions (`react.js`, `react-dom.js`, `jsx-runtime.js`) exist so an app's
 * own bundler can leave `react` external and point it here through
 * `output.paths` — see CONTRACT.md. Rollup puts the one copy of React into a
 * shared chunk under `chunks/` and every entry imports it from there.
 */
export default defineConfig(
  mergeConfig(sharedConfig(), {
    build: {
      lib: {
        entry: {
          runtime: here('./src/runtime.ts'),
          react: here('./src/shims/react.ts'),
          'react-dom': here('./src/shims/react-dom.ts'),
          'jsx-runtime': here('./src/shims/jsx-runtime.ts'),
        },
        formats: ['es'],
      },
      rollupOptions: {
        external: [],
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: 'chunks/[name].js',
          assetFileNames: 'runtime.[ext]',
        },
      },
    },
  }),
);
