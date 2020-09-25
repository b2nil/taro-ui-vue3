import { h, defineComponent, PropType } from "vue"

import { Text, View } from '@tarojs/components'
import { AtCountdownItemProps } from 'types/countdown'

const AtCountdownItem = defineComponent({
  name: "AtCountdownItem",

  props: {
    // 参数
    num: {
      type: Number as PropType<AtCountdownItemProps['num']>,
      default: 0,
      required: true
    },
    separator: {
      type: String as PropType<AtCountdownItemProps['separator']>,
      default: ':',
    },
  },

  setup(props: AtCountdownItemProps) {

    function formatNum(num: number): string {
      return num <= 9 ? `0${num}` : `${num}`
    }

    return () => (
      h(View, {
        class: 'at-countdown__item'
      }, {
        default: () => [
          h(View, {
            class: 'at-countdown__time-box'
          }, {
            default: () => [
              h(Text, {
                class: 'at-countdown__time'
              }, { default: () => formatNum(props.num) })
            ]
          }),
          h(Text, {
            class: 'at-countdown__separator'
          }, { default: () => props.separator })
        ]
      })
    )
  }
})

export default AtCountdownItem