import { h, defineComponent, computed, mergeProps, PropType } from "vue"
import _forEach from 'lodash/forEach'
import { View } from '@tarojs/components'
import { AtFlexProps } from 'types/flex'

const AtFlex = defineComponent({
  name: "AtFlex",

  props: {
    wrap: {
      type: String as PropType<AtFlexProps['wrap']>,
      default: 'no-wrap',
    },
    align: {
      type: String as PropType<AtFlexProps['align']>,
      default: 'stretch',
    },
    justify: {
      type: String as PropType<AtFlexProps['justify']>,
      default: 'start',
    },
    direction: {
      type: String as PropType<AtFlexProps['direction']>,
      default: 'row',
    },
    alignContent: {
      type: String as PropType<AtFlexProps['alignContent']>,
      default: 'center'
    },
  },

  setup(props: AtFlexProps, { attrs, slots }) {

    const rootClass = computed(() => {
      const root = { 'at-row': true }

      _forEach(props, (value, key) => {
        switch (key) {
          case 'wrap':
            root[`at-row--${value}`] = true
            return
          case 'alignContent':
            root[`at-row__align-content--${value}`] = true
            return
          default:
            root[`at-row__${key}--${value}`] = true
            return
        }
      })

      return root
    })

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClass.value
      }), { default: () => slots.default && slots.default() })
    )
  }
})

export default AtFlex