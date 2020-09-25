import { h, defineComponent, watch, ref, computed, mergeProps, PropType } from "vue"
import { View } from '@tarojs/components'
import { CommonEvent } from "@tarojs/components/types/common"
import { AtActionSheetProps } from "types/action-sheet"

import AtActionSheetHeader from "./header/index"
import AtActionSheetBody from "./body/index"
import AtActionSheetFooter from "./footer/index"

const AtActionSheet = defineComponent({
  name: "AtActionSheet",

  props: {
    isOpened: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    cancelText: {
      type: String,
      default: ''
    },
    onClose: {
      type: Function as PropType<(event?: CommonEvent) => void>,
      default: () => () => { }
    },
    onCancel: {
      type: Function as PropType<(event?: CommonEvent) => void>,
      default: () => () => { }
    },
  },

  setup(props: AtActionSheetProps, { attrs, slots }) {
    const _isOpened = ref(props.isOpened)

    const rootClasses = computed(() => ({
      'at-action-sheet': true,
      'at-action-sheet--active': _isOpened.value,
    }))

    watch(() => props.isOpened, (val) => {
      if (val !== _isOpened.value) {
        _isOpened.value = val
      }
      !val && handleClose()
    })

    function handleClose() {
      props.onClose && props.onClose()
    }

    function handleCancel() {
      props.onCancel && props.onCancel()
      close()
    }

    function close() {
      _isOpened.value = false
      handleClose()
    }

    function handleTouchMove(e: CommonEvent) {
      e.stopPropagation()
      e.preventDefault()
    }

    return () => (
      h(View, mergeProps(attrs, {
        class: rootClasses.value,
        onTouchMove: handleTouchMove
      }), {
        default: () => [
          h(View, {
            class: 'at-action-sheet__overlay',
            onTap: close
          }),

          h(View, {
            class: 'at-action-sheet__container'
          }, {
            default: () => [
              props.title && (
                h(AtActionSheetHeader, null, { default: () => props.title })
              ),

              h(AtActionSheetBody, null, { default: () => slots.default && slots.default() }),

              props.cancelText && (
                h(AtActionSheetFooter, {
                  onClick: handleCancel
                }, { default: () => props.cancelText })
              )
            ]
          }),
        ]
      })
    )
  }
})

export default AtActionSheet