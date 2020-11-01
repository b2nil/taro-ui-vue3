<template>
  <view :class="rootClasses">
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "../../api"
import { AtActionSheetHeaderProps } from "types/action-sheet";


export default defineComponent({
  name: "AtActionSheetHeader",



  setup(props: AtActionSheetHeaderProps, { slots }) {
    const rootClasses = computed(() => ({
      [props.className]: true,
      'at-action-sheet__header': true
    }))

    return {
      rootClasses
    }
  }
})
</script>

<style>
</style>