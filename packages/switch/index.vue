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
        :checked="modelChecked"
        @change="handleChange"
      />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtSwitchProps } from "@taro-ui-vue3/types/switch"
import { useModelValue } from '@taro-ui-vue3/composables'

const AtSwitch = defineComponent({
  name: "AtSwitch",

  emits: {
    'update:checked': (value: boolean) => !!(typeof value === 'boolean')
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
    border: Boolean,
    checked: Boolean,
    disabled: Boolean
  },

  setup(props: AtSwitchProps, { emit }) {
    const modelChecked = useModelValue(props, emit, 'checked')

    const rootClasses = computed(() => ({
      'at-switch': true,
      'at-switch--without-border': !props.border
    }))

    const containerClasses = computed(() => ({
      'at-switch__container': true,
      'at-switch--disabled': props.disabled
    }))

    function handleChange(event: CommonEvent) {
      const { value, checked } = event.detail
      const state = typeof value === 'undefined' ? checked : value
      modelChecked.value = state
    }

    return {
      ...toRefs(props),
      modelChecked,
      rootClasses,
      containerClasses,
      handleChange
    }
  }
})

export default AtSwitch
</script>
