import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { Text, View } from '@tarojs/components'
import { pxTransform } from '@taro-ui-vue3/utils/common'
import { useIconClasses, useIconStyle } from "@taro-ui-vue3/composables/icon"

import { ITouchEvent } from '@tarojs/components/types/common'
import { AtNavBarProps } from '@taro-ui-vue3/types/nav-bar'
import { AtIconBaseProps } from '@taro-ui-vue3/types/base'

const AtNavBar = defineComponent({
  name: "AtNavBar",

  props: {
    title: {
      type: String as PropType<AtNavBarProps['title']>,
      default: ''
    },
    fixed: Boolean,
    border: {
      type: Boolean,
      default: true
    },
    color: {
      type: String as PropType<AtNavBarProps['color']>,
      default: '#6190E8'
    },
    leftText: {
      type: String as PropType<AtNavBarProps['leftText']>,
      default: ''
    },
    leftIconType: {
      type: [String, Object] as PropType<AtNavBarProps['leftIconType']>,
      default: 'chevron-left'
    },
    rightFirstIconType: [String, Object] as PropType<AtNavBarProps['rightFirstIconType']>,
    rightSecondIconType: [String, Object] as PropType<AtNavBarProps['rightFirstIconType']>,
    // events
    onClickLeftIcon: Function as unknown as PropType<AtNavBarProps['onClickLeftIcon']>,
    onClickRightFirstIcon: Function as unknown as PropType<AtNavBarProps['onClickRightFirstIcon']>,
    onClickRightSecondIcon: Function as unknown as PropType<AtNavBarProps['onClickRightSecondIcon']>
  },

  setup(props: AtNavBarProps, { attrs, slots }) {

    const linkStyle = computed(() => ({ color: props.color }))

    const rootClasses = computed(() => ({
      'at-nav-bar': true,
      'at-nav-bar--fixed': props.fixed,
      'at-nav-bar--no-border': !props.border
    }))

    const genContainerClasses = computed(() => (iconType) => ({
      'at-nav-bar__container': true,
      'at-nav-bar__container--hide': !iconType
    }))

    const defaultIconInfo = {
      prefixClass: 'at-icon',
      value: '',
      color: '',
      size: 24
    }

    const genIconInfo = (iconType?: string | AtIconBaseProps) => {
      const iconInfo = computed(() => (
        iconType instanceof Object
          ? { ...defaultIconInfo, ...iconType }
          : { ...defaultIconInfo, value: iconType || '' }
      ))
      if (iconInfo.value.size) {
        iconInfo.value.size = parseInt(iconInfo.value.size.toString()) * 2
      }
      return iconInfo
    }

    const leftIconInfo = genIconInfo(props.leftIconType)
    const rightFirstIconInfo = genIconInfo(props.rightFirstIconType)
    const rightSecondIconInfo = genIconInfo(props.rightSecondIconType)

    const {
      iconClasses: leftIconClasses
    } = useIconClasses(leftIconInfo.value, true)

    const {
      iconStyle: leftIconStyle
    } = useIconStyle(leftIconInfo.value, undefined, undefined, pxTransform)

    const {
      iconClasses: rightFirstIconClasses
    } = useIconClasses(rightFirstIconInfo.value, true)

    const {
      iconStyle: rightFirstIconStyle
    } = useIconStyle(rightFirstIconInfo.value, undefined, undefined, pxTransform)

    const {
      iconClasses: rightSecondIconClasses
    } = useIconClasses(rightSecondIconInfo.value, true)

    const {
      iconStyle: rightSecondIconStyle
    } = useIconStyle(rightSecondIconInfo.value, undefined, undefined, pxTransform)

    function handleLeftIconClick(event: ITouchEvent): void {
      props.onClickLeftIcon?.(event)
    }

    function handleFirstIconClick(event: ITouchEvent): void {
      props.onClickRightFirstIcon?.(event)
    }

    function handleSecondIconClick(event: ITouchEvent): void {
      props.onClickRightSecondIcon?.(event)
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClasses.value
      }), {
        default: () => [
          // left-view
          h(View, {
            class: 'at-nav-bar__left-view',
            style: linkStyle.value,
            onTap: handleLeftIconClick
          }, {
            default: () => [
              (props.leftIconType) && (
                h(Text, {
                  class: leftIconClasses.value,
                  style: leftIconStyle.value
                })
              ),
              h(Text, {
                class: 'at-nav-bar__text'
              }, { default: () => props.leftText })
            ]
          }),

          // title
          h(View, {
            class: 'at-nav-bar__title'
          }, { default: () => props.title || slots.default && slots.default() }),

          // right-view
          h(View, {
            class: 'at-nav-bar__right-view'
          }, {
            default: () => [
              // 2nd icon
              h(View, {
                class: genContainerClasses.value(props.rightSecondIconType),
                style: linkStyle.value,
                onTap: handleSecondIconClick
              }, {
                default: () => [
                  (props.rightSecondIconType) && (
                    h(Text, {
                      class: rightSecondIconClasses.value,
                      style: rightSecondIconStyle.value
                    })
                  )
                ]
              }),

              // 1st icon
              h(View, {
                class: genContainerClasses.value(props.rightFirstIconType),
                style: linkStyle.value,
                onTap: handleFirstIconClick
              }, {
                default: () => [
                  (props.rightFirstIconType) && (
                    h(Text, {
                      class: rightFirstIconClasses.value,
                      style: rightFirstIconStyle.value
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

export default AtNavBar
