module.exports = {
  preset: 'ts-jest',
  rootDir: __dirname,
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'tsx', 'ts'],
  transformIgnorePatterns: [],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@tarojs/components$': "<rootDir>/packages/test-utils/@tarojs/components/index.js",
    // '^@tarojs/taro$': "<rootDir>/node_modules/@tarojs/taro/h5.js",
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '<rootDir>/packages/**/__tests__/*.spec.ts'
  ],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/packages/**/*.ts',
    '!**/node_modules/**'
  ],
  globals: {
    'ts-jest': {
      tsconfig: './jest.tsconfig.json',
      // work around: https://github.com/kulshekhar/ts-jest/issues/748#issuecomment-423528659
      diagnostics: {
        ignoreCodes: [151001],
      }
    },
  },
  maxConcurrency: 8,
  roots: ['<rootDir>/packages/']
}
