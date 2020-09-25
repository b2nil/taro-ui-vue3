import { h, defineComponent, mergeProps, PropType } from "vue"
import { Form } from '@tarojs/components'
import { AtFormProps } from "types/form"

const AtForm = defineComponent({
  name: "AtForm",

  props: {
    reportSubmit: Boolean as PropType<AtFormProps['reportSubmit']>,
    onSubmit: Function as PropType<AtFormProps['onSubmit']>,
    onReset: Function as PropType<AtFormProps['onReset']>,
  },

  setup(props: AtFormProps, { attrs, slots }) {

    function onSubmit() {
      if (typeof props.onSubmit === 'function') {
        props.onSubmit(arguments as any)
      }
    }

    function onReset() {
      if (typeof props.onReset === 'function') {
        props.onReset(arguments as any)
      }
    }

    return () => (
      h(Form, mergeProps(attrs, {
        class: 'at-form',
        reportSubmit: props.reportSubmit,
        onSubmit: onSubmit.bind(this),
        onReset: onReset.bind(this)
      }), { default: () => slots.default && slots.default() })
    )
  }
})

export default AtForm