# Flex 弹性布局

---

基于 `Flex Box` 布局封装的组件，可以帮助使用者方便、快捷的构建弹性布局

## 使用指南

按需引入组件
```typescript
import { AtFlex, AtFlexItem } from 'taro-ui-vue3'
```

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
```


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

## AtFlex 参数
| 参数     | 说明                                     | 类型    | 可选值                        | 默认值  |
| -------- | ---------------------------------------- | ------- | ----------------------------- | ------- |
| wrap    | 是否允需要换行, 即 CSS `flex-wrap` 属性  | `String`  | `'no-wrap' | 'wrap' | 'wrap-reverse'`                   | `'no-wrap'`       |
| align    | flex 项在交叉轴（垂直于主轴）上的对齐方式, 即 CSS `align-items` 属性   | `String`  | `'start' | 'end' | 'center' | 'stretch' | 'baseline'`                   | `'stretch'`       |
| justify    | flex 项沿主轴方向的对齐方式, 即 CSS `justify-content` 属性  | `String`  | `'start' | 'end' | 'center' | 'between' | 'around'`                   | `'start'`       |
| direction | 主轴的方向, 即 CSS `flex-direction` 属性   | `String`  | `'row' | 'column' | 'row-reverse' | 'column-reverse'`                   | `'row'`       |
| alignContent    | 设置当交叉轴上有剩余空间时，flex 容器中的`行`在交叉轴上分配剩余空间的对齐方式，即 CSS `align-content` 属性  | `String`  | `'start' | 'end' | 'center' | 'stretch' | 'between' | 'around'`                   | `'strech'`       |


## AtFlexItem 参数
| 参数     | 说明                                     | 类型    | 可选值                        | 默认值  |
| -------- | ---------------------------------------- | ------- | ----------------------------- | ------- |
| isAuto    | 内容是否自动设置宽度  | `Boolean`  | `-`                   | `false`       |
| isWrap    | 内容是否自动换行  | `Boolean`  | `-`                   | `false`       |
| align    | 允许某个单独的 flex 项覆盖默认的对齐方式，即 CSS `align-self` 属性  | `String`  | `'top' | 'bottom' | 'center'`                   | `-`       |
| size    | 栅格宽度  | `String`  | `1~12`       | `-`       |
| offset    | 栅格偏移距离  | `String`  | `1~12`     | `-`       |

