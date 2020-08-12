import { h, defineComponent, computed } from 'vue'
import classNames from 'classnames'
import { View } from '@/utils/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtTagProps } from 'types/tag'
import AtComponentWithDefaultProps from '../mixins'

const SIZE_CLASS = {
  normal: 'normal',
  small: 'small'
}

const TYPE_CLASS = {
  primary: 'primary'
}

const AtTag = defineComponent({
  mixins: [AtComponentWithDefaultProps],

  props: {
    size: {
      type: String as () => AtTagProps['size'],
      default: 'normal' as AtTagProps['size'],
      validator: (val: string) => ['normal', 'small'].includes(val)
    },
    type: {
      type: String as () => AtTagProps['type'],
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
    onClick: Function as unknown as () => AtTagProps['onClick'],
  },

  setup(props: AtTagProps, { slots }) {

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

    return () => {
      const rootClass = computed(() => classNames(
        'at-tag',
        {
          [`at-tag--${SIZE_CLASS[props.size!]}`]: SIZE_CLASS[props.size!],
          [`at-tag--${props.type}`]: TYPE_CLASS[props.type!],
          'at-tag--disabled': props.disabled,
          'at-tag--active': props.active,
          'at-tag--circle': props.circle
        },
        props.className
      ))

      return (
        h(View, {
          class: rootClass.value,
          style: props.customStyle,
          onTap: handleClick
        },
          slots.default && slots.default()
        )
      )
    }
  }
})

export default AtTag


