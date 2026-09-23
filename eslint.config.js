import js from '@eslint/js';
import globals from 'globals';

/**
 * The browser code is plain ES modules served as written, so the lint rules
 * are the only build step it has. Import specifiers such as `lit`,
 * `@typo3/...` and `~labels/...` resolve through the TYPO3 import map at run
 * time and are not checked here.
 */
export default [
  js.configs.recommended,
  {
    files: ['Resources/Public/JavaScript/**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    rules: {
      eqeqeq: ['error', 'always'],
      'no-console': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': 'error',
    },
  },
  {
    files: ['Tests/JavaScript/**/*.js', 'eslint.config.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },
];
