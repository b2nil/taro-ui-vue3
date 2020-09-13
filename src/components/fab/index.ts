import { h, defineComponent, computed, mergeProps } from 'vue'
import { View } from '@tarojs/components'
import { CommonEvent, CommonEventFunction } from '@tarojs/components/types/common'
import { AtFabProps } from "types/fab";

const AtFab = defineComponent({
    name: "AtFab",

    props: {
        size: {
            type: String as () => 'normal' | 'small',
            default: () => 'normal' as 'normal' | 'small',
            validator: (prop: string) => ['normal', 'small'].includes(prop)
        },
        onClick: {
            type: Function as unknown as () => CommonEventFunction,
            default: () => () => { }
        }
    },

    setup(props: AtFabProps, { attrs, slots }) {

        const rootClass = computed(() => ({
            'at-fab': true,
            [`at-fab--${props.size}`]: props.size
        }))

        function onClick(e: CommonEvent): void {
            if (typeof props.onClick === 'function') {
                props.onClick(e)
            }
        }

        return () => (
            h(View, mergeProps(attrs, {
                class: rootClass.value,
                onTap: onClick
            }), slots.default && slots.default())
        )
    }
})

export default AtFab

