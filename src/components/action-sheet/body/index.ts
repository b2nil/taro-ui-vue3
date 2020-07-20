import { h, defineComponent } from "vue"
import { View } from "@tarojs/components"
import classNames from "classnames"
import "../../../style/components/action-sheet.scss"

const AtActionSheetBody = defineComponent({
    props: {
        className: { type: Array || String, default: '' }
    },

    setup(props, { slots }) {
        
        return () => {
            const rootClass = classNames('at-action-sheet__body', props.className)

            return h(View, { class: rootClass }, slots.default && slots.default())
        }
    }
})

export default AtActionSheetBody