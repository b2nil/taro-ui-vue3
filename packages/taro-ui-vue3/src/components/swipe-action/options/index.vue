<template>
  <view
    :class="rootClass"
    :id="`swipeActionOptions-${componentId}`"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, computed, toRef } from 'vue'
import { delayQuerySelector } from '../../../utils/common'
import { AtSwipeActionOptionsProps } from 'types/swipe-action'
import AtComponentWithDefaultProps from '../../mixins'

export default defineComponent({
  name: "AtSwipeActionOptions",

  mixins: [AtComponentWithDefaultProps],

  props: {
    componentId: {
      type: String,
      default: '',
      required: true
    },
    options: {
      type: Array as () => AtSwipeActionOptionsProps['options'],
      default: [],
      required: true
    },
    onQueryedDom: {
      type: Function as unknown as () => AtSwipeActionOptionsProps['onQueryedDom'],
      default: () => ({ width }: { width: number }) => { },
      required: true
    },
  },

  setup(props: AtSwipeActionOptionsProps, { slots }) {

    const rootClass = computed(() => ({
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
      rootClass
    }
  }
})
</script>