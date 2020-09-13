import { defineComponent, onMounted, watch, h, mergeProps } from 'vue'
import { View } from '@tarojs/components'
import { delayQuerySelector } from '@/utils/common'
import { AtSwipeActionOptionsProps } from 'types/swipe-action'

const AtSwipeActionOptions = defineComponent({
    name: "AtSwipeActionOptions",

    props: {
        componentId: {
            type: String,
            default: '',
            required: true
        },
        options: {
            type: Array as () => AtSwipeActionOptionsProps['options'],
            default: [],
            required: true
        },
        onQueryedDom: {
            type: Function as unknown as () => AtSwipeActionOptionsProps['onQueryedDom'],
            default: () => ({ width }: { width: number }) => { },
            required: true
        },
    },

    setup(props: AtSwipeActionOptionsProps, { attrs, slots }) {

        watch(() => props.options, (options, preOptions) => {
            if (options !== preOptions) {
                trrigerOptionsDomUpadte()
            }
        })

        function trrigerOptionsDomUpadte(): void {
            delayQuerySelector(
                this,
                `#swipeActionOptions-${props.componentId}`,
                100
            ).then(res => {
                const arr = [...res]
                props.onQueryedDom(arr[0])
            })
        }

        onMounted(() => {
            trrigerOptionsDomUpadte()
        })

        return () => (
            h(View, mergeProps(attrs, {
                id: `swipeActionOptions-${props.componentId}`,
                class: 'at-swipe-action__options'
            }), slots.default && slots.default())
        )
    }
})

export default AtSwipeActionOptions