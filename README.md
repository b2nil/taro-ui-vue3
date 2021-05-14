# Taro UI Vue3

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![NPM version](https://img.shields.io/npm/v/taro-ui-vue3.svg)](https://npmjs.org/package/taro-ui-vue3)
[![NPM](https://img.shields.io/npm/l/taro-ui-vue3)](./LECENSE)
![David](https://img.shields.io/david/b2nil/taro-ui-vue3)
[![npm](https://img.shields.io/npm/dm/taro-ui-vue3)](https://www.npmjs.com/package/taro-ui-vue3)

<p align="center">
  <img height="150" alt="taro-ui-vue3 logo" src="./demo/src/assets/images/logo_taro.png"/>
</p>

采用 `Vue 3.0` 重写的 [Taro UI](https://github.com/NervJS/taro-ui) 组件库。

> 组件复用了 `Taro UI` 已有的样式和类型定义。

> 所有组件均采用 `Vue 3.0` 的渲染函数编写。

### 安装

```bash
yarn add taro-ui-vue3
```

### 使用
- 全局引用组件和样式
  - 引用全部组件和样式
  ```typescript
  import { createApp } from 'vue'
  import { createUI } from 'taro-ui-vue3'

  // 引用全部组件样式
  import 'taro-ui-vue3/dist/style/index.scss'
  
  const App = createApp({
    onShow(options) { },
  })

  // 引用全部组件
  const tuv3 = createUI()
  App.use(tuv3)

  export default App
  ```

  - 引用部分组件和样式
  ```typescript
  import { createApp } from 'vue'
  import { createUI } from 'taro-ui-vue3'
  import { 
    AtButton, 
    AtInput, 
    AtTabs 
  } from 'taro-ui-vue3/lib'

  // 引用上述组件对应的样式文件
  import 'taro-ui-vue3/dist/style/components/button.scss'
  import 'taro-ui-vue3/dist/style/components/input.scss'
  import 'taro-ui-vue3/dist/style/components/tabs.scss'

  const App = createApp({
    onShow(options) { },
  })
  
  // 引用部分组件
  const tuv3 = createUI({
    AtButton, 
    AtInput, 
    AtTabs
  })
  App.use(tuv3)

  export default App
  ```

- 按需引用组件和组件样式

  ```typescript
  import { AtButton } from 'taro-ui-vue3/lib'
  import 'taro-ui-vue3/dist/style/components/button.scss'

  export default {
    components: {
      AtButton
    }
  }
  ```

- 完全遵照 `vue 3.0` 语法，组件具体参数请参考 [文档](https://b2nil.github.io/taro-ui-vue3/docs/introduction)，亦可参考 [Demo](./packages/demo/src/pages) 的写法

- H5 端

  - 为了方便起见，使用 `taro-ui-vue3` 的项目编译至 h5 时，暂时需要使用脚本先修改 `@tarojs/components/dist-h5/vue3/index.js`， 将所有组件导出，方便按需引用。

  - 然后通过 webpack 配置 `alias` 将 `@tarojs/components$` 指向 `@tarojs/components/dist-h5/vue3/index.js`。 具体 h5 编译配置方案如下：

    - 在项目的 config 目录下增加一个 h5 构建脚本: [h5-building-script.js](./packages/demo/config/h5-building-script.js)

    - 将 `package.json` 下的 `build:h5` 命令修改为：
      `"build:h5": "node ./config/h5-building-script.js && taro build --type h5",`

    - 在 `config/index.js` 中的 `h5` 下添加 webpack `alias` 设置：

    ```typescript
    h5: {
      webpackChain(chain) {
        chain.resolve.alias
          .set(
            '@tarojs/components$',
            '@tarojs/components/dist-h5/vue3/index.js'
          )
      }
    }
    ```


### 体验 UI Demo

可用手机访问 https://b2nil.github.io/taro-ui-vue3-demo/ 体验 `h5` 版本。

或者：

- `clone` [taro-ui-vue3-demo](https://b2nil.github.io/taro-ui-vue3) 项目到本地
- 运行 `yarn install` 安装依赖
- 根据希望体验的平台，运行相关命令：
  ```json
  "dev:weapp": "taro build --type weapp --watch",
  "dev:swan": "npm run build:swan -- --watch",
  "dev:alipay": "npm run build:alipay -- --watch",
  "dev:tt": "npm run build:tt -- --watch",
  "dev:h5": "npm run build:h5 -- --watch",
  "dev:qq": "npm run build:qq -- --watch",
  "dev:jd": "npm run build:jd -- --watch",
  ```
- 在微信/百度/Alipay/QQ/京东/浏览器等开发工具中导入编译后的相关项目

### 与 Taro UI 的差异

- 移除了 Taro UI 组件的 `className` 和 `customStyle` 属性，可直接给组件传入 `class` 和 `style` 属性，自定义部分组件样式。
  ```html
  <at-card 
    class="custom-class" 
    style="height: 20px;"
  >
    ...
  </at-card>
  ```

## TODOs

- [] 组件展示页面
  - [] theme

## License

[MIT](./LICENSE)

## Credits

- [Taro UI](https://github.com/NervJS/taro-ui)
- [taro-ui-vue](https://github.com/psaren/taro-ui-vue)
- [vuetify](https://github.com/vuetifyjs/vuetify)
