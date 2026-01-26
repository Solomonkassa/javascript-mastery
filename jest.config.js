/** @type {import('jest').Config} */
const config = {
  // Test environment
  testEnvironment: 'jest-environment-jsdom',
  
  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,
  
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
    '/coverage/',
    '/__mocks__/',
    '/__fixtures__/',
    'index.ts',
    '.config.js',
    '.d.ts$',
  ],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',
  
  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    'text',
    'lcov',
    'json',
    'html',
    'clover',
  ],
  
  // An array of file extensions your modules use
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node',
  ],
  
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/__tests__/$1',
    '^@config/(.*)$': '<rootDir>/config/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  
  // An array of regexp pattern strings that are matched against all module paths before those paths are to be considered 'visible' to the module loader
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/build/',
  ],
  
  // Activates notifications for test results
  notify: true,
  
  // An enum that specifies notification mode. Requires { notify: true }
  notifyMode: 'failure-change',
  
  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',
  
  // Reset the module registry before running each individual test
  resetModules: false,
  
  // A list of paths to directories that Jest should use to search for files in
  roots: [
    '<rootDir>/src',
    '<rootDir>/__tests__',
  ],
  
  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: [
    '<rootDir>/__tests__/setup/jest.setup.js',
  ],
  
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: [
    '<rootDir>/__tests__/setup/jest.setupAfterEnv.js',
    '@testing-library/jest-dom/extend-expect',
  ],
  
  // The number of seconds after which a test is considered as slow and reported as such in the results.
  slowTestThreshold: 10,
  
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
  
  // Options that will be passed to the testEnvironment
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  
  // The glob patterns Jest uses to detect test files
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
    '<rootDir>/__tests__/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  
  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
    '/__mocks__/',
    '/__fixtures__/',
  ],
  
  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testURL: 'http://localhost',
  
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-private-methods',
        '@babel/plugin-transform-runtime',
      ],
    }],
  },
  
  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    '/node_modules/(?!lodash-es|axios|uuid|moment).+\\.js$',
  ],
  
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  
  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/build/',
    '<rootDir>/coverage/',
  ],
  
  // Whether to use watchman for file crawling
  watchman: true,
  
  // Custom reporters
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'test-results',
      outputName: 'junit.xml',
    }],
  ],
};

module.exports = config;
