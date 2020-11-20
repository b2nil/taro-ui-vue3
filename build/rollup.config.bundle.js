import path from 'path'
import { terser } from 'rollup-plugin-terser'
import nodeResolve from '@rollup/plugin-node-resolve'
import rollupVuePlugin from 'rollup-plugin-vue'
import rollupSassPlugin from 'rollup-plugin-sass'
import rollupCopyPlugin from 'rollup-plugin-copy'
import rollupJsonPlugin from '@rollup/plugin-json'
import rollupCommonjsPlugin from '@rollup/plugin-commonjs'
import rollupTypescriptPlugin from 'rollup-plugin-typescript2'

import pkg from '../package.json'

const isDev = process.env.LIB_ENV === 'dev'
// const deps = Object.keys(pkg.dependencies)
const resolveFile = (p) => path.resolve(__dirname, '..', p)
const externalPackages = [
  'vue',
  '@tarojs/taro',
  '@tarojs/runtime',
  '@tarojs/components'
]

export default [
  {
    input: resolveFile('packages/taro-ui-vue3/taro-ui-vue3/index.ts'),
    output: [
      {
        file: resolveFile(pkg.main),
        format: 'cjs',
        sourcemap: true
      },
      {
        file: resolveFile(pkg.module),
        format: 'es',
        sourcemap: true
      }
    ],
    external: externalPackages,
    plugins: [
      !isDev && terser(),
      nodeResolve({
        customResolveOptions: {
          moduleDirectory: 'node_modules'
        }
      }),
      rollupCommonjsPlugin({
        include: /\/node_modules\//
      }),
      rollupVuePlugin({
        target: "browser"
      }),
      rollupJsonPlugin(),
      rollupSassPlugin(),
      rollupTypescriptPlugin({
        tsconfig: resolveFile('tsconfig.json'),
        tsconfigOverride: {
          'exclude': [
            'node_modules',
            '__tests__',
          ],
        },
        abortOnError: false,
      }),
      rollupCopyPlugin({
        targets: [
          {
            src: 'packages/taro-ui-vue3/style',
            dest: 'dist'
          }
        ]
      })
    ]
  }
]