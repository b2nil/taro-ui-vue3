import { h, defineComponent, computed, mergeProps, PropType } from "vue"
import _chunk from 'lodash-es/chunk'
import { Image, View, Text } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types'
import { AtGridProps, AtGridItem } from '@taro-ui-vue3/types/grid'
import { useIconClasses, useIconStyle } from '@taro-ui-vue3/composables/icon'

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
      validator: (m: string) => ['square', 'rect'].includes(m)
    },
    onClick: {
      type: Function as unknown as PropType<AtGridProps['onClick']>,
      default: () => () => { }
    }
  },

  setup(props: AtGridProps, { attrs }) {

    const gridGroup = computed(() => _chunk(props.data, props.columnNum))

    const bodyClasses = computed(() => {
      let mode = props.mode
      if (mode && !['square', 'rect'].includes(mode)) {
        mode = 'square'
      }

      return {
        'at-grid-item': true,
        'at-grid__flex-item': true,
        [`at-grid-item--${mode}`]: Boolean(mode),
        'at-grid-item--no-border': !props.hasBorder
      }
    })

    const genGridItemClasses = computed(() => (index: number) => ({
      ...bodyClasses.value,
      'at-grid-item--last': index === props.columnNum! - 1
    }))

    const flexStyle = computed(() => ({
      flex: `0 0 ${100 / props.columnNum!}%`
    }))

    const genIconClasses = (item: AtGridItem) => {
      const { iconClasses } = useIconClasses(item.iconInfo, true)
      return iconClasses.value
    }

    const genIconStyle = (item: AtGridItem) => {
      const { iconStyle } = useIconStyle(item.iconInfo, "", 24)
      return iconStyle.value
    }

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
                class: genGridItemClasses.value(index),
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
                              childItem.iconInfo && childItem.iconInfo.value && !childItem.image && (
                                h(Text, {
                                  class: genIconClasses(childItem),
                                  style: genIconStyle(childItem)
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