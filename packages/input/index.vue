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
        :type="inputProps.type"
        :password="inputProps.password"
        :maxlength="inputProps.maxLength"
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
        @keyboardheightchange="handleKeyboardHeightChange"
      />

      <!-- clear icon -->
      <view
        v-if="clear && String(modelValue)"
        class="at-input__icon"
        @touchend="handleClearValue"
      >
        <text class="at-icon at-icon-close-circle at-input__icon-close" />
      </view>

      <!-- error icon -->
      <view
        v-if="error"
        class="at-input__icon"
        @touchend="handleErrorClick"
      >
        <text class="at-icon at-icon-close-circle at-input__icon-alert" />
      </view>

      <!-- input slot -->
      <view
        v-if="Boolean($slots.default)"
        class="at-input__children"
      >
        <slot />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, computed, toRefs, PropType } from "vue"
import { InputProps } from "@tarojs/components/types/Input"
import { BaseEventOrig, ITouchEvent } from "@tarojs/components/types/common"
import {
  AtInputProps,
  BlurEventDetail,
  FocusEventDetail,
  InputEventDetail,
  ConfirmEventDetail,
  KeyboardHeightEventDetail
} from "@taro-ui-vue3/types/input"
import { uuid } from "@taro-ui-vue3/utils"
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
      default: ''
    },
    title: String as PropType<AtInputProps['title']>,
    type: {
      type: String as PropType<AtInputProps['type']>,
      default: 'text',
      validator: (val: string) => ['text', 'number', 'password', 'phone', 'idcard', 'digit'].includes(val)
    },
    error: Boolean,
    clear: Boolean,
    disabled: Boolean,
    border: {
      type: Boolean,
      default: true
    },
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
    focus: Boolean,
    required: Boolean,
    autoFocus: Boolean,
    adjustPosition: Boolean,
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
    const inputID = ref('weui-input' + uuid())
    const inputValue = useModelValue(props, emit, 'modelValue')
    const inputProps = computed(() => getInputProps(props))

    const rootClasses = computed(() => (['at-input', {
      'at-input--without-border': !props.border
    }]))

    const containerClasses = computed(() => (['at-input__container', {
      'at-input--error': props.error,
      'at-input--disabled': inputProps.value.disabled
    }]))

    const overlayClasses = computed(() => (['at-input__overlay', {
      'at-input__overlay--hidden': !inputProps.value.disabled
    }]))

    const placeholderClasses = computed(() =>
      Boolean(props.placeholderClass)
        ? `placeholder ${props.placeholderClass}`
        : 'placeholder'
    )

    const titleClasses = computed(() => (['at-input__title', {
      'at-input__title--required': props.required
    }]))

    function handleInput(e: BaseEventOrig<InputEventDetail>) {
      if (!inputProps.value.disabled) {
        inputValue.value = e.detail.value
      }
    }

    function handleFocus(e: BaseEventOrig<FocusEventDetail>) {
      if (!inputProps.value.disabled) {
        emit("focus", e.detail.value)
        if (process.env.TARO_ENV === 'h5') {
          // hack fix: h5 点击清除按钮后，input value 在数据层被清除，但视图层仍未清除
          inputID.value = 'weui-input' + uuid(10, 32)
        }
      }
    }

    function handleBlur(e: BaseEventOrig<BlurEventDetail>) {
      if (!inputProps.value.disabled) {
        emit('blur', e.detail.value)
      }
    }

    function handleConfirm(e: BaseEventOrig<ConfirmEventDetail>) {
      if (!inputProps.value.disabled) {
        emit('confirm', e.detail.value)
      }
    }

    function handleClick(e: ITouchEvent) {
      if (!props.editable) {
        emit('click', e)
      }
    }

    function handleClearValue() {
      inputValue.value = ''

      // [hack fix]: h5 点击清除按钮后，input value 在数据层被清除，但视图层仍未清除
      if (process.env.TARO_ENV === 'h5') {
        const inputNode = document.querySelector<HTMLInputElement>(`#${inputID.value} > .weui-input`)
        inputNode!.value = ''
      }
    }

    function handleKeyboardHeightChange(
      e: BaseEventOrig<KeyboardHeightEventDetail>
    ) {
      if (!inputProps.value.disabled) {
        emit('keyboard-height-change', e)
      }
    }

    function handleErrorClick(e: ITouchEvent) {
      emit('error-click', e)
    }

    return {
      ...toRefs(props),
      inputID,
      inputProps,
      inputValue,
      rootClasses,
      titleClasses,
      overlayClasses,
      containerClasses,
      placeholderClasses,
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

export default AtInput
</script>

