import AtComponent from './base'

export interface CheckboxOption<T> {
  value: T
  label: string
  desc?: string
  disabled?: boolean
}

export interface AtCheckboxProps<T> extends AtComponent {
  /**
   * 复选框选项，必填
   */
  options: Array<CheckboxOption<T>>
  /**
   * 选中的选项,开发者需要通过 onChange 事件或 v-model:selected-list 来更新 selectedList 值，必填
   */
  selectedList: Array<T>
  /**
   * 选中选项时触发的事件，开发者需要通过 onChange 事件来更新 selectedList 值变化，但不填写 onChange 函数时，该组件只读
   */
  onChange?: (selectedList: Array<T>) => void
}
