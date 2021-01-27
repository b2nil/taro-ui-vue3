import {
  h,
  defineComponent,
  reactive,
  onMounted,
  Ref,
  computed,
  ref,
  mergeProps,
  PropType
} from 'vue'

import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'

import type { AtNoticeBarProps } from 'types/noticebar'
import type { CommonEvent } from '@tarojs/components/types/common'

const AtNoticebar = defineComponent({
  name: "AtNoticebar",

  props: {
    close: Boolean as PropType<AtNoticeBarProps['close']>,
    single: Boolean as PropType<AtNoticeBarProps['single']>,
    marquee: Boolean as PropType<AtNoticeBarProps['marquee']>,
    showMore: Boolean as PropType<AtNoticeBarProps['showMore']>,
    speed: {
      type: Number as PropType<AtNoticeBarProps['speed']>,
      default: 100
    },
    moreText: {
      type: String as PropType<AtNoticeBarProps['moreText']>,
      default: '查看详情'
    },
    icon: String as PropType<AtNoticeBarProps['icon']>,
    // events
    onClose: Function as PropType<AtNoticeBarProps['onClose']>,
    onGotoMore: Function as PropType<AtNoticeBarProps['onGotoMore']>
  },

  setup(props: AtNoticeBarProps, { attrs, slots }) {

    const env = Taro.getEnv()
    const timeout: Ref<NodeJS.Timeout | null> = ref(null)
    const interval: Ref<NodeJS.Timer | null> = ref(null)

    const state = reactive({
      dura: 15,
      show: true,
      _close: props.marquee ? false : props.close,
      _showMore: !props.single ? false : props.showMore,
      animElemId: `J_${Math.ceil(Math.random() * 10e5).toString(36)}`,
      animationData: { actions: [{}] },
      isWEB: env === Taro.ENV_TYPE.WEB
    })

    const rootClasses = computed(() => ({
      'at-noticebar': true,
      'at-noticebar--marquee': props.marquee,
      'at-noticebar--weapp': props.marquee && (!state.isWEB),
      'at-noticebar--single': !props.marquee && props.single
    }))

    const animationStyle = computed(() => {
      const style = {}
      if (props.marquee) {
        style['animation-duration'] = `${state.dura}s`
      }
      return style
    })

    const innerContentClasses = computed(() => ({
      'at-noticebar__content-inner': true,
      [`${state.animElemId}`]: props.marquee
    }))

    const iconClasses = computed(() => ({
      'at-icon': true,
      [`at-icon-${props.icon}`]: Boolean(props.icon)
    }))

    function handleClose(event: CommonEvent): void {
      state.show = false
      props.onClose?.(event)
    }

    function onGotoMore(event: CommonEvent): void {
      props.onGotoMore?.(event)
    }

    function initWebAnimation() {
      const elem = document.querySelector(`.${state.animElemId}`)

      if (!elem) return

      const width = elem.getBoundingClientRect().width
      state.dura = width / +props.speed!
    }

    function initMiniAppAnimation() {
      const query = Taro.createSelectorQuery()
      query
        .select(`.${state.animElemId}`)
        .boundingClientRect()
        .exec(res => {
          const queryRes = res[0]
          if (!queryRes) return

          const { width } = queryRes
          const dura = width / +props.speed!

          const animation = Taro.createAnimation({
            duration: dura * 1000,
          })

          const resetAnimation = Taro.createAnimation({
            duration: 0,
          })

          const resetOpacityAnimation = Taro.createAnimation({
            duration: 0,
          })

          const animBody = (): void => {
            resetOpacityAnimation.opacity(0).step()
            state.animationData = resetOpacityAnimation.export()

            setTimeout(() => {
              resetAnimation.translateX(0).step()
              state.animationData = resetAnimation.export()
            }, 300)

            setTimeout(() => {
              resetOpacityAnimation.opacity(1).step()
              state.animationData = resetOpacityAnimation.export()
            }, 600)

            setTimeout(() => {
              animation.translateX(-width).step()
              state.animationData = animation.export()
            }, 900)
          }

          animBody()
          interval.value = setInterval(animBody, dura * 1000 + 1000)
        })
    }

    function initAnimation() {
      timeout.value = setTimeout(() => {
        timeout.value = null

        if (state.isWEB) initWebAnimation()
        else initMiniAppAnimation()
      }, 100)
    }

    onMounted(() => {
      if (!props.marquee) return
      initAnimation()
    })

    return () => {
      if (!state.show) return null

      const closeIconVNode = h(View, {
        class: 'at-noticebar__close',
        onTap: handleClose
      }, {
        default: () => [
          h(Text, {
            class: 'at-icon at-icon-close'
          })
        ]
      })

      const contentIconVnode = h(View, {
        class: 'at-noticebar__content-icon'
      }, {
        default: () => [
          /* start hack 百度小程序 */
          h(Text, {
            class: iconClasses.value
          })
        ]
      })

      const showMoreContentVnode = h(View, {
        class: 'at-noticebar__more',
        onTap: onGotoMore.bind(this)
      }, {
        default: () => [
          h(Text, {
            class: 'text'
          }, { default: () => props.moreText }),

          h(View, {
            class: 'at-noticebar__more-icon'
          }, {
            default: () => [
              h(Text, {
                class: 'at-icon at-icon-chevron-right'
              })
            ]
          })
        ]
      })

      const defaultSlotVnode = h(View, {
        id: state.animElemId,
        animation: state.animationData,
        class: innerContentClasses.value,
        style: animationStyle.value,
      }, { default: () => slots.default?.() })

      return h(View, mergeProps(attrs, {
        class: rootClasses.value
      }), {
        default: () => [
          // close icon
          state._close && closeIconVNode,
          // content
          h(View, {
            class: 'at-noticebar__content'
          }, {
            default: () => [
              // content icon
              props.icon && contentIconVnode,
              // content text
              h(View, {
                class: 'at-noticebar__content-text'
              }, {
                default: () => [
                  // default content slot
                  defaultSlotVnode,
                  // show more content
                  state._showMore && showMoreContentVnode
                ]
              })
            ]
          })
        ]
      })
    }
  }
})

export default AtNoticebar

