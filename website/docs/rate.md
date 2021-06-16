# Rate 评分组件

---
评分组件，可自定义评分图标的大小、间隔、评分数、图标类型、图标颜色

## 使用指南

在 Taro 文件中引入组件


```typescript
import { AtRate } from 'taro-ui-vue3'
```


**组件依赖的样式文件（仅按需引用时需要）**


```scss
@import "taro-ui-vue3/dist/style/components/rate.scss";
```


## 一般用法

说明：

* 该组件为受控组件，开发者可通过 `v-model` 来更新值。

* 由于小程序组件化的限制，AtRate 嵌套在 AtForm 或原生小程序组件 Form 中的时候，onSubmit 事件获得的 event 中的 event.detail.value 始终为空对象，开发者要获取数据，可以自行在页面的 state 中获取
  
## 使用 `v-model` 更新值
```html
<at-rate v-model="rateValue" />
```

## 自定义图标大小

```html
<example-item>
  <at-rate :size="15" />
</example-item>
```

## 自定义评分数

```html
<example-item>
  <at-rate :max="10" />
</example-item>
```

## 自定义图标间隔

```html
<example-item>  
  <at-rate :margin="10" />
</example-item>
```

## 只读

```html
<example-item>
  <view>评分: 3.5</view>
  <at-rate modelValue="3.5" />
</example-item>
```

## 自定义图标颜色
```html
<example-item>
  <at-rate color="teal" />
</example-item>
```

## 自定义图标类型
仅支持 `AtIcon` 中的 `star-2` 和 `heart-2` 图标。因此，`icon` 属性只能传入 `'star' | 'heart'`。

```html
<example-item>
  <!-- 图标类型默认为 star -->
  <at-rate />
  <at-rate icon="heart" />
</example-item>
```


## 参数

| 参数       | 说明    | 类型    | 可选值   | 默认值   |
| ---------- | ----- | ------- | ------- | -------- |
| modelValue | 当前评分,开发者可通过 `v-model` 来更新值  | `Number`  | - | `0` |
| max   | 最大评分  | `Number | String` | - | `5` |
| size  | 评分图标大小 | `Number | String` | - | `20` |
| margin | 图标间隔,单位根据环境自动转为 `rpx` 或 `rem`  | `Number | String` | - | `5` |
| color | 图标颜色，css 支持的颜色值  | `String` | - | `#FFCA3E` |
| icon | 图标类型  | `String` | `'star' | 'heart'` | `'star'` |

## 事件

| 事件名称 | 说明          | 返回参数  |
|---------- |-------------- |---------- |
| onUpdate:modelValue | 使用 `v-model` 时自动触发 | 当前评分值  |