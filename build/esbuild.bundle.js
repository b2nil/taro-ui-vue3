const { build } = require('esbuild')
const shell = require('shelljs')

const copyStylePluin = {
  name: "copyStylePluin",
  setup(build) {
    build.onEnd(result => {
      shell.cp('-R', 'packages/style', 'dist/style')
      shell.rm('-f', 'dist/style/package.json')
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
  plugins: [copyStylePluin],
  outfile: 'dist/index.esm.js',
  target: [
    'es6'
  ],
  define: {
    'process.env.NODE_ENV': "'development'",
  },
  tsconfig: 'tsconfig.rollup.json'
})