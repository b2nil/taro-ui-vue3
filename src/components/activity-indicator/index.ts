import { h, defineComponent, computed, mergeProps, PropType } from "vue"
import { Text, View } from '@tarojs/components'
import { AtActivityIndicatorProps } from "types/activity-indicator"
import AtLoading from "../loading"

const AtActivityIndicator = defineComponent({
  name: "AtActivityIndicator",

  props: {
    size: {
      type: Number,
      default: 48
    },
    mode: {
      type: String as PropType<'center' | 'normal'>,
      default: 'normal'
    },
    color: {
      type: String,
      default: '#6190E8'
    },
    content: {
      type: String,
      default: ''
    },
    isOpened: {
      type: Boolean,
      default: true
    },
  },

  setup(props: AtActivityIndicatorProps, { attrs }) {

    const rootClasses = computed(() => ({
      'at-activity-indicator': true,
      'at-activity-indicator--center': props.mode === 'center',
      'at-activity-indicator--isopened': props.isOpened,
    }))

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClasses.value
      }), {
        default: () => [
          h(View, {
            class: 'at-activity-indicator__body'
          }, {
            default: () => [
              h(AtLoading, {
                size: props.size,
                color: props.color
              })
            ]
          }),

          props.content && h(Text, {
            class: 'at-activity-indicator__content'
          }, { default: () => props.content }),
        ]
      })
    )
  }
})

export default AtActivityIndicator