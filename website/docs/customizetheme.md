# 自定义主题

----

`taro-ui-vue3` 目前只有一套默认的主题配色，为满足业务和品牌上多样化的视觉需求，UI 库支持一定程度的样式定制。（请确保微信基础库版本在 v2.2.3 以上）

目前支持三种自定义主题的方式，可以进行不同程度的样式自定义：

- SCSS 变量覆盖
- globalClass 全局样式类
- 配置 style 属性

> 请确保微信基础库版本在 v2.2.3+，具体原因请查看官方文档 [微信小程序组件样式说明](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html)

## SCSS 主题变量覆盖

`taro-ui-vue3` 的组件样式是使用 SCSS 编写的，如果你的项目中也使用了 SCSS，那么可以直接在项目中改变 `taro-ui-vue3` 的样式变量。

新建一个主题样式文件，例如 `custom-variables.scss`，并写入以下内容：（如有需要，可使用[自定义主题生成器](https://nervjs.github.io/taro-ui-theme-preview/)）

```scss
/* 改变主题变量，具体变量名可查看 taro-ui/dist/style/variables/default.scss 文件 */
$color-brand: #6190E8;

/* 引入 Taro UI 默认样式 */
@import "taro-ui-vue3/dist/style/index.scss";
```

> 覆写的变量，需要在引入 `taro-ui-vue3` 默认样式之前定义，[默认主题变量命名](https://github.com/b2nil/taro-ui-vue3/blob/master/src/style/variables/default.scss)

之后在项目的入口文件中引入以上的样式文件即可（无需重复引入组件的默认样式）

```typescript
/* app.js */
import './custom-variables.scss'
```

> **Slider, Switch 组件暂时不支持 SCSS 变量覆盖的方式自定义主题**

## 全局样式类

全局样式类是微信小程序定义的一套用于修改组件内部样式的方案。如果希望组件外样式类能够影响组件内部，可以在组件构造器中的 `options.addGlobalClass` 字段设置为 true（`taro-ui-vue3` 的组件均开启了此特性）。这个特性从小程序基础库版本 `2.2.3` 开始支持。

> `addGlobalClass` 这个 API 只对 Page 上的 class 起作用。换言之，如果在自定义的组件中使用 `taro-ui-vue3`，是无法在自定义组件内部通过 `全局样式类` 的方式去更改组件样式的。

> 当开放了全局样式类，存在外部样式无意间污染组件样式的风险。由于 `taro-ui-vue3` 的组件样式采用 BEM 的命名方式，从一定程度上避免了样式污染的问题。

```html
<!-- /* page/index/index.vue */ -->
<script>
import Taro from '@tarojs/taro'

import { AtButton } from 'taro-ui-vue3'

import "./index.scss"

export default { 
  render () {
    return <AtButton class='my-button' />
  }
}
</script>

<style>
/**
 * .at-button 为组件内部类名，只需要写一样的类名去覆盖即可，但需要注意层级问题。（使用方式跟传统 CSS 一样）
 **/
.my-button.at-button {
  color: red;
}
</style>

```
