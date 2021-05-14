# Checkbox 多选框

---
多选框组件

## 使用指南

在 Taro 文件中引入组件

```typescript
import { AtCheckbox } from 'taro-ui-vue3'

// 或从 lib 目录按需引入
import { AtCheckbox } from 'taro-ui-vue3/lin'
```

**组件依赖的样式文件（仅按需引用时需要）**

```scss
@import "taro-ui-vue3/dist/style/components/checkbox.scss";
```

## 一般用法

说明：

* 该组件为受控组件，开发者可通过 `onChange` 事件或 `v-model:selected-list`来更新 `selectedList` 值变化。不使用 v-model 时，`selectedList` 与 `onChange` 函数必填

* 由于小程序组件化的限制，AtCheckbox 嵌套在 AtForm 或原生小程序组件 Form 中的时候，onSubmit 事件获得的 event 中的 event.detail.value 始终为空对象，开发者要获取数据，可以自行在页面的 state 中获取

```vue
<template>
  <view>
    <at-checkbox
      :options="checkboxOption"
      :selectedList="checkedList"
      @change="handleChange"
    />

    <at-checkbox
      :options="checkboxOption"
      v-model:selected-list="checkedList"
    />
  </view>
</template>

<script>
import { AtCheckbox } from 'taro-ui-vue3'

export default {
  name: 'CheckBoxDemo',
  components: { AtCheckbox }
  data() {
    return {
      checkedList: ['list1'],
      checkboxOption: [{
        value: 'list1',
        label: 'iPhone X',
        desc: '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。'
      },{
        value: 'list2',
        label: 'HUAWEI P20'
      },{
        value: 'list3',
        label: 'OPPO Find X',
        desc: '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。',
        disabled: true
      },{
        value: 'list4',
        label: 'vivo NEX',
        desc: '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。',
        disabled: true
    }]
    }
  },
  methods: {
    handleChange (value) {
      this.checkedList = value
    }
  },
}
</script>

```


## 参数

| 参数         | 说明         | 类型  | 可选值 | 默认值 |
| ------------ | ---------- | ----- | ------ | ------ |
| selectedList | 选中选项列表, 列表项应为 `CheckboxOption` 的 `value` 字段。支持 v-model，开发者可通过 `onChange` 事件或 `v-model:selected-list` 来更新 selectedList 值，必填       | `Array<string>` | -      | -      |
| options      | 复选框选项 `CheckboxOption` 列表，`CheckboxOption` 字段详细看下表 | `Array<CheckboxOption<T>>` | -      | -      |


## `CheckboxOption` 字段详解

| 参数     | 说明     | 类型    | 可选值 | 默认值 | 可选或必填 |
| -------- | -------| ------- | ------ | ------ | ------- |
| value    | 选项标识符，必须保证唯一 | String  | -  | -  | 必填  |
| label    | 选项标题  | String  | -      | -      | 必填       |
| desc     | 选项描述，显示在标题下方的文字 | String  | - | - | 可选 |
| disabled | 是否禁止点击  | Boolean | -      | false  | 可选  |

## 事件

| 事件名称 | 说明                     | 返回参数          |
| -------- | ------------------------ | ----------------- |
| onChange | 选中选项时触发的事件，开发者可通过 `onChange` 事件来更新 selectedList 值变化，但若不使用 v-model，不填写 onChange 函数时，该组件只读 | 选中的 `CheckboxOption.value` 列表 |
| onUpdate:selectedList | 使用 `v-model:selectedList` 时自动触发 | 选中的 `CheckboxOption.value` 列表 |
