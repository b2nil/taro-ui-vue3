<template>
  <view
    :class="rootClasses"
    @tap="handleClick"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "../../api"
import { AtActionSheetFooterProps } from "types/action-sheet";


export default defineComponent({
  name: "AtActionSheetFooter",



  props: {
    onClick: {
      type: Function as PropType<() => {}>,
      default: () => () => { }
    },
  },

  setup(props: AtActionSheetFooterProps, { slots }) {
    const rootClasses = computed(() => ({
      [props.className]: true,
      'at-action-sheet__footer': true,
    }))

    function handleClick(...args: any[]) {
      props.onClick && props.onClick(...args)
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