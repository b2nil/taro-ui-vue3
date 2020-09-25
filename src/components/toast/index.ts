import { h, defineComponent, nextTick, computed, reactive, watch, PropType } from "vue"
import { Image, Text, View } from '@tarojs/components'
import { CommonEvent } from "@tarojs/components/types"
import { AtToastProps } from "types/toast"

import statusImg from './img.json'

const AtToast = defineComponent({
  name: "AtToast",

  props: {
    isOpened: { type: Boolean, default: false, required: true },
    text: { type: String, default: '' },
    icon: { type: String, default: '' },
    image: { type: String, default: '' },
    status: {
      type: String as PropType<AtToastProps['status']>,
      default: '',
      validator: (val: string) => ['', 'error', 'loading', 'success'].includes(val)
    },
    duration: { type: Number, default: 3000 },
    hasMask: Boolean,
    onClick: Function as PropType<AtToastProps['onClick']>,
    onClose: Function as PropType<AtToastProps['onClick']>,
  },

  setup(props: AtToastProps, { attrs, slots }) {
    const state = reactive({
      _timer: props.isOpened ? makeTimer(props.duration || 0) : null as NodeJS.Timeout | null,
      _isOpened: props.isOpened
    })

    const realImg = computed(() => (props.image || statusImg[props.status!] || null))
    const isRenderIcon = computed(() => !!(props.icon && !(props.image || statusImg[props.status!])))

    const rootClasses = computed(() => ({
      'at-toast': true,
      [`${attrs.class}`]: Boolean(attrs.class)
    }))

    const bodyClasses = computed(() => ({
      'toast-body': true,
      'at-toast__body--custom-image': props.image,
      'toast-body--text': !realImg.value && !props.icon,
      [`at-toast__body--${props.status}`]: !!props.status
    }))

    const iconClasses = computed(() => ({
      'at-icon': true,
      [`at-icon-${props.icon}`]: props.icon
    }))

    watch(() => [
      props.isOpened,
      props.duration,
    ], ([isOpened, duration]: [boolean, number]) => {
      if (!isOpened) {
        close()
        return
      }

      if (!state._isOpened) {
        state._isOpened = true
      } else {
        clearTimer()
      }

      makeTimer(duration || 0)
    })

    function clearTimer() {
      if (state._timer) {
        clearTimeout(state._timer)
        state._timer = null
      }
    }

    function makeTimer(duration: number) {
      if (duration === 0) return

      state._timer = setTimeout(() => {
        close()
      }, +duration)
    }

    function close() {
      if (state._isOpened) {
        state._isOpened = false
        nextTick(handleClose)
        clearTimer()
      }
    }

    function handleClose(e?: CommonEvent) {
      if (typeof props.onClose === 'function') {
        props.onClose(e!)
      }
    }

    function handleClick(e: CommonEvent) {
      if (props.status === 'loading') return

      if (typeof props.onClick === 'function') {
        return props.onClick(e)
      }

      close()
    }

    return () => {
      return state._isOpened && (
        h(View, {
          class: rootClasses.value
        }, {
          default: () => [
            // mask layer
            props.hasMask && h(View, { class: 'at-toast__overlay' }),

            // body
            h(View, {
              class: bodyClasses.value,
              style: attrs.style,
              onTap: handleClick
            }, {
              default: () => [
                // body content
                h(View, {
                  class: 'toast-body-content'
                }, {
                  default: () => [
                    // use real image
                    realImg.value && h(View, {
                      class: 'toast-body-content__img'
                    }, {
                      default: () => [
                        h(Image, {
                          class: 'toast-body-content__img-item',
                          src: realImg.value,
                          mode: 'scaleToFill'
                        })
                      ]
                    }),

                    // use icon
                    isRenderIcon.value && h(View, {
                      class: 'toast-body-content__icon'
                    }, {
                      default: () => [
                        h(Text, { class: iconClasses.value })
                      ]
                    }),

                    // text
                    props.text && h(View, {
                      class: 'toast-body-content__info'
                    }, {
                      default: () => [
                        h(Text, null, { default: () => props.text })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        })
      )
    }
  }
})

export default AtToast