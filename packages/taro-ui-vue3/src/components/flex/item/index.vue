<template>
  <view :class="rootClass">
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { AtFlexItemProps } from 'types/flex'
import AtComponentWithDefaultProps from '../../mixins'
import './index.scss'

export default defineComponent({
  name: "AtFlexItem",

  mixins: [AtComponentWithDefaultProps],

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
      type: String as () => AtFlexItemProps['align'],
      default: 'center',
    },
    size: {
      type: Number as () => AtFlexItemProps['size'],
      default: 0,
    },
    offset: {
      type: Number as () => AtFlexItemProps['offset'],
      default: 0,
    },
  },

  setup(props: AtFlexItemProps, { slots }) {

    return () => {
      const rootClass = computed(() => ({
        [`at-col__align--${props.align}`]: true,
        [`at-col__offset-${props.offset}`]: true,
        [`at-col-${props.size}`]: true,
        'at-col--auto': props.isAuto,
        'at-col--wrap': props.isWrap,
        'at-col': true,
        [props.className]: props.className !== undefined,
      }))

      return {
        rootClass
      }
    }
  }
})
</script>

