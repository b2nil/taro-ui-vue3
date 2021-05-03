import { defineComponent, h, mergeProps } from 'vue'
import { View } from '@tarojs/components'
import { AtModalHeaderProps } from '@taro-ui-vue3/types/modal'

const AtModalHeader = defineComponent({
  name: "AtModalHeader",

  setup(props: AtModalHeaderProps, { attrs, slots }) {

    return () => (
      h(View, mergeProps(attrs, {
        class: 'at-modal__header'
      }), { default: () => slots.default && slots.default() })
    )
  }
})

export default AtModalHeader
