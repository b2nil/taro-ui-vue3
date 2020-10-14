import { h, defineComponent, mergeProps, computed, PropType } from 'vue'
import { View, Image, Switch } from '@tarojs/components'
import { CommonEvent, ITouchEvent, CommonEventFunction } from '@tarojs/components/types/common'
import { AtListItemProps } from "types/list"
import { AtIconBaseProps } from "types/base"
import { mergeStyle } from "../../../utils/common"

const AtListItem = defineComponent({
  props: {
    note: { type: String, default: '' },
    title: { type: String, default: '' },
    thumb: { type: String, default: '' },
    extraText: { type: String, default: '' },
    extraThumb: { type: String, default: '' },
    switchColor: { type: String, default: '#6190E8' },
    disabled: { type: Boolean, default: false },
    isSwitch: { type: Boolean, default: false },
    switchIsCheck: { type: Boolean, default: false },
    hasBorder: { type: Boolean, default: false },
    iconInfo: {
      type: Object as PropType<AtListItemProps['iconInfo']>,
      default: () => ({ value: '' } as AtIconBaseProps)
    },
    arrow: {
      type: String as PropType<AtListItemProps['arrow']>,
      default: '',
      validator: (prop: string) => ['up', 'down', 'right', ''].includes(prop)
    },
    onClick: {
      type: Function as PropType<AtListItemProps['onClick']>,
      default: () => () => { }
    },
    onSwitchChange: {
      type: Function as PropType<AtListItemProps['onSwitchChange']>,
      default: () => () => { }
    },
  },

  setup(props: AtListItemProps, { attrs }) {

    const rootClasses = computed(() => ({
      'at-list__item': true,
      'at-list__item--thumb': props.thumb,
      'at-list__item--multiple': props.note,
      'at-list__item--disabled': props.disabled,
      'at-list__item--no-border': !props.hasBorder,
    }))

    const iconClasses = computed(() => ({
      [`${props.iconInfo!.prefixClass || 'at-icon'}`]: true,
      [`${props.iconInfo!.prefixClass || 'at-icon'}-${props.iconInfo!.value}`]: Boolean(props.iconInfo!.value),
      [`${props.iconInfo!.class}`]: Boolean(props.iconInfo!.class)
    }))

    const iconStyle = computed(() => mergeStyle(
      {
        color: props.iconInfo!.color || '',
        fontSize: `${props.iconInfo!.size || 24}px`,
      },
      props.iconInfo!.style! as Object
    ))

    const arrowClasses = computed(() => ({
      'at-icon': true,
      'item-extra__icon-arrow': true,
      [`at-icon-chevron-${props.arrow}`]: true
    }))

    function handleClick(e: ITouchEvent) {
      if (typeof props.onClick === 'function' && !props.disabled) {
        props.onClick(e)
      }
    }

    function handleSwitchClick(e: CommonEvent) {
      e.stopPropagation()
    }

    function handleSwitchChange(e: CommonEvent) {
      if (typeof props.onSwitchChange === 'function' && !props.disabled) {
        props.onSwitchChange(e)
      }
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClasses.value,
        onTap: handleClick
      }), {
        default: () => [
          h(View, {
            class: 'at-list__item-container'
          }, {
            default: () => [
              props.thumb && (
                h(View, {
                  class: 'at-list__item-thumb item-thumb'
                }, {
                  default: () => [
                    h(Image, {
                      class: 'item-thumb__info',
                      mode: 'scaleToFill',
                      src: props.thumb
                    })
                  ]
                })
              ),

              props.iconInfo!.value && (
                h(View, {
                  class: 'at-list__item-icon item-icon'
                }, {
                  default: () => [
                    h(View, {
                      class: iconClasses.value,
                      style: iconStyle.value
                    })
                  ]
                })
              ),

              h(View, {
                class: 'at-list__item-content item-content'
              }, {
                default: () => [
                  h(View, {
                    class: 'item-content__info'
                  }, {
                    default: () => [
                      h(View, {
                        class: 'item-content__info-title'
                      }, { default: () => props.title }),

                      props.note && h(View, {
                        class: 'item-content__info-note'
                      }, { default: () => props.note })
                    ]
                  })
                ]
              }),

              h(View, {
                class: 'at-list__item-extra item-extra'
              }, {
                default: () => [
                  props.extraText && (
                    h(View, {
                      class: 'item-extra__info'
                    }, { default: () => props.extraText })
                  ),

                  props.extraThumb && !props.extraText && (
                    h(View, {
                      class: 'item-extra__image'
                    }, {
                      default: () => [
                        h(Image, {
                          class: 'item-extra__image-info',
                          mode: 'aspectFit',
                          src: props.extraThumb
                        })
                      ]
                    })
                  ),

                  props.isSwitch && !props.extraThumb && !props.extraText && (
                    h(View, {
                      class: 'item-extra__switch',
                      onTap: handleSwitchClick
                    }, {
                      default: () => [
                        h(Switch, {
                          color: props.switchColor,
                          disabled: props.disabled,
                          checked: props.switchIsCheck,
                          onChange: handleSwitchChange
                        })
                      ]
                    })
                  ),

                  props.arrow && (
                    h(View, {
                      class: 'item-extra__icon'
                    }, {
                      default: () => [
                        h(View, {
                          class: arrowClasses.value
                        })
                      ]
                    })
                  )
                ]
              })
            ]
          })
        ]
      })
    )
  }
})

export default AtListItem