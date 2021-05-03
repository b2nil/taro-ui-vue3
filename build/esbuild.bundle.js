const fs = require('fs')

require('esbuild').buildSync({
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
  outfile: 'dist/index.esm.js',
  target: ['esnext'],
  define: {
    'process.env.NODE_ENV': "'development'",
  },
  tsconfig: 'tsconfig.rollup.json'
})

fs.copyFile('packages/style', 'dist/style', (err) => {
  if (err) throw err
})