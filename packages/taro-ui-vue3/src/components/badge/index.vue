<template>
  <view
    v-bind="$attrs"
    class="at-badge"
  >
    <slot />
    <view
      v-if="dot"
      class="at-badge__dot"
    />
    <view
      v-else-if="formatedValue !== ''"
      class="at-badge__num"
    >{{ formatedValue }}</view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from "vue"
import { AtBadgeProps } from "types/badge"

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

  setup(props: AtBadgeProps) {

    const { dot } = toRefs(props)

    const formatedValue = computed(() => formatValue(props.value, props.maxValue!))

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
      formatedValue
    }
  }
})

</script>