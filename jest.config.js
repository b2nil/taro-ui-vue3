const {
  isMiniAppNativeTag,
  removeCommentVnode,
  transformAssetUrls,
} = require("./build/shared")

module.exports = async () => ({
  preset: 'ts-jest',
  rootDir: __dirname,
  extensionsToTreatAsEsm: [".ts", ".json", ".vue"],
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'tsx', 'ts'],
  transformIgnorePatterns: [],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    "<rootDir>/packages/test-utils/setupTests.ts"
  ],
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.vue$': ['vue-jest', {
      babelConfig: true,
      tsconfig: 'jest.tsconfig.json',
      template: {
        transformAssetUrls,
        compilerOptions: {
          mode: 'module',
          optimizeImports: true,
          cacheHandlers: true,
          comments: false,
          isNativeTag: isMiniAppNativeTag,
          nodeTransforms: [
            removeCommentVnode,
            function (node) {
              if (node.type === 1 && node.tag.startsWith('at-')) {
                node.tagType = 1
              }
            }
          ]
        }
      }
    }],
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
    '!<rootDir>/packages/*.d.ts',
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
    }
  },
  maxConcurrency: 4,
  roots: ['<rootDir>/packages/']
})