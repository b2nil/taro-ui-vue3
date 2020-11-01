<template>
  <view :class="rootClasses">
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "../../api"
import { AtFlexProps } from 'types/flex'


import './index.scss'

export default defineComponent({
  name: "AtFlex",



  props: {
    wrap: {
      type: String as PropType<AtFlexProps['wrap']>,
      default: 'no-wrap',
    },
    align: {
      type: String as PropType<AtFlexProps['align']>,
      default: 'stretch',
    },
    justify: {
      type: String as PropType<AtFlexProps['justify']>,
      default: 'start',
    },
    direction: {
      type: String as PropType<AtFlexProps['direction']>,
      default: 'row',
    },
    alignContent: {
      type: String as PropType<AtFlexProps['alignContent']>,
    },
  },

  setup(props: AtFlexProps, { slots }) {

    const rootClasses = computed(() => ({
      [`at-row__align--${props.align}`]: true,
      [`at-row__align-content--${props.alignContent}`]: true,
      [`at-row__direction--${props.direction}`]: true,
      [`at-row__justify--${props.justify}`]: true,
      [`at-row--${props.wrap}`]: true,
      [props.className]: true,
      'at-row': true,
    }))

    return {
      rootClasses
    }
  }
})
</script>

