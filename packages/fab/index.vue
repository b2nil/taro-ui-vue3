<template>
  <view
    v-bind="$attrs"
    :class="['at-fab', { [`at-fab--${size}`]: size } ]"
    @tap="handleClick"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtFabProps } from "@taro-ui-vue3/types/fab"

const AtFab = defineComponent({
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
    function handleClick(e: CommonEvent) {
      emit('click', e)
    }

    return {
      ...toRefs(props),
      handleClick
    }
  }
})

export default AtFab
</script>