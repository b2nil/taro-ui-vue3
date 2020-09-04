<template>
  <view :class="rootClass">
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { AtFlexProps } from 'types/flex'

import AtComponentWithDefaultProps from '../mixins'
import './index.scss'

export default defineComponent({
  name: "AtFlex",

  mixins: [AtComponentWithDefaultProps],

  props: {
    wrap: {
      type: String as () => AtFlexProps['wrap'],
      default: 'no-wrap',
    },
    align: {
      type: String as () => AtFlexProps['align'],
      default: 'stretch',
    },
    justify: {
      type: String as () => AtFlexProps['justify'],
      default: 'start',
    },
    direction: {
      type: String as () => AtFlexProps['direction'],
      default: 'row',
    },
    alignContent: {
      type: String as () => AtFlexProps['alignContent'],
    },
  },

  setup(props: AtFlexProps, { slots }) {

    const rootClass = computed(() => ({
      [`at-row__align--${props.align}`]: true,
      [`at-row__align-content--${props.alignContent}`]: true,
      [`at-row__direction--${props.direction}`]: true,
      [`at-row__justify--${props.justify}`]: true,
      [`at-row--${props.wrap}`]: true,
      [props.className]: true,
      'at-row': true,
    }))

    return {
      rootClass
    }
  }
})
</script>

