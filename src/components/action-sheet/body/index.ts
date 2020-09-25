import { h, defineComponent, mergeProps } from "vue"
import { View } from '@tarojs/components'
import { AtActionSheetBodyProps } from "types/action-sheet";

const AtActionSheetBody = defineComponent({
  name: "AtActionSheetBody",

  setup(props: AtActionSheetBodyProps, { attrs, slots }) {

    return () => (
      h(View, mergeProps(attrs, {
        class: 'at-action-sheet__body'
      }), { default: () => slots.default && slots.default() })
    )
  }
})

export default AtActionSheetBody