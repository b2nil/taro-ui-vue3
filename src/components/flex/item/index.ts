import { h, defineComponent, computed, mergeProps, PropType } from "vue"
import _forEach from 'lodash/forEach'
import { View } from '@tarojs/components'
import { AtFlexItemProps } from 'types/flex'

const AtFlexItem = defineComponent({
  name: "AtFlexItem",

  props: {
    isAuto: {
      type: Boolean,
      default: false,
    },
    isWrap: {
      type: Boolean,
      default: false,
    },
    align: {
      type: String as PropType<AtFlexItemProps['align']>,
      default: 'center',
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

    const rootClass = computed(() => {
      const root = { 'at-col': true }

      _forEach(props, (value, key) => {
        switch (key) {
          case 'isAuto':
            if (value) {
              root['at-col--auto'] = true
              return
            }
            return
          case 'isWrap':
            if (value) {
              root[`at-col--wrap`] = true
              return
            }
            return
          case 'size':
            if (value) {
              root[`at-col-${value}`] = true
              return
            }
            return
          case 'offset':
            if (value != 0) {
              root[`at-col__offset-${value}`] = true
              return
            }
            return
          default:
            root[`at-col__${key}--${value}`] = true
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

export default AtFlexItem