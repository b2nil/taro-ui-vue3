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
import { defineComponent, computed, toRef } from "vue"
import { AtBadgeProps } from "@taro-ui-vue3/types/badge"

const AtBadge = defineComponent({
  name: "AtBadge",

  props: {
    dot: Boolean,
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

    const formatedValue = computed(() => formatValue(props.value, props.maxValue!))

    function formatValue(
      value: string | number | undefined,
      maxValue: number
    ): string | number {
      if (!Boolean(value)) return ''

      const numValue = +value!

      if (Number.isNaN(numValue)) {
        return value!
      }

      return numValue > maxValue ? `${maxValue}+` : numValue
    }

    return {
      dot: toRef(props, 'dot'),
      formatedValue
    }
  }
})

export default AtBadge
</script>