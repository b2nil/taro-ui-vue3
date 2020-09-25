import { defineComponent, h, mergeProps } from 'vue'
import { ScrollView } from '@tarojs/components'
import { AtModalContentProps } from 'types/modal'

const AtModalContent = defineComponent({
  name: "AtModalContent",

  setup(props: AtModalContentProps, { attrs, slots }) {

    return () => (
      h(ScrollView, mergeProps(attrs, {
        scrollY: true,
        class: 'at-modal__content'
      }), { default: () => slots.default && slots.default() })
    )
  }
})

export default AtModalContent
