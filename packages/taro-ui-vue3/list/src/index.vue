<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { AtListProps } from "@taro-ui-vue3/types/list"

export default defineComponent({
  name: "AtList",

  props: {
    hasBorder: { type: Boolean, default: true },
  },

  setup(props: AtListProps) {

    const rootClasses = computed(() => ({
      'at-list--no-border': !props.hasBorder,
      'at-list': true,
    }))

    return {
      rootClasses
    }
  }
})
</script>

