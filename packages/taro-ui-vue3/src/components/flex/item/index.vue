<template>
  <view :class="rootClasses">
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "../../api"
import { AtFlexItemProps } from 'types/flex'

import './index.scss'

export default defineComponent({
  name: "AtFlexItem",



  props: {
    isAuto: {
      type: Boolean,
      default: false,
    },
    isWrap: {
      type: Boolean,
      default: false,
    },
    align: {
      type: String as PropType<AtFlexItemProps['align']>,
      default: 'center',
    },
    size: {
      type: Number as PropType<AtFlexItemProps['size']>,
      default: 0,
    },
    offset: {
      type: Number as PropType<AtFlexItemProps['offset']>,
      default: 0,
    },
  },

  setup(props: AtFlexItemProps, { slots }) {

    return () => {
      const rootClasses = computed(() => ({
        [`at-col__align--${props.align}`]: true,
        [`at-col__offset-${props.offset}`]: true,
        [`at-col-${props.size}`]: true,
        'at-col--auto': props.isAuto,
        'at-col--wrap': props.isWrap,
        'at-col': true,
        [props.className]: props.className !== undefined,
      }))

      return {
        rootClasses
      }
    }
  }
})
</script>

