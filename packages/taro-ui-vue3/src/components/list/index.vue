<template>
  <view :class="rootClass">
    <slot />
  </view>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { AtListProps } from "types/list"

export default defineComponent({
  name: "AtList",

  props: {
    hasBorder: { type: Boolean, default: true },
  },

  setup(props: AtListProps, { slots }) {

    const rootClass = computed(() => ({
      [props.className]: true,
      'at-list--no-border': !props.hasBorder,
      'at-list': true,
    }))

    return {
      rootClass
    }
  }
})
</script>

