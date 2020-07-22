import { h, defineComponent } from "vue"
import { Text, View } from "@tarojs/components"
import { AtActivityIndicatorProps } from "types/activity-indicator";
import classNames from "classnames"
import AtLoading from "../loading/index"

const AtActivityIndicator = defineComponent({
    props: {
        size: {
            type: Number,
            default: 24
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
            const rootClass = classNames(
                'at-activity-inidicator',
                {
                    'at-activity-inidicator--center': props.mode === 'center',
                    'at-activity-inidicator--isopened': props.isOpened,
                },
                props.className
            )
            
            return h(View, { class: rootClass }, [
                h(View, { class: 'at-activity-indicator__body'}, [
                    h(AtLoading, { size: props.size, color: props.color })
                ]),
                props.content && h(Text, { class: 'at-activity-indicator__content' }, props.content),
            ])
        }
    }
})

export default AtActivityIndicator