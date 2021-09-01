const vite = require("vite")
const vuePlugin = require('@vitejs/plugin-vue')

const {
  readFile,
  cleanFile,
  writeToFile,
  resolveFile,
  transformTags,
  transformAssetUrls,
  taroInternalComponents
} = require("./shared")

const vueEntries = [
  'packages/accordion/index.vue',
  'packages/action-sheet/index.vue',
  'packages/action-sheet/body/item/index.vue',
  'packages/activity-indicator/index.vue',
  'packages/avatar/index.vue',
  'packages/badge/index.vue',
  'packages/button/index.vue',
  'packages/calendar/index.vue',
  'packages/card/index.vue',
  'packages/checkbox/index.vue',
  'packages/countdown/index.vue',
  'packages/curtain/index.vue',
  'packages/divider/index.vue',
  'packages/drawer/index.vue',
  'packages/fab/index.vue',
  'packages/flex/index.vue',
  'packages/flex/item/index.vue',
  'packages/float-layout/index.vue',
  'packages/form/index.vue',
  'packages/grid/index.vue',
  'packages/icon/index.vue',
  'packages/image-picker/index.vue',
  'packages/indexes/index.vue',
  'packages/input/index.vue',
  'packages/input-number/index.vue',
  'packages/list/index.vue',
  'packages/list/item/index.vue',
  'packages/load-more/index.vue',
  'packages/loading/index.vue',
  'packages/message/index.vue',
  'packages/modal/action/index.vue',
  'packages/modal/content/index.vue',
  'packages/modal/header/index.vue',
  'packages/modal/index.vue',
  'packages/nav-bar/index.vue',
  'packages/noticebar/index.vue',
  'packages/pagination/index.vue',
  'packages/progress/index.vue',
  'packages/radio/index.vue',
  'packages/range/index.vue',
  'packages/rate/index.vue',
  'packages/search-bar/index.vue',
  'packages/segmented-control/index.vue',
  'packages/skeleton/index.vue',
  'packages/slider/index.vue',
  'packages/steps/index.vue',
  'packages/swipe-action/index.vue',
  'packages/switch/index.vue',
  'packages/tab-bar/index.vue',
  'packages/tabs/index.vue',
  'packages/tabs/pane/index.vue',
  'packages/tag/index.vue',
  'packages/textarea/index.vue',
  'packages/timeline/index.vue',
  'packages/toast/index.vue',
  'packages/virtual-scroll/index.vue'
]

const tsEntries = [
  'packages/composables/index.ts',
  'packages/utils/index.ts',
  'packages/plugin/index.ts'
]

const externalPackages = [
  "@tarojs/components",
  "@tarojs/taro",
  "@tarojs/shared",
  "vue",
  "@taro-ui-vue3/utils",
  "@taro-ui-vue3/composables",
  "@taro-ui-vue3/types"
]

const genOutputFilename = (source) => source
  .replace('packages', 'lib')
  .replace(/(\.ts|\.vue)/g, '.js')

const genOutDir = (source) => source
  .replace('packages', 'lib')
  .replace(/(\/index\.ts|\/index\.vue)/g, '')

const vuePluginOptions = {
  template: {
    ssr: false,
    transformAssetUrls,
    compilerOptions: {
      mode: "module",
      optimizeImports: true,
      comments: false,
      nodeTransforms: [transformTags()]
    }
  }
}

const genViteConfig = (source, isVue) => ({
  define: {
    'process.env.TARO_ENV': 'process.env.TARO_ENV'
  },
  resolve: {
    extensions: ['.json', '.js', '.ts', '.vue']
  },
  plugins: [
    isVue && vuePlugin(vuePluginOptions)
  ],
  build: {
    target: 'esnext',
    outDir: genOutDir(source),
    emptyOutDir: false,
    lib: {
      entry: resolveFile(source),
      fileName: "index",
      formats: ['es'],
    },
    rollupOptions: {
      external: externalPackages,
      treeshake: true
    },
    commonjsOptions: {
      include: /\/node_modules\//
    },
    minify: false,
    brotliSize: false
  }
})

// transform @taro-ui-vue3 to relative import path
// and resolve taro built-in tags based on TARO_ENV
async function transformFinalCode(source) {

  const filename = genOutputFilename(source)
  const esFilename = filename.replace(".js", ".es.js")
  const depth = filename.split(/\\|\//).length

  let code = readFile(esFilename)

  // eg: @taro-ui-vue3/utils in lib/flex/item/index.js
  // depths of lib/flex/item/index.js = 4
  // remove head and tail: 4 - 2 = flex/item = ../../
  code = code.replace(
    /@taro-ui-vue3\//g,
    `${'../'.repeat(depth - 2)}`
  )

  if (source.endsWith('.vue')) {
    const resolveReg = /(_resolveComponent.*)\("(.+)"\);/g
    const matches = code.match(resolveReg) || []

    for (const m of matches) {
      const func = m.replace(resolveReg, "$1")
      const tag = m.replace(resolveReg, "$2")

      if (taroInternalComponents.includes(tag)) {
        const r = `process.env.TARO_ENV === "h5" ? ${func}("taro-${tag}") : "${tag}";`
        code = code.replace(m, r)
      }
    }
  }

  writeToFile(code, filename)
  cleanFile(esFilename)
}

async function genLibEntryFile() {
  const libEntry = 'lib/index.js'
  const source = 'packages/taro-ui-vue3/index.ts'
  const pattern = /'@taro-ui-vue3\/(.+)\/index\.vue'/g

  let code = readFile(source)

  code = code
    .replace("import type { App } from 'vue'\r\n\r\n", "")
    .replace(": Record<string, any>", "")
    .replace(": App", "")
    .replace(pattern, "\"./$1\"")

  writeToFile(code, libEntry)
}

async function buildComponents() {
  for (const entry of vueEntries.concat(tsEntries)) {
    const componentConfig = genViteConfig(entry, entry.endsWith('.vue'))
    await vite.build(componentConfig)
    await transformFinalCode(entry)
  }
  await genLibEntryFile()
}

buildComponents()