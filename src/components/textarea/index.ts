import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { Textarea, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import { AtTextareaProps } from 'types/textarea'
import { pxTransform } from '@/utils/common'

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

const AtTextarea = defineComponent({
  name: "AtTextarea",

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
      type: Function as PropType<AtTextareaProps['onChange']>,
      default: () => (value: string, event?: CommonEvent) => { },
      required: true
    },
    onFocus: Function as PropType<AtTextareaProps['onFocus']>,
    onBlur: Function as PropType<AtTextareaProps['onBlur']>,
    onConfirm: Function as PropType<AtTextareaProps['onConfirm']>,
    onLinechange: Function as PropType<AtTextareaProps['onLinechange']>,
  },

  setup(props: AtTextareaProps, { attrs, slots }) {
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
      'at-textarea--error': _maxLength.value < props.value.length
    }))

    const placeholderClasses = computed(() => `placeholder ${props.placeholderClass}`)

    const alipayShowCount = computed(() => isAlipay
      ? { showCount: props.count }
      : {}
    )

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

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClasses.value
      }), {
        default: () => [
          h(Textarea, mergeProps(alipayShowCount.value, {
            class: 'at-textarea__textarea',
            style: textareaStyle.value,
            placeholderstyle: props.placeholderStyle,
            placeholderClass: placeholderClasses.value,
            cursorSpacing: props.cursorSpacing,
            value: props.value,
            maxlength: actualMaxLength.value,
            placeholder: props.placeholder,
            disabled: props.disabled,
            autoFocus: props.autoFocus,
            focus: props.focus,
            fixed: props.fixed,
            showConfirmBar: props.showConfirmBar,
            selectionStart: props.selectionStart,
            selectionEnd: props.selectionEnd,
            onInput: handleInput,
            onFocus: handleFocus,
            onBlur: handleBlur,
            onConfirm: handleConfirm,
            onLineChange: handleLinechange,
          })),

          props.count && !isAlipay && (
            h(View, {
              class: 'at-textarea__counter'
            }, { default: () => `${props.value.length} / ${_maxLength.value}` })
          )
        ]
      })
    )
  }
})

export default AtTextarea
