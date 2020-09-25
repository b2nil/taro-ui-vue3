import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtFabProps } from "types/fab"

const AtFab = defineComponent({
  name: "AtFab",

  props: {
    size: {
      type: String as PropType<AtFabProps['size']>,
      default: 'normal',
      validator: (prop: string) => ['normal', 'small'].includes(prop)
    },
    onClick: {
      type: Function as PropType<AtFabProps['onClick']>,
      default: () => () => { }
    }
  },

  setup(props: AtFabProps, { attrs, slots }) {

    const rootClass = computed(() => ({
      'at-fab': true,
      [`at-fab--${props.size}`]: props.size
    }))

    function onClick(e: CommonEvent): void {
      if (typeof props.onClick === 'function') {
        props.onClick(e)
      }
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClass.value,
        onTap: onClick
      }), { default: () => slots.default && slots.default() })
    )
  }
})

export default AtFab

