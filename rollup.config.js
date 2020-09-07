import NodePath from 'path'
import RollupJson from '@rollup/plugin-json'
import RollupNodeResolve from '@rollup/plugin-node-resolve'
import RollupCommonjs from '@rollup/plugin-commonjs'
import RollupTypescript from 'rollup-plugin-typescript2'
import RollupCopy from 'rollup-plugin-copy'
import RollupSass from 'rollup-plugin-sass'

import Package from './package.json'

const resolveFile = path => NodePath.resolve(__dirname, path)
const externalPackages = [
  'vue',
  '@tarojs/components',
  '@tarojs/runtime',
  '@tarojs/taro',
]

export default {
  input: resolveFile(Package.source),
  output: [
    {
      file: resolveFile(Package.main),
      format: 'cjs',
      sourcemap: true
    },
    {
      file: resolveFile(Package.module),
      format: 'es',
      sourcemap: true
    },
    {
      file: resolveFile(Package.browser),
      format: 'umd',
      name: 'taro-ui-vue3',
      sourcemap: true,
      globals: {
        'vue': 'vue',
        '@tarojs/components': 'components',
        '@tarojs/taro': 'Taro'
      }
    }
  ],
  external: externalPackages,
  plugins: [
    RollupSass(),
    RollupNodeResolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    RollupCommonjs({
      include: /\/node_modules\//
    }),
    RollupJson(),
    RollupTypescript({
      tsconfig: resolveFile('tsconfig.rollup.json')
    }),
    RollupCopy({
      targets: [
        {
          src: 'src/style',
          dest: 'dist'
        }
      ]
    })
  ]
}
