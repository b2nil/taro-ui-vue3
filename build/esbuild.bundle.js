const { build } = require('esbuild')
var shell = require('shelljs')

const copyFilePluin = {
  name: "copyFilePluin",
  setup(build) {
    build.onEnd(result => {
      shell.cp('-R', 'packages/style/', 'dist/style')
    })
  }
}

build({
  entryPoints: ['packages/taro-ui-vue3/index.ts'],
  mainFields: ['module'],
  format: "esm",
  minify: false,
  sourcemap: true,
  bundle: true,
  loader: {
    ".ts": "ts",
    ".json": 'json',
    ".js": 'js'
  },
  external: [
    'vue',
    '@tarojs/taro',
    '@tarojs/components',
  ],
  plugins: [copyFilePluin],
  outfile: 'dist/index.esm.js',
  target: ['esnext'],
  define: {
    'process.env.NODE_ENV': "'development'",
  },
  tsconfig: 'tsconfig.rollup.json'
})