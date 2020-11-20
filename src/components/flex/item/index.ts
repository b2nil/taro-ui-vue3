import { h, defineComponent, computed, mergeProps, PropType } from "vue"
import { View } from '@tarojs/components'
import { AtFlexItemProps } from 'types/flex'

const AtFlexItem = defineComponent({
  name: "AtFlexItem",

  props: {
    isAuto: Boolean,
    isWrap: Boolean,
    align: {
      type: String as PropType<AtFlexItemProps['align']>,
    },
    size: {
      type: Number as PropType<AtFlexItemProps['size']>,
      default: 0,
    },
    offset: {
      type: Number as PropType<AtFlexItemProps['offset']>,
      default: 0,
    },
  },

  setup(props: AtFlexItemProps, { attrs, slots }) {

    const rootClasses = computed(() => ({
      [`at-col-${props.size}`]: Boolean(props.size),
      [`at-col__align--${props.align}`]: Boolean(props.align),
      [`at-col__offset-${props.offset}`]: Boolean(props.offset),
      'at-col--auto': Boolean(props.isAuto),
      'at-col--wrap': Boolean(props.isWrap),
      'at-col': true,
    }))

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClasses.value
      }), { default: () => slots.default?.() })
    )
  }
})

export default AtFlexItem