import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { Switch, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtSwitchProps } from 'types/switch'

const AtSwitch = defineComponent({

  name: "AtSwitch",

  props: {
    title: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#6190e8'
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    onChange: Function as PropType<AtSwitchProps['onChange']>,
  },

  setup(props: AtSwitchProps, { attrs, slots }) {

    const rootClass = computed(() => ({
      'at-switch': true,
      'at-switch--without-border': !props.border
    }))

    const containerClass = computed(() => ({
      'at-switch__container': true,
      'at-switch--disabled': props.disabled
    }))

    function handleChange(event: CommonEvent): void {
      const { value, checked } = event.detail
      const state = typeof value === 'undefined' ? checked : value
      props.onChange && props.onChange(state)
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClass.value
      }), {
        default: () => [
          // title
          h(View, {
            class: 'at-switch__title'
          }, { default: () => props.title }),

          // container
          h(View, {
            class: containerClass.value
          }, {
            default: () => [
              // mask
              h(View, { class: 'at-switch__mask' }),

              // switch
              h(Switch, {
                class: 'at-switch__switch',
                checked: props.checked,
                color: props.color,
                onChange: handleChange,
              })
            ]
          })
        ]
      })
    )
  }
})

export default AtSwitch