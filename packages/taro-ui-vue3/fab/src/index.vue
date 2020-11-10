<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
    @tap="handleClick"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtFabProps } from "@taro-ui-vue3/types/fab"

export default defineComponent({
  name: "AtFab",

  emits: ['click'],

  props: {
    size: {
      type: String as PropType<'normal' | 'small'>,
      default: 'normal',
      validator: (prop: string) => ['normal', 'small'].includes(prop)
    }
  },

  setup(props: AtFabProps, { emit }) {

    const rootClasses = computed(() => ({
      [`at-fab--${props.size}`]: props.size,
      'at-fab': true
    }))

    function handleClick(e: CommonEvent): void {
      emit('click', e)
    }

    return {
      rootClasses,
      handleClick
    }
  }
})
</script>