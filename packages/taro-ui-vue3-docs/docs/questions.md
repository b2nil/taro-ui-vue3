# 常见问题

----

本章节收集了网友常问问题，提问之前请先阅读该章节

## 出现xx问题怎么办？

在提问前，建议升级 `taro` 和 `taro-ui-vue3` 至最新版本，仍有问题请按模板提交 [Issue](https://github.com/NervJS/taro-ui/issues/new/choose)

## H5 模式下编译报错？

如果出现类似 `Could not find module View in @tarojs/components` 的问题，请在进行如下设置：
- 在项目的 `config` 目录下增加一个 h5 构建脚本: [h5-building-script.js](https://github.com/b2nil/taro-ui-vue3/blob/master/config/h5-building-script.js)
- 将项目 `package.json` 下的 `build:h5` 命令修改为： `"build:h5": "node ./config/h5-building-script.js && taro build --type h5"`
-  在 `config/index.js` 中的 `h5` 下添加 webpack `alias` 设置：
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

## 支付宝小程序端部分组件功能异常

- AtCalendar:

  - 由于 Taro 的 `Swiper` 组件暂不支持支付宝内置 `Swiper` 组件的 `onAnimationEnd` 属性， 编译后，需手动修改 `base.axml` 中的 `<template name="tmpl_0_swiper">` 基础模板, 将 `swiper` 节点中的 `onAnimationFinish` 修改为 `onAnimationEnd`， 否则滑动切换时不能更新月份

- AtTextarea:

  - 由于 Taro 的 `Textarea` 组件不支持支付宝 `textarea` 组件的 `show-count` 属性，所以字数统计不能通过设置 `:count="false"` 直接关闭， 需要手动修改编译后的 `base.axml`, 在 `<template name="tmpl_0_textarea_focus">` 和 `<template name="tmpl_0_textarea_blur">` 基础模板下的 `textarea` 节点中添加 `show-count="{ { i.showCount } }"`


## 如何自定义样式？

请查看 [「自定义主题」](https://taro-ui.aotu.io/#/docs/customizetheme) 章节

## 自定义样式为什么没有生效（H5 生效，微信小程序没生效）？

`taro-ui-vue3` 自定义样式覆盖小程序组件样式使用到了 `globalClass` 这个微信小程序特性，由于微信小程序的限制，自定义的样式需要在 `page` 页面内使用，不能基于第三方组件再进行一层封装，这样做样式会无效。并且确保小程序调试基础库在 `v2.2.3` 以上。

## 如何修改边框、下划线样式？

边框下划线有些组件是使用 `::after` 和 `::before` 伪元素，在微信开发者工具中审查不到，但是实际是存在的，建议用 H5 模式审查样式。
