import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { View } from '@tarojs/components'
import { AtTabsPaneProps } from 'types/tabs-pane'

const AtTabsPane = defineComponent({
  name: "AtTabsPane",

  props: {
    tabDirection: {
      type: String as PropType<AtTabsPaneProps['tabDirection']>,
      default: 'horizontal',
      required: true
    },
    index: {
      type: Number,
      default: 0,
      required: true
    },
    current: {
      type: Number,
      default: 0,
      required: true
    },
  },

  setup(props: AtTabsPaneProps, { attrs, slots }) {

    const rootClass = computed(() => ({
      'at-tabs-pane': true,
      'at-tabs-pane--vertical': props.tabDirection === 'vertical',
      'at-tabs-pane--active': props.index === props.current,
      'at-tabs-pane--inactive': props.index !== props.current
    }))

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClass.value
      }), { default: () => slots.default && slots.default() })
    )
  }
})

export default AtTabsPane

