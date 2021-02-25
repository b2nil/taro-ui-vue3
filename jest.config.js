module.exports = {
  preset: 'ts-jest',
  rootDir: __dirname,
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'tsx', 'ts'],
  transformIgnorePatterns: [
    // "<rootDir>/node_modules/(?!@tarojs)"
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@tarojs/components$': "<rootDir>/tests/mock/tarojs_components",
    '^@tarojs/taro$': "<rootDir>/node_modules/@tarojs/taro/h5.js",
    '^@/mock/(.*)$': "<rootDir>/tests/mock/$1",
    '^@/tests/(.*)$': "<rootDir>/tests/$1",
    // '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '<rootDir>/src/components/**/__tests__/*.spec.ts',
    '<rootDir>/src/__tests__/*.spec.ts',
  ],
  coverageDirectory: '<rootDir>/tests/coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.ts',
    '<rootDir>/src/index.ts',
    '!**/node_modules/**'
  ],
  globals: {
    'ts-jest': {
      tsconfig: './jest.tsconfig.json',
      // work around: https://github.com/kulshekhar/ts-jest/issues/748#issuecomment-423528659
      diagnostics: {
        ignoreCodes: [151001],
      },
      babelConfig: {
        plugins: [
          '@vue/babel-plugin-jsx'
        ]
      }
    },
  },
  maxConcurrency: 8,
  roots: ['<rootDir>/src/components']
}
