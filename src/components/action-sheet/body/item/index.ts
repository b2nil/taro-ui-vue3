import { h, defineComponent, mergeProps } from "vue"
import { View, CommonEvent } from "@tarojs/components"
import { AtActionSheetItemProps } from "types/action-sheet";

const AtActionSheetItem = defineComponent({
    name: "AtActionSheetItem",

    props: {
        onClick: {
            type: Function as unknown as () => (event?: CommonEvent) => void,
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
            }), slots.default && slots.default())
        )
    }
})

export default AtActionSheetItem