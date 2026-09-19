import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

/**
 * Lint for what the compiler cannot see: the rules of hooks and a short list
 * of correctness rules. Types are `tsc`'s job and `npm run lint` runs it first.
 */
export default tseslint.config(
  { ignores: ['**/Dist/**', '**/node_modules/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat['recommended-latest'],
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        queueMicrotask: 'readonly',
        requestAnimationFrame: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        FormData: 'readonly',
        File: 'readonly',
        FileList: 'readonly',
        Response: 'readonly',
        AbortController: 'readonly',
        AbortSignal: 'readonly',
        DOMException: 'readonly',
        MutationObserver: 'readonly',
        ResizeObserver: 'readonly',
        CustomEvent: 'readonly',
        KeyboardEvent: 'readonly',
        PointerEvent: 'readonly',
        DragEvent: 'readonly',
        EventTarget: 'readonly',
        Element: 'readonly',
        CSSStyleSheet: 'readonly',
        ShadowRoot: 'readonly',
        HTMLElement: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLTextAreaElement: 'readonly',
        HTMLFormElement: 'readonly',
        customElements: 'readonly',
        TextDecoder: 'readonly',
        TextEncoder: 'readonly',
        ReadableStream: 'readonly',
        Intl: 'readonly',
        globalThis: 'readonly',
        navigator: 'readonly',
        location: 'readonly',
        Location: 'readonly',
        Window: 'readonly',
        MediaQueryList: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-explicit-any': 'error',
      eqeqeq: ['error', 'always'],
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
  {
    // The launcher is hand-written ES module JavaScript loaded straight by the
    // backend: no build step, no types, and that is the point of it.
    files: ['Resources/Public/JavaScript/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
);
