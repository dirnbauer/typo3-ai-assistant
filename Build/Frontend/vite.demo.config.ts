import { defineConfig, mergeConfig } from 'vite';
import { here, sharedConfig } from './vite.shared.ts';

/**
 * The demo module, built the way a THIRD PARTY builds against the runtime.
 *
 * Nothing from React or the runtime is bundled: `react`, `react-dom` and the
 * JSX runtime are external and rewritten to the runtime's companion modules, so
 * the browser resolves them through TYPO3's import map to the one copy in
 * `runtime.js`. This is the reference configuration for "build your own module"
 * and the proof that the contract holds.
 */
export default defineConfig(
  mergeConfig(sharedConfig(), {
    plugins: [],
    build: {
      lib: {
        entry: { 'components-demo': here('./demo/main.tsx') },
        formats: ['es'],
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime', '@webconsulting/shadcn-ui/runtime.js'],
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: 'chunks/demo-[name].js',
          paths: {
            react: '@webconsulting/shadcn-ui/react.js',
            'react-dom': '@webconsulting/shadcn-ui/react-dom.js',
            'react/jsx-runtime': '@webconsulting/shadcn-ui/jsx-runtime.js',
          },
        },
      },
    },
  }),
);
