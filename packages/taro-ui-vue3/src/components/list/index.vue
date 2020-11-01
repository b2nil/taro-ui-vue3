<template>
  <view :class="rootClasses">
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

    const rootClasses = computed(() => ({
      [props.className]: true,
      'at-list--no-border': !props.hasBorder,
      'at-list': true,
    }))

    return {
      rootClasses
    }
  }
})
</script>

