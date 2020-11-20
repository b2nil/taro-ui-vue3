import { h, defineComponent, computed, mergeProps, PropType } from "vue"
import { View } from '@tarojs/components'
import { AtFlexProps } from 'types/flex'

const AtFlex = defineComponent({
  name: "AtFlex",

  props: {
    wrap: {
      type: String as PropType<AtFlexProps['wrap']>,
    },
    align: {
      type: String as PropType<AtFlexProps['align']>,
    },
    justify: {
      type: String as PropType<AtFlexProps['justify']>,
    },
    direction: {
      type: String as PropType<AtFlexProps['direction']>,
    },
    alignContent: {
      type: String as PropType<AtFlexProps['alignContent']>,
    },
  },

  setup(props: AtFlexProps, { attrs, slots }) {

    const rootClasses = computed(() => ({
      'at-row': true,
      [`at-row--${props.wrap}`]: Boolean(props.wrap),
      [`at-row__align--${props.align}`]: Boolean(props.align),
      [`at-row__justify--${props.justify}`]: Boolean(props.justify),
      [`at-row__direction--${props.direction}`]: Boolean(props.direction),
      [`at-row__align-content--${props.alignContent}`]: Boolean(props.alignContent)
    }))

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClasses.value
      }), { default: () => slots.default?.() })
    )
  }
})

export default AtFlex