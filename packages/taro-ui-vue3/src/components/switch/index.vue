<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
  >
    <view class="at-switch__title">{{ title }}</view>

    <view :class="containerClasses">
      <view class="at-switch__mask" />

      <switch
        class="at-switch__switch"
        :color="color"
        :checked="checked"
        @change="handleChange"
      />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, PropType } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtSwitchProps } from "types/switch"

export default defineComponent({
  name: "AtSwitch",

  emits: {
    'change'(value: boolean) {
      return !!(typeof value === 'boolean')
    }
  },

  props: {
    title: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#6190e8'
    },
    checked: Boolean,
    disabled: Boolean,
    border: Boolean,
    onChange: Function as PropType<AtSwitchProps['onChange']>
  },

  setup(props: AtSwitchProps, { emit }) {

    const rootClasses = computed(() => ({
      'at-switch': true,
      'at-switch--without-border': !props.border
    }))

    const containerClasses = computed(() => ({
      'at-switch__container': true,
      'at-switch--disabled': props.disabled
    }))

    function handleChange(event: CommonEvent): void {
      const { value, checked } = event.detail
      const state = typeof value === 'undefined' ? checked : value
      emit('change', state)
    }

    return {
      ...toRefs(props),
      rootClasses,
      containerClasses,
      handleChange
    }
  }

})
</script>

