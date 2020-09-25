import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { Text, View } from '@tarojs/components'
import { ITouchEvent } from '@tarojs/components/types/common'
import { AtNavBarProps } from 'types/nav-bar'
import { mergeStyle, pxTransform } from '@/utils/common'

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
    onClickLeftIcon: Function as PropType<AtNavBarProps['onClickLeftIcon']>,
    onClickRgIconSt: Function as PropType<AtNavBarProps['onClickRgIconSt']>,
    onClickRgIconNd: Function as PropType<AtNavBarProps['onClickRgIconNd']>
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

    const leftIconClass = computed(() => ({
      [`${leftIconInfo.value.prefixClass}`]: Boolean(leftIconInfo.value.prefixClass),
      [`${leftIconInfo.value.prefixClass}-${leftIconInfo.value.value}`]: Boolean(leftIconInfo.value.value),
      [`${leftIconInfo.value.className}`]: Boolean(leftIconInfo.value.className)
    }))

    const rightFirstIconInfo = computed(() =>
      props.rightFirstIconType instanceof Object
        ? { ...defaultIconInfo, ...props.rightFirstIconType }
        : { ...defaultIconInfo, value: props.rightFirstIconType }
    )

    const rightFirstIconClass = computed(() => ({
      [`${rightFirstIconInfo.value.prefixClass}`]: Boolean(rightFirstIconInfo.value.prefixClass),
      [`${rightFirstIconInfo.value.prefixClass}-${rightFirstIconInfo.value.value}`]: Boolean(rightFirstIconInfo.value.value),
      [`${rightFirstIconInfo.value.className}`]: Boolean(rightFirstIconInfo.value.className)
    }))

    const rightSecondIconInfo = computed(() =>
      props.rightSecondIconType instanceof Object
        ? { ...defaultIconInfo, ...props.rightSecondIconType }
        : { ...defaultIconInfo, value: props.rightSecondIconType }
    )

    const rightSecondIconClass = computed(() => ({
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

    const containerClass = computed(() => (iconType) => ({
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


    function handleClickLeftView(event: ITouchEvent): void {
      props.onClickLeftIcon && props.onClickLeftIcon(event)
    }

    function handleClick1St(event: ITouchEvent): void {
      props.onClickRgIconSt && props.onClickRgIconSt(event)
    }

    function handleClick2Nd(event: ITouchEvent): void {
      props.onClickRgIconNd && props.onClickRgIconNd(event)
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
            onTap: handleClickLeftView
          }, {
            default: () => [
              (props.leftIconType) && (
                h(Text, {
                  class: leftIconClass.value,
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
                class: containerClass.value(props.rightSecondIconType),
                style: linkStyle.value,
                onTap: handleClick2Nd
              }, {
                default: () => [
                  (props.rightSecondIconType) && (
                    h(Text, {
                      class: rightSecondIconClass.value,
                      style: rightSecondIconStyle.value
                    })
                  )
                ]
              }),

              // 1st icon
              h(View, {
                class: containerClass.value(props.rightFirstIconType),
                style: linkStyle.value,
                onTap: handleClick1St
              }, {
                default: () => [
                  (props.rightFirstIconType) && (
                    h(Text, {
                      class: rightFirstIconClass.value,
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
