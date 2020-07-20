import { h, defineComponent } from "vue"
import { Text, View } from "@tarojs/components"
import classNames from "classnames"
import PropTypes from "../../utils/vue-types"
import AtLoading from "../loading/index"
import "../../style/components/activity-indicator.scss"

const AtActivityIndicator = defineComponent({
    props: {
        size: PropTypes.number.def(0),
        mode: PropTypes.string.def('normal'),
        color: PropTypes.string.def(''),
        content: PropTypes.string.def(''),
        isOpened: PropTypes.bool.def(true),
        className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).def('')
    },

    setup(props) {

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