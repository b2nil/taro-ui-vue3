import { CommonEventFunction } from '@tarojs/components/types/common'
import AtComponent from './base'

export interface AtVirtualScrollProps extends AtComponent {
  /*
  * 列表渲染提前量，即在可视区域之外提前渲染的列表行数。
  * 值设置得越高，快速滚动时出现白屏的概率就越小；相应地，每次滚动的性能会变得越差。
  * @default 0
  */
  bench?: number | string;
  /*
  * 列表单项高度，用于计算列表单项的 top 样式值，单位 px。必填
  * @default undefined
  * @required true
  */
  itemHeight: number | string;
  /*
  * 渲染数据，必填
  * @default []
  */
  items: any[];
  /*
 * 列表的高度，作为 css 样式值，单位 px
 * @default undefined
 */
  height?: number | string;
  /*
  * 设置组件的最大高度
  * @default undefined
  */
  maxHeight?: number | string;
  /*
  * 设置组件的最大宽度
  * @default undefined
  */
  maxWidth?: number | string;
  /*
  * 设置组件的最小高度
  * @default undefined
  */
  minHeight?: number | string;
  /*
  * 设置组件的最小宽度
  * @default undefined
  */
  minWidth?: number | string;
  /*
  * 设置组件的宽度
  * @default undefined
  */
  width?: number | string;
  /*
  * 列表单项的索引值，设置后，可视区域滚动至该单项所在区域
  * @default undefined
  */
  scrollIntoItem?: number | string;
  /*
  * 触顶阈值，距顶部多远时（单位 px），触发 onReachTop 事件
  * @default 50
  */
  reachTopThreshold?: number | string;
  /*
  * 触底阈值，距底部多远时（单位 px），触发 onReachBottom 事件
  * @default 50
  */
  reachBottomThreshold?: number | string;
  /*
  * 滚动到顶部时触发事件
  * @default 50
  */
  onReachTop?: CommonEventFunction;
  /*
  * 滚动到底部时触发事件
  * @default 50
  */
  onReachBottom?: CommonEventFunction;
}
