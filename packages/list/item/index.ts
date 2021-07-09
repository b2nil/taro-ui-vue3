import { h, defineComponent, mergeProps, computed, PropType } from 'vue'
import { View, Image, Switch } from '@tarojs/components'
import { useIconClasses, useIconStyle } from "@taro-ui-vue3/composables/icon"

import type { CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import type { AtListItemProps } from '@taro-ui-vue3/types/list'

const AtListItem = defineComponent({
  props: {
    note: String,
    title: { type: String, default: '' },
    thumb: String,
    extraText: String,
    extraThumb: String,
    switchColor: { type: String, default: '#6190E8' },
    disabled: Boolean,
    isSwitch: Boolean,
    switchIsCheck: Boolean,
    hasBorder: Boolean,
    iconInfo: Object as PropType<AtListItemProps['iconInfo']>,
    arrow: {
      type: String as PropType<AtListItemProps['arrow']>,
      validator: (prop: string) => ['up', 'down', 'right'].includes(prop)
    },
    onClick: Function as unknown as PropType<AtListItemProps['onClick']>,
    onSwitchChange: Function as unknown as PropType<AtListItemProps['onSwitchChange']>
  },

  setup(props: AtListItemProps, { attrs }) {

    const rootClasses = computed(() => ({
      'at-list__item': true,
      'at-list__item--thumb': props.thumb,
      'at-list__item--multiple': props.note,
      'at-list__item--disabled': props.disabled,
      'at-list__item--no-border': !props.hasBorder,
    }))

    const { iconStyle } = useIconStyle(props.iconInfo, '', 24)
    const { iconClasses } = useIconClasses(props.iconInfo, true)

    const arrowClasses = computed(() => {
      if (!props.arrow) return {}

      let arrow = 'right'
      if (['up', 'down'].includes(props.arrow)) {
        arrow = props.arrow
      }

      return {
        'at-icon': Boolean(props.arrow),
        'item-extra__icon-arrow': Boolean(props.arrow),
        [`at-icon-chevron-${arrow}`]: Boolean(props.arrow)
      }
    })

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

              Boolean(props.iconInfo?.value) && (
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