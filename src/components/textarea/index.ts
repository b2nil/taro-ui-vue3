import { h, defineComponent, computed } from 'vue'
import classNames from 'classnames'
import { Textarea, View } from '@/utils/components'
import { CommonEvent } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import { AtTextareaProps } from 'types/textarea'
import { pxTransform } from '@/utils/common'
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

const AtTextarea = defineComponent({
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

    return () => {
      const _maxLength = computed(() => parseInt(props.maxLength!.toString()))

      const actualMaxLength = computed(() => getMaxLength(
        _maxLength.value,
        props.textOverflowForbidden!
      ))

      const textareaStyle = computed(() => props.height
        ? `height: ${pxTransform(Number(props.height))}`
        : ''
      )

      const rootClass = computed(() => classNames(
        'at-textarea',
        `at-textarea--${ENV}`,
        {
          'at-textarea--error': _maxLength.value < props.value.length
        },
        props.className
      ))

      const placeholderCls = computed(() => classNames(
        'placeholder',
        props.placeholderClass
      ))

      return (
        h(View, {
          class: rootClass.value,
          style: props.customStyle
        }, {
          default: () => [
            h(Textarea, {
              class: 'at-textarea__textarea',
              style: textareaStyle.value,
              placeholderstyle: props.placeholderStyle,
              placeholderClass: placeholderCls.value,
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
            }),
            props.count && h(View, {
              class: 'at-textarea__counter'
            }, `${props.value.length} / ${_maxLength.value}`)
          ]
        })
      )
    }
  }
})

export default AtTextarea
