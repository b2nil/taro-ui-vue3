import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { Switch, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtSwitchProps } from 'types/switch'
import { useModelValue } from '../../composables/model'

const AtSwitch = defineComponent({
  name: "AtSwitch",

  emits: [
    "update:checked"
  ],

  props: {
    title: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#6190e8'
    },
    checked: Boolean,
    disabled: Boolean,
    border: Boolean,
    onChange: Function as PropType<AtSwitchProps['onChange']>,
  },

  setup(props: AtSwitchProps, { attrs, emit }) {

    const modelChecked = useModelValue(props, emit, 'checked')

    const rootClasses = computed(() => ({
      'at-switch': true,
      'at-switch--without-border': !Boolean(props.border)
    }))

    const containerClasses = computed(() => ({
      'at-switch__container': true,
      'at-switch--disabled': props.disabled
    }))

    function handleChange(event: CommonEvent): void {
      const { value, checked } = event.detail
      const state = typeof value === 'undefined' ? checked : value

      if (attrs['onUpdate:checked']) {
        modelChecked.value = state
      } else {
        props.onChange && props.onChange(state)
      }
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClasses.value
      }), {
        default: () => [
          // title
          h(View, {
            class: 'at-switch__title'
          }, { default: () => props.title }),

          // container
          h(View, {
            class: containerClasses.value
          }, {
            default: () => [
              // mask
              h(View, { class: 'at-switch__mask' }),

              // switch
              h(Switch, {
                class: 'at-switch__switch',
                checked: modelChecked.value,
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