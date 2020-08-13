import { h, defineComponent, computed } from 'vue'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { AtTabsPaneProps } from 'types/tabs-pane'
import AtComponentWithDefaultProps from '../mixins'

const AtTabsPane = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        tabDirection: {
            type: String as () => AtTabsPaneProps['tabDirection'],
            default: 'horizontal' as AtTabsPaneProps['tabDirection'],
            required: true
        },
        index: {
            type: Number,
            default: 0,
            required: true
        },
        current: {
            type: Number,
            default: 0,
            required: true
        },
    },

    setup(props: AtTabsPaneProps, { slots }) {

        return () => {
            const rootClass = computed(() => classNames(
                {
                    'at-tabs-pane': true,
                    'at-tabs-pane--vertical': props.tabDirection === 'vertical',
                    'at-tabs-pane--active': props.index === props.current,
                    'at-tabs-pane--inactive': props.index !== props.current
                },
                props.className
            ))

            return (
                h(View, {
                    class: rootClass.value,
                    style: props.customStyle
                }, slots.default && slots.default())
            )
        }
    }
})

export default AtTabsPane

