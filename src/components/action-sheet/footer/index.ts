import { h, defineComponent } from "vue"
import { View } from "@tarojs/components"
import classNames from "classnames"
import "../../../style/components/action-sheet.scss"

const AtActionSheetFooter = defineComponent({
    props: {
        className: { type: Array || String, default: '' },
        onClick: { type: Function, default: () => {} },
    },

    setup(props, { slots }) {

        function handleClick(...args: any[]) {
            props.onClick && props.onClick(...args)
        }

        return () => {
            const rootClass = classNames('at-action-sheet__footer', props.className)
            
            return h(View, { class: rootClass, onTap: handleClick }, slots.default && slots.default()) 
        }
    }
})

export default AtActionSheetFooter