import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtTagProps } from 'types/tag'

const SIZE_CLASS = {
  normal: 'normal',
  small: 'small'
}

const TYPE_CLASS = {
  primary: 'primary'
}

const AtTag = defineComponent({
  name: "AtTag",

  props: {
    size: {
      type: String as PropType<AtTagProps['size']>,
      default: 'normal',
      validator: (val: string) => ['normal', 'small'].includes(val)
    },
    type: {
      type: String as PropType<AtTagProps['type']>,
      default: '',
      validator: (val: string) => ['', 'primary'].includes(val)
    },
    name: {
      type: String,
      default: ''
    },
    circle: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onClick: Function as PropType<AtTagProps['onClick']>,
  },

  setup(props: AtTagProps, { attrs, slots }) {

    const rootClass = computed(() => ({
      'at-tag': true,
      [`at-tag--${SIZE_CLASS[props.size!]}`]: SIZE_CLASS[props.size!],
      [`at-tag--${props.type}`]: TYPE_CLASS[props.type!],
      'at-tag--disabled': props.disabled,
      'at-tag--active': props.active,
      'at-tag--circle': props.circle
    }))

    function handleClick(event: CommonEvent): void {

      if (!props.disabled) {
        typeof props.onClick === 'function' &&
          props.onClick(
            {
              name: props.name!,
              active: props.active!
            },
            event
          )
      }
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClass.value,
        onTap: handleClick
      }), { default: () => slots.default && slots.default() })
    )
  }
})

export default AtTag


