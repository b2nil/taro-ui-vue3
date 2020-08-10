import { h, defineComponent, computed } from 'vue'
import classNames from 'classnames'
import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtRadioProps, RadioOption } from 'types/radio'
import AtComponentWithDefaultProps from '../mixins'

const AtRadio = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        value: {
            type: String as () => AtRadioProps<any>['value'],
            default: '',
            required: true
        },
        options: {
            type: Array as () => AtRadioProps<any>['options'],
            default: [],
            required: true
        },
        onClick: {
            type: Function as unknown as () => AtRadioProps<any>['options'],
            default: () => (vaule: any, event: CommonEvent) => { },
            required: true
        },
    },

    setup(props: AtRadioProps<any>, { slots }) {

        function handleClick(option: RadioOption<any>, event: CommonEvent): void {
            if (option.disabled) return
            props.onClick(option.value, event)
        }

        return () => {
            const rootClass = computed(() => classNames('at-radio', props.className))

            const optionNodes = props.options.map(option => {
                const optionClass = computed(() => classNames({
                    'at-radio__option': true,
                    'at-radio__option--disabled': option.disabled
                }))

                const iconClass = computed(() => classNames({
                    'at-radio__icon': true,
                    'at-radio__icon--checked': props.value === option.value
                }))

                return (
                    h(View, {
                        key: option.value,
                        class: optionClass.value,
                        onClick: handleClick.bind(this, option)
                    }, {
                        default: () => [
                            h(View, { class: 'at-radio__option-wrap' }, {
                                default: () => [
                                    h(View, { class: 'at-radio__option-container' }, {
                                        default: () => [
                                            // title label
                                            h(View, { class: 'at-radio__title' }, option.label),
                                            // icon
                                            h(View, { class: iconClass.value }, {
                                                default: () => [
                                                    h(Text, { class: 'at-icon at-icon-check' })
                                                ]
                                            })
                                        ]
                                    }),
                                    // description
                                    option.desc && (
                                        h(View, { class: 'at-radio__desc' }, option.desc)
                                    )
                                ]
                            })
                        ]
                    })
                )
            })

            return (
                h(View, {
                    class: rootClass.value,
                    style: props.customStyle
                }, optionNodes)
            )
        }
    }
})

export default AtRadio
