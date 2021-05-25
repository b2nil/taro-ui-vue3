import { DefineComponent } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'

import AtComponent from './base'

export interface AtActionSheetProps extends AtComponent {
  /**
   * 是否展示元素
   * @default false
   */
  isOpened: boolean
  /**
   * 元素的标题
   */
  title?: string
  /**
   * 取消按钮的内容
   */
  cancelText?: string
}

export type AtActionSheetEmitOptions = {
  /**
   * 元素被关闭时触发的事件
   */
  close?: (event?: CommonEvent) => void
  /**
   * 点击底部取消按钮时触发的事件
   */
  cancel?: (event?: CommonEvent) => void
}

export declare const AtActionSheet: DefineComponent<AtActionSheetProps, {}, {}, any, any, any, any, AtActionSheetEmitOptions>

export interface AtActionSheetState {
  _isOpened: boolean
}

export interface AtActionSheetHeaderProps extends AtComponent { }

export interface AtActionSheetFooterProps extends AtComponent { }

export type AtActionSheetFooterEmitOptions = {
  click?: Function
}

export interface AtActionSheetBodyProps extends AtComponent { }

export interface AtActionSheetItemProps extends AtComponent { }

export type AtActionSheetItemEmitOptions = {
  /**
  * 点击 Item 触发的事件
  */
  click?: (event?: CommonEvent) => void
}

export declare const AtActionSheetItem: DefineComponent<AtActionSheetItemProps, {}, {}, any, any, any, any, AtActionSheetItemEmitOptions>