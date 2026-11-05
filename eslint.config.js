import js from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-undef': 'warn',
      // Base rule misreports TS-only constructs; replaced by @typescript-eslint/no-unused-vars below
      'no-unused-vars': 'off',
      'no-shadow': 'warn',
      '@stylistic/semi': ['warn', 'always'],
      '@stylistic/quotes': ['warn', 'single'],
      '@stylistic/indent': ['warn', 2],
      '@stylistic/keyword-spacing': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    }
  },
  {
    files: ['**/*.ts'],
    rules: {
      'no-undef': 'off',
    }
  }
];
