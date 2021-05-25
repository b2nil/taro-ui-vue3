import { Component, EmitsOptions } from "vue"
import { CommonEvent } from '@tarojs/components/types/common'
import AtComponent, { AtIconBaseProps } from './base'
import { AtPaginationProps } from './pagination'
import { AtAccordion } from 'packages/taro-ui-vue3'

export interface AtAccordionProps extends AtComponent {
  /**
   * 是否默认开启
   * @default false
   */
  open?: boolean
  /**
   * 标题
   */
  title?: string
  /**
   * 图标，仅支持 AtIcon 支持的类型，
   * object 属性有 value color size prefixClass
   */
  icon?: AtIconBaseProps
  /**
   * 是否开启动画
   * @default true
   * @since v2.0.0-beta.3
   */
  isAnimation?: boolean
  /**
   * 是否有头部下划线
   * @default true
   */
  hasBorder?: boolean
  /**
   * 描述信息
   */
  note?: string
}

export interface AtAccordionState {
  wrapperHeight: number | 'unset'
}

export interface AtAccordionEmitsOptions {
  /**
   * 点击头部触发事件
   */
  click?: (open: boolean, event: CommonEvent) => void
}


type AtAccordion = Component<AtAccordionProps>
export default AtAccordion
