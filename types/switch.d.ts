

import AtComponent from './base'

export interface AtSwitchProps extends AtComponent {
  /**
   * 标签名
   */
  title?: string
  /**
   * 背景颜色
   * @default #6190e8
   */
  color?: string
  /**
   * 是否显示开启，支持 v-model, 用户可通过 v-model:checked 或 onChange 获取开关状态
   * @default false
   */
  checked?: boolean
  /**
   * 是否禁止点击
   * @default false
   */
  disabled?: boolean
  /**
   * 是否显示下划线边框
   * @default false
   */
  border?: boolean
  /**
   * 输入框值改变时触发的事件
   */
  onChange?: (value: boolean) => void
}
