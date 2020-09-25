import { h, defineComponent, computed, mergeProps } from 'vue'
import { View } from '@tarojs/components'
import { AtListProps } from "types/list"

const AtList = defineComponent({
  name: "AtList",

  props: {
    hasBorder: { type: Boolean, default: true },
  },

  setup(props: AtListProps, { attrs, slots }) {

    const rootClasses = computed(() => ({
      'at-list': true,
      'at-list--no-border': !props.hasBorder,
    }))

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClasses.value
      }), { default: () => slots.default && slots.default() })
    )
  }
})

export default AtList