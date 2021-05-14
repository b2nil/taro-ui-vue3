import { defineComponent, h, mergeProps } from 'vue'
import { ScrollView } from '@tarojs/components'
import { AtModalContentProps } from '@taro-ui-vue3/types/modal'

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
