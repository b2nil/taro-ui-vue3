# Taro UI Vue3

[![NPM version](https://img.shields.io/npm/v/taro-ui-vue3.svg)](https://npmjs.org/package/taro-ui-vue3)
[![NPM](https://img.shields.io/npm/l/taro-ui-vue3)](./LECENSE)
![David](https://img.shields.io/david/b2nil/taro-ui-vue3)
[![npm](https://img.shields.io/npm/dm/taro-ui-vue3)](https://www.npmjs.com/package/taro-ui-vue3)

<p align="center">
  <img height="150" alt="taro-ui-vue3 logo" src="./src/assets/images/logo_taro.png"/>
</p>

采用 `Vue 3.0` 重写的 [Taro UI](https://github.com/NervJS/taro-ui) 组件库。

> 组件样式和类型复用了 `Taro UI` 已有的样式和类型定义，体验使用时，可参考 [文档](https://b2nil.github.io/taro-ui-vue3/docs/introduction)。

> 所有组件均采用 `Vue 3.0` 的渲染函数编写，未使用 `Vue Template` 或 `jsx`。

### 安装

```bash
yarn add taro-ui-vue3
```

### 使用

- 按需引用组件和组件样式

  ```typescript
  import { AtButton } from 'taro-ui-vue3'
  import 'taro-ui-vue3/dist/style/components/button.scss'

  export default {
    components: {
      AtButton
    }
  }
  ```

- 语法遵照 `vue 3.0` 的语法
- 具体参数可参考 [文档](https://b2nil.github.io/taro-ui-vue3/docs/introduction)
- 亦可参考 [Demo Pages](./src/pages) 的写法

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

- 移除了 Taro UI 组件的 `className` 和 `customStyle` 属性参数，如需通过原 `className` 和 `customStyle` 的方式自定义组件样式，可直接给组件传入 `class` 和 `style` 属性
  ```html
  <at-card class="custom-class" style="height: 20px;">...</at-card>
  ```

## TODOs

- [] 组件展示页面
  - [] theme

## 已知问题

- Alipay 小程序端

  - `AtCalendar`:

    - 由于 Taro 的 `Swiper` 组件暂不支持支付宝内置 `Swiper` 组件的 `onAnimationEnd` 属性， 编译后，需手动修改 `base.axml` 中的 `<template name="tmpl_0_swiper">` 基础模板, 将 `swiper` 节点中的 `onAnimationFinish` 修改为 `onAnimationEnd`， 否则滑动切换时不能更新月份

  - `AtTextarea`:
    - 由于 Taro 的 `Textarea` 组件不支持支付宝 `textarea` 组件的 `show-count` 属性，所以字数统计不能通过设置 `:count="false"` 直接关闭， 需要手动修改编译后的 `base.axml`, 在 `<template name="tmpl_0_textarea_focus">` 和 `<template name="tmpl_0_textarea_blur">` 基础模板下的 `textarea` 节点中添加 `show-count="{{i.showCount}}"`

- 百度 Swan 小程序端 (问题较多，影响体验)

  - 部分样式失效
  - Taro Issue [#7293](https://github.com/NervJS/taro/issues/7293): Taro 3 百度小程序每次 setData 都会导致页面全量重新渲染，导致图片闪烁、输入框无法正常使用等问题

- H5 端

  - Taro 适配 Vue 3.0 的组件, 在 `@tarojs/components/dist-h5/vue3/index.js` 中通过 `initVue3Components` 方法以 `taro-xxx` 的标签注册为全局组件。使用 `render` 函数渲染节点时，需要引用 vue 3.0 提供的 `resolveComponent` 方法，先将标签 `taro-xxx` 解析为组件实例： `h(resolveComponent('taro-xxx'))`。但是 `taro-ui-vue3` 暂时没有采用 `resolveComponent` 对 h5 进行适配。

  - 为了方便起见，使用 `taro-ui-vue3` 的项目编译至 h5 时，暂时需要使用脚本先修改 `@tarojs/components/dist-h5/vue3/index.js`， 将所有组件导出，方便按需引用。然后通过 webpack 配置 `alias` 将 `@tarojs/components$` 指向 `@tarojs/components/dist-h5/vue3/index.js`。 具体 h5 编译配置方案如下：

    - 在项目的 config 目录下增加一个 h5 构建脚本: [h5-building-script.js](./config/h5-building-script.js)

    - 将 `package.json` 下的 `build:h5` 命令修改为：
      `"build:h5": "node ./config/h5-building-script.js && taro build --type h5",`

    - 在 [config/index.js](./config/index.js) 中的 `h5` 下添加 webpack `alias` 设置：

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

## License

[MIT](./LICENSE)

## Credits

- [Taro UI](https://github.com/NervJS/taro-ui)
- [taro-ui-vue](https://github.com/psaren/taro-ui-vue)
- [vuetify](https://github.com/vuetifyjs/vuetify)
