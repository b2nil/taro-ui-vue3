<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue"
import { AtFlexItemProps } from "@taro-ui-vue3/types/flex"

export default defineComponent({
  name: "AtFlexItem",

  props: {
    isAuto: Boolean,
    isWrap: Boolean,
    align: {
      type: String as PropType<AtFlexItemProps['align']>,
    },
    size: {
      type: Number as PropType<AtFlexItemProps['size']>,
      default: 0,
    },
    offset: {
      type: Number as PropType<AtFlexItemProps['offset']>,
      default: 0,
    }
  },

  setup(props: AtFlexItemProps) {

    const rootClasses = computed(() => ({
      [`at-col-${props.size}`]: Boolean(props.size),
      [`at-col__align--${props.align}`]: Boolean(props.align),
      [`at-col__offset-${props.offset}`]: Boolean(props.offset),
      'at-col--auto': Boolean(props.isAuto),
      'at-col--wrap': Boolean(props.isWrap),
      'at-col': true,
    }))

    return {
      rootClasses
    }
  }
})
</script>

