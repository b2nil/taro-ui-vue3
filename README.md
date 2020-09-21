# Taro UI Vue3
[![NPM version](https://img.shields.io/npm/v/taro-ui-vue3.svg)](https://npmjs.org/package/taro-ui-vue3)
[![NPM](https://img.shields.io/npm/l/taro-ui-vue3)](./LECENSE)
![David](https://img.shields.io/david/b2nil/taro-ui-vue3)
[![npm](https://img.shields.io/npm/dm/taro-ui-vue3)](https://www.npmjs.com/package/taro-ui-vue3)

<p align="center">
  <img height="150" alt="taro-ui-vue3 logo" src="./src/assets/images/logo_taro.png"/>
</p>

采用 `Vue 3.0` 重写的 [Taro UI](https://github.com/NervJS/taro-ui) 组件库。

> 组件样式和类型复用了 `Taro UI` 已有的样式和类型定义，体验使用时，可参考 [Taro UI 的文档](https://taro-ui.jd.com/#/docs/introduction)。

> 所有组件均采用 `Vue 3.0` 的渲染函数写成，未使用 `Vue Template` 或 `jsx`。

> 组件只在小程序端试用过，目前百度小程序适配问题较多，h5 端的使用仍然存在问题。

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
- 目前没有单独文档，除了[与 Taro UI 有差异](#与-Taro-UI-的差异)的地方外, 具体参数可参考 [Taro UI 的文档](https://taro-ui.jd.com/#/docs/introduction)
- 亦可参考 [Demo Pages](./src/pages) 的写法

### 体验 UI Demo
- `clone` 项目到本地
- 运行 `yarn install` 安装依赖
- 运行 `yarn dev:weapp`
- 在微信开发工具中导入 `dist/weapp`

### 与 Taro UI 的差异
- 移除了 Taro UI 组件的 `className` 和 `customStyle` 属性参数，如需通过原 `className` 和 `customStyle` 的方式自定义组件样式，可直接给组件传入 `class` 和 `style` 属性
  ```html
  <at-card class="custom-class" style="height: 20px;">...</at-card>
  ```

## TODOs
 - [] 组件展示页面
   - [] theme

 - [] 兼容 h5
    

## 已知问题 - 暂时需要等 Taro 更新支持
- Alipay 小程序端
  - `AtCalendar`: 由于 Taro 的 `Swiper` 组件暂不支持支付宝内置 `Swiper` 组件的 `onAnimationEnd` 属性， 编译后，需手动修改 `base.axml` 中的 `<template  name="tmpl_0_swiper">` 基础模板, 将 `swiper` 节点中的 `onAnimationFinish` 修改为 `onAnimationEnd`， 否则滑动切换时不能更新月份

  - `AtTextarea`: 由于 Taro 的 `Textarea` 组件不支持支付宝 `textarea` 组件的 `show-count` 属性，所以字数统计不能通过设置 :count="false" 直接关闭， 需要手动修改编译后的 `base.axml`, 在 `<template name="tmpl_0_textarea_focus">` 和 `<template name="tmpl_0_textarea_blur">` 基础模板下的 `textarea` 节点中添加 `show-count="{{i.showCount}}"`

- 百度 Swan 小程序端
  - 部分样式失效
  - Taro Issue [#7293](https://github.com/NervJS/taro/issues/7293): Taro 3 百度小程序每次 setData 都会导致页面全量重新渲染，导致图片闪烁、输入框无法正常使用等问题

- H5 端
  - 由于所有组件均采用渲染函数编写，编译为 h5 后，`taro-ui-vue3` 的组件无法找到从 `@tarojs/components` 中引入的组件， 如 `View`、`Text` 等
  - 若采用 `taro-core-view` 等标签替换对应的 `View` 等组件，使用 render 函数渲染节点后, onTap 不能触发点击事件 [Taro issue #7329](https://github.com/NervJS/taro/issues/7329)
  - 部分组件功能异常，打开浏览器开发工具后才能正常工作，如 `AtInput`, `AtSearchBar`, `AtSlider` 等

## License
[MIT](./LICENSE)

## Credits
- [Taro UI](https://github.com/NervJS/taro-ui)
- [taro-ui-vue](https://github.com/psaren/taro-ui-vue)
