# Steps 步骤条

---
步骤条组件，建议步骤在2～3之内

## 使用指南
在 Taro 文件中引入组件

```typescript
import { AtSteps } from 'taro-ui-vue3'
```

**组件依赖的样式文件（仅按需引用时需要）**

```scss
@import "taro-ui-vue3/dist/style/components/steps.scss";
```

## 一般用法

说明:

* 该组件为受控组件，开发者需要通过 `onChange` 事件来更新 `current` 值变化，`current` 与 `onChange` 函数必填


```html
<template>
  <view class='example-item'>
    <AtSteps
      :items="items3"
      :current="current3"
      @change="onChange"
    />
  </view>
</template>
<script>
const items3 = [
  { title: '步骤一', desc: '这里是额外的信息，最多两行' },
  { title: '步骤二', desc: '这里是额外的信息，最多两行' },
  { title: '步骤三', desc: '这里是额外的信息，最多两行' }
]
export default {
  name: 'AtStepsDemo',
  data() {
    return {
      current3: 0,
      item3
    }
  },
  methods: {
    onChange(val) {
      this.current3 = val
    }
  },
}
</script>

```


## 自定义图标


```html
<template>
  <view class='example-item'>
    <AtSteps
      :items="items"
      :current="value"
      @change="onChange"
    />
  </view>
</template>
<script>
const items = [
    {
      title: '步骤一',
      desc: '这里是额外的信息，最多两行',
      icon: {
        value: 'sound',
        activeColor: '#fff',
        inactiveColor: '#78A4FA',
        size: '14'
      }
    },
    {
      title: '步骤二',
      desc: '这里是额外的信息，最多两行',
      icon: {
        value: 'shopping-cart',
        activeColor: '#fff',
        inactiveColor: '#78A4FA',
        size: '14'
      }
    },
    {
      title: '步骤三',
      desc: '这里是额外的信息，最多两行',
      icon: {
        value: 'camera',
        activeColor: '#fff',
        inactiveColor: '#78A4FA',
        size: '14'
      }
    }
  ]
export default {
  name: 'AtStepsDemo',
  data() {
    return {
      value: 0,
      items
    }
  },
  methods: {
    onChange(val) {
      this.value = val
    }
  },
}
</script>
```


## 状态步骤条


```html
<template>
  <view class='example-item'>
    <AtSteps
      :items="items"
      :current="value"
      @change="onChange"
    />
  </view>
</template>
<script>
const items = [
    {
      title: '步骤一',
      desc: '这里是额外的信息，最多两行',
      status: 'success'
    },
    {
      title: '步骤二',
      desc: '这里是额外的信息，最多两行'
    },
    {
      title: '步骤三',
      desc: '这里是额外的信息，最多两行',
      status: 'error'
    }
  ]
export default {
  name: 'AtStepsDemo',
  data() {
    return {
      value: 0,
      items
    }
  },
  methods: {
    onChange(val) {
      this.value = val
    }
  },
}
</script>
```


## AtSteps 参数

| 参数  | 微信小程序 | h5 | 说明   | 类型    | 可选值 | 默认值 |
|------|----------|----|-----|---------|--------|--------|
| current | √   | √  | 必填，当前步骤索引值，开发者需要通过 `onChange` 事件来更新 `current` 值 | `Number`  | -  | `0`   |
| items | √  | √  | 步骤条数据列表, 具体字段详见下表  | `Item[]` | - | -  |

## AtSteps 事件

| 事件名称 | 说明          | 返回参数  |
|---------- |-------------- |---------- |
| `onChange` | 点击触发事件，开发者需要通过 `onChange` 事件来更新步骤索引值 `current`，`onChange` 函数必填  | `current` |

## `Item` 字段说明

| 参数  | 说明 | 类型    | 可选值 | 默认值 |
|------|-----|---------|--------|--------|
| title | 步骤标题 | `String`  | - | -  |
| desc  | 步骤说明文字  | `String` | - | -  |
| status | 步骤状态 | `String` | `success | error` | - |
| icon | 图标信息，详见 `Icon` 字段说明 | `Icon` | - | - |

## `Icon` 字段说明

```ts
interface Icon {
  /** 图标类型 */
  value: string
  /** 激活态颜色 */
  activeColor?: string
  /** 非激活态颜色 */
  inactiveColor?: string
  /** 大小 */
  size?: string | number
}
```