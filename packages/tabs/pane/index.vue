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
import { AtTabsPaneProps } from "@taro-ui-vue3/types/tabs-pane"

const AtTabsPane = defineComponent({
  name: "AtTabsPane",

  props: {
    tabDirection: {
      type: String as PropType<AtTabsPaneProps['tabDirection']>,
      default: 'horizontal'
    },
    index: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 0
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

export default AtTabsPane
</script>
