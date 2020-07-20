import { h, defineComponent } from 'vue'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import '../../style/components/list.scss'

const AtList = defineComponent({
    props: {
        hasBorder: { type: Boolean, default: true },
        className: { type: Array || String, default: '' },
    },

    setup(props, { slots }) {
        
        const rootClass = classNames(
            'at-list', 
            { 'at-list--no-border': !props.hasBorder },
            props.className
        )

        return () => h(View, { class: rootClass }, slots.default && slots.default())
    }
})

export default AtList