<template>
  <view
    v-bind="$attrs"
    :id="`swipeActionOptions-${componentId}`"
    class="at-swipe-action__options"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, toRef, PropType } from 'vue'
import { delayQuerySelector } from "@/utils/common"
import { AtSwipeActionOptionsProps } from "types/swipe-action"


export default defineComponent({
  name: "AtSwipeActionOptions",

  emits: {
    'queryed-dom'({ width }: { width: number }) {
      return !!(width && typeof width === 'number')
    }
  },

  props: {
    componentId: {
      type: String,
      default: '',
      required: true
    },
    options: {
      type: Array as PropType<AtSwipeActionOptionsProps['options']>,
      default: [],
      required: true
    }
  },

  setup(props: AtSwipeActionOptionsProps, { emit }) {

    watch(() => props.options, (options, preOptions) => {
      if (options !== preOptions) {
        trrigerOptionsDomUpadte()
      }
    })

    function trrigerOptionsDomUpadte(): void {
      delayQuerySelector(
        this,
        `#swipeActionOptions-${props.componentId}`,
        100
      ).then(res => {
        const arr = [...res]

        if (Boolean(arr[0])) {
          emit('queryed-dom', arr[0])
        }
      })
    }

    onMounted(() => {
      trrigerOptionsDomUpadte()
    })

    return {
      componentId: toRef(props, "componentId")
    }
  }
})
</script>