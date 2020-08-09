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
   - [x] basic
   - [] view
   - [x] action
   - [] form
   - [x] layout
   - [x] navigation
   - [] theme
   - [x] advanced
 - [] 兼容 h5
 - [] 移除 `classnames` 依赖

## 使用 `vue` 的 `computed` 替代 `classnames` 依赖
```ts
type Classes = Record<string, boolean | undefined>

// 顺序
// - destructuring
// - dynamic key
// - string key

const classes = computed((): Classes => ({
   ...(!props.coloredBorder ? colorData.value.colorClasses.value : {}),
  [`at-alert--border-${props.border}`]: !!props.border || undefined,
  'at-alert': true,
  'at-alert--border': Boolean(props.border),
  'at-alert--dense': props.dense,
  'at-alert--text': props.text,
}))
```

## License
[MIT](./LICENSE)