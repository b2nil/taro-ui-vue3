import { h, defineComponent, mergeProps, PropType } from "vue"
import { View } from '@tarojs/components'
import { CommonEvent } from "@tarojs/components/types"
import { AtActionSheetItemProps } from "types/action-sheet"

const AtActionSheetItem = defineComponent({
  name: "AtActionSheetItem",

  props: {
    onClick: {
      type: Function as PropType<(event?: CommonEvent) => void>,
      default: () => () => { }
    },
  },

  setup(props: AtActionSheetItemProps, { attrs, slots }) {

    function handleClick(e: CommonEvent) {
      props.onClick && props.onClick(e)
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: 'at-action-sheet__item',
        onTap: handleClick
      }), { default: () => slots.default && slots.default() })
    )
  }
})

export default AtActionSheetItem