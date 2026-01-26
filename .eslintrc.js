import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jestPlugin from 'eslint-plugin-jest';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import securityPlugin from 'eslint-plugin-security';
import prettierPlugin from 'eslint-plugin-prettier';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Base JavaScript configuration
  {
    name: 'javascript-mastery/base',
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        browser: true,
        node: true,
        es2021: true,
        jest: true,
      },
    },
    plugins: {
      import: importPlugin,
      jest: jestPlugin,
      jsdoc: jsdocPlugin,
      security: securityPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      /* General JS rules (SAFE for students) */
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-debugger': 'error',
      'import/prefer-default-export': 'off',
      'import/no-default-export': 'error',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 100,
          semi: true,
        },
      ],
    },
  },

  // TypeScript overrides
  {
    name: 'javascript-mastery/typescript',
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
    },
  },

  // Test files overrides
  {
    name: 'javascript-mastery/tests',
    files: ['**/*.test.*', '**/*.spec.*'],
    rules: {
      'max-lines': 'off',
      'no-magic-numbers': 'off',
      'no-console': 'off',
    },
  },

  // Example and exercise files overrides (more permissive)
  {
    name: 'javascript-mastery/examples',
    files: ['**/examples/**', '**/exercises/**'],
    rules: {
      'no-console': 'off',
      'no-var': 'off',
      'prefer-const': 'off',
      'max-classes-per-file': 'off',
      'no-plusplus': 'off',
      'no-nested-ternary': 'off',
      'no-shadow': 'off',
      'no-restricted-syntax': 'off',
      'guard-for-in': 'off',
      'no-prototype-builtins': 'off',
      'no-else-return': 'off',
      'import/no-default-export': 'off',
      'security/detect-object-injection': 'off',
      'security/detect-possible-timing-attacks': 'off',
    },
  },

  // Ignore patterns
  {
    name: 'javascript-mastery/ignores',
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      '*.config.js',
      '*.config.cjs',
      '*.d.ts',
    ],
  },
];
