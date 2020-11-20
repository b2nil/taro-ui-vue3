module.exports = {
  globals: {
    // work around: https://github.com/kulshekhar/ts-jest/issues/748#issuecomment-423528659
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [151001],
      },
    },
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!@tarojs)"
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(t|j)sx?$': [
      'babel-jest', {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: 'current',
              },
            },
          ],
          '@babel/preset-typescript',
        ],
        plugins: [
          '@vue/babel-plugin-jsx',
          '@babel/plugin-proposal-class-properties',
          "@babel/plugin-transform-modules-commonjs"
        ],
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'vue'],
  // u can change this option to a more specific folder for test single component or util when dev
  // for example, ['<rootDir>/packages/input']
  roots: ['<rootDir>/packages/taro-ui-vue3/activity-indicator'],
}
