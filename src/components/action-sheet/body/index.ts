import { h, defineComponent } from "vue"
import { View } from "@tarojs/components"
import { AtActionSheetBodyProps } from "types/action-sheet";
import classNames from "classnames"

const AtActionSheetBody = defineComponent({

    setup(props: AtActionSheetBodyProps, { slots }) {
        
        return () => {
            const rootClass = classNames('at-action-sheet__body', props.className)

            return h(View, { class: rootClass }, slots.default!())
        }
    }
})

export default AtActionSheetBody