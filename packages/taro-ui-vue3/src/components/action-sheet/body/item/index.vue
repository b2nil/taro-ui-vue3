<template>
  <view
    :class="rootClasses"
    @tap="handleClick"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "../../../../api"
import { CommonEvent } from "@tarojs/components/types/common"
import { AtActionSheetItemProps } from "types/action-sheet"

export default defineComponent({
  name: "AtActionSheetItem",

  props: {
    onClick: {
      type: Function as PropType<(event?: CommonEvent) => void>,
      default: () => () => { }
    },
  },

  setup(props: AtActionSheetItemProps, { slots }) {

    const rootClasses = computed(() => ({
      [props.className]: true,
      'at-action-sheet__item': true,
    }))

    function handleClick(e: CommonEvent) {
      props.onClick && props.onClick(e)
    }

    return {
      rootClasses,
      handleClick
    }
  }
})
</script>

<style>
</style>