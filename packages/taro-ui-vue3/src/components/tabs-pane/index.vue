<template>
  <view
    :class="rootClasses"
    :style="customStyle"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRef } from 'vue'
import { AtTabsPaneProps } from 'types/tabs-pane'


export default defineComponent({
  name: "AtTabsPane",



  props: {
    tabDirection: {
      type: String as PropType<AtTabsPaneProps['tabDirection']>,
      default: 'horizontal' as AtTabsPaneProps['tabDirection'],
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

  setup(props: AtTabsPaneProps, { slots }) {
    const rootClasses = computed(() => ({
      'at-tabs-pane': true,
      'at-tabs-pane--vertical': props.tabDirection === 'vertical',
      'at-tabs-pane--active': props.index === props.current,
      'at-tabs-pane--inactive': props.index !== props.current,
      [props.className]: true,
    }))

    return {
      customStyle: toRef(props, 'customStyle'),
      rootClasses
    }
  }
})
</script>
