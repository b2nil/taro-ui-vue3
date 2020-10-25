import { defineComponent, onMounted, watch, h, mergeProps, PropType } from 'vue'
import { View } from '@tarojs/components'
import { delayQuerySelector } from '@/utils/common'
import { AtSwipeActionOptionsProps } from 'types/swipe-action'

const AtSwipeActionOptions = defineComponent({
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

  setup(props: AtSwipeActionOptionsProps, { attrs, slots }) {

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
          props.onQueryedDom(arr[0])
        }
      })
    }

    onMounted(() => {
      trrigerOptionsDomUpadte()
    })

    return () => (
      h(View, mergeProps(attrs, {
        id: `swipeActionOptions-${props.componentId}`,
        class: 'at-swipe-action__options'
      }), { default: () => slots.default && slots.default() })
    )
  }
})

export default AtSwipeActionOptions