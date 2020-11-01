<template>
  <view
    :class="rootClasses"
    :style="customStyle"
  >
    <view class="at-switch__title">{{ title }}</view>
    <view :class="containerClass">
      <view class="at-switch__mask" />
      <switch
        class="at-switch__switch"
        :checked="checked"
        :color="color"
        @change="handleChange"
      />
    </view>
  </view>
</template>

<script lang="ts">
import { CommonEvent } from '@tarojs/components/types/common'
import { AtSwitchProps } from 'types/switch'

import { defineComponent, computed, toRefs } from 'vue'

export default defineComponent({
  name: "AtSwitch",



  props: {
    title: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#6190e8'
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    onChange: Function as PropType<AtSwitchProps['onChange']>,
  },

  setup(props: AtSwitchProps, { slots }) {

    const rootClasses = computed(() => ({
      [props.className]: true,
      'at-switch--without-border': !props.border,
      'at-switch': true,
    }))

    const containerClass = computed(() => ({
      'at-switch__container': true,
      'at-switch--disabled': props.disabled
    }))

    function handleChange(event: CommonEvent): void {
      const { value, checked } = event.detail
      const state = typeof value === 'undefined' ? checked : value
      props.onChange && props.onChange(state)
    }

    return {
      ...toRefs(props),
      rootClasses,
      containerClass,
      handleChange

    }
  }

})
</script>

