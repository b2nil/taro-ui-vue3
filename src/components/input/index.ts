import { h, defineComponent, ref, computed, mergeProps, watch, PropType } from "vue"
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
} from "types/input"
import { ENV_TYPE, getEnv } from "@tarojs/taro"
import { uuid } from "@/utils/common"

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
      default: '',
      required: true
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
      default: 'done' as AtInputProps["confirmType"],
      validator: (val: string) => ["done", "send", "search", "next", "go"].includes(val)
    },
    // events
    onChange: {
      type: Function as PropType<AtInputProps['onChange']>,
      default: () => () => { },
      required: true
    },
    onBlur: Function as PropType<AtInputProps['onBlur']>,
    onFocus: Function as PropType<AtInputProps['onFocus']>,
    onConfirm: Function as PropType<AtInputProps['onConfirm']>,
    onClick: Function as PropType<AtInputProps['onClick']>,
    onKeyboardHeightChange: Function as PropType<AtInputProps['onKeyboardHeightChange']>,
    onErrorClick: Function as PropType<AtInputProps['onErrorClick']>
  },

  setup(props: AtInputProps, { attrs, slots }) {
    const inputValue = ref(props.value)
    const inputID = ref('weui-input' + uuid())
    const isWEB = ref(getEnv() === ENV_TYPE.WEB)

    const inputProps = computed(() => getInputProps(props))

    const rootClasses = computed(() => ({
      'at-input': true,
      'at-input--without-border': props.border
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

    const placeholderClasses = computed(() => `placeholder ${props.placeholderClass}`)

    const titleClasses = computed(() => ({
      'at-input__title': true,
      'at-input__title--required': props.required
    }))

    watch(() => props.value, (val, preVal) => {
      if (val !== preVal) {
        inputValue.value = val
      }
    })

    function handleInput(e: BaseEventOrig<InputEventDetail>) {
      props.onChange(e.detail.value, e)
    }

    function handleFocus(e: BaseEventOrig<FocusEventDetail>) {
      if (typeof props.onFocus === 'function') {
        props.onFocus(e.detail.value, e)
      }
      if (isWEB.value) {
        // hack fix: h5 点击清除按钮后，input value 在数据层被清除，但视图层仍未清除
        inputID.value = 'weui-input' + String(e.timeStamp).replace('.', '')
      }
    }

    function handleBlur(e: BaseEventOrig<BlurEventDetail>) {
      if (typeof props.onBlur === 'function') {
        props.onBlur(e.detail.value, e)
      }
    }

    function handleConfirm(e: BaseEventOrig<ConfirmEventDetail>) {
      if (typeof props.onConfirm === 'function') {
        props.onConfirm(e.detail.value, e)
      }
    }

    function handleClick(e: ITouchEvent) {
      if (!props.editable && typeof props.onClick === 'function') {
        props.onClick(e)
      }
    }

    function handleClearValue(e: ITouchEvent) {
      props.onChange('', e)

      // hack fix: h5 点击清除按钮后，input value 在数据层被清除，但视图层仍未清除
      if (isWEB.value) {
        const inputNode = document.querySelector<HTMLInputElement>(`#${inputID.value} > .weui-input`)
        inputNode!.value = ''
      }

    }

    function handleKeyboardHeightChange(
      e: BaseEventOrig<KeyboardHeightEventDetail>
    ) {
      if (typeof props.onKeyboardHeightChange === 'function') {
        props.onKeyboardHeightChange(e)
      }
    }

    function handleErrorClick(e: ITouchEvent) {
      if (typeof props.onErrorClick === 'function') {
        props.onErrorClick(e)
      }
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
                ),

                h(Input, mergeProps(isWEB.value ? { id: inputID.value } : {}, {
                  class: 'at-input__input',
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
                  onKeyboardHeightChange: handleKeyboardHeightChange,
                })),

                (props.clear && props.value) && (
                  h(View, {
                    class: 'at-input__icon',
                    onTouchStart: handleClearValue
                  }, {
                    default: () => [
                      h(Text, {
                        class: 'at-icon at-icon-close-circle at-input__icon-close'
                      })
                    ]
                  })
                ),

                props.error && (
                  h(View, {
                    class: 'at-input__icon',
                    onTouchStart: handleErrorClick
                  }, {
                    default: () => [
                      h(Text, {
                        class: 'at-icon at-icon-alert-circle at-input__icon-alert'
                      })
                    ]
                  })
                ),

                h(View, {
                  class: 'at-input__children'
                }, { default: () => slots.default && slots.default() })
              ]
            })
          ]
        })
      )
    }
  }
})

export default AtInput