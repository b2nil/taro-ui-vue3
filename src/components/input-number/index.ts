import { h, defineComponent, computed, mergeProps, PropType } from "vue"
import _toString from 'lodash/toString'
import { pxTransform } from "@/utils/common"

import { Input, Text, View } from '@tarojs/components'
import { CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import { AtInputNumberProps, InputError } from 'types/input-number'

// TODO: Check all types

// 实现两数相加并保留小数点后最短尾数
function addNum(num1: number, num2: number): number {
  let sq1: number, sq2: number
  try {
    sq1 = _toString(num1).split('.')[1].length
  } catch (e) {
    sq1 = 0
  }
  try {
    sq2 = _toString(num2).split('.')[1].length
  } catch (e) {
    sq2 = 0
  }
  const m = Math.pow(10, Math.max(sq1, sq2))
  return (Math.round(num1 * m) + Math.round(num2 * m)) / m
}

// 格式化数字，处理01变成1,并且不处理1. 这种情况
function parseValue(num: string): string {
  if (num === '') return '0'

  const numStr = _toString(num)
  if (numStr.indexOf('0') === 0 && numStr.indexOf('.') === -1) {
    // 处理01变成1,并且不处理1.
    return _toString(parseFloat(num))
  }
  return _toString(num)
}

type ExtendEvent = {
  target: {
    value: string | number
  }
}

const AtInputNumber = defineComponent({
  name: "AtInputNumber",

  props: {
    // 参数
    type: {
      type: String as PropType<AtInputNumberProps['type']>,
      default: 'number'
    },
    value: {
      type: [Number, String] as PropType<AtInputNumberProps['value']>,
      default: 1,
      required: true
    },
    style: String as PropType<AtInputNumberProps['style']>,
    min: {
      type: Number as PropType<AtInputNumberProps['min']>,
      default: 0
    },
    max: {
      type: Number as PropType<AtInputNumberProps['max']>,
      default: 100
    },
    step: {
      type: Number as PropType<AtInputNumberProps['step']>,
      default: 1
    },
    size: {
      type: String as PropType<AtInputNumberProps['size']>,
      default: 'normal'
    },
    width: {
      type: Number as PropType<AtInputNumberProps['width']>,
      default: 120
    },
    disabled: Boolean,
    disabledInput: Boolean,
    // 事件
    onChange: {
      type: Function as PropType<AtInputNumberProps['onChange']>,
      default: () => () => { },
      required: true
    },
    onBlur: Function as PropType<AtInputNumberProps['onBlur']>,
    onErrorInput: Function as PropType<AtInputNumberProps['onErrorInput']>
  },

  setup(props: AtInputNumberProps, { attrs }) {

    const inputValue = computed(() => Number(handleValue(props.value)))

    const inputStyle = computed(() => ({
      width: props.width ? `${pxTransform(props.width)}` : ''
    }))

    const rootClass = computed(() => ({
      'at-input-number': true,
      'at-input-number--lg': props.size! === 'large'
    }))

    const minusBtnClass = computed(() => ({
      'at-input-number__btn': true,
      'at-input-number--disabled': inputValue.value <= props.min! || props.disabled
    }))

    const plusBtnClass = computed(() => ({
      'at-input-number__btn': true,
      'at-input-number--disabled': inputValue.value >= props.max! || props.disabled
    }))

    function handleClick(clickType: 'minus' | 'plus', e: CommonEvent) {
      const belowMin = clickType === 'minus' && props.value <= props.min!
      const overMax = clickType === 'plus' && props.value >= props.max!

      if (belowMin || overMax || props.disabled) {
        const deltaValue = clickType === 'minus' ? -props.step! : props.step!
        const errorValue = addNum(Number(props.value), deltaValue)

        if (props.disabled) {
          handleError({
            type: 'DISABLED',
            errorValue
          })
        } else {
          handleError({
            type: belowMin ? 'LOW' : 'OVER',
            errorValue
          })
        }
        return
      }

      const deltaValue = clickType === 'minus' ? -props.step! : props.step!
      let newValue = addNum(Number(props.value), deltaValue)
      newValue = Number(handleValue(newValue))
      props.onChange(newValue, e)
    }

    function handleValue(value: string | number): string {
      let resultValue = value === '' ? props.min! : value
      if (resultValue > props.max!) {
        resultValue = props.max!
        handleError({
          type: 'OVER',
          errorValue: resultValue
        })
      }

      if (resultValue < props.min!) {
        resultValue = props.min!
        handleError({
          type: 'LOW',
          errorValue: resultValue
        })
      }

      if (resultValue && !Number(resultValue)) {
        resultValue = parseFloat(String(resultValue)) || props.min!
        handleError({
          type: 'OVER',
          errorValue: resultValue
        })
      }

      resultValue = parseValue(String(resultValue))
      return resultValue
    }

    function handleInput(e: CommonEvent & ExtendEvent): string {
      const { value } = e.target
      if (props.disabled) return ''

      const newValue = handleValue(value)
      props.onChange(Number(newValue), e)
      return newValue
    }

    function handleBlur(e: ITouchEvent) {
      props.onBlur && props.onBlur(e)
    }

    function handleError(errorValue: InputError) {
      if (!props.onErrorInput) return

      props.onErrorInput(errorValue)
    }


    return () => (
      h(View, mergeProps(attrs, {
        class: rootClass.value,
      }), {
        default: () => [
          h(View, {
            class: minusBtnClass.value,
            onTap: handleClick.bind(this, 'minus')
          }, {
            default: () => [
              h(Text, {
                class: 'at-icon at-icon-subtract at-input-number__btn-subtract'
              })
            ]
          }),

          h(Input, {
            class: 'at-input-number__input',
            style: inputStyle.value,
            type: props.type,
            value: String(inputValue.value),
            disabled: props.disabledInput || props.disabled,
            onBlur: handleBlur,
            onInput: handleInput,
          }),

          h(View, {
            class: plusBtnClass.value,
            onTap: handleClick.bind(this, 'plus')
          }, {
            default: () => [
              h(Text, {
                class: 'at-icon at-icon-add at-input-number__btn-add'
              })
            ]
          })
        ]
      })
    )
  }
})

export default AtInputNumber