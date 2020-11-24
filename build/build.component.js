/* eslint-disable */
const path = require('path')
const pkg = require('../package.json')
const rollup = require('rollup')
const typescript = require('rollup-plugin-typescript2')
const pluginVue = require('rollup-plugin-vue')
const nodeResolve = require('@rollup/plugin-node-resolve')
const pluginJson = require('@rollup/plugin-json')
const pluginCJS = require('@rollup/plugin-commonjs')

const { getPackages } = require('@lerna/project')
const { terser } = require('rollup-plugin-terser')

const isDev = process.env.LIB_ENV === 'dev'
const deps = Object.keys(pkg.peerDependencies)
const resolveFile = p => path.resolve(__dirname, "..", p)
const externalPackages = [
  'vue',
  '@tarojs/taro',
  '@tarojs/components'
]

const runBuild = async () => {
  let index = 0
  const pkgs = await getPackages()
  const inputs = pkgs
    .map(pkg => pkg.name)
    .filter(name =>
      name.includes('taro-ui-vue3')
    ).slice(process.argv[2], process.argv[3])

  build(inputs[index])

  async function build(name) {
    if (!name) return
    const inputOptions = {
      input: path.resolve(__dirname, `../packages/taro-ui-vue3/${name.split('@taro-ui-vue3/')[1]}/index.ts`),
      plugins: [
        nodeResolve(),
        !isDev && terser(),
        pluginJson(),
        pluginCJS({
          include: /\/node_modules\//
        }),
        pluginVue({
          target: 'browser',
          css: false,
        }),
        typescript({
          tsconfig: resolveFile('tsconfig.json'),
          tsconfigOverride: {
            compilerOptions: {
              declaration: false,
            },
            'exclude': [
              'node_modules',
              '__tests__',
            ],
          },
          abortOnError: false,
        }),
      ],
      external: externalPackages
      // external(id) {
      //   return /^vue/.test(id)
      //     || /^@taro-ui-vue3/.test(id)
      //     || deps.some(k => new RegExp('^' + k).test(id))
      // },
    }
    const outOptions = {
      format: 'es',
      file: `lib/${name.split('@taro-ui-vue3/')[1]}/index.js`,
      paths(id) {
        if (/^@taro-ui-vue3/.test(id)) {
          return id.replace('@taro-ui-vue3', '..')
        }
      },
    }

    const bundle = await rollup.rollup(inputOptions)
    console.log(name, 'done')
    await bundle.write(outOptions)
    index++
    if (index < inputs.length) {
      await build(inputs[index])
    }
  }
}

runBuild()
