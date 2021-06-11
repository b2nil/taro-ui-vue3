# Indexes 索引选择器

---
索引列表组件，可以通过点击索引导航，快速定位到列表处

## 使用指南

在 Taro 文件中引入组件

```ts
import { AtIndexes } from 'taro-ui-vue3'
```

**组件依赖的样式文件（仅按需引用时需要）**

```scss
@import "taro-ui-vue3/dist/style/components/indexes.scss";
```

## 一般用法

说明:

* AtIndexes 需要父节点设置高度，如果想整个高度屏幕高度都铺满，设置 `height: 100vh`。


```html
<template>
  <view class="page" style="height: 100vh;">
    <!-- 基础用法 -->
    <view style="height: 100%;">
      <AtIndexes
        :list="mockData"
        topKey="Top"
      />
    </view>
  </view>
</template>
```

## 跳转到指定key

```html
<template>
  <view>
    <AtIndexes
      :list="list"
      @scroll-into-view="handleScrollIntoView"
    >
      <view class='custom-area'>
        用户自定义内容
        <AtSearchBar  
          placeholder='跳转到指定Key' 
          @action-click="handleActionClick" 
        />
      </view>
    </AtIndexes>
  </view>
</template>
<script>
import { ref } from 'vue'
import mockData from './mock-data'

export default {
  name: 'AtIndexesDemo',
  setup() {
    const key = ref('')
    const list = ref(mockData)
    const jumpToView = ref((k: string) => {})

    function handleActionClick() {
      jumpToView.value(this.value.toUpperCase())
    },

    function handleScrollIntoView(fn) {
      jumpToView.value = fn
    }

    return {
      list,
      handleActionClick,
      handleScrollIntoView
    }
  }
}
</script>
```


## 参数

| 参数       | 说明    | 类型    | 可选值   | 默认值   |
| ---------- | ------- | ------- | ------- | --- |
| animation | 是否开启跳转过渡动画 | Boolean  | - | false |
| isVibrate | 是否切换 key 的震动，只在微信小程序有效 | Boolean  | - | true |
| showToast | 是否用弹框显示当前 key | Boolean  | - | true |
| topKey | 右侧导航第一个名称 | String  | - | Top |
| list | 列表内容, 列表项数据结构如下 | Array<ListItem>  | - | - |


### `ListItem` 数据结构


```ts
interface Item {
  /**
   * 列表项内容
   */
  name: string

  [propName: string]: any
}

interface ListItem {
  /**
   * 列表标题
   */
  title: string
  /**
   * 右侧导航标题
   */
  key: string
  /**
   * 列表项
   */
  items: Array<Item>
}
```

## 事件

| 事件名称    | 说明            | 事件签名  |
|---------- |--------------   |---------- |
| onClick   | 点击列表项触发事件 |  `(item: Item) => void` |
| onScrollIntoView | 获取跳转事件，以便跳转到指定 key | `(fn: (key: string) => void) => void` |
