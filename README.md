# Taro UI Vue3
采用 `Vue 3.0` 重写的 [Taro UI](https://github.com/NervJS/taro-ui) 组件库。

> 本项目属于学习模仿项目，旨在学习 `Vue 3.0` 和 `Taro 3.0` 这两个最新发布的框架，同时为个人小程序项目提供基于 `Vue 3.0` 的组件。

> 所有组件样式和类型均复用了 `Taro UI` 已有的样式和类型定义，体验使用时，可参考 [Taro UI 的文档](https://taro-ui.jd.com/#/docs/introduction)。

> 所有组件均采用 `Vue 3.0` 的渲染函数写成，未使用 `Vue Template` 或 `jsx`。

> 本项目还参考了 [taro-ui-vue](https://github.com/psaren/taro-ui-vue)。

> 目前组件只在微信小程序端试用过，其他端的使用仍然存在问题。

## 组件重写进度
- [x] accordion
- [x] action-sheet
- [x]  activity-indicator
- [x]  avatar
- [x]  badge
- [x]  button
- [x]  calendar
- [x]  card
- [x]  checkbox
- [x]  countdown
- [x]  curtain
- [x]  divider
- [x]  drawer
- [x]  fab
- [x]  flex
- [x]  float-layout
- [x]  form
- [x]  grid
- [x]  icon
- [x]  image-picker
- [x]  indexes
- [x]  input
- [x]  input-number
- [x]  list
- [x]  load-more
- [x]  loading
- [x]  message
- [x]  modal
- [x]  nav-bar
- [x]  noticebar
- [x]  pagination
- [x]  progress
- [x]  radio
- [x]  range
- [x]  rate
- [x]  search-bar
- [x]  segmented-control
- [x]  slider
- [x]  steps
- [x]  swipe-action
- [x]  switch
- [x]  tab-bar
- [x]  tabs
- [x]  tabs-pane
- [x]  tag
- [x]  textarea
- [x]  timeline
- [x]  toast

## TODOs
 - [] 组件展示页面
 - [] 兼容 h5
 - [] 解决已知问题

## 已知问题
1. [#4](https://github.com/b2nil/taro-ui-vue3/issues/4) 日历组件不能选取日期

## Event Handling
- 使用 Vue 模板时，回调函数如果需要传入参数，可以采用以下方式：
   1. `:onClick="handleClick.bind(this, 'value')"`
   2. `@click="handleClick('value', $event)"`
```vue
<template>
   <AtButton :onClick="handleClick.bind(this, 'value')"/> //OK
   <AtButton @click="handleClick('value', $event)"/>      //OK
   <AtInput @click="handleChange.bind(this, 'value')"/>  // 不能触发事件处理回调函数
</template>
```

## License
[MIT](./LICENSE)