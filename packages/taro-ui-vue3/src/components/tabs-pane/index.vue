<template>
  <view
    :class="rootClass"
    :style="customStyle"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRef } from 'vue'
import { AtTabsPaneProps } from 'types/tabs-pane'
import AtComponentWithDefaultProps from '../mixins'

export default defineComponent({
  name: "AtTabsPane",

  mixins: [AtComponentWithDefaultProps],

  props: {
    tabDirection: {
      type: String as () => AtTabsPaneProps['tabDirection'],
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
    const rootClass = computed(() => ({
      'at-tabs-pane': true,
      'at-tabs-pane--vertical': props.tabDirection === 'vertical',
      'at-tabs-pane--active': props.index === props.current,
      'at-tabs-pane--inactive': props.index !== props.current,
      [props.className]: true,
    }))

    return {
      customStyle: toRef(props, 'customStyle'),
      rootClass
    }
  }
})
</script>
