# SegmentedControl 分段器

---
由至少 2 个分段控件组成，用作不同视图的显示，可自定义文字大小，配色。

## 使用指南

在 Taro 文件中引入组件

```typescript
import { AtSegmentedControl } from 'taro-ui-vue3'
```

**组件依赖的样式文件（仅按需引用时需要）**

```scss
@import "taro-ui-vue3/dist/style/components/segmented-control.scss";
```

## 一般用法
说明：

* 该组件为受控组件，开发者需要通过 onClick 事件来更新 current 值变化，current 与 onClick 函数必填



```html
<template>
  <view>
    <AtSegmentedControl
      @click="handleClick"
      :current="current1"
      :values="tabList2"
    />
    <view class='tab-content'>标签 {{ current1 + 1 }} 的内容</view>
  </view>
</template>
<script>
export default {
  name: 'AtSegmentedControlDemo',
  data() {
    return {
      current1: 0,
      tabList2: ['标签页1', '标签页2', '标签页3'],
    }
  },
  methods: {
    handleClick(value) {
      this.current1 = value
    }
  }
}
</script>
```


## 自定义颜色、字体大小

```html
<AtSegmentedControl
  @click="handleClick"
  selectedColor='#FF4949'
  fontSize='30'
  :current="current"
  :values="['标签页1', '标签页2', '标签页3']"
  @click="handleClick"
/>
```

## 禁用

```html
<AtSegmentedControl
  disabled
  :values="['标签页1', '标签页2', '标签页3']"
  @click="handleClick"
  :current="current"
/>
```


## 参数

| 参数       | 说明     | 类型    | 可选值     | 默认值   |
| ---------- | ------- | ------- | ------- | -------- |
| current | 当前选中的`tab`索引值，从 0 开始计数  | `Number`  | - | `0` |
| color     | 背景颜色与选中标签字体的颜色  | `String` | - | `#fff` |
| selectedColor  | 选中的标签背景色与边框颜色  | `String` | - | `#6190E8` |
| values | 选项数组，值是字符串，eg: ['标签页1', '标签页2' ] | `Array`  | - | `false` |
| disabled | 是否禁止点击 | Boolean  | - | false |
| fontSize | 字体大小，单位 h5 为 `rem`，小程序为 `rem` | `Number | String`  | - | `28` |

## 事件

| 事件名称 | 说明          | 返回参数  |
|---------- |-------------- |---------- |
| onClick | 点击触发事件，开发者需要通过 onClick 事件来更新 current 值变化，onClick 函数必填  | 选中 tab 列表索引值  |
