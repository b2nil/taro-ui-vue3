import AtComponent from './base'

export interface AtSkeletonProps extends AtComponent {
  /*
  * 移除骨架加载动画
  * @default false
  */
  boilerplate: boolean;
  /*
  * 设置骨架组件的阴影高度，介于 0 至 24 之间
  * @default undefined
  */
  elevation?: number | string;
  /*
  * 施加加载动画，false 值只有在 `default` 插槽中存在内容时才生效
  * @default false
  */
  loading: boolean;
  /*
  * 移除骨架组件的 `border-radius`
  * @default false
  */
  tile?: boolean;
  /*
  * 设置骨架组件的过渡效果
  * @default undefined
  */
  transition?: string;
  /*
  * 描述骨架组件构成的字符串，多个要素时以逗号分隔，
  * 例如：`type="text@3"` 或 `type="card, list-item"`。
  * 组件会根据所提供的描述，采用递归方式生成对应的骨架。
  * 支持 `article@3` 和 `paragraph@2` 等多要素简写方式，
  * 这会生成 3 个 article 骨架，2 个 paragraph 骨架。
  * @default undefined
  * 
  * 以下是部分预设选项:
  * {
  *   actions: button@2,
  *   article: heading, paragraph,
  *   avatar: avatar,
  *   button: button,
  *   card: image, card-heading,
  *   card-avatar: image, list-item-avatar,
  *   card-heading: heading,
  *   chip: chip,
  *   date-picker: list-item, card-heading, divider, date-picker-options, date-picker-days, actions,
  *   date-picker-options: text, avatar@2,
  *   date-picker-days: avatar@28,
  *   heading: heading,
  *   image: image,
  *   list-item: text,
  *   list-item-avatar: avatar, text,
  *   list-item-two-line: sentences,
  *   list-item-avatar-two-line: avatar, sentences,
  *   list-item-three-line: paragraph,
  *   list-item-avatar-three-line: avatar, paragraph,
  *   paragraph: text@3,
  *   sentences: text@2,
  *   table: table-heading, table-thead, table-tbody, table-tfoot,
  *   table-heading: heading, text,
  *   table-thead: heading@6,
  *   table-tbody: table-row-divider@6,
  *   table-row-divider: table-row, divider,
  *   table-row: table-cell@6,
  *   table-cell: text,
  *   table-tfoot: text@2, avatar@2,
  *   text: text
  * }
  */
  type?: string;
  /*
  * 自定义骨架类型，会与预设选项合并
  * @default undefined
  */
  types?: Record<string, string>;
  /*
  * 移除阴影效果
  * @default false
  */
  flat?: boolean;
  /*
  * 设置骨架组件的高度，作为 css 样式值，单位 px
  * @default undefined
  */
  height?: number | string;
  /*
  * 设置骨架组件的最大高度
  * @default undefined
  */
  maxHeight?: number | string;
  /*
  * 设置骨架组件的最大宽度
  * @default undefined
  */
  maxWidth?: number | string;
  /*
  * 设置骨架组件的最小高度
  * @default undefined
  */
  minHeight?: number | string;
  /*
  * 设置骨架组件的最小宽度
  * @default undefined
  */
  minWidth?: number | string;
  /*
  * 设置骨架组件的宽度
  * @default undefined
  */
  width?: number | string;
}

export interface HTMLSkeletonElement extends HTMLElement {
  _initialStyle?: {
    display: string | null
    transition: string
  }
}
