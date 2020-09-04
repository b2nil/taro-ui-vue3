<template>
  <view
    :class="rootClass"
    :style="customStyle"
  >
    <textarea
      class="at-textarea__textarea"
      :style="textareaStyle"
      :placeholder-style="placeholderStyle"
      :placeholder-class="placeholderCls"
      :cursor-spacing="cursorSpacing"
      :value="value"
      :maxlength="actualMaxLength"
      :placeholder="placeholder"
      :disabled="disabled"
      :auto-focus="autoFocus"
      :focus="focus"
      :fixed="fixed"
      :show-confirm-bar="showConfirmBar"
      :selection-start="selectionStart"
      :selection-end="selectionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @confirm="handleConfirm"
      @line-change="handleLinechange"
    />
    <view
      v-if="count"
      class="at-textarea__counter"
    >{{`${value.length} / ${_maxLength}` }}</view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import { AtTextareaProps } from 'types/textarea'
import { pxTransform } from '../../utils/common'
import AtComponentWithDefaultProps from '../mixins'

type ExtendEvent = {
  target: {
    value: string
  }
}

function getMaxLength(
  maxLength: number,
  textOverflowForbidden: boolean
): number {
  if (!textOverflowForbidden) {
    return maxLength + 500
  }
  return maxLength
}

const ENV = Taro.getEnv()

export default defineComponent({
  name: "AtTextarea",
  mixins: [AtComponentWithDefaultProps],

  props: {
    value: {
      type: String,
      default: '',
    },
    maxLength: {
      type: [String, Number],
      default: 200
    },
    placeholder: { type: String, default: '' },
    placeholderClass: { type: String, default: '' },
    placeholderStyle: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    autoFocus: { type: Boolean, default: false },
    focus: { type: Boolean, default: false },
    showConfirmBar: { type: Boolean, default: false },
    selectionStart: { type: Number, default: -1 },
    selectionEnd: { type: Number, default: -1 },
    count: { type: Boolean, default: true },
    fixed: { type: Boolean, default: false },
    textOverflowForbidden: { type: Boolean, default: true },
    height: { type: [String, Number], default: 100 },
    cursorSpacing: { type: Number, default: 100 },
    // event handlers
    onChange: {
      type: Function as unknown as () => AtTextareaProps['onChange'],
      default: () => (value: string, event?: CommonEvent) => { },
      required: true
    },
    onFocus: Function as unknown as () => AtTextareaProps['onFocus'],
    onBlur: Function as unknown as () => AtTextareaProps['onBlur'],
    onConfirm: Function as unknown as () => AtTextareaProps['onConfirm'],
    onLinechange: Function as unknown as () => AtTextareaProps['onLinechange'],
  },

  setup(props: AtTextareaProps, { slots }) {

    const _maxLength = computed(() => parseInt(props.maxLength!.toString()))

    const actualMaxLength = computed(() => getMaxLength(
      _maxLength.value,
      props.textOverflowForbidden!
    ))

    const textareaStyle = computed(() => props.height
      ? `height: ${pxTransform(Number(props.height))}`
      : ''
    )

    const rootClass = computed(() => ({
      'at-textarea': true,
      [`at-textarea--${ENV}`]: true,
      'at-textarea--error': _maxLength.value < props.value.length,
      [props.className]: true,
    }))

    const placeholderCls = computed(() => ({
      'placeholder': true,
      [props.placeholderClass]: true,
    }))


    function handleInput(event: CommonEvent & ExtendEvent): void {
      props.onChange(event.target.value, event)
    }

    function handleFocus(event: CommonEvent): void {
      props.onFocus && props.onFocus(event)
    }

    function handleBlur(event: CommonEvent): void {
      props.onBlur && props.onBlur(event)
    }

    function handleConfirm(event: CommonEvent): void {
      props.onConfirm && props.onConfirm(event)
    }

    function handleLinechange(event: CommonEvent): void {
      props.onLinechange && props.onLinechange(event)
    }

    return {
      ...toRefs(props),
      rootClass,
      textareaStyle,
      placeholderCls,
      _maxLength,
      actualMaxLength,
      handleInput,
      handleFocus,
      handleBlur,
      handleConfirm,
      handleLinechange
    }
  }
})
</script>