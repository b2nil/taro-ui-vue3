<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
  >
    <!-- searchbar input -->
    <view class="at-search-bar__input-cnt">
      <!-- placeholder -->
      <view
        class="at-search-bar__placeholder-wrap"
        :style="placeholderWrapStyle"
      >
        <text class="at-icon at-icon-search" />
        <text
          class="at-search-bar__placeholder"
          :style="placeholderStyle"
        >{{ isFocus ? '' : placeholder }}</text>
      </view>

      <!-- input -->
      <input
        class="at-search-bar__input"
        :id="isWEB ? inputID : null"
        :type="inputType"
        :focus="isFocus"
        :disabled="disabled"
        :maxlength="maxLength"
        v-model="inputValue"
        confirm-type="search"
        @input="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @confirm="handleConfirm"
      />

      <!-- clear icon -->
      <view
        v-if="modelValue"
        class="at-search-bar__clear"
        :style="clearIconStyle"
        @touch-start="handleClear"
      >
        <text class="at-icon at-icon-close-circle" />
      </view>
    </view>

    <!-- action -->
    <view
      class="at-search-bar__action"
      :style="actionStyle"
      @tap="handleActionClick"
    >{{ actionName }}</view>
  </view>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  CSSProperties,
  ref,
  toRefs,
  PropType
} from 'vue'
import { CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import { AtSearchBarProps, AtSearchBarState } from "@taro-ui-vue3/types/search-bar"
import { ENV_TYPE, getEnv } from '@tarojs/taro'
import { uuid } from "@taro-ui-vue3/utils/common"

type ExtendEvent = {
  target: {
    value: string
  }
}

export default defineComponent({
  name: "AtSearchBar",

  emits: [
    'blur',
    'focus',
    'clear',
    'confirm',
    'action-click',
    'update:modelValue'
  ],

  props: {
    modelValue: {
      type: String,
      default: '',
      required: true
    },
    placeholder: {
      type: String,
      default: '搜索'
    },
    maxLength: {
      type: Number,
      default: 140
    },
    fixed: Boolean,
    focus: Boolean,
    disabled: Boolean,
    showActionButton: Boolean,
    actionName: {
      type: String,
      default: '搜索'
    },
    inputType: {
      type: String as PropType<AtSearchBarProps['inputType']>,
      default: 'text'
    }
  },

  setup(props: AtSearchBarProps, { emit }) {

    const state = reactive<AtSearchBarState>({
      isFocus: !!props.focus
    })

    const isWEB = ref(getEnv() === ENV_TYPE.WEB)
    const inputID = ref('weui-input' + uuid())
    const inputValue = ref(props.modelValue)

    const fontSize = 14

    const rootClasses = computed(() => ({
      'at-search-bar': true,
      'at-search-bar--fixed': props.fixed
    }))

    const placeholderWrapStyle = computed(() => {
      const placeholderWrapStyle: CSSProperties = {}

      if (state.isFocus || (!state.isFocus && props.modelValue)) {
        placeholderWrapStyle.flexGrow = 0
      } else if (!state.isFocus && !props.modelValue) {
        placeholderWrapStyle.flexGrow = 1
      }

      return placeholderWrapStyle
    })

    const actionStyle = computed(() => {
      const actionStyle: CSSProperties = {}

      if (state.isFocus || (!state.isFocus && props.modelValue)) {
        actionStyle.opacity = 1
        actionStyle.marginRight = `0`
      } else if (!state.isFocus && !props.modelValue) {
        actionStyle.opacity = 0
        actionStyle.marginRight = `-${(props.actionName!.length + 1) * fontSize + fontSize / 2 + 10
          }px`
      }

      if (props.showActionButton) {
        actionStyle.opacity = 1
        actionStyle.marginRight = `0`
      }

      return actionStyle
    })

    const clearIconStyle = computed(() => ({
      display: !props.modelValue.length ? 'none' : 'flex'
    }))

    const placeholderStyle = computed(() => ({
      visibility: !props.modelValue.length ? 'visible' : 'hidden'
    }))

    function handleFocus(event: CommonEvent): void {
      if (isWEB.value) {
        // hack fix: h5 点击清除按钮后，input value 在数据层被清除，但视图层仍未清除
        inputID.value = 'weui-input' + String(event.timeStamp).replace('.', '')
      }

      state.isFocus = true
      emit('focus', event.detail.value)
    }

    function handleBlur(event: CommonEvent): void {
      state.isFocus = false
      emit('blur', event.detail.value)
    }

    function handleChange(e: CommonEvent & ExtendEvent): void {
      emit('update:modelValue', e.detail.value)

      if (isWEB.value && e.detail.value === '') {
        clearInputNodeValue()
      }
    }

    // hack fix: h5 点击清除按钮后，input value 在数据层被清除，但视图层仍未清除
    function clearInputNodeValue() {
      const inputNode = document.querySelector<HTMLInputElement>(`#${inputID.value} > .weui-input`)
      inputNode!.value = ''
    }

    function handleClear(event: ITouchEvent): void {
      if (typeof props.onClear === 'function') {
        emit('clear', event)
      } else {
        emit('update:modelValue', '')
      }

      if (isWEB.value) {
        clearInputNodeValue()
      }
    }

    function handleConfirm(event: CommonEvent): void {
      emit('confirm', event)
    }

    function handleActionClick(event: CommonEvent): void {
      emit('action-click', event)

      // default to clear value after action click
      emit('update:modelValue', '')
      if (isWEB.value) {
        clearInputNodeValue()
      }
    }

    return {
      ...toRefs(props),
      ...toRefs(state),
      isWEB,
      inputID,
      inputValue,
      rootClasses,
      actionStyle,
      clearIconStyle,
      placeholderStyle,
      placeholderWrapStyle,
      handleBlur,
      handleClear,
      handleFocus,
      handleChange,
      handleConfirm,
      handleActionClick,
    }
  }
})
</script>
