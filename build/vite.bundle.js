const vite = require("vite")
const pkg = require("../package.json")
const shell = require('shelljs')
const vuePlugin = require('@vitejs/plugin-vue')

const {
  resolveFile,
  transformTags,
  isMiniAppNativeTag,
  removeCommentVnode,
  transformAssetUrls,
  transformPropAttributes
} = require("./shared")

const peerDeps = Object.keys(pkg.peerDependencies)

const genVuePluginOptions = (
  nodeTransforms,
  transformAssetUrls,
  isCustomElement
) => {
  let compilerOptions = {
    mode: "module",
    optimizeImports: true,
    comments: false,
    nodeTransforms
  }

  if (isCustomElement) {
    compilerOptions = {
      ...compilerOptions,
      isCustomElement
    }
  }

  return {
    template: {
      ssr: false,
      transformAssetUrls,
      compilerOptions,
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
    outDir: 'dist',
    emptyOutDir: false,
    sourcemap: true,
    lib: {
      entry: resolveFile(pkg.source),
      formats: ['es'],
    },
    rollupOptions: {
      external: peerDeps,
      treeshake: true
    },
    // See Rollup options docs for more details
    // Options to pass on to @rollup/plugin-commonjs
    commonjsOptions: {
      include: /\/node_modules\//
    },
    minify: false,
    brotliSize: false
  }
}

const miniappConfig = {
  ...baseUserConfig,
  plugins: [
    vuePlugin(
      genVuePluginOptions(
        [removeCommentVnode, transformPropAttributes],
        transformAssetUrls,
        isMiniAppNativeTag
      )
    )
  ],
  build: {
    ...baseUserConfig.build,
    lib: {
      ...baseUserConfig.build.lib,
      fileName: "index"
    }
  }
}

const h5Config = {
  ...baseUserConfig,
  define: {
    'process.env.TARO_ENV': 'process.env.TARO_ENV'
  },
  plugins: [
    vuePlugin(
      genVuePluginOptions(
        [transformTags(true), transformPropAttributes],
        transformAssetUrls
      )
    ),
  ],
  build: {
    ...baseUserConfig.build,
    lib: {
      ...baseUserConfig.build.lib,
      fileName: "index.h5"
    }
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

async function renameFileNames() {
  shell.mv('dist/index.es.js', pkg.module)
  shell.mv('dist/index.es.js.map', pkg.module + '.map')
  shell.mv('dist/index.h5.es.js', pkg["main:h5"])
  shell.mv('dist/index.h5.es.js.map', pkg["main:h5"] + '.map')
}

async function build() {
  await vite.build(miniappConfig)
  await vite.build(h5Config)
  await copyStyle()
  await copyTypes()
  await renameFileNames()
}

build()