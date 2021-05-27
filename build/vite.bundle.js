const vite = require("vite")
const path = require("path")
const pkg = require("../package.json")
const shell = require('shelljs')
const vuePlugin = require('@vitejs/plugin-vue')

const {
  resolveFile,
  transformTags,
  isCustomElement,
  removeCommentVnode,
  transformAssetUrls,
  taroInternalComponents
} = require("./shared")

const peerDeps = Object.keys(pkg.peerDependencies)

const outputOptions = {
  mini: {
    file: pkg.module,
    format: 'es',
    sourcemap: true
  },
  h5: {
    file: pkg['main:h5'],
    format: 'es',
    sourcemap: true
  }
}

const genRollupOptions = (key) => {
  return {
    input: resolveFile(pkg.source),
    output: outputOptions[key],
    external: peerDeps,
    treeshake: true,
    plugins: []
  }
}

const genVuePluginOptions = (nodeTransforms, transformAssetUrls, isNativeTag, isCustomElement) => {
  return {
    template: {
      ssr: false,
      transformAssetUrls,
      compilerOptions: {
        mode: "module",
        optimizeImports: true,
        comments: false,
        isNativeTag,
        isCustomElement,
        nodeTransforms
      }
    }
  }
}

const baseUserConfig = {
  define: {},
  resolve: {
    extensions: ['.json', '.js', '.ts', '.vue'],
    alias: {
      '@taro-ui-vue3/utils': resolveFile('packages/utils/index.ts'),
      '@taro-ui-vue3/composables': resolveFile('packages/composables/index.ts'),
      '@taro-ui-vue3/types': resolveFile('packages/types')
    },
  },
  // ESBuildOptions extends ESbuild's own transform options.
  esbuild: {
    exclude: [],
    treeShaking: true,
  },
  // Build options
  build: {
    target: 'esnext',
    emptyOutDir: false,
    sourcemap: true,
    lib: {
      entry: resolveFile(pkg.source),
      formats: ['es'],
    },
    // See Rollup options docs for more details
    // Options to pass on to @rollup/plugin-commonjs
    commonjsOptions: {
      include: /\/node_modules\//
    },
    minify: false
  }
}

const miniappConfig = {
  ...baseUserConfig,
  plugins: [
    vuePlugin(
      genVuePluginOptions(
        [removeCommentVnode],
        transformAssetUrls,
        isCustomElement
      )
    )
  ],
  build: {
    ...baseUserConfig.build,
    rollupOptions: genRollupOptions('mini')
  }
}

const h5Config = {
  ...baseUserConfig,
  plugins: [
    vuePlugin(
      genVuePluginOptions(
        [transformTags(true)],
        transformAssetUrls
      )
    ),
  ],
  build: {
    ...baseUserConfig.build,
    rollupOptions: genRollupOptions('h5')
  }
}

async function copyTypes() {
  shell.cp('-R', 'packages/types', 'types')
  shell.rm('-f', 'types/package.json')
}

async function copyStyle() {
  shell.cp('-R', 'packages/style', 'dist/style')
  shell.rm('-f', 'dist/style/package.json')
}

async function build() {
  await vite.build(miniappConfig)
  await vite.build(h5Config)
  await copyStyle()
  await copyTypes()
}

build()