# Progress 进度条

---

提供一个方便的 `进度条` 组件

## 使用指南

在 Taro 文件中引入组件


```typescript
import { AtProgress } from 'taro-ui-vue3'
```


**组件依赖的样式文件（仅按需引用时需要）**


```scss
@import "taro-ui-vue3/dist/style/components/progress.scss";
```


## 一般用法


```html
<template>
  <AtProgress />
</template>
<script>
export default {
  name: 'AtProgressDemo'
}
</script>
```


## 传入当前进度


```html
<template>
 <view>
  <AtProgress :percent="25" />
  <AtProgress :percent="50" />
  <AtProgress :percent="75" />
 </view>
</template>
<script>
export default {
  name: 'AtProgressDemo'
}
</script>
```


## 是否隐藏信息


```html
<template>
 <view>
  <AtProgress :percent="25" hidePercent />
  <AtProgress :percent="75" hidePercent />
 </view>
</template>
```


## 自定义进度条的线宽


```html
<template>
 <view>
  <AtProgress :percent="25" :strokeWidth="6" />
  <AtProgress :percent="50" :strokeWidth="8" />
  <AtProgress :percent="75" :strokeWidth="10" />
 </view>
</template>
```


## 自定义进度条颜色


```html
<template>
 <view>
  <AtProgress :percent="25" color='#FF4949' />
  <AtProgress :percent="50" color='#13CE66' />
  <AtProgress :percent="75" color='#FFC82C' />
 </view>
</template>
```


## 传入不同的状态


```html
<template>
 <view>
  <AtProgress :percent="75" status='error' />
  <AtProgress :percent="50" status='progress' />
  <AtProgress :percent="100" status='success' />
 </view>
</template>
```


## AtProgress 参数

| 参数          | 说明          | 类型      | 可选值                      | 默认值  |
| ------------- | ------------ | ------- | ---------------------------- | ------- |
| color         | 元素的颜色   | String  | -                            | -       |
| status        | 元素的状态   | String  | `progress`,`error`,`success` | -       |
| percent       | 元素的进度   | Number  | -                            | -       |
| strokeWidth   | 元素的规格   | Number  | -                            | -       |
| hidePercent | 是否隐藏文字 | Boolean | -                            | `false` |
