<template>
  <view :class="rootClass">
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { AtActionSheetBodyProps } from "types/action-sheet";
import AtComponentWithDefaultProps from "../../mixins";

export default defineComponent({
  name: "AtActionSheetBody",

  mixins: [AtComponentWithDefaultProps],

  setup(props: AtActionSheetBodyProps, { slots }) {
    const rootClass = computed(() => ({
      [props.className]: true,
      'at-action-sheet__body': true,
    }))

    return {
      rootClass
    }
  }
})

</script>

<style>
</style>