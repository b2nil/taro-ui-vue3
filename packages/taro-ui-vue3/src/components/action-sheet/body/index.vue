<template>
  <view :class="rootClasses">
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "../../../api"
import { AtActionSheetBodyProps } from "types/action-sheet";


export default defineComponent({
  name: "AtActionSheetBody",

  setup(props: AtActionSheetBodyProps, { slots }) {
    const rootClasses = computed(() => ({
      [props.className]: true,
      'at-action-sheet__body': true,
    }))

    return {
      rootClasses
    }
  }
})

</script>

<style>
</style>