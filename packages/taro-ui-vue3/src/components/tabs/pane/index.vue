<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { AtTabsPaneProps } from "types/tabs-pane"

export default defineComponent({
  name: "AtTabsPane",

  props: {
    tabDirection: {
      type: String as PropType<AtTabsPaneProps['tabDirection']>,
      default: 'horizontal',
      required: true
    },
    index: {
      type: Number,
      default: 0,
      required: true
    },
    current: {
      type: Number,
      default: 0,
      required: true
    },
  },

  setup(props: AtTabsPaneProps) {

    const rootClasses = computed(() => ({
      'at-tabs-pane--active': props.index === props.current,
      'at-tabs-pane--inactive': props.index !== props.current,
      'at-tabs-pane--vertical': props.tabDirection === 'vertical',
      'at-tabs-pane': true,
    }))

    return {
      rootClasses
    }
  }
})
</script>
