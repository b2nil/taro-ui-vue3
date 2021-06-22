# Skeleton 骨架

---

骨架组件。


## 使用指南

在 Taro 文件中引入组件

```ts
import { AtSkeleton } from 'taro-ui-vue3'
```

**组件依赖的样式文件（仅按需引用时需要）**

```scss
@import "taro-ui-vue3/dist/style/components/skeleton.scss";
```

### 一般用法

```html
<at-skeleton
  style="margin: 10px"
  type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
/>
```

### 异步组件加载
可结合 Vue 3.0 的 `suspense` 特性，实现异步组件的加载，或者直接使用骨架的默认 `slot` 加载组件。


#### 结合 `suspense` 使用

```html
<suspense>
  <template #default>
    <at-card title="skeleton demo">
      <async-comp />
    </at-card>
  </template>
  <template #fallback>
    <at-skeleton type="avatar, text@3"/>
  </template>
</suspense>
```


#### 使用骨架的默认 `slot`

当 slot 插槽中存在内容时，组件加载完毕，
```html
<at-skeleton type="card" :loading="isLoading">
  <at-card :title="asyncTitle">
    <async-comp />
  </at-card>
</at-skeleton>
```

## AtSkeleton 参数

| 参数     | 说明    | 类型    | 可选值   | 默认值  |
| -------- | ------- | ----- | ------ | ------- |
| boilerplate     | 移除骨架加载动画。  | `Boolean`  | -  | `false`       |
| elevation  | 设置骨架组件的阴影高度，介于 0 至 24 之间数。| `Number | String`  | `0~24`     | -       |
| loading     | 施加加载动画，当 `default` 插槽中存在内容时，`false` 值才能生效 | `Boolean` | -      | `false`       |
| tile    | 移除骨架组件的 `border-radius`   | `Boolean`     | -     | `false`       |
| transition   | 设置骨架组件的过渡效果    | `String` | -        | -      |
| flat | 移除阴影效果   | `Boolean`  | -        | `false`      |
| height  | 设置骨架组件的高度，作为 css 样式值，单位 px                                                 | `Number | String` | -         | -      |
| maxHeight  | 设置骨架组件的最大高度度 | `Number | String` | -         | -      |
| maxWidth  | 设置骨架组件的最大宽度 | `Number | String` | -         | -      |
| minWidth  | 设置骨架组件的最小宽度 | `Number | String` | -         | -      |
| width     | 设置骨架组件的宽度     | `Number | String` | -      | -       |
| types | 自定义骨架类型组合，会与预设类型组合合并，示例详见[预设类型组合](#预设骨架类型组合)  | `Record<string, string>` | -        | -      |
| type     | 描述骨架组件构成类型的字符串，多个要素时以逗号分隔。例如：`type="text@3"` 或 `type="card, list-item"`。组件会根据类型或类型组合描述，以递归方式生成对应的骨架。例如： `article@3` 会生成 3 个 article 骨架，`card, text@3` 会生成 1 个 card 骨架和 3 个 text 骨架。 | `String` | -      | -       |

####  预设`骨架类型组合`
  ```json
  {
    actions: button@2,
    article: heading, paragraph,
    avatar: avatar,
    button: button,
    card: image, card-heading,
    card-avatar: image, list-item-avatar,
    card-heading: heading,
    chip: chip,
    date-picker: list-item, card-heading, divider, date-picker-options, date-picker-days, actions,
    date-picker-options: text, avatar@2,
    date-picker-days: avatar@28,
    heading: heading,
    image: image,
    list-item: text,
    list-item-avatar: avatar, text,
    list-item-two-line: sentences,
    list-item-avatar-two-line: avatar, sentences,
    list-item-three-line: paragraph,
    list-item-avatar-three-line: avatar, paragraph,
    paragraph: text@3,
    sentences: text@2,
    table: table-heading, table-thead, table-tbody, table-tfoot,
    table-heading: heading, text,
    table-thead: heading@6,
    table-tbody: table-row-divider@6,
    table-row-divider: table-row, divider,
    table-row: table-cell@6,
    table-cell: text,
    table-tfoot: text@2, avatar@2,
    text: text
  }
  ```                                                    

## AtSkeleton 插槽

| 插槽名称       | 说明                     |  参数 |
| --------     | -----------------------  | --------  |
| default      | 默认插槽                  |  -        |
