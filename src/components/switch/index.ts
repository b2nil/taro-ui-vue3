import classNames from 'classnames'
import { Switch, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtSwitchProps } from 'types/switch'

import { h, defineComponent, computed } from 'vue'
import AtComponentWithDefaultProps from '../mixins'
const AtSwitch = defineComponent({

    mixins: [AtComponentWithDefaultProps],

    props: {
        title: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: '#6190e8'
        },
        checked: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: false
        },
        onChange: Function as unknown as () => AtSwitchProps['onChange'],
    },

    setup(props: AtSwitchProps, { slots }) {


        function handleChange(event: CommonEvent): void {
            const { value, checked } = event.detail
            const state = typeof value === 'undefined' ? checked : value
            props.onChange && props.onChange(state)
        }

        return () => {

            const rootClass = computed(() => classNames(
                'at-switch',
                {
                    'at-switch--without-border': !props.border
                },
                props.className
            ))

            const containerClass = computed(() => classNames('at-switch__container', {
                'at-switch--disabled': props.disabled
            }))

            return (
                h(View, {
                    class: rootClass.value,
                    style: props.customStyle
                }, {
                    default: () => [
                        // title
                        h(View, { class: 'at-switch__title' }, props.title),
                        // container
                        h(View, { class: containerClass.value }, {
                            default: () => [
                                // mask
                                h(View, { class: 'at-switch__mask' }),
                                // switch
                                h(Switch, {
                                    class: 'at-switch__switch',
                                    checked: props.checked,
                                    color: props.color,
                                    onChange: handleChange,
                                })
                            ]
                        })
                    ]
                })
            )
        }
    }
})

export default AtSwitch