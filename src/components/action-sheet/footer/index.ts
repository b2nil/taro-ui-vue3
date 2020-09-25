import { h, defineComponent, mergeProps, PropType } from "vue"
import { View } from '@tarojs/components'
import { AtActionSheetFooterProps } from "types/action-sheet"

const AtActionSheetFooter = defineComponent({
  name: "AtActionSheetFooter",

  props: {
    onClick: {
      type: Function as PropType<AtActionSheetFooterProps['onClick']>,
      default: () => () => { }
    },
  },

  setup(props: AtActionSheetFooterProps, { attrs, slots }) {

    function handleClick(...args: any[]) {
      props.onClick && props.onClick(...args)
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: 'at-action-sheet__footer',
        onTap: handleClick
      }),
        { default: () => slots.default && slots.default() }
      )
    )
  }
})

export default AtActionSheetFooter