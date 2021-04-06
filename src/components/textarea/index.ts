import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { Textarea, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import { AtTextareaProps } from 'types/textarea'
import { pxTransform } from '../../utils/common'
import { useModelValue } from '../../composables/model'

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
    onChange: Function as unknown as PropType<AtTextareaProps['onChange']>,
    onFocus: Function as unknown as PropType<AtTextareaProps['onFocus']>,
    onBlur: Function as unknown as PropType<AtTextareaProps['onBlur']>,
    onConfirm: Function as unknown as PropType<AtTextareaProps['onConfirm']>,
    onLinechange: Function as unknown as PropType<AtTextareaProps['onLinechange']>,
  },

  setup(props: AtTextareaProps, { attrs, emit }) {
    const inputValue = useModelValue(props, emit, 'value')

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
      'at-textarea--error': _maxLength.value < inputValue.value.length
    }))

    const placeholderClasses = computed(() => `placeholder ${props.placeholderClass}`)

    function handleInput(event: CommonEvent & ExtendEvent): void {
      if (attrs['onUpdate:value']) {
        inputValue.value = event.target.value
      } else {
        props.onChange?.(event.target.value, event)
      }
    }

    function handleFocus(event: CommonEvent): void {
      props.onFocus?.(event)
    }

    function handleBlur(event: CommonEvent): void {
      props.onBlur?.(event)
    }

    function handleConfirm(event: CommonEvent): void {
      props.onConfirm?.(event)
    }

    function handleLinechange(event: CommonEvent): void {
      props.onLinechange?.(event)
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClasses.value
      }), {
        default: () => [
          h(Textarea, mergeProps(
            process.env.TARO_ENV === 'alipay' ? { showCount: props.count } : {},
            {
              class: 'at-textarea__textarea',
              style: textareaStyle.value,
              placeholderStyle: props.placeholderStyle,
              placeholderClass: placeholderClasses.value,
              cursorSpacing: props.cursorSpacing,
              value: inputValue.value,
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
              onLinechange: handleLinechange,
            })),

          props.count && process.env.TARO_ENV !== 'alipay' && (
            h(View, {
              class: 'at-textarea__counter'
            }, { default: () => `${inputValue.value.length} / ${_maxLength.value}` })
          )
        ]
      })
    )
  }
})

export default AtTextarea
