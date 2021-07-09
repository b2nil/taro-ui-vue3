import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { Image, Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtIconBaseProps } from '@taro-ui-vue3/types/base'
import { AtTabBarProps, TabItem } from '@taro-ui-vue3/types/tab-bar'
import { useIconClasses, useIconStyle } from "@taro-ui-vue3/composables/icon"
import { convertToUnit } from '@taro-ui-vue3/utils/common'

import AtBadge from '../badge/index'

const AtTabBar = defineComponent({
  name: "AtTabBar",

  props: {
    fixed: Boolean,
    current: {
      type: Number,
      default: 0
    },
    iconSize: {
      type: [Number, String],
      default: 24,
      validator: (prop: string | number) => {
        return typeof parseInt(`${prop}`) === 'number'
      }
    },
    fontSize: {
      type: [Number, String],
      default: 14,
      validator: (prop: string | number) => {
        return typeof parseInt(`${prop}`) === 'number'
      }
    },
    color: {
      type: String,
      default: '#333'
    },
    selectedColor: {
      type: String,
      default: '#6190E8'
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    tabList: {
      type: Array as PropType<AtTabBarProps['tabList']>,
      default: []
    },
    onClick: {
      type: Function as unknown as PropType<AtTabBarProps['onClick']>,
      default: () => (index: number, event: CommonEvent) => { }
    }
  },

  setup(props: AtTabBarProps, { attrs }) {

    const rootStyle = computed(() => ({
      backgroundColor: props.backgroundColor
    }))

    const titleStyle = computed(() => ({
      fontSize: props.fontSize ? convertToUnit(props.fontSize) : ''
    }))

    const imgStyle = computed(() => ({
      width: convertToUnit(props.iconSize),
      height: convertToUnit(props.iconSize)
    }))

    const rootClasses = computed(() => ({
      'at-tab-bar': true,
      'at-tab-bar--fixed': props.fixed
    }))

    const genItemClasses = (i: number) => ({
      'at-tab-bar__item': true,
      'at-tab-bar__item--active': props.current === i
    })

    const genImgClasses = computed(() => (selected: boolean) => ({
      'at-tab-bar__inner-img': true,
      'at-tab-bar__inner-img--inactive': selected
    }))

    const genImgSrc = (item: TabItem, i: number) => {
      return props.current === i
        ? item.selectedImage || item.image
        : item.image
    }

    const genItemStyle = (i: number) => {
      return props.current === i
        ? { color: props.selectedColor }
        : { color: props.color }
    }

    function genIconInfo(item: TabItem, i: number): AtIconBaseProps {
      const iconInfo: AtIconBaseProps = {
        prefixClass: item.iconPrefixClass,
        value: item.iconType!,
        color: props.color,
        size: props.iconSize
      }

      if (props.current === i) {
        iconInfo.value = item.selectedIconType || item.iconType!
        iconInfo.color = props.selectedColor
      }

      return iconInfo
    }

    const genIconClasses = (item: TabItem, i: number) => {
      const iconInfo = genIconInfo(item, i)
      const { iconClasses } = useIconClasses(iconInfo, true)
      return iconClasses.value
    }

    const genIconStyle = (item: TabItem, i: number) => {
      const iconInfo = genIconInfo(item, i)
      const { iconStyle } = useIconStyle(iconInfo)
      return iconStyle.value
    }

    function handleClick(index: number, event: CommonEvent): void {
      props.onClick(index, event)
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClasses.value,
        style: rootStyle.value,
      }), {
        default: () => props.tabList.map((item: TabItem, i: number) => (
          // tab-bar item
          h(View, {
            key: item.title,
            class: genItemClasses(i),
            style: genItemStyle(i),
            onTap: handleClick.bind(this, i)
          }, {
            default: () => [
              // tab bar icon
              item.iconType && (
                h(AtBadge, {
                  dot: !!item.dot,
                  value: item.text,
                  maxValue: Number(item.max),
                }, {
                  default: () => (
                    h(View, {
                      class: 'at-tab-bar__icon'
                    }, {
                      default: () => [
                        h(Text, {
                          class: genIconClasses(item, i),
                          style: genIconStyle(item, i),
                        })
                      ]
                    })
                  )
                })
              ),

              // tab bar image
              item.image && !item.iconType && (
                h(AtBadge, {
                  dot: !!item.dot,
                  value: item.text,
                  maxValue: Number(item.max),
                }, {
                  default: () => (
                    h(View, {
                      class: 'at-tab-bar__icon'
                    }, {
                      default: () => [
                        h(Image, {
                          class: genImgClasses.value(props.current !== i),
                          mode: 'widthFix',
                          src: genImgSrc(item, i),
                          style: imgStyle.value
                        }),
                        h(Image, {
                          class: genImgClasses.value(props.current === i),
                          mode: 'widthFix',
                          src: genImgSrc(item, i),
                          style: imgStyle.value
                        })
                      ]
                    })
                  )
                })
              ),

              // tab bar title
              h(View, null, {
                default: () => [
                  h(AtBadge, {
                    dot: item.iconType || item.image ? false : !!item.dot,
                    value: item.iconType || item.image ? '' : item.text,
                    maxValue: item.iconType || item.image ? 0 : Number(item.max),
                  }, {
                    default: () => (
                      h(View, {
                        class: 'at-tab-bar__title',
                        style: titleStyle.value
                      }, { default: () => item.title })
                    )
                  })
                ]
              })
            ]
          })
        ))
      })
    )
  }
})

export default AtTabBar
