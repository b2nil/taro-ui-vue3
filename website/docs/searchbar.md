# SearchBar 搜索栏

---
可用于用户输入搜索信息

## 使用指南


```typescript
import { AtSearchBar } from 'taro-ui-vue3'
```


**组件依赖的样式文件（仅按需引用时需要）**


```scss
@import "taro-ui-vue3/dist/style/components/search-bar.scss";
```


## 一般用法

说明：

* 由于微信开发者工具的问题，Input 的 `placeholder` 在 value 存在的情况下，会出现重叠，在真机上不会出现此问题，可以忽略

* 该组件为受控组件，开发者需要通过`v-model` 来更新 `modelValue` 值变化。

* 由于此组件是基于小程序的 Input 进行封装，该组件是原生组件，使用前请阅读[使用限制](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html)


```html
<template>
  <!-- 使用 v-model 事件更新 modelValue 值 -->
  <AtSearchBar
    v-model="value1"
    @action-click="onActionClick"
  />
</template>
<script>
export default {
  name: 'AtSearchBarDemo',
  setup() {
    const value1 = ref('')
    const onActionClick = () => {
      console.log('点击了搜索按钮')
    }

    return {
      value1,
      onActionClick
    }
  }
}
</script>
```


## 自定义按钮文字和点击事件


```html
<template>
  <AtSearchBar
    actionName='搜一下'
    v-model="value2"
    @action-click="onActionClick"
  />
</template>
<script>
export default {
  name: 'AtSearchBarDemo',
  setup() {
    const value2 = ref('')
    const onActionClick = () => {
      console.log('点击了搜索按钮')
    }

    return {
      value2,
      onActionClick
    }
  }
}
</script>
```


## 一直显示按钮


```html
<template>
   <AtSearchBar
      placeholder='请输入ISBN号'
      showActionButton
      v-model="value3"
      @action-click="onActionClick"
    />
</template>
<script>
export default {
  name: 'AtSearchBarDemo',
  setup() {
    const value3 = ref('')
    const onActionClick = () => {
      console.log('点击了搜索按钮')
    }

    return {
      value3,
      onActionClick
    }
  }
}
</script>
```


## 自定义输入框类型


```html
<template>
  <AtSearchBar
    placeholder='请输入数字'
    inputType='number'
    v-model="value4"
    @action-click="onActionClick"
  />
</template>
<script>
export default {
  name: 'AtSearchBarDemo',
  setup() {
    const value4 = ref('')
    const onActionClick = () => {
      console.log('点击了搜索按钮')
    }

    return {
      value4,
      onActionClick
    }
  }
}
</script>
```


## 参数

| 参数   |  微信小程序 |  h5 | 说明   | 类型    | 可选值 | 默认值   |
| ---   | ----  | ---- | ---- | ------- | ------- | ------ |
| modelValue | √ | √ | 必填，输入框当前值, 开发者可通过 `v-model` 来更新值 | String  | - | - |
| placeholder | √ | √ |  占位符  | String  | - | - |
| maxLength | √ | √ | 最大长度 | Number  | -  | 140 |
| fixed | √ | √ | 是否固定顶部 | Boolean  | -  | false |
| focus | √ | √ | 是否聚焦 | Boolean  | -  | false |
| disabled | √ | √ | 是否禁止输入 | Boolean  | -  | false |
| showActionButton | √ | √ | 是否一直显示右侧按钮 | Boolean  | -  | false |
| actionName | √ | √ | 右侧按钮文案 | String  | -  | '搜索' |
| inputType | √ | √ | 输入框输入类型 | String | 'text', 'number', 'idcard', 'digit' | 'text' |

## 事件

| 事件名称 | 微信小程序 |  h5 | 说明          | 事件签名  |
|-------- |----  | ---- |------------- |---------- |
| onUpdate:modelValue | √ | √ | 使用 `v-model` 时自动触发 | `(value: string) => void`  |
| onFocus | √ | √ | 输入框聚焦时触发，height 参数在基础库 1.9.90 起支持 | `(event: Object) => void`  |
| onClear | √ | √ | 点击清除按钮时触发事件，若不传，则默认传空字符串调用 v-model 清除值 | `(event: Object) => void`  |
| onBlur | √ | √ | 输入框值失去焦点时触发的事件 | `(event: Object) => void`  |
| onConfirm | √ | x  | 点击完成按钮时触发。H5 版中目前需借用 Form 组件的`onSubmit`事件来替代 | `(event: Object) => void`  |
| onActionClick | √ | √ | 右侧按钮点击触发事件 | `(event: Object) => void`  |
