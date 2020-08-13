import { h, defineComponent, computed } from "vue"

import classNames from 'classnames'

import { Text, View } from '@tarojs/components'
import { AtCheckboxProps } from 'types/checkbox'

import AtComponentWithDefaultProps from '../mixins'

const AtCheckbox = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        // 参数
        options: {
            type: Array as () => AtCheckboxProps<any>['options'],
            default: () => [],
            required: true
        },
        selectedList: {
            type: Array as () => AtCheckboxProps<any>['selectedList'],
            default: () => [],
            required: true
        },
        // 事件
        onChange: {
            type: Function as unknown as () => AtCheckboxProps<any>['onChange'],
            default: () => () => { }
        }
    },

    setup(props: AtCheckboxProps<any>) {        

        function handleClick(idx: number) {
            const option = props.options[idx]
            const { disabled, value } = option
            if (disabled) return

            const selectedSet = new Set(props.selectedList)
            if(!selectedSet.has(value)) {
                selectedSet.add(value)
            } else {
                selectedSet.delete(value)
            }
            props.onChange([...selectedSet])
        }        

        return () => {
            const rootClass = computed(() => classNames('at-checkbox', props.className))

            const optionNodes = props.options.map((option, idx) => {
                const { value, disabled, label, desc } = option
                const optionClass = classNames('at-checkbox__option', {
                    'at-checkbox__option--disabled': disabled,
                    'at-checkbox__option--selected': props.selectedList.includes(value)
                })

                return h(View, {
                    class: optionClass,
                    key: value,
                    onTap: handleClick.bind(this, idx)
                }, [
                    h(View, { class: 'at-checkbox__option-wrap'}, [
                        h(View, { class: 'at-checkbox__option-cnt'}, [
                            h(View, { class: 'at-checkbox__icon-cnt'}, [
                                h(Text, { class: 'at-icon at-icon-check'})
                            ]),
                            h(View, { class: 'at-checkbox__title'}, label)
                        ]),
                        desc && h(View, { class: 'at-checkbox__desc' }, desc)
                    ])
                ])
            })

            return h(View, { class: rootClass.value, style: props.customStyle }, optionNodes)
        }
    }
})

export default AtCheckbox

