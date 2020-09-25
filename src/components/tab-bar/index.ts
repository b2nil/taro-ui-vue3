import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { Image, Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtTabBarProps, TabItem } from 'types/tab-bar'
import { mergeStyle } from '@/utils/common'

import AtBadge from '../badge/index'

const AtTabBar = defineComponent({
  name: "AtTabBar",

  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    current: {
      type: Number,
      default: 0,
      required: true
    },
    iconSize: {
      type: Number,
      default: 24
    },
    fontSize: {
      type: Number,
      default: 14
    },
    color: {
      type: String,
      default: '#333'
    },
    selectedColor: {
      type: String,
      default: '#6190E8'
    },
    tabList: {
      type: Array as PropType<AtTabBarProps['tabList']>,
      default: []
    },
    onClick: {
      type: Function as PropType<AtTabBarProps['onClick']>,
      default: () => (index: number, event: CommonEvent) => { },
      required: true
    },
  },

  setup(props: AtTabBarProps, { attrs, slots }) {

    const defaultStyle = computed(() => ({
      color: props.color || ''
    }))

    const selectedStyle = computed(() => ({
      color: props.selectedColor || ''
    }))

    const titleStyle = computed(() => ({
      fontSize: props.fontSize ? `${props.fontSize}px` : ''
    }))

    const rootStyle = computed(() => ({
      backgroundColor: props.backgroundColor || ''
    }))

    const imgStyle = computed(() => ({
      width: `${props.iconSize}px`,
      height: `${props.iconSize}px`
    }))

    const rootClass = computed(() => ({
      'at-tab-bar': true,
      'at-tab-bar--fixed': props.fixed
    }))

    const tabItemClass = computed(() => (i) => ({
      'at-tab-bar__item': true,
      'at-tab-bar__item--active': props.current === i
    }))

    const tabBarItemIconClass = computed(() => (item, i) => ({
      [`${item.iconPrefixClass || 'at-icon'}`]: true,
      [`${item.iconPrefixClass || 'at-icon'}-${item.selectedIconType
        }`]: props.current === i && item.selectedIconType,
      [`${item.iconPrefixClass || 'at-icon'}-${item.iconType
        }`]: !(props.current === i && item.selectedIconType)
    }))

    const tabBarItemIconStyle = computed(() => (i) => ({
      color: props.current === i ? props.selectedColor : props.color,
      fontSize: props.iconSize ? `${props.iconSize}px` : ''
    }))

    const tabBarItemInnerImgClass = computed(() => (selected: boolean) => ({
      'at-tab-bar__inner-img': true,
      'at-tab-bar__inner-img--inactive': selected
    }))

    function handleClick(index: number, event: CommonEvent): void {
      props.onClick(index, event)
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClass.value,
        style: rootStyle.value,
      }), {
        default: () => props.tabList.map((item: TabItem, i: number) => (
          // tab-bar item
          h(View, {
            key: item.title,
            class: tabItemClass.value(i),
            style: props.current === i ? selectedStyle.value : defaultStyle.value,
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
                          class: tabBarItemIconClass.value(item, i),
                          style: tabBarItemIconStyle.value(i),
                        })
                      ]
                    })
                  )
                })
              ),

              // tab bar image
              item.image && (
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
                          class: tabBarItemInnerImgClass.value(props.current !== i),
                          mode: 'widthFix',
                          src: item.selectedImage || item.image,
                          style: imgStyle.value
                        }),
                        h(Image, {
                          class: tabBarItemInnerImgClass.value(props.current === i),
                          mode: 'widthFix',
                          src: item.image,
                          style: imgStyle.value,
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
