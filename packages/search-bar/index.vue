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
        :id="inputID"
        :type="inputType"
        :focus="isFocus"
        :disabled="disabled"
        :maxlength="maxLength"
        :value="inputValue"
        confirm-type="search"
        @blur="handleBlur"
        @input="handleInput"
        @focus="handleFocus"
        @confirm="handleConfirm"
      />

      <!-- clear icon -->
      <view
        v-if="inputValue"
        class="at-search-bar__clear"
        :style="clearIconStyle"
        @touchstart="handleClear"
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
import { BaseEventOrig, CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import { AtSearchBarProps, AtSearchBarState } from "@taro-ui-vue3/types/search-bar"
import { uuid } from "@taro-ui-vue3/utils"
import { useModelValue } from '@taro-ui-vue3/composables'

const AtSearchBar = defineComponent({
  name: "AtSearchBar",

  emits: [
    'blur',
    'focus',
    // 'clear',
    'confirm',
    'action-click',
    'update:modelValue'
  ],

  props: {
    modelValue: {
      type: String,
      default: ''
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
    },
    onClear: Function as unknown as PropType<AtSearchBarProps['onClear']>
  },

  setup(props: AtSearchBarProps, { emit }) {

    const state = reactive<AtSearchBarState>({
      isFocus: !!props.focus
    })

    const fontSize = 14
    const inputID = ref('weui-input' + uuid())
    const inputValue = useModelValue(props, emit)

    const rootClasses = computed(() => ({
      'at-search-bar': true,
      'at-search-bar--fixed': props.fixed
    }))

    const placeholderWrapStyle = computed(() => {
      const placeholderWrapStyle: CSSProperties = {}

      if (state.isFocus || (!state.isFocus && inputValue.value)) {
        placeholderWrapStyle.flexGrow = 0
      } else if (!state.isFocus && !inputValue.value) {
        placeholderWrapStyle.flexGrow = 1
      }

      return placeholderWrapStyle
    })

    const actionStyle = computed(() => {
      const actionStyle: CSSProperties = {}

      if (state.isFocus || (!state.isFocus && inputValue.value)) {
        actionStyle.opacity = 1
        actionStyle.marginRight = `0`
      } else if (!state.isFocus && !inputValue.value) {
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
      display: !inputValue.value.length ? 'none' : 'flex'
    }))

    const placeholderStyle = computed(() => ({
      visibility: !inputValue.value.length ? 'visible' : 'hidden'
    }))

    function handleFocus(event: BaseEventOrig<any>): void {
      if (process.env.TARO_ENV === 'h5') {
        // hack fix: h5 点击清除按钮后，input value 在数据层被清除，但视图层仍未清除
        inputID.value = 'weui-input' + uuid(10, 32)
      }

      state.isFocus = true
      emit('focus', event)
    }

    function handleBlur(event: BaseEventOrig<any>): void {
      state.isFocus = false
      emit('blur', event)
    }

    function handleInput(e: BaseEventOrig<any>): void {
      inputValue.value = e.detail.value

      if (process.env.TARO_ENV === 'h5' && e.detail.value === '') {
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
        props.onClear(event)
      } else {
        inputValue.value = ''
      }

      if (process.env.TARO_ENV === 'h5') {
        clearInputNodeValue()
      }
    }

    function handleConfirm(event: CommonEvent): void {
      emit('confirm', event)
    }

    function handleActionClick(event: CommonEvent): void {
      emit('action-click', event)
    }

    return {
      ...toRefs(props),
      ...toRefs(state),
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
      handleInput,
      handleConfirm,
      handleActionClick,
    }
  }
})

export default AtSearchBar
</script>
