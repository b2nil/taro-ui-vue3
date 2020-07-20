import { h, defineComponent } from "vue"
import { View } from "@tarojs/components"
import classNames from "classnames"
import '../../../../style/components/action-sheet.scss'

const AtActionSheetItem = defineComponent({
    props: {
        className: { type: Array || String, default: '' },
        onClick: { type: Function, default: () => {} },
    },

    setup(props, { slots }) {

        function handleClick(e) {
            props.onClick && props.onClick(e)
        }

        return () => {
            const rootClass = classNames('at-action-sheet__item', props.className)
            
            return h(View, { class: rootClass, onTap: handleClick }, slots.default && slots.default()) 
        }
    }
})

export default AtActionSheetItem