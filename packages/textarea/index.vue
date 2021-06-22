<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
  >
    <textarea
      class="at-textarea__textarea"
      v-bind="showCount"
      :style="textareaStyle"
      :value="inputValue"
      :fixed="fixed"
      :focus="focus"
      :disabled="disabled"
      :auto-focus="autoFocus"
      :show-confirm-bar="showConfirmBar"
      :maxlength="actualMaxLength"
      :cursor-spacing="cursorSpacing"
      :selection-end="selectionEnd"
      :selection-start="selectionStart"
      :placeholder="placeholder"
      :placeholder-style="placeholderStyle"
      :placeholder-class="placeholderClasses"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @confirm="handleConfirm"
      @linechange="handleLinechange"
    />
    <view
      v-if="count && !isAlipay"
      class="at-textarea__counter"
    >{{`${inputValue.length} / ${maxlength}` }}</view>
  </view>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
import { defineComponent, computed, toRefs } from 'vue'
import { pxTransform } from "@taro-ui-vue3/utils"
import { useModelValue } from '@taro-ui-vue3/composables'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtTextareaProps } from "@taro-ui-vue3/types/textarea"

const AtTextarea = defineComponent({
  name: "AtTextarea",

  emits: [
    'blur',
    'focus',
    'confirm',
    'linechange',
    'update:modelValue'
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
    focus: Boolean,
    fixed: Boolean,
    disabled: Boolean,
    autoFocus: Boolean,
    showConfirmBar: Boolean,
    count: { type: Boolean, default: true },
    textOverflowForbidden: { type: Boolean, default: true },
    placeholder: { type: String, default: '' },
    placeholderClass: { type: String, default: '' },
    placeholderStyle: { type: String, default: '' },
    selectionStart: { type: Number, default: -1 },
    selectionEnd: { type: Number, default: -1 },
    height: { type: [String, Number], default: 100 },
    cursorSpacing: { type: Number, default: 100 }
  },

  setup(props: AtTextareaProps, { emit }) {

    const ENV = Taro.getEnv()
    const isAlipay = ENV === Taro.ENV_TYPE.ALIPAY
    const inputValue = useModelValue(props, emit)
    const maxlength = computed(() => parseInt(props.maxLength!.toString()))

    const actualMaxLength = computed(() => getMaxLength(
      maxlength.value,
      Boolean(props.textOverflowForbidden)
    ))

    const textareaStyle = computed(() => (props.height
      ? { height: `${pxTransform(Number(props.height))}` }
      : {}
    ))

    const rootClasses = computed(() => ({
      'at-textarea': true,
      [`at-textarea--${ENV}`]: true,
      'at-textarea--error': maxlength.value < inputValue.value.length
    }))

    const placeholderClasses = computed(() => (
      props.placeholderClass
        ? `placeholder ${props.placeholderClass}`
        : 'placeholder'
    ))

    const showCount = computed(() => isAlipay
      ? { showCount: props.count }
      : {}
    )

    function getMaxLength(
      maxLength: number,
      textOverflowForbidden: boolean
    ): number {
      if (!textOverflowForbidden) {
        return maxLength + 500
      }
      return maxLength
    }

    function handleInput(event: CommonEvent) {
      inputValue.value = event.detail.value
    }

    function handleFocus(event: CommonEvent) {
      emit('focus', event)
    }

    function handleBlur(event: CommonEvent) {
      emit('blur', event)
    }

    function handleConfirm(event: CommonEvent) {
      emit('confirm', event)
    }

    function handleLinechange(event: CommonEvent) {
      emit('linechange', event)
    }

    return {
      ...toRefs(props),
      isAlipay,
      inputValue,
      showCount,
      maxlength,
      actualMaxLength,
      rootClasses,
      textareaStyle,
      placeholderClasses,
      handleBlur,
      handleInput,
      handleFocus,
      handleConfirm,
      handleLinechange
    }
  }
})

export default AtTextarea
</script>