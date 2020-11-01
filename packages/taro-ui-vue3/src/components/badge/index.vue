<template>
  <view
    :class="rootClasses"
    :style="customStyle"
  >
    <slot />
    <view
      v-if="dot"
      class="at-badge__dot"
    />
    <view
      v-else-if="val !== ''"
      class="at-badge__num"
    >{{ val }}</view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, PropType } from "../../api"
import { AtBadgeProps } from "types/badge";


export default defineComponent({
  name: "AtBadge",



  props: {
    dot: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: ''
    },
    maxValue: {
      type: Number,
      default: 99
    }
  },

  setup(props: AtBadgeProps, { slots }) {

    const { dot, customStyle } = toRefs(props)

    const val = computed(() => formatValue(props.value, props.maxValue!))

    const rootClasses = computed(() => ({
      [props.className]: true,
      'at-badge': true,
    }))

    function formatValue(
      value: string | number | undefined,
      maxValue: number
    ): string | number {
      if (value === '' || value === null || value === undefined) return ''

      const numValue = +value

      if (Number.isNaN(numValue)) {
        return value
      }

      return numValue > maxValue ? `${maxValue}+` : numValue
    }

    return {
      dot,
      val,
      customStyle,
      rootClasses,
    }
  }
})

</script>

<style>
</style>