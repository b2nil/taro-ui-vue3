import { h, defineComponent } from "vue"
import { View } from "@tarojs/components"
import classNames from "classnames"
import "../../../style/components/action-sheet.scss"

const AtActionSheetHeader = defineComponent({
    props: {
        className: { type: Array || String, default: '' }
    },

    setup(props, { slots }) {

        return () => {
            const rootClass = classNames('at-action-sheet__header', props.className)
            
            return h(View, { class: rootClass }, slots.default && slots.default()) 
        }
    }
})

export default AtActionSheetHeader