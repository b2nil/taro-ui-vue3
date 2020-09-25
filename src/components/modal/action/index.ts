import { h, defineComponent, computed, mergeProps } from 'vue'
import { View } from '@tarojs/components'
import { AtModalActionProps } from 'types/modal'

const AtModalAction = defineComponent({

  name: "AtModalAction",

  props: {
    isSimple: { type: Boolean, default: false, required: true }
  },

  setup(props: AtModalActionProps, { attrs, slots }) {

    const rootClass = computed(() => ({
      'at-modal__footer': true,
      'at-modal__footer--simple': props.isSimple
    }))

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClass.value
      }), {
        default: () => [
          h(View, {
            class: 'at-modal__action'
          }, { default: () => slots.default && slots.default() })
        ]
      })
    )
  }
})

export default AtModalAction