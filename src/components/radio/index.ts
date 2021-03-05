import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtRadioProps, RadioOption } from 'types/radio'
import { useModelValue } from '../../composables/model'

const AtRadio = defineComponent({
  name: "AtRadio",

  emits: [
    "update:value"
  ],

  props: {
    value: {
      type: String as PropType<AtRadioProps<any>['value']>,
      default: '',
      required: true
    },
    options: {
      type: Array as PropType<AtRadioProps<any>['options']>,
      default: [],
      required: true
    },
    onClick: Function as PropType<AtRadioProps<any>['onClick']>
  },

  setup(props: AtRadioProps<any>, { attrs, emit }) {

    const radioModelValue = useModelValue(props, emit, 'value')

    const genOptionClasses = computed(() => (option) => ({
      'at-radio__option': true,
      'at-radio__option--disabled': option.disabled
    }))

    const genIconClasses = computed(() => (option) => ({
      'at-radio__icon': true,
      'at-radio__icon--checked': props.value === option.value
    }))

    function handleClick(option: RadioOption<any>, event: CommonEvent): void {
      if (option.disabled) return

      if (attrs['onUpdate:value']) {
        radioModelValue.value = option.value
      } else {
        props.onClick?.(option.value, event)
      }
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: 'at-radio'
      }), {
        default: () => props.options.map(option => (
          h(View, {
            key: option.value,
            class: genOptionClasses.value(option),
            onTap: handleClick.bind(this, option)
          }, {
            default: () => [
              h(View, {
                class: 'at-radio__option-wrap'
              }, {
                default: () => [
                  h(View, {
                    class: 'at-radio__option-container'
                  }, {
                    default: () => [
                      // title label
                      h(View, {
                        class: 'at-radio__title'
                      }, { default: () => option.label }),

                      // icon
                      h(View, {
                        class: genIconClasses.value(option)
                      }, {
                        default: () => [
                          h(Text, { class: 'at-icon at-icon-check' })
                        ]
                      })
                    ]
                  }),

                  // description
                  option.desc && (
                    h(View, { class: 'at-radio__desc' }, { default: () => option.desc })
                  )
                ]
              })
            ]
          })
        ))
      })
    )
  }
})

export default AtRadio
