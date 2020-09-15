# Taro UI Vue3
[![NPM version](https://img.shields.io/npm/v/taro-ui-vue3.svg)](https://npmjs.org/package/taro-ui-vue3)
[![NPM](https://img.shields.io/npm/l/taro-ui-vue3)](./LECENSE)
![David](https://img.shields.io/david/b2nil/taro-ui-vue3)
[![npm](https://img.shields.io/npm/dm/taro-ui-vue3)](https://www.npmjs.com/package/taro-ui-vue3)

<p align="center">
  <img height="150" alt="taro-ui-vue3 logo" src="./src/assets/images/logo_taro.png"/>
</p>

采用 `Vue 3.0` 重写的 [Taro UI](https://github.com/NervJS/taro-ui) 组件库。

> 本项目属于学习模仿项目，旨在学习 `Vue 3.0` 和 `Taro 3.0` 这两个最新发布的框架，同时为个人小程序项目提供基于 `Vue 3.0` 的组件。

> 所有组件样式和类型均复用了 `Taro UI` 已有的样式和类型定义，体验使用时，可参考 [Taro UI 的文档](https://taro-ui.jd.com/#/docs/introduction)。

> 所有组件均采用 `Vue 3.0` 的渲染函数写成，未使用 `Vue Template` 或 `jsx`。

> 本项目还参考了 [taro-ui-vue](https://github.com/psaren/taro-ui-vue)。

> 目前组件只在微信小程序端试用过，其他端的使用仍然存在问题。

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
   - [x] basic
   - [x] view
   - [x] action
   - [x] form
   - [x] layout
   - [x] navigation
   - [] theme
   - [x] advanced

 - [] 兼容 h5
    - 部分组件功能异常，打开浏览器开发工具后才能正常工作，如 `AtInput`, `AtSearchBar`, `AtSlider` 等
    - Vue3 H5 中使用 render 函数渲染节点时, onTap 不能触发点击事件 [Taro issue #7329](https://github.com/NervJS/taro/issues/7329)

## License
[MIT](./LICENSE)