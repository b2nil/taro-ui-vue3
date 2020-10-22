# VirtualScroll 虚拟列表

---

虚拟列表组件，提供长列表渲染性能

## 使用指南

在 Taro 文件中引入组件

```ts
import { AtVirtualScroll } from 'taro-ui-vue3'
```

### 一般用法
所有参数均可动态绑定。可配合 `AtListItem`、 `AtCard`、 `AtSwipeAction` 等组件使用。

```html
<!-- template -->
<at-virtual-scroll
  bench="5"
  height="300"
  :items="items"
  :item-height="itemHeight"
>
  <template #default="{ index, item }">
    <at-list-item
      arrow="right"
      :key="index"
      :title="item.title"
      :note="item.text"
      :thumb="item.imgURL"
      :extraText="`第 ${index} / ${items.length} 条`"
    />
  </template>
</at-virtual-scroll>
```
```ts
// <script="ts">
interface DataItem {
  title: string
  text: string
  imgURL?: string
}

export default defineComponent({
  components: { AtVirtualScroll },
  setup() {
    const itemHeight = ref(64)
    const items: Array<DataItem> = getData()

    return {
      items,
      itemHeight
    }
  }
})
```

### 触顶和触底事件
该组件提供了列表滚动到顶部以及底部时触发的两个事件：
  - `onReachTop` : 向上滚动，到达触顶阈值 ( `reachTopThreshold` ) 设置的位置时触发
  - `onReachBottom` : 向下滚动，到达触底阈值 ( `reachBottomThreshold` ) 设置的位置时触发

```html
<!-- template -->
<at-virtual-scroll
  bench="5"
  height="300"
  item-height="64"
  :items="items"
  @reach-top="handleReachTop"
  @reach-bottom="handleReachBottom"
>
  <template #default="{ index, item }">
    <at-list-item
      arrow="right"
      :key="index"
      :title="item.title"
      :note="item.text"
      :thumb="item.imgURL"
      :extraText="`第 ${index} / ${items.length} 条`"
    />
  </template>
</at-virtual-scroll>
```
```ts
// <script="ts">
interface DataItem {
  title: string
  text: string
  imgURL?: string
}

export default defineComponent({
  components: { AtVirtualScroll },
  setup() {
    const itemHeight = ref(64)
    const items: Array<DataItem> = getData()

    function handleReachTop() {
      Taro.showToast({
        title: `reachTop 刷新数据`,
        icon: 'loading',
        duration: genRandomNumber(3000),
        success(_) {
          // 模拟刷新数据
          items.value = refreshData()
        }
      })
    }

    function handleReachBottom() {
      Taro.showToast({
        title: `reachBottom 加载数据`,
        icon: 'loading',
        duration: genRandomNumber(3000),
        success: (_) => {
          // 模拟加载数据 -> 附加 100 条数据
          items.value = items.value.concat(getMoreData(100))
        }
      })
    }

    return {
      items,
      itemHeight,
      handleReachTop,
      handleReachBottom
    }
  }
})
```


### 跳转至指定列表单项
组件提供了 `scrollIntoItem` 参数，该参数应为 `列表单项的索引值`，即传入默认插槽的 `index`。设置该参数后，可视区域会滚动至该单项所在的区域。

```html
<!-- template -->
<view>
  <view class="controller">
    <at-button
      type="secondary"
      @click="scrollToItem"
    >随机跳转至第 N 条数据</at-button>
  </view>

  <at-virtual-scroll
    bench="5"
    height="300"
    item-height="64"
    :items="items"
    :scroll-into-item="toItem"
  >
    <template #default="{ index, item }">
      <at-list-item
        :key="index"
        arrow="right"
        :title="item.title"
        :note="item.text"
        :thumb="item.imgURL"
        :extraText="`第 ${index} / ${items.length} 条`"
      />
    </template>
  </at-virtual-scroll>
</view>
```
```ts
// <script="ts">
interface DataItem {
  title: string
  text: string
  imgURL?: string
}

export default defineComponent({
  components: { AtVirtualScroll },
  setup() {
    const toItem = ref(0)
    const items: Array<DataItem> = getData()
    
    function genRandomIndex(length: number): number {
      return Math.ceil(Math.random() * (length - 1))
    }

    function scrollToItem() {
      toItem.value = genRandomIndex(items.length)
      console.log(`随机跳转至: 第 ${toItem.value + 1} 条`)
    }

    return {
      toItem,
      scrollToItem
    }
  }
})
```

## AtVirtualScroll 参数

| 参数     | 说明                                     | 类型    | 可选值                        | 默认值  |
| -------- | ---------------------------------------- | ------- | ----------------------------- | ------- |
| bench     | 列表渲染提前量，即在可视区域之外提前渲染的列表行数。 值设置得越高，快速滚动时出现白屏的概率就越小；相应地，每次滚动的性能会变得越差。                              | `Number | String`  | -                             | `0`       |
| viewport  | 可视区域渲染的列表行数。                                                | `Number | String`  | -     | `5`       |
| itemHeight     | 列表单项高度，用于计算列表单项的 `top` 样式值，单位 `px`。必填          | `Number | String` | -      | -       |
| items    | 渲染数据，必填                                                          | `Array<any>`     | -     | -       |
| height   | 列表的高度，作为 css 样式值，单位 `px`                                    | `Number | String` | -        | -      |
| maxHeight | 置组件的最大高度                                                       | `Number | String` | -        | -      |
| minHeight | 设置组件的最小高度                                                     | `Number | String`  | -        | -      |
| maxWidth  | 设置组件的最大宽度                                                     | `Number | String` | -         | -      |
| minWidth  | 设置组件的最小宽度                                                     | `Number | String` | -         | -      |
| width     | 设置组件的宽度                                                         | `Number | String` | -      | -       |
| scrollIntoItem  | 列表单项的索引值，设置后，可视区域滚动至该单项所在区域 | `Number | String` | -       | -       |
| reachTopThreshold  | 触顶阈值，距顶部多远时（单位 `px`），触发 `onReachTop` 事件 | `Number | String` | -        | `50`       |
| reachBottomThreshold  | 触底阈值，距底部多远时（单位 `px`），触发 `onReachBottom` 事件 | `Number | String` | -  | `50`       |


## AtVirtualScroll 事件

| 事件名称 | 说明                     | 返回参数 |
| -------- | ------------------------ | -------- |
| onReachTop  | 滚动到顶部时触发的事件 | -        |
| onReachBottom  | 滚动到底部时触发的事件 | -        |


## AtVirtualScroll 插槽

| 插槽名称       | 说明                     |  参数 |
| --------     | -----------------------  | --------  |
| default      | 用于自定义列表项目的默认 `scoped` 插槽| `{ index: number, item: any }` |
