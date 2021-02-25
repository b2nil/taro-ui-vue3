require('esbuild').buildSync({
  entryPoints: ['src/index.ts'],
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