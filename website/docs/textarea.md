# Textarea 多行文本框

---
多行文本输入框，可控制是否显示当前字数，可自定义高度。


## 使用指南

在 Taro 文件中引入组件

```typescript
import { AtTextarea } from 'taro-ui-vue3'
```

**组件依赖的样式文件（仅按需引用时需要）**

```scss
@import "taro-ui-vue3/dist/style/components/textarea.scss";
```

## 一般用法

说明：

* 该组件为受控组件，开发者可通过`v-model` 来更新 modelValue 值变化。

* 由于小程序组件化的限制，AtTextarea 嵌套在 AtForm 或原生小程序组件 Form 中的时候，onSubmit 事件获得的 event 中的 `event.detail.value` 始终为空对象，开发者要获取数据，可以自行在页面的 state 中获取

* 由于此组件是基于小程序的 Textarea 进行封装，该组件是原生组件，使用前请阅读[使用限制](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html)


```html
<template>
  <view class='example-item'>
    <AtTextarea
      modelValue="value1"      
      :maxLength="200"
      placeholder='请输入文字'
    />

    <AtTextarea
      v-model="value1"
      :maxLength="200"
      placeholder='使用 v-model 更新 modelValue 值'
    />
  </view>
</template>
<script>
export default {
  name: 'AtTextareaDemo',
  data() {
    return {
      value1: ''
    }
  }
}
</script>
```

## 不显示字数

```html
<AtTextarea
  :count="false"
  v-model="value"
  maxLength="200"
  placeholder='你的问题是...'
/>

```


## 参数

| 参数   |  微信小程序 |  h5 | 说明   | 类型    | 可选值 | 默认值   |
| ---   | ----  | ---- | ---- | ------- | ------- | ------ |
| modelValue | √ | √ | 输入框当前值，用户可通过 `v-model` 来更新值 | String  | - | - |
| maxLength | √ | √ | 最大长度  | Number  | - | 200 |
| placeholder | √ | √ | 占位符  | String | - | - |
| placeholderStyle | √ | x | 指定 placeholder 的样式，只在小程序有效  | String  | - | - |
| placeholderClass | √ | x | 指定 placeholder 的样式类，只在小程序有效  | String | - | - |
| disabled | √ | √ | 是否禁用  | String | - | false |
| autoFocus| √ | √ | 是否自动聚焦  | Boolean | - | false |
| focus| √ | x | 获取焦点  | Boolean | - | false |
| showConfirmBar| √ | x | 是否显示键盘上方带有 ”完成“ 按钮那一栏  | Boolean | - | false |
| selectionStart| √ | x | 光标起始位置，自动聚集时有效，需与 selection-end 搭配使用  | Number | - | -1 |
| selectionEnd| √ | x | 光标结束位置，自动聚集时有效，需与 selectionStart 搭配使用  | Number | - | -1 |
| count | √ | √ | 是否显示字数  | Boolean | - | true |
| fixed| √ | √ | 如果 `textarea` 是在一个 `position:fixed` 的区域，需要显示指定属性 `fixed` 为 `true`  | Boolean | - | false|
| textOverflowForbidden | √ | √ | 文字超出最大长度时是否禁止输入，若否，则还可以在 maxLength 的基础上输入500字符，并右下角红字提示  | Boolean | - | true |
| height | √ | √ | 输入框高度  | Number | - | 100  |
| cursorSpacing | √ | x | 指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 `cursor-spacing` 指定的距离的最小值作为光标与键盘的距离，只在小程序端有效，目前安卓端微信官方有 bug，该特性失效  | Number | - | 100  |

## 事件

| 事件名称 |   微信小程序 |  h5 | 说明          | 返回参数  |
|---------| ---  | --------| --------- |---------- |
| onUpdate:modelValue |  √ | √ | 使用 `v-model` 时自动触发 | (value) => void  |
| onFocus |  √ | √ | 输入框获得焦点时触发，`event.detail = {value, height}` ，height 为键盘高度| event  |
| onBlur |  √ | √ | 输入框失去焦点时触发，`event.detail = { value, cursor }`  | event  |
| onConfirm |  √ | x | 点击完成时，触发 confirm 事件，`event.detail = { value: value }`  | event  |
| onLinechange | √ | x | 输入框行数变化时调用，`event.detail = { height: 0, heightRpx: 0, lineCount: 0 }`  | event  |