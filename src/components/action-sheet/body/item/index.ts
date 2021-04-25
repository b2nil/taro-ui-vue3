import { h, defineComponent, mergeProps, PropType } from "vue"
import { View } from '@tarojs/components'
import { CommonEvent } from "@tarojs/components/types"
import { AtActionSheetItemProps } from "types/action-sheet"

const AtActionSheetItem = defineComponent({
  name: "AtActionSheetItem",

  props: {
    onClick: Function as unknown as PropType<(event?: CommonEvent) => void>
  },

  setup(props: AtActionSheetItemProps, { attrs, slots }) {

    function handleClick(e: CommonEvent) {
      props.onClick?.(e)
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: 'at-action-sheet__item',
        onTap: handleClick
      }), { default: () => slots.default?.() })
    )
  }
})

export default AtActionSheetItem