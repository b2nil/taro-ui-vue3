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
import { CommonEvent } from "@tarojs/components/types/common"
import { AtActionSheetItemProps } from "types/action-sheet";
import AtComponentWithDefaultProps from "../../../mixins";

export default defineComponent({
  name: "AtActionSheetItem",

  mixins: [AtComponentWithDefaultProps],

  props: {
    onClick: {
      type: Function as unknown as () => (event?: CommonEvent) => void,
      default: () => () => { }
    },
  },

  setup(props: AtActionSheetItemProps, { slots }) {

    const rootClass = computed(() => ({
      [props.className]: true,
      'at-action-sheet__item': true,
    }))

    function handleClick(e: CommonEvent) {
      props.onClick && props.onClick(e)
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