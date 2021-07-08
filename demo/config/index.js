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
  plugins: [
    ['E:\\miniprogram\\taro-ui-vue3\\lib\\plugin\\index.js']
  ],
  defineConstants: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: true
  },
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/style': path.resolve(__dirname, '..', 'src/style'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    'taro-ui-vue3/dist/style': path.resolve(__dirname, '../..', 'dist/style'),
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
      chain.resolve.alias
        .set('taro-ui-vue3$', path.resolve(__dirname, '../..', 'dist/index.esm.js'))
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['taro-ui-vue3'],
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
        .set('taro-ui-vue3$', path.resolve(__dirname, '../..', 'dist/index.h5.js'))
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
