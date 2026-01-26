module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
  },

  /* =====================
     DEFAULT: JavaScript
     ===================== */
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:jsdoc/recommended',
    'plugin:security/recommended',
    'plugin:prettier/recommended',
  ],

  plugins: ['jest', 'jsdoc', 'security', 'import', 'prettier'],

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

  /* =====================
     TYPESCRIPT ONLY
     ===================== */
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],

      parser: '@typescript-eslint/parser',

      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },

      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],

      plugins: ['@typescript-eslint'],

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

    /* =====================
       TEST FILES
       ===================== */
    {
      files: ['**/*.test.*', '**/*.spec.*'],
      rules: {
        'max-lines': 'off',
        'no-magic-numbers': 'off',
      },
    },
  ],

  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    'coverage/',
    '*.config.js',
    '*.config.cjs',
    '*.d.ts',
  ],
};
