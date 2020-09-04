<template>
  <view
    :class="rootClass"
    @tap="handleClick"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { CommonEvent, CommonEventFunction } from '@tarojs/components/types/common'
import { AtFabProps } from "types/fab"

export default defineComponent({
  name: "AtFab",
  props: {
    size: {
      type: String as () => 'normal' | 'small',
      default: () => 'normal' as 'normal' | 'small',
      validator: (prop: string) => ['normal', 'small'].includes(prop)
    },
    onClick: {
      type: Function as unknown as () => CommonEventFunction,
      default: () => () => { }
    }
  },

  setup(props: AtFabProps, { slots }) {

    const rootClass = computed(() => ({
      [`at-fab--${props.size}`]: props.size,
      [props.className]: true,
      'at-fab': true,
    }))

    function handleClick(e: CommonEvent): void {
      if (typeof props.onClick === 'function') {
        props.onClick(e)
      }
    }

    return {
      rootClass,
      handleClick
    }
  }
})
</script>