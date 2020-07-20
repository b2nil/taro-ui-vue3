import { h, defineComponent } from 'vue'
import { View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import classNames from 'classnames'

import '../../style/components/fab.scss'

const AtFab = defineComponent({
    props: {
        size: {
            type: String,
            default: 'normal',
            validator: (prop: string) => ['normal', 'small'].includes(prop)
        },
        className: { type: Array || String, default: '' },
        onClick: { type: Function, default: () => {} }
    },    

    setup(props, { slots }) {

        const rootClass = classNames('at-fab', props.className, {
            [`at-fab--${props.size}`]: props.size
        })

        function onClick(e: CommonEvent): void {
            if ( typeof props.onClick === 'function') {
                props.onClick(e)
            }
        }

        return () => h(View, {
            class: rootClass,
            onTap: onClick,
        }, slots.default && slots.default())
    }
})

export default AtFab

