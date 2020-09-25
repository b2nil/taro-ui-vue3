import { h, defineComponent, reactive, onMounted, Ref, computed, ref, mergeProps, PropType } from 'vue'
import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import { AtNoticeBarProps } from 'types/noticebar'

const AtNoticebar = defineComponent({
  name: "AtNoticebar",

  props: {
    close: { type: Boolean, default: false },
    single: Boolean,
    marquee: Boolean,
    speed: {
      type: Number as PropType<AtNoticeBarProps['speed']>,
      default: 100
    },
    moreText: {
      type: String,
      default: '查看详情'
    },
    showMore: { type: Boolean, default: false },
    icon: String as PropType<AtNoticeBarProps['icon']>,
    // events
    onClose: Function as PropType<AtNoticeBarProps['onClose']>,
    onGotoMore: Function as PropType<AtNoticeBarProps['onGotoMore']>
  },

  setup(props: AtNoticeBarProps, { attrs, slots }) {

    const timeout: Ref<NodeJS.Timeout | null> = ref(null)
    const interval: Ref<NodeJS.Timer | null> = ref(null)

    const state = reactive({
      _showMore: !props.single ? false : props.showMore,
      _close: props.marquee ? false : props.close,
      show: true,
      animElemId: `J_${Math.ceil(Math.random() * 10e5).toString(36)}`,
      animationData: { actions: [{}] },
      dura: 15,
      isWEAPP: Taro.getEnv() === Taro.ENV_TYPE.WEAPP,
      isALIPAY: Taro.getEnv() === Taro.ENV_TYPE.ALIPAY,
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB
    })

    const rootClass = computed(() => ({
      'at-noticebar': true,
      'at-noticebar--marquee': props.marquee,
      'at-noticebar--weapp': props.marquee && (state.isWEAPP || state.isALIPAY),
      'at-noticebar--single': !props.marquee && props.single
    }))

    const animationStyle = computed(() => {
      const style = {}
      if (props.marquee) {
        style['animation-duration'] = `${state.dura}s`
      }
      return style
    })

    const innerContentClass = computed(() => ({
      'at-noticebar__content-inner': true,
      [`${state.animElemId}`]: props.marquee
    }))

    const iconClass = computed(() => ({
      'at-icon': true,
      [`at-icon-${props.icon}`]: Boolean(props.icon)
    }))

    function handleClose(event: CommonEvent): void {
      state.show = false
      props.onClose && props.onClose(event)
    }

    function onGotoMore(event: CommonEvent): void {
      props.onGotoMore && props.onGotoMore(event)
    }

    onMounted(() => {
      if (!props.marquee) return
      initAnimation()
    })

    function initAnimation(): void {
      const { isWEAPP, isALIPAY } = state
      timeout.value = setTimeout(() => {
        timeout.value = null
        if (state.isWEB) {
          const elem = document.querySelector(`.${state.animElemId}`)

          if (!elem) return

          const width = elem.getBoundingClientRect().width
          state.dura = width / +props.speed!

        } else if (isWEAPP || isALIPAY) {
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
      }, 100)
    }

    return () => (
      state.show && (
        h(View, mergeProps(attrs, {
          class: rootClass.value
        }), {
          default: () => [
            // close icon
            state._close && (
              h(View, {
                class: 'at-noticebar__close',
                onTap: handleClose
              }, {
                default: () => [
                  h(Text, { class: 'at-icon at-icon-close' })
                ]
              })
            ),

            // content
            h(View, {
              class: 'at-noticebar__content'
            }, {
              default: () => [
                // content icon
                props.icon && (
                  h(View, {
                    class: 'at-noticebar__content-icon'
                  }, {
                    default: () => [
                      /* start hack 百度小程序 */
                      h(Text, { class: iconClass.value })
                    ]
                  })
                ),

                // content text
                h(View, {
                  class: 'at-noticebar__content-text'
                }, {
                  default: () => [
                    // default content slot
                    h(View, {
                      id: state.animElemId,
                      animation: state.animationData,
                      class: innerContentClass.value,
                      style: animationStyle.value,
                    }, { default: () => slots.default && slots.default() }),

                    // show more content
                    state._showMore && (
                      h(View, {
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
                              h(Text, { class: 'at-icon at-icon-chevron-right' })
                            ]
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
    )
  }
})

export default AtNoticebar

