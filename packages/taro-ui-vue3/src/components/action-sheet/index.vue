<template>
  <view
    :class="rootClasses"
    @touch-move="handleTouchMove"
  >
    <view
      class="at-action-sheet__overlay"
      @tap="close"
    />
    <view class="at-action-sheet__container">
      <at-action-sheet-header v-if="title">{{ title }}</at-action-sheet-header>
      <at-action-sheet-body>
        <slot />
      </at-action-sheet-body>
      <at-action-sheet-footer
        v-if="cancelText"
        @click="handleCancel"
      >{{ cancelText }}</at-action-sheet-footer>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed, toRefs, PropType } from "../../api"
import { CommonEvent } from "@tarojs/components/types/common"
import { AtActionSheetProps } from "types/action-sheet";
import AtActionSheetHeader from "./header/index.vue"
import AtActionSheetBody from "./body/index.vue"
import AtActionSheetFooter from "./footer/index.vue"

export default defineComponent({
  name: "AtActionSheet",

  components: {
    AtActionSheetHeader,
    AtActionSheetBody,
    AtActionSheetFooter
  },

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

  setup(props: AtActionSheetProps, { slots }) {
    const _isOpened = ref<boolean>(props.isOpened)

    const { title, cancelText } = toRefs(props)

    const rootClasses = computed(() => ({
      [props.className]: true,
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

    return {
      title,
      cancelText,
      rootClasses,
      close,
      handleCancel,
      handleTouchMove
    }
  }
})
</script>

<style>
</style>