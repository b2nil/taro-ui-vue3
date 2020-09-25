import { h, defineComponent, toRefs, computed, mergeProps, PropType } from 'vue'
import { Text, View } from '@tarojs/components'
import { AtProgressProps } from 'types/progress'

const AtProgress = defineComponent({
  name: "AtProgress",

  props: {
    color: {
      type: String as PropType<AtProgressProps['color']>,
      default: ''
    },
    status: {
      type: String as PropType<AtProgressProps['status']>,
      validator: (val: string) => ['progress', 'error', 'success'].includes(val)
    },
    percent: {
      type: Number as PropType<AtProgressProps['percent']>,
      default: 0
    },
    strokeWidth: {
      type: Number as PropType<AtProgressProps['strokeWidth']>,
      default: 10
    },
    isHidePercent: Boolean,
  },

  setup(props: AtProgressProps, { attrs, slots }) {
    const { percent } = toRefs(props)

    if (percent!.value! < 0) {
      percent!.value = 0
    } else if (percent!.value! > 100) {
      percent!.value = 100
    }

    const rootClass = computed(() => ({
      'at-progress': true,
      [`at-progress--${props.status}`]: !!props.status
    }))

    const iconClass = computed(() => ({
      'at-icon': true,
      'at-icon-close-circle': props.status === 'error',
      'at-icon-check-circle': props.status === 'success'
    }))

    const progressStyle = computed(() => ({
      width: percent!.value ? `${+percent!.value}%` : '0%',
      height: props.strokeWidth && `${+props.strokeWidth}px`,
      backgroundColor: props.color
    }))

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClass.value
      }), {
        default: () => [
          h(View, {
            class: 'at-progress__outer'
          }, {
            default: () => [
              h(View, {
                class: 'at-progress__outer-inner'
              }, {
                default: () => [
                  h(View, {
                    class: 'at-progress__outer-inner-background',
                    style: progressStyle.value
                  })
                ]
              })
            ]
          }),

          !props.isHidePercent && (
            h(View, {
              class: 'at-progress__content'
            }, {
              default: () => (!props.status || props.status === 'progress')
                ? `${percent!.value}%`
                : h(Text, { class: iconClass.value })
            })
          )
        ]
      })
    )
  }
})

export default AtProgress