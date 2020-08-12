import { h, defineComponent, computed } from "vue"
import { Text, View } from "@/utils/components"
import { AtActivityIndicatorProps } from "types/activity-indicator";
import classNames from "classnames"
import AtLoading from "../loading"
import AtComponentWithDefaultProps from "../mixins";

const AtActivityIndicator = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        size: {
            type: Number,
            default: 48
        },
        mode: {
            type: String as () => 'center' | 'normal',
            default: 'normal' as 'center' | 'normal'
        },
        color: {
            type: String,
            default: '#6190E8'
        },
        content: {
            type: String,
            default: ''
        },
        isOpened: {
            type: Boolean,
            default: true
        },
    },

    setup(props: AtActivityIndicatorProps) {

        return () => {
            const rootClass = computed(() => classNames(
                'at-activity-indicator',
                {
                    'at-activity-indicator--center': props.mode === 'center',
                    'at-activity-indicator--isopened': props.isOpened,
                },
                props.className
            ))
            
            return h(View, { class: rootClass.value }, [
                h(View, { class: 'at-activity-indicator__body'}, [
                    h(AtLoading, { size: props.size, color: props.color })
                ]),
                props.content && h(Text, { class: 'at-activity-indicator__content' }, props.content),
            ])
        }
    }
})

export default AtActivityIndicator