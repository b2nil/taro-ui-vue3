import { h, defineComponent, computed } from "vue"

import classNames from 'classnames'
import _forEach from 'lodash/forEach'

import { View } from '@tarojs/components'
import { AtFlexProps } from 'types/flex'

import AtComponentWithDefaultProps from '../mixins'
import './index.scss'

const AtFlex = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        wrap: {
            type: String as () => AtFlexProps['wrap'],
            default: 'no-wrap',
        },
        align: {
            type: String as () => AtFlexProps['align'],
            default: 'stretch',
        },
        justify: {
            type: String as () => AtFlexProps['justify'],
            default: 'start',
        },
        direction: {
            type: String as () => AtFlexProps['direction'],
            default: 'row',
        },
        alignContent: {
            type: String as () => AtFlexProps['alignContent'],
        },
    },

    setup(props: AtFlexProps, { slots }) {

        return () => {
            const rootClass = computed(() => {
                const root = ['at-row']

                _forEach(props, (value, key) => {
                    switch (key) {
                        case 'className':
                        case 'customStyle':
                            return
                        case 'wrap':
                            return root.push(`at-row--${value}`)
                        case 'alignContent':
                            return root.push(`at-row__align-content--${value}`)
                        default:
                            return root.push(`at-row__${key}--${value}`)
                    }
                })

                return classNames(root)
            })

            return h(View, { class: rootClass.value }, slots.default && slots.default())
        }
    }
})

export default AtFlex