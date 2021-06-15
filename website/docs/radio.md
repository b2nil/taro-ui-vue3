# Radio 单选框

---
单选框组件

## 使用指南

在 Taro 文件中引入组件


```typescript
import { AtRadio } from 'taro-ui-vue3'
```


**组件依赖的样式文件（仅按需引用时需要）**


```scss
@import "taro-ui-vue3/dist/style/components/radio.scss";
```


## 一般用法

说明：

* 该组件为受控组件，开发者可`v-model` 来更新 `modelValue` 值变化。

* 由于小程序组件化的限制，`AtRadio` 嵌套在 `AtForm` 或原生小程序组件 `Form` 中的时候，`onSubmit` 事件获得的 event 中的 `event.detail.value` 始终为空对象，开发者要获取数据，可以自行在页面的 `state` 中获取


```html
<template>
  <page header-title="Radio 单选框">
    <panel
      title="基础用法"
      no-padding
    >
      <view class="radio-container">
        <at-radio
          :options="radioOptions"
          v-model="radioValue"
        />
      </view>
    </panel>
  </page>
</template>

<script>
export default {
  name: 'AtRadioDemo',
  data() {
    return {
      radioValue: 'option1',
      radioOptions: [
        { label: '单选项一', value: 'option1' },
        { label: '单选项二', value: 'option2' },
        { label: '单选项三', value: 'option3' }
      ],
    }
  }
}
</script>
```


## 参数

| 参数       | 说明     | 类型    | 可选值     | 默认值   |
| ---------- | ---------| ------- | ---------- | -------- |
| modelValue | 输入框当前值，用户可通过 `v-model` 来更新值，必填   | `String`  | - | - |
| options  | `RadioOption<T>` 选项列表，`RadioOption<T>` 字段详细看下表  | `Array<RadioOption<T>>` | - | - |

## `RadioOption` 字段详解

| 参数  | 说明        | 类型    | 可选值   | 默认值   | 可选或必填
| ---------- | ------- | ------- | ---- | -------- |-------- |
| value | 选项标识符，必须保证唯一  | String  | - | - | 必填 |
| label  | 选项标题  | String | - | - | 必填|
| desc  | 选项描述，显示在标题下方的文字  | String | - | - | 可选|
| disabled  | 是否禁止点击  | Boolean | - | false | 可选|

## 事件

| 事件名称 | 说明          | 返回参数  |
|---------- |-------------- |---------- |
| onUpdate:modelValue | 使用 `v-model` 时自动触发 | 当前 `RadioOption` 的值 `value`  |
