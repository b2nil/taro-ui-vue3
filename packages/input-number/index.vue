<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
  >
    <!-- minus button -->
    <view
      :class="minusBtnClasses"
      @tap="handleClick('minus', $event)"
    >
      <text class="at-icon at-icon-subtract at-input-number__btn-subtract" />
    </view>

    <!-- input box -->
    <input
      class="at-input-number__input"
      :style="inputStyle"
      :type="type"
      :value="inputValue"
      :disabled="disabledInput || disabled"
      @blur="handleBlur"
      @input="handleInput"
    />

    <!-- plus button -->
    <view
      :class="plusBtnClasses"
      @tap="handleClick('plus', $event)"
    >
      <text class="at-icon at-icon-add at-input-number__btn-add" />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, toRef } from "vue"
import _toString from 'lodash-es/toString'
import { pxTransform } from '@taro-ui-vue3/utils'

import { CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import { AtInputNumberProps, InputError } from '@taro-ui-vue3/types/input-number'

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

  emits: {
    'blur': null,
    'update:modelValue': null,
    'error-input'(errCb: InputError) {
      return !!(
        errCb && typeof errCb === 'object' &&
        ['OVER', 'LOW', 'DISABLED'].includes(errCb.type) &&
        typeof errCb.errorValue === 'number'
      )
    }
  },

  props: {
    type: {
      type: String as PropType<AtInputNumberProps['type']>,
      default: 'number'
    },
    modelValue: {
      type: [Number, String] as PropType<AtInputNumberProps['modelValue']>,
      default: 1
    },
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
    disabledInput: Boolean
  },

  setup(props: AtInputNumberProps, { emit }) {

    const inputValue = computed({
      get: () => Number(handleValue(props.modelValue)),
      set: (value) => emit('update:modelValue', value)
    })

    const inputStyle = computed(() => ({
      width: props.width ? `${pxTransform(props.width)}` : ''
    }))

    const rootClasses = computed(() => ({
      'at-input-number': true,
      'at-input-number--lg': props.size! === 'large'
    }))

    const minusBtnClasses = computed(() => ({
      'at-input-number__btn': true,
      'at-input-number--disabled': inputValue.value <= props.min! || props.disabled
    }))

    const plusBtnClasses = computed(() => ({
      'at-input-number__btn': true,
      'at-input-number--disabled': inputValue.value >= props.max! || props.disabled
    }))

    function handleClick(clickType: 'minus' | 'plus', e: CommonEvent) {
      const belowMin = clickType === 'minus' && inputValue.value <= props.min!
      const overMax = clickType === 'plus' && inputValue.value >= props.max!

      if (belowMin || overMax || props.disabled) {
        const deltaValue = clickType === 'minus' ? -props.step! : props.step!
        const errorValue = addNum(inputValue.value, deltaValue)

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

      let newValue = addNum(inputValue.value, deltaValue)
      newValue = Number(handleValue(newValue))
      inputValue.value = newValue
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

    function handleInput(e: CommonEvent & ExtendEvent) {
      if (props.disabled) return

      const { value } = e.target
      const newValue = handleValue(value)
      inputValue.value = Number(newValue)
    }

    function handleBlur(e: ITouchEvent) {
      emit('blur', e)
    }

    function handleError(errorValue: InputError) {
      emit('error-input', errorValue)
    }

    return {
      type: toRef(props, 'type'),
      disabled: toRef(props, 'disabled'),
      disabledInput: toRef(props, 'disabledInput'),
      inputValue,
      inputStyle,
      rootClasses,
      plusBtnClasses,
      minusBtnClasses,
      handleBlur,
      handleInput,
      handleClick,
    }
  }
})

export default AtInputNumber
</script>

