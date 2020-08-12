import { defineComponent, onMounted, watch, computed, h } from 'vue'
import classNames from 'classnames'
import { View } from '@/utils/components'
import { delayQuerySelector } from '@/utils/common'
import { AtSwipeActionOptionsProps } from 'types/swipe-action'
import AtComponentWithDefaultProps from '@/components/mixins'

const AtSwipeActionOptions = defineComponent({
    mixins: [AtComponentWithDefaultProps],

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

    setup(props: AtSwipeActionOptionsProps, { slots }) {

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

        return () => {

            const rootClass = computed(() => classNames(
                'at-swipe-action__options',
                props.className
            ))

            return (
                h(View, {
                    id: `swipeActionOptions-${props.componentId}`,
                    class: rootClass.value
                }, slots.default && slots.default())
            )
        }
    }
})

export default AtSwipeActionOptions