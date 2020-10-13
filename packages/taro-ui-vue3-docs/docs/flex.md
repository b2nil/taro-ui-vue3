# Flex 弹性布局

---

基于 `Flex Box` 布局封装的组件，可以帮助使用者方便、快捷的构建弹性布局

## 使用指南

如果已经全局引入了 `taro-ui-vue3` 的样式文件，则无需再次引入

> 由于 `app.js` 添加的样式文件 在小程序上只能影响 `page` 样式,不能影响 `component` 的样式，所以在使用自定义组件时，你可能需要再次引入

**组件依赖的样式文件（仅按需引用时需要）**

```scss
@import "taro-ui-vue3/dist/style/components/flex.scss";
```

## 一般用法


```html
<at-flex>
  <at-flex-item>A</at-flex-item>
  <at-flex-item>B</at-flex-item>
  <at-flex-item>C</at-flex-item>
</at-flex>
```


## 使用栅格化（自定义长度）


```html
<at-flex>
  <at-flex-item :size="3">A</at-flex-item>
  <at-flex-item :size="6">B</at-flex-item>
  <at-flex-item :size="2">C</at-flex-item>
  <at-flex-item :size="1">D</at-flex-item>
</at-flex>
```


## 使用栅格化（自定义偏移）


```html
<at-flex>
  <at-flex-item :offset="2">A</at-flex-item>
  <at-flex-item :offset="3">B</at-flex-item>
  <at-flex-item>C</at-flex-item>
</at-flex>
```


## 超出换行


```html
<at-flex wrap="wrap">
  <at-flex-item :size="4">A</at-flex-item>
  <at-flex-item :size="4">B</at-flex-item>
  <at-flex-item :size="4">C</at-flex-item>
  <at-flex-item :size="4">D</at-flex-item>
  <at-flex-item :size="4">E</at-flex-item>
</at-flex>
```


## 宽度根据内容撑开


```html
<at-flex>
  <at-flex-item
    is-auto
    :size="1"
  >被内容撑开</at-flex-item>
  <at-flex-item>B</at-flex-item>
</at-flex>
```


## 内容自动换行


```html
<at-flex>
  <at-flex-item
    is-wrap
    :size="1"
  >内容自动换行</at-flex-item>
  <at-flex-item>B</at-flex-item>
</at-flex>
```


## 侧轴方向的对齐方式


```html
<at-flex>
  <at-flex-item
    :size="5"
    :style="{height: '100px'}"
  >A</at-flex-item>
  <at-flex-item is-auto>默认对齐方式 -- stretch</at-flex-item>
</at-flex>

<at-flex align="start">
  <at-flex-item
    :size="5"
    :style="{height: '100px'}"
  >B</at-flex-item>
  <at-flex-item is-auto>顶部对齐 -- start</at-flex-item>
</at-flex>

<at-flex align="center">
  <at-flex-item
    :size="5"
    :style="{height: '100px'}"
  >C</at-flex-item>
  <at-flex-item is-auto>居中对齐 -- center</at-flex-item>
</at-flex>

<at-flex align="end">
  <at-flex-item
    :size="5"
    :style="{height: '100px'}"
  >D</at-flex-item>
  <at-flex-item is-auto>底部对齐 -- end</at-flex-item>
</at-flex>

<at-flex align="baseline">
  <at-flex-item
    :size="5"
    :style="{height: '100px'}"
  >E</at-flex-item>
  <at-flex-item is-auto>基线对齐 -- baseline</at-flex-item>
</at-flex>
``


## 主轴方向的排列方式


```html
<at-flex>
  <at-flex-item :size="5">默认</at-flex-item>
  <at-flex-item :size="5">start</at-flex-item>
</at-flex>

<at-flex justify="end">
  <at-flex-item :size="5">底部排列</at-flex-item>
  <at-flex-item :size="5">end</at-flex-item>
</at-flex>

<at-flex justify="center">
  <at-flex-item :size="5">居中排列</at-flex-item>
  <at-flex-item :size="5">center</at-flex-item>
</at-flex>

<at-flex justify="between">
  <at-flex-item :size="5">左右排列</at-flex-item>
  <at-flex-item :size="5">between</at-flex-item>
</at-flex>

<at-flex justify="around">
  <at-flex-item :size="5">平均排列</at-flex-item>
  <at-flex-item :size="5">around</at-flex-item>
</at-flex>
```
