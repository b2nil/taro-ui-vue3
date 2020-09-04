<template>
  <view :class="rootClass">
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { AtActionSheetHeaderProps } from "types/action-sheet";
import AtComponentWithDefaultProps from "../../mixins";

export default defineComponent({
  name: "AtActionSheetHeader",

  mixins: [AtComponentWithDefaultProps],

  setup(props: AtActionSheetHeaderProps, { slots }) {
    const rootClass = computed(() => ({
      [props.className]: true,
      'at-action-sheet__header': true
    }))

    return {
      rootClass
    }
  }
})
</script>

<style>
</style>