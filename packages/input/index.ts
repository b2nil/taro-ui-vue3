import { h, defineComponent, ref, computed, mergeProps, PropType } from "vue"
import { Input, Text, View, Label } from '@tarojs/components'
import { BaseEventOrig, ITouchEvent } from "@tarojs/components/types/common"
import { InputProps } from "@tarojs/components/types/Input"
import {
  AtInputProps,
  BlurEventDetail,
  ConfirmEventDetail,
  FocusEventDetail,
  InputEventDetail,
  KeyboardHeightEventDetail,
} from '@taro-ui-vue3/types/input'
import { uuid } from '@taro-ui-vue3/utils/common'
import { useModelValue } from '@taro-ui-vue3/composables/model'

type PickAtInputProps = Pick<AtInputProps, 'maxLength' | 'disabled' | 'password'>
type GetInputPropsReturn = PickAtInputProps & Pick<InputProps, 'type'>

function getInputProps(props: AtInputProps): GetInputPropsReturn {
  const actualProps = {
    type: props.type,
    maxLength: props.maxLength,
    disabled: props.disabled,
    password: false
  }

  switch (actualProps.type) {
    case 'phone':
      actualProps.type = 'number'
      actualProps.maxLength = 11
      break
    case 'password':
      actualProps.type = 'text'
      actualProps.password = true
      break
    default:
      break
  }

  if (!props.disabled && !props.editable) {
    actualProps.disabled = true
  }

  return actualProps as GetInputPropsReturn
}

const AtInput = defineComponent({
  name: "AtInput",

  props: {
    name: {
      type: String as PropType<AtInputProps['name']>,
      default: ''
    },
    title: {
      type: String as PropType<AtInputProps['title']>,
      default: ''
    },
    type: {
      type: String as PropType<AtInputProps['type']>,
      default: 'text',
      validator: (val: string) => ['text', 'number', 'password', 'phone', 'idcard', 'digit'].includes(val)
    },
    error: Boolean,
    clear: Boolean,
    border: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    value: {
      type: String as PropType<AtInputProps['value']>,
      default: ''
    },
    placeholder: {
      type: String as PropType<AtInputProps['placeholder']>,
      default: ''
    },
    placeholderStyle: {
      type: String as PropType<AtInputProps['placeholderStyle']>,
      default: ''
    },
    placeholderClass: {
      type: String as PropType<AtInputProps['placeholderClass']>,
      default: ''
    },
    editable: {
      type: Boolean,
      default: true
    },
    adjustPosition: Boolean,
    autoFocus: Boolean,
    focus: Boolean,
    required: Boolean,
    cursorSpacing: {
      type: Number as PropType<AtInputProps['cursorSpacing']>,
      default: 50
    },
    cursor: {
      type: Number as PropType<AtInputProps['cursor']>,
      default: 0
    },
    selectionStart: {
      type: Number as PropType<AtInputProps['selectionStart']>,
      default: -1
    },
    selectionEnd: {
      type: Number as PropType<AtInputProps['selectionEnd']>,
      default: -1
    },
    maxLength: {
      type: Number as PropType<AtInputProps['maxLength']>,
      default: 140
    },
    confirmType: {
      type: String as () => AtInputProps["confirmType"],
      default: 'done',
      validator: (val: string) => ["done", "send", "search", "next", "go"].includes(val)
    },
    // events
    onChange: Function as unknown as PropType<AtInputProps['onChange']>,
    onBlur: Function as unknown as PropType<AtInputProps['onBlur']>,
    onFocus: Function as unknown as PropType<AtInputProps['onFocus']>,
    onConfirm: Function as unknown as PropType<AtInputProps['onConfirm']>,
    onClick: Function as unknown as PropType<AtInputProps['onClick']>,
    onKeyboardHeightChange: Function as unknown as PropType<AtInputProps['onKeyboardHeightChange']>,
    onErrorClick: Function as unknown as PropType<AtInputProps['onErrorClick']>
  },

  setup(props: AtInputProps, { attrs, slots, emit }) {
    const inputValue = useModelValue(props, emit, 'value')
    const inputID = ref(`weui-input_${uuid()}`)
    const inputProps = computed(() => getInputProps(props))

    const rootClasses = computed(() => ({
      'at-input': true,
      'at-input--without-border': !props.border
    }))

    const containerClasses = computed(() => ({
      'at-input__container': true,
      'at-input--error': props.error,
      'at-input--disabled': inputProps.value.disabled
    }))

    const overlayClasses = computed(() => ({
      'at-input__overlay': true,
      'at-input__overlay--hidden': !inputProps.value.disabled
    }))

    const placeholderClasses = computed(() =>
      Boolean(props.placeholderClass)
        ? `placeholder ${props.placeholderClass}`
        : 'placeholder'
    )

    const titleClasses = computed(() => ({
      'at-input__title': true,
      'at-input__title--required': props.required
    }))

    function handleInput(e: BaseEventOrig<InputEventDetail>) {
      if (!inputProps.value.disabled) {
        if (attrs['onUpdate:value']) {
          inputValue.value = e.detail.value
        } else {
          props.onChange?.(e.detail.value, e)
        }
      }
    }

    function handleFocus(e: BaseEventOrig<FocusEventDetail>) {
      if (!inputProps.value.disabled) {
        props.onFocus?.(e.detail.value, e)
        if (process.env.TARO_ENV === 'h5') {
          // hack fix: h5 点击清除按钮后，input value 在数据层被清除，但视图层仍未清除
          inputID.value = 'weui-input' + uuid(10, 32)
        }
      }
    }

    function handleBlur(e: BaseEventOrig<BlurEventDetail>) {
      if (!inputProps.value.disabled) {
        props.onBlur?.(e.detail.value, e)
      }
    }

    function handleConfirm(e: BaseEventOrig<ConfirmEventDetail>) {
      if (!inputProps.value.disabled) {
        props.onConfirm?.(e.detail.value, e)
      }
    }

    function handleClick(e: ITouchEvent) {
      if (!props.editable && typeof props.onClick === 'function') {
        props.onClick(e)
      }
    }

    function handleClearValue(e: ITouchEvent) {
      if (attrs['onUpdate:value']) {
        inputValue.value = ''
      } else {
        props.onChange?.('', e)
      }

      // hack fix: h5 点击清除按钮后，input value 在数据层被清除，但视图层仍未清除
      if (process.env.TARO_ENV === 'h5') {
        const inputNode = document.querySelector<HTMLInputElement>(`#${inputID.value} > .weui-input`)
        inputNode!.value = ''
      }
    }

    function handleKeyboardHeightChange(
      e: BaseEventOrig<KeyboardHeightEventDetail>
    ) {
      if (!inputProps.value.disabled) {
        props.onKeyboardHeightChange?.(e)
      }
    }

    function handleErrorClick(e: ITouchEvent) {
      props.onErrorClick?.(e)
    }

    return () => {
      return (
        h(View, mergeProps(attrs, {
          class: rootClasses.value,
        }), {
          default: () => [
            h(View, {
              class: containerClasses.value
            }, {
              default: () => [
                h(View, {
                  class: overlayClasses.value,
                  onTap: handleClick
                }),

                props.title && (
                  h(Label, {
                    class: titleClasses.value,
                    for: props.name
                  }, { default: () => props.title })
                ) || null,

                h(Input, {
                  class: 'at-input__input',
                  id: inputID.value,
                  name: props.name,
                  type: inputProps.value.type,
                  password: inputProps.value.password,
                  placeholderStyle: props.placeholderStyle,
                  placeholderClass: placeholderClasses.value,
                  placeholder: props.placeholder,
                  cursorSpacing: props.cursorSpacing,
                  maxlength: inputProps.value.maxLength,
                  autoFocus: props.autoFocus,
                  focus: props.focus,
                  value: inputValue.value,
                  confirmType: props.confirmType,
                  cursor: props.cursor,
                  selectionStart: props.selectionStart,
                  selectionEnd: props.selectionEnd,
                  adjustPosition: props.adjustPosition,
                  onBlur: handleBlur,
                  onInput: handleInput,
                  onFocus: handleFocus,
                  onConfirm: handleConfirm,
                  onKeyboardheightchange: handleKeyboardHeightChange,
                }),

                (props.clear && String(props.value)) && (
                  h(View, {
                    class: 'at-input__icon',
                    onTouchstart: handleClearValue
                  }, {
                    default: () => [
                      h(Text, {
                        class: 'at-icon at-icon-close-circle at-input__icon-close'
                      })
                    ]
                  })
                ) || null,

                props.error && (
                  h(View, {
                    class: 'at-input__icon',
                    onTouchstart: handleErrorClick
                  }, {
                    default: () => [
                      h(Text, {
                        class: 'at-icon at-icon-alert-circle at-input__icon-alert'
                      })
                    ]
                  })
                ) || null,

                slots.default && h(View, {
                  class: 'at-input__children'
                }, { default: () => slots.default?.() })
              ]
            })
          ]
        })
      )
    }
  }
})

export default AtInput
