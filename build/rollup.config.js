import NodePath from 'path'
import RollupJson from '@rollup/plugin-json'
import RollupNodeResolve from '@rollup/plugin-node-resolve'
import RollupCommonjs from '@rollup/plugin-commonjs'
import RollupTypescript from 'rollup-plugin-typescript2'
import RollupSass from 'rollup-plugin-sass'
import RollupCopy from 'rollup-plugin-copy'
import Package from '../package.json'
import VuePlugin from 'rollup-plugin-vue'

// import { terser } from 'rollup-plugin-terser'
// const babelConfig = require('../babel.config')
const DEV_ENV = process.env.LIB_ENV === 'dev'

const resolveFile = (path) => {
  return NodePath.resolve(__dirname, '..', path)
}

const externalPackages = [
  'vue',
  '@tarojs/components',
  '@tarojs/runtime',
  '@tarojs/taro'
]
const extensions = ['.js', '.ts', '.vue', '.jsx', '.tsx']
export default {
  input: resolveFile(Package.source),
  output: [
    {
      file: resolveFile(Package.main),
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: resolveFile(Package.module),
      format: 'es',
      sourcemap: true,
    },
    {
      file: resolveFile(Package.browser),
      format: 'umd',
      name: 'taro-ui-vue3',
      sourcemap: true,
      globals: {
        vue: 'Vue',
        '@tarojs/components': 'components',
        '@tarojs/taro': 'Taro',
      },
    },
  ],
  external: externalPackages,
  plugins: [
    VuePlugin({
      css: false,
      preprocessStyles: true,
    }),
    RollupNodeResolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
      extensions,
    }),
    RollupCommonjs({
      include: /\/node_modules\//,
    }),
    RollupJson(),
    RollupSass(),
    // !DEV_ENV && terser(),
    RollupTypescript({
      tsconfig: resolveFile('tsconfig.json'),
      include: ['*.ts', '**/*.ts'],
      tsconfigOverride: {
        compilerOptions: {
          declaration: false,
        },
        'exclude': [
          'node_modules',
          '__tests__',
        ],
      },
      abortOnError: false
    }),
    RollupCopy({
      targets: [
        {
          src: 'packages/taro-ui-vue3/style/**/*',
          dest: 'dist/style'
        }
      ]
    })
  ],
}
