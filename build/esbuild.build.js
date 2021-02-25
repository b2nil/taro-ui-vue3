const { build } = require('esbuild')
const fs = require('fs')
const path = require('path')

const toastPlugin = {
  name: 'toast',
  setup(build) {
    build.onLoad({ filter: /toast\\index.ts$/ }, async (args) => {
      const text = await fs.promises.readFile(args.path, "utf8")
      const contents = text.replace("img.json", "img.js")
      return {
        contents,
        loader: 'ts',
      }
    })
  },
}

async function* walk(dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory() && d.name !== '__tests__') yield* await walk(entry);
    else if (d.isFile()) yield entry;
  }
}

const buildLib = async () => {
  let components = []
  let composables = []
  let utils = []

  for await (const p of walk('./src/components'))
    components.push(p)

  for await (const p of walk('./src/composables'))
    composables.push(p)

  for await (const p of walk('./src/utils'))
    utils.push(p)

  await build({
    entryPoints: ['src/index.ts'].concat(components, composables, utils),
    format: "esm",
    minify: false,
    loader: {
      ".ts": "ts",
      ".json": "json",
      ".js": "js"
    },
    plugins: [toastPlugin],
    outdir: "lib",
    target: ['esnext'],
    define: {
      'process.env.NODE_ENV': "'development'",
    },
    tsconfig: 'tsconfig.build.json'
  })
}

buildLib()