<template>
  <view
    :class="rootClass"
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
import { defineComponent, computed, toRefs } from "vue"
import { AtBadgeProps } from "types/badge";
import AtComponentWithDefaultProps from "../mixins";

export default defineComponent({
  name: "AtBadge",

  mixins: [AtComponentWithDefaultProps],

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

    const rootClass = computed(() => ({
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
      rootClass,
    }
  }
})

</script>

<style>
</style>