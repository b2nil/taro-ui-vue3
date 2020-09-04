<template>
  <view
    class="rootClass"
    :style="customStyle"
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
        :type="inputType"
        confirm-type="search"
        :value="value"
        :focus="isFocus"
        :disabled="disabled"
        :maxlength="maxLength"
        @input="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @confirm="handleConfirm"
      />

      <!-- clear icon -->
      <view
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
      :style="actionStye"
      @tap="handleActionClick"
    >{{ actionName }}</view>
  </view>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, CSSProperties, toRefs } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtSearchBarProps, AtSearchBarState } from 'types/search-bar'
import AtComponentWithDefaultProps from '../mixins'

type ExtendEvent = {
  target: {
    value: string
  }
}

export default defineComponent({
  name: "AtSearchBar",

  mixins: [AtComponentWithDefaultProps],

  props: {
    value: {
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
    fixed: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showActionButton: {
      type: Boolean,
      default: false
    },
    actionName: {
      type: String,
      default: '搜索'
    },
    inputType: {
      type: String as () => AtSearchBarProps['inputType'],
      default: 'text' as AtSearchBarProps['inputType']
    },
    onChange: {
      type: Function as unknown as () => AtSearchBarProps['onChange'],
      default: () => (value: string, event: CommonEvent) => { },
      required: true
    },
    onFocus: Function as unknown as () => AtSearchBarProps['onFocus'],
    onBlur: Function as unknown as () => AtSearchBarProps['onBlur'],
    onConfirm: Function as unknown as () => AtSearchBarProps['onConfirm'],
    onActionClick: Function as unknown as () => AtSearchBarProps['onActionClick'],
    onClear: Function as unknown as () => AtSearchBarProps['onClear'],
  },

  setup(props: AtSearchBarProps, { slots }) {

    const state = reactive<AtSearchBarState>({
      isFocus: !!props.focus
    })

    const fontSize = 14

    const rootClass = computed(() => ({
      [props.className]: true,
      'at-search-bar--fixed': props.fixed,
      'at-search-bar': true,
    }))

    const placeholderWrapStyle = computed(() => ({
      flexGrow: (state.isFocus || (!state.isFocus && props.value))
        ? 0
        : (!state.isFocus && !props.value) ? 1 : undefined
    }))

    const actionStyle = computed(() => {
      const actionStyle: CSSProperties = {}

      if (state.isFocus || (!state.isFocus && props.value)) {
        actionStyle.opacity = 1
        actionStyle.marginRight = `0`
      } else if (!state.isFocus && !props.value) {
        actionStyle.opacity = 0
        actionStyle.marginRight = `-${
          (props.actionName!.length + 1) * fontSize + fontSize / 2 + 10
          }px`
      }

      if (props.showActionButton) {
        actionStyle.opacity = 1
        actionStyle.marginRight = `0`
      }

      return actionStyle
    })

    const clearIconStyle = computed(() => ({
      display: !props.value.length ? 'none' : 'flex'
    }))

    const placeholderStyle = computed(() => ({
      visibility: !props.value.length ? 'visible' : 'hidden'
    }))


    function handleFocus(event: CommonEvent): void {
      state.isFocus = true
      props.onFocus && props.onFocus(event)
    }

    function handleBlur(event: CommonEvent): void {
      state.isFocus = false
      props.onBlur && props.onBlur(event)
    }

    function handleChange(e: CommonEvent & ExtendEvent): void {
      props.onChange(e.target.value, e)
    }

    function handleClear(event: CommonEvent): void {
      if (props.onClear) {
        props.onClear(event)
      } else {
        props.onChange('', event)
      }
    }

    function handleConfirm(event: CommonEvent): void {
      props.onConfirm && props.onConfirm(event)
    }

    function handleActionClick(event: CommonEvent): void {
      props.onActionClick && props.onActionClick(event)
    }

    return {
      ...toRefs(props),
      ...toRefs(state),
      rootClass,
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
