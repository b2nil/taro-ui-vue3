import { h, defineComponent, mergeProps, PropType } from "vue"
import { Text, View } from '@tarojs/components'
import { AtCheckboxProps } from 'types/checkbox'

const AtCheckbox = defineComponent({
  name: "AtCheckbox",

  props: {
    // 参数
    options: {
      type: Array as PropType<AtCheckboxProps<any>['options']>,
      default: () => [],
      required: true
    },
    selectedList: {
      type: Array as PropType<AtCheckboxProps<any>['selectedList']>,
      default: () => [],
      required: true
    },
    // 事件
    onChange: {
      type: Function as PropType<AtCheckboxProps<any>['onChange']>,
      default: () => () => { }
    }
  },

  setup(props: AtCheckboxProps<any>, { attrs }) {

    const genOptionClass = (option) => ({
      'at-checkbox__option': true,
      'at-checkbox__option--disabled': option.disabled,
      'at-checkbox__option--selected': props.selectedList.includes(option.value)
    })

    function handleClick(idx: number) {
      const option = props.options[idx]
      const { disabled, value } = option
      if (disabled) return

      const selectedSet = new Set(props.selectedList)
      if (!selectedSet.has(value)) {
        selectedSet.add(value)
      } else {
        selectedSet.delete(value)
      }
      props.onChange([...selectedSet])
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: 'at-checkbox'
      }), {
        default: () => props.options.map((option, idx) => (
          h(View, {
            class: genOptionClass(option),
            key: option.value,
            onTap: handleClick.bind(this, idx)
          }, {
            default: () => [
              h(View, {
                class: 'at-checkbox__option-wrap'
              }, {
                default: () => [
                  h(View, {
                    class: 'at-checkbox__option-cnt'
                  }, {
                    default: () => [
                      h(View, {
                        class: 'at-checkbox__icon-cnt'
                      }, {
                        default: () => [
                          h(Text, { class: 'at-icon at-icon-check' })
                        ]
                      }),
                      h(View, {
                        class: 'at-checkbox__title'
                      }, { default: () => option.label })
                    ]
                  }),

                  option.desc && h(View, {
                    class: 'at-checkbox__desc'
                  }, { default: () => option.desc })
                ]
              })
            ]
          })
        ))
      })
    )
  }
})

export default AtCheckbox

