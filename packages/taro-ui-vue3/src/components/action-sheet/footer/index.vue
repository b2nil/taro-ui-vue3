<template>
  <view
    :class="rootClass"
    @tap="handleClick"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { AtActionSheetFooterProps } from "types/action-sheet";
import AtComponentWithDefaultProps from "../../mixins";

export default defineComponent({
  name: "AtActionSheetFooter",

  mixins: [AtComponentWithDefaultProps],

  props: {
    onClick: {
      type: Function as unknown as () => () => {},
      default: () => () => { }
    },
  },

  setup(props: AtActionSheetFooterProps, { slots }) {
    const rootClass = computed(() => ({
      [props.className]: true,
      'at-action-sheet__footer': true,
    }))

    function handleClick(...args: any[]) {
      props.onClick && props.onClick(...args)
    }

    return {
      rootClass,
      handleClick
    }
  }
})
</script>

<style>
</style>