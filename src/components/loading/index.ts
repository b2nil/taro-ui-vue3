import { h, defineComponent, mergeProps, computed } from 'vue'
import { View } from '@tarojs/components'
import { pxTransform } from '../../utils/common'
import { AtComponent } from 'types/base'

interface AtLoadingProps extends AtComponent {
  size?: string | number
  color?: string | number
}

const AtLoading = defineComponent({
  name: "AtLoading",

  props: {
    size: { type: [String, Number], default: 0 },
    color: { type: [String, Number], default: '' }
  },

  setup(props: AtLoadingProps, { attrs }) {
    const loadingSize = typeof props.size === 'string' ? props.size : String(props.size)

    const sizeStyle = computed(() => ({
      width: props.size ? `${pxTransform(parseInt(loadingSize))}` : '',
      height: props.size ? `${pxTransform(parseInt(loadingSize))}` : '',
    }))

    const ringStyle = computed(() => ({
      ...sizeStyle.value,
      border: props.color ? `1px solid ${props.color}` : '',
      'border-color':
        props.color
          ? `${props.color} transparent transparent transparent`
          : '',
    }))

    return () => (
      h(View, mergeProps(attrs, {
        class: 'at-loading',
        style: sizeStyle.value
      }), {
        default: () => Array.apply(null, { length: 3 }).map((_, index) => (
          h(View, {
            key: index,
            class: 'at-loading__ring',
            style: ringStyle.value
          })
        ))
      })
    )
  }
})

export default AtLoading