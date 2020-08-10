import { h, defineComponent } from "vue"

import { Text, View } from '@tarojs/components'
import { AtCountdownItemProps } from 'types/countdown'

import AtComponentWithDefaultProps from '../../mixins'

const AtCountdownItem = defineComponent({
    mixins: [AtComponentWithDefaultProps],

    props: {
        // 参数
        num: {
            type: Number as () => AtCountdownItemProps['num'],
            default: 0,
            required: true
        },
        separator: {
            type: String as () => AtCountdownItemProps['separator'],
            default: ':',
        },
    },

    setup(props: AtCountdownItemProps) {

        function formatNum(num: number): string {
            return num <= 9 ? `0${num}` : `${num}`
        }

        return () => (
            h(View, { class: 'at-countdown__item' }, [
                h(View, { class: 'at-countdown__time-box' }, [
                    h(Text, { class: 'at-countdown__time' }, formatNum(props.num))
                ]),
                h(Text, { class: 'at-countdown__separator' }, props.separator)
            ])
        )
    }
})

export default AtCountdownItem