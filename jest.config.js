const {
  isCustomElement,
  removeCommentVnode,
  transformAssetUrls
} = require("./build/shared")

module.exports = {
  preset: 'ts-jest',
  rootDir: __dirname,
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'tsx', 'ts'],
  transformIgnorePatterns: [],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    "<rootDir>/packages/test-utils/setupTests.ts"
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    // '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@tarojs/components$': "<rootDir>/packages/test-utils/@tarojs/components/index.ts",
    '^@tarojs/taro$': "<rootDir>/packages/test-utils/@tarojs/taro/index.ts",
    '@tarojs/runtime': "<rootDir>/node_modules/@tarojs/runtime/dist/index"
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '<rootDir>/packages/**/__tests__/*.spec.ts'
  ],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/packages/**/*.ts',
    '<rootDir>/packages/**/*.vue',
    '!<rootDir>/packages/utils/*.ts',
    '!<rootDir>/packages/composables/*.ts',
    '!<rootDir>/packages/types/*.ts',
    '!<rootDir>/packages/test-utils/**/*.ts',
    '!**/node_modules/**'
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'jest.tsconfig.json',
      // work around: https://github.com/kulshekhar/ts-jest/issues/748#issuecomment-423528659
      diagnostics: {
        ignoreCodes: [151001],
      }
    },
    'vue-jest': {
      babelConfig: false,
      tsconfig: 'jest.tsconfig.json',
      template: {
        transformAssetUrls,
        compilerOptions: {
          isNativeTag: isCustomElement,
          nodeTransforms: [removeCommentVnode]
        }
      }
    }
  },
  maxConcurrency: 4,
  roots: ['<rootDir>/packages/']
}
