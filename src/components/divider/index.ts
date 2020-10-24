import { h, defineComponent, computed, mergeProps, PropType } from "vue"
import { View } from '@tarojs/components'
import { AtDividerProps } from 'types/divider'
import { pxTransform } from "@/utils/common"

const AtDivider = defineComponent({
  name: "AtDivider",

  props: {
    // 参数
    content: {
      type: String as PropType<AtDividerProps['content']>,
      default: '',
    },
    height: {
      type: [Number, String] as PropType<AtDividerProps['height']>,
      default: 0,
    },
    fontColor: {
      type: String as PropType<AtDividerProps['fontColor']>,
      default: '',
    },
    fontSize: {
      type: [Number, String] as PropType<AtDividerProps['fontSize']>,
      default: 0,
    },
    lineColor: {
      type: String as PropType<AtDividerProps['lineColor']>,
      default: '',
    }
  },

  setup(props: AtDividerProps, { attrs, slots }) {
    const rootStyle = computed(() => ({
      height: props.height ? `${pxTransform(Number(props.height))}` : ''
    }))

    const fontStyle = computed(() => ({
      color: props.fontColor,
      fontSize: props.fontSize ? `${pxTransform(Number(props.fontSize))}` : ''
    }))

    const lineStyle = computed(() => ({
      backgroundColor: props.lineColor
    }))

    return () => (
      h(View, mergeProps(attrs, {
        class: 'at-divider',
        style: rootStyle.value
      }), {
        default: () => [
          h(View, {
            class: 'at-divider__content',
            style: fontStyle.value
          }, {
            default: () => props.content === ''
              ? slots.default && slots.default()
              : props.content
          }),

          h(View, {
            class: 'at-divider__line',
            style: lineStyle.value
          })
        ]
      })
    )
  }
})

export default AtDivider