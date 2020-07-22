import { h, defineComponent } from "vue"
import { View } from "@tarojs/components"
import { AtActionSheetHeaderProps } from "types/action-sheet";
import classNames from "classnames"

const AtActionSheetHeader = defineComponent({

    setup(props: AtActionSheetHeaderProps, { slots }) {

        return () => {
            const rootClass = classNames('at-action-sheet__header', props.className)
            
            return h(View, { class: rootClass }, slots.default && slots!.default()) 
        }
    }
})

export default AtActionSheetHeader