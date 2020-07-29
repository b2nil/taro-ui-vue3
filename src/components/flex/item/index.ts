import { h, defineComponent, computed } from "vue"

import classNames from 'classnames'
import _forEach from 'lodash/forEach'

import { View } from '@tarojs/components'
import { AtFlexItemProps } from 'types/flex'

import AtComponentWithDefaultProps from '../../mixins'
import './index.scss'

const AtFlexItem = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        isAuto: {
            type: Boolean,
            required: true
        },
        isWrap: {
            type: Boolean,
            required: true
        },
        align: {
            type: String as () => AtFlexItemProps['align'],
            default: 'center',
            required: true
        },
        size: {
            type: Number as () => AtFlexItemProps['size'],
            default: 1,
            required: true
        },
        offset: {
            type: Number as () => AtFlexItemProps['offset'],
            default: 1,
            required: true
        },
    },

    setup(props: AtFlexItemProps, { slots }) {

        return () => {
            const rootClass = computed(() => {
                const root = ['at-col']

                _forEach(props, (value, key) => {
                    switch (key) {
                        case 'isAuto':
                            return root.push('at-col--auto')
                        case 'isWrap':
                            if(value) return root.push(`at-col--wrap`)
                        case 'size':
                            if(value) return root.push(`at-col-${value}`)
                        default:
                            root.push(`at-col__${key}--${value}`)
                    }
                })

                return classNames(root)
            })

            return h(View, { class: rootClass.value }, slots.default && slots.default())
        }
    }
})

export default AtFlexItem