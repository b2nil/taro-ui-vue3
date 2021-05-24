import { h, defineComponent, computed, ref, nextTick, watch, mergeProps, PropType } from "vue"
import { handleTouchScroll } from '@taro-ui-vue3/utils/common'

import { ScrollView, Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { AtFloatLayoutProps } from '@taro-ui-vue3/types/float-layout'

const AtFloatLayout = defineComponent({
  name: "AtFloatLayout",

  props: {
    // 参数
    isOpened: {
      type: Boolean,
      default: false
    },
    title: {
      type: String as PropType<AtFloatLayoutProps['title']>,
      default: '',
    },
    scrollX: Boolean,
    scrollY: {
      type: Boolean,
      default: true,
    },
    scrollTop: Number as PropType<AtFloatLayoutProps['scrollTop']>,
    scrollLeft: Number as PropType<AtFloatLayoutProps['scrollLeft']>,
    upperThreshold: Number as PropType<AtFloatLayoutProps['upperThreshold']>,
    lowerThreshold: Number as PropType<AtFloatLayoutProps['lowerThreshold']>,
    scrollWithAnimation: Boolean,
    // 事件
    onClose: Function as unknown as PropType<AtFloatLayoutProps['onClose']>,
    onScroll: Function as unknown as PropType<AtFloatLayoutProps['onScroll']>,
    onScrollToUpper: Function as unknown as PropType<AtFloatLayoutProps['onScrollToUpper']>,
    onScrollToLower: Function as unknown as PropType<AtFloatLayoutProps['onScrollToLower']>,
  },

  setup(props: AtFloatLayoutProps, { attrs, slots }) {
    const _isOpened = ref<boolean>(props.isOpened)

    const rootClass = computed(() => ({
      'at-float-layout': true,
      'at-float-layout--active': _isOpened.value
    }))

    watch(() => props.isOpened, (val, oldVal) => {
      if (val === oldVal) {
        handleTouchScroll(val)
      }

      if (val !== _isOpened.value) {
        _isOpened.value = val
      }
    })

    function handleClose() {
      if (typeof props.onClose === 'function') {
        props.onClose()
      }
    }

    function close() {
      _isOpened.value = false
      nextTick(handleClose)
    }

    function handleTouchMove(e: CommonEvent) {
      e.stopPropagation()
    }

    return () => {

      const disableScroll = process.env.TARO_ENV === 'alipay' ? { disableScroll: true } : {}
      const trapScroll = process.env.TARO_ENV === 'alipay' ? { trapScroll: true } : {}

      return h(View, mergeProps(attrs, {
        class: rootClass.value,
        catchMove: true,
        onTouchmove: handleTouchMove
      }), {
        default: () => [
          // overlay
          h(View, mergeProps(disableScroll, {
            class: 'at-float-layout__overlay',
            onTap: close
          })),

          // container layout
          h(View, {
            class: 'at-float-layout__container layout'
          }, {
            default: () => [
              // header
              props.title && (
                h(View, { class: 'layout-header' }, {
                  default: () => [
                    h(Text, {
                      class: 'layout-header__title'
                    }, { default: () => props.title }),

                    h(View, {
                      class: 'layout-header__btn-close',
                      onTap: close
                    }),
                  ]
                })
              ),

              // body
              h(View, {
                class: 'layout-body'
              }, {
                default: () => [
                  h(ScrollView, mergeProps(trapScroll, {
                    class: 'layout-body__content',
                    scrollX: props.scrollX,
                    scrollY: props.scrollY,
                    scrollTop: props.scrollTop,
                    scrollLeft: props.scrollLeft,
                    upperThreshold: props.upperThreshold,
                    lowerThreshold: props.lowerThreshold,
                    scrollWithAnimation: props.scrollWithAnimation,
                    onScroll: props.onScroll,
                    onScrolltolower: props.onScrollToLower,
                    onScrolltoupper: props.onScrollToUpper,
                  }), { default: () => slots.default && slots.default() })
                ]
              })
            ]
          })
        ]
      })
    }
  }
})

export default AtFloatLayout