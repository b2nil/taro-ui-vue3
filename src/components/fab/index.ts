import { h, defineComponent } from 'vue'
import { View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import classNames from 'classnames'

const AtFab = defineComponent({
    props: {
        size: {
            type: String,
            default: 'normal',
            validator: (prop: string) => ['normal', 'small'].includes(prop)
        },
        onClick: { type: Function, default: () => {} }
    },    

    setup(props, { attrs, slots }) {

        // TODO: className under props or attrs
        // TODO: Use mergeProps instead of classNames
        const rootClass = classNames('at-fab', attrs.className, {
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

