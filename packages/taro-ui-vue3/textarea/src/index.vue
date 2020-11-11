<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
  >
    <textarea
      class="at-textarea__textarea"
      v-bind="alipayShowCount"
      v-model="inputValue"
      :fixed="fixed"
      :focus="focus"
      :disabled="disabled"
      :auto-focus="autoFocus"
      :maxlength="actualMaxLength"
      :cursor-spacing="cursorSpacing"
      :style="textareaStyle"
      :placeholder="placeholder"
      :placeholder-style="placeholderStyle"
      :placeholder-class="placeholderClasses"
      :selection-end="selectionEnd"
      :selection-start="selectionStart"
      :show-confirm-bar="showConfirmBar"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @confirm="handleConfirm"
      @line-change="handleLinechange"
    />
    <view
      v-if="count && !isAlipay"
      class="at-textarea__counter"
    >{{`${inputValue.length} / ${_maxLength}` }}</view>
  </view>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
import { defineComponent, computed, toRefs, ref } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtTextareaProps } from "@taro-ui-vue3/types/textarea"
import { pxTransform } from "@taro-ui-vue3/utils/common"

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

  emits: [
    'blur',
    'focus',
    'confirm',
    'line-change',
    'update:modelValue',
  ],

  props: {
    modelValue: {
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
    cursorSpacing: { type: Number, default: 100 }
  },

  setup(props: AtTextareaProps, { emit }) {
    const inputValue = ref(props.modelValue)

    const isAlipay = Taro.getEnv() === Taro.ENV_TYPE.ALIPAY

    const _maxLength = computed(() => parseInt(props.maxLength!.toString()))

    const actualMaxLength = computed(() => getMaxLength(
      _maxLength.value,
      props.textOverflowForbidden!
    ))

    const textareaStyle = computed(() => props.height
      ? `height: ${pxTransform(Number(props.height))}`
      : ''
    )

    const rootClasses = computed(() => ({
      'at-textarea': true,
      [`at-textarea--${ENV}`]: true,
      'at-textarea--error': _maxLength.value < props.modelValue.length
    }))

    const placeholderClasses = computed(() => ({
      'placeholder': true,
      [`${props.placeholderClass}`]: Boolean(props.placeholderClass)
    }))

    const alipayShowCount = computed(() => isAlipay
      ? { showCount: props.count }
      : {}
    )

    function handleInput(event: CommonEvent & ExtendEvent): void {
      emit('update:modelValue', event.target.value)
    }

    function handleFocus(event: CommonEvent): void {
      emit('focus', event)
    }

    function handleBlur(event: CommonEvent): void {
      emit('blur', event)
    }

    function handleConfirm(event: CommonEvent): void {
      emit('confirm', event)
    }

    function handleLinechange(event: CommonEvent): void {
      emit('line-change', event)
    }

    return {
      ...toRefs(props),
      isAlipay,
      rootClasses,
      textareaStyle,
      placeholderClasses,
      inputValue,
      _maxLength,
      actualMaxLength,
      alipayShowCount,
      handleBlur,
      handleInput,
      handleFocus,
      handleConfirm,
      handleLinechange
    }
  }
})
</script>