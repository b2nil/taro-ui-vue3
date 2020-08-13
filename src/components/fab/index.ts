import { h, defineComponent } from 'vue'
import { View } from '@tarojs/components'
import { CommonEvent, CommonEventFunction } from '@tarojs/components/types/common'
import { AtFabProps } from "types/fab";
import classNames from 'classnames'

const AtFab = defineComponent({
    props: {
        size: {
            type: String as () => 'normal' | 'small',
            default: () => 'normal' as 'normal' | 'small',
            validator: (prop: string) => ['normal', 'small'].includes(prop)
        },
        onClick: { 
            type: Function as unknown as () => CommonEventFunction, 
            default: () => () => {} 
        }
    },    

    setup(props: AtFabProps, { slots }) {

        function onClick(e: CommonEvent): void {
            if ( typeof props.onClick === 'function') {
                props.onClick(e)
            }
        }

        return () => {
            const rootClass = classNames('at-fab', props.className, {
                [`at-fab--${props.size}`]: props.size
            })

            return h(View, {
                class: rootClass,
                onTap: onClick
            }, slots.default && slots.default())
        }
    }
})

export default AtFab

