const { build } = require('esbuild')
const fs = require('fs')
const path = require('path')

const transformPlugin = {
  name: 'transformPlugin',
  setup(build) {
    build.onLoad({ filter: /\.ts$/ }, async (args) => {

      const compRelativePath = args.path.split('packages\\')[1]
      const depth = compRelativePath.split(/\\|\//).length

      let contents = await fs.promises.readFile(args.path, "utf8")

      // replace @taro-ui-vue3 with relative paths
      contents = contents.replace(
        /@taro-ui-vue3\//g,
        compRelativePath.startsWith('taro-ui-vue3')
          ? `./`
          : `${'../'.repeat(depth - 1)}`
      )

      // replace img.json with img.js in toast/index.js
      if (compRelativePath.startsWith('toast')) {
        contents = contents.replace("img.json", "img.js")
      }

      return {
        contents,
        loader: 'ts',
      }
    })

    build.onEnd(result => {
      console.log(result)
      fs.rename('lib/taro-ui-vue3/index.js', 'lib/index.js', (err) => {
        if (err) throw err
      })
    })
  },
}

async function* walk(dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (
      d.isDirectory() &&
      !['__tests__', '__mocks__', 'style', 'types', 'test-utils'].includes(d.name)
    ) yield* await walk(entry);
    else if (
      d.isFile() && d.name !== 'package.json'
    ) yield entry;
  }
}

const buildLib = async () => {
  let components = []

  for await (const p of walk('./packages'))
    components.push(p)

  await build({
    entryPoints: ['packages/taro-ui-vue3/index.ts'].concat(components),
    format: "esm",
    minify: false,
    loader: {
      ".ts": "ts",
      ".json": "json",
      ".js": "js"
    },
    plugins: [transformPlugin],
    outdir: "lib",
    target: ['esnext'],
    define: {
      'process.env.NODE_ENV': "'development'",
    },
    tsconfig: 'tsconfig.build.json'
  })
}

buildLib()