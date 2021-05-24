import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { Text, View } from '@tarojs/components'
import { ITouchEvent } from '@tarojs/components/types/common'
import { AtNavBarProps } from '@taro-ui-vue3/types/nav-bar'
import { mergeStyle, pxTransform } from '@taro-ui-vue3/utils/common'

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
    leftIconType: {
      type: [String, Object] as PropType<AtNavBarProps['leftIconType']>,
      default: ''
    },
    leftText: {
      type: String as PropType<AtNavBarProps['leftText']>,
      default: ''
    },
    rightFirstIconType: {
      type: [String, Object] as PropType<AtNavBarProps['rightFirstIconType']>,
      default: ''
    },
    rightSecondIconType: {
      type: [String, Object] as PropType<AtNavBarProps['rightFirstIconType']>,
      default: ''
    },
    // events
    onClickLeftIcon: Function as unknown as PropType<AtNavBarProps['onClickLeftIcon']>,
    onClickRightFirstIcon: Function as unknown as PropType<AtNavBarProps['onClickRightFirstIcon']>,
    onClickRightSecondIcon: Function as unknown as PropType<AtNavBarProps['onClickRightSecondIcon']>
  },

  setup(props: AtNavBarProps, { attrs, slots }) {

    const linkStyle = computed(() => ({ color: props.color }))

    const defaultIconInfo = {
      customStyle: '',
      className: '',
      prefixClass: 'at-icon',
      value: '',
      color: '',
      size: 24
    }

    const leftIconInfo = computed(() =>
      props.leftIconType instanceof Object
        ? { ...defaultIconInfo, ...props.leftIconType }
        : { ...defaultIconInfo, value: props.leftIconType }
    )

    const leftIconClasses = computed(() => ({
      [`${leftIconInfo.value.prefixClass}`]: Boolean(leftIconInfo.value.prefixClass),
      [`${leftIconInfo.value.prefixClass}-${leftIconInfo.value.value}`]: Boolean(leftIconInfo.value.value),
      [`${leftIconInfo.value.className}`]: Boolean(leftIconInfo.value.className)
    }))

    const rightFirstIconInfo = computed(() =>
      props.rightFirstIconType instanceof Object
        ? { ...defaultIconInfo, ...props.rightFirstIconType }
        : { ...defaultIconInfo, value: props.rightFirstIconType }
    )

    const rightFirstIconClasses = computed(() => ({
      [`${rightFirstIconInfo.value.prefixClass}`]: Boolean(rightFirstIconInfo.value.prefixClass),
      [`${rightFirstIconInfo.value.prefixClass}-${rightFirstIconInfo.value.value}`]: Boolean(rightFirstIconInfo.value.value),
      [`${rightFirstIconInfo.value.className}`]: Boolean(rightFirstIconInfo.value.className)
    }))

    const rightSecondIconInfo = computed(() =>
      props.rightSecondIconType instanceof Object
        ? { ...defaultIconInfo, ...props.rightSecondIconType }
        : { ...defaultIconInfo, value: props.rightSecondIconType }
    )

    const rightSecondIconClasses = computed(() => ({
      [`${rightSecondIconInfo.value.prefixClass}`]: Boolean(rightSecondIconInfo.value.prefixClass),
      [`${rightSecondIconInfo.value.prefixClass}-${rightSecondIconInfo.value.value}`]: Boolean(rightSecondIconInfo.value.value),
      [`${rightSecondIconInfo.value.className}`]: Boolean(rightSecondIconInfo.value.className)
    }))

    const rootClass = computed(() => ({
      'at-nav-bar': true,
      'at-nav-bar--fixed': props.fixed,
      'at-nav-bar--no-border': !props.border
    }))

    const leftIconStyle = computed(() => mergeStyle(
      {
        color: leftIconInfo.value.color,
        fontSize: `${pxTransform(
          parseInt(leftIconInfo.value.size.toString()) * 2
        )}`
      },
      leftIconInfo.value.customStyle
    ))

    const rightSecondIconStyle = computed(() => mergeStyle(
      {
        color: rightSecondIconInfo.value.color,
        fontSize: `${pxTransform(
          parseInt(rightSecondIconInfo.value.size.toString()) * 2
        )}`
      },
      rightSecondIconInfo.value.customStyle
    ))

    const genContainerClasses = computed(() => (iconType) => ({
      'at-nav-bar__container': true,
      'at-nav-bar__container--hide': !iconType
    }))

    const rightFirstIconStyle = computed(() => mergeStyle(
      {
        color: rightFirstIconInfo.value.color,
        fontSize: `${pxTransform(
          parseInt(rightFirstIconInfo.value.size.toString()) * 2
        )}`
      },
      rightFirstIconInfo.value.customStyle
    ))


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
        class: rootClass.value
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
