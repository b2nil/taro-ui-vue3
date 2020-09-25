import { h, defineComponent, computed, mergeProps, PropType } from "vue"
import _chunk from 'lodash/chunk'
import { Image, View, Text } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types'
import { AtGridProps, AtGridItem } from 'types/grid'
import { mergeStyle } from "@/utils/common"

const AtGrid = defineComponent({
  name: "AtGrid",

  props: {
    // 参数
    data: {
      type: Array as PropType<AtGridProps['data']>,
      default: () => [],
    },
    columnNum: {
      type: Number as PropType<AtGridProps['columnNum']>,
      default: 3,
    },
    hasBorder: {
      type: Boolean,
      default: true,
    },
    mode: {
      type: String as PropType<AtGridProps['mode']>,
      default: 'square',
    },
    onClick: {
      type: Function as PropType<AtGridProps['onClick']>,
      default: () => () => { }
    }
  },

  setup(props: AtGridProps, { attrs }) {

    const gridGroup = computed(() => _chunk(props.data, props.columnNum))

    const bodyClass = computed(() => ({
      'at-grid-item': true,
      'at-grid__flex-item': true,
      [`at-grid-item--${props.mode}`]: true,
      'at-grid-item--no-border': !props.hasBorder
    }))

    const gridItemClass = computed(() => (index) => ({
      ...bodyClass.value,
      'at-grid-item--last': index === props.columnNum! - 1
    }))

    const flexStyle = computed(() => ({
      flex: `0 0 ${100 / props.columnNum!}%`
    }))

    const iconInfoClass = computed(() => (childItem) => ({
      [`${childItem.iconInfo?.prefixClass || 'at-icon'}`]: true,
      [`${childItem.iconInfo?.prefixClass || 'at-icon'
        }-${childItem.iconInfo?.value}`]: Boolean(childItem.iconInfo?.value),
      [`${childItem.iconInfo?.className}`]: Boolean(childItem.iconInfo?.className)
    }))

    const iconInfoStyle = computed(() => (childItem) => mergeStyle(
      {
        color: childItem.iconInfo?.color,
        fontSize: `${childItem.iconInfo?.size || 24}px`
      },
      childItem.iconInfo!.customStyle!
    ))


    function handleClick(
      item: AtGridItem,
      index: number,
      row: number,
      event: CommonEvent
    ) {
      if (typeof props.onClick === 'function') {
        const clickIndex = row * props.columnNum! + index
        props.onClick(item, clickIndex, event)
      }
    }

    return () => {

      if (Array.isArray(props.data) && props.data.length === 0) {
        return null
      }

      return h(View, mergeProps(attrs, {
        class: 'at-grid'
      }), {
        default: () => gridGroup.value.map((item, i) => (
          h(View, {
            class: 'at-grid__flex',
            key: `at-grid-group-${i}`
          }, {
            default: () => item.map((childItem, index) => (
              h(View, {
                key: `at-grid-item-${index}`,
                class: gridItemClass.value(index),
                style: flexStyle.value,
                onTap: handleClick.bind(this, childItem, index, i)
              }, {
                default: () => [
                  h(View, {
                    class: 'at-grid-item__content'
                  }, {
                    default: () => [
                      h(View, {
                        class: 'at-grid-item__content-inner'
                      }, {
                        default: () => [
                          h(View, {
                            class: 'content-inner__icon'
                          }, {
                            default: () => [
                              // use image
                              childItem.image && (
                                h(Image, {
                                  class: 'content-inner__img',
                                  mode: 'scaleToFill',
                                  src: childItem.image
                                })
                              ),

                              // use icon
                              childItem.iconInfo && !childItem.image && (
                                h(Text, {
                                  class: iconInfoClass.value(childItem),
                                  style: iconInfoStyle.value(childItem)
                                })
                              )
                            ]
                          }),

                          h(Text, {
                            class: 'content-inner__text'
                          }, { default: () => [childItem.value] })
                        ]
                      }),
                    ]
                  }),
                ]
              })
            ))
          }))
        )
      })
    }
  }
})

export default AtGrid