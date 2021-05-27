const vite = require("vite")
const path = require("path")
const pkg = require("../package.json")
const vuePlugin = require('@vitejs/plugin-vue')

const peerDeps = Object.keys(pkg.peerDependencies)
const resolveFile = (p) => path.resolve(__dirname, '..', p)

const taroInternalComponents = [
  "view", "icon", "progress", "rich-text", "text", "button", "checkbox", "checkbox-group",
  "form", "input", "label", "picker", "picker-view", "picker-view-column", "radio", "radio-group",
  "slider", "switch", "cover-image", "textarea", "cover-view", "movable-area", "movable-view",
  "scroll-view", "swiper", "swiper-item", "navigator", "audio", "camera", "image", "live-player",
  "video", "canvas", "ad", "web-view", "block", "map", "open-data", "custom-wrapper", "canvas"
]

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

const isCustomElement = (tag) => taroInternalComponents.includes(tag)

function removeCommentVnode(node, ctx) {
  if (node.type === 3 /* NodeTypes.COMMENT */) {
    ctx.removeNode(node)
  }
}

function transformH5Tags(node, ctx) {
  removeCommentVnode(node, ctx)

  if (
    node.type === 1 /* NodeTypes.ELEMENT */ &&
    taroInternalComponents.includes(node.tag) /* is built-in tag*/
  ) {
    // miniapp tags should be prefixed with `taro-` 
    // and be resolved by `resolveComponent` in h5
    node.tag = `taro-${node.tag}`
    node.tagType = 1 /* ElementTypes.COMPONENT */
  }
}

const genVuePluginOptions = (nodeTransforms, isNativeTag, isCustomElement) => {
  return {
    template: {
      ssr: false,
      transformAssetUrls: {
        video: ['src', 'poster'],
        'live-player': ['src'],
        audio: ['src'],
        source: ['src'],
        image: ['src'],
        'cover-image': ['src']
      },
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

const resolveComponentPlugin = () => {
  return {
    name: 'vite:resolveComponent',

    transform(code, id) {
      if (id.endsWith(".vue")) {
        const regExp = /_resolveComponent\("(.+)"\)/g
        const match = code.match(regExp) || []

        for (const resolved of match) {
          const tag = resolved.replace(regExp, "$1")

          if (taroInternalComponents.includes(tag)) {
            const to = `process.env.TARO_ENV === "h5" ? _resolveComponent("taro-${tag}") : "${tag}"`
            code = code.replace(resolved, to)
          }
        }
      }

      return {
        code,
        map: this.getCombinedSourcemap()
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
    target: 'modules',
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
      genVuePluginOptions([removeCommentVnode], isCustomElement)
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
      genVuePluginOptions([transformH5Tags]),
    ),
  ],
  build: {
    ...baseUserConfig.build,
    rollupOptions: genRollupOptions('h5')
  }
}

vite.build(miniappConfig)
vite.build(h5Config)