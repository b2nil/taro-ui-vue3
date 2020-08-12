import { h, defineComponent } from "vue"
import { View } from "@/utils/components"
import { AtActionSheetBodyProps } from "types/action-sheet";
import classNames from "classnames"
import AtComponentWithDefaultProps from "@/components/mixins";

const AtActionSheetBody = defineComponent({
    mixins: [AtComponentWithDefaultProps],
    
    setup(props: AtActionSheetBodyProps, { slots }) {
        
        return () => {
            const rootClass = classNames('at-action-sheet__body', props.className)

            return h(View, { class: rootClass }, slots.default && slots.default())
        }
    }
})

export default AtActionSheetBody