# Slider 滑动条

---
允许用户在一个区间中选择特定值

## 使用指南

在 Taro 文件中引入组件


```typescript
import { AtSlider } from 'taro-ui-vue3'
```


**组件依赖的样式文件（仅按需引用时需要）**


```scss
@import "taro-ui-vue3/dist/style/components/slider.scss";
```


## 一般用法


```html
<template>
 <view>
  <AtSlider />
 </view>
</template>
```


## 传入当前值


```html
<template>
 <view>
  <AtSlider :value="50" />
 </view>
</template>
```


## 设置步长

取值必须大于 0，并且可被(max - min)整除


```html
<template>
 <view>
  <AtSlider :step="2" />
 </view>
</template>
```


## 设置取值范围


```html
<template>
 <view>
  <AtSlider :min="2" :max="60" />
 </view>
</template>
```


## 自定义样式


```html
<template>
 <view>
  <AtSlider :step="1" :value="50" :blockSize="24 activeColor='#4285F4' backgroundColor='#BDBDBD' blockColor='#4285F4'/>
 </view>
</template>
```


## 禁用状态


```html
<template>
 <view>
  <AtSlider :step="1" :value="50" :blockSize="24 showValue disabled/>
 </view>
</template>
```


## AtSlider 参数

| 参数            | 说明                                         | 类型    | 可选值 | 默认值  |
|-----------------|--------------------------------------------|---------|--------|---------|
| min             | 最小值                                       | Number  | -      | 0       |
| max             | 最大值                                       | Number  | -      | 100     |
| step            | 步长，取值必须大于0，并且可被 `max - min` 整除 | Number  | -      | 1       |
| disabled        | 是否禁用                                     | Boolean | -      | false   |
| value           | 当前取值                                     | Number  | -      | 0       |
| activeColor     | 已选择的颜色                                 | Color   | -      | #6190e8 |
| backgroundColor | 背景条的颜色                                 | Color   | -      | #e9e9e9 |
| blockSize       | 滑块的大小，取值范围为 12-28                  | Number  | -      | 28      |
| blockColor      | 滑块的颜色                                   | Color   | -      | #ffffff |
| showValue       | 是否显示当前的 Value                         | Boolean | -      | false   |

## AtSlider 事件

| 事件名称   | 说明                                                       | 返回参数 |
|:-----------|:---------------------------------------------------------|:---------|
| onChange   | 完成一次拖动后触发的事件，`event.detail = { value: number }`  | value    |
| onChanging | 拖动过程中触发的事件，`event.detail = { value: number }`     | value    |
