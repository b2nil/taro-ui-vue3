import { h, defineComponent, mergeProps } from "vue"
import { View } from '@tarojs/components'
import { AtActionSheetHeaderProps } from "types/action-sheet"

const AtActionSheetHeader = defineComponent({
    name: "AtActionSheetHeader",

    setup(props: AtActionSheetHeaderProps, { attrs, slots }) {
        
        return () => (
            h(View, mergeProps(attrs, {
                class: 'at-action-sheet__header'
            }), slots.default && slots.default())
        )
    }
})

export default AtActionSheetHeader