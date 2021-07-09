import { CommonEventFunction } from '@tarojs/components/types/common'
import { VNode } from 'vue'

import AtComponent, { AtIconBaseProps } from './base'

export interface AtCardProps extends AtComponent {
  /**
   * 元素的辅助信息
   */
  note?: string
  /**
   * 是否通栏
   */
  isFull?: boolean
  /**
   * 元素的缩略图
   */
  thumb?: string
  /**
   * 元素的标题
   */
  title?: string
  /**
   * 元素的额外信息
   */
  extra?: string
  /**
   * 元素的额外信息自定义样式
   */
  extraStyle?: object
  /**
   * 图标，仅支持 AtIcon 支持的类型，
   * object 属性有 value color size prefixClass
   */
  icon?: AtIconBaseProps
  /**
   * 元素自定义图标
   * @deprecated 使用 `renderIcon` 插槽替代
   */
  renderIcon?: JSX.Element | VNode
  /**
   * 元素被点击触发的事件
   */
  onClick?: CommonEventFunction
}
