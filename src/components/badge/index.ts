import { h, defineComponent, mergeProps, computed } from "vue"
import { View } from '@tarojs/components'
import { AtBadgeProps } from "types/badge"

const AtBadge = defineComponent({
  name: "AtBadge",

  props: {
    dot: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: ''
    },
    maxValue: {
      type: Number,
      default: 99
    }
  },

  setup(props: AtBadgeProps, { attrs, slots }) {

    const formatedValue = computed(() => formatValue(props.value, props.maxValue!))

    function formatValue(
      value: string | number | undefined,
      maxValue: number
    ): string | number {
      if (value === '' || value === null || value === undefined) return ''

      const numValue = +value

      if (Number.isNaN(numValue)) {
        return value
      }

      return numValue > maxValue ? `${maxValue}+` : numValue
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: 'at-badge'
      }), {
        default: () => [
          slots.default && slots.default(),

          props.dot
            ? h(View, { class: 'at-badge__dot' })
            : formatedValue.value !== '' && (
              h(View, {
                class: 'at-badge__num'
              }, { default: () => formatedValue.value })
            )
        ]
      })
    )
  }
})

export default AtBadge