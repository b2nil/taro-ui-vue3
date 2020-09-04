<template>
  <view
    :class="rootClass"
    :style="customStyle"
  >
    <view :class="containerClass">
      <!-- overlay -->
      <view
        :class="overlayClass"
        @tap="handleClick"
      />

      <!-- title -->
      <label
        v-if="title"
        :for="name"
        :class="labelClass"
      >{{ title }}</label>

      <!-- input -->
      <input
        class="at-input__input"
        :id="name"
        :name="name"
        :type="type"
        :password="password"
        :placeholder-style="placeholderStyle"
        :placeholder-class="placeholderCls"
        :placeholder="placeholder"
        :cursor-spacing="cursorSpacing"
        :maxlength="maxlength"
        :auto-focus="autoFocus"
        :focus="focus"
        :value="value"
        :confirm-type="confirmType"
        :cursor="cursor"
        :selection-start="selectionStart"
        :selection-end="selectionEnd"
        :adjust-position="adjustPosition"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @confirm="handleConfirm"
        @keyboard-height-change="handleKeyboardHeightChange"
      />

      <!-- clear icon -->
      <view
        class="at-input__icon"
        @touch-end="handleClearValue"
      >
        <text class="at-icon at-icon-close-circle at-input__icon-close" />
      </view>

      <!-- error icon -->
      <view
        class="at-input__icon"
        @touch-end="handleErrorClick"
      >
        <text class="at-icon at-icon-close-circle at-input__icon-alert" />
      </view>

      <!-- input slot -->
      <view class="at-input__children">
        <slot />
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, computed } from "vue"
import AtComponentWithDefaultProps from "../mixins"
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

type PickAtInputProps = Pick<AtInputProps, 'maxlength' | 'disabled' | 'password'>
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

export default defineComponent({
  name: "AtInput",

  mixins: [AtComponentWithDefaultProps],

  props: {
    name: {
      type: String as () => AtInputProps['name'],
      default: '',
      required: true
    },
    title: {
      type: String as () => AtInputProps['title'],
      default: ''
    },
    type: {
      type: String as () => AtInputProps['type'],
      default: 'text' as AtInputProps['type'],
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
      type: String as () => AtInputProps['value'],
      default: ''
    },
    placeholder: {
      type: String as () => AtInputProps['placeholder'],
      default: ''
    },
    placeholderStyle: {
      type: String as () => AtInputProps['placeholderStyle'],
      default: ''
    },
    placeholderClass: {
      type: String as () => AtInputProps['placeholderClass'],
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
      type: Number as () => AtInputProps['cursorSpacing'],
      default: 50
    },
    cursor: {
      type: Number as () => AtInputProps['cursor'],
      default: 0
    },
    selectionStart: {
      type: Number as () => AtInputProps['selectionStart'],
      default: -1
    },
    selectionEnd: {
      type: Number as () => AtInputProps['selectionEnd'],
      default: -1
    },
    maxLength: {
      type: Number as () => AtInputProps['maxLength'],
      default: 140
    },
    confirmType: {
      type: String as () => AtInputProps["confirmType"],
      default: 'done' as AtInputProps["confirmType"],
      validator: (val: string) => ["done", "send", "search", "next", "go"].includes(val)
    },
    // events
    onChange: {
      type: Function as unknown as () => AtInputProps['onChange'],
      default: () => () => { },
      required: true
    },
    onBlur: Function as unknown as () => AtInputProps['onBlur'],
    onFocus: Function as unknown as () => AtInputProps['onFocus'],
    onConfirm: Function as unknown as () => AtInputProps['onConfirm'],
    onClick: Function as unknown as () => AtInputProps['onClick'],
    onKeyboardHeightChange: Function as unknown as () => AtInputProps['onKeyboardHeightChange'],
    onErrorClick: Function as unknown as () => AtInputProps['onErrorClick']
  },

  setup(props: AtInputProps, { slots }) {
    const inputClearing = ref(false)

    const { type, maxlength, disabled, password } = computed(() => getInputProps(props)).value

    const rootClass = computed(() => ({
      [props.className]: true,
      'at-input--without-border': !props.border,
      'at-input': true,
    }))

    const containerClass = computed(() => ({
      'at-input--error': props.error,
      'at-input--disabled': disabled,
      'at-input__container': true,
    }))

    const overlayClass = computed(() => ({
      'at-input__overlay': true,
      'at-input__overlay--hidden': !disabled
    }))

    const placeholderCls = computed(() => ({
      [props.placeholderClass]: true,
      'placeholder': true,
    }))

    const labelClass = computed(() => ({
      'at-input__title--required': props.required,
      'at-input__title': true
    }))


    function handleInput(e: BaseEventOrig<InputEventDetail>) {
      props.onChange(e.detail.value, e)
    }

    function handleFocus(e: BaseEventOrig<FocusEventDetail>) {
      if (typeof props.onFocus === 'function') {
        props.onFocus(e.detail.value, e)
      }
    }

    function handleBlur(e: BaseEventOrig<BlurEventDetail>) {
      if (typeof props.onBlur === 'function') {
        props.onBlur(e.detail.value, e)
      }

      if (e.type === 'blur' && inputClearing.value) {
        // fix # 583 AtInput 不触发 onChange 的问题
        props.onChange(e.detail.value, e as BaseEventOrig<InputEventDetail>)
      }
      // 还原状态
      inputClearing.value = false
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
      inputClearing.value = true
      props.onChange('', e)
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

    const {
      name,
      title,
      error,
      clear,
      focus,
      value,
      cursor,
      border,
      editable,
      required,
      autoFocus,
      confirmType,
      customStyle,
      placeholder,
      selectionEnd,
      cursorSpacing,
      selectionStart,
      adjustPosition,
      placeholderClass,
      placeholderStyle,
    } = toRefs(props)

    return {
      type,
      disabled,
      password,
      maxlength,
      name,
      title,
      error,
      clear,
      focus,
      value,
      cursor,
      border,
      editable,
      required,
      autoFocus,
      confirmType,
      customStyle,
      placeholder,
      selectionEnd,
      cursorSpacing,
      selectionStart,
      adjustPosition,
      placeholderClass,
      placeholderStyle,
      rootClass,
      labelClass,
      overlayClass,
      containerClass,
      placeholderCls,
      handleBlur,
      handleClick,
      handleFocus,
      handleInput,
      handleConfirm,
      handleClearValue,
      handleErrorClick,
      handleKeyboardHeightChange
    }
  }
})
</script>

