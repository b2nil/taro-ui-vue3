<template>
  <view
    v-bind="$attrs"
    :class="rootClasses"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue"
import { AtFlexProps } from "@taro-ui-vue3/types/flex"

export default defineComponent({
  name: "AtFlex",

  props: {
    wrap: {
      type: String as PropType<AtFlexProps['wrap']>,
    },
    align: {
      type: String as PropType<AtFlexProps['align']>,
    },
    justify: {
      type: String as PropType<AtFlexProps['justify']>,
    },
    direction: {
      type: String as PropType<AtFlexProps['direction']>,
    },
    alignContent: {
      type: String as PropType<AtFlexProps['alignContent']>,
    },
  },

  setup(props: AtFlexProps) {

    const rootClasses = computed(() => ({
      'at-row': true,
      [`at-row--${props.wrap}`]: Boolean(props.wrap),
      [`at-row__align--${props.align}`]: Boolean(props.align),
      [`at-row__justify--${props.justify}`]: Boolean(props.justify),
      [`at-row__direction--${props.direction}`]: Boolean(props.direction),
      [`at-row__align-content--${props.alignContent}`]: Boolean(props.alignContent)
    }))

    return {
      rootClasses
    }
  }
})
</script>

