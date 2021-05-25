# Taro UI Vue3

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![NPM version](https://img.shields.io/npm/v/taro-ui-vue3.svg)](https://npmjs.org/package/taro-ui-vue3)
[![NPM](https://img.shields.io/npm/l/taro-ui-vue3)](./LECENSE)
![npm bundle size](https://img.shields.io/bundlephobia/min/taro-ui-vue3)
[![npm](https://img.shields.io/npm/dm/taro-ui-vue3)](https://www.npmjs.com/package/taro-ui-vue3)

<p align="center">
  <img height="150" alt="taro-ui-vue3 logo" src="./demo/src/assets/images/logo_taro.png"/>
</p>

采用 `Vue 3.0` 重写的 [Taro UI](https://github.com/NervJS/taro-ui) 组件库

> 组件复用了 `Taro UI` 已有的样式和类型定义。

### 安装

```bash
# 使用 yarn
yarn add taro-ui-vue3

# 或使用 npm
npm i taro-ui-vue3
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

- 完全遵照 `vue 3.0` 语法，组件具体参数请参考 [文档](https://b2nil.github.io/taro-ui-vue3/docs/introduction)，亦可参考 [Demo](./demo/src/pages) 的写法


### 体验 UI Demo

- 可用手机访问 https://b2nil.github.io/taro-ui-vue3-demo/ 体验 `h5` 版本。

- 亦或将 [Demo 仓库](https://github.com/b2nil/taro-ui-vue3-demo) `clone` 到本地自行编译，体验各个小程序平台的版本。

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

### 开发
- 安装依赖

  运行 `yarn bootstrap` 安装所有依赖，并创建`packages`目录下所有组件以及`demo`目录之间的符号链接。

- 修改文件

  - 组件位于 [`packages`](./packages/) 目录，如需修改组件，找到相关组件目录即可。

  - 组件测试文件位于各个组件目录下的 `__tests__`目录中。测试用的一些 mock 文件和功能位于 [`packages/test-utils`](./packages/test-utils) 目录。

  - 文档文件位于 [`website/docs`](./website/docs) 目录，关于组件使用方面的修改，只需修改该目下的相关文件即可。

  - 文档网站采用 `vitepress` 开发，网站组件位于 [`website/.vitepress`](./website/.vitepress) 目录，如需修改网站相关功能和主题，则需修改该目录下的相关文件。

  - demo 位于 [`demo`](./demo/) 目录。

- 预览 demo
  - 预览小程序 demo：

    运行 `yarn demo:weapp` (以微信为例，其他平台可更改以下 `scripts` 下的命令)
  - 预览 h5 demo：

    `demo` 设置了从项目根目录下 `dist` 和 `lib` 中引用组件和部分功能，因此采用了 `esbuild` 在开发时进行快速构建和打包。

    但 h5 平台使用 `esbuild` 打包的组件时，会报错。因此，预览 h5 效果时，需要先使用 rollup 打包。

    运行 `yarn build` 使用 `rollup` 打包组件，然后运行 `cd demo && yarn dev:h5` 预览

- 预览文档

  运行 `yarn dev:docs` 预览文档。
  

## TODOs

- [] 组件展示页面
  - [] theme

## License

[MIT](./LICENSE)

## Credits

- [Taro UI](https://github.com/NervJS/taro-ui)
- [taro-ui-vue](https://github.com/psaren/taro-ui-vue)
- [vuetify](https://github.com/vuetifyjs/vuetify)
