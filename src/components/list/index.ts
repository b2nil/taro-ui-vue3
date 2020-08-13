import { h, defineComponent } from 'vue'
import { View } from '@tarojs/components'
import { AtListProps } from "types/list";
import classNames from 'classnames'

const AtList = defineComponent({
    props: {
        hasBorder: { type: Boolean, default: true },
    },

    setup(props: AtListProps, { slots }) {
        
        const rootClass = classNames(
            'at-list', 
            { 'at-list--no-border': !props.hasBorder },
            props.className
        )

        return () => h(View, { class: rootClass }, slots.default && slots.default())
    }
})

export default AtList