module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Disable or modify rules that are too strict for educational code
    'no-console': 'off', // Allow console.log for educational purposes
    'max-classes-per-file': 'off', // Allow multiple classes in examples
    'no-plusplus': 'off', // Allow ++ and -- operators
    'no-nested-ternary': 'off', // Allow nested ternary for examples
    'no-shadow': 'off', // Allow shadowing for educational clarity
    'no-restricted-syntax': 'off', // Allow for...of and other syntax for examples
    'guard-for-in': 'off', // Simpler for...in examples
    'no-prototype-builtins': 'off', // Simpler code examples
    'no-else-return': 'off', // Allow else after return for clarity
    'curly': ['error', 'all'], // Require braces for all control statements
    'prettier/prettier': 'error', // Enable prettier rules
  },
  plugins: [
    'prettier',
  ],
  overrides: [
    {
      files: ['**/*.test.js', '**/*.spec.js'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
    {
      files: ['examples/**/*.js'],
      rules: {
        'no-console': 'off', // Definitely allow console in examples
      },
    },
  ],
};
