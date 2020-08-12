import { h, defineComponent } from "vue"
import { View } from "@/utils/components"
import { AtActionSheetFooterProps } from "types/action-sheet";
import classNames from "classnames"
import AtComponentWithDefaultProps from "@/components/mixins";

const AtActionSheetFooter = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        onClick: {
            type: Function as unknown as () => () => {},
            default: () => () => { }
        },
    },

    setup(props: AtActionSheetFooterProps, { slots }) {

        function handleClick(...args: any[]) {
            props.onClick && props.onClick(...args)
        }

        return () => {
            const rootClass = classNames('at-action-sheet__footer', props.className)

            return h(View, {
                class: rootClass,
                onTap: handleClick
            },
                slots.default && slots.default()
            )
        }
    }
})

export default AtActionSheetFooter