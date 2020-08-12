import { h, defineComponent, computed } from "vue"

import classNames from 'classnames'
import _forEach from 'lodash/forEach'

import { View } from '@/utils/components'
import { AtFlexItemProps } from 'types/flex'

import AtComponentWithDefaultProps from '../../mixins'
import './index.scss'

const AtFlexItem = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        isAuto: {
            type: Boolean,
            default: false,
        },
        isWrap: {
            type: Boolean,
            default: false,
        },
        align: {
            type: String as () => AtFlexItemProps['align'],
            default: 'center',
        },
        size: {
            type: Number as () => AtFlexItemProps['size'],
            default: 0,
        },
        offset: {
            type: Number as () => AtFlexItemProps['offset'],
            default: 0,
        },
    },

    setup(props: AtFlexItemProps, { slots }) {

        return () => {
            const rootClass = computed(() => {
                const root = ['at-col']

                _forEach(props, (value, key) => {
                    switch (key) {
                        case 'customStyle':
                        case 'className':
                            return
                        case 'isAuto':
                            if (value) return root.push('at-col--auto')
                            return
                        case 'isWrap':
                            if (value) return root.push(`at-col--wrap`)
                            return
                        case 'size':
                            if (value) return root.push(`at-col-${value}`)
                            return
                        case 'offset':
                            if (value != 0) return root.push(`at-col__offset-${value}`)
                            return
                        default:
                            return root.push(`at-col__${key}--${value}`)
                    }
                })

                return classNames(root)
            })

            return h(View, { class: rootClass.value }, slots.default && slots.default())
        }
    }
})

export default AtFlexItem