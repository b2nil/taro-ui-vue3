<template>
  <view
    :class="rootClasses"
    :id="`swipeActionOptions-${componentId}`"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, computed, toRef } from 'vue'
import { delayQuerySelector } from '../../../utils/common'
import { AtSwipeActionOptionsProps } from 'types/swipe-action'


export default defineComponent({
  name: "AtSwipeActionOptions",



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
    },
    onQueryedDom: {
      type: Function as PropType<AtSwipeActionOptionsProps['onQueryedDom']>,
      default: () => ({ width }: { width: number }) => { },
      required: true
    },
  },

  setup(props: AtSwipeActionOptionsProps, { slots }) {

    const rootClasses = computed(() => ({
      [props.className]: true,
      'at-swipe-action__options': true,
    }))

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
        props.onQueryedDom(arr[0])
      })
    }

    onMounted(() => {
      trrigerOptionsDomUpadte()
    })

    return {
      componentId: toRef(props, "componentId"),
      rootClasses
    }
  }
})
</script>