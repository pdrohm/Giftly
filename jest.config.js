module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-vector-icons|react-native-gesture-handler|react-native-screens|react-native-safe-area-context|@react-native-async-storage|react-native-mmkv|react-native-toast-message|react-native-barcode-creator|@react-native-community|@react-native-firebase)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testMatch: [
    '<rootDir>/__tests__/**/*.{ts,tsx}',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/e2e',
    '<rootDir>/__tests__/utils/test-utils.tsx',
  ],
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  testTimeout: 10000,
};
