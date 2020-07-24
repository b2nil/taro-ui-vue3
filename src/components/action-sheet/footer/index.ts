import { h, defineComponent } from "vue"
import { View } from "@tarojs/components"
import { AtActionSheetFooterProps } from "types/action-sheet";
import classNames from "classnames"

const AtActionSheetFooter = defineComponent({
    props: {
        onClick: { 
            type: Function as unknown as () => () => {}, 
            default: () => () => {} 
        },
    },

    setup(props: AtActionSheetFooterProps, { slots }) {

        function handleClick(...args: any[]) {
            props.onClick && props.onClick(...args)
        }

        return () => {
            const rootClass = classNames('at-action-sheet__footer', props.className)
            
            return h(View, 
                { class: rootClass, onTap: handleClick }, 
                slots!.default()
            )
        }
    }
})

export default AtActionSheetFooter