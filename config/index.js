const path = require('path')

const config = {
  projectName: 'taro-ui-vue3',
  date: '2020-7-16',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [],
  defineConstants: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: true
  },
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/style': path.resolve(__dirname, '..', 'src/style'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/composables': path.resolve(__dirname, '..', 'src/composables'),
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'vue3',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    webpackChain(chain) {
      chain.module
        .rule('typescript')
        .test(/.\ts$/)
        .use('ts-loader')
        .loader('ts-loader')
        .tap(options => ({
          ...options,
          appendTsSuffixTo: [/\.vue$/]
        }))
        .end()
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    webpackChain(chain) {
      chain.resolve.alias
        .set('@tarojs/components$', path.resolve(__dirname, '..', 'node_modules/@tarojs/components/dist-h5/vue3/index.js'))
        .set('@tarojs/components/dist/taro-components/taro-components.css', path.resolve(__dirname, '..', 'node_modules/@tarojs/components/dist/taro-components/taro-components.css'))
    },
    router: {
      mode: 'browser'
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
