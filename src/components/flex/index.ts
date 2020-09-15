import { h, defineComponent, computed, mergeProps } from "vue"
import _forEach from 'lodash/forEach'
import { View } from '@tarojs/components'
import { AtFlexProps } from 'types/flex'

import './index.scss'

const AtFlex = defineComponent({
    name: "AtFlex",

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

    setup(props: AtFlexProps, { attrs, slots }) {

        const rootClass = computed(() => {
            const root = { 'at-row': true }

            _forEach(props, (value, key) => {
                switch (key) {
                    case 'wrap':
                        root[`at-row--${value}`] = true
                        return
                    case 'alignContent':
                        root[`at-row__align-content--${value}`] = true
                        return
                    default:
                        root[`at-row__${key}--${value}`] = true
                        return
                }
            })

            return root
        })

        return () => (
            h(View, mergeProps(attrs, {
                class: rootClass.value
            }), slots.default && slots.default())
        )
    }
})

export default AtFlex