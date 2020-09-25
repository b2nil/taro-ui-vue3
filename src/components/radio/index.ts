import { h, defineComponent, computed, mergeProps } from 'vue'
import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtRadioProps, RadioOption } from 'types/radio'

const AtRadio = defineComponent({
  name: "AtRadio",

  props: {
    value: {
      type: String as () => AtRadioProps<any>['value'],
      default: '',
      required: true
    },
    options: {
      type: Array as () => AtRadioProps<any>['options'],
      default: [],
      required: true
    },
    onClick: {
      type: Function as unknown as () => AtRadioProps<any>['onClick'],
      default: () => (vaule: any, event: CommonEvent) => { },
      required: true
    },
  },

  setup(props: AtRadioProps<any>, { attrs, slots }) {

    const genOptionClass = computed(() => (option) => ({
      'at-radio__option': true,
      'at-radio__option--disabled': option.disabled
    }))

    const genIconClass = computed(() => (option) => ({
      'at-radio__icon': true,
      'at-radio__icon--checked': props.value === option.value
    }))

    function handleClick(option: RadioOption<any>, event: CommonEvent): void {
      if (option.disabled) return
      props.onClick(option.value, event)
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: 'at-radio'
      }), {
        default: () => props.options.map(option => (
          h(View, {
            key: option.value,
            class: genOptionClass.value(option),
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
                        class: genIconClass.value(option)
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
