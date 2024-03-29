# Range 范围选择器

---
范围选择器，允许用户在一个区间中选择特定值

## 使用指南
在 Taro 文件中引入组件

```ts
import { AtRange } from 'taro-ui-vue3'
```

**组件依赖的样式文件（仅按需引用时需要）**

```scss
@import "taro-ui-vue3/dist/style/components/range.scss";
```

## 一般用法

```html
<template>
  <view class='panel__content'>
    <view class='example-item'>
      数值范围：{{ value[0] }}~{{ value[1] }}
    </view>
    <AtRange
      :min="30"
      :max="90"
      v-model="value"
    />
  </view>
</template>
<script>
export default {
  name: 'AtRangePageDemo',
  data() {
    return {
      value: [50, 60]
    }
  }
}
</script>
```

## 参数

| 参数       | 说明       | 类型    | 可选值    | 默认值   |
| ---------- | -------- | ------- | -------- | -------- |
| sliderStyle | 滑块样式 | `Object | String`  | - | - |
| railStyle | 未选中部分滑动条的样式 | `Object | String`  | - | - |
| trackStyle | 选中部分滑动条的样式 | `Object | String`  | - | - |
| modelValue | 当前取值 | `[Number, Number]`  | - | `[0, 0]` |
| min | 最小值 | `Number`  | - | `0` |
| max | 最大值 | `Number`  | - | `100` |
| blockSize | 滑块大小 | `Number`  | - | `28` |
| disabled | 是否禁用 | `Boolean`  | - | `false` |

## 事件

| 事件名称 | 说明          | 事件签名  |
|---------|--------------|----------|
| `onUpdate:modelValue` | 使用 `v-model` 更新 Slider 的值时，会自动触发。 | `(value: [number, number]) => void` |
| `onAfterChange` | 与 `onTouchend` 触发时机一致，把当前值作为参数传入。    | `(value: [number, number]) => void` |
