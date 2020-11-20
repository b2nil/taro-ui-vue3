<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
  >
    <view :class="containerClasses">
      <!-- overlay -->
      <view
        :class="overlayClasses"
        @tap="handleClick"
      />

      <!-- title -->
      <label
        v-if="title"
        :for="name"
        :class="titleClasses"
      >{{ title }}</label>

      <!-- input -->
      <input
        class="at-input__input"
        :id="inputID"
        :name="name"
        :value="inputValue"
        :type="actualInputProps.type"
        :password="actualInputProps.password"
        :maxlength="actualInputProps.maxLength"
        :placeholder="placeholder"
        :placeholder-style="placeholderStyle"
        :placeholder-class="placeholderClasses"
        :focus="focus"
        :cursor="cursor"
        :auto-focus="autoFocus"
        :confirm-type="confirmType"
        :selection-end="selectionEnd"
        :cursor-spacing="cursorSpacing"
        :selection-start="selectionStart"
        :adjust-position="adjustPosition"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @confirm="handleConfirm"
        @keyboard-height-change="handleKeyboardHeightChange"
      />

      <!-- clear icon -->
      <view
        v-if="clear && inputValue"
        class="at-input__icon"
        @touch-end="handleClearValue"
      >
        <text class="at-icon at-icon-close-circle at-input__icon-close" />
      </view>

      <!-- error icon -->
      <view
        v-if="error"
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
import { defineComponent, ref, computed, watch, toRefs, PropType } from "vue"
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

export default defineComponent({
  name: "AtInput",

  emits: [
    "blur",
    "focus",
    "confirm",
    "click",
    "error-click",
    "update:modelValue",
    "keyboard-height-change"
  ],

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
    modelValue: {
      type: String as PropType<AtInputProps['modelValue']>,
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
      type: String as PropType<AtInputProps["confirmType"]>,
      default: 'done',
      validator: (val: string) => ["done", "send", "search", "next", "go"].includes(val)
    }
  },

  setup(props: AtInputProps, { emit }) {
    const inputValue = ref(props.modelValue)
    const inputID = ref('weui-input' + uuid())
    const isWEB = ref(getEnv() === ENV_TYPE.WEB)

    const actualInputProps = computed(() => getInputProps(props))

    const rootClasses = computed(() => ({
      'at-input': true,
      'at-input--without-border': props.border
    }))

    const containerClasses = computed(() => ({
      'at-input__container': true,
      'at-input--error': props.error,
      'at-input--disabled': actualInputProps.value.disabled
    }))

    const overlayClasses = computed(() => ({
      'at-input__overlay': true,
      'at-input__overlay--hidden': !actualInputProps.value.disabled
    }))

    const placeholderClasses = computed(() => ({
      'placeholder': true,
      [`${props.placeholderClass}`]: Boolean(props.placeholderClass)
    }))

    const titleClasses = computed(() => ({
      'at-input__title': true,
      'at-input__title--required': props.required
    }))

    watch(() => props.modelValue, (val, preVal) => {
      if (val !== preVal) {
        inputValue.value = val
      }
    })

    function handleInput(e: BaseEventOrig<InputEventDetail>) {
      emit('update:modelValue', e.detail.value)
    }

    function handleFocus(e: BaseEventOrig<FocusEventDetail>) {
      emit("focus", e.detail.value)
      if (isWEB.value) {
        // hack fix: h5 点击清除按钮后，input value 在数据层被清除，但视图层仍未清除
        inputID.value = 'weui-input' + String(e.timeStamp).replace('.', '')
      }
    }

    function handleBlur(e: BaseEventOrig<BlurEventDetail>) {
      emit('blur', e.detail.value)
    }

    function handleConfirm(e: BaseEventOrig<ConfirmEventDetail>) {
      emit('confirm', e.detail.value)
    }

    function handleClick(e: ITouchEvent) {
      if (!props.editable) {
        emit('click', e)
      }
    }

    function handleClearValue(e: ITouchEvent) {
      inputValue.value = ''
      emit('update:modelValue', '', e)

      // hack fix: h5 点击清除按钮后，input value 在数据层被清除，但视图层仍未清除
      if (isWEB.value) {
        const inputNode = document.querySelector<HTMLInputElement>(`#${inputID.value} > .weui-input`)
        inputNode!.value = ''
      }
    }

    function handleKeyboardHeightChange(
      e: BaseEventOrig<KeyboardHeightEventDetail>
    ) {
      emit('keyboard-height-change', e)
    }

    function handleErrorClick(e: ITouchEvent) {
      emit('error-click', e)
    }

    const {
      name,
      title,
      error,
      clear,
      focus,
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
      placeholderStyle,
    } = toRefs(props)

    return {
      actualInputProps,
      name,
      title,
      error,
      clear,
      focus,
      inputValue,
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
      placeholderStyle,
      rootClasses,
      titleClasses,
      overlayClasses,
      containerClasses,
      placeholderClasses,
      inputID,
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

